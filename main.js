window.onload = function(){
	console.log("Hello World!");
	const cv = document.getElementById("myCanvas");
	const ctx = cv.getContext("2d");
	const img = {};
	let frames = 0;
	for (let i = 1; i <= 13; i++){
		img["s"+String(i)] = new Image();
		img["s"+String(i)].src = "image/s"+String(i)+".png";
	}
	// const s1 = new Image();
	// s1.src = "image/s1.png";
	// const s2 = new Image();
	// s2.src = "image/s2.png";
	const card = {
		data:[],
		x:0,
		y:0,
		num:1,
		add:function(x,y,num){
			this.data.push({x:x,y:y,num:"s"+String(num)});
		},
		draw:function(){
			const cardimg = img["s"+String(this.num)];
			for(let i = 0;i < this.data.length;i++){
				ctx.drawImage(img[this.data[i]["num"]],this.data[i]["x"],this.data[i]["y"],80,128);
			}
		},
	};
	window.addEventListener("click",function(){
		console.log("clicked!!");
		c ++;
		card.add(((c-1)%4)*80,Math.floor((c-1)/4)*128,getRandom(1,13));
	});
	loop();
	let c = 0;
	function update(){
		frames ++;
		if(frames % 60 == 0){
			// c ++;
			// card.add(((c-1)%4)*100,Math.floor((c-1)/4)*160,getRandom(1,13));
		}
	}
	function drawAll(){
		ctx.fillStyle = "#080";
		ctx.fillRect(0,0,cv.width,cv.height);
		card.draw();
	}
	function loop(){
		requestAnimationFrame(loop);
		update();
		drawAll();
	}
}

function getRandom(min,max){
	var random = Math.floor( Math.random() * (max + 1 - min) ) + min;
	return random;
}