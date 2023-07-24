import * as universal from '../entries/pages/_page.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/2.4a1a8eea.js","_app/immutable/chunks/scheduler.4f524d2e.js","_app/immutable/chunks/index.096ecd25.js","_app/immutable/chunks/SvelteToast.svelte_svelte_type_style_lang.78f221c8.js","_app/immutable/chunks/index.54d44800.js","_app/immutable/chunks/singletons.11c3020b.js"];
export const stylesheets = ["_app/immutable/assets/SvelteToast.126e14af.css"];
export const fonts = [];
