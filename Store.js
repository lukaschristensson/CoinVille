class Store{
	constructor(pos, size = null){
		this.position = pos;
		this.size = size;
		this.items = []
	}

	setSize(s){
		this.size = s;
	}

	addItem(i){
		this.items.push(i);
	}

	click(x, y){
		if (x >= 0 && x <= this.size[0] && y >= 0){
			let index = Math.floor((y-3) / 53);
			if (this.items.length > index)
				this.items[index].buy(1);
		}
	}

	drawSelf(sketch){
		let counter = 0;
		sketch.fill('black');
		sketch.rect(0, 0, this.size[0], 3);
		this.items.forEach((i) => {
			i.drawSelf([0, 3 + counter*53], [this.size[0], 50], sketch);
			sketch.fill('black');
			sketch.rect(0, 3 + counter*53 + 50, this.size[0], 3);
			counter++;
		});

	}
}
