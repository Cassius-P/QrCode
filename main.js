const { app, BrowserWindow, Menu } = require('electron');
const Store = require('electron-store');
const os = require('os');

const store = new Store();



//Création de la fenetre principale
let win = undefined;
function createWindow () {
    win = new BrowserWindow({
        width: 500,
        height: 720,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        },
        resizable:false
    })

    //Création d'un menu personnalisé
    const menu = Menu.buildFromTemplate([
        {
            label: 'Fichier',
            submenu : [
                { role: 'quit' }
            ]
        },
        {
            label: 'Editer',
            submenu: [
                {
                    label:"Paramètres",
                    click:async () => {
                        parametersWindow()
                    }
                }
            ]
        }
    ])
    win.setMenu(menu)
    win.loadFile('index.html')
    win.webContents.openDevTools()
}
//Création de la fenetre de parametres
function parametersWindow(){
    let template = []
    const parameters = new BrowserWindow({
        width: 450,
        height: 600,
        resizable:false,
        modal: true,
        parent:win,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        },
    })
    const menu = Menu.buildFromTemplate(template)
    parameters.setMenu(menu)
    parameters.loadFile('parameters.html')
    parameters.webContents.openDevTools()

}

//Impletention des parametres de base
function setDefaultsParameters(){
    if(store.get('firstConnect') != false){
        store.set('parameters', {
            size:500,
            cp:"#000000",
            cs:"#ffffff"
        })
        store.set('firstConnect', false)
    }
}


//Evenements de l'application
app.whenReady().then(() => {
    setDefaultsParameters()
    createWindow()
})

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
