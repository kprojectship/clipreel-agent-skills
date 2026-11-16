import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ClipReelApi implements ICredentialType {
	name = 'clipReelApi';
	displayName = 'ClipReel API';
	documentationUrl = 'https://www.clipreel.com/agents/automate-video-editing-with-ai-agents';
	properties: INodeProperties[] = [
		{
			displayName: 'Agent Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description: 'Create a token in ClipReel under Connect an Agent. Choose Project Read and Run Jobs.',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: { headers: { Authorization: '=Bearer {{$credentials.apiToken}}' } },
	};
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://www.clipreel.com',
			url: '/mcp',
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' },
			body: {
				jsonrpc: '2.0',
				id: 1,
				method: 'initialize',
				params: {
					protocolVersion: '2025-11-25',
					capabilities: {},
					clientInfo: { name: 'clipreel-n8n', version: '0.1.0' },
				},
			},
		},
	};
}
