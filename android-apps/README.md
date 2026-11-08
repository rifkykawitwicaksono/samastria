# Samastria Android source updates

This directory in the repository stores Android application source updates separately from the live website.

- Customer WebView app source: `android-customer/app/src/main/java/id/my/samastria/app/MainActivity.java`
- Admin WebView app source: `android-admin/app/src/main/java/id/my/samastria/app/MainActivity.java`

Implemented in these source files: offline retry screen, pull-to-refresh gesture, share-app menu, version menu, and (Admin) local four-digit PIN gate.

Build verification has not yet completed in this environment because Gradle 8.13 distribution download requires internet access. Review and build the source in the project folders before installing. The app ZIP packages are supplied separately in this conversation; the ZIP binaries were not rewritten into `assets` in this commit.
