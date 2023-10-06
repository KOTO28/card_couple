const card_w = 80;
const card_h = 128;
const card_px = 4;
const canvas_ow = 400;
const canvas_oh = 1792;

window.onload = function(){
	console.log("Hello World!");
	const cv = document.getElementById("myCanvas");
	const btn_hint = document.querySelector("#button_hint");
	const btn_undo = document.querySelector("#button_undo");
	const ctx = cv.getContext("2d");
	const img = {};
	const stock = [];
	const log = [];
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
	let select_c = "#00f";
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
		insert:function(n,m){
			this.data.splice(n,0,m);
		},
		draw:function(){
			// console.log(card.data);
			// const cardimg = img["s"+String(this.num)];
			for(let i = 0;i < this.data.length;i++){
				ctx.drawImage(img[this.data[i]],(i%card_px)*card_w+card_w/2,Math.floor(i/card_px)*card_h+card_h/2,card_w,card_h);
			}
			if(select != -1){
				ctx.beginPath();
				ctx.rect((select%card_px)*card_w+card_w/2, Math.floor(select/card_px)*card_h+card_h/2,card_w,card_h);
				ctx.strokeStyle = select_c;
				ctx.lineWidth = 4;
				ctx.stroke();
			}
		},
	};
	cv.addEventListener("click",function(event){
		select_c = "#00f";
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
				if(CardCheck(card,select,i)){
					// console.log("c");
					if(select < i){
						log.push([select,card.data[select],i,card.data[i]]);
						card.del(i);
						card.del(select);
					}else{
						log.push([i,card.data[i],select,card.data[select]]);
						card.del(select);
						card.del(i);
					}
					select = -1;
					if(stock.length <= 0 && card.data.length <= 0){
						alert("クリア!\nおめでとう!");
					}
				}else{
					select = i;
				}
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
		console.log("keypress:"+event.key+":");
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
	btn_hint.addEventListener("click",function(event){
		// console.log("btn_hint is clicked!");
		let hint_r = hint();
		if(hint_r == undefined){
			select = -1;
			alert("ヒントはありません。");
		}else{
			// console.log("hint_r[0]:"+hint_r[0]);
			select = hint_r[0];
			select_c = "#ff0";
		}
	});
	btn_undo.addEventListener("click",function(event){
		// console.log("btn_undo is clicked!");
		if(log.length == 0){
			console.log("log is []");
		}else{
			let log_r = log[log.length-1];
			console.log("log_r:"+log_r);
			card.insert(log_r[0],log_r[1]);
			card.insert(log_r[2],log_r[3]);
			console.log("insert");
			log.splice(log.length-1,1);
		}
	});
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
		document.querySelector('#stock_n').textContent = "山札:"+stock.length;
		document.querySelector('#cards_n').textContent = "カード:"+card.data.length;
	}
	function loop(){
		requestAnimationFrame(loop);
		update();
		drawAll();
	}
	function hint(){
		let kouho = [];
		for(let i = 0;i < card.data.length;i++){
			for(let j = 0;j < card.data.length;j++){
				if(CardCheck(card,i,j)){
					kouho.push([i,j]);
					// console.log("yei:"+i+"&"+j);
					// return;
				}
			}
		}
		// console.log("kouho:"+kouho);
		return kouho[getRandom(0,kouho.length-1)];
	}
}

function CardCheck(card,s1,s2){//card.dataのs1番目とs2番目が隣で同じか調べる。
	if(s1 >= 0 && s2 >= 0 && s1 != s2){
		if(card.data[s1].substr(1) == card.data[s2].substr(1)){
			// console.log("b");
			if(//左端
				s1 % card_px == 0
			){
				// console.log("左端");
				if(
					s2 == s1-card_px ||//上
					s2 == s1-card_px+1 ||//右上
					s2 == s1+1 ||//右
					s2 == s1+card_px ||//下
					s2 == s1+card_px+1//右下
				){
					return true;
				}
			}else if(//右端
				s1 % card_px == 3
			){
				// console.log("右端");
				if(
					s2 == s1-card_px ||//上
					s2 == s1-card_px-1 ||//左上
					s2 == s1-1 ||//左
					s2 == s1+card_px ||//下
					s2 == s1+card_px-1//左下
				){
					return true;
				}
			}else{
				// console.log("真ん中");
				if(
					s2 == s1-card_px-1 ||//左上
					s2 == s1-card_px ||//上
					s2 == s1-card_px+1 ||//右上
					s2 == s1+1 ||//右
					s2 == s1-1 ||//左
					s2 == s1+card_px-1 ||//左下
					s2 == s1+card_px ||//下
					s2 == s1+card_px+1//右下
				){
					return true;
				}
			}
		}
	}
}

function getRandom(min,max){
	var random = Math.floor( Math.random() * (max + 1 - min) ) + min;
	return random;
}