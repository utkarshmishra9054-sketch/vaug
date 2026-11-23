#!/usr/bin/env node
/**
 * Get a Google refresh token for vaug.in/book. Run it yourself, on your own computer:
 *
 *   cd backend && node scripts/google-refresh-token.mjs
 *
 * It asks for the OAuth client ID and secret (from Google Cloud, "Desktop app" client), opens Google's
 * consent page in your browser, catches the reply on 127.0.0.1, and prints the refresh token here in your
 * terminal. Nothing is sent anywhere except Google. Paste the three values into Railway yourself; never
 * into a chat or a file in the repo. See docs/website/booking-google-setup.md.
 */
import { createServer } from "node:http";
import { randomBytes } from "node:crypto";
import { exec } from "node:child_process";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const SCOPES = ["https://www.googleapis.com/auth/calendar.events", "https://www.googleapis.com/auth/calendar.freebusy"];

const rl = createInterface({ input, output });
const clientId = (process.env.GOOGLE_CLIENT_ID || (await rl.question("OAuth client ID: "))).trim();
const clientSecret = (process.env.GOOGLE_CLIENT_SECRET || (await rl.question("OAuth client secret: "))).trim();
rl.close();
if (!clientId || !clientSecret) {
  console.error("Both the client ID and the client secret are needed.");
  process.exit(1);
}

const state = randomBytes(16).toString("hex");

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://127.0.0.1");
  if (url.pathname !== "/") return res.writeHead(404).end();
  const reply = (status, text) => {
    res.writeHead(status, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`<!doctype html><meta charset="utf-8"><title>VAUG booking</title><body style="font:16px system-ui;padding:3rem;max-width:40rem"><p>${text}</p></body>`);
  };
  if (url.searchParams.get("state") !== state) return reply(400, "This reply didn't come from this script. Close the tab and run the script again.");
  const error = url.searchParams.get("error");
  if (error) {
    reply(400, `Google said: ${error}. Close this tab and check the guide.`);
    console.error(`\nGoogle returned an error: ${error}`);
    return server.close();
  }
  const code = url.searchParams.get("code");
  const redirectUri = `http://127.0.0.1:${server.address().port}`;
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code, client_id: clientId, client_secret: clientSecret, redirect_uri: redirectUri, grant_type: "authorization_code" }),
  });
  const json = await tokenRes.json();
  if (!tokenRes.ok || !json.refresh_token) {
    reply(500, "Couldn't get a refresh token. Look at the terminal for what to do.");
    console.error(`\nToken exchange failed: ${json.error ?? tokenRes.status}${json.refresh_token ? "" : " (no refresh token returned)"}`);
    console.error("If you approved this app before, remove it at https://myaccount.google.com/permissions and run the script again.");
    return server.close();
  }
  const granted = String(json.scope ?? "").split(" ");
  const missing = SCOPES.filter((s) => !granted.includes(s));
  reply(200, "Done. Go back to your terminal for the refresh token. You can close this tab.");
  console.log("\nSuccess. Add these three variables to the vaug-api service in Railway:\n");
  console.log(`GOOGLE_CLIENT_ID=${clientId}`);
  console.log("GOOGLE_CLIENT_SECRET=(the secret you just pasted)");
  console.log(`GOOGLE_REFRESH_TOKEN=${json.refresh_token}`);
  if (missing.length) console.log(`\nWarning: these permissions weren't granted: ${missing.join(", ")}. Run again and tick every box.`);
  console.log("\nKeep the refresh token private. Don't paste it into chats or commit it.");
  server.close();
});

server.listen(0, "127.0.0.1", () => {
  const redirectUri = `http://127.0.0.1:${server.address().port}`;
  const auth = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  auth.search = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: SCOPES.join(" "),
    access_type: "offline",
    prompt: "consent",
    include_granted_scopes: "true",
    state,
  }).toString();
  console.log("\nOpening Google in your browser. If it doesn't open, copy this link into your browser:\n");
  console.log(auth.toString());
  console.log("\nSign in with the Gmail whose calendar should take bookings, then approve both permissions.");
  const opener = process.platform === "darwin" ? "open" : process.platform === "win32" ? "start \"\"" : "xdg-open";
  exec(`${opener} "${auth.toString()}"`);
});
