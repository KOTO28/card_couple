const card_sx = 80;
const card_sy = 128;

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
	let select = -1;
	// const s1 = new Image();
	// s1.src = "image/s1.png";
	// const s2 = new Image();
	// s2.src = "image/s2.png";
	const card = {
		data:[],
		add:function(){
			this.data.push("s"+String(getRandom(1,13)));
		},
		del:function(n){
			this.data.splice(n,1);//n番目から1つ削除
		},
		draw:function(){
			// const cardimg = img["s"+String(this.num)];
			for(let i = 0;i < this.data.length;i++){
				ctx.drawImage(img[this.data[i]],(i%4)*card_sx+40,Math.floor(i/4)*card_sy,card_sx,card_sy);
			}
			if(select != -1){
				ctx.beginPath();
				ctx.rect((select%4)*card_sx+40, Math.floor(select/4)*card_sy,card_sx,card_sy);
				ctx.strokeStyle = 'deepskyblue';
				ctx.lineWidth = 4;
				ctx.stroke();
			}
		},
	};
	cv.addEventListener("click",function(event){
		console.log("clicked!!");
		console.log("x:"+event.pageX+",y:"+event.pageY);
		let nai = true;
		// c ++;
		// card.add(((c-1)%4)*card_sx,Math.floor((c-1)/4)*card_sy,getRandom(1,13));
		for(let i = 0;i < card.data.length;i++){
			if(
				(i%4)*card_sx+40 < event.pageX &&
				event.pageX < (i%4)*card_sx+40+card_sx &&
				Math.floor(i/4)*card_sy < event.pageY &&
				event.pageY < Math.floor(i/4)*card_sy+card_sy
			){
				console.log("click num:"+i);
				console.log("click is:"+card.data[i]);
				if(select != -1){
					if(card.data[select] == card.data[i]){
						card.del(select);
						card.del(i);
						select = -1;
						return;
					}
				}
				select = i;
				return;
			}
		}
		card.add();
		select = -1;
	});
	window.addEventListener("keypress",function(event){
		console.log("keypress:"+event.key);
		if(event.key == " "){
			card.add();
			select = -1;
			event.preventDefault();//スクロールを無効化
		}
	});
	btn.addEventListener("click",function(event){
		card.del(select);
	});
	loop();
	// let c = 0;
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