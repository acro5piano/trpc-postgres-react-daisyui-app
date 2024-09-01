dev:
	docker-compose up -d
	make -j dev/server dev/frontend

dev/server:
	cd server && pnpm i && pnpm migrate latest && pnpm dev

dev/frontend:
	cd frontend && pnpm i && pnpm dev
