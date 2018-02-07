var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 *	公共类库
 */

;(function () {

	// 冲突common兼容
	var _common = window.common = window.Common = window.com;

	/**创建Common对象**/
	var Common = window.com = window.common = window.Common = function () {};

	// 添加扩展extend
	Common.extend = function (obj) {
		if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object") {

			for (var i in obj) {
				this[i] = obj[i];
			}
		}

		return this;
	};

	// string  trim
	Common.extend({
		trim: function trim(data) {

			data = data || "";
			if (typeof data !== "string") {
				return "";
			}
			var str = data.replace(new RegExp("\\s*", "img"), "");

			return str;
		}
	});

	/**url对象**/
	Common.extend({

		url: {
			//采用正则表达式获取地址栏参数：（ 强烈推荐，既实用又方便！）
			getQueryString: function getQueryString(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if (r != null) return unescape(r[2]);
				return null;
			},

			//从WebAPI获取日期json数据 转换成日期时间戳
			jsonToDate: function jsonToDate(apidate) {
				var txts = apidate.replace("/Date(", "").replace(")/", "");
				return parseInt(txts.trim());
			},

			// 取当前页面名称(不带后缀名)
			getPageName: function getPageName() {
				var a = location.href;
				var b = a.split("/");
				var c = b.slice(b.length - 1, b.length).toString(String).split(".");
				return c.slice(0, 1);
			},

			//取当前页面名称(带后缀名)
			getPageNameExention: function getPageNameExention() {
				var strUrl = location.href;
				var arrUrl = strUrl.split("/");
				var strPage = arrUrl[arrUrl.length - 1];
				return strPage;
			}

		}
	});

	/**绑定自定义事件**/
	Common.extend({
		events: {
			events: {},

			// bind events
			on: function on(eventName, fn) {
				this.events[eventName] = this.events[eventName] || [];
				this.events[eventName].push(fn);
			},
			off: function off(eventName, fn) {
				if (arguments.length === 1) {

					this.events[eventName] = [];
				} else if (arguments.length === 2) {
					var $events = this.events[eventName] || [];
					for (var i = 0; i < $events.length; i++) {
						if ($events[i] === fn) {
							$events.splice(i, 1);
							break;
						}
					}
				}
			},
			emit: function emit(eventName, data) {

				if (this.events[eventName]) {
					for (var i = 0; i < this.events[eventName].length; i++) {
						this.events[eventName][i](data);
					}
				}
			}
		}
	});

	/**array的扩展方法**/
	Common.extend({
		list: {

			// min value
			min: function min(data) {
				data = data || [];
				if (data.constructor !== Array) {
					throw new Error("参数必须是个数组");
				}
				var _array_min = 0;
				var isOne = true;
				for (var i = 0; i < data.length; i++) {
					var _temp = 0;

					if (typeof data[i] !== "number") {

						//  is not a number
						var _num = Number(data[i]);
						_temp = isNaN(_num) ? 0 : _num;
					} else {

						//  is a number
						_temp = data[i];
					}

					if (isOne) {
						_array_min = _temp;
						isOne = false;
					} else {
						// set value number
						if (_temp < _array_min) {
							_array_min = _temp;
						}
					}
				}

				return _array_min;
			},

			// max value
			max: function max(data) {
				data = data || [];
				if (data.constructor !== Array) {
					throw new Error("参数必须是个数组");
				}
				var _array_max = 0;

				var isOne = true;
				for (var i = 0; i < data.length; i++) {
					var _temp = 0;

					if (typeof data[i] !== "number") {

						//  is not a number
						var _num = Number(data[i]);
						_temp = isNaN(_num) ? 0 : _num;
					} else {

						//  is a number
						_temp = data[i];
					}

					if (isOne) {
						_array_max = _temp;
						isOne = false;
					} else {
						// set value number
						if (_temp > _array_max) {
							_array_max = _temp;
						}
					}
				}

				return _array_max;
			},

			// data where
			where: function where(data, fn) {
				data = data || [];
				if (data.constructor !== Array) {
					throw new Error("第一个参数必须是个数组，第二是回调函数");
				}
				var _arrs = [];
				if (data.constructor === Array) {

					if (typeof fn !== "function") {
						return data;
					}
					for (var i = 0; i < data.length; i++) {

						if (fn(data[i])) {
							_arrs.push(data[i]);
						}
					}
				}

				return _arrs;
			},

			// data map
			map: function map(data, fn) {
				data = data || [];
				if (data.constructor !== Array) {
					throw new Error("第一个参数必须是个数组，第二是回调函数");
				}

				if (data.constructor === Array) {

					if (typeof fn !== "function") {
						return data;
					}

					for (var i = 0; i < data.length; i++) {

						data[i] = fn(data[i]) || data[i];
					}
				}

				return data;
			},

			//  data first
			first: function first(data) {
				data = data || [];
				if (data.constructor !== Array) {
					throw new Error("参数必须是个数组");
				}
				if (data.length > 0) {
					return data[0];
				} else {
					return null;
				}
			},

			//  data last
			last: function last(data) {
				data = data || [];
				if (data.constructor !== Array) {
					throw new Error("参数必须是个数组");
				}
				if (data.length > 0) {
					return data[data.length - 1];
				} else {
					return null;
				}
			},

			//  data  slice
			slice: function slice(data, startIndex, endIndex) {
				data = data || [];

				if (data.constructor !== Array) {
					throw new Error("参数必须是个数组");
				}
				if (data.length > 0) {
					startIndex = typeof startIndex === "number" ? startIndex : 0;
					endIndex = typeof endIndex === "number" ? endIndex : 0;
					var _arrs = [];
					for (var i = startIndex; i < data.length; i++) {

						if (i < endIndex) {
							_arrs.push(data[i]);
						}
					}

					return _arrs;
				} else {
					return [];
				}
			},

			//  sort
			sort: function sort(data, fn) {
				data = data || [];

				if (data.constructor !== Array) {
					throw new Error("参数必须是个数组");
				}
				if (data.length > 0) {

					Array.prototype.sort.call(data, fn);

					return data;
				} else {
					return [];
				}
			},

			//  reverse
			reverse: function reverse(data) {
				data = data || [];

				if (data.constructor !== Array) {
					throw new Error("参数必须是个数组");
				}
				if (data.length > 0) {

					Array.prototype.reverse.call(data);

					return data;
				} else {
					return [];
				}
			},

			//  sum
			sum: function sum(data) {
				data = data || [];

				if (data.constructor !== Array) {
					throw new Error("参数必须是个数组");
				}
				var _sum = 0;
				if (data.length > 0) {

					for (var i = 0; i < data.length; i++) {

						var _num = Number(data[i]);
						_num = isNaN(_num) ? 0 : _num;
						_sum = _sum + _num;
					}

					return _sum;
				} else {
					return 0;
				}
			},

			//  avg
			avg: function avg(data) {
				data = data || [];

				if (data.constructor !== Array) {
					throw new Error("参数必须是个数组");
				}
				var _sum = 0;
				if (data.length > 0) {

					for (var i = 0; i < data.length; i++) {

						var _num = Number(data[i]);
						_num = isNaN(_num) ? 0 : _num;
						_sum = _sum + _num;
					}

					return _sum / data.length;
				} else {
					return 0;
				}
			},

			//  splice
			splice: function splice(data, startIndex, endIndex) {
				data = data || [];

				if (data.constructor !== Array) {
					throw new Error("参数必须是个数组");
				}
				var _sum = 0;
				if (data.length > 0) {

					Array.prototype.splice.call(data, startIndex, endIndex);

					return data;
				} else {
					return [];
				}
			},

			//  not repeat
			notRepeat: function notRepeat(data) {
				data = data || [];
				if (data.constructor !== Array) {
					throw new Error("参数必须是个数组");
				}

				if (data.length <= 0) {
					return [];
				}
				var temp = [];
				temp.push(data[0]);
				for (var i = 1; i < data.length; i++) {

					var test = data[i];
					var isOk = true;
					for (var y = 0; y < temp.length; y++) {

						var test2 = temp[y];
						if (test === test2) {

							isOk = false;
							break;
						}
					}

					if (isOk) {
						temp.push(test);
					}
				}

				return temp;
			},
			// index
			index: function index(data, fn) {
				data = data || [];
				if (data.constructor !== Array) {
					throw new Error("参数必须是个数组");
				}

				if (data.length <= 0) {
					return [];
				}

				if (typeof fn === "function") {
					for (var i = 0; i < data.length; i++) {
						if (fn(data[i])) {
							return i;
						}
					}
				}
				return -1;
			}

		}

	});

	// cookie
	Common.extend({
		cookie: {

			setCookie: function setCookie(cookieName, cookieValue, expiresDate) {
				cookieName = cookieName || "";
				if (cookieName == "") {
					return;
				}
				cookieValue = cookieValue || "";
				var dt = new Date();
				expiresDate = typeof expiresDate === "number" ? expiresDate : 0;
				dt.setDate(dt.getDate() + expiresDate);
				var expires = dt;
				document.cookie = encodeURIComponent(cookieName.replace(new RegExp("\\s*", "img"), "")) + "=" + encodeURIComponent(cookieValue) + ";expires=" + expires;
			},

			getCookie: function getCookie(cookieName) {

				cookieName = cookieName || "";
				if (cookieName == "") {
					return;
				}

				var cookies = Common.cookie.getAllCookie();

				return cookies[cookieName];
			},

			getAllCookie: function getAllCookie() {

				var strs = document.cookie.split(new RegExp(";\\s*"));
				var obj = {};
				for (var i = 0; i < strs.length; i++) {

					var strs2 = strs[i].split("=");
					try {
						var _name = decodeURIComponent(strs2[0]).replace(new RegExp("\\s*", "img"), "");
						var _val = decodeURIComponent(strs2[1]).replace(new RegExp("\\s*", "img"), "");
						obj[_name] = _val;
					} catch (e) {}
				}

				return obj;
			},

			removeCookie: function removeCookie(cookieName) {

				Common.cookie.setCookie(cookieName, "", -1);
			}

		}

	});

	// localStorage 与 sessionStorage
	Common.extend({

		localStorage: {

			// localStorage存值永久有效
			setItem: function setItem(item, value) {
				item = item || "";
				if (typeof item !== "string") {
					return;
				}
				if (Common.trim(item) === "") {
					return;
				}

				localStorage.setItem(Common.trim(item), JSON.stringify(value));
			},

			// localStorage取值
			getItem: function getItem(item) {
				item = item || "";
				if (typeof item !== "string") {
					return;
				}
				if (Common.trim(item) === "") {
					return;
				}
				var data = JSON.parse(localStorage.getItem(Common.trim(item)));
				return data;
			},

			//localStorage删除指定键对应的值
			removeItem: function removeItem(item) {
				item = item || "";
				if (typeof item !== "string") {
					return;
				}
				if (Common.trim(item) === "") {
					return;
				}
				localStorage.removeItem(Common.trim(item));
			},
			clear: function clear() {
				localStorage.clear();
			}

		},

		sessionStorage: {

			// sessionStorage 
			setItem: function setItem(item, value) {
				item = item || "";
				if (typeof item !== "string") {
					return;
				}
				if (Common.trim(item) === "") {
					return;
				}

				sessionStorage.setItem(Common.trim(item), JSON.stringify(value));
			},

			// sessionStorage 取值
			getItem: function getItem(item) {
				item = item || "";
				if (typeof item !== "string") {
					return;
				}
				if (Common.trim(item) === "") {
					return;
				}
				var data = JSON.parse(sessionStorage.getItem(Common.trim(item)));
				return data;
			},

			// sessionStorage 删除指定键对应的值
			removeItem: function removeItem(item) {
				item = item || "";
				if (typeof item !== "string") {
					return;
				}
				if (Common.trim(item) === "") {
					return;
				}
				sessionStorage.removeItem(Common.trim(item));
			},

			clear: function clear() {
				sessionStorage.clear();
			}

		}

	});
})();
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 * h5文件上传插件
 * var file=document.getElementById("fileUp").files[0];
			
           	h5File.upload({
           		data:file,
           		url:"",
           		outTime:30000,
           		el:$(this),
           		size:10000000, //1m=1000000
           		seccess:function(){},//成功回调
           		error:function(){} //错误回调
           	
           	});//调用上传接口

 <div class="progress-box">
	<!-- 点击提交按钮-->	
	<input type="button" name="up" id="up" value="上传" />	
	<input class="v-hide" type="file" name="" 
	id="fileUp" value=""   accept="image/*" />
	<!--进度条-->
	<div class="progress-all">
		<div class="progress-now"></div>
		<div class="progress-num">0%</div>
	</div>
			
