import { app as n, BrowserWindow as r } from "electron";
import { fileURLToPath as c } from "node:url";
import o from "node:path";
const t = o.dirname(c(import.meta.url));
process.env.APP_ROOT = o.join(t, "..");
const i = process.env.VITE_DEV_SERVER_URL, m = o.join(process.env.APP_ROOT, "dist-electron"), s = o.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = i ? o.join(process.env.APP_ROOT, "public") : s;
let e;
n.commandLine.appendSwitch("ignore-certificate-errors");
function a() {
  e = new r({
    icon: o.join(process.env.VITE_PUBLIC, "logo.png"),
    autoHideMenuBar: !0,
    webPreferences: {
      preload: o.join(t, "preload.mjs")
    }
  }), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), i ? e.loadURL(i) : e.loadFile(o.join(s, "index.html"));
}
n.on("window-all-closed", () => {
  process.platform !== "darwin" && (n.quit(), e = null);
});
n.on("activate", () => {
  r.getAllWindows().length === 0 && a();
});
n.whenReady().then(a);
export {
  m as MAIN_DIST,
  s as RENDERER_DIST,
  i as VITE_DEV_SERVER_URL
};
