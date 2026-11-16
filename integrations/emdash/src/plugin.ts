import type { BlockResponse } from "@emdash-cms/blocks";
import type { PluginContext, SandboxedPlugin } from "emdash/plugin";

const origin = "https://www.clipreel.com";

function textBlock(text: string) {
	return { type: "section", text } as const;
}

async function page(ctx: PluginContext, message?: string): Promise<BlockResponse> {
	const hasToken = Boolean(await ctx.settings.get<string>("apiToken"));
	const blocks: BlockResponse["blocks"] = [
		{ type: "header", text: "ClipReel video projects" },
		textBlock("Check a project’s timeline revision or find out whether its MP4 export is ready."),
		...(message ? [textBlock(message)] : []),
		{
			type: "actions",
			elements: [
				{
					type: "link",
					label: "Create a scoped ClipReel token",
					target: { kind: "external", url: origin + "/agents/connect" },
				},
			],
		},
		{
			type: "form",
			block_id: "clipreel-token",
			fields: [
				{ type: "secret_input", action_id: "apiToken", label: "ClipReel token", has_value: hasToken },
			],
			submit: { label: "Save token", action_id: "save-token" },
		},
	];
	if (hasToken) {
		blocks.push(
				{
					type: "form",
					block_id: "clipreel-project",
					fields: [{ type: "text_input", action_id: "id", label: "ClipReel project ID" }],
					submit: { label: "Look up project", action_id: "get-project" },
				},
				{
					type: "form",
					block_id: "clipreel-job",
					fields: [{ type: "text_input", action_id: "id", label: "ClipReel job ID" }],
					submit: { label: "Check render status", action_id: "get-job" },
				},
				{
					type: "actions",
					block_id: "clipreel-disconnect",
					elements: [{ type: "button", label: "Disconnect ClipReel", action_id: "clear-token" }],
				},
		);
	}
	return { blocks };
}

const errors: Record<number, string> = {
	401: "ClipReel rejected the token. Create a new scoped token and reconnect.",
	403: "Use a token with project:read access.",
	404: "ClipReel could not find this item in the connected account.",
	429: "ClipReel’s rate limit was reached. Try again later.",
};

async function lookup(ctx: PluginContext, kind: "projects" | "jobs", id: unknown) {
	if (typeof id !== "string" || !/^[a-zA-Z0-9-]{8,96}$/.test(id)) {
		return "Enter a ClipReel project or job ID.";
	}
	const token = await ctx.settings.get<string>("apiToken");
	if (!token) return "Connect your ClipReel token first.";
	if (!ctx.http) return "Enable the network permission for this plug-in.";
	try {
		const response = await ctx.http.fetch(origin + "/api/v1/" + kind + "/" + id, {
			method: "GET",
			headers: { Authorization: "Bearer " + token, Accept: "application/json" },
			redirect: "manual",
		});
		if (!response.ok) return errors[response.status] ?? "ClipReel could not return this item.";

		const data = await response.json() as Record<string, unknown>;
		if (kind === "projects") {
			const revision = Number.isSafeInteger(data.revision) ? String(data.revision) : "unavailable";
			return "Project " + id + " · Revision " + revision + ". Open this project in ClipReel to edit or export it.";
		}
		const upstreamState = data.status ?? data.state;
		const status = typeof upstreamState === "string" && /^[a-z_-]{1,30}$/i.test(upstreamState)
			? upstreamState
			: "unavailable";
		return "Job " + id + " · Status " + status + ". Find the preview or output in ClipReel.";
	} catch {
		return "ClipReel could not be reached. Try again later.";
	}
}

type Interaction = {
	type?: string;
	page?: string;
	action_id?: string;
	values?: Record<string, unknown>;
};

const plugin: SandboxedPlugin = {
	routes: {
		admin: {
			permission: "plugins:manage",
			methods: ["POST"],
			handler: async (route, ctx) => {
				const input = route.input as Interaction | null;
				if (input?.type === "page_load" && input.page === "/projects") return page(ctx);
				if (input?.type === "block_action" && input.action_id === "clear-token") {
					await ctx.settings.delete("apiToken");
					return page(ctx, "ClipReel disconnected.");
				}
				if (input?.type !== "form_submit") return { blocks: [] };
				switch (input.action_id) {
					case "save-token": {
						const token = typeof input.values?.apiToken === "string" ? input.values.apiToken.trim() : "";
						if (!/^[a-zA-Z0-9_-]{16,256}$/.test(token)) return page(ctx, "Enter a valid ClipReel token.");
						await ctx.settings.set("apiToken", token);
						return page(ctx, "Token saved. Use a project or job ID to check the connection.");
					}
					case "get-project":
						return page(ctx, await lookup(ctx, "projects", input.values?.id));
					case "get-job":
						return page(ctx, await lookup(ctx, "jobs", input.values?.id));
					default:
						return { blocks: [] };
				}
			},
		},
	},
};

export default plugin;