</div>
 * 
 * 
 * */

var h5File = function ($, mui) {

	var fileUpload = function fileUpload(option) {

		if ((typeof option === "undefined" ? "undefined" : _typeof(option)) !== 'object') {
			alert("参数有误！");
			return;
		}

		if (option.size) {
			if (option.data.size > option.size) {
				mui.alert("文件大于" + option.size / 1000000 + "M");
				return;
			}
		} else {
			mui.alert("参数没有设置文件大小值[size]");
			return;
		}

		var data = new FormData();

		data.append('myFiles', option.data);

		$.ajax({
			url: option.url,
			data: data,
			type: "post",
			timeout: option.outTime,
			cache: false,
			processData: false,
			contentType: false,
			xhrFields: {
				withCredentials: true
			},
			xhr: function xhr() {
				//获取ajaxSettings中的xhr对象，为它的upload属性绑定progress事件的处理函数
				var myXhr = $.ajaxSettings.xhr();
				if (myXhr.upload) {
					//检查upload属性是否存在
					//绑定progress事件的回调函数
					myXhr.upload.onprogress = progressFunction;
				}
				return myXhr; //xhr对象返回给jQuery或zepto使用
			},
			success: option.seccess,
			error: option.error
		});

		//progress事件的回调函数
		function progressFunction(evt) {

			var p = $(option.el).parents(".progress-box");
			var widthAll = $(".progress-all", p).width();
			var progressBar = $(".progress-all", p);
			var percentageDiv = $(".progress-now", p);
			var percentageNum = $(".progress-num", p);

			if (evt.lengthComputable) {
				progressBar.max = evt.total;
				progressBar.value = evt.loaded;
				$(percentageDiv).css("width", Math.round(evt.loaded / evt.total * widthAll) + "px");
				$(percentageNum).text(Math.ceil(evt.loaded / evt.total * 100) + "%");
				//          if (evt.loaded == evt.total) {
				//            //  console.log("上传完成100%");
				//          }
			}
		}
	};

	return {
		upload: fileUpload

	};
}(window.Zepto || window.jQuery, window.mui);
/** 上拉加载
 * 
 * <!--pullToRefresh-big 上拉加载大框-->
			<div class="index-list  pullToRefresh-big">
				
				<!-- pullToRefresh-box 上拉加载每一项-->
				<div class="mui-row pullToRefresh-box">
					<div class="mui-col-xs-6 ">
						<a href="javascript:;">
							<img src="images/index-list (1).png" alt="img" />
						</a>
						<div class="caption mui-text-left">
							<h4 class="mui-ellipsis width-100">Theland新西兰进口牛奶牛市兰</h4>
							<p class="">口牛奶牛市兰</p>
							<p>250ml*24 <span>家庭装</span></p>
							
							<div class="op mui-clearfix">
								<span class="text-danger">79.9元/箱</span>
								 <button class="btn" type="button">立即购买</button>
							</div>
						</div>
						
					</div>
					
				</div>
					
		</div>
		
	// js  
	
  =======================================分页============================================
  			wxLazy.init(); // 图片延迟加载

			mui.ready(function() {

				// 分页
				muiPullToRefreshObj = page(1, 2, {
					name: "mini",
					age: 12
				}, function() {
					wxLazy.reset(); // 重新执行 图片延迟加载
				});

				// 查询
				$(".submit-btn").on("tap", function() {

					resetPage(1, 4); //重新加载分页
				});

			});

			var muiPullToRefreshObj = {}; // 获取 上拉加载对象
			// 重新加载分页
			function resetPage(min, max, obj,olddata) {

				muiPullToRefreshObj.indexPage = min;
				muiPullToRefreshObj.maxPage = max;
				muiPullToRefreshObj.obj = obj || {}; // 
				muiPullToRefreshObj.getFirstPage();   // muiPullToRefreshObj.getFirstPage(olddata);   // 已有的数据
				if(muiPullToRefreshObj.self) {
					muiPullToRefreshObj.self.refresh(true);
				}
			}

			// 分页
			function page(min, max, obj, fn,olddata) {
				return muiPullToRefresh.init({
					indexPage: min, // 当前页
					maxPage: max, // 总共页数
					pullToRefreshBig: ".pullToRefresh-big", // 上拉的大框
					pullToRefreshBox: ".pullToRefresh-box", // 上拉的加载框
					url: "json/index.json", // ajax url
					showText: { // 上拉 的文本
						init: "上拉显示更多",
						down: "上拉显示更多",
						refresh: "正在加载...",
						nomore: "没有更多数据了"
					},

					obj: obj, // ajax 参数
					fn: function(data) {
						data = data.constructor === Array ? data : JSON.parse(data);
						var template = Handlebars.compile(document.getElementById("handlebars-templete").innerHTML);
						var html = template({
							lists: data
						});

						$(this.pullToRefreshBig).find(this.pullToRefreshBox).append(html);

					}
				}, fn,olddata);

			}

	==========================================================================================
 * 
 * **/

