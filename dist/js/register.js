$(function () {
	//$name = $('.login-article .login-window .login-window-small .login-window-list #name');

	$testNum = $('.login-article .login-window .login-window-small .login-window-list .test-num');
	//$pwd = $('.login-article .login-window .login-window-small .login-window-list #pwd');
	//$repwd = $('.login-article .login-window .login-window-small .login-window-list #repwd');
	$inputTestNum = $('.login-article .login-window .login-window-small .login-window-list #testnum');
	$register = $('.login-article .login-window .login-window-small .login-window-list #register');
	var name = $id('#name');
	var pwd = $id('#pwd');
	var repwd = $id('#repwd');
	var str = "abcdefghigklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

	var newStr = '';
	for (var i = 0; i < 6; i++) {
		newStr += str.charAt(Math.floor(Math.random() * str.length));
	}
	$testNum.click(function () {
		$testNum.html(newStr);
	});
	$register.click(function () {
		if (!/^0?(13|14|15|18|17)[0-9]{9}$/.test(name.value) && !/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(name.value)) {
			alert('您注册的账号格式有误，请重新注册！');
		} else {
			if ($inputTestNum.val() !== $testNum.html()) {
				alert('请重新输入验证码！');
				$testNum.html(newStr);
			} else {
				if (pwd.value !== repwd.value) {
					alert('两次密码输入不一致，请重新输入！');
				} else {
					var strName = name.value;
					var strPwd = pwd.value;

					document.cookie = `username = ${strName}`;
					document.cookie = `password = ${strPwd}`;
					//alert('注册成功' + document.cookie);
					location.href = 'login.html';
				}
			}
		}
	});
});
function $id(id) {
	return document.querySelector(id);
}