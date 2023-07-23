<script lang="ts">
	import type { Feedback } from '@prisma/client';

	export let feedbacks: Feedback[];

	$: count = feedbacks.length;
	$: sum = feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0);
	$: average = count > 0 ? (sum / count).toFixed(2) : '0.00';
</script>

<div class="flex justify-between items-center mb-11 text-white">
	<h4>{count} Reviews</h4>
	<h4>Ratings Average: {average}</h4>
</div>
