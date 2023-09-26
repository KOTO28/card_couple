window.onload = function(){
	console.log("Hello World!");
	const cv = document.getElementById("myCanvas");
	const btn = document.getElementById("delbtn");
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
		add:function(){
			this.data.push({num:"s"+String(getRandom(1,13))});
		},
		del:function(n){
			this.data.splice(n,1);
		},
		draw:function(){
			// const cardimg = img["s"+String(this.num)];
			for(let i = 0;i < this.data.length;i++){
				ctx.drawImage(img[this.data[i]["num"]],(i%4)*80+40,Math.floor(i/4)*128,80,128);
			}
		},
	};
	cv.addEventListener("click",function(){
		console.log("clicked!!");
		c ++;
		// card.add(((c-1)%4)*80,Math.floor((c-1)/4)*128,getRandom(1,13));
		card.add();
	});
	btn.addEventListener("click",function(){
		card.del(1);
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