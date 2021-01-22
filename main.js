const { app, shell, BrowserWindow, Menu } = require('electron')
const { currentEnv } = require('./config/menu')
const { getUrl } = require('./utils');
const { checkForUpdate } = require('./auto_updater');

let win = null;
// 菜单栏配置

function createWindow() {
  // 创建浏览器窗口
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 320,
    minHeight: 568,
    webPreferences: {
      nodeIntegration: true
    },
    enableRemoteModule: false,
  })
  // 客户端userAgent
  const userAgent = `${win.webContents.userAgent} VikaDesktop/${process.env['npm_package_version']}`;

  win.loadURL(getUrl(currentEnv), {
    userAgent,
  })
  win.webContents.once('dom-ready', () => {
    // 检查更新
    checkForUpdate()
  })

}


app.on('ready', createWindow)
app.setAppUserModelId("维格表")

//当所有窗口都被关闭后退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('web-contents-created', (e, webContents) => {
  webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });
});


