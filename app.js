// app.js：渲染结果
import { diffAt } from "./diffs.js";
import { largestGap } from "./largest.js";

export function render(spec) {
  const values = spec.values || [];
  const view = largestGap(values);
  const gaps = view.gaps || [];
  return { gaps: gaps, best_at: view.best_at || 0, biggest: view.biggest || 0,
           count: gaps.length, value_count: values.length,
           total: gaps.reduce((sum, item) => sum + item, 0) };
}
