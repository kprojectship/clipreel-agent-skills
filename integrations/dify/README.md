# ClipReel for Dify

[ClipReel](https://www.clipreel.com/) turns editing instructions into reviewable video proposals. Use this Dify plugin to start a draft from existing footage and retrieve the result for editorial review.

1. Import footage into a private ClipReel project and keep its project ID.
2. Create a token at [Connect an agent](https://www.clipreel.com/agents/connect) with Project read and Run jobs. Enter it as a provider credential in Dify. Drafting uses your ClipReel plan.
3. Add **Draft a Video Edit** to your workflow. Use a prompt such as “Keep the product reveal, shorten the intro, and add captions.” Pass the returned job ID into **Read Video Job** in a later step.
4. Open the proposal’s review link in ClipReel to inspect the changes and apply the edit. Review links and render output can be private or expire.

See [the ClipReel API guide](https://www.clipreel.com/agents/automate-video-editing-with-ai-agents) for setup and [GitHub issues](https://github.com/kprojectship/clipreel-agent-skills/issues) for plugin support.
