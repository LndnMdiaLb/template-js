#!/usr/bin/env bash
# 2 webpack entry points
mkdir src webpack webpack/loaders webpack/plugins;
touch src/app.js src/lib.js;

# potentially point .sh files with npm babel loading