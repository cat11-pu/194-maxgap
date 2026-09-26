// largest.js：一次扫描找最大相邻差（按绝对值比较，并列取靠前的一对）
import { diffAt } from "./diffs.js";

export function largestGap(values) {
  if (!Array.isArray(values) || values.length < 2) {
    const error = new Error("values must contain at least two numbers");
    error.code = "E_TOO_SHORT";
    throw error;
  }
  const gaps = [];
  let best_at = 0;
  let biggest = -1;
  for (let spot = 0; spot < values.length - 1; spot += 1) {
    const gap = diffAt(values, spot);
    gaps.push(gap);
    const size = Math.abs(gap);
    if (size > biggest) {
      biggest = size;
      best_at = spot;
    }
  }
  return { gaps: gaps, best_at: best_at, biggest: biggest };
}
