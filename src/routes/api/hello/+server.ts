import { json } from '@sveltejs/kit';

export function GET() {
	const responseBody = {
		status: 'success',
		message: 'Hello, SvelteKit'
	};

	return json(responseBody);

	// return new Response(JSON.stringify(responseBody), {
	// 	status: 200,
	// 	headers: { 'Content-Type': 'application/json' }
	// });
}
