const { app, BrowserWindow } = require("electron");
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
  });

  // 注意: 该路径为uniapp 发行H5/PC后生成的文件路径
  // win.loadFile("dist/build/h5/index.html");

  // 注意: 该路径为 npm run serve:electron 运行后开启的本地服务 根据实际情况修改
  win.loadURL("http://localhost:22927");

  // win.webContents.openDevTooLs() // 开启调试工具
};
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
