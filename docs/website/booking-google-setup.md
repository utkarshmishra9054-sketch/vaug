# Connect vaug.in/book to your Google Calendar

vaug.in/book shows times from your Google Calendar and books calls straight into it, with a Google Meet
link, and Google emails the invite to the client, Dolsi and any guests. Until you finish these steps, the
page says "Online booking opens soon" and sends people to the contact form, so nothing breaks while you
do this.

You do every Google sign-in yourself. Nobody needs your Google password, and the three values you create
at the end go straight into Railway, not into a chat or the repo.

It takes about 15 minutes. You need:

- your personal Gmail, the account whose calendar should receive the bookings;
- this repo on your Mac, with Node.js installed (it already is if you've run the site locally);
- access to the `vaug` project on railway.com.

---

## 1. Create a Google Cloud project

1. Go to <https://console.cloud.google.com/> and sign in with your personal Gmail.
2. Accept the terms if asked.
3. In the top bar, click the project picker (it may say "Select a project"), then **New project**.
4. Project name: `VAUG booking`. Leave the location as it is. Click **Create**.
5. When the notification says it's ready, click **Select project**. Check the top bar now shows `VAUG booking`.

## 2. Turn on the Google Calendar API

1. Open the menu (☰, top left) and go to **APIs & Services → Library**.
2. Search for `Google Calendar API` and open it.
3. Click **Enable**.

## 3. Set up the OAuth consent screen

Google calls this the **Google Auth Platform**. The menu names below are the current ones; older screens
call the same things "OAuth consent screen".

1. Menu (☰) → **APIs & Services → OAuth consent screen** (or **Google Auth Platform**). Click **Get started**.
2. **App information:** App name `VAUG booking`. User support email: your Gmail. Click **Next**.
3. **Audience:** choose **External**. Click **Next**.
4. **Contact information:** your Gmail. Click **Next**.
5. Tick the agreement and click **Continue**, then **Create**.
6. In the left menu, open **Data access** → **Add or remove scopes**. In "Manually add scopes", paste
   these two lines, click **Add to table**, then **Update** and **Save**:

   ```text
   https://www.googleapis.com/auth/calendar.events
   https://www.googleapis.com/auth/calendar.freebusy
   ```

7. In the left menu, open **Audience**. Under **Test users**, click **Add users**, add your Gmail, and save.
8. Still on **Audience**, under **Publishing status**, click **Publish app**, then **Confirm**. The status
   should now read **In production**.

   This matters: while an app is in "Testing", Google expires its refresh tokens after 7 days and booking
   would stop working a week later. "In production" without Google's verification is fine for your own
   account. You'll just see a "Google hasn't verified this app" warning once, in step 5.

## 4. Create the OAuth client

1. Left menu → **Clients** (or **APIs & Services → Credentials**) → **Create client** (or **Create
   credentials → OAuth client ID**).
2. Application type: **Desktop app**. Name: `VAUG booking token`. Click **Create**.
3. A box shows the **Client ID** and **Client secret**. Keep it open, or click **Download JSON** and keep
   the file somewhere private. You need both values in the next step.

## 5. Get the refresh token (run this yourself)

1. Open Terminal and run:

   ```bash
   cd ~/development/shunyase/VAUG/backend && node scripts/google-refresh-token.mjs
   ```

2. Paste the **Client ID** when asked and press Enter, then the **Client secret** and press Enter.
3. Your browser opens Google's sign-in. Choose your personal Gmail.
4. You'll see **Google hasn't verified this app**. Click **Advanced**, then **Go to VAUG booking (unsafe)**.
   It's your own app, so this is expected.
5. Tick **both** permissions (view and edit events on your calendars, and see your calendar availability)
   and click **Continue**.
6. The tab says "Done". Back in Terminal you'll see the three variables, with the refresh token printed in
   full. Leave the Terminal window open for the next step.

If Terminal says it got no refresh token, open <https://myaccount.google.com/permissions>, remove
**VAUG booking**, and run the script again.

## 6. Add the three values to Railway

1. Go to <https://railway.com/>, open the **vaug** project, then the **vaug-api** service.
2. Open the **Variables** tab and click **New Variable** three times:

   | Name | Value |
   | --- | --- |
   | `GOOGLE_CLIENT_ID` | the Client ID from step 4 |
   | `GOOGLE_CLIENT_SECRET` | the Client secret from step 4 |
   | `GOOGLE_REFRESH_TOKEN` | the refresh token from step 5 |

3. Railway shows a bar saying there are changes to apply. Click **Deploy** (or **Apply changes**).
4. Wait for the vaug-api deployment to say **Success** (about a minute).

## 7. Check it

1. Open <https://vaug.in/book>. Instead of "Online booking opens soon" you should see a month calendar
   with highlighted days, and times on the right.
2. Tell the Leader Agent (or the Website Improver) it's connected. It will make one test booking titled
   **TEST – please ignore**, with your OK first because it emails Dolsi, check the Meet link and the
   invites, then cancel it.

---

## How booking works once it's on

- Clients see 30-minute slots in their own time zone, Monday to Friday, 09:00–18:00 their time, for the
  next 30 days, starting at least 4 hours from now. Anything busy on your Google Calendar is hidden, with
  15 minutes kept free either side.
- A booking creates an event on your primary calendar with a Google Meet link. Google emails the invite to
  the client, to dolsi@vaug.in and to any guests the client adds. You're the organiser.
- Every invite has **Reschedule** and **Cancel** links. Using them moves or deletes the event, and Google
  emails everyone the change.
- To block time, just add an event (or an all-day "busy" event) to your calendar.

To change the rules, set any of these on vaug-api in Railway, then redeploy:

| Variable | Default | Meaning |
| --- | --- | --- |
| `BOOKING_DURATION_MINUTES` | `30` | Call length |
| `BOOKING_BUFFER_MINUTES` | `15` | Free time kept before and after |
| `BOOKING_MIN_NOTICE_HOURS` | `4` | Earliest start, from now |
| `BOOKING_WINDOW_DAYS` | `30` | How far ahead people can book |
| `BOOKING_ALWAYS_INVITE` | `dolsi@vaug.in` | Always invited (comma-separated) |
| `BOOKING_ENABLED` | `true` | Set to `false` to switch back to the "opens soon" page |

The working hours (09:00–18:00, Monday to Friday, in the client's time zone) are in
`backend/src/lib/booking/config.ts`.

## If something goes wrong

- **The page still says "opens soon":** check that all three variables are on **vaug-api** (not
  vaug-web), and that the deployment finished.
- **"Booking is temporarily unavailable":** the refresh token stopped working. Usually the app was left
  in "Testing" (step 3.8), the app was removed at myaccount.google.com/permissions, or your Google password
  changed. Redo step 5 and update `GOOGLE_REFRESH_TOKEN`.
- **To switch booking off quickly:** set `BOOKING_ENABLED` to `false` on vaug-api and deploy.
- **To revoke access completely:** remove **VAUG booking** at <https://myaccount.google.com/permissions>.
  Booking goes back to "opens soon" until you redo step 5.

Never paste the client secret or refresh token into a chat, an email or a file in the repo.
