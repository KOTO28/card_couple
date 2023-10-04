const card_w = 80;
const card_h = 128;
const card_px = 4;
const canvas_ow = 400;
const canvas_oh = 1792;

window.onload = function(){
	console.log("Hello World!");
	const cv = document.getElementById("myCanvas");
	// const btn = document.getElementById("delbtn");
	const ctx = cv.getContext("2d");
	const img = {};
	const stock = [];
	let frames = 0;
	const mark = ["s","c","d","h"];
	for(m in mark){
		// console.log("m:"+m);
		for (let i = 1; i <= 13; i++){
			img[mark[m]+String(i)] = new Image();
			img[mark[m]+String(i)].src = "image/"+mark[m]+String(i)+".png";
			stock.push(mark[m]+String(i));
		}
	}
	// console.log("img"+img);
	let select = -1;
	// const s1 = new Image();
	// s1.src = "image/s1.png";
	// const s2 = new Image();
	// s2.src = "image/s2.png";
	const card = {
		data:[],
		add:function(n){
			this.data.push(stock[n]);
			stock.splice(n,1);//n番目から1つ削除
		},
		del:function(n){
			this.data.splice(n,1);//n番目から1つ削除
		},
		draw:function(){
			// const cardimg = img["s"+String(this.num)];
			for(let i = 0;i < this.data.length;i++){
				ctx.drawImage(img[this.data[i]],(i%card_px)*card_w+card_w/2,Math.floor(i/card_px)*card_h+card_h/2,card_w,card_h);
			}
			if(select != -1){
				ctx.beginPath();
				ctx.rect((select%card_px)*card_w+card_w/2, Math.floor(select/card_px)*card_h+card_h/2,card_w,card_h);
				ctx.strokeStyle = '#00f';
				ctx.lineWidth = 4;
				ctx.stroke();
			}
		},
	};
	cv.addEventListener("click",function(event){
		let cx = (event.pageX-cv.offsetLeft)*canvas_ow/cv.clientWidth;
		let cy = (event.pageY-cv.offsetTop)*canvas_oh/cv.clientHeight;
		// console.log("clicked!!");
		// console.log("x:"+cx+",y:"+cy);
		let nai = true;
		// c ++;
		// card.add(((c-1)%card_px)*card_w,Math.floor((c-1)/card_px)*card_h,getRandom(1,13));
		for(let i = 0;i < card.data.length;i++){
			if(
				(i%card_px)*card_w+card_w/2 < cx &&
				cx < (i%card_px)*card_w+card_w/2+card_w &&
				Math.floor(i/card_px)*card_h+card_h/2 < cy &&
				cy < Math.floor(i/card_px)*card_h+card_h+card_h/2
			){
				// console.log("click num:"+i);
				// console.log("click is:"+card.data[i]);
				if(select != -1 && select != i){
					// console.log("a");
					if(card.data[select].substr(1) == card.data[i].substr(1)){
						// console.log("b");
						let jouken = false;
						if(//左端
							select % card_px == 0
						){
							console.log("左端");
							if(
								i == select-card_px ||//上
								i == select-card_px+1 ||//右上
								i == select+1 ||//右
								i == select+card_px ||//下
								i == select+card_px+1//右下
							){
								jouken = true
							}
						}else if(//右端
							select % card_px == 3
						){
							console.log("右端");
							if(
								i == select-card_px ||//上
								i == select-card_px-1 ||//左上
								i == select-1 ||//左
								i == select+card_px ||//下
								i == select+card_px-1//左下
							){
								jouken = true
							}
						}else{
							console.log("真ん中");
							if(
								i == select-card_px-1 ||//左上
								i == select-card_px ||//上
								i == select-card_px+1 ||//右上
								i == select+1 ||//右
								i == select-1 ||//左
								i == select+card_px-1 ||//左下
								i == select+card_px ||//下
								i == select+card_px+1//右下
							){
								jouken = true
							}
						}
						if(jouken){
							// console.log("c");
							if(select < i){
								card.del(i);
								card.del(select);
							}else{
								card.del(select);
								card.del(i);
							}
							select = -1;
							if(stock.length <= 0 && card.data.length <= 0){
								alert("クリア!\nおめでとう!");
							}
							return;
						}
					}
				}
				select = i;
				return;
			}
		}
		if(0 < stock.length){
			card.add(getRandom(0,stock.length-1));
		}else{
			alert("すべて出し切りました！");
		}
		select = -1;
	});
	window.addEventListener("keypress",function(event){
		console.log("keypress:"+event.key);
		if(event.key == " "){
			if(0 < stock.length){
				card.add(getRandom(0,stock.length-1));
			}else{
				alert("すべて出し切りました！");
			}
			select = -1;
			event.preventDefault();//スクロールを無効化
		}
	});
	// btn.addEventListener("click",function(event){
	// 	card.del(select);
	// });
	loop();
	// let c = 0;
	function update(){
		frames ++;
		if(frames % 60 == 0){
			// c ++;
			// card.add(((c-1)%card_px)*100,Math.floor((c-1)/card_px)*160,getRandom(1,13));
		}
	}
	function drawAll(){
		ctx.fillStyle = "#080";
		ctx.fillRect(0,0,cv.width,cv.height);
		card.draw();
		document.querySelector('#stock').textContent = "山札:"+stock.length;
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