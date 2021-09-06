const { dialog } = require('electron');
const { autoUpdater } = require("electron-updater");
const { publishUrl, env } = require('./config/constants');
let currentEnv = process.env.NODE_ENV;
let arch = process.env.ARCH;
let versionInfo
let isGlobalManual


const getFeedUrl = () => {
  let feedUrl = currentEnv === env.prod ? publishUrl.prod : publishUrl.dev;
  return `${feedUrl}${arch}/`;
}

autoUpdater.setFeedURL(getFeedUrl());

// 监听更新错误
autoUpdater.on('error', message => {
});

autoUpdater.on('update-not-available', (ev, info) => {
  console.log('isManual in: ', isGlobalManual)
  if (isGlobalManual) {
    dialog.showMessageBox({
      message: `未检测到新版本`
    });
  }
});

// 检查更新时触发
autoUpdater.on('checking-for-update', message => {

});
// 下载进度
autoUpdater.on('download-progress', processObj => {

});

// 更新下载完成
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) => {
  dialog.showMessageBox({
    message: `检测到新版本${versionInfo.version}，是否立即升级？`
  });
  autoUpdater.quitAndInstall();
})

const checkForUpdate = (isManual = false) => {
  console.log('isManual: ', isManual)
  isGlobalManual = isManual;
  let checkInfo = autoUpdater.checkForUpdates();
  checkInfo.then(data => {
    versionInfo = data.updateInfo;
  })
}

module.exports = {
  checkForUpdate
}
