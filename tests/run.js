import assert from "node:assert";
import { diffAt } from "../diffs.js";
import { largestGap } from "../largest.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("diffAt returns a number", () => {
  assert.strictEqual(typeof diffAt([1, 3], 0), "number");
});

check("largestGap returns gaps", () => {
  assert.ok(Array.isArray(largestGap([1, 3]).gaps));
});

check("largestGap returns biggest", () => {
  assert.strictEqual(typeof largestGap([1, 3]).biggest, "number");
});

check("render counts gaps", () => {
  assert.strictEqual(typeof render({ values: [1, 3] }).count, "number");
});

check("render exposes best position", () => {
  assert.strictEqual(typeof render({ values: [1, 3] }).best_at, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
