# Brain Master – Mind Challenge (Android APK Project)

This project contains the complete native Android packaging setup for **Brain Master – Mind Challenge**.

---

## 🚀 How to Get Your APK

### Method 1: Automatic Cloud Build via GitHub (Recommended — No Android Studio Needed)

You do not need to install Android Studio or the Android SDK on your computer. GitHub will build the APK for you in the cloud:

1. **Commit your files**:
   ```bash
   git add .
   git commit -m "Add Android native project and GitHub Actions build workflow"
   ```

2. **Create a repository on GitHub** (e.g. `brain-master-android`).

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   git branch -M main
   git push -u origin main
   ```

4. **Download the APK**:
   * In your GitHub repository, click on the **Actions** tab.
   * Click on the running/finished workflow **"Build Android APK"**.
   * Under **Artifacts** at the bottom, click **BrainMaster-Release-APK** or **BrainMaster-Debug-APK** to download your ready-to-install `.apk` file!

---

### Method 2: Build Locally with Android Studio

If you have or install [Android Studio](https://developer.android.com/studio):

1. Open Android Studio.
2. Click **Open** and select the `android` folder (`c:\Users\HP\Downloads\brain-master-bui\android`).
3. Wait for Gradle sync to complete.
4. Click **Build** &rarr; **Build Bundle(s) / APK(s)** &rarr; **Build APK(s)**.
5. Android Studio will generate the APK in:
   `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 📱 Features of this Android Setup

* **100% Offline**: All game assets (`index.html`, JavaScript, CSS, icons, sounds) are bundled directly inside the APK assets directory (`android/app/src/main/assets/`). No internet connection is required to play.
* **Modern WebView Client**: Implements `WebViewClient` intercepting `https://appassets.androidplatform.net/` requests to avoid CORS and file URI restrictions, ensuring Web Audio API, LocalStorage, and ES modules work seamlessly.
* **Android Back-Button Integration**: Pressing the Android back button navigates in-game levels and modals.
* **Hardware Acceleration**: Enabled in `AndroidManifest.xml` for smooth 60fps canvas animations.
* **Pre-configured App Icons & Styling**: Matches the dark theme (`#0F172A`) and includes adaptive mipmap launcher icons.
