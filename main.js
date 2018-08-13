const { app, BrowserWindow } = require('electron');

const WINDOWCONFIG = {
    defaultWidth: 1280,
    defaultHeight: 800,
    minWidth: 400,
    minHeight: 400,
    bgColor: "#f5f5f5",
    title: "Messages for desktop",
    iconFile: '/messenger_96dp.ico'
}

let mainWindow

function createWindow() {
    // Create the browser window.

    mainWindow = new BrowserWindow({
        width: WINDOWCONFIG.defaultWidth,
        height: WINDOWCONFIG.defaultHeight,
        minWidth: WINDOWCONFIG.minWidth,
        minHeight: WINDOWCONFIG.minHeight,
        backgroundColor: WINDOWCONFIG.bgColor,
        title: WINDOWCONFIG.title,
        icon: __dirname + WINDOWCONFIG.iconFile
    })


    // and load the index.html of the app.
    mainWindow.loadFile('index.html');

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
    
    mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
        if (frameName === 'modal') {
          // open window as modal
          event.preventDefault()
          Object.assign(options, {
            modal: true,
            parent: mainWindow,
            width: 100,
            height: 100,
            title: "Messages for web",
          })
          event.newGuest = new BrowserWindow(options)
        }
      })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

app.on('browser-window-created',function(e,window) {
    // Hide the menu globally
    window.setMenu(null);
});