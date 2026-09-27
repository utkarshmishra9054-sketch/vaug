import type { Screen } from "./kit";
import { reconciliationScreens } from "./reconciliation";

/** Product screenshots per case study slug, in the order of `study.screenshots`. */
export const SCREENS: Record<string, Screen[]> = {
  "reconciliation-agent-frankfurt-payments": reconciliationScreens,
};
