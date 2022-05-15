


const { electron } = window

// 创建连接
export function CreactConnect(options) {
    electron.ipcRenderer.sendMessage("onCreateConnect", options)
}

// 监听连接是否成功 返回的是 删除监听的函数
export function onConnect(fun) {
   return electron.ipcRenderer.on("onConnect", fun)
}