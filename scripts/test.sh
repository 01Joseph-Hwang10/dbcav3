#!/bin/sh

rm ./private/jest.log
# touch ./private/jest.log
clear
python3 ./scripts/babel-test-mode.py on
jest --config jest.config.js $@
python3 ./scripts/babel-test-mode.py off
