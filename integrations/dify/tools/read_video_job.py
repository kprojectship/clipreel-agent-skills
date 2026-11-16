from dify_plugin import Tool

from client import ClipReelClient


class ReadVideoJob(Tool):
    def _invoke(self, tool_parameters: dict):
        client = ClipReelClient(self.runtime.credentials["api_token"])
        yield self.create_json_message(client.read_job(tool_parameters.get("job_id", "")))
