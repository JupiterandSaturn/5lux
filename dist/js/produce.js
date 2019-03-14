$(function () {
	var ajax = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	ajax.open('get', '../src/json/produce.json?t=' + new Date().getTime());
	ajax.send();
	ajax.onreadystatechange = function () {
		if (ajax.readyState == 4 && ajax.status == 200) {
			var arr = JSON.parse(ajax.responseText);
			var str = '';

			for (var i = 0; i < arr.length; i++) {
				str += `
			<div class="product-intro-first">
						<p class="product-name">${arr[i].english}${arr[i].chinese}</p>
						<p>${arr[i].introduce}</p>
						<p class="product-id">${arr[i].id}</p>
					</div>
			<div class="product-intro-second">
						<span class="product-span">￥<span id = "product-price">${arr[i].price}</span></span>
						<del>￥11163</del>
						<span class="product-vip">红卡会员价</span>
						<div></div>
						<span class="product-fenqiprice">分期价</span>
						<span class="product-message"><span class="product-last-price">￥344.81</span> x 12期 ></span>
					</div>
			
			`;
				$id('.product-intro').innerHTML = str;
			}
		}
	};
	//	var load = $id('#productMessage .cart-alert a');
	//	load.onclick=function(){
	//		location.href = '../shoppingcart.html';
	//	}
	var productBig = $id('#productDetail .product-pic');
	var productSmallPic = $id('#productDetail .product-pic .product-big-pic');
	var productMark = $id('#productDetail .product-pic .product-big-pic .product-mark');
	var floatLayer = $id('#productDetail .product-pic .product-big-pic .float-layer');

	var productBigBox = $id('#productDetail .product-pic .product-magnifier');
	var productBigPic = $id('#productDetail .product-pic .product-magnifier img');

	productMark.onmouseenter = function () {
		productMark.style.opacity = '0.3';
		floatLayer.style.display = 'block';
		productBigBox.style.display = 'block';
	};
	productMark.onmouseleave = function () {
		productMark.style.opacity = '0';
		floatLayer.style.display = 'none';
		productBigBox.style.display = 'none';
	};

	//鼠标跟随
	productMark.onmousemove = function (evt) {

		let e = evt || productSmallPic.event;
		let left = e.pageX - productSmallPic.offsetLeft - floatLayer.offsetWidth / 2;
		let top = e.pageY - productSmallPic.offsetTop - floatLayer.offsetHeight / 2;
		if (left <= 0) {
			left = 0;
		} else if (left >= this.offsetWidth - floatLayer.offsetWidth) {
			left = this.offsetWidth - floatLayer.offsetWidth;
		}
		if (top <= 0) {
			top = 0;
		} else if (top >= this.offsetHeight - floatLayer.offsetHeight) {
			top = this.offsetHeight - floatLayer.offsetHeight;
		}
		floatLayer.style.left = left + 152 + 'px';
		floatLayer.style.top = top + 272 + 'px';

		//求移动比例
		let pX = left / (this.offsetWidth - floatLayer.offsetWidth);
		let pY = top / (this.offsetHeight - floatLayer.offsetHeight);
		//设置大图移动
		productBigPic.style.left = pX * -(productBigPic.offsetWidth - productBigBox.offsetWidth) + 'px';
		productBigPic.style.top = pY * -(productBigPic.offsetHeight - productBigBox.offsetHeight) + 'px';
	};

	//		<div class="product-intro-first">
	//						<p class="product-name">${arr[i].english}${arr[i].chinese}</p>
	//						<p>${arr[i].introduce}</p>
	//						<p class="product-id">${arr[i].id}</p>
	//					</div>
	//			<div class="product-intro-second">
	//						<span id = "product-price">${arr[i].price}</span>
	//						<del>￥11163</del>
	//						<span class="product-vip">红卡会员价</span>
	//						<div></div>
	//						<span class="product-fenqiprice">分期价</span>
	//						<span class="product-message"><span class="product-last-price">￥344.81</span> x 12期 ></span>
	//					</div>

	//加入购物车
	$('#addToCart').click(function () {
		//$('.cart-alert').css('display', 'block');
		location.href = '../src/shoppingcart.html';
	});

	$buy = $('#addToCart');
	$buy.click(function (event) {
		//名称 价格 数量 src id
		let id = $(this).parent().parent().siblings(".product-intro").attr('data-good-id');
		let name = $(this).parent().parent().siblings(".product-intro").children(".product-intro-first").children(".product-name").html();
		let price = $(this).parent().parent().siblings(".product-intro").children(".product-intro-second").children('.product-span').children("#product-price").html();
		let src = $(this).parent().parent().parent().siblings(".product-pic").children(".product-big-pic").children('img').attr('src');

		//获取cookie
		//如果有返回字符串，如果没有返回undefined 统一成字符串
		let cookieStr = $.cookie('cart') ? $.cookie('cart') : '';
		//cookie字符串转对象
		let cookieObj = convertCookieStrToCookieObj(cookieStr);
		//判断对象中是否存在我当前购买的商品
		/*
   * {
   * 	 "sp1" : {
   * 		name : '。。。'，
   * 	    price : '....',
   * 		src : '....',
   *      num : '...'
   * 	},
   * "sp2" : {
   * 		name : '。。。'，
   * 	    price : '....',
   * 		src : '....',
   *      num : '...'
   * 	}
   * }
   * 
   */
		if (id in cookieObj) {
			cookieObj[id].num++;
		} else {
			cookieObj[id] = {
				"name": name,
				"price": price,
				"src": src,
				"num": 1
			};
		}
		//加入cookie
		$.cookie('cart', JSON.stringify(cookieObj), {
			expires: 7,
			path: '/'
		});
	});
});
//初始化购物车的数量
function cartInit() {
	//获取cookie
	let cookieStr = $.cookie('cart') ? $.cookie('cart') : '';
	//转对象
	let cookieObj = convertCookieStrToCookieObj(cookieStr);
	let sum = 0;
	//遍历对象
	for (let key in cookieObj) {
		sum += cookieObj[key].num;
	}
	$('#buy').val('购物车(' + sum + ')');
}
//将cookie字符串转为cookie对象
function convertCookieStrToCookieObj(str) {
	if (!str) {
		return {};
	}
	return JSON.parse(str);
}

function $id(id) {
	return document.querySelector(id);
}