import { invalidate } from '$app/navigation';
import type { Feedback } from '@prisma/client';
import { toast } from '@zerodevx/svelte-toast';
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { PUBLIC_VERCEL_URL } from '$env/static/public';

type FeedbackStore = {
	page_loading: boolean;
	feedbacks: Feedback[];
	setPageLoading: (loading: boolean) => void;
	addFeedback: (feedback: string) => void;
	editFeedback: (id: string, data: string) => void;
	deleteFeedback: (id: string) => void;
};

const ORIGIN_URL =
	process.env.NODE_ENV === 'production' ? `https://${PUBLIC_VERCEL_URL}` : 'http://localhost:3000';

async function handleResponse<T>(response: Response): Promise<T> {
	const contentType = response.headers.get('Content-Type') || '';
	const isJson = contentType.includes('application/json');
	const data = isJson ? await response.json() : await response.text();

	if (!response.ok) {
		const message = isJson ? data.message || response.statusText : response.statusText;
		throw new Error(message);
	}

	return data as T;
}

export const useFeedbackStore = (): Writable<FeedbackStore> => {
	const { subscribe, set, update } = writable<FeedbackStore>({
		page_loading: false,
		feedbacks: [],
		setPageLoading: (loading: boolean) =>
			update((state: FeedbackStore) => ({ ...state, page_loading: loading })),
		addFeedback: async (feedback: string) => {
			update((state: FeedbackStore) => ({
				...state,
				page_loading: true
			}));
			try {
				const response = await fetch(`${ORIGIN_URL}/api/feedbacks/`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: feedback
				});

				await handleResponse<FeedbackResponse>(response).then((data) => data.data.feedback);

				await invalidate('/api/feedbacks');

				update((state: FeedbackStore) => ({
					...state,
					page_loading: false
				}));

				toast.push('Added Feedback Successfully', { classes: ['success'] });
			} catch (error: any) {
				update((state: FeedbackStore) => ({
					...state,
					page_loading: false
				}));

				console.error(error);
				toast.push(error.toString(), { classes: ['danger'] });
			}
		},
		editFeedback: async (id: string, data: string) => {
			update((state: FeedbackStore) => ({
				...state,
				page_loading: true
			}));
			try {
				const response = await fetch(`${ORIGIN_URL}/api/feedbacks/${id}`, {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json'
					},
					body: data
				});

				await handleResponse<FeedbackResponse>(response).then((data) => data.data.feedback);

				await invalidate('/api/feedbacks');

				update((state: FeedbackStore) => ({
					...state,
					page_loading: false
				}));

				toast.push('Edited Feedback Successfully', { classes: ['success'] });
			} catch (error: any) {
				update((state: FeedbackStore) => ({
					...state,
					page_loading: false
				}));

				console.error(error);
				toast.push(error.toString(), { classes: ['danger'] });
			}
		},
		deleteFeedback: async (id: string) => {
			update((state: FeedbackStore) => ({
				...state,
				page_loading: true
			}));
			try {
				const response = await fetch(`${ORIGIN_URL}/api/feedbacks/${id}`, {
					method: 'DELETE'
				});

				if (!response.ok) {
					const errorResponse: ErrorResponse = await response.json();
					if (errorResponse) {
						throw new Error(errorResponse.message);
					} else {
						throw new Error(`API error: ${response.status}`);
					}
				}

				await invalidate('/api/feedbacks');

				update((state: FeedbackStore) => ({
					...state,
					page_loading: false
				}));
				toast.push('Feedback deleted successfully', { classes: ['success'] });
			} catch (error: any) {
				update((state: FeedbackStore) => ({
					...state,
					page_loading: false
				}));

				console.error(error);
				toast.push(error.toString(), { classes: ['danger'] });
			}
		}
	});

	return { subscribe, set, update };
};

const feedbackStore = useFeedbackStore();
export default feedbackStore;

export type ErrorResponse = {
	status: string;
	message: string;
};
export type FeedbackListResponse = {
	status: string;
	results: number;
	feedbacks: Feedback[];
};

export type FeedbackResponse = {
	status: string;
	data: { feedback: Feedback };
};
