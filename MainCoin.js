class MainCoin extends Author{
	constructor(position, size) {
		super();
		this.name = "MainCoin";
		this.size = size;
		this.baseSize = size;
		this.position = position;
		this.basePosition = position;
		this.animation = null;
	}

	setIdleAnimation(animation){
		this.animation = animation;
	}

 	drawSelf(sketch){
		if (this.animation != null){
			let nextState = this.animation.getNext(this.basePosition, this.baseSize);
			this.position =  [nextState[0], nextState[1]];
			this.size =  [nextState[2], nextState[3]];
		}
		sketch.noStroke();
		sketch.fill(209, 201, 54);
		sketch.ellipse(this.position[0], this.position[1], this.size[0], this.size[1]);
		sketch.fill(232, 223, 60);
		sketch.ellipse(this.position[0], this.position[1], this.size[0]*0.7, this.size[1]*0.7);
		sketch.fill(209, 201, 54);
		sketch.ellipse(this.position[0], this.position[1], this.size[0]*0.4, this.size[1]*0.4);
		sketch.fill(232, 223, 60);
		sketch.ellipse(this.position[0], this.position[1], this.size[0]*0.3, this.size[1]*0.3);
		sketch.rect(this.position[0], this.position[1] - this.size[1]*0.3/4, this.size[0]*0.3, this.size[1]*0.3/2);
	}
	click(x1, y1){
		let x2 = this.position[0];
		let y2 = this.position[1];
		if (Math.sqrt(Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2)) < Math.max(this.size[0], this.size[1])/2) {
			mm.addCoin(this);
			if (this.animation != null)
				this.animation.setSmall();
		}
	}
}

class DefaultIdleAni{
	constructor(magnitude){
		this.state = 0;
		this.nmbState = 60;
		this.magnitude = magnitude
	}
	getNext(pos, size){
		this.state += 1;
		this.state %= this.nmbState
		let newSize = [(1 + Math.sin(this.state * 2 * Math.PI/this.nmbState)*this.magnitude) * size[0], (1 + Math.sin(this.state * 2 * Math.PI/this.nmbState)*this.magnitude) * size[1]]
		return [pos[0], pos[1], newSize[0], newSize[1]];
	}
	setSmall(){
		this.state = 45;
	}
}
