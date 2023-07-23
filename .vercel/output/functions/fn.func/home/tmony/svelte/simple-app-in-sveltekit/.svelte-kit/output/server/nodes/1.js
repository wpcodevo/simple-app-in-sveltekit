

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.dd2bcec3.js","_app/immutable/chunks/scheduler.4f524d2e.js","_app/immutable/chunks/index.096ecd25.js","_app/immutable/chunks/singletons.78f7b6fa.js","_app/immutable/chunks/index.54d44800.js"];
export const stylesheets = [];
export const fonts = [];
