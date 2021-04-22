
let mm = null;
let store = null;
let coinSize = [200, 200];
let storeSize = [300, 600];
let storage = false;

const mainS = ( mainSketch ) => {
    mainSketch.mc = null;
    //random comment! :)
    mainSketch.setup = () => {

        if (!storageAvailable(mainSketch, String)){
            alert('You don\'t have local storage enabled in your browser, activate it to save your progress inbetween sessions!')
        } else storage = true;

        mainSketch.frameRate(30);
        //var c = createCanvas(windowWidth-4, windowHeight-4);
        var c = mainSketch.createCanvas(700, 500);
        c.parent('gameCanvas');
        mainSketch.mc = new MainCoin([coinSize[0]/2+70, mainSketch.height/2], coinSize);
        mainSketch.mc.setIdleAnimation(new DefaultIdleAni(1/20));
        if (storage)
            mm = new MoneyMaker(mainSketch);
        else
            mm = new MoneyMaker(null);
        mm.setSize([mainSketch.width*0.8, 100]);
        mm.setPos([mainSketch.width*0.1, 10]);
        if (storage){
            initCoins = mainSketch.getItem('coins');
            mm.setValue(initCoins?initCoins:0);
        } else mm.setValue(0);
    }

    mainSketch.draw = () => {
        mainSketch.background(240);
        mainSketch.mc.drawSelf(mainSketch);
        mm.drawSelf(mainSketch);
    }

    mainSketch.mouseClicked = () => {
        mainSketch.mc.click(mainSketch.mouseX, mainSketch.mouseY);
    }
};
new p5(mainS);

const storeS = ( storeSketch ) => {
    storeSketch.setup = () => {
        store = new Store([0, 0]);
        if (storage){
            store.addItem(new MoneyMoo(storeSketch));
            store.addItem(new PennyPython(storeSketch));
            store.addItem(new NetworthSpider(storeSketch));
            store.addItem(new HedgeFundHog(storeSketch));
            store.addItem(new PortfolioPenguin(storeSketch));
        } else {
            store.addItem(new MoneyMoo(null));
            store.addItem(new PennyPython(null));
            store.addItem(new NetworthSpider(null));
            store.addItem(new HedgeFundHog(null));
            store.addItem(new PortfolioPenguin(null));
        }
        store.setSize([300, Math.max(store.items.length*53 + 3, 430)]);
		let c = storeSketch.createCanvas(300,Math.max(store.items.length*53 + 3, 430));
		c.parent('storeCanvas');
		storeSketch.background(200);
    }
    storeSketch.draw = () => {
        store.drawSelf(storeSketch);
    }
    storeSketch.mouseClicked = () => {
        store.click(storeSketch.mouseX, storeSketch.mouseY);
    }
};
new p5(storeS);

const storeHeader = ( storeHeader ) => {
    storeHeader.setup = () => {
        let c = storeHeader.createCanvas(300, 70);
        c.parent('storeHeader');
    }

	storeHeader.draw = () => {
		storeHeader.fill('brown');
		storeHeader.rect(0,  0, 300, 70);
		storeHeader.fill('Yellow');
		storeHeader.textAlign(storeHeader.CENTER, storeHeader.CENTER);
		storeHeader.textSize(50);
		storeHeader.text('Store', storeHeader.width/2, storeHeader.height/2);
	}
};
new p5(storeHeader);

function storageAvailable(s, type) {
    var storage;
    try {
        var x = '__storage_test__';
        s.storeItem(x, x);
        s.getItem(x);
        return true;
    }
    catch(e) {
        return false;
    }
}
