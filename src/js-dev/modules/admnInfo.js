/*
 登录信息
 * */

var adminInfo = (function() {

	var _loginInfo = {
		isLogin: false,
		userName: "admin",
		pwd: "12345678"
	}
	// 是否登陆
	var _getLogin = function() {

	 var Info = common.localStorage.getItem("loginInfo") || _loginInfo;

		return Info;

	};

	// 是否登陆
	var _setLogin = function(userName, pwd) {

		userName = userName || "";
		pwd = pwd || "";

		if(_loginInfo.userName === userName && _loginInfo.pwd === pwd) {
			_loginInfo.isLogin=true;
			common.localStorage.setItem("loginInfo",_loginInfo);
			return true;
		} else {
			return false;
		}

	};
	
	// 退出登录
	var _logout = function() {

		common.localStorage.removeItem("loginInfo");
	};

	return {
		getLogin: _getLogin,
		setLogin:_setLogin,
		logout:_logout
		
	}

})();