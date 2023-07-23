<script lang="ts">
	import feedbackStore from '$lib/store';
	import { onMount } from 'svelte';
	import FeedbackForm from '../components/feedback-form.svelte';
	import FeedbackStats from '../components/feedback-stats.svelte';
	import FeedbackItem from '../components/feedback-item.svelte';
	import LoadingSkeleton from '../components/loading-skeleton.svelte';
	import type { PageData } from './$types';
	import { invalidate } from '$app/navigation';

	export let data: PageData;
	$: ({ feedbacks } = data);
	let pageLoading = false;
	let isFirstLoad = true;

	async function onFocus() {
		$feedbackStore.setPageLoading(true);
		await invalidate('/api/feedbacks');
		$feedbackStore.setPageLoading(false);
	}

	onMount(() => {
		if (isFirstLoad) {
			isFirstLoad = false;
		}

		window.addEventListener('focus', onFocus);

		return () => {
			window.removeEventListener('focus', onFocus);
		};
	});

	$: pageLoading = $feedbackStore.page_loading || isFirstLoad;
</script>

<main class="md:container mt-24 px-5">
	<FeedbackForm />
	<FeedbackStats {feedbacks} />

	{#if isFirstLoad}
		{#each Array.from({ length: 4 }, (_, i) => i + 1) as i}
			<LoadingSkeleton />
		{/each}
	{:else}
		{#each feedbacks as feedback}
			<FeedbackItem {feedback} />
		{/each}

		<!-- {#if feedbacks.length === 0 && !isFirstLoad}
			<p class="max-w-md mx-auto py-6 text-center text-lg rounded-md bg-white">
				No Feedbacks Found
			</p>
		{/if} -->
	{/if}
</main>
{#if pageLoading}
	<div
		class="fixed top-5 left-5 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-yellow-400 border-r-transparent align-[-0.125em] text-warning motion-reduce:animate-[spin_1.5s_linear_infinite]"
		role="status"
	>
		<span
			class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
		>
			Loading...
		</span>
	</div>
{/if}