var muiPullToRefresh = function (mui, $) {

	if (!mui) {
		return;
	}

	var _init = function pullUpToRefresh(obj, fn, oldData) {
		obj.indexPage = typeof obj.indexPage === "number" ? obj.indexPage : 0;
		obj.maxPage = typeof obj.maxPage === "number" ? obj.maxPage : 0;
		obj.pullToRefreshBig = typeof obj.pullToRefreshBig === "string" ? obj.pullToRefreshBig : ".pullToRefresh-big";
		obj.pullToRefreshBox = typeof obj.pullToRefreshBox === "string" ? obj.pullToRefreshBox : ".pullToRefresh-box";
		obj.url = typeof obj.url === "string" ? obj.url : "";
		obj.obj = obj.obj || {};
		obj.obj = obj.obj.constructor === Object ? obj.obj : {};
		obj.endPullUp = false;

		obj.fn = typeof obj.fn === "function" ? obj.fn : function () {};
		obj.showText = obj.showText || {
			init: "上拉显示更多",
			down: "上拉显示更多",
			refresh: "正在加载...",
			nomore: "没有更多数据了"
		};
		obj.getFirstPage = getFirstPage;

		if (getFirstPage(oldData)) {
			return;
		}

		function getFirstPage(oldData) {
			var bl = false;

			// 原有的数据
			if (oldData) {
				$(obj.pullToRefreshBig).find(obj.pullToRefreshBox).html("");
				obj.fn(oldData);
				//obj.indexPage++; //页码
				// 回调函数
				if (typeof fn === "function") {
					fn(oldData);
				}
			} else {

				// ajax数据 ......		
				$.get(obj.url + "?pullToRefreshBoxid=" + obj.indexPage, obj.obj, function (data) {

					$(obj.pullToRefreshBig).find(obj.pullToRefreshBox).html("");
					obj.fn(data);
					//obj.indexPage++; //页码
					// 回调函数
					if (typeof fn === "function") {
						fn(data);
					}
				});
			}

			// 没有更多数据
			if (obj.maxPage <= obj.indexPage) {
				$(obj.pullToRefreshBig).find(".mui-pull-bottom-wrapper").remove();
				var div = document.createElement("div");
				div.innerText = obj.showText.nomore;
				div.style.textAlign = "center";
				div.style.padding = "10px 0";
				div.style.background = "#fff";
				//div.style.color = "#777";
				//div.style.fontSize = "14px";
				div.classList.add("mui-pull-bottom-wrapper");
				//document.querySelector(obj.pullToRefreshBig).innerHTML="";
				document.querySelector(obj.pullToRefreshBig).appendChild(div);
				$(obj.pullToRefreshBig).css("margin-bottom", "0");
				$(obj.pullToRefreshBig).find(".mui-pull-bottom-tips").remove();

				bl = true;
			}

			return bl;
		}

		//循环初始化所有下拉刷新，上拉加载。 
		mui.each(document.querySelectorAll(obj.pullToRefreshBig), function (index, pullRefreshEl) {

			mui(pullRefreshEl).pullToRefresh({

				up: {

					callback: function callback() {
						obj.self = this;
						var self = this;
						//self.refresh(true);
						setTimeout(function () {
							var ul = self.element.querySelector(obj.pullToRefreshBox);

							//ajax数据 ......		
							obj.endPullUp = obj.indexPage >= obj.maxPage;
							if (obj.endPullUp) {

								return;
							}
							var pullToRefreshBoxid = obj.indexPage + 1;
							$.get(obj.url + "?pullToRefreshBoxid=" + pullToRefreshBoxid, obj.obj, function (data) {

								obj.fn(data);
								obj.indexPage++; //页码
								self.endPullUpToRefresh(obj.indexPage >= obj.maxPage);
							});
						}, 1000);
					},
					contentinit: obj.showText.init,
					contentdown: obj.showText.down,
					contentrefresh: obj.showText.refresh,
					contentnomore: obj.showText.nomore
				}

			});
		});

		return obj;
	};

	return {
		init: _init

	};
}(mui, window.Zepto || window.jQuery);

