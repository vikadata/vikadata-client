const { webContents, ipcMain, dialog } = require('electron');
const { autoUpdater } = require("electron-updater");
const { publishUrl, env } = require('./config/constants');
let currentEnv = process.env.NODE_ENV;
let versionInfo = ''

const checkForUpdate = () => {
  autoUpdater.setFeedURL(currentEnv === env.prod ? publishUrl.prod : publishUrl.dev);

  // 监听更新错误
  autoUpdater.on('error', message => {
    sendUpdateMessage('err', message);
  });

  autoUpdater.on('update-not-available', (ev, info) => {
    dialog.showMessageBox({
      message: `未检测到新版本`
    });
  });

  // 检查更新时触发
  autoUpdater.on('checking-for-update', message => {
    console.log('darker', message);
    sendUpdateMessage('checking-for-update', message);
  });
  // 下载进度
  autoUpdater.on('download-progress', processObj => {
    sendUpdateMessage('download-progress', processObj);
  });

  // 更新下载完成
  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) => {
    dialog.showMessageBox({
      message: `检测到新版本${versionInfo.version}，是否立即升级？`
    });
    autoUpdater.quitAndInstall();
    sendUpdateMessage('isUpdateNow', versionInfo);
  })

  let checkInfo = autoUpdater.checkForUpdates();
  checkInfo.then(data => {
    versionInfo = data.updateInfo;
  })
}

function sendUpdateMessage(message, data) {
  webContents.getFocusedWebContents().send('message', { message, data });
}

module.exports = {
  checkForUpdate
}
