PROJECT = "Jolicode Technical Test"

start: install frontend

install: ;@echo "Installing ${PROJECT}....."; \
	npm install  \

frontend: ;@echo "Launching ${PROJECT}....."; \
	npm run start
