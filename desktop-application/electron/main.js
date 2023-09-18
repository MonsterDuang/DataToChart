const { app, BrowserWindow, Menu, globalShortcut } = require('electron');
Menu.setApplicationMenu(null); // 去除顶部菜单栏
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
const createWindow = () => {
	const win = new BrowserWindow({ show: false });
	win.maximize();
	win.show();
	// 注意: 该路径为uniapp 发行H5/PC后生成的文件路径
	// win.loadFile("dist/build/h5/index.html");

	// 注意: 该路径为 npm run serve:electron 运行后开启的本地服务 根据实际情况修改
	win.loadURL('http://localhost:22927');

	// win.webContents.openDevTools(); // 开启调试工具

	// 注册全局事件，通过Alt+D 打开调试工具
	globalShortcut.register('Alt+D', () => win.webContents.toggleDevTools());
};
app.whenReady().then(() => {
	createWindow();
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});
