
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Tiny JSON-file record store used by leads and newsletter subscribers.
 *
 * Files live in `data/` (git-ignored). This suits local development and a
 * single self-hosted server. Serverless hosts (e.g. Vercel) have an ephemeral
 * filesystem, so before deploying there, replace `readRecords` and
 * `appendRecord` with a database (Postgres, Supabase, MongoDB) — callers stay
 * the same.
 */

const DATA_DIR = process.env.DATA_DIR ?? path.join(process.cwd(), "data");

// Serialize writes within this process so concurrent requests don't clobber each other.
let writeQueue: Promise<unknown> = Promise.resolve();

export async function readRecords<T>(collection: string): Promise<T[]> {
  try {
    return JSON.parse(await readFile(path.join(DATA_DIR, `${collection}.json`), "utf8")) as T[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

/** Appends `record` unless `isDuplicate` matches an existing one. Returns false for duplicates. */
export async function appendRecord<T>(collection: string, record: T, isDuplicate?: (existing: T) => boolean) {
  let added = true;
  const task = writeQueue.then(async () => {
    await mkdir(DATA_DIR, { recursive: true });
    const records = await readRecords<T>(collection);
    if (isDuplicate && records.some(isDuplicate)) {
      added = false;
      return;
    }
    records.push(record);
    const file = path.join(DATA_DIR, `${collection}.json`);
    const tmp = `${file}.${process.pid}.tmp`;
    await writeFile(tmp, JSON.stringify(records, null, 2));
    await rename(tmp, file);
  });
  writeQueue = task.catch(() => {});
  await task;
  return added;
}
