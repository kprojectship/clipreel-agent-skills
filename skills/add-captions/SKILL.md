---
name: add-captions
description: Generate timed ClipReel caption cues or import user-supplied subtitles and style them. Use for subtitles, animated captions, and readable social-video text.
---

# Add timed captions

1. Open the intended timeline revision. When the user supplies an SRT or VTT, convert the timestamps into seconds and preserve the text. Otherwise call `transcribe_video`, poll the job, and review returned cues against the speech.
2. Use `add_captions` with `{projectId, revision, cues, style}`. A cue is `{start, end, text}`. Keep each short, end it before the next thought, and preserve names, dates, and numbers.
3. Preview in the intended aspect ratio. Review timing across cuts and keep text away from platform controls. Ask the user to approve before applying or exporting when their request calls for review.

Example. `{ "start": 1.2, "end": 3.8, "text": "Here’s how we export the report." }`. Try `white` for a quiet walkthrough, or `lime` to make the emphasized word more visible. Return the editor deep link with the caption layer intact.
