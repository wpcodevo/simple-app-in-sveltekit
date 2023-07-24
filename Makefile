commands:
	pnpm create svelte@latest simple-app-in-sveltekit 
	pnpm add @prisma/client && pnpm add -D prisma
	pnpm prisma init --datasource-provider postgres
	pnpm prisma migrate dev --name init