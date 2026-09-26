// largest.js：找最大差，按绝对值比较，并列时取靠前的那一对
import { diffAt } from "./diffs.js";

export function largestGap(values) {
  if (!Array.isArray(values) || values.length < 2) {
    const error = new Error("E_TOO_SHORT: need at least two values");
    error.code = "E_TOO_SHORT";
    throw error;
  }
  const gaps = new Array(values.length - 1);
  let best_at = 0;
  let biggest = 0;
  for (let spot = 0; spot < gaps.length; spot += 1) {
    const gap = diffAt(values, spot);
    gaps[spot] = gap;
    const size = Math.abs(gap);
    if (size > biggest) {
      biggest = size;
      best_at = spot;
    }
  }
  return { gaps: gaps, best_at: best_at, biggest: biggest };
}
