import type { Feedback } from '@prisma/client';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	async function fetchFeedbacks() {
		const response = await fetch('/api/feedbacks', { method: 'GET' });
		const data = await response.json();

		return data.feedbacks as Feedback[];
	}

	return {
		feedbacks: fetchFeedbacks()
	};
};
