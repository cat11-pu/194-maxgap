// largest.js：找最大差（基线：一律给零）
import { diffAt } from "./diffs.js";

export function largestGap(values) {
  return { gaps: [], best_at: 0, biggest: 0 };
}
