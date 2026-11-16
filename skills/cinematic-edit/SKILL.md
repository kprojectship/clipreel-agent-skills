---
name: cinematic-edit
description: Draft color, pacing, fades, captions, and transitions for a ClipReel cut. Use for cinematic montages, graded reels, or footage cut to supplied music.
---

# Make a cinematic cut

1. Establish the reference shot, intended mood, and what the viewer should see first. If a music track is part of the request, ask for the supplied track or exact cue points. Keep the audio under the dialogue when necessary.
2. Use `edit_by_prompt` for the first pass. Ask for specific effects such as a warm grade, a short crossfade, or a speed ramp through a named shot. Use `apply_effect` for a known timeline range and only infer beat positions when the audio has been inspected.
3. Preview the opening, transition points, titles, and end. Review color across adjacent shots where skin, sky, or a product should match. If a trim removes footage, obtain approval on the linked review page.
4. Apply the chosen edit and export. Return the editable project to let the user fine-tune the grade, timing, and effects in the inspector.

Example. “Open with the aerial shot, make the ridge walk slightly warmer, slow the trail detail through the footstep, and add a fade during the final second.”
