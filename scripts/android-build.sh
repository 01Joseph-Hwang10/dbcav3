#!/bin/sh

# Fix for not applying changes in release
rm android/app/src/main/assets/index.android.bundle
rm -rf android/app/src/main/res/drawable-*
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

# Bundle to apk
cd android
./gradlew clean app:assembleRelease -x bundleReleaseJsAndAssets
cd ..
