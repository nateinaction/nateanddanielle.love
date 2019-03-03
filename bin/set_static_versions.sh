#!/usr/bin/env bash

# vars
BUILD_DIR="build/lexi-theme"
STYLE_CSS="${BUILD_DIR}/style.css"
FUNCTIONS_PHP="${BUILD_DIR}/functions.php"
JS_DIR="${BUILD_DIR}/static/js"
CSS_DIR="${BUILD_DIR}/static/css"

# Get create-react-app files
SED_PATTERN="s|${BUILD_DIR}||"
NON_MAIN_JS_FILE=$(find ${JS_DIR} -name '*.js' | grep -v "main" | sed "${SED_PATTERN}")
MAIN_JS_FILE=$(find ${JS_DIR} -name 'main.*.js' | sed "${SED_PATTERN}")
MAIN_CSS_FILE=$(find ${CSS_DIR} -name '*.css' | sed "${SED_PATTERN}")

# Get theme version
THEME_VERSION=$(awk '/Version/{printf $NF}' ${STYLE_CSS})

# Make replacement to build functions.php
sed -i "s|lexi_version|${THEME_VERSION}|" "${FUNCTIONS_PHP}"
sed -i "s|lexi_non_main_js|${NON_MAIN_JS_FILE}|" "${FUNCTIONS_PHP}"
sed -i "s|lexi_main_js|${MAIN_JS_FILE}|" "${FUNCTIONS_PHP}"
sed -i "s|lexi_main_css|${MAIN_CSS_FILE}|" "${FUNCTIONS_PHP}"