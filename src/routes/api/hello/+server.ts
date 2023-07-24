import { json } from "@sveltejs/kit";

export async function GET() {
	const responseBody = {
		status: 'success',
		message: 'Hello, SvelteKit'
	};
	return new Response(JSON.stringify(responseBody), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});

	// return json(responseBody)
}
