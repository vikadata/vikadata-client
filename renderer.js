const { ipcRenderer } = require('electron');

ipcRenderer.on('message', (event, { message, data }) => {
  console.log('接收到消息')
  if (message === 'isUpdateNow') {
    if (confirm('是否现在更新')) {
      ipcRenderer.send('updateNow')
    }
  }
})