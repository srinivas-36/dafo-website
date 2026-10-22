import { writeFileSync } from "node:fs";
import { spawn } from "node:child_process";

const edge = String.raw`C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`;
spawn(
  edge,
  [
    "--headless=new",
    "--disable-gpu",
    "--remote-debugging-port=9225",
    `--user-data-dir=${process.env.TEMP}\\edge-shade2`,
    "about:blank",
  ],
  { stdio: "ignore", detached: true },
).unref();

async function waitForPage() {
  for (let i = 0; i < 20; i++) {
    try {
      const pages = await (await fetch("http://127.0.0.1:9225/json")).json();
      const page = pages.find((t) => t.type === "page");
      if (page) return page;
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error("no page");
}

const page = await waitForPage();
const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
function send(method, params = {}) {
  const msgId = ++id;
  return new Promise((resolve, reject) => {
    pending.set(msgId, { resolve, reject });
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });
}
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const p = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) p.reject(new Error(JSON.stringify(msg.error)));
    else p.resolve(msg.result);
  }
};
await new Promise((resolve) => {
  ws.onopen = resolve;
});
await send("Page.enable");
const loaded = new Promise((resolve) => {
  const prev = ws.onmessage;
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.method === "Page.loadEventFired") resolve();
    prev(ev);
  };
});
await send("Page.navigate", { url: "http://localhost:3000/" });
await loaded;

const expr = `(() => {
  const section = [...document.querySelectorAll("section")].find((el) =>
    el.textContent.includes("Just conversation."),
  );
  const cs = getComputedStyle(section);
  section.scrollIntoView({ block: "center" });
  const rect = section.getBoundingClientRect();
  return {
    backgroundImage: cs.backgroundImage,
    backgroundColor: cs.backgroundColor,
    top: Math.round(rect.top),
    height: Math.round(rect.height),
  };
})()`;

async function shot(width, name) {
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height: 900,
    deviceScaleFactor: 2,
    mobile: width < 700,
  });
  const result = await send("Runtime.evaluate", { expression: expr, returnByValue: true });
  const info = result.result.value;
  const clip = {
    x: 0,
    y: Math.max(0, info.top - 8),
    width,
    height: Math.min(info.height + 24, 860),
    scale: 1,
  };
  const image = await send("Page.captureScreenshot", { format: "png", clip });
  writeFileSync(new URL(`./${name}.png`, import.meta.url), Buffer.from(image.data, "base64"));
  return info;
}

const out = {
  mobile: await shot(390, "tmp-endshade-390"),
  desktop: await shot(1280, "tmp-endshade-1280"),
};
console.log(JSON.stringify(out, null, 2));
ws.close();