/**
 * mui  select date
 *<input class="date-box mui-date" type="text" data-options='{"type":"datetime","beginYear":2010,"endYear":2050}' name="" id="" value="" placeholder="输入时间" />
 * 	
 * // css
 * <link rel="stylesheet" href="css/mui.picker.min.css" />
 * 
 * //js
 * 	<script src="js/mui.picker.min.js" type="text/javascript" charset="utf-8"></script>
 * 
 * **/

var muiSelectDate = function () {

	var _init = function _init(selector) {
		selector = selector || ".mui-date";
		if (typeof selector === "string") {

			// 时间
			var btns = mui(selector);
			btns.each(function (i, btn) {

				btn.addEventListener('tap', function () {
					this.blur();
					var optionsJson = this.getAttribute('data-options') || '{}';
					var options = JSON.parse(optionsJson);

					/*
      * 首次显示时实例化组件
      * 示例为了简洁，将 options 放在了按钮的 dom 上
      * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
      */
					var picker = new mui.DtPicker(options);
					picker.show(function (rs) {
						btn.value = rs.text;
						picker.dispose();
					});
				}, false);
			});
		}
	};

	return {
		init: _init
	};
}();
var pickerSelect = function (mui) {

	// 	一级选择 
	var _oneSelect = function oneSelect(selector, data) {

		var userPicker = new mui.PopPicker();
		userPicker.setData(data);

		var showUserPickerButton = document.querySelector(selector);

		showUserPickerButton.addEventListener('tap', function (event) {
			userPicker.show(function (items) {
				event.target.blur();
				showUserPickerButton.value = items[0].text;
				showUserPickerButton.setAttribute("data-value", items[0].value);
				//返回 false 可以阻止选择框的关闭
				//return false;
			});
		}, false);
	};

	// 省份-级联示例
	var _getParam = function _getParam(obj, prop) {
		return obj[prop] || '';
	};

	// 	二级选择
	var _twoSelect = function twoSelect(selector) {

		//级联示例
		var cityPicker = new mui.PopPicker({
			layer: 2
		});
		cityPicker.setData(cityData);
		var showCityPickerButton = document.querySelector(selector);

		showCityPickerButton.addEventListener('tap', function (event) {
			cityPicker.show(function (items) {
				event.target.blur();
				showCityPickerButton.value = _getParam(items[0], 'text') + "-" + _getParam(items[1], 'text');
				//返回 false 可以阻止选择框的关闭
				//return false;
			});
		}, false);
	};

	// 三级选择
	var _threeSelect = function threeSelect(selector) {

		//级联示例
		var cityPicker = new mui.PopPicker({
			layer: 3
		});
		cityPicker.setData(cityData3);
		var showCityPickerButton = document.querySelector(selector);

		showCityPickerButton.addEventListener('tap', function (event) {
			cityPicker.show(function (items) {
				event.target.blur();
				showCityPickerButton.value = _getParam(items[0], 'text') + "-" + _getParam(items[1], 'text') + "-" + _getParam(items[2], 'text');
				//返回 false 可以阻止选择框的关闭
				//return false;
			});
		}, false);
	};

	return {
		oneSelect: _oneSelect,
		twoSelect: _twoSelect,
		threeSelect: _threeSelect
	};
}(mui);
/**延迟加载**/

/**
 * 延迟加载
 *  * <img class="load-lazy"
 * 	src="images/Home/lazy.jpg"
 * alt="新品上市图片"
 * data-src="images/Home/板块图片1.png"
 * > 
 * 
 * wxLazy.init(); // 图片延迟加载
 * */
var wxLazy = function ($) {

	var _init = function _init() {

		var window_h = $(window).height();

		$(window).scroll(function () {
			setTimeout(function () {

				$(".load-lazy").each(function () {

					var img_h = parseInt($(this).offset().top) - parseInt(window_h);
					var img_h2 = parseInt($(this).offset().top) + $(this).height();
					if ($(window).scrollTop() >= img_h && $(window).scrollTop() < img_h2) {

						$(this).attr("src", $(this).attr("data-src"));

						/*ie8 不支持
       * .animate({
      "opacity":0.2
      }).animate({
      "opacity": 1
      }, 500);
      		
      * */
					}
				});
			}, 400);
		});
	};

	var _reset = function _reset() {

		$(".load-lazy").each(function () {
			$(this).attr("src", $(this).attr("data-src"));
		});
	};

	return {
		init: _init,
		reset: _reset
	};
}(window.jQuery || window.Zepto);


/*check按钮组件
 * 
 * 
 * <ul>
 * 	<li class="check-btn"> 
 * 		<a class="check-btn-item">技术牛逼</a>
 * 	</li>
 * 	<li class="check-btn"> 
 * 		<a class="check-btn-item">信息大师</a>
 * 	</li>
 * </ul>
 * 
 * 		
 * 选中点击事件
		$(".check-btn").on("check_btn_select",function(event,element){			
			
			// element 当前点击的元素
			alert($(element));
		});
		
		// 取消点击事件
		$(".check-btn").on("check_btn_unselect",function(event,element){			
			
			// element 当前点击的元素
			alert($(element));
		});
 * 
 * */

