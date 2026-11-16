import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';

export class ClipReel implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ClipReel',
		name: 'clipReel',
		icon: 'file:clipreel.png',
		group: ['transform'],
		version: 1,
		description: 'Draft a video edit or retrieve a ClipReel job',
		defaults: { name: 'ClipReel' },
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'clipReelApi', required: true }],
		requestDefaults: {
			baseURL: 'https://www.clipreel.com/api/v1',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
		},
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				default: 'draftEdit',
				options: [
					{
						name: 'Draft a Video Edit',
						value: 'draftEdit',
						action: 'Draft a video edit',
						description: 'Queue a reviewable edit for a project with existing footage',
						routing: { request: { method: 'POST', url: '/tools/edit_by_prompt' } },
					},
					{
						name: 'Read Video Job',
						value: 'readJob',
						action: 'Read a video job',
						description: 'Read the status and result of a ClipReel edit or render job',
						routing: {
							request: { method: 'GET', url: "={{ '/jobs/' + encodeURIComponent($parameter.jobId) }}" },
						},
					},
				],
			},
			{
				displayName: 'Project ID',
				name: 'projectId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { operation: ['draftEdit'] } },
				description: 'ID of a private ClipReel project that already contains imported footage',
				routing: { send: { type: 'body', property: 'projectId' } },
			},
			{
				displayName: 'Edit Prompt',
				name: 'prompt',
				type: 'string',
				typeOptions: { rows: 4 },
				default: '',
				required: true,
				displayOptions: { show: { operation: ['draftEdit'] } },
				description: 'Describe the cut, pacing, or captions you want in the proposal. This uses your ClipReel plan.',
				routing: { send: { type: 'body', property: 'prompt' } },
			},
			{
				displayName: 'Job ID',
				name: 'jobId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { operation: ['readJob'] } },
				description: 'ID from the earlier ClipReel edit or render response',
			},
		],
	};
}
