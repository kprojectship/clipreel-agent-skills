---
name: video-repurpose
description: Create widescreen, vertical, square, and portrait versions from the same ClipReel source project. Use when adapting an existing cut to a new channel without losing its timeline.
---

# Repurpose an existing cut

Get the latest approved revision with `get_timeline`. Use `render_preview` at each requested aspect ratio. Start with 16:9 for wide and 9:16 for vertical. Check that titles, faces, captions, and the main action still fit each frame. If the user wants a differently composed edit, draft `reframe_video` and save the change as an approved revision before rendering that version.

Queue an `export_video` for each approved output. Use the same revision where the timing should match and use a separate idempotency key per requested aspect and resolution. Return each signed download link with its aspect ratio, the revision ID, and the original editor link.

Example. “Give me a 720p wide export and a vertical version for Reels. Keep the cut on the same beats and verify the label on the product at 0:08.”