+function ($) {

	$(".check-btn-item").on("click", function () {

		if (typeof $(this).attr("data-bl") === "undefined") {
			$(this).addClass("active");
			$(this).attr("data-bl", "true");

			//点击触发自定义事件
			$(this).trigger("check_btn_select", [this]);
		} else {
			//点击触发自定义事件
			$(this).trigger("check_btn_unselect", [this]);
			$(this).removeClass("active");
			$(this).removeAttr("data-bl");
		}
	});
}(window.jQuery || window.Zepto);
+function () {

  // 给checkbox 自动添加boolean 值
  //	$("input[type=checkbox]").on("click",function() {
  //		var bl = $(this).attr("checked");
  //		if(typeof bl !== "undefined") {
  //			$(this).triggerHandler("click");
  //			$(this).attr("checked", true);
  //		} else {
  //			//$(this).triggerHandler("click");
  //				//$(this).attr("checked", false);
  //			$(this).removeAttr("checked");
  //		}
  //
  //	});
}();
mui.init({

	swipeBack: true //启用右滑关闭功能

});

/*****置顶组件start*********/
(function ($, mui) {

	$(".icon-back").on("tap", function () {

		if (history.back) {
			history.back();
		}
	});

	$(window).scroll(function () {

		if ($(window).scrollTop() >= 500) {
			$(".zhiding").show();
		} else {
			$(".zhiding").hide();
		}
	});

	//置顶点击
	$(".zhiding").on("tap", function () {
		mui.scrollTo(0, 300);
	});
})(window.Zepto || window.jQuery, mui);

// 页脚的跳转
$(".mui-bar-tab a").on("tap", function () {

	$(this).removeClass("mui-active");
	var href = $(this).attr("href");
	window.location.assign(href);

	return false;
});

// 头部搜索页的跳转
$(document).find("[data-toggle=skip]").on("tap", function () {
	$(this).blur();

	if ($(this).attr("data-toggle") == "skip") {
		var url = $(this).attr("data-url");
		if (typeof url !== "undefined") {
			window.location.href = url;
		}
	}
});

// 加入购物车
$(document).on("click", ".animate-btn", function (e) {

	var v = $(".shopcar").text() || 0;
	v = Number(v);
	v = isNaN(v) ? 0 : v;
	v = v + 1;
	animate(e, function () {

		// 存入 localStorage
		var arrs = com.localStorage.getItem("shopcar") || [];
		arrs.push({});
		com.localStorage.setItem("shopcar", arrs);
		$(".shopcar").text(arrs.length);
	}); //添加购物车的动画
});

var animate = function animate(e, fn) {

	// 创建span
	var span = document.createElement("span");
	span.classList.add("animate-cart");
	span.classList.add("iconfont");
	span.classList.add("icon-shopping");
	$("body").append(span);
	var els = $(".animate-cart");
	els.show();
	// 开始位置
	els.css({
		left: e.clientX,
		top: e.clientY
	});

	// 结束位置
	//window.innerHeight  兼容所以手机端的和pc端    
	var _top2 = window.innerHeight - $(".footer").height();
	var _left2 = $(".footer .shopcar").offset().left;
	els.animate({
		top: _top2 - 1,
		left: _left2 + 1

	}, 1000, function () {
		if (typeof fn === "function") {
			fn();
		}
		els.hide(200).remove();
	});
};

// 获取购物车数量
shopCar();

function shopCar() {
	var v = com.localStorage.getItem("shopcar") || 0;

	$(".shopcar-local").text(v.length);
}
/*
  
<div class="number" >
   <button class="minus btn" type="button">-</button>
<input class="num" type="number" value="1" data-min="0" data-max="9999" data-step="1" />
<button class="plus btn" type="button">+</button>
  
</div>

 * 数字框组件start
 * 事件：number_click
 *
 * 点击事件
	$(document).on("number_click",function(event,element){			
		//element 当前点击的元素	
		var p=$(element).parents(".number");
		alert($(p).find(".num").val());
							
	});
 * */

+function ($) {

	//minus
	$(document).on("click", ".minus", function (e) {
		e.stopPropagation();
		e.preventDefault();

		var p = $(this).parents(".number");

		//步长
		var step = Number($(".num", p).attr("data-step"));
		step = window.isNaN(step) ? 1 : step;

		//最大值
		//			var max=Number($(".num",p).attr("data-max"));
		//				max=window.isNaN(max)?9999:max;
		//最小值
		var min = Number($(".num", p).attr("data-min"));
		min = window.isNaN(min) ? 0 : min;

		var v = Number($(".num", p).val());
		v = window.isNaN(v) ? min : v;

		//计算
		v = v > min ? v - step : min;

		if (v <= min) {
			v = min;
		}

		$(".num", p).val(v);

		//点击触发自定义事件
		$(this).trigger("number_click", [this]);
	});

	//plus
	$(document).on("click", ".plus", function (e) {
		e.stopPropagation();
		e.preventDefault();
		var p = $(this).parents(".number");

		//步长
		var step = Number($(".num", p).attr("data-step"));
		step = window.isNaN(step) ? 1 : step;

		//最大值
		var max = Number($(".num", p).attr("data-max"));
		max = window.isNaN(max) ? 9999 : max;
		//最小值
		var min = Number($(".num", p).attr("data-min"));
		min = window.isNaN(min) ? 0 : min;

		var v = Number($(".num", p).val());
		v = window.isNaN(v) ? min : v;

		//计算
		v = v < max ? v + step : max;

		if (v >= max) {
			v = max;
		}

		$(".num", p).val(v);
		//点击触发自定义事件
		$(this).trigger("number_click", [this]);
	});
}(window.jQuery || window.Zepto);

/*****数字框组件end******/
/*****单选按钮组件**
 * 
 * 
 * <div class="radio-btn">             
   <div class="radio-btn-item active">盆</div>
   <div class="radio-btn-item">箱</div>
   <div class="radio-btn-item">斤</div>
   <div class="radio-btn-item">米</div>
   </div>
   
   // 单选按钮点击触发自定义事件
   $(".radio-btn").on("radio_click",function(event,el){
   	
   });
 * 
 * 
 * ****/

