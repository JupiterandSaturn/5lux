$(function () {
	$autobottom = $('.auto-bottom');
	$autoMark = $('.auto-bottom .mark');
	$autoMark.click(function () {
		$autobottom.css('display', 'none');
	});
	//	banner轮播图
	$imageBanner = $('#imageBanner .image-list li');
	$borderindex = $('#imageBanner .border-index li');
	$btnLeft = $('#btnLeft');
	$btnRight = $('#btnRight');
	let indexCur = 5;
	var timer = null;
	slide();
	autoPlay();

	$btnLeft.mouseenter(function () {
		clearInterval(timer);
	});

	$btnRight.mouseenter(function () {
		clearInterval(timer);
	});
	$btnLeft.mouseleave(function () {
		autoPlay();
	});
	$btnRight.mouseleave(function () {
		autoPlay();
	});

	$btnLeft.click(function () {
		indexCur--;
		if (indexCur === -1) {
			indexCur = $imageBanner.size() - 1;
		}
		slide();
	});

	$btnRight.click(function () {
		indexCur++;
		if (indexCur === $imageBanner.size()) {
			indexCur = 0;
		}
		slide();
	});

	function slide() {

		//$imageBanner.eq(index).fadeIn(1500).siblings().fadeOut(1500);
		$imageBanner.eq(indexCur).animate({
			left: '-100%'
		}, 1000);
		if (indexCur == 0) {
			$imageBanner.css('left', '0');
			$borderindex.css({ background: 'white', border: '1px solid white' });
		} else {
			$imageBanner.eq(0).css('left', '0');
			$borderindex.eq(0).css({ background: 'white', border: '1px solid white' });
		}

		$borderindex.eq(indexCur).css({
			'background': 'red',
			'border': '1px solid red'
		});
	}

	function autoPlay() {
		timer = setInterval(function () {
			indexCur--;
			if (index === -1) {
				indexCur = $imageBanner.size() - 1;
			}
			slide();
		}, 3000);
	}
	///-----------------------------------------------------///
	$blandpic = $('#flagShipBrand .bland-pic li span');
	$.each($blandpic, function () {
		$(this).mouseenter(function () {
			$(this).animate({
				top: '180px'
			}, 500);
		});
		$(this).mouseleave(function () {
			$(this).animate({
				top: '260px'
			}, 500);
		});
	});

	//小图轮播
	$SmallBtnLeft = $('#flagShipBrand .hot-store .right');
	$SmallBtnRight = $('#flagShipBrand .hot-store .left');
	$smallpic = $('#flagShipBrand .bland-list');

	$SmallBtnLeft.click(function () {
		$smallpic.animate({
			left: '-1203px'

		}, 1000);
	});

	$SmallBtnRight.click(function () {
		$smallpic.animate({
			left: '0px'

		}, 1000);
	});

	$oLi = $('.select-card li');
	$.each($oLi, function (i, value) {
		$(this).mouseenter(function () {

			var ajax = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiceXObject("Microsoft.XMLHTTP");
			ajax.open('get', '../src/json/hotitems' + (i + 1) + '.json?t=' + new Date().getTime());
			ajax.send();
			ajax.onreadystatechange = function () {
				if (ajax.readyState == 4 && ajax.status == 200) {
					var arr = JSON.parse(ajax.responseText);
					var str = '';

					for (var i = 0; i < arr.length; i++) {
						str += `<li>
								<strong><a href = "produce.html">${arr[i].english}</a></strong>
								<p>${arr[i].chinese}</p>
								<span><b>￥</b>${arr[i].price}</span>
								<img src="../src/json/${arr[i].src}"/>
							</li>`;
					}
					$id(".produce-list").innerHTML = str;
				}
			};
		});
	});

	$('#hotItems .produce-list li').click(function () {

		location.href = 'produce.html';
		return false;
	});
	$onscroll = $('.shopping-mall .shopping-mall-title');
	var barTop = $onscroll.offset().top;

	$(window).on('scroll', function () {
		var scrollTop = $(document).scrollTop();
		if (scrollTop >= barTop) {
			$onscroll.css({ position: 'fixed', top: 0 });
		} else {
			$onscroll.css('position', 'static');
		}
	});

	$('.shopping-mall .shopping-mall-content .mall-list dl dd').click(function () {
		location.href = "produce.html";
		return false;
	});
});
function $id(id) {
	return document.querySelector(id);
}