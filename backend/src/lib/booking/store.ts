import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Bookings, one JSON file on the API's volume (DATA_DIR, /data on Railway). Each booking has a secret
 * manage token for its reschedule and cancel links; only its SHA-256 hash is stored.
 */

const DATA_DIR = process.env.DATA_DIR ?? path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "bookings.json");

export type Booking = {
  id: string;
  eventId: string;
  status: "confirmed" | "cancelled";
  start: string;
  end: string;
  timeZone: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  guests: string[];
  meetLink?: string;
  tokenHash: string;
  createdAt: string;
  updatedAt: string;
  history: { at: string; action: "booked" | "rescheduled" | "cancelled"; start?: string }[];
};

let queue: Promise<unknown> = Promise.resolve();

/** Runs `task` after every earlier one, so reads and writes (and slot checks) never interleave. */
export function serialized<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(task);
  queue = run.catch(() => {});
  return run;
}

export async function readBookings(): Promise<Booking[]> {
  try {
    return JSON.parse(await readFile(FILE, "utf8")) as Booking[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

/** Write the whole list. Call only inside `serialized`. */
export async function writeBookings(bookings: Booking[]) {
  await mkdir(DATA_DIR, { recursive: true });
  const tmp = `${FILE}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(bookings, null, 2));
  await rename(tmp, FILE);
}

export const newId = () => randomBytes(9).toString("base64url");
export const newToken = () => randomBytes(32).toString("base64url");
export const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");

export function tokenMatches(booking: Booking, token: string) {
  const a = Buffer.from(hashToken(token), "hex");
  const b = Buffer.from(booking.tokenHash, "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}
