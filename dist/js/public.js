$(function () {
	$bussinessCard = $('#bussiniss-Card');
	$bussinessCard.click(function () {
		//这里还没添加跳转页面
		location.href = "";
	});

	//购物车侧栏
	$cartLogo = $('#borderFixed .right-list li a');
	$cartLogoList = $('#borderFixed .right-list');
	$cartList = $('#borderFixed .cart-list');
	$cartListClose = $('#borderFixed .cart-list .cart-title li a img');
	$cartLogo.click(function () {
		$cartLogoList.animate({ right: '394px' }, 1000);
		$cartList.animate({ right: 0 }, 1000);
	});
	$cartListClose.click(function () {
		$cartList.animate({ right: '-394px' }, 1000);
		$cartLogoList.animate({ right: 0 }, 1000);
	});

	$select5lux = $('.select-5lux');
	$list5lux = $('.list-5lux');
	$list5luxa = $('.list-5lux dd a');
	$.each($list5luxa, function () {
		$(this).mouseenter(function () {
			$(this).css('color', 'red');
		});
	});
	$.each($list5luxa, function () {
		$(this).mouseleave(function () {
			$(this).css('color', '#635f60');
		});
	});

	$select5lux.mouseenter(function () {
		$list5lux.css('display', 'block');
	});

	$list5lux.mouseleave(function () {
		$list5lux.css('display', 'none');
	});

	//头部移入事件，手机下载
	$phoneDownload = $('.phone-download');
	$phoneErweima = $('.phone-erweima');
	$phoneDownload.mouseenter(function () {
		$phoneErweima.css('display', 'block');
	});
	$phoneDownload.mouseleave(function () {
		$phoneErweima.css('display', 'none');
	});
	$phoneErweima.mouseenter(function () {
		$phoneErweima.css('display', 'block');
	});
	$phoneErweima.mouseleave(function () {
		$phoneErweima.css('display', 'none');
	});

	//搜索框：jsonP获取
	//请求 URL: https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=&cb=
	$search = $('#search');
	$searchvalue = $('.search-value');

	$search.keyup(function () {
		$text = $search.val();
		$.getJSON('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + $text + '&cb=?', function (data) {
			$arr = data.s;
			console.log($arr);
			$searchvalue.html('');
			$.each($arr, function (index, value) {

				$li = $('<li></li>').html($arr[index]).css('background', 'white');
				$searchvalue.append($li);
			});
		});
	});
	$searchvalue.click(function () {
		$searchvalue.css('display', 'none');
	});

	//nav导航栏的下拉菜单
	$selectList = $('#selectList');
	$firstList = $('#selectList .first-list');
	$navList = $('#productNavigation .produce-nav .nav-list');
	$selecttwo = $('#selectTwo');
	$bannerMark = $('.banner-Mark');
	$navList.mouseenter(function () {
		$bannerMark.css('opacity', '0.3');
		$selectList.css('display', 'block');
		$firstList.mouseenter(function () {
			$selecttwo.css('display', 'block');
		});

		$selectList.mouseleave(function () {
			$selecttwo.mouseleave(function () {
				$selectList.css('display', 'none');
				$selecttwo.css('display', 'none');
				$bannerMark.css('opacity', '0');
			});
		});
	});

	//底部
	var ajax = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	ajax.open("get", "../src/json/footer.json?t=" + new Date().getTime());
	ajax.send();
	ajax.onreadystatechange = function () {
		if (ajax.readyState == 4 && ajax.status == 200) {
			var arr = JSON.parse(ajax.responseText);
			var str = '';
			for (var i = 0; i < arr.length; i++) {
				str += `<li>
						<div class="select-pic">
							<img src="../src/json/${arr[i].src}"/>
						</div>
						<strong>${arr[i].title}</strong>
						<a href="">${arr[i].produce}</a>
					</li>`;
			}
			$id('.select-list').innerHTML = str;
		}
	};

	//购物车
	$total = $('.shopping-cart .total .total-num');
	var num = $total.text();
	console.log(num);
	//	
	//		$id('.shopping-cart').onmouseenter = function(){
	//		
	//			$('#shoppingOne').css('display', 'block');
	//			
	//		
	//		}
	//		
	//			$id('.shopping-cart').onmouseleave = function(){
	//		
	//			$('#shoppingOne').css('display', 'none');
	//			
	//			}
	//		

});

function $id(id) {
	return document.querySelector(id);
}