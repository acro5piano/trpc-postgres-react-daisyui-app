dev:
	make -j dev/server dev/frontend

dev/server:
	cd server && pnpm i && pnpm dev

dev/frontend:
	cd frontend && pnpm i && pnpm dev
