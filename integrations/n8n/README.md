# ClipReel for n8n

This community node connects an n8n workflow to [ClipReel](https://www.clipreel.com/). It drafts reviewable video edits from existing footage and reads the status of edit or export jobs.

1. Import footage into a private ClipReel project and copy its project ID.
2. Create a scoped token at [Connect an agent](https://www.clipreel.com/agents/connect) with Project read and Run jobs. Save it in the ClipReel API credential in n8n.
3. Select **Draft a Video Edit**, provide the project ID, and write the editing prompt. This uses the connected account’s ClipReel plan.
4. Run **Read Video Job** with the returned job ID in a later step. Review the proposal in ClipReel before applying it. Results can include private links, so keep them within your workflow.

[Read the ClipReel API guide](https://www.clipreel.com/agents/automate-video-editing-with-ai-agents).
