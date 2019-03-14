$(function () {
	$selectbox = $('#shoppingCartGoods .cart-head .checkAll');
	$selectbox.click(function () {});
	let cookieStr = $.cookie('cart') ? $.cookie('cart') : '';
	if (!cookieStr) {
		$('.cart-blank').css('display', 'block');
	} else {

		//转对象
		let cookieObj = convertCookieStrToCookieObj(cookieStr);

		//遍历对象
		for (let key in cookieObj) {
			//记录商品id
			let obj = cookieObj[key];
			let str = `<ul class="added-goods" gata-good-id = "${key}">
					<li><input type="checkbox" name="checkAll" class="checkAll" value="" /></li>
					<li><img class="list-image" src="${obj.src}"></li>
					<li>${obj.name}</li>
					<li></li>
					<li>${obj.price}</li>
					<li>
								<div class="product-count">
								<a class="product-leftBtn" href=""></a>
								<input type="text" name="txt" id="txt" value="1" />
								<a class="product-rightBtn" href=""></a>
							</div>
					</li>
					<li></li>
					<li class="total">${obj.num * obj.price}</li>
					<li id="del"><a href="javascript:;">删除</a></li>
				</ul>`;
			$('.added-cart-list').append(str);
			//alert(str);
		}

		$('.added-goods .list-image').css({
			width: '80px',
			height: '80px'
		});
		//获取所有减号
		$minus = $('.product-count .product-leftBtn');

		//遍历加事件
		$minus.each(function () {
			$(this).click(function () {
				//alert('111');
				//获取当前操作的商品ID
				let id = $(this).parents('.added-goods').attr('gata-good-id');
				//修改cookie
				let cookieStr = $.cookie('cart') ? $.cookie('cart') : '';
				let cookieObj = convertCookieStrToCookieObj(cookieStr);
				cookieObj[id].num--;
				if (cookieObj[id].num > 0) {
					//重新写入cookie
					$.cookie('cart', JSON.stringify(cookieObj), {
						expires: 7,
						path: '/'
					});
					//alert(cookieObj[id].num);
					//alert($(this).next().val())		
					//数量框
					$(this).next().val(cookieObj[id].num);
					//小计
					$(this).parent().parent().next().next().html(cookieObj[id].num * cookieObj[id].price);
				}
				return false;
			});
		});
		//			<ul class="added-goods" gata-good-id = "${key}">
		//					<li><input type="checkbox" name="checkAll" id="checkAll" value="" /></li>
		//					<li>${obj.src}</li>
		//					<li>${obj.name}</li>
		//					<li></li>
		//					<li>
		//							<div class="product-count">
		//								<a class="product-leftBtn" href=""></a>
		//								<input type="text" name="txt" id="txt" value="1" />
		//								<a class="product-rightBtn" href=""></a>
		//							</div>
		//						</li>
		//					<li></li>
		//					<li></li>
		//					<li>xiaoji</li>
		//					<li class="del"><a href="javascript:;">删除</a></li>
		//				</ul>
		//获取所有加号
		let $plus = $('.product-count .product-rightBtn');

		//遍历加事件
		$.each($plus, function () {
			$(this).click(function () {
				let id = $(this).parents('.added-goods').attr('gata-good-id');
				let cookieStr = $.cookie('cart') ? $.cookie('cart') : '';
				let cookieObj = convertCookieStrToCookieObj(cookieStr);
				cookieObj[id].num++;
				$.cookie('cart', JSON.stringify(cookieObj), {
					expires: 7,
					path: '/'
				});
				$(this).prev().val(cookieObj[id].num);
				$(this).parent().parent().next().next().html(cookieObj[id].num * cookieObj[id].price);
				return false;
			});
		});

		//获取所有的数量框
		let $numInput = $('.product-count #txt');

		//遍历加事件
		$numInput.each(function () {
			$(this).blur(function () {

				let id = $(this).parents('.added-goods').attr('gata-good-id');
				let cookieStr = $.cookie('cart') ? $.cookie('cart') : '';
				let cookieObj = convertCookieStrToCookieObj(cookieStr);
				if (/^\d+$/.test($(this).val()) && $(this).val() > 0) {
					cookieObj[id].num = $(this).val();
				} else {
					cookieObj[id].num = 1;
				}
				$.cookie('cart', JSON.stringify(cookieObj), {
					expires: 7,
					path: '/'
				});
				$(this).val(cookieObj[id].num);

				$(this).parent().parent().next().next().html(cookieObj[id].num * cookieObj[id].price);
			});
		});

		let $del = $('.added-goods #del a');
		$del.each(function () {
			$(this).click(function () {
				let id = $(this).parents('.added-goods').attr('gata-good-id');
				let cookieStr = $.cookie('cart') ? $.cookie('cart') : '';
				let cookieObj = convertCookieStrToCookieObj(cookieStr);
				delete cookieObj[id];
				$.cookie('cart', JSON.stringify(cookieObj), {
					expires: 7,
					path: '/'
				});
			});
		});
	}
});

//将cookie字符串转为cookie对象
function convertCookieStrToCookieObj(str) {
	if (!str) {
		return {};
	}
	return JSON.parse(str);
}