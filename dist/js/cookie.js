//设置cookie
function createCookie(key, value, expires) {
	var cookieText = encodeURIComponent(key) + '=' + encodeURIComponent(value) + ";path:/";
	if (typeof expires === 'number' && !NaN) {
		var date = new Date();
		date.setDate(date.getDate() + expires);
		cookieText += ';expires=' + date;
	}
	document.cookie = cookieText;
}

//获取cookie
function getCookie(key) {
	var arr = document.cookie.split('; ');
	for (var i = 0, len = arr.length; i < len; i++) {
		var list = arr[i].split('=');
		if (list[0] == encodeURIComponent(key)) {
			return decodeURIComponent(list[1]);
		}
	}
}

//删除cookie
function removeCookie(key) {
	document.cookie = encodeURIComponent(key) + '=;expires=' + new Date(0) + ';path=/';
}