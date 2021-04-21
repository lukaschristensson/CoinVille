
let mm = null;
let store = null;
let coinSize = [200, 200];
let storeSize = [300, 600];


const mainS = ( mainSketch ) => {
    mainSketch.mc = null;

    mainSketch.setup = () => {
        mainSketch.frameRate(30);
        //var c = createCanvas(windowWidth-4, windowHeight-4);
        var c = mainSketch.createCanvas(700, 500);
        c.parent('gameCanvas');
        mainSketch.mc = new MainCoin([coinSize[0]/2+70, mainSketch.height/2], coinSize);
        mainSketch.mc.setIdleAnimation(new DefaultIdleAni(1/20));
        mm = new MoneyMaker(mainSketch);
        mm.setSize([mainSketch.width*0.8, 100]);
        mm.setPos([mainSketch.width*0.1, 10]);
        initCoins = mainSketch.getItem('coins');
        mm.setValue(initCoins?initCoins:0);
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
        for (let i = 0; i < 1; i++){
            store.addItem(new MoneyMoo(storeSketch));
            store.addItem(new PennyPython(storeSketch));
            store.addItem(new NetworthSpider(storeSketch));
            store.addItem(new HedgeFundHog(storeSketch));
            store.addItem(new PortfolioPenguin(storeSketch));
        }
        store.setSize([282, Math.max(store.items.length*53 + 3, 430)]);
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
