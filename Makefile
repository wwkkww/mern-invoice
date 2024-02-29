check:
	docker compose -f docker-compose.yml config 
	
build: 
	docker compose -f docker-compose.yml up --build -d --remove-orphans

up:
	docker compose -f docker-compose.yml up -d

down:
	docker compose -f docker-compose.yml down

down-v:
	docker compose -f docker-compose.yml down -v

show-logs:
	docker compose -f docker-compose.yml logs

show-logs-api:
	docker compose -f docker-compose.yml logs api

show-logs-client:
	docker compose -f docker-compose.yml logs client

user:
	docker run --rm mern-invoice-api whoami

volume:
	docker volume inspect mern-invoice_mongodb-data
