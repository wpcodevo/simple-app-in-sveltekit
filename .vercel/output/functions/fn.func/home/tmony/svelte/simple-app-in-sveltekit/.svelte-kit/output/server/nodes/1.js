

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.d2e7b4d7.js","_app/immutable/chunks/scheduler.4f524d2e.js","_app/immutable/chunks/index.096ecd25.js","_app/immutable/chunks/singletons.11c3020b.js","_app/immutable/chunks/index.54d44800.js"];
export const stylesheets = [];
export const fonts = [];
