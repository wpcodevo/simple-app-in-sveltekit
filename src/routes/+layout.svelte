<script>
	import '../app.postcss';
	import { SvelteToast } from '@zerodevx/svelte-toast';

	const options = {
		initial: 0,
		next: 1,
		duration: 6000,
		pausable: true
	};
</script>

<slot />
<SvelteToast {options} />

<style>
	:global(.danger) {
		--toastBackground: #4299e1;
		--toastBarBackground: #2b6cb0;
	}

	:global(.success) {
		--toastBackground: rgba(245, 208, 254, 0.95);
		--toastColor: #424242;
		--toastBarBackground: fuchsia;
	}
</style>
