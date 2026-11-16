# Privacy

The plugin sends the selected project or job ID, edit instructions, and a scoped bearer token to www.clipreel.com over HTTPS. It returns the job result to your Dify workflow. That result can contain private links, which should stay inside the workspace.

Dify manages the provider credential and may retain workflow inputs and outputs according to its settings. The plugin code keeps no local credentials or job history, adds no telemetry, and sends no requests to other domains. See [ClipReel’s privacy information](https://www.clipreel.com/guide#privacy).
