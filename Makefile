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
VENDOR_BIN_DIR := /workspace/vendor/bin
NODE_IMAGE := -v ~/.npm:/root/.npm -w /workspace/ui/ node:11

# Commands
all: setup lint build

shell:
	$(DOCKER_RUN) -it --entrypoint "/bin/bash" $(WP_TEST_IMAGE)

shell_node:
	$(DOCKER_RUN) -it --entrypoint "/bin/bash" $(NODE_IMAGE)

setup: composer_install npm_install

npm_install:
	$(DOCKER_RUN) --entrypoint "npm" $(NODE_IMAGE) install

composer_install:
	$(DOCKER_RUN) $(COMPOSER_IMAGE) install

composer_update:
	$(DOCKER_RUN) $(COMPOSER_IMAGE) update

composer_update_nothing:
	$(DOCKER_RUN) $(COMPOSER_IMAGE) update nothing

lint: lint_php lint_js

lint_php:
	$(DOCKER_RUN) --entrypoint "$(VENDOR_BIN_DIR)/phpcs" $(WP_TEST_IMAGE) .

phpcbf:
	$(DOCKER_RUN) --entrypoint "$(VENDOR_BIN_DIR)/phpcbf" $(WP_TEST_IMAGE) .

lint_js:
	$(DOCKER_RUN) --entrypoint "npm" $(NODE_IMAGE) run lint

clean:
	rm -rf build

get_version:
	@awk '/Version/{printf $$NF}' theme_files/style.css

build: build_react_app build_zip

move_acf_vendor_to_build:
	mkdir -p $(BUILD_DIR)/$(THEME_NAME)
	rsync -r vendor/acf/ $(BUILD_DIR)/$(THEME_NAME)/acf/

build_react_app:
	$(DOCKER_RUN) --entrypoint "npm" $(NODE_IMAGE) build

build_zip: clean move_acf_vendor_to_build
	mkdir -p $(ARTIFACTS_DIR)
	mkdir -p $(BUILD_DIR)/$(THEME_NAME)
	rsync -r $(PHP_DIR)/ $(BUILD_DIR)/$(THEME_NAME)/
	cp $(shell find ui/build/static/js -name '*.js') $(BUILD_DIR)/$(THEME_NAME)/ui.js
	# Contcatenating style.css with minified react app style
	cat $(shell find ui/build/static/css -name '*.css') >> $(BUILD_DIR)/$(THEME_NAME)/style.css
	cd $(BUILD_DIR) && zip -r ../$(ARTIFACTS_DIR)/$(THEME_NAME)-$(shell make get_version).zip ./$(THEME_NAME) && cd -
