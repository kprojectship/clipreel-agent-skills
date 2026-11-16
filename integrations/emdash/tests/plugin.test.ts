import { afterEach, expect, it, vi } from "vitest";
import { createPluginTestHost, type PluginTestHost } from "@emdash-cms/plugin-test";
import type { PluginContext } from "emdash/plugin";
import plugin from "../src/plugin";

let host: PluginTestHost | undefined;

afterEach(async () => {
	await host?.dispose();
	host = undefined;
});

it("opens the private admin page through the sandbox", async () => {
	host = await createPluginTestHost();
	const initial = await host.invokeRoute("admin", { type: "page_load", page: "/projects" });
	expect(JSON.stringify(initial)).toContain("Save token");
	expect(JSON.stringify(initial)).not.toContain("Look up project");
}, 20_000);

it("uses the saved credential for the declared host and redacts it from responses", async () => {
	const settings = new Map();
	const token = "test_clipreel_token_only";
	const fetch = vi.fn(async () => Response.json({ revision: 7 }));
	const ctx = {
		settings: { get: (key: string) => settings.get(key), set: settings.set.bind(settings), delete: settings.delete.bind(settings) },
		http: { fetch },
	} as unknown as PluginContext;
	const route = plugin.routes?.admin;
	if (!route || typeof route === "function") throw new Error("Expected the admin route declaration");
	const handler = route.handler;
	const invoke = (input: object) => handler({ input } as Parameters<typeof handler>[0], ctx);

	const saved = await invoke({ type: "form_submit", action_id: "save-token", values: { apiToken: token } });
	expect(JSON.stringify(saved)).toContain("Look up project");
	expect(JSON.stringify(saved)).not.toContain(token);

	const invalid = await invoke({ type: "form_submit", action_id: "get-project", values: { id: "../invalid" } });
	expect(JSON.stringify(invalid)).toContain("Enter a ClipReel project or job ID.");
	expect(fetch).not.toHaveBeenCalled();

	const project = await invoke({ type: "form_submit", action_id: "get-project", values: { id: "project-1234" } });
	expect(JSON.stringify(project)).toContain("Revision 7");
	expect(fetch).toHaveBeenCalledWith("https://www.clipreel.com/api/v1/projects/project-1234",
		expect.objectContaining({ headers: expect.objectContaining({ Authorization: "Bearer " + token }) }),
	);

	const disconnected = await invoke({ type: "block_action", action_id: "clear-token" });
	expect(JSON.stringify(disconnected)).not.toContain("Look up project");
});
