from dify_plugin import ToolProvider
from dify_plugin.errors.tool import ToolProviderCredentialValidationError

from client import ClipReelClient, ClipReelError


class ClipReelProvider(ToolProvider):
    def _validate_credentials(self, credentials: dict) -> None:
        try:
            ClipReelClient(credentials.get("api_token", "")).check_connection()
        except ClipReelError as error:
            raise ToolProviderCredentialValidationError(str(error)) from None
