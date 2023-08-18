#!/bin/sh

cd android
./gradlew clean
rm -rf *.hprof
cd ..
