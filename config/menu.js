/**
 * 应用的菜单栏配置
 */
const { app, shell, webContents, Menu } = require('electron')
const { env } = require('./constants');
const { getUrl } = require('../utils');
const { checkForUpdate } = require('../auto_updater');
let currentEnv = process.env.NODE_ENV;

function toggleEnv(env) {
  currentEnv = env;
  // 客户端userAgent
  const userAgent = `${webContents.userAgent} VikaDesktop/${process.env['npm_package_version:']}`;
  webContents.getFocusedWebContents().loadURL(getUrl(currentEnv), { userAgent });
}

const menuConfig = [{
  label: app.name,
  submenu: [
    { role: 'about', label: '关于维格表' },
    { label: '检查更新', click: () => checkForUpdate(true) },
    { type: 'separator' },
    { role: 'quit', label: '退出维格表' }
  ]
}, {
  label: "文件",
  submenu: [
    { role: 'close', label: '关闭当前窗口' }
  ]
}, {
  label: "编辑",
  submenu: [
    { role: 'undo', label: '撤消' },
    { role: 'redo', label: '重做' },
    { role: 'cut', label: '剪切' },
    { role: 'copy', label: '复制' },
    { role: 'paste', label: '粘贴' },
    { role: 'selectAll', label: '全选' }
  ]
}, {
  label: "工具",
  submenu: [
    { role: 'reload', label: '刷新' },
    { role: 'toggleDevTools', label: '开发者工具' },
    { role: 'togglefullscreen', label: '全屏展示' },
    {
      label: '切换环境',
      submenu: [
        { label: 'localhost', type: 'radio', checked: currentEnv === env.local, click: () => toggleEnv(env.local) },
        { label: 'integration', type: 'radio', checked: currentEnv === env.dev, click: () => toggleEnv(env.dev) },
        { label: 'staging', type: 'radio', checked: currentEnv === env.prod, click: () => toggleEnv(env.prod) },
      ],
      visible: currentEnv === env.dev || currentEnv === env.local,
    },
  ]
}, {
  label: "帮助",
  submenu: [
    { label: '帮助文档', click: () => { shell.openExternal('https://vika.cn/help') } }
  ]
}];

const menu = Menu.buildFromTemplate(menuConfig)
Menu.setApplicationMenu(menu)

module.exports = {
  currentEnv,
}
