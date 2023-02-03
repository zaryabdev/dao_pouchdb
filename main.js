const dao = new AppDAO("sqlite_010");

const productNameRepo = new ProductNameRepository(dao);
const packingTypeRepo = new PackingTypeRepository(dao);

productNameRepo.createTable();
packingTypeRepo.createTable();

ipcMain.on("create:product_name", async (event, mainData) => {
    console.log("Inside Main create:product_name");
    console.log({ mainData });

    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);

    productNameRepo.create(mainData).then((result: any) => {
        console.log("result from create:product_name sql");
        console.log({ result });
        win.webContents.send("create:product_name", result);
    });
});

ipcMain.on("update:product_name", async (event, mainData) => {
    console.log("Inside Main update:product_name");
    console.log({ mainData });

    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);

    productNameRepo.update(mainData).then((result: any) => {
        console.log("result from update:product_name sql");
        console.log({ result });
        win.webContents.send("update:product_name", result);
    });
});

ipcMain.on("get:product_names", async (event, mainData) => {
    console.log("Inside Main get:product_names");
    console.log({ mainData });

    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);

    productNameRepo.getAll().then((result: any) => {
        console.log("result from get:product_names sql");
        console.log({ result });
        win.webContents.send("get:product_names", result);
    });
});
