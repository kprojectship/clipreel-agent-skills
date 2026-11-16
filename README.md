# ClipReel agent skills

Give your AI agent a video editor. These skills turn the files and prompts in your workspace into proposals, private previews, and editable ClipReel projects.

## Setup

1. Create a ClipReel token with project read, project write, and job scopes at [Connect an agent](https://www.clipreel.com/agents/connect). Save it as `CLIPREEL_API_TOKEN` in your client environment.
2. Run `npx skills add kprojectship/clipreel-agent-skills` and select your client and skills. You can also [download the archive](https://www.clipreel.com/assets/clipreel-agent-skills.tgz), extract it, and run `npx skills add ./agent-skills` from its parent directory.
3. Use the npm archive to make the CLI available in the terminal. `npx --yes --package=https://www.clipreel.com/assets/clipreel-0.1.0.tgz clipreel --help` prints the commands.

| Client | Connect |
| --- | --- |
| Claude Code | `claude mcp add --transport http clipreel https://www.clipreel.com/mcp --header "Authorization: Bearer $CLIPREEL_API_TOKEN"` |
| Cursor | Add `clipreel` to `mcpServers` in `.cursor/mcp.json` with `url` set to `https://www.clipreel.com/mcp` and `headers.Authorization` set to `Bearer ${env:CLIPREEL_API_TOKEN}`. |
| Codex | Add `[mcp_servers.clipreel]` in `~/.codex/config.toml`. Set `url = "https://www.clipreel.com/mcp"` and `bearer_token_env_var = "CLIPREEL_API_TOKEN"`. |

## Sample edit

Compare the [eight-second source](https://www.clipreel.com/assets/ridge.mp4) with [a six-second cut with a title and closing fade](https://www.clipreel.com/assets/marketing/agent-sample-result.mp4). [Try the prompt](https://www.clipreel.com/agents) on the sample project.

Download [the ridge walk](https://www.clipreel.com/assets/ridge.mp4), [the aerial shot](https://www.clipreel.com/assets/aerial.mp4), and [the trail detail](https://www.clipreel.com/assets/boots.mp4). Ask `edit-video` for a 12-second cut with a title that reads “The ridge”, cooler colors, and a closing fade. Use the sample footage as the before. The returned previews and the editable project link are the after.

| Skill | Use it when |
| --- | --- |
| `edit-video` | Turn raw footage and a prompt into an editable cut. |
| `create-shorts` | Choose a stand-alone moment in a long video and reframe for vertical. |
| `product-demo` | Cut a product recording to the action and its result. |
| `add-captions` | Transcribe speech or import timed cues in a readable style. |
| `video-repurpose` | Export versions for different aspect ratios from one revision. |
| `cinematic-edit` | Match color, tighten pacing, and add transitions where they help. |

The CLI and skills are free to install. Render and edit requests use the plan attached to the token’s account. Approve footage removal in the review page before applying a proposal. Use the editor link to adjust any saved project and export again.

## Integrations

- [Official MCP Registry entry](https://registry.modelcontextprotocol.io/v0.1/servers?search=clipreel)
- [Vercel Skills directory](https://www.skills.sh/kprojectship/clipreel-agent-skills)
- [Postman API collection](integrations/postman/clipreel.postman_collection.json)
- [EmDash admin plugin](integrations/emdash)
- [Dify editing tools](integrations/dify)
- [n8n community node](integrations/n8n)
- [Pipedream editing actions](integrations/pipedream)
