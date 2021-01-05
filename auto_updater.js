const { webContents, ipcMain } = require('electron');
const { autoUpdater } = require("electron-updater");
const { publishUrl } = require('./config/constants');
let versionInfo = ''

const checkForUpdate = () => {
  autoUpdater.setFeedURL(publishUrl);

  // 监听更新错误
  autoUpdater.on('error', message => {
    sendUpdateMessage('err', message);
  });

  // 检查更新时触发
  autoUpdater.on('checking-for-update', message => {
    sendUpdateMessage('checking-for-update', message);
  });

  // 下载进度
  autoUpdater.on('download-progress', processObj => {
    sendUpdateMessage('download-progress', processObj);
  });

  // 更新下载完成
  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) => {
    ipcMain.on('updateNow', (e, arg) => {
      autoUpdater.quitAndInstall();
    });
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