+function ($) {

  $(".radio-btn-item").on("tap", function () {
    var p = $(this).parents(".radio-btn");
    $(".radio-btn-item", p).removeClass("active");
    $(this).addClass("active");

    //点击触发自定义事件
    $(this).trigger("radio_click", [this]);
  });
}(window.jQuery || window.Zepto);
/*
 * 标签选项卡
 * 
 * <div class="tab-big">
 * 
	 <div class="tab-ttl">
         <a class="tab-item active" data-target="#form_a">
                            塑胶原料
             </a>
           <a class="tab-item"  data-target="#form_b">
                            改性塑料
            </a>
          <a class=" tab-item"  data-target="#form_c">
                            环保再生
            </a>
            <a class="tab-item"  data-target="#form_d">
                            塑料助剂
         </a>

    </div>
      
     <div class="fabu-form tab-content ">
                
           <!--塑胶原料-->
           <div class="form tab-content-item active" id="form_a">-塑胶原料</div>
              <!--塑胶原料2-->
           <div class="form tab-content-item " id="form_b">-塑胶原料2</div>
              <!--塑胶原料3-->
           <div class="form tab-content-item " id="form_c">-塑胶原料3</div>
              <!--塑胶原料4-->
           <div class="form tab-content-item " id="form_d">-塑胶原料4</div>
 *          
 *    </div>
 * 
 * </div>
 * 
 * 
 * 		//点击事件
		$(".tab-item").on("tab_select",function(event,element){			
			//element 当前点击的元素	
			
		});
 * 
 * */

+function ($) {

  // 选项卡tag-box tap 新的
  $(".tab-big .tab-ttl .tab-item").on("tap", function (e) {

    e.preventDefault();
    var p = $(this).parents(".tab-big");
    p.find(".tab-ttl .tab-item").removeClass("active");
    $(this).addClass("active");

    var target = $(this).attr("data-target");
    $(".tab-content", p).find(".tab-content-item").removeClass("active");
    $(".tab-content", p).find(target).addClass("active");

    // 点击触发自定义事件 
    $(this).trigger("tab_select", this);
  });
}(window.jQuery || window.Zepto);
/**
 * 
 * 缩略图
 * 
 * <div class=" clearfix  thumbnail-slider">
		<!--btn-->
		<div class="pull-left   ">
			<span class="glyphicon glyphicon-menu-left  thumbnail-btn-l"></span>
		</div>
		<div class=" pull-left thumbnail-content ">

			<div class="thumbnail-allitems">

				<ul class=" thumbnail-item">
					<li class="clearfix">
						<a href="javascript:">
							<img src="images/youhui-1.png" alt="优选好货 图片 160*160" />
							<div class="caption">
								<p>
									Nutrilon诺优能 幼儿配方奶粉 3段 12-36月个月800克/罐
								</p>

								<div class="price">
									<span class=" iconfont  renminbi "></span>
									<span>150</span>
								</div>
							</div>
						</a>
					</li>

				</ul>
	
			</div>
			
			<div class="thumbnail-num">
				<span class="l">1</span>
				<span>/</span>
				<span class="r">4</span>
				
			</div>

		</div>
		<div class="pull-left">
			<span class="glyphicon glyphicon-menu-right thumbnail-btn-r"></span>
		</div>
	</div>

 * **/

+function ($) {

	//
	//	$.fn.thumbnail=function(){
	//			
	//			var $content= $(this).find(".thumbnail-content");
	//			var $allitems= $(this).find(".thumbnail-allitems");
	//			var $btn_l= $(this).find(".thumbnail-btn-l");
	//			var $btn_r= $(this).find(".thumbnail-btn-r");
	//			var $item= $(this).find(".thumbnail-item");
	//			var $num= $(this).find(".thumbnail-num");
	//			var $num_r=$num.find(".r");
	//			var $num_l=$num.find(".l");
	//			
	//		
	//			var size= parseInt($item.length);
	//			var width= parseInt($item.outerWidth(true));
	//			var index=0;
	//			$num_r.text(size);
	//			$num_l.text(1);
	//			
	//			// 设置width
	//			$allitems.width(size*width);
	//				
	//			 $btn_r.click(function(){
	//			 	index=index>=0&&index<size-1?++index:size-1;
	//			 	
	//			 	$allitems.animate({left:-index*width},400)
	//			 	$num_l.text(index+1);
	//			 })
	//			 
	//			  $btn_l.click(function(){
	//			 	index=index>0&&index<size?--index:0;
	//			 	$num_l.text(index+1);
	//			 	$allitems.animate({left:-index*width},400)
	//			 	
	//			 })
	//				
	//			return this;
	//			
	//			
	//		}
	//		
	//	
	//	


	$(".thumbnail-slider").each(function () {

		var $content = $(this).find(".thumbnail-content");
		var $allitems = $(this).find(".thumbnail-allitems");
		var $btn_l = $(this).find(".thumbnail-btn-l");
		var $btn_r = $(this).find(".thumbnail-btn-r");
		var $item = $(this).find(".thumbnail-item");
		var $num = $(this).find(".thumbnail-num");
		var $num_r = $num.find(".r");
		var $num_l = $num.find(".l");

		var size = parseInt($item.length);
		var width = parseInt($item.outerWidth(true));
		var index = 0;
		$num_r.text(size);
		var curIndex = size <= 0 ? 0 : 1;
		$num_l.text(curIndex);
		if (size <= 0) {
			$num.hide();
			$btn_l.hide();
			$btn_r.hide();
		}
		// 设置width
		$allitems.width(size * width);

		$btn_r.click(function () {
			index = index >= 0 && index < size - 1 ? ++index : size - 1;

			$allitems.animate({ left: -index * width }, 400);
			$num_l.text(index + 1);
		});

		$btn_l.click(function () {
			index = index > 0 && index < size ? --index : 0;
			$num_l.text(index + 1);
			$allitems.animate({ left: -index * width }, 400);
		});
	});
}(window.jQuery || window.Zepto);
/*  上下滑动菜单
 * 
 * 	<!--头部-->
	<header class=" topBottomTab-top">	</header>
	
	<!--内容-->
	<section class=" topBottomTab-content">
		<div class="topBottomTab-menu  mui-row ">
			<!--左边菜单-->
			<div class=" topBottomTab-menu-ttl  mui-col-xs-3">
				<ul>
					<li class="active">
						<a href="javascript:;">奶粉</a>
					</li>
					<li>
						<a href="javascript:;">叶子系列</a>
					</li>
					<li>
						<a href="javascript:;">观叶植物</a>
					</li>
				</ul>
			
			</div>
			<!--右边内容-->
			<div class=" topBottomTab-menu-content mui-col-xs-9 ">
					
			</div>

		</div>		
	</div>
	<!-- 底部--->
	<nav class="topBottomTab-bottom"></nav>

 
 	//  上下滑动菜单ttl 点击事件
	$(".topBottomTab-menu-ttl ").on("topBottomTab_tap",function(target,el){
		alert($(el).text());
	});
	
 */

