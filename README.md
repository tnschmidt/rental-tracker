# Rental Tracker

A voice-enabled expense and hours tracker for rental properties, backed by Google Sheets. Speak or type entries like "3 hours cleaning" or "spent $35 at Walmart for supplies" and they're logged to a shared spreadsheet automatically.

## Setup

### 1. Create the Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet.
2. Name it something like **Rental Tracker**.
3. You don't need to create any tabs or headers — the script handles that automatically.

### 2. Deploy the Google Apps Script backend

1. In your new spreadsheet, click **Extensions > Apps Script**.
2. Delete any code already in the editor.
3. Copy the entire contents of `google-apps-script.js` from this repo and paste it in.
4. Click the **Save** icon (or Ctrl+S).
5. Click **Deploy > New deployment**.
6. Click the gear icon next to "Select type" and choose **Web app**.
7. Set the fields:
   - **Description:** Rental Tracker
   - **Execute as:** Me
   - **Who has access:** Anyone
8. Click **Deploy**.
9. When prompted to authorize, click through **Advanced > Go to \<project name\>** if it warns about an unverified app.
10. **Copy the Web App URL** it gives you — you'll need it in the next step.

### 3. Host the frontend

The app is a single `index.html` file. You need to serve it over **HTTPS** — microphone access won't work over plain HTTP on Android.

**GitHub Pages (easiest if this repo is on GitHub):**

1. Go to your repo on GitHub.
2. Navigate to **Settings > Pages**.
3. Under "Source", select your branch (e.g. `main`) and folder (`/ (root)`).
4. Click **Save**. Your app will be live at `https://<username>.github.io/rental-tracker/`.

**Other options:** Any static hosting that serves over HTTPS works (Netlify, Vercel, Firebase Hosting, Cloudflare Pages, etc.).

### 4. Connect the app to your spreadsheet

1. Open the hosted app URL in your phone's browser.
2. Tap the **Setup** banner (or the **Settings** button).
3. Paste the **Web App URL** you copied from step 2.
4. Optionally paste the **Google Sheet URL** so you can quickly open the spreadsheet from the app.

### 5. Install on your phone

**Android (Chrome):**

1. Open the app URL in Chrome.
2. Tap the **three-dot menu** (top right).
3. Tap **Add to Home screen**.
4. Name it and tap **Add**.

**iPhone (Safari):**

1. Open the app URL in Safari.
2. Tap the **Share** button (bottom center).
3. Scroll down and tap **Add to Home Screen**.
4. Tap **Add**.

The app will now launch like a native app from your home screen.

## Usage

1. Select a **person** and **property** at the top.
2. Tap the **microphone** button and speak, or use the text input at the bottom.

**Example voice/text commands:**

| Input | What gets logged |
|---|---|
| "3 hours cleaning" | 3 hrs — cleaning |
| "45 minutes laundry" | 0.75 hrs — laundry |
| "spent $35 at Walmart for supplies" | $35.00 — supplies (Walmart) |
| "$120 Home Depot lumber" | $120.00 — lumber (Home Depot) |

Entries are saved to Google Sheets and also stored locally on the device (last 50 entries).

## Customizing names and properties

The person and property buttons are defined directly in `index.html`. To change them, edit these lines near the top of the `<body>`:

```html
<!-- Person buttons -->
<button class="sel-btn active" onclick="selectUser('Thomas', this)">Thomas</button>
<button class="sel-btn" onclick="selectUser('Megan', this)">Megan</button>

<!-- Property buttons -->
<button class="sel-btn active-green" onclick="selectLLC('The Schmidt Home', this)">Schmidt Home</button>
<button class="sel-btn" onclick="selectLLC('JP Bishop Home', this)">JP Bishop Home</button>
```

Change the names in both the `onclick` argument and the button text. Add or remove buttons as needed.

## Updating the Apps Script

If you make changes to `google-apps-script.js` later:

1. Paste the updated code in the Apps Script editor.
2. Click **Deploy > New deployment** (not "Manage deployments").
3. Deploy as a **Web app** again with the same settings.
4. Copy the **new URL** and update it in the app's Settings — each deployment generates a new URL.
