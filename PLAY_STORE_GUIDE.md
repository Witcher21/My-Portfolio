# 📱 How to Publish Your Portfolio to Google Play Store (Free Method)

This guide uses **Trusted Web Activities (TWA)**, the modern way to turn websites into Android apps.
Your site is already configured as a PWA, ready for this process.

## Prerequisites

1.  **Deploy your site** first! (e.g., to Vercel/Netlify).
    - Command: `npx vercel` (Follow login/prompts).
    - Example URL: `https://nawod-sys-portfolio.vercel.app`
2.  **Google Play Developer Account** ($25 one-time fee).
    - [Sign up here](https://play.google.com/console/signup)

---

## Step 1: Create the Android App Bundle (.aab)

We installed `@bubblewrap/cli` for you. Now run these commands in your project folder:

1.  **Initialize the Project**:

    ```bash
    bubblewrap init --manifest https://YOUR-DEPLOYED-URL.com/manifest.json
    ```

    - Replace `https://YOUR-DEPLOYED-URL.com` with your real live site URL.
    - **Answer Prompts**:
      - **Domain**: `your-site.vercel.app`
      - **App Name**: `Nawod Portfolio`
      - **Theme Color**: `#000000` (Black)
      - **Maskable Icon**: Yes (It will use the one from manifest)
      - **Signing Key**: Create new -> Password: `password123` (Remember this!)

2.  **Build the App**:
    ```bash
    bubblewrap build
    ```

    - This will ask you for the password you just created.
    - It will generate two files:
      - `app-release-bundle.aab` (Upload to Play Store)
      - `app-release-signed.apk` (Install on your phone to test)

---

## Step 2: Verify Asset Links (Important!)

For the app to hide the URL bar (look like a real app), Google needs to verify you own the website.

1.  Bubblewrap created a file called `assetlinks.json`.
2.  **Upload this file** to your website at:
    `https://YOUR-DEPLOYED-URL.com/.well-known/assetlinks.json`
    - In Next.js: Place `assetlinks.json` inside your `public/.well-known/` folder.
    - Mark `public/.well-known` directory if it doesn't exist.
3.  **Deploy again** (`npx vercel`) so Google can see the file.

---

## Step 3: Publish to Google Play Store

1.  Go to **[Google Play Console](https://play.google.com/console)**.
2.  Click **Create App**.
3.  Fill in the details (Name, Language, etc.).
4.  Navigate to **App releases** -> **Production** -> **Create new release**.
5.  **Upload the `app-release-bundle.aab` file** generated in Step 1.
6.  Complete the Store Listing (Screenshots, Description, Content Rating).
7.  Click **Review and Rollout**!

---

Your app will be live on the Play Store within a few days! 🚀
