start_db:
	docker compose up -d

stop_db:
	docker compose down

server:
	yarn run dev

migrate_up:
	npx sequelize db:migrate	

migrate_down:
	npx sequelize db:migrate:undo

create_migration:
	npx sequelize migration:generate --name $(name)	

.PHONEY: start_db stop_db server