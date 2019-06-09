THEME_NAME := lexi-theme

# Dirs
ARTIFACTS_DIR := artifacts
BUILD_DIR := build
PHP_DIR := theme_files
JS_DIR := ui

# Shortcuts
DOCKER_RUN := docker run --rm -v `pwd`:/workspace
WP_TEST_IMAGE := worldpeaceio/wordpress-integration:php7.2
COMPOSER_IMAGE := -w /workspace -v ~/.composer/cache:/tmp/cache composer
VENDOR_BIN_DIR := vendor/bin
NODE_IMAGE := -v ~/.npm:/root/.npm -w /workspace/$(JS_DIR) node:11

# Commands
all: setup lint build test_php

shell:
	$(DOCKER_RUN) -it $(WP_TEST_IMAGE) /bin/bash

shell_node:
	$(DOCKER_RUN) -it $(NODE_IMAGE) /bin/bash

setup: make_dirs composer_install npm_install

make_dirs:
	mkdir -p $(ARTIFACTS_DIR)
	mkdir -p $(BUILD_DIR)/$(THEME_NAME)

npm_install:
	$(DOCKER_RUN) $(NODE_IMAGE) npm install

npm_update:
	$(DOCKER_RUN) $(NODE_IMAGE) npm update

composer_install:
	$(DOCKER_RUN) $(COMPOSER_IMAGE) install

composer_update:
	$(DOCKER_RUN) $(COMPOSER_IMAGE) update

composer_update_nothing:
	$(DOCKER_RUN) $(COMPOSER_IMAGE) update nothing

lint: lint_php lint_js

lint_php:
	$(DOCKER_RUN) --entrypoint="$(VENDOR_BIN_DIR)/phpcs" $(WP_TEST_IMAGE) .

phpcbf:
	$(DOCKER_RUN) --entrypoint="$(VENDOR_BIN_DIR)/phpcbf" $(WP_TEST_IMAGE) .

lint_js:
	$(DOCKER_RUN) $(NODE_IMAGE) npm run lint

clean:
	rm -rf build/*

get_version:
	@awk '/Version/{printf $$NF}' theme_files/style.css

test: build_zip test_php

test_php:
	$(DOCKER_RUN) -v `pwd`/$(BUILD_DIR)/$(THEME_NAME)/:/wordpress/tests/phpunit/data/themedir1/default/ $(WP_TEST_IMAGE) "vendor/bin/phpunit --testsuite integration"

build: build_react_app build_zip

build_react_app:
	$(DOCKER_RUN) $(NODE_IMAGE) npm run build

build_zip: clean
	rsync -r $(PHP_DIR)/ $(BUILD_DIR)/$(THEME_NAME)/
	rsync -r vendor/acf/acf/ $(BUILD_DIR)/$(THEME_NAME)/acf/
	rsync -r $(JS_DIR)/$(BUILD_DIR)/static/ $(BUILD_DIR)/$(THEME_NAME)/static/
	$(DOCKER_RUN) --entrypoint="bin/set_static_versions.sh" $(WP_TEST_IMAGE)
	cd $(BUILD_DIR) && zip -r ../$(ARTIFACTS_DIR)/$(THEME_NAME)-$(shell make get_version).zip ./$(THEME_NAME)
