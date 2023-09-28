console.log("main.js est en cours d'exécution");
const {app , BrowserWindow} = require("electron"); // CommonJS

app.whenReady().then(() => {
    const win = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences:{
            webSecurity: true,
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile('src/template/index.html')
    win.webContents.openDevTools()
})
app.on("window-all-closed",() => {
    app.quit()
})
