$(function() {
	let cookieStr = $.cookie('cart') ? $.cookie('cart') : '';
	if(!cookieStr) {
		$('.cart-blank').css('display', 'block');
	} else {
		//转对象
		let cookieObj = convertCookieStrToCookieObj(cookieStr);
		//遍历对象
		for(let key in cookieObj) {
			//记录商品id
			let obj = cookieObj[key];
			let str = `<ul class="added-goods">
					<li><input type="checkbox" name="checkAll" id="checkAll" value="" /></li>
					<li>${obj.src}</li>
					<li>${obj.name}</li>
					<li></li>
					<li>
							<div class="product-count">
								<a class="product-leftBtn" href=""></a>
								<input type="text" name="txt" id="txt" value="1" />
								<a class="product-rightBtn" href=""></a>
							</div>
						</li>
					<li></li>
					<li></li>
					<li></li>
					<li><a href="javascript:;">删除</a></li>
				</ul>`;
			$('.added-cart-list').append(str);
		}
		//获取所有减号
		$minus = $('.product-count .product-leftBtn');
		//遍历加事件
		$minus.each(function() {
			$(this).click(function() {
				//获取当前操作的商品ID
				let id = $(this).parent().parent().siblings(".product-intro").children(".product-intro-first").children(".product-id");
				//修改cookie
				let cookieStr = $.cookie('cart') ? $.cookie('cart') : '';
				let cookieObj = convertCookieStrToCookieObj((cookieStr);)
				cookieObj[id].num--;
				if(cookieObj[id].num > 0) {
					//重新写入cookie
					$.cookie('cart', JSON.stringify(cookieObj), {
						expires: 7,
						path: '/'
					});
					//数量框
					$(this).next().val(cookieObj[id].num);
					//小计
					$(this).parent().next.html(cookieObj[id].num * cookieObj[id].price);
				}
			})
		})
		//获取所有加号
		let $plus = $('.product-count .product-rightBtn');
		//遍历加事件
		$.each($plus, function() {
			$(this).click(function() {
				let id = $(this).parent().parent().siblings(".product-intro").children(".product-intro-first").children(".product-id");
				let cookieStr = $.cookie('cart') ? $.cookie('cart') : '';
				let cookieObj = convertCookieStrToCookieObj(cookieStr);
				cookieObj[id].num++;
				$.cookie('cart', JSON.stringify(cookieObj), {
					expires: 7,
					path: '/'
				});
				$(this).prev().val(cookieObj[id].num);
				$('.product-list').parent().next().next().next().html(cookieObj[id].num * cookieObj[id].price);
			})
		})

	}
})
//将cookie字符串转为cookie对象
function convertCookieStrToCookieObj(str) {
	if(!str) {
		return {};
	}
	return JSON.parse(str);
}