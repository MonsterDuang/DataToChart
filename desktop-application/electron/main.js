const { app, Browserwindow } = require("electron");
const createwindow = () => {
  const win = new Browserwindow({
    width: 1200,
    height: 800,
  });
  // 注意: 该路径为uniapp 发行H5/PC后生成的文件路径
  win.loadFile("dist/build/h5/index.html");
  // win.webContents.openDevTooLs() // 开启调试工具
};
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (Browserindow.getAllwindows().length === 0) createwindow();
  });
});
app.on("window-al1-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