+function ($) {

	setHeight();

	//改变大小
	$(window).resize(function () {
		setHeight();
	});

	function setHeight() {

		//获取head高度
		var top_h = $(".topBottomTab-top").height();
		//获取底部高度
		var bottom_h = $(".topBottomTab-bottom").height();
		//获取windown高度
		var windown_h = $(window).height();

		//设置srollMenu的高度
		var menu_h = windown_h - top_h - bottom_h;
		$(".topBottomTab-menu").css({
			"height": menu_h,
			"top": top_h
		});
	}

	//选择的样式
	$(".topBottomTab-menu-ttl ul").on("tap", "li", function () {

		$(".topBottomTab-menu-ttl  ul li").removeClass("active");
		$(this).addClass('active');

		//点击触发自定义事件
		$(this).trigger("topBottomTab_tap", [this]);
	});
}(window.jQuery || window.Zepto);
/**
 * 收货地址
 * **/

var address = function () {

	var obj = {
		id: 1,
		isDefault: true, // 是否设为默认值
		name: "刘小明",
		phone: "13488889999",
		address: "广东省-深圳市-福田区",
		dtlAddress: "福华路海鹰大厦28E"
	};
	var list = [];
	//list.push(obj);

	// 获取地址列表
	var _getAddressList = function _getAddressList() {

		return com.localStorage.getItem("address") || [];
	};
	// 获取地址列表
	var _setAddress = function _setAddress(obj) {
		var arrs = com.localStorage.getItem("address") || [];

		// 设为默认
		if (obj.isDefault == "1") {
			com.list.map(arrs, function (item) {
				item.isDefault = false;
			});
		}
		obj.isDefault = Number(obj.isDefault);
		//自增id
		var lastObj = common.list.last(arrs);
		obj.id = lastObj ? lastObj.id + 1 : 1;

		var index = arrs.push(obj);
		com.localStorage.setItem("address", arrs);
		return index;
	};

	// 根据id去查询数据
	function _where(qid) {
		return com.list.where(com.localStorage.getItem("address") || [], function (item) {
			return item.id == qid;
		});
	};

	// 修改数据
	function _edit(obj) {
		var data = com.localStorage.getItem("address") || [];

		var index = com.list.index(data, function (item) {
			return item.id == obj.id;
		});

		// 设置默认值
		if (Number(obj.isDefault)) {
			com.list.map(data, function (item) {
				item.isDefault = 0;
				return item;
			});
		}
		data.splice(index, 1, obj);
		com.localStorage.setItem("address", data);
		return true;
	}

	// 删除数据
	function _delete(id) {
		var data = com.localStorage.getItem("address") || [];

		var index = com.list.index(data, function (item) {
			return id === item.id;
		});

		data.splice(index, 1);
		com.localStorage.setItem("address", data);
		return index;
	};

	return {
		getAddressList: _getAddressList,
		setAddress: _setAddress,
		where: _where,
		edit: _edit,
		delete: _delete
	};
}();
/*
 登录信息
 * */

var adminInfo = function () {

	var _loginInfo = {
		isLogin: false,
		userName: "admin",
		pwd: "12345678"
		// 是否登陆
	};var _getLogin = function _getLogin() {

		var Info = common.localStorage.getItem("loginInfo") || _loginInfo;

		return Info;
	};

	// 是否登陆
	var _setLogin = function _setLogin(userName, pwd) {

		userName = userName || "";
		pwd = pwd || "";

		if (_loginInfo.userName === userName && _loginInfo.pwd === pwd) {
			_loginInfo.isLogin = true;
			common.localStorage.setItem("loginInfo", _loginInfo);
			return true;
		} else {
			return false;
		}
	};

	// 退出登录
	var _logout = function _logout() {

		common.localStorage.removeItem("loginInfo");
	};

	return {
		getLogin: _getLogin,
		setLogin: _setLogin,
		logout: _logout

	};
}();
/**
 * baseset 修改基本信息
 * 
 * **/

var baseset = function () {

	var edit = function edit(fn) {

		//修改show
		$(".baseset-xx .edit").on("tap", function () {
			$(".baseinfo-alert").show();
			var v = $(this).find("span").text();
			var p = $(".baseinfo-alert");

			$(".back-ttl", p).text($(this).prevAll("label").text());
			$(p).find(".txt-v").val(v).focus(); // 内容值
			$(p).find(".txt-v").attr("data-filed", $(this).attr("data-filed"));
			var pattern = $(this).attr("data-pattern");
			var pattern_msg = $(this).attr("data-pattern-msg");
			var data_empty = $(this).attr("data-empty");
			$(p).find(".txt-v").attr("data-empty", data_empty);
			if (typeof pattern !== "undefined") {
				$(p).find(".txt-v").attr("data-pattern", pattern);
				$(p).find(".txt-v").attr("data-pattern-msg", pattern_msg);
			} else {
				$(p).find(".txt-v").removeAttr("data-pattern");
				$(p).find(".txt-v").removeAttr("data-pattern-msg");
			}
		});

		// 返回hide
		$(".baseinfo-alert .close").on("tap", function () {
			$(this).parents(".baseinfo-alert").hide();
		});

		// 保存
		$(".baseinfo-alert .btn").on("tap", function () {
			edit.apply(this);
		});

		// 修改信息api
		function edit() {

			var p = $(".baseinfo-alert");
			var v = $(".txt-v", p).val(); // 内容值
			var filed = $(".txt-v", p).attr("data-filed") || ""; //字段名称
			var regx_v = $(".txt-v", p).attr("data-pattern"); //字段名称
			var regx_msg = $(".txt-v", p).attr("data-pattern-msg") || ""; //字段名称
			var btn_text = $(this).attr("data-btn-text");
			var empty = $(".txt-v", p).attr("data-empty") || "not data  is empty";
			// 非空验证
			if (v == "" || v === null) {
				mui.alert(empty, " ", btn_text, function () {});
				return;
			}
			// 正则验证
			var regx = new RegExp(regx_v, "ig");
			if (!regx.test(v)) {
				mui.alert(regx_msg, " ", btn_text, function () {});
				return;
			}

			if (typeof fn !== "undefined") {
				fn(v, filed);
			}

			$(".baseinfo-alert").hide(); // 大框hide
			// $(".txt-v", p).val();
			//	});
		};
	};

	return {
		edit: edit
	};
}();
/*
 * 商品批量购买
 * */

