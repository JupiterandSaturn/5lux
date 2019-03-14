$(function () {

	$loginSelect = $('.login-article .login-window .login-window-small .login-window-list .login-window-list-title .login-select');
	$registerSelect = $('.login-article .login-window .login-window-small .login-window-list .login-window-list-title .register-select');
	$loginListOne = $('.login-article .login-window .login-window-small .login-window-list .login-window-list-article');
	$loginListTwo = $('.login-article .login-window .login-window-small .login-window-list .login-window-list-article-input');
	$loginSelect.click(function () {
		$(this).css('color', 'black');
		$loginListTwo.css('display', 'none');
		$loginListOne.css('display', 'block');
		return false;
	});
	$registerSelect.click(function () {
		$(this).css('color', 'black');
		$loginListOne.css('display', 'none');
		$loginListTwo.css('display', 'block');
		return false;
	});
	var loginSubmit = document.querySelector('#submit');
	var lname = document.querySelector('#username');
	var lpwd = document.querySelector('#password');

	function login() {
		var str = document.cookie;

		var cname = getCookie("username");
		var cpwd = getCookie("password");
		loginSubmit.onclick = function () {
			//console.log(cname,cpwd);
			var date = new Date();
			date.setDate(date.getDate() + 7);
			document.cookie = `uname = ${lname.value};expires = ${date};path=/`;
			document.cookie = `upwd = ${lpwd.value};expires = ${date};path=/`;
			if (cname == lname.value && cpwd == lpwd.value) {
				alert('登录成功！');
				location.href = 'index.html';
			} else {
				alert('用户名或密码错误！');
			}
		};
	}
	login();

	var str = document.cookie;
	console.log(str);
});