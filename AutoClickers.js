class Author{
	constructor(name){
		this.name = name;
		this.children = [];
	}
	isBaseParent(){
		return this.children.length == 0;
	}
}

class AutoClicker extends Author{
	constructor(freq, name){
		super(name);

		this.freq = freq;
		setInterval(()=>mm.addCoin(this), freq);
		if (!this.amount)
			this.amount = 0;
		mm.addMult((a) =>{
			if (a.name == name){
				return this.amount;
			}
			return 1;
		});
	}
	addAC(amount){
		this.amount += amount;
	}
}


class BuyableAutoclicker extends AutoClicker{
	constructor(freq, name, price, priceFunc, sketch){
		super(freq, name);
		this.sketch = sketch
		this.amount = sketch.getItem(name);
		this.price = price;
		this.priceFunc = priceFunc;
		if (this.amount)
			for (let i = 0; i < this.amount; i++) this.price = this.priceFunc(this.price);
		else
			this.amount = 0;

	}
	buy(amount){
		let finalPrice = 0;
		let dummy_price = this.price;
		for (var i = 0; i < amount; i++) {
			finalPrice += dummy_price;
			dummy_price = this.priceFunc(dummy_price);
		}

		if (mm.value >= finalPrice) {
			this.addAC(amount);
			this.sketch.storeItem(this.name, this.amount);
			mm.value -= finalPrice;
			this.price = dummy_price;
			return true;
		}
		return false;
	}
	drawSelf(pos, size, sketch){
		sketch.noStroke();
		sketch.fill('lightgray');
		sketch.rect(pos[0], pos[1], size[0], size[1]);
		sketch.textAlign(sketch.LEFT, sketch.CENTER);
		sketch.fill('black');
		sketch.text('€' + this.price + '   ' + this.name + "( +" + (1000/this.freq) + "/s)" + ': ' + this.amount + '  = ' + (this.amount*1000/this.freq) + '/s', pos[0] + size[0]*0.1, pos[1] + size[1]/2);
	}
}
class MoneyMoo extends BuyableAutoclicker{
	constructor(sketch, price = 15, priceFunc = (p)=>Math.round(p*1.15)){
		super(10000, 'Money Moo', price, priceFunc, sketch);
	}
}
class PennyPython extends BuyableAutoclicker{
	constructor(sketch, price = 100, priceFunc = (p)=>Math.round(p*1.15)){
		super(1000, 'Penny Python', price, priceFunc, sketch);
	}
}
class NetworthSpider extends BuyableAutoclicker{
	constructor(sketch, price = 1100, priceFunc = (p)=>Math.round(p*1.15)){
		super(1000/8, 'Networth Spider', price, priceFunc, sketch);
	}
}
class HedgeFundHog extends BuyableAutoclicker{
	constructor(sketch, price = 12000, priceFunc = (p)=>Math.round(p*1.15)){
			super(1000/47, 'HedgeFund Hog', price, priceFunc, sketch);
		}
}
class PortfolioPenguin extends BuyableAutoclicker{
	constructor(sketch, price = 130000, priceFunc = (p)=>Math.round(p*1.15)){
			super(1000/260, 'Portfolio Penguin', price, priceFunc, sketch);
		}
}
