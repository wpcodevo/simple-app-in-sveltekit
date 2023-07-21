import { prisma } from '$lib/server/prisma';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	try {
		const feedbackId = params.id;

		const feedback = await prisma.feedback.findUnique({
			where: {
				id: feedbackId
			}
		});

		if (!feedback) {
			const message = 'No Feedback with the Provided ID Found';
			return generateErrorResponse({ message, status: 404 });
		}

		const json_response = {
			status: 'success',
			data: {
				feedback
			}
		};
		return json(json_response);
	} catch (error: any) {
		return generateErrorResponse({ message: error.message, status: 500 });
	}
}

export async function PATCH({ request, params }) {
	try {
		const feedbackId = params.id;
		const feedbackData = await request.json();

		const updated_feedback = await prisma.feedback.update({
			where: { id: feedbackId },
			data: feedbackData
		});

		const json_response = {
			status: 'success',
			data: {
				feedback: updated_feedback
			}
		};
		return json(json_response);
	} catch (error: any) {
		if (error.code === 'P2025') {
			const message = 'No Feedback with the Provided ID Found';
			return generateErrorResponse({ message, status: 404 });
		}

		return generateErrorResponse({ message: error.message, status: 500 });
	}
}

export async function DELETE({ params }) {
	try {
		const feedbackId = params.id;

		await prisma.feedback.delete({
			where: { id: feedbackId }
		});

		return json(null, { status: 204 });
	} catch (error: any) {
		if (error.code === 'P2025') {
			const message = 'No Feedback with the Provided ID Found';
			return generateErrorResponse({ message, status: 404 });
		}

		return generateErrorResponse({ message: error.message, status: 500 });
	}
}

const generateErrorResponse = ({ message, status }: { message: string; status: number }) => {
	return json(
		{ status: status >= 500 ? 'error' : 'fail', message },
		{
			status,
			headers: { 'Content-Type': 'application/json' }
		}
	);
};
