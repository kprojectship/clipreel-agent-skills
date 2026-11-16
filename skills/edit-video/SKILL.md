---
name: edit-video
description: Turn a user's recordings and edit instructions into a reviewable ClipReel timeline. Use for multi-step video editing by prompt, preview, apply, and export.
---

# Edit a video from a prompt

1. Identify the exact files or ClipReel project the user named. Keep the original files and sequence the recordings in the order requested.
2. For files on disk, run `npx --yes --package=https://www.clipreel.com/assets/clipreel-0.1.0.tgz clipreel edit ./demo.mp4 --prompt "Remove long pauses and add captions" --aspect 16:9 --aspect 9:16 --json` with the user’s prompt and formats. Read the CLI output for the project, proposal, and preview IDs. When a project already exists, use the `edit_by_prompt` MCP tool and then poll `get_job`.
3. Show the user the proposed operations and preview links. If the result needs approval, give the review link and wait for the user's decision. Keep previewing and applying as separate steps.
4. Apply the reviewed proposal with `apply_edit`. Export the saved revision with `export_video` for each requested aspect ratio. Poll `get_job` for signed MP4 links.
5. Return **Open in ClipReel** beside the previews and any requested exports. The project link lets the user adjust the cuts and captions afterward.

Example request. “Take the product walkthrough and the export screen. Make a 30-second cut that opens on the finished report, remove pauses, and add white captions. Show me widescreen and vertical previews.”
