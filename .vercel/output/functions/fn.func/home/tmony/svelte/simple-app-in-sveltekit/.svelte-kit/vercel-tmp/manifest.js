export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.aad78698.js","app":"_app/immutable/entry/app.65d01913.js","imports":["_app/immutable/entry/start.aad78698.js","_app/immutable/chunks/scheduler.4f524d2e.js","_app/immutable/chunks/singletons.0cd6c329.js","_app/immutable/chunks/index.54d44800.js","_app/immutable/entry/app.65d01913.js","_app/immutable/chunks/scheduler.4f524d2e.js","_app/immutable/chunks/index.096ecd25.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/feedbacks",
				pattern: /^\/api\/feedbacks\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/feedbacks/_server.ts.js'))
			},
			{
				id: "/api/feedbacks/[id]",
				pattern: /^\/api\/feedbacks\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/feedbacks/_id_/_server.ts.js'))
			},
			{
				id: "/api/hello",
				pattern: /^\/api\/hello\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/hello/_server.ts.js'))
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
