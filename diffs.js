// diffs.js：算一对相邻差，后一个减前一个（可以为负）
export function diffAt(values, spot) {
  return values[spot + 1] - values[spot];
}
