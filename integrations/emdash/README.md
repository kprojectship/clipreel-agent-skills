# ClipReel for EmDash

Use [ClipReel](https://www.clipreel.com/) from the EmDash admin to check a video project’s current timeline revision or see whether an edit or export job is ready. Keep editorial review in the [ClipReel editor](https://www.clipreel.com/editor).

## Connect the plugin

1. Open **ClipReel** in the EmDash admin.
2. Create a token with **Project read** selected at [Connect an agent](https://www.clipreel.com/agents/connect). Save it in the plugin. EmDash needs its encryption key configured for secret settings.
3. Paste a ClipReel project ID or job ID. The panel shows the current revision or job status.

The plugin only requests read endpoints at www.clipreel.com. It sends the supplied ID and scoped token to ClipReel and shows a short status. It does not read EmDash content or expose signed media URLs in the admin panel.

## Build and publish

Run the package’s typecheck, test, and bundle scripts. Before publishing, replace the manifest’s publisher placeholder with the DID or handle of the signed-in Atmosphere account. Publish with the package’s EmDash CLI command and watch the registry’s release checks.

[ClipReel API guide](https://www.clipreel.com/agents/automate-video-editing-with-ai-agents) · [EmDash publishing guide](https://docs.emdashcms.com/plugins/creating-plugins/publishing/)
