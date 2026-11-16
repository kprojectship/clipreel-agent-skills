import re

import httpx


BASE_URL = "https://www.clipreel.com"


class ClipReelError(Exception):
    pass


class ClipReelClient:
    def __init__(self, token: str):
        if not isinstance(token, str) or not re.fullmatch(r"[A-Za-z0-9_-]{16,256}", token):
            raise ClipReelError("Enter a valid scoped ClipReel token.")
        self._token = token

    def _request(self, method: str, path: str, body: dict | None = None) -> dict:
        accept = "application/json, text/event-stream" if path == "/mcp" else "application/json"
        try:
            response = httpx.request(
                method,
                BASE_URL + path,
                json=body,
                headers={"Accept": accept, "Authorization": f"Bearer {self._token}"},
                follow_redirects=False,
                timeout=20,
            )
        except httpx.HTTPError:
            raise ClipReelError("ClipReel could not be reached.") from None
        if not response.is_success:
            detail = {
                400: "Check the project ID, job ID, or prompt.",
                401: "The token is invalid or has expired.",
                402: "This operation requires an eligible ClipReel plan.",
                403: "Check the token scopes and account plan.",
                404: "This project or job does not exist in the connected account.",
                429: "ClipReel’s rate or usage limit was reached.",
            }.get(response.status_code, "Request failed.")
            raise ClipReelError(f"ClipReel HTTP {response.status_code}. {detail}")
        try:
            result = response.json()
        except ValueError:
            raise ClipReelError("ClipReel returned an unexpected response.") from None
        if not isinstance(result, dict):
            raise ClipReelError("ClipReel returned an unexpected response.")
        return result

    @staticmethod
    def _identifier(value: str) -> str:
        if not isinstance(value, str) or not re.fullmatch(r"[A-Za-z0-9-]{8,96}", value):
            raise ClipReelError("Enter a valid ClipReel project or job ID.")
        return value

    def check_connection(self) -> None:
        result = self._request("POST", "/mcp", {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "initialize",
            "params": {
                "protocolVersion": "2025-11-25",
                "capabilities": {},
                "clientInfo": {"name": "clipreel-dify", "version": "0.0.1"},
            },
        })
        initialized = result.get("result")
        server_info = initialized.get("serverInfo") if isinstance(initialized, dict) else None
        if not isinstance(server_info, dict) or server_info.get("name") != "ClipReel":
            raise ClipReelError("ClipReel did not recognize the connection.")

    def draft_edit(self, project_id: str, prompt: str) -> dict:
        project_id = self._identifier(project_id)
        if not isinstance(prompt, str) or not prompt.strip() or len(prompt) > 2000:
            raise ClipReelError("Enter an edit prompt of 1 to 2,000 characters.")
        return self._request("POST", "/api/v1/tools/edit_by_prompt", {
            "projectId": project_id,
            "prompt": prompt.strip(),
        })

    def read_job(self, job_id: str) -> dict:
        return self._request("GET", "/api/v1/jobs/" + self._identifier(job_id))
