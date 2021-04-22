class MoneyMaker{
	constructor(sketch, pos = null, size = null){
		this.value = 0;
		this.multipliers = [];
		this.size = size;
		this.color = 'green';
		this.token = '€';
		this.position = pos;
        if (sketch != null)
		    setInterval(() => sketch.storeItem('coins', this.value), 1000);
	}

	setSize(size){
		this.size = size;
	}

	setPos(pos){
		this.position = pos;
	}

	addMult(m){
		this.multipliers.push(m);
	}

	addCoin(author){
		let finalSum = 1;
		this.multipliers.forEach((m) => finalSum *= m(author));
		this.value += finalSum;
	}

	setValue(v){
		this.value = v;
	}

	drawSelf(sketch){
		sketch.fill(200)
		sketch.rect(this.position[0], this.position[1], this.size[0], this.size[1]);
		sketch.fill(this.color);
		sketch.textSize(this.size[1]);
		sketch.textAlign(sketch.LEFT);
		sketch.text(this.token + this.value, this.position[0] + this.size[1]*0.1, this.position[1] + this.size[1]*0.1, this.size[0], this.size[1]);
	}
}
