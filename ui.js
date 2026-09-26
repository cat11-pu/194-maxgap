// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  parts.log.textContent = "数值 " + (spec.values || []).length + " 个，点按钮看相邻差。";

  function draw() {
    let view = null;
    try {
      view = render(spec);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.gaps.forEach(function (value, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = "第 " + (spot + 1) + " 与 " + (spot + 2);
      row.appendChild(head);
      const bar = document.createElement("span");
      bar.className = "bar";
      const fill = document.createElement("i");
      fill.style.width = Math.min(100, Math.abs(value) * 5) + "%";
      bar.appendChild(fill);
      row.appendChild(bar);
      const mark = document.createElement("span");
      mark.className = "chip" + (spot === view.best_at ? " ok" : "");
      mark.textContent = "差 " + value + (spot === view.best_at ? "（最大）" : "");
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "最大差 " + view.biggest + "（第 " + (view.best_at + 1) + " 与 " + (view.best_at + 2) + " 之间）";
    parts.log.textContent = "差个数 " + view.count;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "算相邻差";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "末尾加一个更大的值";
  addButton.addEventListener("click", function () {
    const view = render(spec);
    spec.values = (spec.values || []).concat([view.biggest + 10]);
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "去掉最后一个";
  dropButton.addEventListener("click", function () {
    spec.values = (spec.values || []).slice(0, -1);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一个值";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "number";
  box.value = "12";
  box.addEventListener("input", function () {
    const parsed = Number(box.value);
    if (!Number.isNaN(parsed)) {
      try {
        const view = render(Object.assign({}, spec, { values: (spec.values || []).concat([parsed]) }));
        parts.out.textContent = "加入 " + parsed + " 后最大差 " + view.biggest;
      } catch (error) {
        parts.out.textContent = String(error && error.code ? error.code : String(error));
      }
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看最大差";
  readButton.addEventListener("click", function () {
    const view = render(spec);
    parts.out.textContent = "最大差 " + view.biggest;
  });
  parts.controls.appendChild(readButton);

  draw();
}
