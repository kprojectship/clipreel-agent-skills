from dify_plugin import Tool

from client import ClipReelClient


class DraftVideoEdit(Tool):
    def _invoke(self, tool_parameters: dict):
        client = ClipReelClient(self.runtime.credentials["api_token"])
        result = client.draft_edit(
            tool_parameters.get("project_id", ""),
            tool_parameters.get("prompt", ""),
        )
        yield self.create_json_message(result)
