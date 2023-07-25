commands:
	pnpm create svelte@latest simple-app-in-sveltekit
	 
	pnpm add @prisma/client && pnpm add -D prisma
	pnpm prisma init
	pnpm prisma migrate dev --name init

	npx svelte-add tailwindcss

	pnpm i -D @zerodevx/svelte-toast