var batch = function () {

	var _init = function _init() {

		// checkbox 选择
		$(".batch-select .check-all").on("tap", function () {

			if ($(this).attr("data-bl")) {
				$(this).removeClass("icon-xuanzhongduigou").addClass("icon-checknormal");
				$(this).removeAttr("data-bl");
				select_ck(false);
			} else {
				$(this).removeClass("icon-checknormal").addClass("icon-xuanzhongduigou");
				$(this).attr("data-bl", true);
				select_ck(true);
			}
		});

		//	label-click	
		$(".batch-select  .label-click").on("tap", function () {
			$(".check-all", ".batch-select").trigger("tap");
		});

		// checkbox function
		function select_ck(bl) {

			if (bl) {
				var els = $(".shop-cont input[type=checkbox]");
				els.attr("checked", false);
				els.click();
				els.attr("checked", true);
			} else {
				var els = $(".shop-cont input[type=checkbox]");
				els.click();
				els.attr("checked", false);
			}
		}
	};

	return {
		init: _init
	};
}();
/*
 
 * */

var collection = function () {

	var _init = function _init() {

		// 编辑
		$(".head-right-btn").on("tap", function () {
			var o = $(this).attr("data-text") || {};
			o = JSON.parse(o);
			var isEdit = $(this).attr("data-edit");

			if (typeof isEdit === "undefined") {

				// 编辑
				$(this).text(o.complate);
				$(this).attr("data-edit", true);
				isShow(false);
				select_ck(false);
				$(".collection-select .check-all").removeClass("icon-xuanzhongduigou").addClass("icon-checknormal");
				$(".collection-select .check-all").removeAttr("data-bl");
				$(".collection-select").show();
			} else {

				//完成
				$(this).text(o.edit);
				$(this).removeAttr("data-edit");
				isShow(true);
				select_ck(false);
				$(".collection-select .check-all").removeClass("icon-xuanzhongduigou").addClass("icon-checknormal");
				$(".collection-select .check-all").removeAttr("data-bl");
				$(".collection-select").hide();
			}
		});

		// 结算与删除 show  or  hide
		function isShow(bl) {

			if (bl) {
				$(".shop-select .edit").show();
				$(".shop-select .complate").hide();
				$(".shop-item input[type=checkbox]").hide();
			} else {
				$(".shop-select .edit").hide();
				$(".shop-select .complate").show();
				$(".shop-item input[type=checkbox]").show();
			}
		}

		// checkbox 选择
		$(".collection-select .check-all").on("tap", function () {

			if ($(this).attr("data-bl")) {
				$(this).removeClass("icon-xuanzhongduigou").addClass("icon-checknormal");
				$(this).removeAttr("data-bl");
				select_ck(false);
			} else {
				$(this).removeClass("icon-checknormal").addClass("icon-xuanzhongduigou");
				$(this).attr("data-bl", true);
				select_ck(true);
			}
		});

		//	label-click	
		$(".collection-select  .label-click").on("tap", function () {
			$(".check-all", ".collection-select").trigger("tap");
		});

		// checkbox function
		function select_ck(bl) {

			if (bl) {
				var els = $(".shop-cont input[type=checkbox]");
				els.attr("checked", false);
				els.click();
				els.attr("checked", true);
			} else {
				var els = $(".shop-cont input[type=checkbox]");
				els.click();
				els.attr("checked", false);
			}
		}
	};

	return {
		init: _init
	};
}();
var index = function () {

	// 添加购物车的动画
	//	var _animate = function() {
	//
	//		$(document).on("click", ".animate-btn", function(e) {
	//
	//			var tt = $(document).height() - $(this).offset().top;
	//			// 创建span
	//			var span = document.createElement("span");
	//			span.classList.add("animate-cart");
	//			span.classList.add("iconfont");
	//			span.classList.add("icon-shopping");
	//			$("body").append(span)
	//			var els = $(".animate-cart");
	//			els.show();
	//			// 开始位置
	//			els.css({
	//				left: e.clientX,
	//				top: e.clientY
	//			});
	//
	//			// 结束位置
	//			var _top2 = $(window).height() - $(".footer").height();
	//			//alert(_top2)
	//
	//			var _left2 = $(".footer .shopcar").offset().left;
	//			els.animate({
	//				top: _top2,
	//				left: _left2,
	//
	//			}, 1000, function() {
	//				els.fadeOut(200).remove();
	//			});
	//
	//		});
	//	}
	//
	//	return {
	//		animate: _animate
	//	}

}();
var shop = function () {

	var _init = function _init() {

		// 编辑
		$(".head-right-btn").on("tap", function () {
			var o = $(this).attr("data-text") || {};
			o = JSON.parse(o);
			var isEdit = $(this).attr("data-edit");

			if (typeof isEdit === "undefined") {

				// 编辑
				$(this).text(o.complate);
				$(this).attr("data-edit", true);
				isShow(false);
				select_ck(false);
				$(".shop-select .check-all").removeClass("icon-xuanzhongduigou").addClass("icon-checknormal");
				$(".shop-select .check-all").removeAttr("data-bl");
			} else {

				//完成
				$(this).text(o.edit);
				$(this).removeAttr("data-edit");
				isShow(true);
				select_ck(false);
				$(".shop-select .check-all").removeClass("icon-xuanzhongduigou").addClass("icon-checknormal");
				$(".shop-select .check-all").removeAttr("data-bl");
				$(".shop-select").find(".price").text("0.00");
				$(".shop-select").find(".count").text("0");
			}
		});

		// 结算与删除 show  or  hide
		function isShow(bl) {

			if (bl) {
				$(".shop-select .edit").show();
				$(".shop-select .complate").hide();
			} else {
				$(".shop-select .edit").hide();
				$(".shop-select .complate").show();
			}
		}

		// checkbox 选择
		$(".shop-select .check-all").on("tap", function () {

			if ($(this).attr("data-bl")) {
				$(this).removeClass("icon-xuanzhongduigou").addClass("icon-checknormal");
				$(this).removeAttr("data-bl");
				select_ck(false);
			} else {
				$(this).removeClass("icon-checknormal").addClass("icon-xuanzhongduigou");
				$(this).attr("data-bl", true);
				select_ck(true);
			}
		});

		//	label-click	
		$(".shop-select .label-click").on("tap", function () {
			$(".shop-select .check-all").trigger("tap");
		});

		// checkbox function
		function select_ck(bl) {

			if (bl) {
				var els = $(".shop-cont input[type=checkbox]");
				els.attr("checked", false);
				els.click();
				els.attr("checked", true);
			} else {
				var els = $(".shop-cont input[type=checkbox]");
				els.click();
				els.attr("checked", false);
			}
		}
	};

	return {
		init: _init
	};
}();
/*es6*/