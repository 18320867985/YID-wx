/*!
 * =====================================================
 * Mui v3.7.0 (http://dev.dcloud.net.cn/mui)
 * =====================================================
 */
/**
 * MUI核心JS
 * @type _L4.$|Function
 */
var mui = (function(document, undefined) {
	var readyRE = /complete|loaded|interactive/;
	var idSelectorRE = /^#([\w-]+)$/;
	var classSelectorRE = /^\.([\w-]+)$/;
	var tagSelectorRE = /^[\w-]+$/;
	var translateRE = /translate(?:3d)?\((.+?)\)/;
	var translateMatrixRE = /matrix(3d)?\((.+?)\)/;

	var $ = function(selector, context) {
		context = context || document;
		if (!selector)
			return wrap();
		if (typeof selector === 'object')
			if ($.isArrayLike(selector)) {
				return wrap($.slice.call(selector), null);
			} else {
				return wrap([selector], null);
			}
		if (typeof selector === 'function')
			return $.ready(selector);
		if (typeof selector === 'string') {
			try {
				selector = selector.trim();
				if (idSelectorRE.test(selector)) {
					var found = document.getElementById(RegExp.$1);
					return wrap(found ? [found] : []);
				}
				return wrap($.qsa(selector, context), selector);
			} catch (e) {}
		}
		return wrap();
	};

	var wrap = function(dom, selector) {
		dom = dom || [];
		Object.setPrototypeOf(dom, $.fn);
		dom.selector = selector || '';
		return dom;
	};

	$.uuid = 0;

	$.data = {};
	/**
	 * extend(simple)
	 * @param {type} target
	 * @param {type} source
	 * @param {type} deep
	 * @returns {unresolved}
	 */
	$.extend = function() { //from jquery2
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		if (typeof target === "boolean") {
			deep = target;

			target = arguments[i] || {};
			i++;
		}

		if (typeof target !== "object" && !$.isFunction(target)) {
			target = {};
		}

		if (i === length) {
			target = this;
			i--;
		}

		for (; i < length; i++) {
			if ((options = arguments[i]) != null) {
				for (name in options) {
					src = target[name];
					copy = options[name];

					if (target === copy) {
						continue;
					}

					if (deep && copy && ($.isPlainObject(copy) || (copyIsArray = $.isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && $.isArray(src) ? src : [];

						} else {
							clone = src && $.isPlainObject(src) ? src : {};
						}

						target[name] = $.extend(deep, clone, copy);

					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		return target;
	};
	/**
	 * mui noop(function)
	 */
	$.noop = function() {};
	/**
	 * mui slice(array)
	 */
	$.slice = [].slice;
	/**
	 * mui filter(array)
	 */
	$.filter = [].filter;

	$.type = function(obj) {
		return obj == null ? String(obj) : class2type[{}.toString.call(obj)] || "object";
	};
	/**
	 * mui isArray
	 */
	$.isArray = Array.isArray ||
		function(object) {
			return object instanceof Array;
		};
	/**
	 * mui isArrayLike 
	 * @param {Object} obj
	 */
	$.isArrayLike = function(obj) {
		var length = !!obj && "length" in obj && obj.length;
		var type = $.type(obj);
		if (type === "function" || $.isWindow(obj)) {
			return false;
		}
		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && (length - 1) in obj;
	};
	/**
	 * mui isWindow(需考虑obj为undefined的情况)
	 */
	$.isWindow = function(obj) {
		return obj != null && obj === obj.window;
	};
	/**
	 * mui isObject
	 */
	$.isObject = function(obj) {
		return $.type(obj) === "object";
	};
	/**
	 * mui isPlainObject
	 */
	$.isPlainObject = function(obj) {
		return $.isObject(obj) && !$.isWindow(obj) && Object.getPrototypeOf(obj) === Object.prototype;
	};
	/**
	 * mui isEmptyObject
	 * @param {Object} o
	 */
	$.isEmptyObject = function(o) {
		for (var p in o) {
			if (p !== undefined) {
				return false;
			}
		}
		return true;
	};
	/**
	 * mui isFunction
	 */
	$.isFunction = function(value) {
		return $.type(value) === "function";
	};
	/**
	 * mui querySelectorAll
	 * @param {type} selector
	 * @param {type} context
	 * @returns {Array}
	 */
	$.qsa = function(selector, context) {
		context = context || document;
		return $.slice.call(classSelectorRE.test(selector) ? context.getElementsByClassName(RegExp.$1) : tagSelectorRE.test(selector) ? context.getElementsByTagName(selector) : context.querySelectorAll(selector));
	};
	/**
	 * ready(DOMContentLoaded)
	 * @param {type} callback
	 * @returns {_L6.$}
	 */
	$.ready = function(callback) {
		if (readyRE.test(document.readyState)) {
			callback($);
		} else {
			document.addEventListener('DOMContentLoaded', function() {
				callback($);
			}, false);
		}
		return this;
	};
	/**
	 * 将 fn 缓存一段时间后, 再被调用执行
	 * 此方法为了避免在 ms 段时间内, 执行 fn 多次. 常用于 resize , scroll , mousemove 等连续性事件中;
	 * 当 ms 设置为 -1, 表示立即执行 fn, 即和直接调用 fn 一样;
	 * 调用返回函数的 stop 停止最后一次的 buffer 效果
	 * @param {Object} fn
	 * @param {Object} ms
	 * @param {Object} context
	 */
	$.buffer = function(fn, ms, context) {
		var timer;
		var lastStart = 0;
		var lastEnd = 0;
		var ms = ms || 150;

		function run() {
			if (timer) {
				timer.cancel();
				timer = 0;
			}
			lastStart = $.now();
			fn.apply(context || this, arguments);
			lastEnd = $.now();
		}

		return $.extend(function() {
			if (
				(!lastStart) || // 从未运行过
				(lastEnd >= lastStart && $.now() - lastEnd > ms) || // 上次运行成功后已经超过ms毫秒
				(lastEnd < lastStart && $.now() - lastStart > ms * 8) // 上次运行或未完成，后8*ms毫秒
			) {
				run.apply(this, arguments);
			} else {
				if (timer) {
					timer.cancel();
				}
				timer = $.later(run, ms, null, $.slice.call(arguments));
			}
		}, {
			stop: function() {
				if (timer) {
					timer.cancel();
					timer = 0;
				}
			}
		});
	};
	/**
	 * each
	 * @param {type} elements
	 * @param {type} callback
	 * @returns {_L8.$}
	 */
	$.each = function(elements, callback, hasOwnProperty) {
		if (!elements) {
			return this;
		}
		if (typeof elements.length === 'number') {
			[].every.call(elements, function(el, idx) {
				return callback.call(el, idx, el) !== false;
			});
		} else {
			for (var key in elements) {
				if (hasOwnProperty) {
					if (elements.hasOwnProperty(key)) {
						if (callback.call(elements[key], key, elements[key]) === false) return elements;
					}
				} else {
					if (callback.call(elements[key], key, elements[key]) === false) return elements;
				}
			}
		}
		return this;
	};
	$.focus = function(element) {
		if ($.os.ios) {
			setTimeout(function() {
				element.focus();
			}, 10);
		} else {
			element.focus();
		}
	};
	/**
	 * trigger event
	 * @param {type} element
	 * @param {type} eventType
	 * @param {type} eventData
	 * @returns {_L8.$}
	 */
	$.trigger = function(element, eventType, eventData) {
		element.dispatchEvent(new CustomEvent(eventType, {
			detail: eventData,
			bubbles: true,
			cancelable: true
		}));
		return this;
	};
	/**
	 * getStyles
	 * @param {type} element
	 * @param {type} property
	 * @returns {styles}
	 */
	$.getStyles = function(element, property) {
		var styles = element.ownerDocument.defaultView.getComputedStyle(element, null);
		if (property) {
			return styles.getPropertyValue(property) || styles[property];
		}
		return styles;
	};
	/**
	 * parseTranslate
	 * @param {type} translateString
	 * @param {type} position
	 * @returns {Object}
	 */
	$.parseTranslate = function(translateString, position) {
		var result = translateString.match(translateRE || '');
		if (!result || !result[1]) {
			result = ['', '0,0,0'];
		}
		result = result[1].split(",");
		result = {
			x: parseFloat(result[0]),
			y: parseFloat(result[1]),
			z: parseFloat(result[2])
		};
		if (position && result.hasOwnProperty(position)) {
			return result[position];
		}
		return result;
	};
	/**
	 * parseTranslateMatrix
	 * @param {type} translateString
	 * @param {type} position
	 * @returns {Object}
	 */
	$.parseTranslateMatrix = function(translateString, position) {
		var matrix = translateString.match(translateMatrixRE);
		var is3D = matrix && matrix[1];
		if (matrix) {
			matrix = matrix[2].split(",");
			if (is3D === "3d")
				matrix = matrix.slice(12, 15);
			else {
				matrix.push(0);
				matrix = matrix.slice(4, 7);
			}
		} else {
			matrix = [0, 0, 0];
		}
		var result = {
			x: parseFloat(matrix[0]),
			y: parseFloat(matrix[1]),
			z: parseFloat(matrix[2])
		};
		if (position && result.hasOwnProperty(position)) {
			return result[position];
		}
		return result;
	};
	$.hooks = {};
	$.addAction = function(type, hook) {
		var hooks = $.hooks[type];
		if (!hooks) {
			hooks = [];
		}
		hook.index = hook.index || 1000;
		hooks.push(hook);
		hooks.sort(function(a, b) {
			return a.index - b.index;
		});
		$.hooks[type] = hooks;
		return $.hooks[type];
	};
	$.doAction = function(type, callback) {
		if ($.isFunction(callback)) { //指定了callback
			$.each($.hooks[type], callback);
		} else { //未指定callback，直接执行
			$.each($.hooks[type], function(index, hook) {
				return !hook.handle();
			});
		}
	};
	/**
	 * setTimeout封装
	 * @param {Object} fn
	 * @param {Object} when
	 * @param {Object} context
	 * @param {Object} data
	 */
	$.later = function(fn, when, context, data) {
		when = when || 0;
		var m = fn;
		var d = data;
		var f;
		var r;

		if (typeof fn === 'string') {
			m = context[fn];
		}

		f = function() {
			m.apply(context, $.isArray(d) ? d : [d]);
		};

		r = setTimeout(f, when);

		return {
			id: r,
			cancel: function() {
				clearTimeout(r);
			}
		};
	};
	$.now = Date.now || function() {
		return +new Date();
	};
	var class2type = {};
	$.each(['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object', 'Error'], function(i, name) {
		class2type["[object " + name + "]"] = name.toLowerCase();
	});
	if (window.JSON) {
		$.parseJSON = JSON.parse;
	}
	/**
	 * $.fn
	 */
	$.fn = {
		each: function(callback) {
			[].every.call(this, function(el, idx) {
				return callback.call(el, idx, el) !== false;
			});
			return this;
		}
	};

	/**
	 * 兼容 AMD 模块
	 **/
	if (typeof define === 'function' && define.amd) {
		define('mui', [], function() {
			return $;
		});
	}

	return $;
})(document);
//window.mui = mui;
//'$' in window || (window.$ = mui);
/**
 * $.os
 * @param {type} $
 * @returns {undefined}
 */
(function($, window) {
	function detect(ua) {
		this.os = {};
		var funcs = [

			function() { //wechat
				var wechat = ua.match(/(MicroMessenger)\/([\d\.]+)/i);
				if (wechat) { //wechat
					this.os.wechat = {
						version: wechat[2].replace(/_/g, '.')
					};
				}
				return false;
			},
			function() { //android
				var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
				if (android) {
					this.os.android = true;
					this.os.version = android[2];

					this.os.isBadAndroid = !(/Chrome\/\d/.test(window.navigator.appVersion));
				}
				return this.os.android === true;
			},
			function() { //ios
				var iphone = ua.match(/(iPhone\sOS)\s([\d_]+)/);
				if (iphone) { //iphone
					this.os.ios = this.os.iphone = true;
					this.os.version = iphone[2].replace(/_/g, '.');
				} else {
					var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
					if (ipad) { //ipad
						this.os.ios = this.os.ipad = true;
						this.os.version = ipad[2].replace(/_/g, '.');
					}
				}
				return this.os.ios === true;
			}
		];
		[].every.call(funcs, function(func) {
			return !func.call($);
		});
	}
	detect.call($, navigator.userAgent);
})(mui, window);
/**
 * $.os.plus
 * @param {type} $
 * @returns {undefined}
 */
(function($, document) {
	function detect(ua) {
		this.os = this.os || {};
		var plus = ua.match(/Html5Plus/i); //TODO 5\+Browser?
		if (plus) {
			this.os.plus = true;
			$(function() {
				document.body.classList.add('mui-plus');
			});
			if (ua.match(/StreamApp/i)) { //TODO 最好有流应用自己的标识
				this.os.stream = true;
				$(function() {
					document.body.classList.add('mui-plus-stream');
				});
			}
		}
	}
	detect.call($, navigator.userAgent);
})(mui, document);
/**
 * 仅提供简单的on，off(仅支持事件委托，不支持当前元素绑定，当前元素绑定请直接使用addEventListener,removeEventListener)
 * @param {Object} $
 */
(function($) {
	if ('ontouchstart' in window) {
		$.isTouchable = true;
		$.EVENT_START = 'touchstart';
		$.EVENT_MOVE = 'touchmove';
		$.EVENT_END = 'touchend';
	} else {
		$.isTouchable = false;
		$.EVENT_START = 'mousedown';
		$.EVENT_MOVE = 'mousemove';
		$.EVENT_END = 'mouseup';
	}
	$.EVENT_CANCEL = 'touchcancel';
	$.EVENT_CLICK = 'click';

	var _mid = 1;
	var delegates = {};
	//需要wrap的函数
	var eventMethods = {
		preventDefault: 'isDefaultPrevented',
		stopImmediatePropagation: 'isImmediatePropagationStopped',
		stopPropagation: 'isPropagationStopped'
	};
	//默认true返回函数
	var returnTrue = function() {
		return true
	};
	//默认false返回函数
	var returnFalse = function() {
		return false
	};
	//wrap浏览器事件
	var compatible = function(event, target) {
		if (!event.detail) {
			event.detail = {
				currentTarget: target
			};
		} else {
			event.detail.currentTarget = target;
		}
		$.each(eventMethods, function(name, predicate) {
			var sourceMethod = event[name];
			event[name] = function() {
				this[predicate] = returnTrue;
				return sourceMethod && sourceMethod.apply(event, arguments)
			}
			event[predicate] = returnFalse;
		}, true);
		return event;
	};
	//简单的wrap对象_mid
	var mid = function(obj) {
		return obj && (obj._mid || (obj._mid = _mid++));
	};
	//事件委托对象绑定的事件回调列表
	var delegateFns = {};
	//返回事件委托的wrap事件回调
	var delegateFn = function(element, event, selector, callback) {
		return function(e) {
			//same event
			var callbackObjs = delegates[element._mid][event];
			var handlerQueue = [];
			var target = e.target;
			var selectorAlls = {};
			for (; target && target !== document; target = target.parentNode) {
				if (target === element) {
					break;
				}
				if (~['click', 'tap', 'doubletap', 'longtap', 'hold'].indexOf(event) && (target.disabled || target.classList.contains('mui-disabled'))) {
					break;
				}
				var matches = {};
				$.each(callbackObjs, function(selector, callbacks) { //same selector
					selectorAlls[selector] || (selectorAlls[selector] = $.qsa(selector, element));
					if (selectorAlls[selector] && ~(selectorAlls[selector]).indexOf(target)) {
						if (!matches[selector]) {
							matches[selector] = callbacks;
						}
					}
				}, true);
				if (!$.isEmptyObject(matches)) {
					handlerQueue.push({
						element: target,
						handlers: matches
					});
				}
			}
			selectorAlls = null;
			e = compatible(e); //compatible event
			$.each(handlerQueue, function(index, handler) {
				target = handler.element;
				var tagName = target.tagName;
				if (event === 'tap' && (tagName !== 'INPUT' && tagName !== 'TEXTAREA' && tagName !== 'SELECT')) {
					e.preventDefault();
					e.detail && e.detail.gesture && e.detail.gesture.preventDefault();
				}
				$.each(handler.handlers, function(index, handler) {
					$.each(handler, function(index, callback) {
						if (callback.call(target, e) === false) {
							e.preventDefault();
							e.stopPropagation();
						}
					}, true);
				}, true)
				if (e.isPropagationStopped()) {
					return false;
				}
			}, true);
		};
	};
	var findDelegateFn = function(element, event) {
		var delegateCallbacks = delegateFns[mid(element)];
		var result = [];
		if (delegateCallbacks) {
			result = [];
			if (event) {
				var filterFn = function(fn) {
					return fn.type === event;
				}
				return delegateCallbacks.filter(filterFn);
			} else {
				result = delegateCallbacks;
			}
		}
		return result;
	};
	var preventDefaultException = /^(INPUT|TEXTAREA|BUTTON|SELECT)$/;
	/**
	 * mui delegate events
	 * @param {type} event
	 * @param {type} selector
	 * @param {type} callback
	 * @returns {undefined}
	 */
	$.fn.on = function(event, selector, callback) { //仅支持简单的事件委托,主要是tap事件使用，类似mouse,focus之类暂不封装支持
		return this.each(function() {
			var element = this;
			mid(element);
			mid(callback);
			var isAddEventListener = false;
			var delegateEvents = delegates[element._mid] || (delegates[element._mid] = {});
			var delegateCallbackObjs = delegateEvents[event] || ((delegateEvents[event] = {}));
			if ($.isEmptyObject(delegateCallbackObjs)) {
				isAddEventListener = true;
			}
			var delegateCallbacks = delegateCallbackObjs[selector] || (delegateCallbackObjs[selector] = []);
			delegateCallbacks.push(callback);
			if (isAddEventListener) {
				var delegateFnArray = delegateFns[mid(element)];
				if (!delegateFnArray) {
					delegateFnArray = [];
				}
				var delegateCallback = delegateFn(element, event, selector, callback);
				delegateFnArray.push(delegateCallback);
				delegateCallback.i = delegateFnArray.length - 1;
				delegateCallback.type = event;
				delegateFns[mid(element)] = delegateFnArray;
				element.addEventListener(event, delegateCallback);
				if (event === 'tap') { //TODO 需要找个更好的解决方案
					element.addEventListener('click', function(e) {
						if (e.target) {
							var tagName = e.target.tagName;
							if (!preventDefaultException.test(tagName)) {
								if (tagName === 'A') {
									var href = e.target.href;
									if (!(href && ~href.indexOf('tel:'))) {
										e.preventDefault();
									}
								} else {
									e.preventDefault();
								}
							}
						}
					});
				}
			}
		});
	};
	$.fn.off = function(event, selector, callback) {
		return this.each(function() {
			var _mid = mid(this);
			if (!event) { //mui(selector).off();
				delegates[_mid] && delete delegates[_mid];
			} else if (!selector) { //mui(selector).off(event);
				delegates[_mid] && delete delegates[_mid][event];
			} else if (!callback) { //mui(selector).off(event,selector);
				delegates[_mid] && delegates[_mid][event] && delete delegates[_mid][event][selector];
			} else { //mui(selector).off(event,selector,callback);
				var delegateCallbacks = delegates[_mid] && delegates[_mid][event] && delegates[_mid][event][selector];
				$.each(delegateCallbacks, function(index, delegateCallback) {
					if (mid(delegateCallback) === mid(callback)) {
						delegateCallbacks.splice(index, 1);
						return false;
					}
				}, true);
			}
			if (delegates[_mid]) {
				//如果off掉了所有当前element的指定的event事件，则remove掉当前element的delegate回调
				if ((!delegates[_mid][event] || $.isEmptyObject(delegates[_mid][event]))) {
					findDelegateFn(this, event).forEach(function(fn) {
						this.removeEventListener(fn.type, fn);
						delete delegateFns[_mid][fn.i];
					}.bind(this));
				}
			} else {
				//如果delegates[_mid]已不存在，删除所有
				findDelegateFn(this).forEach(function(fn) {
					this.removeEventListener(fn.type, fn);
					delete delegateFns[_mid][fn.i];
				}.bind(this));
			}
		});

	};
})(mui);
/**
 * mui target(action>popover>modal>tab>toggle)
 */
(function($, window, document) {
	/**
	 * targets
	 */
	$.targets = {};
	/**
	 * target handles
	 */
	$.targetHandles = [];
	/**
	 * register target
	 * @param {type} target
	 * @returns {$.targets}
	 */
	$.registerTarget = function(target) {

		target.index = target.index || 1000;

		$.targetHandles.push(target);

		$.targetHandles.sort(function(a, b) {
			return a.index - b.index;
		});

		return $.targetHandles;
	};
	window.addEventListener($.EVENT_START, function(event) {
		var target = event.target;
		var founds = {};
		for (; target && target !== document; target = target.parentNode) {
			var isFound = false;
			$.each($.targetHandles, function(index, targetHandle) {
				var name = targetHandle.name;
				if (!isFound && !founds[name] && targetHandle.hasOwnProperty('handle')) {
					$.targets[name] = targetHandle.handle(event, target);
					if ($.targets[name]) {
						founds[name] = true;
						if (targetHandle.isContinue !== true) {
							isFound = true;
						}
					}
				} else {
					if (!founds[name]) {
						if (targetHandle.isReset !== false)
							$.targets[name] = false;
					}
				}
			});
			if (isFound) {
				break;
			}
		}
	});
	window.addEventListener('click', function(event) { //解决touch与click的target不一致的问题(比如链接边缘点击时，touch的target为html，而click的target为A)
		var target = event.target;
		var isFound = false;
		for (; target && target !== document; target = target.parentNode) {
			if (target.tagName === 'A') {
				$.each($.targetHandles, function(index, targetHandle) {
					var name = targetHandle.name;
					if (targetHandle.hasOwnProperty('handle')) {
						if (targetHandle.handle(event, target)) {
							isFound = true;
							event.preventDefault();
							return false;
						}
					}
				});
				if (isFound) {
					break;
				}
			}
		}
	});
})(mui, window, document);
/**
 * fixed trim
 * @param {type} undefined
 * @returns {undefined}
 */
(function(undefined) {
	if (String.prototype.trim === undefined) { // fix for iOS 3.2
		String.prototype.trim = function() {
			return this.replace(/^\s+|\s+$/g, '');
		};
	}
	Object.setPrototypeOf = Object.setPrototypeOf || function(obj, proto) {
		obj['__proto__'] = proto;
		return obj;
	};

})();
/**
 * fixed CustomEvent
 */
(function() {
	if (typeof window.CustomEvent === 'undefined') {
		function CustomEvent(event, params) {
			params = params || {
				bubbles: false,
				cancelable: false,
				detail: undefined
			};
			var evt = document.createEvent('Events');
			var bubbles = true;
			for (var name in params) {
				(name === 'bubbles') ? (bubbles = !!params[name]) : (evt[name] = params[name]);
			}
			evt.initEvent(event, bubbles, true);
			return evt;
		};
		CustomEvent.prototype = window.Event.prototype;
		window.CustomEvent = CustomEvent;
	}
})();
/*
	A shim for non ES5 supporting browsers.
	Adds function bind to Function prototype, so that you can do partial application.
	Works even with the nasty thing, where the first word is the opposite of extranet, the second one is the profession of Columbus, and the version number is 9, flipped 180 degrees.
*/

Function.prototype.bind = Function.prototype.bind || function(to) {
	// Make an array of our arguments, starting from second argument
	var partial = Array.prototype.splice.call(arguments, 1),
		// We'll need the original function.
		fn = this;
	var bound = function() {
			// Join the already applied arguments to the now called ones (after converting to an array again).
			var args = partial.concat(Array.prototype.splice.call(arguments, 0));
			// If not being called as a constructor
			if (!(this instanceof bound)) {
				// return the result of the function called bound to target and partially applied.
				return fn.apply(to, args);
			}
			// If being called as a constructor, apply the function bound to self.
			fn.apply(this, args);
		}
		// Attach the prototype of the function to our newly created function.
	bound.prototype = fn.prototype;
	return bound;
};
/**
 * mui fixed classList
 * @param {type} document
 * @returns {undefined}
 */
(function(document) {
    if (!("classList" in document.documentElement) && Object.defineProperty && typeof HTMLElement !== 'undefined') {

        Object.defineProperty(HTMLElement.prototype, 'classList', {
            get: function() {
                var self = this;
                function update(fn) {
                    return function(value) {
                        var classes = self.className.split(/\s+/),
                                index = classes.indexOf(value);

                        fn(classes, index, value);
                        self.className = classes.join(" ");
                    };
                }

                var ret = {
                    add: update(function(classes, index, value) {
                        ~index || classes.push(value);
                    }),
                    remove: update(function(classes, index) {
                        ~index && classes.splice(index, 1);
                    }),
                    toggle: update(function(classes, index, value) {
                        ~index ? classes.splice(index, 1) : classes.push(value);
                    }),
                    contains: function(value) {
                        return !!~self.className.split(/\s+/).indexOf(value);
                    },
                    item: function(i) {
                        return self.className.split(/\s+/)[i] || null;
                    }
                };

                Object.defineProperty(ret, 'length', {
                    get: function() {
                        return self.className.split(/\s+/).length;
                    }
                });

                return ret;
            }
        });
    }
})(document);

/**
 * mui fixed requestAnimationFrame
 * @param {type} window
 * @returns {undefined}
 */
(function(window) {
	if (!window.requestAnimationFrame) {
		var lastTime = 0;
		window.requestAnimationFrame = window.webkitRequestAnimationFrame || function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
			var id = window.setTimeout(function() {
				callback(currTime + timeToCall);
			}, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
		window.cancelAnimationFrame = window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || function(id) {
			clearTimeout(id);
		};
	};
}(window));
/**
 * fastclick(only for radio,checkbox)
 */
(function($, window, name) {
	if (!$.os.android && !$.os.ios) { //目前仅识别android和ios
		return;
	}
	if (window.FastClick) {
		return;
	}

	var handle = function(event, target) {
		if (target.tagName === 'LABEL') {
			if (target.parentNode) {
				target = target.parentNode.querySelector('input');
			}
		}
		if (target && (target.type === 'radio' || target.type === 'checkbox')) {
			if (!target.disabled) { //disabled
				return target;
			}
		}
		return false;
	};

	$.registerTarget({
		name: name,
		index: 40,
		handle: handle,
		target: false
	});
	var dispatchEvent = function(event) {
		var targetElement = $.targets.click;
		if (targetElement) {
			var clickEvent, touch;
			// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect
			if (document.activeElement && document.activeElement !== targetElement) {
				document.activeElement.blur();
			}
			touch = event.detail.gesture.changedTouches[0];
			// Synthesise a click event, with an extra attribute so it can be tracked
			clickEvent = document.createEvent('MouseEvents');
			clickEvent.initMouseEvent('click', true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
			clickEvent.forwardedTouchEvent = true;
			targetElement.dispatchEvent(clickEvent);
			event.detail && event.detail.gesture.preventDefault();
		}
	};
	window.addEventListener('tap', dispatchEvent);
	window.addEventListener('doubletap', dispatchEvent);
	//捕获
	window.addEventListener('click', function(event) {
		if ($.targets.click) {
			if (!event.forwardedTouchEvent) { //stop click
				if (event.stopImmediatePropagation) {
					event.stopImmediatePropagation();
				} else {
					// Part of the hack for browsers that don't support Event#stopImmediatePropagation
					event.propagationStopped = true;
				}
				event.stopPropagation();
				event.preventDefault();
				return false;
			}
		}
	}, true);

})(mui, window, 'click');
(function($, document) {
	$(function() {
		if (!$.os.ios) {
			return;
		}
		var CLASS_FOCUSIN = 'mui-focusin';
		var CLASS_BAR_TAB = 'mui-bar-tab';
		var CLASS_BAR_FOOTER = 'mui-bar-footer';
		var CLASS_BAR_FOOTER_SECONDARY = 'mui-bar-footer-secondary';
		var CLASS_BAR_FOOTER_SECONDARY_TAB = 'mui-bar-footer-secondary-tab';
		// var content = document.querySelector('.' + CLASS_CONTENT);
		// if (content) {
		// 	document.body.insertBefore(content, document.body.firstElementChild);
		// }
		document.addEventListener('focusin', function(e) {
			if ($.os.plus) { //在父webview里边不fix
				if (window.plus) {
					if (plus.webview.currentWebview().children().length > 0) {
						return;
					}
				}
			}
			var target = e.target;
			//TODO 需考虑所有键盘弹起的情况
			if (target.tagName && (target.tagName === 'TEXTAREA' || (target.tagName === 'INPUT' && (target.type === 'text' || target.type === 'search' || target.type === 'number')))) {
				if (target.disabled || target.readOnly) {
					return;
				}
				document.body.classList.add(CLASS_FOCUSIN);
				var isFooter = false;
				for (; target && target !== document; target = target.parentNode) {
					var classList = target.classList;
					if (classList && classList.contains(CLASS_BAR_TAB) || classList.contains(CLASS_BAR_FOOTER) || classList.contains(CLASS_BAR_FOOTER_SECONDARY) || classList.contains(CLASS_BAR_FOOTER_SECONDARY_TAB)) {
						isFooter = true;
						break;
					}
				}
				if (isFooter) {
					var scrollTop = document.body.scrollHeight;
					var scrollLeft = document.body.scrollLeft;
					setTimeout(function() {
						window.scrollTo(scrollLeft, scrollTop);
					}, 20);
				}
			}
		});
		document.addEventListener('focusout', function(e) {
			var classList = document.body.classList;
			if (classList.contains(CLASS_FOCUSIN)) {
				classList.remove(CLASS_FOCUSIN);
				setTimeout(function() {
					window.scrollTo(document.body.scrollLeft, document.body.scrollTop);
				}, 20);
			}
		});
	});
})(mui, document);
/**
 * mui namespace(optimization)
 * @param {type} $
 * @returns {undefined}
 */
(function($) {
	$.namespace = 'mui';
	$.classNamePrefix = $.namespace + '-';
	$.classSelectorPrefix = '.' + $.classNamePrefix;
	/**
	 * 返回正确的className
	 * @param {type} className
	 * @returns {String}
	 */
	$.className = function(className) {
		return $.classNamePrefix + className;
	};
	/**
	 * 返回正确的classSelector
	 * @param {type} classSelector
	 * @returns {String}
	 */
	$.classSelector = function(classSelector) {
		return classSelector.replace(/\./g, $.classSelectorPrefix);
	};
	/**
         * 返回正确的eventName
         * @param {type} event
         * @param {type} module
         * @returns {String}
         */
	$.eventName = function(event, module) {
		return event + ($.namespace ? ('.' + $.namespace) : '') + ( module ? ('.' + module) : '');
	};
})(mui);

/**
 * mui gestures
 * @param {type} $
 * @param {type} window
 * @returns {undefined}
 */
(function($, window) {
	$.gestures = {
		session: {}
	};
	/**
	 * Gesture preventDefault
	 * @param {type} e
	 * @returns {undefined}
	 */
	$.preventDefault = function(e) {
		e.preventDefault();
	};
	/**
	 * Gesture stopPropagation
	 * @param {type} e
	 * @returns {undefined}
	 */
	$.stopPropagation = function(e) {
		e.stopPropagation();
	};

	/**
	 * register gesture
	 * @param {type} gesture
	 * @returns {$.gestures}
	 */
	$.addGesture = function(gesture) {
		return $.addAction('gestures', gesture);

	};

	var round = Math.round;
	var abs = Math.abs;
	var sqrt = Math.sqrt;
	var atan = Math.atan;
	var atan2 = Math.atan2;
	/**
	 * distance
	 * @param {type} p1
	 * @param {type} p2
	 * @returns {Number}
	 */
	var getDistance = function(p1, p2, props) {
		if (!props) {
			props = ['x', 'y'];
		}
		var x = p2[props[0]] - p1[props[0]];
		var y = p2[props[1]] - p1[props[1]];
		return sqrt((x * x) + (y * y));
	};
	/**
	 * scale
	 * @param {Object} starts
	 * @param {Object} moves
	 */
	var getScale = function(starts, moves) {
		if (starts.length >= 2 && moves.length >= 2) {
			var props = ['pageX', 'pageY'];
			return getDistance(moves[1], moves[0], props) / getDistance(starts[1], starts[0], props);
		}
		return 1;
	};
	/**
	 * angle
	 * @param {type} p1
	 * @param {type} p2
	 * @returns {Number}
	 */
	var getAngle = function(p1, p2, props) {
		if (!props) {
			props = ['x', 'y'];
		}
		var x = p2[props[0]] - p1[props[0]];
		var y = p2[props[1]] - p1[props[1]];
		return atan2(y, x) * 180 / Math.PI;
	};
	/**
	 * direction
	 * @param {Object} x
	 * @param {Object} y
	 */
	var getDirection = function(x, y) {
		if (x === y) {
			return '';
		}
		if (abs(x) >= abs(y)) {
			return x > 0 ? 'left' : 'right';
		}
		return y > 0 ? 'up' : 'down';
	};
	/**
	 * rotation
	 * @param {Object} start
	 * @param {Object} end
	 */
	var getRotation = function(start, end) {
		var props = ['pageX', 'pageY'];
		return getAngle(end[1], end[0], props) - getAngle(start[1], start[0], props);
	};
	/**
	 * px per ms
	 * @param {Object} deltaTime
	 * @param {Object} x
	 * @param {Object} y
	 */
	var getVelocity = function(deltaTime, x, y) {
		return {
			x: x / deltaTime || 0,
			y: y / deltaTime || 0
		};
	};
	/**
	 * detect gestures
	 * @param {type} event
	 * @param {type} touch
	 * @returns {undefined}
	 */
	var detect = function(event, touch) {
		if ($.gestures.stoped) {
			return;
		}
		$.doAction('gestures', function(index, gesture) {
			if (!$.gestures.stoped) {
				if ($.options.gestureConfig[gesture.name] !== false) {
					gesture.handle(event, touch);
				}
			}
		});
	};
	/**
	 * 暂时无用
	 * @param {Object} node
	 * @param {Object} parent
	 */
	var hasParent = function(node, parent) {
		while (node) {
			if (node == parent) {
				return true;
			}
			node = node.parentNode;
		}
		return false;
	};

	var uniqueArray = function(src, key, sort) {
		var results = [];
		var values = [];
		var i = 0;

		while (i < src.length) {
			var val = key ? src[i][key] : src[i];
			if (values.indexOf(val) < 0) {
				results.push(src[i]);
			}
			values[i] = val;
			i++;
		}

		if (sort) {
			if (!key) {
				results = results.sort();
			} else {
				results = results.sort(function sortUniqueArray(a, b) {
					return a[key] > b[key];
				});
			}
		}

		return results;
	};
	var getMultiCenter = function(touches) {
		var touchesLength = touches.length;
		if (touchesLength === 1) {
			return {
				x: round(touches[0].pageX),
				y: round(touches[0].pageY)
			};
		}

		var x = 0;
		var y = 0;
		var i = 0;
		while (i < touchesLength) {
			x += touches[i].pageX;
			y += touches[i].pageY;
			i++;
		}

		return {
			x: round(x / touchesLength),
			y: round(y / touchesLength)
		};
	};
	var multiTouch = function() {
		return $.options.gestureConfig.pinch;
	};
	var copySimpleTouchData = function(touch) {
		var touches = [];
		var i = 0;
		while (i < touch.touches.length) {
			touches[i] = {
				pageX: round(touch.touches[i].pageX),
				pageY: round(touch.touches[i].pageY)
			};
			i++;
		}
		return {
			timestamp: $.now(),
			gesture: touch.gesture,
			touches: touches,
			center: getMultiCenter(touch.touches),
			deltaX: touch.deltaX,
			deltaY: touch.deltaY
		};
	};

	var calDelta = function(touch) {
		var session = $.gestures.session;
		var center = touch.center;
		var offset = session.offsetDelta || {};
		var prevDelta = session.prevDelta || {};
		var prevTouch = session.prevTouch || {};

		if (touch.gesture.type === $.EVENT_START || touch.gesture.type === $.EVENT_END) {
			prevDelta = session.prevDelta = {
				x: prevTouch.deltaX || 0,
				y: prevTouch.deltaY || 0
			};

			offset = session.offsetDelta = {
				x: center.x,
				y: center.y
			};
		}
		touch.deltaX = prevDelta.x + (center.x - offset.x);
		touch.deltaY = prevDelta.y + (center.y - offset.y);
	};
	var calTouchData = function(touch) {
		var session = $.gestures.session;
		var touches = touch.touches;
		var touchesLength = touches.length;

		if (!session.firstTouch) {
			session.firstTouch = copySimpleTouchData(touch);
		}

		if (multiTouch() && touchesLength > 1 && !session.firstMultiTouch) {
			session.firstMultiTouch = copySimpleTouchData(touch);
		} else if (touchesLength === 1) {
			session.firstMultiTouch = false;
		}

		var firstTouch = session.firstTouch;
		var firstMultiTouch = session.firstMultiTouch;
		var offsetCenter = firstMultiTouch ? firstMultiTouch.center : firstTouch.center;

		var center = touch.center = getMultiCenter(touches);
		touch.timestamp = $.now();
		touch.deltaTime = touch.timestamp - firstTouch.timestamp;

		touch.angle = getAngle(offsetCenter, center);
		touch.distance = getDistance(offsetCenter, center);

		calDelta(touch);

		touch.offsetDirection = getDirection(touch.deltaX, touch.deltaY);

		touch.scale = firstMultiTouch ? getScale(firstMultiTouch.touches, touches) : 1;
		touch.rotation = firstMultiTouch ? getRotation(firstMultiTouch.touches, touches) : 0;

		calIntervalTouchData(touch);

	};
	var CAL_INTERVAL = 25;
	var calIntervalTouchData = function(touch) {
		var session = $.gestures.session;
		var last = session.lastInterval || touch;
		var deltaTime = touch.timestamp - last.timestamp;
		var velocity;
		var velocityX;
		var velocityY;
		var direction;

		if (touch.gesture.type != $.EVENT_CANCEL && (deltaTime > CAL_INTERVAL || last.velocity === undefined)) {
			var deltaX = last.deltaX - touch.deltaX;
			var deltaY = last.deltaY - touch.deltaY;

			var v = getVelocity(deltaTime, deltaX, deltaY);
			velocityX = v.x;
			velocityY = v.y;
			velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
			direction = getDirection(deltaX, deltaY) || last.direction;

			session.lastInterval = touch;
		} else {
			velocity = last.velocity;
			velocityX = last.velocityX;
			velocityY = last.velocityY;
			direction = last.direction;
		}

		touch.velocity = velocity;
		touch.velocityX = velocityX;
		touch.velocityY = velocityY;
		touch.direction = direction;
	};
	var targetIds = {};
	var convertTouches = function(touches) {
		for (var i = 0; i < touches.length; i++) {
			!touches['identifier'] && (touches['identifier'] = 0);
		}
		return touches;
	};
	var getTouches = function(event, touch) {
		var allTouches = convertTouches($.slice.call(event.touches || [event]));

		var type = event.type;

		var targetTouches = [];
		var changedTargetTouches = [];

		//当touchstart或touchmove且touches长度为1，直接获得all和changed
		if ((type === $.EVENT_START || type === $.EVENT_MOVE) && allTouches.length === 1) {
			targetIds[allTouches[0].identifier] = true;
			targetTouches = allTouches;
			changedTargetTouches = allTouches;
			touch.target = event.target;
		} else {
			var i = 0;
			var targetTouches = [];
			var changedTargetTouches = [];
			var changedTouches = convertTouches($.slice.call(event.changedTouches || [event]));

			touch.target = event.target;
			var sessionTarget = $.gestures.session.target || event.target;
			targetTouches = allTouches.filter(function(touch) {
				return hasParent(touch.target, sessionTarget);
			});

			if (type === $.EVENT_START) {
				i = 0;
				while (i < targetTouches.length) {
					targetIds[targetTouches[i].identifier] = true;
					i++;
				}
			}

			i = 0;
			while (i < changedTouches.length) {
				if (targetIds[changedTouches[i].identifier]) {
					changedTargetTouches.push(changedTouches[i]);
				}
				if (type === $.EVENT_END || type === $.EVENT_CANCEL) {
					delete targetIds[changedTouches[i].identifier];
				}
				i++;
			}

			if (!changedTargetTouches.length) {
				return false;
			}
		}
		targetTouches = uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true);
		var touchesLength = targetTouches.length;
		var changedTouchesLength = changedTargetTouches.length;
		if (type === $.EVENT_START && touchesLength - changedTouchesLength === 0) { //first
			touch.isFirst = true;
			$.gestures.touch = $.gestures.session = {
				target: event.target
			};
		}
		touch.isFinal = ((type === $.EVENT_END || type === $.EVENT_CANCEL) && (touchesLength - changedTouchesLength === 0));

		touch.touches = targetTouches;
		touch.changedTouches = changedTargetTouches;
		return true;

	};
	var handleTouchEvent = function(event) {
		var touch = {
			gesture: event
		};
		var touches = getTouches(event, touch);
		if (!touches) {
			return;
		}
		calTouchData(touch);
		detect(event, touch);
		$.gestures.session.prevTouch = touch;
		if (event.type === $.EVENT_END && !$.isTouchable) {
			$.gestures.touch = $.gestures.session = {};
		}
	};
	window.addEventListener($.EVENT_START, handleTouchEvent);
	window.addEventListener($.EVENT_MOVE, handleTouchEvent);
	window.addEventListener($.EVENT_END, handleTouchEvent);
	window.addEventListener($.EVENT_CANCEL, handleTouchEvent);
	//fixed hashchange(android)
	window.addEventListener($.EVENT_CLICK, function(e) {
		//TODO 应该判断当前target是不是在targets.popover内部，而不是非要相等
		if (($.os.android || $.os.ios) && (($.targets.popover && e.target === $.targets.popover) || ($.targets.tab) || $.targets.offcanvas || $.targets.modal)) {
			e.preventDefault();
		}
	}, true);


	//增加原生滚动识别
	$.isScrolling = false;
	var scrollingTimeout = null;
	window.addEventListener('scroll', function() {
		$.isScrolling = true;
		scrollingTimeout && clearTimeout(scrollingTimeout);
		scrollingTimeout = setTimeout(function() {
			$.isScrolling = false;
		}, 250);
	});
})(mui, window);
/**
 * mui gesture flick[left|right|up|down]
 * @param {type} $
 * @param {type} name
 * @returns {undefined}
 */
(function($, name) {
	var flickStartTime = 0;
	var handle = function(event, touch) {
		var session = $.gestures.session;
		var options = this.options;
		var now = $.now();
		switch (event.type) {
			case $.EVENT_MOVE:
				if (now - flickStartTime > 300) {
					flickStartTime = now;
					session.flickStart = touch.center;
				}
				break;
			case $.EVENT_END:
			case $.EVENT_CANCEL:
				touch.flick = false;
				if (session.flickStart && options.flickMaxTime > (now - flickStartTime) && touch.distance > options.flickMinDistince) {
					touch.flick = true;
					touch.flickTime = now - flickStartTime;
					touch.flickDistanceX = touch.center.x - session.flickStart.x;
					touch.flickDistanceY = touch.center.y - session.flickStart.y;
					$.trigger(session.target, name, touch);
					$.trigger(session.target, name + touch.direction, touch);
				}
				break;
		}

	};
	/**
	 * mui gesture flick
	 */
	$.addGesture({
		name: name,
		index: 5,
		handle: handle,
		options: {
			flickMaxTime: 200,
			flickMinDistince: 10
		}
	});
})(mui, 'flick');
/**
 * mui gesture swipe[left|right|up|down]
 * @param {type} $
 * @param {type} name
 * @returns {undefined}
 */
(function($, name) {
	var handle = function(event, touch) {
		var session = $.gestures.session;
		if (event.type === $.EVENT_END || event.type === $.EVENT_CANCEL) {
			var options = this.options;
			touch.swipe = false;
			//TODO 后续根据velocity计算
			if (touch.direction && options.swipeMaxTime > touch.deltaTime && touch.distance > options.swipeMinDistince) {
				touch.swipe = true;
				$.trigger(session.target, name, touch);
				$.trigger(session.target, name + touch.direction, touch);
			}
		}
	};
	/**
	 * mui gesture swipe
	 */
	$.addGesture({
		name: name,
		index: 10,
		handle: handle,
		options: {
			swipeMaxTime: 300,
			swipeMinDistince: 18
		}
	});
})(mui, 'swipe');
/**
 * mui gesture drag[start|left|right|up|down|end]
 * @param {type} $
 * @param {type} name
 * @returns {undefined}
 */
(function($, name) {
	var handle = function(event, touch) {
		var session = $.gestures.session;
		switch (event.type) {
			case $.EVENT_START:
				break;
			case $.EVENT_MOVE:
				if (!touch.direction || !session.target) {
					return;
				}
				//修正direction,可在session期间自行锁定拖拽方向，方便开发scroll类不同方向拖拽插件嵌套
				if (session.lockDirection && session.startDirection) {
					if (session.startDirection && session.startDirection !== touch.direction) {
						if (session.startDirection === 'up' || session.startDirection === 'down') {
							touch.direction = touch.deltaY < 0 ? 'up' : 'down';
						} else {
							touch.direction = touch.deltaX < 0 ? 'left' : 'right';
						}
					}
				}

				if (!session.drag) {
					session.drag = true;
					$.trigger(session.target, name + 'start', touch);
				}
				$.trigger(session.target, name, touch);
				$.trigger(session.target, name + touch.direction, touch);
				break;
			case $.EVENT_END:
			case $.EVENT_CANCEL:
				if (session.drag && touch.isFinal) {
					$.trigger(session.target, name + 'end', touch);
				}
				break;
		}
	};
	/**
	 * mui gesture drag
	 */
	$.addGesture({
		name: name,
		index: 20,
		handle: handle,
		options: {
			fingers: 1
		}
	});
})(mui, 'drag');
/**
 * mui gesture tap and doubleTap
 * @param {type} $
 * @param {type} name
 * @returns {undefined}
 */
(function($, name) {
	var lastTarget;
	var lastTapTime;
	var handle = function(event, touch) {
		var session = $.gestures.session;
		var options = this.options;
		switch (event.type) {
			case $.EVENT_END:
				if (!touch.isFinal) {
					return;
				}
				var target = session.target;
				if (!target || (target.disabled || (target.classList && target.classList.contains('mui-disabled')))) {
					return;
				}
				if (touch.distance < options.tapMaxDistance && touch.deltaTime < options.tapMaxTime) {
					if ($.options.gestureConfig.doubletap && lastTarget && (lastTarget === target)) { //same target
						if (lastTapTime && (touch.timestamp - lastTapTime) < options.tapMaxInterval) {
							$.trigger(target, 'doubletap', touch);
							lastTapTime = $.now();
							lastTarget = target;
							return;
						}
					}
					$.trigger(target, name, touch);
					lastTapTime = $.now();
					lastTarget = target;
				}
				break;
		}
	};
	/**
	 * mui gesture tap
	 */
	$.addGesture({
		name: name,
		index: 30,
		handle: handle,
		options: {
			fingers: 1,
			tapMaxInterval: 300,
			tapMaxDistance: 5,
			tapMaxTime: 250
		}
	});
})(mui, 'tap');
/**
 * mui gesture longtap
 * @param {type} $
 * @param {type} name
 * @returns {undefined}
 */
(function($, name) {
	var timer;
	var handle = function(event, touch) {
		var session = $.gestures.session;
		var options = this.options;
		switch (event.type) {
			case $.EVENT_START:
				clearTimeout(timer);
				timer = setTimeout(function() {
					$.trigger(session.target, name, touch);
				}, options.holdTimeout);
				break;
			case $.EVENT_MOVE:
				if (touch.distance > options.holdThreshold) {
					clearTimeout(timer);
				}
				break;
			case $.EVENT_END:
			case $.EVENT_CANCEL:
				clearTimeout(timer);
				break;
		}
	};
	/**
	 * mui gesture longtap
	 */
	$.addGesture({
		name: name,
		index: 10,
		handle: handle,
		options: {
			fingers: 1,
			holdTimeout: 500,
			holdThreshold: 2
		}
	});
})(mui, 'longtap');
/**
 * mui gesture hold
 * @param {type} $
 * @param {type} name
 * @returns {undefined}
 */
(function($, name) {
	var timer;
	var handle = function(event, touch) {
		var session = $.gestures.session;
		var options = this.options;
		switch (event.type) {
			case $.EVENT_START:
				if ($.options.gestureConfig.hold) {
					timer && clearTimeout(timer);
					timer = setTimeout(function() {
						touch.hold = true;
						$.trigger(session.target, name, touch);
					}, options.holdTimeout);
				}
				break;
			case $.EVENT_MOVE:
				break;
			case $.EVENT_END:
			case $.EVENT_CANCEL:
				if (timer) {
					clearTimeout(timer) && (timer = null);
					$.trigger(session.target, 'release', touch);
				}
				break;
		}
	};
	/**
	 * mui gesture hold
	 */
	$.addGesture({
		name: name,
		index: 10,
		handle: handle,
		options: {
			fingers: 1,
			holdTimeout: 0
		}
	});
})(mui, 'hold');
/**
 * mui gesture pinch
 * @param {type} $
 * @param {type} name
 * @returns {undefined}
 */
(function($, name) {
	var handle = function(event, touch) {
		var options = this.options;
		var session = $.gestures.session;
		switch (event.type) {
			case $.EVENT_START:
				break;
			case $.EVENT_MOVE:
				if ($.options.gestureConfig.pinch) {
					if (touch.touches.length < 2) {
						return;
					}
					if (!session.pinch) { //start
						session.pinch = true;
						$.trigger(session.target, name + 'start', touch);
					}
					$.trigger(session.target, name, touch);
					var scale = touch.scale;
					var rotation = touch.rotation;
					var lastScale = typeof touch.lastScale === 'undefined' ? 1 : touch.lastScale;
					var scaleDiff = 0.000000000001; //防止scale与lastScale相等，不触发事件的情况。
					if (scale > lastScale) { //out
						lastScale = scale - scaleDiff;
						$.trigger(session.target, name + 'out', touch);
					} //in
					else if (scale < lastScale) {
						lastScale = scale + scaleDiff;
						$.trigger(session.target, name + 'in', touch);
					}
					if (Math.abs(rotation) > options.minRotationAngle) {
						$.trigger(session.target, 'rotate', touch);
					}
				}
				break;
			case $.EVENT_END:
			case $.EVENT_CANCEL:
				if ($.options.gestureConfig.pinch && session.pinch && touch.touches.length === 2) {
					session.pinch = false;
					$.trigger(session.target, name + 'end', touch);
				}
				break;
		}
	};
	/**
	 * mui gesture pinch
	 */
	$.addGesture({
		name: name,
		index: 10,
		handle: handle,
		options: {
			minRotationAngle: 0
		}
	});
})(mui, 'pinch');
/**
 * mui.init
 * @param {type} $
 * @returns {undefined}
 */
(function($) {
	$.global = $.options = {
		gestureConfig: {
			tap: true,
			doubletap: false,
			longtap: false,
			hold: false,
			flick: true,
			swipe: true,
			drag: true,
			pinch: false
		}
	};
	/**
	 *
	 * @param {type} options
	 * @returns {undefined}
	 */
	$.initGlobal = function(options) {
		$.options = $.extend(true, $.global, options);
		return this;
	};
	var inits = {};

	/**
	 * 单页配置 初始化
	 * @param {object} options
	 */
	$.init = function(options) {
		$.options = $.extend(true, $.global, options || {});
		$.ready(function() {
			$.doAction('inits', function(index, init) {
				var isInit = !!(!inits[init.name] || init.repeat);
				if (isInit) {
					init.handle.call($);
					inits[init.name] = true;
				}
			});
		});
		return this;
	};

	/**
	 * 增加初始化执行流程
	 * @param {function} init
	 */
	$.addInit = function(init) {
		return $.addAction('inits', init);
	};
	/**
	 * 处理html5版本subpages 
	 */
	$.addInit({
		name: 'iframe',
		index: 100,
		handle: function() {
			var options = $.options;
			var subpages = options.subpages || [];
			if (!$.os.plus && subpages.length) {
				//暂时只处理单个subpage。后续可以考虑支持多个subpage
				createIframe(subpages[0]);
			}
		}
	});
	var createIframe = function(options) {
		var wrapper = document.createElement('div');
		wrapper.className = 'mui-iframe-wrapper';
		var styles = options.styles || {};
		if (typeof styles.top !== 'string') {
			styles.top = '0px';
		}
		if (typeof styles.bottom !== 'string') {
			styles.bottom = '0px';
		}
		wrapper.style.top = styles.top;
		wrapper.style.bottom = styles.bottom;
		var iframe = document.createElement('iframe');
		iframe.src = options.url;
		iframe.id = options.id || options.url;
		iframe.name = iframe.id;
		wrapper.appendChild(iframe);
		document.body.appendChild(wrapper);
		//目前仅处理微信
		$.os.wechat && handleScroll(wrapper, iframe);
	};

	function handleScroll(wrapper, iframe) {
		var key = 'MUI_SCROLL_POSITION_' + document.location.href + '_' + iframe.src;
		var scrollTop = (parseFloat(localStorage.getItem(key)) || 0);
		if (scrollTop) {
			(function(y) {
				iframe.onload = function() {
					window.scrollTo(0, y);
				};
			})(scrollTop);
		}
		setInterval(function() {
			var _scrollTop = window.scrollY;
			if (scrollTop !== _scrollTop) {
				localStorage.setItem(key, _scrollTop + '');
				scrollTop = _scrollTop;
			}
		}, 100);
	};
	$(function() {
		var classList = document.body.classList;
		var os = [];
		if ($.os.ios) {
			os.push({
				os: 'ios',
				version: $.os.version
			});
			classList.add('mui-ios');
		} else if ($.os.android) {
			os.push({
				os: 'android',
				version: $.os.version
			});
			classList.add('mui-android');
		}
		if ($.os.wechat) {
			os.push({
				os: 'wechat',
				version: $.os.wechat.version
			});
			classList.add('mui-wechat');
		}
		if (os.length) {
			$.each(os, function(index, osObj) {
				var version = '';
				var classArray = [];
				if (osObj.version) {
					$.each(osObj.version.split('.'), function(i, v) {
						version = version + (version ? '-' : '') + v;
						classList.add($.className(osObj.os + '-' + version));
					});
				}
			});
		}
	});
})(mui);
/**
 * mui.init 5+
 * @param {type} $
 * @returns {undefined}
 */
(function($) {
	var defaultOptions = {
		swipeBack: false,
		preloadPages: [], //5+ lazyLoad webview
		preloadLimit: 10, //预加载窗口的数量限制(一旦超出，先进先出)
		keyEventBind: {
			backbutton: true,
			menubutton: true
		},
		titleConfig: {
			height: "44px",
			backgroundColor: "#f7f7f7", //导航栏背景色
			bottomBorderColor: "#cccccc", //底部边线颜色
			title: { //标题配置
				text: "", //标题文字
				position: {
					top: 0,
					left: 0,
					width: "100%",
					height: "100%"
				},
				styles: {
					color: "#000000",
					align: "center",
					family: "'Helvetica Neue',Helvetica,sans-serif",
					size: "17px",
					style: "normal",
					weight: "normal",
					fontSrc: ""
				}
			},
			back: {
				image: {
					base64Data: '',
					imgSrc: '',
					sprite: {
						top: '0px',
						left: '0px',
						width: '100%',
						height: '100%'
					},
					position: {
						top: "10px",
						left: "10px",
						width: "24px",
						height: "24px"
					}
				}
			}
		}
	};

	//默认页面动画
	var defaultShow = {
		event:"titleUpdate",
		autoShow: true,
		duration: 300,
		aniShow: 'slide-in-right',
		extras:{}
	};
	//若执行了显示动画初始化操作，则要覆盖默认配置
	if($.options.show) {
		defaultShow = $.extend(true, defaultShow, $.options.show);
	}

	$.currentWebview = null;

	$.extend(true, $.global, defaultOptions);
	$.extend(true, $.options, defaultOptions);
	/**
	 * 等待动画配置
	 * @param {type} options
	 * @returns {Object}
	 */
	$.waitingOptions = function(options) {
		return $.extend(true, {}, {
			autoShow: true,
			title: '',
			modal: false
		}, options);
	};
	/**
	 * 窗口显示配置
	 * @param {type} options
	 * @returns {Object}
	 */
	$.showOptions = function(options) {
		return $.extend(true, {}, defaultShow, options);
	};
	/**
	 * 窗口默认配置
	 * @param {type} options
	 * @returns {Object}
	 */
	$.windowOptions = function(options) {
		return $.extend({
			scalable: false,
			bounce: "" //vertical
		}, options);
	};
	/**
	 * plusReady
	 * @param {type} callback
	 * @returns {_L6.$}
	 */
	$.plusReady = function(callback) {
		if(window.plus) {
			setTimeout(function() { //解决callback与plusready事件的执行时机问题(典型案例:showWaiting,closeWaiting)
				callback();
			}, 0);
		} else {
			document.addEventListener("plusready", function() {
				callback();
			}, false);
		}
		return this;
	};
	/**
	 * 5+ event(5+没提供之前我自己实现)
	 * @param {type} webview
	 * @param {type} eventType
	 * @param {type} data
	 * @returns {undefined}
	 */
	$.fire = function(webview, eventType, data) {
		if(webview) {
			if(typeof data === 'undefined') {
				data = '';
			} else if(typeof data === 'boolean' || typeof data === 'number') {
				webview.evalJS("typeof mui!=='undefined'&&mui.receive('" + eventType + "'," + data + ")");
				return;
			} else if($.isPlainObject(data) || $.isArray(data)) {
				data = JSON.stringify(data || {}).replace(/\'/g, "\\u0027").replace(/\\/g, "\\u005c");
			}
			webview.evalJS("typeof mui!=='undefined'&&mui.receive('" + eventType + "','" + data + "')");
		}
	};
	/**
	 * 5+ event(5+没提供之前我自己实现)
	 * @param {type} eventType
	 * @param {type} data
	 * @returns {undefined}
	 */
	$.receive = function(eventType, data) {
		if(eventType) {
			try {
				if(data && typeof data === 'string') {
					data = JSON.parse(data);
				}
			} catch(e) {}
			$.trigger(document, eventType, data);
		}
	};
	var triggerPreload = function(webview) {
		if(!webview.preloaded) { //保证仅触发一次
			$.fire(webview, 'preload');
			var list = webview.children();
			for(var i = 0; i < list.length; i++) {
				$.fire(list[i], 'preload');
			}
			webview.preloaded = true;
		}
	};
	var trigger = function(webview, eventType, timeChecked) {
		if(timeChecked) {
			if(!webview[eventType + 'ed']) {
				$.fire(webview, eventType);
				var list = webview.children();
				for(var i = 0; i < list.length; i++) {
					$.fire(list[i], eventType);
				}
				webview[eventType + 'ed'] = true;
			}
		} else {
			$.fire(webview, eventType);
			var list = webview.children();
			for(var i = 0; i < list.length; i++) {
				$.fire(list[i], eventType);
			}
		}

	};
	/**
	 * 打开新窗口
	 * @param {string} url 要打开的页面地址
	 * @param {string} id 指定页面ID
	 * @param {object} options 可选:参数,等待,窗口,显示配置{params:{},waiting:{},styles:{},show:{}}
	 */
	$.openWindow = function(url, id, options) {
		if(typeof url === 'object') {
			options = url;
			url = options.url;
			id = options.id || url;
		} else {
			if(typeof id === 'object') {
				options = id;
				id = options.id || url;
			} else {
				id = id || url;
			}
		}
		if(!$.os.plus) {
			//TODO 先临时这么处理：手机上顶层跳，PC上parent跳
			if($.os.ios || $.os.android) {
				window.top.location.href = url;
			} else {
				window.parent.location.href = url;
			}
			return;
		}
		if(!window.plus) {
			return;
		}

		options = options || {};
		var params = options.params || {};
		var webview = null,
			webviewCache = null,
			nShow, nWaiting;

		if($.webviews[id]) {
			webviewCache = $.webviews[id];
			//webview真实存在，才能获取
			if(plus.webview.getWebviewById(id)) {
				webview = webviewCache.webview;
			}
		} else if(options.createNew !== true) {
			webview = plus.webview.getWebviewById(id);
		}

		if(webview) { //已缓存
			//每次show都需要传递动画参数；
			//预加载的动画参数优先级：openWindow配置>preloadPages配置>mui默认配置；
			nShow = webviewCache ? webviewCache.show : defaultShow;
			nShow = options.show ? $.extend(nShow, options.show) : nShow;
			nShow.autoShow && webview.show(nShow.aniShow, nShow.duration, function() {
				triggerPreload(webview);
				trigger(webview, 'pagebeforeshow', false);
			});
			if(webviewCache) {
				webviewCache.afterShowMethodName && webview.evalJS(webviewCache.afterShowMethodName + '(\'' + JSON.stringify(params) + '\')');
			}
			return webview;
		} else { //新窗口
			if(!url) {
				throw new Error('webview[' + id + '] does not exist');
			}

			//显示waiting
			var waitingConfig = $.waitingOptions(options.waiting);
			if(waitingConfig.autoShow) {
				nWaiting = plus.nativeUI.showWaiting(waitingConfig.title, waitingConfig.options);
			}

			//创建页面
			options = $.extend(options, {
				id: id,
				url: url
			});

			webview = $.createWindow(options);

			//显示
			nShow = $.showOptions(options.show);
			if(nShow.autoShow) {
				var showWebview = function() {
					//关闭等待框
					if(nWaiting) {
						nWaiting.close();
					}
					//显示页面
					webview.show(nShow.aniShow, nShow.duration, function() {},nShow.extras);
					options.afterShowMethodName && webview.evalJS(options.afterShowMethodName + '(\'' + JSON.stringify(params) + '\')');
				};
				//titleUpdate触发时机早于loaded，更换为titleUpdate后，可以更早的显示webview
				webview.addEventListener(nShow.event, showWebview, false);
				//loaded事件发生后，触发预加载和pagebeforeshow事件
				webview.addEventListener("loaded", function() {
					triggerPreload(webview);
					trigger(webview, 'pagebeforeshow', false);
				}, false);
			}
		}
		return webview;
	};

	$.openWindowWithTitle = function(options, titleConfig) {
		options = options || {};
		var url = options.url;
		var id = options.id || url;

		if(!$.os.plus) {
			//TODO 先临时这么处理：手机上顶层跳，PC上parent跳
			if($.os.ios || $.os.android) {
				window.top.location.href = url;
			} else {
				window.parent.location.href = url;
			}
			return;
		}
		if(!window.plus) {
			return;
		}

		var params = options.params || {};
		var webview = null,
			webviewCache = null,
			nShow, nWaiting;

		if($.webviews[id]) {
			webviewCache = $.webviews[id];
			//webview真实存在，才能获取
			if(plus.webview.getWebviewById(id)) {
				webview = webviewCache.webview;
			}
		} else if(options.createNew !== true) {
			webview = plus.webview.getWebviewById(id);
		}

		if(webview) { //已缓存
			//每次show都需要传递动画参数；
			//预加载的动画参数优先级：openWindow配置>preloadPages配置>mui默认配置；
			nShow = webviewCache ? webviewCache.show : defaultShow;
			nShow = options.show ? $.extend(nShow, options.show) : nShow;
			nShow.autoShow && webview.show(nShow.aniShow, nShow.duration, function() {
				triggerPreload(webview);
				trigger(webview, 'pagebeforeshow', false);
			});
			if(webviewCache) {
				webviewCache.afterShowMethodName && webview.evalJS(webviewCache.afterShowMethodName + '(\'' + JSON.stringify(params) + '\')');
			}
			return webview;
		} else { //新窗口
			if(!url) {
				throw new Error('webview[' + id + '] does not exist');
			}

			//显示waiting
			var waitingConfig = $.waitingOptions(options.waiting);
			if(waitingConfig.autoShow) {
				nWaiting = plus.nativeUI.showWaiting(waitingConfig.title, waitingConfig.options);
			}

			//创建页面
			options = $.extend(options, {
				id: id,
				url: url
			});

			webview = $.createWindow(options);

			if(titleConfig) { //处理原生头
				$.extend(true, $.options.titleConfig, titleConfig);
				var tid = $.options.titleConfig.id ? $.options.titleConfig.id : id + "_title";
				var view = new plus.nativeObj.View(tid, {
					top: 0,
					height: $.options.titleConfig.height,
					width: "100%",
					dock: "top",
					position: "dock"
				});
				view.drawRect($.options.titleConfig.backgroundColor); //绘制背景色
				var _b = parseInt($.options.titleConfig.height) - 1;
				view.drawRect($.options.titleConfig.bottomBorderColor, {
					top: _b + "px",
					left: "0px"
				}); //绘制底部边线

				//绘制文字
				if($.options.titleConfig.title.text){
					var _title = $.options.titleConfig.title;
					view.drawText(_title.text,_title.position , _title.styles);
				}
				
				//返回图标绘制
				var _back = $.options.titleConfig.back;
				var backClick = null;
				//优先字体

				//其次是图片
				var _backImage = _back.image;
				if(_backImage.base64Data || _backImage.imgSrc) {
					//TODO 此处需要处理百分比的情况
					backClick = {
						left:parseInt(_backImage.position.left),
						right:parseInt(_backImage.position.left) + parseInt(_backImage.position.width)
					};
					var bitmap = new plus.nativeObj.Bitmap(id + "_back");
					if(_backImage.base64Data) { //优先base64编码字符串
						bitmap.loadBase64Data(_backImage.base64Data);
					} else { //其次加载图片文件
						bitmap.load(_backImage.imgSrc);
					}
					view.drawBitmap(bitmap,_backImage.sprite , _backImage.position);
				}

				//处理点击事件
				view.setTouchEventRect({
					top: "0px",
					left: "0px",
					width: "100%",
					height: "100%"
				});
				view.interceptTouchEvent(true);
				view.addEventListener("click", function(e) {
					var x = e.clientX;
					
					//返回按钮点击
					if(backClick&& x > backClick.left && x < backClick.right){
						if( _back.click && $.isFunction(_back.click)){
							_back.click();
						}else{
							webview.evalJS("window.mui&&mui.back();");
						}
					}
				}, false);
				webview.append(view);

			}

			//显示
			nShow = $.showOptions(options.show);
			if(nShow.autoShow) {
				//titleUpdate触发时机早于loaded，更换为titleUpdate后，可以更早的显示webview
				webview.addEventListener(nShow.event, function () {
					//关闭等待框
					if(nWaiting) {
						nWaiting.close();
					}
					//显示页面
					webview.show(nShow.aniShow, nShow.duration, function() {},nShow.extras);
				}, false);
			}
		}
		return webview;
	};

	/**
	 * 根据配置信息创建一个webview
	 * @param {type} options
	 * @param {type} isCreate
	 * @returns {webview}
	 */
	$.createWindow = function(options, isCreate) {
		if(!window.plus) {
			return;
		}
		var id = options.id || options.url;
		var webview;
		if(options.preload) {
			if($.webviews[id] && $.webviews[id].webview.getURL()) { //已经cache
				webview = $.webviews[id].webview;
			} else { //新增预加载窗口
				//判断是否携带createNew参数，默认为false
				if(options.createNew !== true) {
					webview = plus.webview.getWebviewById(id);
				}

				//之前没有，那就新创建	
				if(!webview) {
					webview = plus.webview.create(options.url, id, $.windowOptions(options.styles), $.extend({
						preload: true
					}, options.extras));
					if(options.subpages) {
						$.each(options.subpages, function(index, subpage) {
							var subpageId = subpage.id || subpage.url;
							if(subpageId) { //过滤空对象
								var subWebview = plus.webview.getWebviewById(subpageId);
								if(!subWebview) { //如果该webview不存在，则创建
									subWebview = plus.webview.create(subpage.url, subpageId, $.windowOptions(subpage.styles), $.extend({
										preload: true
									}, subpage.extras));
								}
								webview.append(subWebview);
							}
						});
					}
				}
			}

			//TODO 理论上，子webview也应该计算到预加载队列中，但这样就麻烦了，要退必须退整体，否则可能出现问题；
			$.webviews[id] = {
				webview: webview, //目前仅preload的缓存webview
				preload: true,
				show: $.showOptions(options.show),
				afterShowMethodName: options.afterShowMethodName //就不应该用evalJS。应该是通过事件消息通讯
			};
			//索引该预加载窗口
			var preloads = $.data.preloads;
			var index = preloads.indexOf(id);
			if(~index) { //删除已存在的(变相调整插入位置)
				preloads.splice(index, 1);
			}
			preloads.push(id);
			if(preloads.length > $.options.preloadLimit) {
				//先进先出
				var first = $.data.preloads.shift();
				var webviewCache = $.webviews[first];
				if(webviewCache && webviewCache.webview) {
					//需要将自己打开的所有页面，全部close；
					//关闭该预加载webview	
					$.closeAll(webviewCache.webview);
				}
				//删除缓存
				delete $.webviews[first];
			}
		} else {
			if(isCreate !== false) { //直接创建非预加载窗口
				webview = plus.webview.create(options.url, id, $.windowOptions(options.styles), options.extras);
				if(options.subpages) {
					$.each(options.subpages, function(index, subpage) {
						var subpageId = subpage.id || subpage.url;
						var subWebview = plus.webview.getWebviewById(subpageId);
						if(!subWebview) {
							subWebview = plus.webview.create(subpage.url, subpageId, $.windowOptions(subpage.styles), subpage.extras);
						}
						webview.append(subWebview);
					});
				}
			}
		}
		return webview;
	};

	/**
	 * 预加载
	 */
	$.preload = function(options) {
		//调用预加载函数，不管是否传递preload参数，强制变为true
		if(!options.preload) {
			options.preload = true;
		}
		return $.createWindow(options);
	};

	/**
	 *关闭当前webview打开的所有webview；
	 */
	$.closeOpened = function(webview) {
		var opened = webview.opened();
		if(opened) {
			for(var i = 0, len = opened.length; i < len; i++) {
				var openedWebview = opened[i];
				var open_open = openedWebview.opened();
				if(open_open && open_open.length > 0) {
					//关闭打开的webview
					$.closeOpened(openedWebview);
					//关闭自己
					openedWebview.close("none");
				} else {
					//如果直接孩子节点，就不用关闭了，因为父关闭的时候，会自动关闭子；
					if(openedWebview.parent() !== webview) {
						openedWebview.close('none');
					}
				}
			}
		}
	};
	$.closeAll = function(webview, aniShow) {
		$.closeOpened(webview);
		if(aniShow) {
			webview.close(aniShow);
		} else {
			webview.close();
		}
	};

	/**
	 * 批量创建webview
	 * @param {type} options
	 * @returns {undefined}
	 */
	$.createWindows = function(options) {
		$.each(options, function(index, option) {
			//初始化预加载窗口(创建)和非预加载窗口(仅配置，不创建)
			$.createWindow(option, false);
		});
	};
	/**
	 * 创建当前页面的子webview
	 * @param {type} options
	 * @returns {webview}
	 */
	$.appendWebview = function(options) {
		if(!window.plus) {
			return;
		}
		var id = options.id || options.url;
		var webview;
		if(!$.webviews[id]) { //保证执行一遍
			//TODO 这里也有隐患，比如某个webview不是作为subpage创建的，而是作为target webview的话；
			if(!plus.webview.getWebviewById(id)) {
				webview = plus.webview.create(options.url, id, options.styles, options.extras);
			}
			//之前的实现方案：子窗口loaded之后再append到父窗口中；
			//问题：部分子窗口loaded事件发生较晚，此时执行父窗口的children方法会返回空，导致父子通讯失败；
			//     比如父页面执行完preload事件后，需触发子页面的preload事件，此时未append的话，就无法触发；
			//修改方式：不再监控loaded事件，直接append
			//by chb@20150521
			// webview.addEventListener('loaded', function() {
			plus.webview.currentWebview().append(webview);
			// });
			$.webviews[id] = options;

		}
		return webview;
	};

	//全局webviews
	$.webviews = {};
	//预加载窗口索引
	$.data.preloads = [];
	//$.currentWebview
	$.plusReady(function() {
		$.currentWebview = plus.webview.currentWebview();
	});
	$.addInit({
		name: '5+',
		index: 100,
		handle: function() {
			var options = $.options;
			var subpages = options.subpages || [];
			if($.os.plus) {
				$.plusReady(function() {
					//TODO  这里需要判断一下，最好等子窗口加载完毕后，再调用主窗口的show方法；
					//或者：在openwindow方法中，监听实现；
					$.each(subpages, function(index, subpage) {
						$.appendWebview(subpage);
					});
					//判断是否首页
					if(plus.webview.currentWebview() === plus.webview.getWebviewById(plus.runtime.appid)) {
						//首页需要自己激活预加载；
						//timeout因为子页面loaded之后才append的，防止子页面尚未append、从而导致其preload未触发的问题；
						setTimeout(function() {
							triggerPreload(plus.webview.currentWebview());
						}, 300);
					}
					//设置ios顶部状态栏颜色；
					if($.os.ios && $.options.statusBarBackground) {
						plus.navigator.setStatusBarBackground($.options.statusBarBackground);
					}
					if($.os.android && parseFloat($.os.version) < 4.4) {
						//解决Android平台4.4版本以下，resume后，父窗体标题延迟渲染的问题；
						if(plus.webview.currentWebview().parent() == null) {
							document.addEventListener("resume", function() {
								var body = document.body;
								body.style.display = 'none';
								setTimeout(function() {
									body.style.display = '';
								}, 10);
							});
						}
					}
				});
			} else {
				//已支持iframe嵌入
				//				if (subpages.length > 0) {
				//					var err = document.createElement('div');
				//					err.className = 'mui-error';
				//					//文字描述
				//					var span = document.createElement('span');
				//					span.innerHTML = '在该浏览器下，不支持创建子页面，具体参考';
				//					err.appendChild(span);
				//					var a = document.createElement('a');
				//					a.innerHTML = '"mui框架适用场景"';
				//					a.href = 'http://ask.dcloud.net.cn/article/113';
				//					err.appendChild(a);
				//					document.body.appendChild(err);
				//					console.log('在该浏览器下，不支持创建子页面');
				//				}

			}

		}
	});
	window.addEventListener('preload', function() {
		//处理预加载部分
		var webviews = $.options.preloadPages || [];
		$.plusReady(function() {
			$.each(webviews, function(index, webview) {
				$.createWindow($.extend(webview, {
					preload: true
				}));
			});

		});
	});
	$.supportStatusbarOffset = function() {
		return $.os.plus && $.os.ios && parseFloat($.os.version) >= 7;
	};
	$.ready(function() {
		//标识当前环境支持statusbar
		if($.supportStatusbarOffset()) {
			document.body.classList.add('mui-statusbar');
		}
	});
})(mui);

/**
 * mui back
 * @param {type} $
 * @param {type} window
 * @returns {undefined}
 */
(function($, window) {
	/**
	 * register back
	 * @param {type} back
	 * @returns {$.gestures}
	 */
	$.addBack = function(back) {
		return $.addAction('backs', back);
	};
	/**
	 * default
	 */
	$.addBack({
		name: 'browser',
		index: 100,
		handle: function() {
			if (window.history.length > 1) {
				window.history.back();
				return true;
			}
			return false;
		}
	});
	/**
	 * 后退
	 */
	$.back = function() {
		if (typeof $.options.beforeback === 'function') {
			if ($.options.beforeback() === false) {
				return;
			}
		}
		$.doAction('backs');
	};
	window.addEventListener('tap', function(e) {
		var action = $.targets.action;
		if (action && action.classList.contains('mui-action-back')) {
			$.back();
			$.targets.action = false;
		}
	});
	window.addEventListener('swiperight', function(e) {
		var detail = e.detail;
		if ($.options.swipeBack === true && Math.abs(detail.angle) < 3) {
			$.back();
		}
	});

})(mui, window);
/**
 * mui back 5+
 * @param {type} $
 * @param {type} window
 * @returns {undefined}
 */
(function($, window) {
	if ($.os.plus && $.os.android) {
		$.addBack({
			name: 'mui',
			index: 5,
			handle: function() {
				//后续重新设计此处，将back放到各个空间内部实现
				//popover
				if ($.targets._popover && $.targets._popover.classList.contains('mui-active')) {
					$($.targets._popover).popover('hide');
					return true;
				}
				//offcanvas
				var offCanvas = document.querySelector('.mui-off-canvas-wrap.mui-active');
				if (offCanvas) {
					$(offCanvas).offCanvas('close');
					return true;
				}
				var previewImage = $.isFunction($.getPreviewImage) && $.getPreviewImage();
				if (previewImage && previewImage.isShown()) {
					previewImage.close();
					return true;
				}
				//popup
				return $.closePopup();
			}
		});
	}
	//首次按下back按键的时间
	$.__back__first = null;
	/**
	 * 5+ back
	 */
	$.addBack({
		name: '5+',
		index: 10,
		handle: function() {
			if (!window.plus) {
				return false;
			}
			var wobj = plus.webview.currentWebview();
			var parent = wobj.parent();
			if (parent) {
				parent.evalJS('mui&&mui.back();');
			} else {
				wobj.canBack(function(e) {
					//by chb 暂时注释，在碰到类似popover之类的锚点的时候，需多次点击才能返回；
					if (e.canBack) { //webview history back
						window.history.back();
					} else { //webview close or hide
						//fixed by fxy 此处不应该用opener判断，因为用户有可能自己close掉当前窗口的opener。这样的话。opener就为空了，导致不能执行close
						if (wobj.id === plus.runtime.appid) { //首页
							//首页不存在opener的情况下，后退实际上应该是退出应用；
							//首次按键，提示‘再按一次退出应用’
							if (!$.__back__first) {
								$.__back__first = new Date().getTime();
								mui.toast('再按一次退出应用');
								setTimeout(function() {
									$.__back__first = null;
								}, 2000);
							} else {
								if (new Date().getTime() - $.__back__first < 2000) {
									plus.runtime.quit();
								}
							}
						} else { //其他页面，
							if (wobj.preload) {
								wobj.hide("auto");
							} else {
								//关闭页面时，需要将其打开的所有子页面全部关闭；
								$.closeAll(wobj);
							}
						}
					}
				});
			}
			return true;
		}
	});


	$.menu = function() {
		var menu = document.querySelector('.mui-action-menu');
		if (menu) {
			$.trigger(menu, $.EVENT_START); //临时处理menu无touchstart的话，找不到当前targets的问题
			$.trigger(menu, 'tap');
		} else { //执行父窗口的menu
			if (window.plus) {
				var wobj = $.currentWebview;
				var parent = wobj.parent();
				if (parent) { //又得evalJS
					parent.evalJS('mui&&mui.menu();');
				}
			}
		}
	};
	var __back = function() {
		$.back();
	};
	var __menu = function() {
		$.menu();
	};
	//默认监听
	$.plusReady(function() {
		if ($.options.keyEventBind.backbutton) {
			plus.key.addEventListener('backbutton', __back, false);
		}
		if ($.options.keyEventBind.menubutton) {
			plus.key.addEventListener('menubutton', __menu, false);
		}
	});
	//处理按键监听事件
	$.addInit({
		name: 'keyEventBind',
		index: 1000,
		handle: function() {
			$.plusReady(function() {
				//如果不为true，则移除默认监听
				if (!$.options.keyEventBind.backbutton) {
					plus.key.removeEventListener('backbutton', __back);
				}
				if (!$.options.keyEventBind.menubutton) {
					plus.key.removeEventListener('menubutton', __menu);
				}
			});
		}
	});
})(mui, window);
/**
 * mui.init pulldownRefresh
 * @param {type} $
 * @returns {undefined}
 */
(function($) {
	$.addInit({
		name: 'pullrefresh',
		index: 1000,
		handle: function() {
			var options = $.options;
			var pullRefreshOptions = options.pullRefresh || {};
			var hasPulldown = pullRefreshOptions.down && pullRefreshOptions.down.hasOwnProperty('callback');
			var hasPullup = pullRefreshOptions.up && pullRefreshOptions.up.hasOwnProperty('callback');
			if(hasPulldown || hasPullup) {
				var container = pullRefreshOptions.container;
				if(container) {
					var $container = $(container);
					if($container.length === 1) {
						if($.os.plus) { //5+环境
							if(hasPulldown && pullRefreshOptions.down.style == "circle") { //原生转圈
								$.plusReady(function() {
									//这里改写$.fn.pullRefresh
									$.fn.pullRefresh = $.fn.pullRefresh_native;
									$container.pullRefresh(pullRefreshOptions);
								});

							} else if($.os.android) { //非原生转圈，但是Android环境
								$.plusReady(function() {
									//这里改写$.fn.pullRefresh
									$.fn.pullRefresh = $.fn.pullRefresh_native
									var webview = plus.webview.currentWebview();
									if(window.__NWin_Enable__ === false) { //不支持多webview
										$container.pullRefresh(pullRefreshOptions);
									} else {
										if(hasPullup) {
											//当前页面初始化pullup
											var upOptions = {};
											upOptions.up = pullRefreshOptions.up;
											upOptions.webviewId = webview.id || webview.getURL();
											$container.pullRefresh(upOptions);
										}
										if(hasPulldown) {
											var parent = webview.parent();
											var id = webview.id || webview.getURL();
											if(parent) {
												if(!hasPullup) { //如果没有上拉加载，需要手动初始化一个默认的pullRefresh，以便当前页面容器可以调用endPulldownToRefresh等方法
													$container.pullRefresh({
														webviewId: id
													});
												}
												var downOptions = {
													webviewId: id//子页面id
												};
												downOptions.down = $.extend({}, pullRefreshOptions.down);
												downOptions.down.callback = '_CALLBACK';
												//改写父页面的$.fn.pullRefresh
												parent.evalJS("mui.fn.pullRefresh=mui.fn.pullRefresh_native");
												//父页面初始化pulldown
												parent.evalJS("mui&&mui(document.querySelector('.mui-content')).pullRefresh('" + JSON.stringify(downOptions) + "')");
											}
										}
									}
								});
							} else { //非原生转圈，iOS环境
								$container.pullRefresh(pullRefreshOptions);
							}
						} else {
							$container.pullRefresh(pullRefreshOptions);
						}
					}
				}
			}
		}
	});
})(mui);
/**
 * mui ajax
 * @param {type} $
 * @returns {undefined}
 */
(function($, window, undefined) {

	var jsonType = 'application/json';
	var htmlType = 'text/html';
	var rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
	var scriptTypeRE = /^(?:text|application)\/javascript/i;
	var xmlTypeRE = /^(?:text|application)\/xml/i;
	var blankRE = /^\s*$/;

	$.ajaxSettings = {
		type: 'GET',
		beforeSend: $.noop,
		success: $.noop,
		error: $.noop,
		complete: $.noop,
		context: null,
		xhr: function(protocol) {
			return new window.XMLHttpRequest();
		},
		accepts: {
			script: 'text/javascript, application/javascript, application/x-javascript',
			json: jsonType,
			xml: 'application/xml, text/xml',
			html: htmlType,
			text: 'text/plain'
		},
		timeout: 0,
		processData: true,
		cache: true
	};
	var ajaxBeforeSend = function(xhr, settings) {
		var context = settings.context
		if(settings.beforeSend.call(context, xhr, settings) === false) {
			return false;
		}
	};
	var ajaxSuccess = function(data, xhr, settings) {
		settings.success.call(settings.context, data, 'success', xhr);
		ajaxComplete('success', xhr, settings);
	};
	// type: "timeout", "error", "abort", "parsererror"
	var ajaxError = function(error, type, xhr, settings) {
		settings.error.call(settings.context, xhr, type, error);
		ajaxComplete(type, xhr, settings);
	};
	// status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
	var ajaxComplete = function(status, xhr, settings) {
		settings.complete.call(settings.context, xhr, status);
	};

	var serialize = function(params, obj, traditional, scope) {
		var type, array = $.isArray(obj),
			hash = $.isPlainObject(obj);
		$.each(obj, function(key, value) {
			type = $.type(value);
			if(scope) {
				key = traditional ? scope :
					scope + '[' + (hash || type === 'object' || type === 'array' ? key : '') + ']';
			}
			// handle data in serializeArray() format
			if(!scope && array) {
				params.add(value.name, value.value);
			}
			// recurse into nested objects
			else if(type === "array" || (!traditional && type === "object")) {
				serialize(params, value, traditional, key);
			} else {
				params.add(key, value);
			}
		});
	};
	var serializeData = function(options) {
		if(options.processData && options.data && typeof options.data !== "string") {
			var contentType = options.contentType;
			if(!contentType && options.headers) {
				contentType = options.headers['Content-Type'];
			}
			if(contentType && ~contentType.indexOf(jsonType)) { //application/json
				options.data = JSON.stringify(options.data);
			} else {
				options.data = $.param(options.data, options.traditional);
			}
		}
		if(options.data && (!options.type || options.type.toUpperCase() === 'GET')) {
			options.url = appendQuery(options.url, options.data);
			options.data = undefined;
		}
	};
	var appendQuery = function(url, query) {
		if(query === '') {
			return url;
		}
		return(url + '&' + query).replace(/[&?]{1,2}/, '?');
	};
	var mimeToDataType = function(mime) {
		if(mime) {
			mime = mime.split(';', 2)[0];
		}
		return mime && (mime === htmlType ? 'html' :
			mime === jsonType ? 'json' :
			scriptTypeRE.test(mime) ? 'script' :
			xmlTypeRE.test(mime) && 'xml') || 'text';
	};
	var parseArguments = function(url, data, success, dataType) {
		if($.isFunction(data)) {
			dataType = success, success = data, data = undefined;
		}
		if(!$.isFunction(success)) {
			dataType = success, success = undefined;
		}
		return {
			url: url,
			data: data,
			success: success,
			dataType: dataType
		};
	};
	$.ajax = function(url, options) {
		if(typeof url === "object") {
			options = url;
			url = undefined;
		}
		var settings = options || {};
		settings.url = url || settings.url;
		for(var key in $.ajaxSettings) {
			if(settings[key] === undefined) {
				settings[key] = $.ajaxSettings[key];
			}
		}
		serializeData(settings);
		var dataType = settings.dataType;

		if(settings.cache === false || ((!options || options.cache !== true) && ('script' === dataType))) {
			settings.url = appendQuery(settings.url, '_=' + $.now());
		}
		var mime = settings.accepts[dataType && dataType.toLowerCase()];
		var headers = {};
		var setHeader = function(name, value) {
			headers[name.toLowerCase()] = [name, value];
		};
		var protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol;
		var xhr = settings.xhr(settings);
		var nativeSetHeader = xhr.setRequestHeader;
		var abortTimeout;

		setHeader('X-Requested-With', 'XMLHttpRequest');
		setHeader('Accept', mime || '*/*');
		if(!!(mime = settings.mimeType || mime)) {
			if(mime.indexOf(',') > -1) {
				mime = mime.split(',', 2)[0];
			}
			xhr.overrideMimeType && xhr.overrideMimeType(mime);
		}
		if(settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() !== 'GET')) {
			setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded');
		}
		if(settings.headers) {
			for(var name in settings.headers)
				setHeader(name, settings.headers[name]);
		}
		xhr.setRequestHeader = setHeader;

		xhr.onreadystatechange = function() {
			if(xhr.readyState === 4) {
				xhr.onreadystatechange = $.noop;
				clearTimeout(abortTimeout);
				var result, error = false;
				var isLocal = protocol === 'file:';
				if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304 || (xhr.status === 0 && isLocal && xhr.responseText)) {
					dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'));
					result = xhr.responseText;
					try {
						// http://perfectionkills.com/global-eval-what-are-the-options/
						if(dataType === 'script') {
							(1, eval)(result);
						} else if(dataType === 'xml') {
							result = xhr.responseXML;
						} else if(dataType === 'json') {
							result = blankRE.test(result) ? null : $.parseJSON(result);
						}
					} catch(e) {
						error = e;
					}

					if(error) {
						ajaxError(error, 'parsererror', xhr, settings);
					} else {
						ajaxSuccess(result, xhr, settings);
					}
				} else {
					var status = xhr.status ? 'error' : 'abort';
					var statusText = xhr.statusText || null;
					if(isLocal) {
						status = 'error';
						statusText = '404';
					}
					ajaxError(statusText, status, xhr, settings);
				}
			}
		};
		if(ajaxBeforeSend(xhr, settings) === false) {
			xhr.abort();
			ajaxError(null, 'abort', xhr, settings);
			return xhr;
		}

		if(settings.xhrFields) {
			for(var name in settings.xhrFields) {
				xhr[name] = settings.xhrFields[name];
			}
		}

		var async = 'async' in settings ? settings.async : true;

		xhr.open(settings.type.toUpperCase(), settings.url, async, settings.username, settings.password);

		for(var name in headers) {
			if(headers.hasOwnProperty(name)) {
				nativeSetHeader.apply(xhr, headers[name]);
			}
		}
		if(settings.timeout > 0) {
			abortTimeout = setTimeout(function() {
				xhr.onreadystatechange = $.noop;
				xhr.abort();
				ajaxError(null, 'timeout', xhr, settings);
			}, settings.timeout);
		}
		xhr.send(settings.data ? settings.data : null);
		return xhr;
	};

	$.param = function(obj, traditional) {
		var params = [];
		params.add = function(k, v) {
			this.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
		};
		serialize(params, obj, traditional);
		return params.join('&').replace(/%20/g, '+');
	};
	$.get = function( /* url, data, success, dataType */ ) {
		return $.ajax(parseArguments.apply(null, arguments));
	};

	$.post = function( /* url, data, success, dataType */ ) {
		var options = parseArguments.apply(null, arguments);
		options.type = 'POST';
		return $.ajax(options);
	};

	$.getJSON = function( /* url, data, success */ ) {
		var options = parseArguments.apply(null, arguments);
		options.dataType = 'json';
		return $.ajax(options);
	};

	$.fn.load = function(url, data, success) {
		if(!this.length)
			return this;
		var self = this,
			parts = url.split(/\s/),
			selector,
			options = parseArguments(url, data, success),
			callback = options.success;
		if(parts.length > 1)
			options.url = parts[0], selector = parts[1];
		options.success = function(response) {
			if(selector) {
				var div = document.createElement('div');
				div.innerHTML = response.replace(rscript, "");
				var selectorDiv = document.createElement('div');
				var childs = div.querySelectorAll(selector);
				if(childs && childs.length > 0) {
					for(var i = 0, len = childs.length; i < len; i++) {
						selectorDiv.appendChild(childs[i]);
					}
				}
				self[0].innerHTML = selectorDiv.innerHTML;
			} else {
				self[0].innerHTML = response;
			}
			callback && callback.apply(self, arguments);
		};
		$.ajax(options);
		return this;
	};

})(mui, window);
/**
 * 5+ ajax
 */
(function($) {
	var originAnchor = document.createElement('a');
	originAnchor.href = window.location.href;
	$.plusReady(function() {
		$.ajaxSettings = $.extend($.ajaxSettings, {
			xhr: function(settings) {
				if (settings.crossDomain) { //强制使用plus跨域
					return new plus.net.XMLHttpRequest();
				}
				//仅在webview的url为远程文件，且ajax请求的资源不同源下使用plus.net.XMLHttpRequest
				if (originAnchor.protocol !== 'file:') {
					var urlAnchor = document.createElement('a');
					urlAnchor.href = settings.url;
					urlAnchor.href = urlAnchor.href;
					settings.crossDomain = (originAnchor.protocol + '//' + originAnchor.host) !== (urlAnchor.protocol + '//' + urlAnchor.host);
					if (settings.crossDomain) {
						return new plus.net.XMLHttpRequest();
					}
				}
				if ($.os.ios && window.webkit && window.webkit.messageHandlers) { //wkwebview下同样使用5+ xhr
                    return new plus.net.XMLHttpRequest();
                }
				return new window.XMLHttpRequest();
			}
		});
	});
})(mui);
/**
 * mui layout(offset[,position,width,height...])
 * @param {type} $
 * @param {type} window
 * @param {type} undefined
 * @returns {undefined}
 */
(function($, window, undefined) {
	$.offset = function(element) {
		var box = {
			top : 0,
			left : 0
		};
		if ( typeof element.getBoundingClientRect !== undefined) {
			box = element.getBoundingClientRect();
		}
		return {
			top : box.top + window.pageYOffset - element.clientTop,
			left : box.left + window.pageXOffset - element.clientLeft
		};
	};
})(mui, window); 
/**
 * mui animation
 */
(function($, window) {
	/**
	 * scrollTo
	 */
	$.scrollTo = function(scrollTop, duration, callback) {
		duration = duration || 1000;
		var scroll = function(duration) {
			if (duration <= 0) {
				window.scrollTo(0, scrollTop);
				callback && callback();
				return;
			}
			var distaince = scrollTop - window.scrollY;
			setTimeout(function() {
				window.scrollTo(0, window.scrollY + distaince / duration * 10);
				scroll(duration - 10);
			}, 16.7);
		};
		scroll(duration);
	};
	$.animationFrame = function(cb) {
		var args, isQueued, context;
		return function() {
			args = arguments;
			context = this;
			if (!isQueued) {
				isQueued = true;
				requestAnimationFrame(function() {
					cb.apply(context, args);
					isQueued = false;
				});
			}
		};
	};

})(mui, window);
(function($) {
	var initializing = false,
		fnTest = /xyz/.test(function() {
			xyz;
		}) ? /\b_super\b/ : /.*/;

	var Class = function() {};
	Class.extend = function(prop) {
		var _super = this.prototype;
		initializing = true;
		var prototype = new this();
		initializing = false;
		for (var name in prop) {
			prototype[name] = typeof prop[name] == "function" &&
				typeof _super[name] == "function" && fnTest.test(prop[name]) ?
				(function(name, fn) {
					return function() {
						var tmp = this._super;

						this._super = _super[name];

						var ret = fn.apply(this, arguments);
						this._super = tmp;

						return ret;
					};
				})(name, prop[name]) :
				prop[name];
		}
		function Class() {
			if (!initializing && this.init)
				this.init.apply(this, arguments);
		}
		Class.prototype = prototype;
		Class.prototype.constructor = Class;
		Class.extend = arguments.callee;
		return Class;
	};
	$.Class = Class;
})(mui);
(function($, document, undefined) {
    var CLASS_PULL_TOP_POCKET = 'mui-pull-top-pocket';
    var CLASS_PULL_BOTTOM_POCKET = 'mui-pull-bottom-pocket';
    var CLASS_PULL = 'mui-pull';
    var CLASS_PULL_LOADING = 'mui-pull-loading';
    var CLASS_PULL_CAPTION = 'mui-pull-caption';
    var CLASS_PULL_CAPTION_DOWN = 'mui-pull-caption-down';
    var CLASS_PULL_CAPTION_REFRESH = 'mui-pull-caption-refresh';
    var CLASS_PULL_CAPTION_NOMORE = 'mui-pull-caption-nomore';

    var CLASS_ICON = 'mui-icon';
    var CLASS_SPINNER = 'mui-spinner';
    var CLASS_ICON_PULLDOWN = 'mui-icon-pulldown';

    var CLASS_BLOCK = 'mui-block';
    var CLASS_HIDDEN = 'mui-hidden';
    var CLASS_VISIBILITY = 'mui-visibility';

    var CLASS_LOADING_UP = CLASS_PULL_LOADING + ' ' + CLASS_ICON + ' ' + CLASS_ICON_PULLDOWN;
    var CLASS_LOADING_DOWN = CLASS_PULL_LOADING + ' ' + CLASS_ICON + ' ' + CLASS_ICON_PULLDOWN;
    var CLASS_LOADING = CLASS_PULL_LOADING + ' ' + CLASS_ICON + ' ' + CLASS_SPINNER;

    var pocketHtml = ['<div class="' + CLASS_PULL + '">', '<div class="{icon}"></div>', '<div class="' + CLASS_PULL_CAPTION + '">{contentrefresh}</div>', '</div>'].join('');

    var PullRefresh = {
        init: function(element, options) {
            this._super(element, $.extend(true, {
                scrollY: true,
                scrollX: false,
                indicators: true,
                deceleration: 0.003,
                down: {
                    height: 50,
                    contentinit: '下拉可以刷新',
                    contentdown: '下拉可以刷新',
                    contentover: '释放立即刷新',
                    contentrefresh: '正在刷新...'
                },
                up: {
                    height: 50,
                    auto: false,
                    contentinit: '上拉显示更多',
                    contentdown: '上拉显示更多',
                    contentrefresh: '正在加载...',
                    contentnomore: '没有更多数据了',
                    duration: 300
                }
            }, options));
        },
        _init: function() {
            this._super();
            this._initPocket();
        },
        _initPulldownRefresh: function() {
            this.pulldown = true;
            if (this.topPocket) {
                this.pullPocket = this.topPocket;
                this.pullPocket.classList.add(CLASS_BLOCK);
                this.pullPocket.classList.add(CLASS_VISIBILITY);
                this.pullCaption = this.topCaption;
                this.pullLoading = this.topLoading;
            }
        },
        _initPullupRefresh: function() {
            this.pulldown = false;
            if (this.bottomPocket) {
                this.pullPocket = this.bottomPocket;
                this.pullPocket.classList.add(CLASS_BLOCK);
                this.pullPocket.classList.add(CLASS_VISIBILITY);
                this.pullCaption = this.bottomCaption;
                this.pullLoading = this.bottomLoading;
            }
        },
        _initPocket: function() {
            var options = this.options;
            if (options.down && options.down.hasOwnProperty('callback')) {
                this.topPocket = this.scroller.querySelector('.' + CLASS_PULL_TOP_POCKET);
                if (!this.topPocket) {
                    this.topPocket = this._createPocket(CLASS_PULL_TOP_POCKET, options.down, CLASS_LOADING_DOWN);
                    this.wrapper.insertBefore(this.topPocket, this.wrapper.firstChild);
                }
                this.topLoading = this.topPocket.querySelector('.' + CLASS_PULL_LOADING);
                this.topCaption = this.topPocket.querySelector('.' + CLASS_PULL_CAPTION);
            }
            if (options.up && options.up.hasOwnProperty('callback')) {
                this.bottomPocket = this.scroller.querySelector('.' + CLASS_PULL_BOTTOM_POCKET);
                if (!this.bottomPocket) {
                    this.bottomPocket = this._createPocket(CLASS_PULL_BOTTOM_POCKET, options.up, CLASS_LOADING);
                    this.scroller.appendChild(this.bottomPocket);
                }
                this.bottomLoading = this.bottomPocket.querySelector('.' + CLASS_PULL_LOADING);
                this.bottomCaption = this.bottomPocket.querySelector('.' + CLASS_PULL_CAPTION);
                //TODO only for h5
                this.wrapper.addEventListener('scrollbottom', this);
            }
        },
        _createPocket: function(clazz, options, iconClass) {
            var pocket = document.createElement('div');
            pocket.className = clazz;
            pocket.innerHTML = pocketHtml.replace('{contentrefresh}', options.contentinit).replace('{icon}', iconClass);
            return pocket;
        },
        _resetPullDownLoading: function() {
            var loading = this.pullLoading;
            if (loading) {
                this.pullCaption.innerHTML = this.options.down.contentdown;
                loading.style.webkitTransition = "";
                loading.style.webkitTransform = "";
                loading.style.webkitAnimation = "";
                loading.className = CLASS_LOADING_DOWN;
            }
        },
        _setCaptionClass: function(isPulldown, caption, title) {
            if (!isPulldown) {
                switch (title) {
                    case this.options.up.contentdown:
                        caption.className = CLASS_PULL_CAPTION + ' ' + CLASS_PULL_CAPTION_DOWN;
                        break;
                    case this.options.up.contentrefresh:
                        caption.className = CLASS_PULL_CAPTION + ' ' + CLASS_PULL_CAPTION_REFRESH
                        break;
                    case this.options.up.contentnomore:
                        caption.className = CLASS_PULL_CAPTION + ' ' + CLASS_PULL_CAPTION_NOMORE;
                        break;
                }
            }
        },
        _setCaption: function(title, reset) {
            if (this.loading) {
                return;
            }
            var options = this.options;
            var pocket = this.pullPocket;
            var caption = this.pullCaption;
            var loading = this.pullLoading;
            var isPulldown = this.pulldown;
            var self = this;
            if (pocket) {
                if (reset) {
                    setTimeout(function() {
                        caption.innerHTML = self.lastTitle = title;
                        if (isPulldown) {
                            loading.className = CLASS_LOADING_DOWN;
                        } else {
                            self._setCaptionClass(false, caption, title);
                            loading.className = CLASS_LOADING;
                        }
                        loading.style.webkitAnimation = "";
                        loading.style.webkitTransition = "";
                        loading.style.webkitTransform = "";
                    }, 100);
                } else {
                    if (title !== this.lastTitle) {
                        caption.innerHTML = title;
                        if (isPulldown) {
                            if (title === options.down.contentrefresh) {
                                loading.className = CLASS_LOADING;
                                loading.style.webkitAnimation = "spinner-spin 1s step-end infinite";
                            } else if (title === options.down.contentover) {
                                loading.className = CLASS_LOADING_UP;
                                loading.style.webkitTransition = "-webkit-transform 0.3s ease-in";
                                loading.style.webkitTransform = "rotate(180deg)";
                            } else if (title === options.down.contentdown) {
                                loading.className = CLASS_LOADING_DOWN;
                                loading.style.webkitTransition = "-webkit-transform 0.3s ease-in";
                                loading.style.webkitTransform = "rotate(0deg)";
                            }
                        } else {
                            if (title === options.up.contentrefresh) {
                                loading.className = CLASS_LOADING + ' ' + CLASS_VISIBILITY;
                            } else {
                                loading.className = CLASS_LOADING + ' ' + CLASS_HIDDEN;
                            }
                            self._setCaptionClass(false, caption, title);
                        }
                        this.lastTitle = title;
                    }
                }

            }
        }
    };
    $.PullRefresh = PullRefresh;
})(mui, document);
(function($, window, document, undefined) {
	var CLASS_SCROLL = 'mui-scroll';
	var CLASS_SCROLLBAR = 'mui-scrollbar';
	var CLASS_INDICATOR = 'mui-scrollbar-indicator';
	var CLASS_SCROLLBAR_VERTICAL = CLASS_SCROLLBAR + '-vertical';
	var CLASS_SCROLLBAR_HORIZONTAL = CLASS_SCROLLBAR + '-horizontal';

	var CLASS_ACTIVE = 'mui-active';

	var ease = {
		quadratic: {
			style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
			fn: function(k) {
				return k * (2 - k);
			}
		},
		circular: {
			style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',
			fn: function(k) {
				return Math.sqrt(1 - (--k * k));
			}
		},
		outCirc: {
			style: 'cubic-bezier(0.075, 0.82, 0.165, 1)'
		},
		outCubic: {
			style: 'cubic-bezier(0.165, 0.84, 0.44, 1)'
		}
	}
	var Scroll = $.Class.extend({
		init: function(element, options) {
			this.wrapper = this.element = element;
			this.scroller = this.wrapper.children[0];
			this.scrollerStyle = this.scroller && this.scroller.style;
			this.stopped = false;

			this.options = $.extend(true, {
				scrollY: true, //是否竖向滚动
				scrollX: false, //是否横向滚动
				startX: 0, //初始化时滚动至x
				startY: 0, //初始化时滚动至y

				indicators: true, //是否显示滚动条
				stopPropagation: false,
				hardwareAccelerated: true,
				fixedBadAndorid: false,
				preventDefaultException: {
					tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|VIDEO)$/
				},
				momentum: true,

				snapX: 0.5, //横向切换距离(以当前容器宽度为基准)
				snap: false, //图片轮播，拖拽式选项卡

				bounce: true, //是否启用回弹
				bounceTime: 500, //回弹动画时间
				bounceEasing: ease.outCirc, //回弹动画曲线

				scrollTime: 500,
				scrollEasing: ease.outCubic, //轮播动画曲线

				directionLockThreshold: 5,

				parallaxElement: false, //视差元素
				parallaxRatio: 0.5
			}, options);

			this.x = 0;
			this.y = 0;
			this.translateZ = this.options.hardwareAccelerated ? ' translateZ(0)' : '';

			this._init();
			if (this.scroller) {
				this.refresh();
				//				if (this.options.startX !== 0 || this.options.startY !== 0) { //需要判断吗？后续根据实际情况再看看
				this.scrollTo(this.options.startX, this.options.startY);
				//				}
			}
		},
		_init: function() {
			this._initParallax();
			this._initIndicators();
			this._initEvent();
		},
		_initParallax: function() {
			if (this.options.parallaxElement) {
				this.parallaxElement = document.querySelector(this.options.parallaxElement);
				this.parallaxStyle = this.parallaxElement.style;
				this.parallaxHeight = this.parallaxElement.offsetHeight;
				this.parallaxImgStyle = this.parallaxElement.querySelector('img').style;
			}
		},
		_initIndicators: function() {
			var self = this;
			self.indicators = [];
			if (!this.options.indicators) {
				return;
			}
			var indicators = [],
				indicator;

			// Vertical scrollbar
			if (self.options.scrollY) {
				indicator = {
					el: this._createScrollBar(CLASS_SCROLLBAR_VERTICAL),
					listenX: false
				};

				this.wrapper.appendChild(indicator.el);
				indicators.push(indicator);
			}

			// Horizontal scrollbar
			if (this.options.scrollX) {
				indicator = {
					el: this._createScrollBar(CLASS_SCROLLBAR_HORIZONTAL),
					listenY: false
				};

				this.wrapper.appendChild(indicator.el);
				indicators.push(indicator);
			}

			for (var i = indicators.length; i--;) {
				this.indicators.push(new Indicator(this, indicators[i]));
			}

		},
		_initSnap: function() {
			this.currentPage = {};
			this.pages = [];
			var snaps = this.snaps;
			var length = snaps.length;
			var m = 0;
			var n = -1;
			var x = 0;
			var leftX = 0;
			var rightX = 0;
			var snapX = 0;
			for (var i = 0; i < length; i++) {
				var snap = snaps[i];
				var offsetLeft = snap.offsetLeft;
				var offsetWidth = snap.offsetWidth;
				if (i === 0 || offsetLeft <= snaps[i - 1].offsetLeft) {
					m = 0;
					n++;
				}
				if (!this.pages[m]) {
					this.pages[m] = [];
				}
				x = this._getSnapX(offsetLeft);
				snapX = Math.round((offsetWidth) * this.options.snapX);
				leftX = x - snapX;
				rightX = x - offsetWidth + snapX;
				this.pages[m][n] = {
					x: x,
					leftX: leftX,
					rightX: rightX,
					pageX: m,
					element: snap
				}
				if (snap.classList.contains(CLASS_ACTIVE)) {
					this.currentPage = this.pages[m][0];
				}
				if (x >= this.maxScrollX) {
					m++;
				}
			}
			this.options.startX = this.currentPage.x || 0;
		},
		_getSnapX: function(offsetLeft) {
			return Math.max(Math.min(0, -offsetLeft + (this.wrapperWidth / 2)), this.maxScrollX);
		},
		_gotoPage: function(index) {
			this.currentPage = this.pages[Math.min(index, this.pages.length - 1)][0];
			for (var i = 0, len = this.snaps.length; i < len; i++) {
				if (i === index) {
					this.snaps[i].classList.add(CLASS_ACTIVE);
				} else {
					this.snaps[i].classList.remove(CLASS_ACTIVE);
				}
			}
			this.scrollTo(this.currentPage.x, 0, this.options.scrollTime);
		},
		_nearestSnap: function(x) {
			if (!this.pages.length) {
				return {
					x: 0,
					pageX: 0
				};
			}
			var i = 0;
			var length = this.pages.length;
			if (x > 0) {
				x = 0;
			} else if (x < this.maxScrollX) {
				x = this.maxScrollX;
			}
			for (; i < length; i++) {
				var nearestX = this.direction === 'left' ? this.pages[i][0].leftX : this.pages[i][0].rightX;
				if (x >= nearestX) {
					return this.pages[i][0];
				}
			}
			return {
				x: 0,
				pageX: 0
			};
		},
		_initEvent: function(detach) {
			var action = detach ? 'removeEventListener' : 'addEventListener';
			window[action]('orientationchange', this);
			window[action]('resize', this);

			this.scroller[action]('webkitTransitionEnd', this);

			this.wrapper[action]($.EVENT_START, this);
			this.wrapper[action]($.EVENT_CANCEL, this);
			this.wrapper[action]($.EVENT_END, this);
			this.wrapper[action]('drag', this);
			this.wrapper[action]('dragend', this);
			this.wrapper[action]('flick', this);
			this.wrapper[action]('scrollend', this);
			if (this.options.scrollX) {
				this.wrapper[action]('swiperight', this);
			}
			var segmentedControl = this.wrapper.querySelector('.mui-segmented-control');
			if (segmentedControl) { //靠，这个bug排查了一下午，阻止hash跳转，一旦hash跳转会导致可拖拽选项卡的tab不见
				mui(segmentedControl)[detach ? 'off' : 'on']('click', 'a', $.preventDefault);
			}

			this.wrapper[action]('scrollstart', this);
			this.wrapper[action]('refresh', this);
		},
		_handleIndicatorScrollend: function() {
			this.indicators.map(function(indicator) {
				indicator.fade();
			});
		},
		_handleIndicatorScrollstart: function() {
			this.indicators.map(function(indicator) {
				indicator.fade(1);
			});
		},
		_handleIndicatorRefresh: function() {
			this.indicators.map(function(indicator) {
				indicator.refresh();
			});
		},
		handleEvent: function(e) {
			if (this.stopped) {
				this.resetPosition();
				return;
			}

			switch (e.type) {
				case $.EVENT_START:
					this._start(e);
					break;
				case 'drag':
					this.options.stopPropagation && e.stopPropagation();
					this._drag(e);
					break;
				case 'dragend':
				case 'flick':
					this.options.stopPropagation && e.stopPropagation();
					this._flick(e);
					break;
				case $.EVENT_CANCEL:
				case $.EVENT_END:
					this._end(e);
					break;
				case 'webkitTransitionEnd':
					this.transitionTimer && this.transitionTimer.cancel();
					this._transitionEnd(e);
					break;
				case 'scrollstart':
					this._handleIndicatorScrollstart(e);
					break;
				case 'scrollend':
					this._handleIndicatorScrollend(e);
					this._scrollend(e);
					e.stopPropagation();
					break;
				case 'orientationchange':
				case 'resize':
					this._resize();
					break;
				case 'swiperight':
					e.stopPropagation();
					break;
				case 'refresh':
					this._handleIndicatorRefresh(e);
					break;

			}
		},
		_start: function(e) {
			this.moved = this.needReset = false;
			this._transitionTime();
			if (this.isInTransition) {
				this.needReset = true;
				this.isInTransition = false;
				var pos = $.parseTranslateMatrix($.getStyles(this.scroller, 'webkitTransform'));
				this.setTranslate(Math.round(pos.x), Math.round(pos.y));
				//				this.resetPosition(); //reset
				$.trigger(this.scroller, 'scrollend', this);
				//				e.stopPropagation();
				e.preventDefault();
			}
			this.reLayout();
			$.trigger(this.scroller, 'beforescrollstart', this);
		},
		_getDirectionByAngle: function(angle) {
			if (angle < -80 && angle > -100) {
				return 'up';
			} else if (angle >= 80 && angle < 100) {
				return 'down';
			} else if (angle >= 170 || angle <= -170) {
				return 'left';
			} else if (angle >= -35 && angle <= 10) {
				return 'right';
			}
			return null;
		},
		_drag: function(e) {
			//			if (this.needReset) {
			//				e.stopPropagation(); //disable parent drag(nested scroller)
			//				return;
			//			}
			var detail = e.detail;
			if (this.options.scrollY || detail.direction === 'up' || detail.direction === 'down') { //如果是竖向滚动或手势方向是上或下
				//ios8 hack
				if ($.os.ios && parseFloat($.os.version) >= 8) { //多webview时，离开当前webview会导致后续touch事件不触发
					var clientY = detail.gesture.touches[0].clientY;
					//下拉刷新 or 上拉加载
					if ((clientY + 10) > window.innerHeight || clientY < 10) {
						this.resetPosition(this.options.bounceTime);
						return;
					}
				}
			}
			var isPreventDefault = isReturn = false;
			var direction = this._getDirectionByAngle(detail.angle);
			if (detail.direction === 'left' || detail.direction === 'right') {
				if (this.options.scrollX) {
					isPreventDefault = true;
					if (!this.moved) { //识别角度(该角度导致轮播不灵敏)
						//						if (direction !== 'left' && direction !== 'right') {
						//							isReturn = true;
						//						} else {
						$.gestures.session.lockDirection = true; //锁定方向
						$.gestures.session.startDirection = detail.direction;
						//						}
					}
				} else if (this.options.scrollY && !this.moved) {
					isReturn = true;
				}
			} else if (detail.direction === 'up' || detail.direction === 'down') {
				if (this.options.scrollY) {
					isPreventDefault = true;
					//					if (!this.moved) { //识别角度,竖向滚动似乎没必要进行小角度验证
					//						if (direction !== 'up' && direction !== 'down') {
					//							isReturn = true;
					//						}
					//					}
					if (!this.moved) {
						$.gestures.session.lockDirection = true; //锁定方向
						$.gestures.session.startDirection = detail.direction;
					}
				} else if (this.options.scrollX && !this.moved) {
					isReturn = true;
				}
			} else {
				isReturn = true;
			}
			if (this.moved || isPreventDefault) {
				e.stopPropagation(); //阻止冒泡(scroll类嵌套)
				detail.gesture && detail.gesture.preventDefault();
			}
			if (isReturn) { //禁止非法方向滚动
				return;
			}
			if (!this.moved) {
				$.trigger(this.scroller, 'scrollstart', this);
			} else {
				e.stopPropagation(); //move期间阻止冒泡(scroll嵌套)
			}
			var deltaX = 0;
			var deltaY = 0;
			if (!this.moved) { //start
				deltaX = detail.deltaX;
				deltaY = detail.deltaY;
			} else { //move
				deltaX = detail.deltaX - $.gestures.session.prevTouch.deltaX;
				deltaY = detail.deltaY - $.gestures.session.prevTouch.deltaY;
			}
			var absDeltaX = Math.abs(detail.deltaX);
			var absDeltaY = Math.abs(detail.deltaY);
			if (absDeltaX > absDeltaY + this.options.directionLockThreshold) {
				deltaY = 0;
			} else if (absDeltaY >= absDeltaX + this.options.directionLockThreshold) {
				deltaX = 0;
			}

			deltaX = this.hasHorizontalScroll ? deltaX : 0;
			deltaY = this.hasVerticalScroll ? deltaY : 0;
			var newX = this.x + deltaX;
			var newY = this.y + deltaY;
			// Slow down if outside of the boundaries
			if (newX > 0 || newX < this.maxScrollX) {
				newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
			}
			if (newY > 0 || newY < this.maxScrollY) {
				newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
			}

			if (!this.requestAnimationFrame) {
				this._updateTranslate();
			}
			this.direction = detail.deltaX > 0 ? 'right' : 'left';
			this.moved = true;
			this.x = newX;
			this.y = newY;
			$.trigger(this.scroller, 'scroll', this);
		},
		_flick: function(e) {
			//			if (!this.moved || this.needReset) {
			//				return;
			//			}
			if (!this.moved) {
				return;
			}
			e.stopPropagation();
			var detail = e.detail;
			this._clearRequestAnimationFrame();
			if (e.type === 'dragend' && detail.flick) { //dragend
				return;
			}

			var newX = Math.round(this.x);
			var newY = Math.round(this.y);

			this.isInTransition = false;
			// reset if we are outside of the boundaries
			if (this.resetPosition(this.options.bounceTime)) {
				return;
			}

			this.scrollTo(newX, newY); // ensures that the last position is rounded

			if (e.type === 'dragend') { //dragend
				$.trigger(this.scroller, 'scrollend', this);
				return;
			}
			var time = 0;
			var easing = '';
			// start momentum animation if needed
			if (this.options.momentum && detail.flickTime < 300) {
				momentumX = this.hasHorizontalScroll ? this._momentum(this.x, detail.flickDistanceX, detail.flickTime, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
					destination: newX,
					duration: 0
				};
				momentumY = this.hasVerticalScroll ? this._momentum(this.y, detail.flickDistanceY, detail.flickTime, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
					destination: newY,
					duration: 0
				};
				newX = momentumX.destination;
				newY = momentumY.destination;
				time = Math.max(momentumX.duration, momentumY.duration);
				this.isInTransition = true;
			}

			if (newX != this.x || newY != this.y) {
				if (newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY) {
					easing = ease.quadratic;
				}
				this.scrollTo(newX, newY, time, easing);
				return;
			}

			$.trigger(this.scroller, 'scrollend', this);
			//			e.stopPropagation();
		},
		_end: function(e) {
			this.needReset = false;
			if ((!this.moved && this.needReset) || e.type === $.EVENT_CANCEL) {
				this.resetPosition();
			}
		},
		_transitionEnd: function(e) {
			if (e.target != this.scroller || !this.isInTransition) {
				return;
			}
			this._transitionTime();
			if (!this.resetPosition(this.options.bounceTime)) {
				this.isInTransition = false;
				$.trigger(this.scroller, 'scrollend', this);
			}
		},
		_scrollend: function(e) {
			if ((this.y === 0 && this.maxScrollY === 0) || (Math.abs(this.y) > 0 && this.y <= this.maxScrollY)) {
				$.trigger(this.scroller, 'scrollbottom', this);
			}
		},
		_resize: function() {
			var that = this;
			clearTimeout(that.resizeTimeout);
			that.resizeTimeout = setTimeout(function() {
				that.refresh();
			}, that.options.resizePolling);
		},
		_transitionTime: function(time) {
			time = time || 0;
			this.scrollerStyle['webkitTransitionDuration'] = time + 'ms';
			if (this.parallaxElement && this.options.scrollY) { //目前仅支持竖向视差效果
				this.parallaxStyle['webkitTransitionDuration'] = time + 'ms';
			}
			if (this.options.fixedBadAndorid && !time && $.os.isBadAndroid) {
				this.scrollerStyle['webkitTransitionDuration'] = '0.001s';
				if (this.parallaxElement && this.options.scrollY) { //目前仅支持竖向视差效果
					this.parallaxStyle['webkitTransitionDuration'] = '0.001s';
				}
			}
			if (this.indicators) {
				for (var i = this.indicators.length; i--;) {
					this.indicators[i].transitionTime(time);
				}
			}
			if (time) { //自定义timer，保证webkitTransitionEnd始终触发
				this.transitionTimer && this.transitionTimer.cancel();
				this.transitionTimer = $.later(function() {
					$.trigger(this.scroller, 'webkitTransitionEnd');
				}, time + 100, this);
			}
		},
		_transitionTimingFunction: function(easing) {
			this.scrollerStyle['webkitTransitionTimingFunction'] = easing;
			if (this.parallaxElement && this.options.scrollY) { //目前仅支持竖向视差效果
				this.parallaxStyle['webkitTransitionDuration'] = easing;
			}
			if (this.indicators) {
				for (var i = this.indicators.length; i--;) {
					this.indicators[i].transitionTimingFunction(easing);
				}
			}
		},
		_translate: function(x, y) {
			this.x = x;
			this.y = y;
		},
		_clearRequestAnimationFrame: function() {
			if (this.requestAnimationFrame) {
				cancelAnimationFrame(this.requestAnimationFrame);
				this.requestAnimationFrame = null;
			}
		},
		_updateTranslate: function() {
			var self = this;
			if (self.x !== self.lastX || self.y !== self.lastY) {
				self.setTranslate(self.x, self.y);
			}
			self.requestAnimationFrame = requestAnimationFrame(function() {
				self._updateTranslate();
			});
		},
		_createScrollBar: function(clazz) {
			var scrollbar = document.createElement('div');
			var indicator = document.createElement('div');
			scrollbar.className = CLASS_SCROLLBAR + ' ' + clazz;
			indicator.className = CLASS_INDICATOR;
			scrollbar.appendChild(indicator);
			if (clazz === CLASS_SCROLLBAR_VERTICAL) {
				this.scrollbarY = scrollbar;
				this.scrollbarIndicatorY = indicator;
			} else if (clazz === CLASS_SCROLLBAR_HORIZONTAL) {
				this.scrollbarX = scrollbar;
				this.scrollbarIndicatorX = indicator;
			}
			this.wrapper.appendChild(scrollbar);
			return scrollbar;
		},
		_preventDefaultException: function(el, exceptions) {
			for (var i in exceptions) {
				if (exceptions[i].test(el[i])) {
					return true;
				}
			}
			return false;
		},
		_reLayout: function() {
			if (!this.hasHorizontalScroll) {
				this.maxScrollX = 0;
				this.scrollerWidth = this.wrapperWidth;
			}

			if (!this.hasVerticalScroll) {
				this.maxScrollY = 0;
				this.scrollerHeight = this.wrapperHeight;
			}

			this.indicators.map(function(indicator) {
				indicator.refresh();
			});

			//以防slider类嵌套使用
			if (this.options.snap && typeof this.options.snap === 'string') {
				var items = this.scroller.querySelectorAll(this.options.snap);
				this.itemLength = 0;
				this.snaps = [];
				for (var i = 0, len = items.length; i < len; i++) {
					var item = items[i];
					if (item.parentNode === this.scroller) {
						this.itemLength++;
						this.snaps.push(item);
					}
				}
				this._initSnap(); //需要每次都_initSnap么。其实init的时候执行一次，后续resize的时候执行一次就行了吧.先这么做吧，如果影响性能，再调整
			}
		},
		_momentum: function(current, distance, time, lowerMargin, wrapperSize, deceleration) {
			var speed = parseFloat(Math.abs(distance) / time),
				destination,
				duration;

			deceleration = deceleration === undefined ? 0.0006 : deceleration;
			destination = current + (speed * speed) / (2 * deceleration) * (distance < 0 ? -1 : 1);
			duration = speed / deceleration;
			if (destination < lowerMargin) {
				destination = wrapperSize ? lowerMargin - (wrapperSize / 2.5 * (speed / 8)) : lowerMargin;
				distance = Math.abs(destination - current);
				duration = distance / speed;
			} else if (destination > 0) {
				destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
				distance = Math.abs(current) + destination;
				duration = distance / speed;
			}

			return {
				destination: Math.round(destination),
				duration: duration
			};
		},
		_getTranslateStr: function(x, y) {
			if (this.options.hardwareAccelerated) {
				return 'translate3d(' + x + 'px,' + y + 'px,0px) ' + this.translateZ;
			}
			return 'translate(' + x + 'px,' + y + 'px) ';
		},
		//API
		setStopped: function(stopped) {
			this.stopped = !!stopped;
		},
		setTranslate: function(x, y) {
			this.x = x;
			this.y = y;
			this.scrollerStyle['webkitTransform'] = this._getTranslateStr(x, y);
			if (this.parallaxElement && this.options.scrollY) { //目前仅支持竖向视差效果
				var parallaxY = y * this.options.parallaxRatio;
				var scale = 1 + parallaxY / ((this.parallaxHeight - parallaxY) / 2);
				if (scale > 1) {
					this.parallaxImgStyle['opacity'] = 1 - parallaxY / 100 * this.options.parallaxRatio;
					this.parallaxStyle['webkitTransform'] = this._getTranslateStr(0, -parallaxY) + ' scale(' + scale + ',' + scale + ')';
				} else {
					this.parallaxImgStyle['opacity'] = 1;
					this.parallaxStyle['webkitTransform'] = this._getTranslateStr(0, -1) + ' scale(1,1)';
				}
			}
			if (this.indicators) {
				for (var i = this.indicators.length; i--;) {
					this.indicators[i].updatePosition();
				}
			}
			this.lastX = this.x;
			this.lastY = this.y;
			$.trigger(this.scroller, 'scroll', this);
		},
		reLayout: function() {
			this.wrapper.offsetHeight;

			var paddingLeft = parseFloat($.getStyles(this.wrapper, 'padding-left')) || 0;
			var paddingRight = parseFloat($.getStyles(this.wrapper, 'padding-right')) || 0;
			var paddingTop = parseFloat($.getStyles(this.wrapper, 'padding-top')) || 0;
			var paddingBottom = parseFloat($.getStyles(this.wrapper, 'padding-bottom')) || 0;

			var clientWidth = this.wrapper.clientWidth;
			var clientHeight = this.wrapper.clientHeight;

			this.scrollerWidth = this.scroller.offsetWidth;
			this.scrollerHeight = this.scroller.offsetHeight;

			this.wrapperWidth = clientWidth - paddingLeft - paddingRight;
			this.wrapperHeight = clientHeight - paddingTop - paddingBottom;

			this.maxScrollX = Math.min(this.wrapperWidth - this.scrollerWidth, 0);
			this.maxScrollY = Math.min(this.wrapperHeight - this.scrollerHeight, 0);
			this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0;
			this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0;
			this._reLayout();
		},
		resetPosition: function(time) {
			var x = this.x,
				y = this.y;

			time = time || 0;
			if (!this.hasHorizontalScroll || this.x > 0) {
				x = 0;
			} else if (this.x < this.maxScrollX) {
				x = this.maxScrollX;
			}

			if (!this.hasVerticalScroll || this.y > 0) {
				y = 0;
			} else if (this.y < this.maxScrollY) {
				y = this.maxScrollY;
			}

			if (x == this.x && y == this.y) {
				return false;
			}
			this.scrollTo(x, y, time, this.options.scrollEasing);

			return true;
		},
		_reInit: function() {
			var groups = this.wrapper.querySelectorAll('.' + CLASS_SCROLL);
			for (var i = 0, len = groups.length; i < len; i++) {
				if (groups[i].parentNode === this.wrapper) {
					this.scroller = groups[i];
					break;
				}
			}
			this.scrollerStyle = this.scroller && this.scroller.style;
		},
		refresh: function() {
			this._reInit();
			this.reLayout();
			$.trigger(this.scroller, 'refresh', this);
			this.resetPosition();
		},
		scrollTo: function(x, y, time, easing) {
			var easing = easing || ease.circular;
			//			this.isInTransition = time > 0 && (this.lastX != x || this.lastY != y);
			//暂不严格判断x,y，否则会导致部分版本上不正常触发轮播
			this.isInTransition = time > 0;
			if (this.isInTransition) {
				this._clearRequestAnimationFrame();
				this._transitionTimingFunction(easing.style);
				this._transitionTime(time);
				this.setTranslate(x, y);
			} else {
				this.setTranslate(x, y);
			}

		},
		scrollToBottom: function(time, easing) {
			time = time || this.options.scrollTime;
			this.scrollTo(0, this.maxScrollY, time, easing);
		},
		gotoPage: function(index) {
			this._gotoPage(index);
		},
		destroy: function() {
			this._initEvent(true); //detach
			delete $.data[this.wrapper.getAttribute('data-scroll')];
			this.wrapper.setAttribute('data-scroll', '');
		}
	});
	//Indicator
	var Indicator = function(scroller, options) {
		this.wrapper = typeof options.el == 'string' ? document.querySelector(options.el) : options.el;
		this.wrapperStyle = this.wrapper.style;
		this.indicator = this.wrapper.children[0];
		this.indicatorStyle = this.indicator.style;
		this.scroller = scroller;

		this.options = $.extend({
			listenX: true,
			listenY: true,
			fade: false,
			speedRatioX: 0,
			speedRatioY: 0
		}, options);

		this.sizeRatioX = 1;
		this.sizeRatioY = 1;
		this.maxPosX = 0;
		this.maxPosY = 0;

		if (this.options.fade) {
			this.wrapperStyle['webkitTransform'] = this.scroller.translateZ;
			this.wrapperStyle['webkitTransitionDuration'] = this.options.fixedBadAndorid && $.os.isBadAndroid ? '0.001s' : '0ms';
			this.wrapperStyle.opacity = '0';
		}
	}
	Indicator.prototype = {
		handleEvent: function(e) {

		},
		transitionTime: function(time) {
			time = time || 0;
			this.indicatorStyle['webkitTransitionDuration'] = time + 'ms';
			if (this.scroller.options.fixedBadAndorid && !time && $.os.isBadAndroid) {
				this.indicatorStyle['webkitTransitionDuration'] = '0.001s';
			}
		},
		transitionTimingFunction: function(easing) {
			this.indicatorStyle['webkitTransitionTimingFunction'] = easing;
		},
		refresh: function() {
			this.transitionTime();

			if (this.options.listenX && !this.options.listenY) {
				this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? 'block' : 'none';
			} else if (this.options.listenY && !this.options.listenX) {
				this.indicatorStyle.display = this.scroller.hasVerticalScroll ? 'block' : 'none';
			} else {
				this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? 'block' : 'none';
			}

			this.wrapper.offsetHeight; // force refresh

			if (this.options.listenX) {
				this.wrapperWidth = this.wrapper.clientWidth;
				this.indicatorWidth = Math.max(Math.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8);
				this.indicatorStyle.width = this.indicatorWidth + 'px';

				this.maxPosX = this.wrapperWidth - this.indicatorWidth;

				this.minBoundaryX = 0;
				this.maxBoundaryX = this.maxPosX;

				this.sizeRatioX = this.options.speedRatioX || (this.scroller.maxScrollX && (this.maxPosX / this.scroller.maxScrollX));
			}

			if (this.options.listenY) {
				this.wrapperHeight = this.wrapper.clientHeight;
				this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8);
				this.indicatorStyle.height = this.indicatorHeight + 'px';

				this.maxPosY = this.wrapperHeight - this.indicatorHeight;

				this.minBoundaryY = 0;
				this.maxBoundaryY = this.maxPosY;

				this.sizeRatioY = this.options.speedRatioY || (this.scroller.maxScrollY && (this.maxPosY / this.scroller.maxScrollY));
			}

			this.updatePosition();
		},

		updatePosition: function() {
			var x = this.options.listenX && Math.round(this.sizeRatioX * this.scroller.x) || 0,
				y = this.options.listenY && Math.round(this.sizeRatioY * this.scroller.y) || 0;

			if (x < this.minBoundaryX) {
				this.width = Math.max(this.indicatorWidth + x, 8);
				this.indicatorStyle.width = this.width + 'px';
				x = this.minBoundaryX;
			} else if (x > this.maxBoundaryX) {
				this.width = Math.max(this.indicatorWidth - (x - this.maxPosX), 8);
				this.indicatorStyle.width = this.width + 'px';
				x = this.maxPosX + this.indicatorWidth - this.width;
			} else if (this.width != this.indicatorWidth) {
				this.width = this.indicatorWidth;
				this.indicatorStyle.width = this.width + 'px';
			}

			if (y < this.minBoundaryY) {
				this.height = Math.max(this.indicatorHeight + y * 3, 8);
				this.indicatorStyle.height = this.height + 'px';
				y = this.minBoundaryY;
			} else if (y > this.maxBoundaryY) {
				this.height = Math.max(this.indicatorHeight - (y - this.maxPosY) * 3, 8);
				this.indicatorStyle.height = this.height + 'px';
				y = this.maxPosY + this.indicatorHeight - this.height;
			} else if (this.height != this.indicatorHeight) {
				this.height = this.indicatorHeight;
				this.indicatorStyle.height = this.height + 'px';
			}

			this.x = x;
			this.y = y;

			this.indicatorStyle['webkitTransform'] = this.scroller._getTranslateStr(x, y);

		},
		fade: function(val, hold) {
			if (hold && !this.visible) {
				return;
			}

			clearTimeout(this.fadeTimeout);
			this.fadeTimeout = null;

			var time = val ? 250 : 500,
				delay = val ? 0 : 300;

			val = val ? '1' : '0';

			this.wrapperStyle['webkitTransitionDuration'] = time + 'ms';

			this.fadeTimeout = setTimeout((function(val) {
				this.wrapperStyle.opacity = val;
				this.visible = +val;
			}).bind(this, val), delay);
		}
	};

	$.Scroll = Scroll;

	$.fn.scroll = function(options) {
		var scrollApis = [];
		this.each(function() {
			var scrollApi = null;
			var self = this;
			var id = self.getAttribute('data-scroll');
			if (!id) {
				id = ++$.uuid;
				var _options = $.extend({}, options);
				if (self.classList.contains('mui-segmented-control')) {
					_options = $.extend(_options, {
						scrollY: false,
						scrollX: true,
						indicators: false,
						snap: '.mui-control-item'
					});
				}
				$.data[id] = scrollApi = new Scroll(self, _options);
				self.setAttribute('data-scroll', id);
			} else {
				scrollApi = $.data[id];
			}
			scrollApis.push(scrollApi);
		});
		return scrollApis.length === 1 ? scrollApis[0] : scrollApis;
	};
})(mui, window, document);
(function($, window, document, undefined) {

	var CLASS_VISIBILITY = 'mui-visibility';
	var CLASS_HIDDEN = 'mui-hidden';

	var PullRefresh = $.Scroll.extend($.extend({
		handleEvent: function(e) {
			this._super(e);
			if (e.type === 'scrollbottom') {
				if (e.target === this.scroller) {
					this._scrollbottom();
				}
			}
		},
		_scrollbottom: function() {
			if (!this.pulldown && !this.loading) {
				this.pulldown = false;
				this._initPullupRefresh();
				this.pullupLoading();
			}
		},
		_start: function(e) {
			//仅下拉刷新在start阻止默认事件
			if (e.touches && e.touches.length && e.touches[0].clientX > 30) {
				e.target && !this._preventDefaultException(e.target, this.options.preventDefaultException) && e.preventDefault();
			}
			if (!this.loading) {
				this.pulldown = this.pullPocket = this.pullCaption = this.pullLoading = false
			}
			this._super(e);
		},
		_drag: function(e) {
			this._super(e);
			if (!this.pulldown && !this.loading && this.topPocket && e.detail.direction === 'down' && this.y >= 0) {
				this._initPulldownRefresh();
			}
			if (this.pulldown) {
				this._setCaption(this.y > this.options.down.height ? this.options.down.contentover : this.options.down.contentdown);
			}
		},

		_reLayout: function() {
			this.hasVerticalScroll = true;
			this._super();
		},
		//API
		resetPosition: function(time) {
			if (this.pulldown) {
				if (this.y >= this.options.down.height) {
					this.pulldownLoading(undefined, time || 0);
					return true;
				} else {
					!this.loading && this.topPocket.classList.remove(CLASS_VISIBILITY);
				}
			}
			return this._super(time);
		},
		pulldownLoading: function(y, time) {
			typeof y === 'undefined' && (y = this.options.down.height); //默认高度
			this.scrollTo(0, y, time, this.options.bounceEasing);
			if (this.loading) {
				return;
			}
			//			if (!this.pulldown) {
			this._initPulldownRefresh();
			//			}
			this._setCaption(this.options.down.contentrefresh);
			this.loading = true;
			this.indicators.map(function(indicator) {
				indicator.fade(0);
			});
			var callback = this.options.down.callback;
			callback && callback.call(this);
		},
		endPulldownToRefresh: function() {
			var self = this;
			if (self.topPocket && self.loading && this.pulldown) {
				self.scrollTo(0, 0, self.options.bounceTime, self.options.bounceEasing);
				self.loading = false;
				self._setCaption(self.options.down.contentdown, true);
				setTimeout(function() {
					self.loading || self.topPocket.classList.remove(CLASS_VISIBILITY);
				}, 350);
			}
		},
		pullupLoading: function(callback, x, time) {
			x = x || 0;
			this.scrollTo(x, this.maxScrollY, time, this.options.bounceEasing);
			if (this.loading) {
				return;
			}
			this._initPullupRefresh();
			this._setCaption(this.options.up.contentrefresh);
			this.indicators.map(function(indicator) {
				indicator.fade(0);
			});
			this.loading = true;
			callback = callback || this.options.up.callback;
			callback && callback.call(this);
		},
		endPullupToRefresh: function(finished) {
			var self = this;
			if (self.bottomPocket) { // && self.loading && !this.pulldown
				self.loading = false;
				if (finished) {
					this.finished = true;
					self._setCaption(self.options.up.contentnomore);
					//					self.bottomPocket.classList.remove(CLASS_VISIBILITY);
					//					self.bottomPocket.classList.add(CLASS_HIDDEN);
					self.wrapper.removeEventListener('scrollbottom', self);
				} else {
					self._setCaption(self.options.up.contentdown);
					//					setTimeout(function() {
					self.loading || self.bottomPocket.classList.remove(CLASS_VISIBILITY);
					//					}, 300);
				}
			}
		},
		disablePullupToRefresh: function() {
			this._initPullupRefresh();
			this.bottomPocket.className = 'mui-pull-bottom-pocket' + ' ' + CLASS_HIDDEN;
			this.wrapper.removeEventListener('scrollbottom', this);
		},
		enablePullupToRefresh: function() {
			this._initPullupRefresh();
			this.bottomPocket.classList.remove(CLASS_HIDDEN);
			this._setCaption(this.options.up.contentdown);
			this.wrapper.addEventListener('scrollbottom', this);
		},
		refresh: function(isReset) {
			if (isReset && this.finished) {
				this.enablePullupToRefresh();
				this.finished = false;
			}
			this._super();
		},
	}, $.PullRefresh));
	$.fn.pullRefresh = function(options) {
		if (this.length === 1) {
			var self = this[0];
			var pullRefreshApi = null;
			var id = self.getAttribute('data-pullrefresh');
			if (!id && typeof options === 'undefined') {
				return false;
			}
			options = options || {};
			if (!id) {
				id = ++$.uuid;
				$.data[id] = pullRefreshApi = new PullRefresh(self, options);
				self.setAttribute('data-pullrefresh', id);
			} else {
				pullRefreshApi = $.data[id];
			}
			if (options.down && options.down.auto) { //如果设置了auto，则自动下拉一次
				pullRefreshApi.pulldownLoading(options.down.autoY);
			} else if (options.up && options.up.auto) { //如果设置了auto，则自动上拉一次
				pullRefreshApi.pullupLoading();
			}
			//暂不提供这种调用方式吧			
			//			if (typeof options === 'string') {
			//				var methodValue = pullRefreshApi[options].apply(pullRefreshApi, $.slice.call(arguments, 1));
			//				if (methodValue !== undefined) {
			//					return methodValue;
			//				}
			//			}
			return pullRefreshApi;
		}
	};
})(mui, window, document);
/**
 * snap 重构
 * @param {Object} $
 * @param {Object} window
 */
(function($, window) {
	var CLASS_SLIDER = 'mui-slider';
	var CLASS_SLIDER_GROUP = 'mui-slider-group';
	var CLASS_SLIDER_LOOP = 'mui-slider-loop';
	var CLASS_SLIDER_INDICATOR = 'mui-slider-indicator';
	var CLASS_ACTION_PREVIOUS = 'mui-action-previous';
	var CLASS_ACTION_NEXT = 'mui-action-next';
	var CLASS_SLIDER_ITEM = 'mui-slider-item';

	var CLASS_ACTIVE = 'mui-active';

	var SELECTOR_SLIDER_ITEM = '.' + CLASS_SLIDER_ITEM;
	var SELECTOR_SLIDER_INDICATOR = '.' + CLASS_SLIDER_INDICATOR;
	var SELECTOR_SLIDER_PROGRESS_BAR = '.mui-slider-progress-bar';

	var Slider = $.Slider = $.Scroll.extend({
		init: function(element, options) {
			this._super(element, $.extend(true, {
				fingers: 1,
				interval: 0, //设置为0，则不定时轮播
				scrollY: false,
				scrollX: true,
				indicators: false,
				scrollTime: 1000,
				startX: false,
				slideTime: 0, //滑动动画时间
				snap: SELECTOR_SLIDER_ITEM
			}, options));
			if (this.options.startX) {
				//				$.trigger(this.wrapper, 'scrollend', this);
			}
		},
		_init: function() {
			this._reInit();
			if (this.scroller) {
				this.scrollerStyle = this.scroller.style;
				this.progressBar = this.wrapper.querySelector(SELECTOR_SLIDER_PROGRESS_BAR);
				if (this.progressBar) {
					this.progressBarWidth = this.progressBar.offsetWidth;
					this.progressBarStyle = this.progressBar.style;
				}
				//忘记这个代码是干什么的了？
				//				this.x = this._getScroll();
				//				if (this.options.startX === false) {
				//					this.options.startX = this.x;
				//				}
				//根据active修正startX

				this._super();
				this._initTimer();
			}
		},
		_triggerSlide: function() {
			var self = this;
			self.isInTransition = false;
			var page = self.currentPage;
			self.slideNumber = self._fixedSlideNumber();
			if (self.loop) {
				if (self.slideNumber === 0) {
					self.setTranslate(self.pages[1][0].x, 0);
				} else if (self.slideNumber === self.itemLength - 3) {
					self.setTranslate(self.pages[self.itemLength - 2][0].x, 0);
				}
			}
			if (self.lastSlideNumber != self.slideNumber) {
				self.lastSlideNumber = self.slideNumber;
				self.lastPage = self.currentPage;
				$.trigger(self.wrapper, 'slide', {
					slideNumber: self.slideNumber
				});
			}
			self._initTimer();
		},
		_handleSlide: function(e) {
			var self = this;
			if (e.target !== self.wrapper) {
				return;
			}
			var detail = e.detail;
			detail.slideNumber = detail.slideNumber || 0;
			var temps = self.scroller.querySelectorAll(SELECTOR_SLIDER_ITEM);
			var items = [];
			for (var i = 0, len = temps.length; i < len; i++) {
				var item = temps[i];
				if (item.parentNode === self.scroller) {
					items.push(item);
				}
			}
			var _slideNumber = detail.slideNumber;
			if (self.loop) {
				_slideNumber += 1;
			}
			if (!self.wrapper.classList.contains('mui-segmented-control')) {
				for (var i = 0, len = items.length; i < len; i++) {
					var item = items[i];
					if (item.parentNode === self.scroller) {
						if (i === _slideNumber) {
							item.classList.add(CLASS_ACTIVE);
						} else {
							item.classList.remove(CLASS_ACTIVE);
						}
					}
				}
			}
			var indicatorWrap = self.wrapper.querySelector('.mui-slider-indicator');
			if (indicatorWrap) {
				if (indicatorWrap.getAttribute('data-scroll')) { //scroll
					$(indicatorWrap).scroll().gotoPage(detail.slideNumber);
				}
				var indicators = indicatorWrap.querySelectorAll('.mui-indicator');
				if (indicators.length > 0) { //图片轮播
					for (var i = 0, len = indicators.length; i < len; i++) {
						indicators[i].classList[i === detail.slideNumber ? 'add' : 'remove'](CLASS_ACTIVE);
					}
				} else {
					var number = indicatorWrap.querySelector('.mui-number span');
					if (number) { //图文表格
						number.innerText = (detail.slideNumber + 1);
					} else { //segmented controls
						var controlItems = indicatorWrap.querySelectorAll('.mui-control-item');
						for (var i = 0, len = controlItems.length; i < len; i++) {
							controlItems[i].classList[i === detail.slideNumber ? 'add' : 'remove'](CLASS_ACTIVE);
						}
					}
				}
			}
			e.stopPropagation();
		},
		_handleTabShow: function(e) {
			var self = this;
			self.gotoItem((e.detail.tabNumber || 0), self.options.slideTime);
		},
		_handleIndicatorTap: function(event) {
			var self = this;
			var target = event.target;
			if (target.classList.contains(CLASS_ACTION_PREVIOUS) || target.classList.contains(CLASS_ACTION_NEXT)) {
				self[target.classList.contains(CLASS_ACTION_PREVIOUS) ? 'prevItem' : 'nextItem']();
				event.stopPropagation();
			}
		},
		_initEvent: function(detach) {
			var self = this;
			self._super(detach);
			var action = detach ? 'removeEventListener' : 'addEventListener';
			self.wrapper[action]('slide', this);
			self.wrapper[action]($.eventName('shown', 'tab'), this);
		},
		handleEvent: function(e) {
			this._super(e);
			switch (e.type) {
				case 'slide':
					this._handleSlide(e);
					break;
				case $.eventName('shown', 'tab'):
					if (~this.snaps.indexOf(e.target)) { //避免嵌套监听错误的tab show
						this._handleTabShow(e);
					}
					break;
			}
		},
		_scrollend: function(e) {
			this._super(e);
			this._triggerSlide(e);
		},
		_drag: function(e) {
			this._super(e);
			var direction = e.detail.direction;
			if (direction === 'left' || direction === 'right') {
				//拖拽期间取消定时
				var slidershowTimer = this.wrapper.getAttribute('data-slidershowTimer');
				slidershowTimer && window.clearTimeout(slidershowTimer);

				e.stopPropagation();
			}
		},
		_initTimer: function() {
			var self = this;
			var slider = self.wrapper;
			var interval = self.options.interval;
			var slidershowTimer = slider.getAttribute('data-slidershowTimer');
			slidershowTimer && window.clearTimeout(slidershowTimer);
			if (interval) {
				slidershowTimer = window.setTimeout(function() {
					if (!slider) {
						return;
					}
					//仅slider显示状态进行自动轮播
					if (!!(slider.offsetWidth || slider.offsetHeight)) {
						self.nextItem(true);
						//下一个
					}
					self._initTimer();
				}, interval);
				slider.setAttribute('data-slidershowTimer', slidershowTimer);
			}
		},

		_fixedSlideNumber: function(page) {
			page = page || this.currentPage;
			var slideNumber = page.pageX;
			if (this.loop) {
				if (page.pageX === 0) {
					slideNumber = this.itemLength - 3;
				} else if (page.pageX === (this.itemLength - 1)) {
					slideNumber = 0;
				} else {
					slideNumber = page.pageX - 1;
				}
			}
			return slideNumber;
		},
		_reLayout: function() {
			this.hasHorizontalScroll = true;
			this.loop = this.scroller.classList.contains(CLASS_SLIDER_LOOP);
			this._super();
		},
		_getScroll: function() {
			var result = $.parseTranslateMatrix($.getStyles(this.scroller, 'webkitTransform'));
			return result ? result.x : 0;
		},
		_transitionEnd: function(e) {
			if (e.target !== this.scroller || !this.isInTransition) {
				return;
			}
			this._transitionTime();
			this.isInTransition = false;
			$.trigger(this.wrapper, 'scrollend', this);
		},
		_flick: function(e) {
			if (!this.moved) { //无moved
				return;
			}
			var detail = e.detail;
			var direction = detail.direction;
			this._clearRequestAnimationFrame();
			this.isInTransition = true;
			//			if (direction === 'up' || direction === 'down') {
			//				this.resetPosition(this.options.bounceTime);
			//				return;
			//			}
			if (e.type === 'flick') {
				if (detail.deltaTime < 200) { //flick，太容易触发，额外校验一下deltaTime
					this.x = this._getPage((this.slideNumber + (direction === 'right' ? -1 : 1)), true).x;
				}
				this.resetPosition(this.options.bounceTime);
			} else if (e.type === 'dragend' && !detail.flick) {
				this.resetPosition(this.options.bounceTime);
			}
			e.stopPropagation();
		},
		_initSnap: function() {
			this.scrollerWidth = this.itemLength * this.scrollerWidth;
			this.maxScrollX = Math.min(this.wrapperWidth - this.scrollerWidth, 0);
			this._super();
			if (!this.currentPage.x) {
				//当slider处于隐藏状态时，导致snap计算是错误的，临时先这么判断一下，后续要考虑解决所有scroll在隐藏状态下初始化属性不正确的问题
				var currentPage = this.pages[this.loop ? 1 : 0];
				currentPage = currentPage || this.pages[0];
				if (!currentPage) {
					return;
				}
				this.currentPage = currentPage[0];
				this.slideNumber = 0;
				this.lastSlideNumber = typeof this.lastSlideNumber === 'undefined' ? 0 : this.lastSlideNumber;
			} else {
				this.slideNumber = this._fixedSlideNumber();
				this.lastSlideNumber = typeof this.lastSlideNumber === 'undefined' ? this.slideNumber : this.lastSlideNumber;
			}
			this.options.startX = this.currentPage.x || 0;
		},
		_getSnapX: function(offsetLeft) {
			return Math.max(-offsetLeft, this.maxScrollX);
		},
		_getPage: function(slideNumber, isFlick) {
			if (this.loop) {
				if (slideNumber > (this.itemLength - (isFlick ? 2 : 3))) {
					slideNumber = 1;
					time = 0;
				} else if (slideNumber < (isFlick ? -1 : 0)) {
					slideNumber = this.itemLength - 2;
					time = 0;
				} else {
					slideNumber += 1;
				}
			} else {
				if (!isFlick) {
					if (slideNumber > (this.itemLength - 1)) {
						slideNumber = 0;
						time = 0;
					} else if (slideNumber < 0) {
						slideNumber = this.itemLength - 1;
						time = 0;
					}
				}
				slideNumber = Math.min(Math.max(0, slideNumber), this.itemLength - 1);
			}
			return this.pages[slideNumber][0];
		},
		_gotoItem: function(slideNumber, time) {
			this.currentPage = this._getPage(slideNumber, true); //此处传true。可保证程序切换时，动画与人手操作一致(第一张，最后一张的切换动画)
			this.scrollTo(this.currentPage.x, 0, time, this.options.scrollEasing);
			if (time === 0) {
				$.trigger(this.wrapper, 'scrollend', this);
			}
		},
		//API
		setTranslate: function(x, y) {
			this._super(x, y);
			var progressBar = this.progressBar;
			if (progressBar) {
				this.progressBarStyle.webkitTransform = this._getTranslateStr((-x * (this.progressBarWidth / this.wrapperWidth)), 0);
			}
		},
		resetPosition: function(time) {
			time = time || 0;
			if (this.x > 0) {
				this.x = 0;
			} else if (this.x < this.maxScrollX) {
				this.x = this.maxScrollX;
			}
			this.currentPage = this._nearestSnap(this.x);
			this.scrollTo(this.currentPage.x, 0, time, this.options.scrollEasing);
			return true;
		},
		gotoItem: function(slideNumber, time) {
			this._gotoItem(slideNumber, typeof time === 'undefined' ? this.options.scrollTime : time);
		},
		nextItem: function() {
			this._gotoItem(this.slideNumber + 1, this.options.scrollTime);
		},
		prevItem: function() {
			this._gotoItem(this.slideNumber - 1, this.options.scrollTime);
		},
		getSlideNumber: function() {
			return this.slideNumber || 0;
		},
		_reInit: function() {
			var groups = this.wrapper.querySelectorAll('.' + CLASS_SLIDER_GROUP);
			for (var i = 0, len = groups.length; i < len; i++) {
				if (groups[i].parentNode === this.wrapper) {
					this.scroller = groups[i];
					break;
				}
			}
			this.scrollerStyle = this.scroller && this.scroller.style;
			if (this.progressBar) {
				this.progressBarWidth = this.progressBar.offsetWidth;
				this.progressBarStyle = this.progressBar.style;
			}
		},
		refresh: function(options) {
			if (options) {
				$.extend(this.options, options);
				this._super();
				this._initTimer();
			} else {
				this._super();
			}
		},
		destroy: function() {
			this._initEvent(true); //detach
			delete $.data[this.wrapper.getAttribute('data-slider')];
			this.wrapper.setAttribute('data-slider', '');
		}
	});
	$.fn.slider = function(options) {
		var slider = null;
		this.each(function() {
			var sliderElement = this;
			if (!this.classList.contains(CLASS_SLIDER)) {
				sliderElement = this.querySelector('.' + CLASS_SLIDER);
			}
			if (sliderElement && sliderElement.querySelector(SELECTOR_SLIDER_ITEM)) {
				var id = sliderElement.getAttribute('data-slider');
				if (!id) {
					id = ++$.uuid;
					$.data[id] = slider = new Slider(sliderElement, options);
					sliderElement.setAttribute('data-slider', id);
				} else {
					slider = $.data[id];
					if (slider && options) {
						slider.refresh(options);
					}
				}
			}
		});
		return slider;
	};
	$.ready(function() {
		//		setTimeout(function() {
		$('.mui-slider').slider();
		$('.mui-scroll-wrapper.mui-slider-indicator.mui-segmented-control').scroll({
			scrollY: false,
			scrollX: true,
			indicators: false,
			snap: '.mui-control-item'
		});
		//		}, 500); //临时处理slider宽度计算不正确的问题(初步确认是scrollbar导致的)

	});
})(mui, window);
/**
 * pullRefresh 5+
 * @param {type} $
 * @returns {undefined}
 */
(function($, document) {
    if (!($.os.plus)) { //仅在5+android支持多webview的使用
        return;
    }
    $.plusReady(function() {
        if (window.__NWin_Enable__ === false) { //不支持多webview，则不用5+下拉刷新
            return;
        }
        var CLASS_PLUS_PULLREFRESH = 'mui-plus-pullrefresh';
        var CLASS_VISIBILITY = 'mui-visibility';
        var CLASS_HIDDEN = 'mui-hidden';
        var CLASS_BLOCK = 'mui-block';

        var CLASS_PULL_CAPTION = 'mui-pull-caption';
        var CLASS_PULL_CAPTION_DOWN = 'mui-pull-caption-down';
        var CLASS_PULL_CAPTION_REFRESH = 'mui-pull-caption-refresh';
        var CLASS_PULL_CAPTION_NOMORE = 'mui-pull-caption-nomore';

        var PlusPullRefresh = $.Class.extend({
            init: function(element, options) {
                this.element = element;
                this.options = options;
                this.wrapper = this.scroller = element;
                this._init();
                this._initPulldownRefreshEvent();
            },
            _init: function() {
                var self = this;
                //document.addEventListener('plusscrollbottom', this);
                window.addEventListener('dragup', self);
                document.addEventListener("plusscrollbottom", self);
                self.scrollInterval = window.setInterval(function() {
                    if (self.isScroll && !self.loading) {
                        if (window.pageYOffset + window.innerHeight + 10 >= document.documentElement.scrollHeight) {
                            self.isScroll = false; //放在这里是因为快速滚动的话，有可能检测时，还没到底，所以只要有滚动，没到底之前一直检测高度变化
                            if (self.bottomPocket) {
                                self.pullupLoading();
                            }
                        }
                    }
                }, 100);
            },
            _initPulldownRefreshEvent: function() {
                var self = this;
                $.plusReady(function() {
                		if(self.options.down.style == "circle"){
	                		//单webview、原生转圈
	                		self.options.webview = plus.webview.currentWebview();
						self.options.webview.setPullToRefresh({
							support: true,
							color:self.options.down.color || '#2BD009',
							height: self.options.down.height || '50px',
							range: self.options.down.range || '100px',
							style: 'circle',
							offset: self.options.down.offset || '0px'
						}, function() {
							self.options.down.callback();
						});
	               }else if (self.topPocket && self.options.webviewId) {
                        var webview = plus.webview.getWebviewById(self.options.webviewId);//子窗口
                        if (!webview) {
                            return;
                        }
                        self.options.webview = webview;
                        var downOptions = self.options.down;
                        var height = downOptions.height;
                        webview.addEventListener('close', function() {
                            var attrWebviewId = self.options.webviewId && self.options.webviewId.replace(/\//g, "_"); //替换所有"/" 
                            self.element.removeAttribute('data-pullrefresh-plus-' + attrWebviewId);
                        });
                        webview.addEventListener("dragBounce", function(e) {
                            if (!self.pulldown) {
                                self._initPulldownRefresh();
                            } else {
                                self.pullPocket.classList.add(CLASS_BLOCK);
                            }
                            switch (e.status) {
                                case "beforeChangeOffset": //下拉可刷新状态
                                    self._setCaption(downOptions.contentdown);
                                    break;
                                case "afterChangeOffset": //松开可刷新状态
                                    self._setCaption(downOptions.contentover);
                                    break;
                                case "dragEndAfterChangeOffset": //正在刷新状态
                                    //执行下拉刷新所在webview的回调函数
                                    webview.evalJS("window.mui&&mui.options.pullRefresh.down.callback()");
                                    self._setCaption(downOptions.contentrefresh);
                                    break;
                                default:
                                    break;
                            }
                        }, false);
                        
                        webview.setBounce({
                            position: {
                                top: height * 2 + 'px'
                            },
                            changeoffset: {
                                top: height + 'px'
                            }
                        });
                    
	                }
                });
            },
            handleEvent: function(e) {
                var self = this;
                if (self.stopped) {
                    return;
                }
                self.isScroll = false;
                if (e.type === 'dragup' || e.type === 'plusscrollbottom') {
                    self.isScroll = true;
                    setTimeout(function() {
                        self.isScroll = false;
                    }, 1000);
                }
            }
        }).extend($.extend({
            setStopped: function(stopped) { //该方法是子页面调用的
                this.stopped = !!stopped;
                //TODO 此处需要设置当前webview的bounce为none,目前5+有BUG
                var webview = plus.webview.currentWebview();
                if (this.stopped) {
                    webview.setStyle({
                        bounce: 'none'
                    });
                    webview.setBounce({
                        position: {
                            top: 'none'
                        }
                    });
                } else {
                    var height = this.options.down.height;
                    webview.setStyle({
                        bounce: 'vertical'
                    });
                    webview.setBounce({
                        position: {
                            top: height * 2 + 'px'
                        },
                        changeoffset: {
                            top: height + 'px'
                        }
                    });
                }
            },
            beginPulldown:function() { 
            		var self = this;
                $.plusReady(function() {
                		//这里延时的目的是为了保证下拉刷新组件初始化完成，后续应该做成有状态的
                		setTimeout(function () {
                			if(self.options.down.style == "circle"){//单webview下拉刷新
	                			plus.webview.currentWebview().beginPullToRefresh();
	                		}else{//双webview模式
	                			var webview = self.options.webview;
	                			if(webview){
	                				webview.setBounce({
			                        offset: {
			                            top: self.options.down.height + "px"
			                        }
			                    });
	                			}
	                		}
                		},15);
                }.bind(this));
            },
            pulldownLoading: function () {//该方法是子页面调用的，兼容老的历史API
            		this.beginPulldown();
            },
            _pulldownLoading: function() { //该方法是父页面调用的
                var self = this;
                $.plusReady(function() {
                    var childWebview = plus.webview.getWebviewById(self.options.webviewId);
                   	childWebview && childWebview.setBounce({
                        offset: {
                            top: self.options.down.height + "px"
                        }
                    });
                });
            },
            endPulldown:function(){
            		var _wv = plus.webview.currentWebview();
                //双webview的下拉刷新，需要修改父窗口提示信息
                if(_wv.parent() && this.options.down.style !== "circle"){
	                	_wv.parent().evalJS("mui&&mui(document.querySelector('.mui-content')).pullRefresh('" + JSON.stringify({
	                    webviewId: _wv.id
	                }) + "')._endPulldownToRefresh()");
                }else{
                		_wv.endPullToRefresh();
                }
            },
            endPulldownToRefresh: function () {//该方法是子页面调用的，兼容老的历史API
           	 	this.endPulldown();
            }, 
            _endPulldownToRefresh: function() { //该方法是父页面调用的
                var self = this;
                if (self.topPocket && self.options.webview) {
                    self.options.webview.endPullToRefresh(); //下拉刷新所在webview回弹
                    self.loading = false;
                    self._setCaption(self.options.down.contentdown, true);
                    setTimeout(function() {
                        self.loading || self.topPocket.classList.remove(CLASS_BLOCK);
                    }, 350);
                }
            },
            beginPullup:function(callback) {//开始上拉加载
                var self = this;
                if (self.isLoading) return;
                self.isLoading = true;
                if (self.pulldown !== false) {
                    self._initPullupRefresh();
                } else {
                    this.pullPocket.classList.add(CLASS_BLOCK);
                }
                setTimeout(function() {
                    self.pullLoading.classList.add(CLASS_VISIBILITY);
                    self.pullLoading.classList.remove(CLASS_HIDDEN);
                    self.pullCaption.innerHTML = ''; //修正5+里边第一次加载时，文字显示的bug(还会显示出来个“多”,猜测应该是渲染问题导致的)
                    self.pullCaption.className = CLASS_PULL_CAPTION + ' ' + CLASS_PULL_CAPTION_REFRESH;
                    self.pullCaption.innerHTML = self.options.up.contentrefresh;
                    callback = callback || self.options.up.callback;
                    callback && callback.call(self);
                }, 300);
            },
            pullupLoading:function (callback) {//兼容老的API
            		this.beginPullup(callback);
            },
            endPullup:function(finished) {//上拉加载结束
                var self = this;
                if (self.pullLoading) {
                    self.pullLoading.classList.remove(CLASS_VISIBILITY);
                    self.pullLoading.classList.add(CLASS_HIDDEN);
                    self.isLoading = false;
                    if (finished) {
                        self.finished = true;
                        self.pullCaption.className = CLASS_PULL_CAPTION + ' ' + CLASS_PULL_CAPTION_NOMORE;
                        self.pullCaption.innerHTML = self.options.up.contentnomore;
                        //取消5+的plusscrollbottom事件
                        document.removeEventListener('plusscrollbottom', self);
                        window.removeEventListener('dragup', self);
                    } else { //初始化时隐藏，后续不再隐藏
                        self.pullCaption.className = CLASS_PULL_CAPTION + ' ' + CLASS_PULL_CAPTION_DOWN;
                        self.pullCaption.innerHTML = self.options.up.contentdown;
                    }
                }
            },
            endPullupToRefresh: function (finished) {//上拉加载结束，兼容老的API
            		this.endPullup(finished);
            },
            disablePullupToRefresh: function() {
                this._initPullupRefresh();
                this.bottomPocket.className = 'mui-pull-bottom-pocket' + ' ' + CLASS_HIDDEN;
                window.removeEventListener('dragup', this);
            },
            enablePullupToRefresh: function() {
                this._initPullupRefresh();
                this.bottomPocket.classList.remove(CLASS_HIDDEN);
                this.pullCaption.className = CLASS_PULL_CAPTION + ' ' + CLASS_PULL_CAPTION_DOWN;
                this.pullCaption.innerHTML = this.options.up.contentdown;
                document.addEventListener("plusscrollbottom", this);
                window.addEventListener('dragup', this);
            },
            scrollTo: function(x, y, time) {
                $.scrollTo(y, time);
            },
            scrollToBottom: function(time) {
                $.scrollTo(document.documentElement.scrollHeight, time);
            },
            refresh: function(isReset) {
                if (isReset && this.finished) {
                    this.enablePullupToRefresh();
                    this.finished = false;
                }
            }
        }, $.PullRefresh));

        //override h5 pullRefresh
        $.fn.pullRefresh_native = function(options) {
            var self;
            if (this.length === 0) {
                self = document.createElement('div');
                self.className = 'mui-content';
                document.body.appendChild(self);
            } else {
                self = this[0];
            }
            var args = options;
            //一个父需要支持多个子下拉刷新
            options = options || {}
            if (typeof options === 'string') {
                options = $.parseJSON(options);
            };
            !options.webviewId && (options.webviewId = (plus.webview.currentWebview().id || plus.webview.currentWebview().getURL()));
            var pullRefreshApi = null;
            var attrWebviewId = options.webviewId && options.webviewId.replace(/\//g, "_"); //替换所有"/"
            var id = self.getAttribute('data-pullrefresh-plus-' + attrWebviewId);
            if (!id && typeof args === 'undefined') {
                return false;
            }
            if (!id) { //避免重复初始化5+ pullrefresh
                id = ++$.uuid;
                self.setAttribute('data-pullrefresh-plus-' + attrWebviewId, id);
                document.body.classList.add(CLASS_PLUS_PULLREFRESH);
                $.data[id] = pullRefreshApi = new PlusPullRefresh(self, options);
            } else {
                pullRefreshApi = $.data[id];
            }
            if (options.down && options.down.auto) { //如果设置了auto，则自动下拉一次
                //pullRefreshApi._pulldownLoading(); //parent webview
                pullRefreshApi.beginPulldown();
            } else if (options.up && options.up.auto) { //如果设置了auto，则自动上拉一次
                pullRefreshApi.beginPullup();
            }
            return pullRefreshApi;
        };
    });

})(mui, document);
/**
 * off-canvas
 * @param {type} $
 * @param {type} window
 * @param {type} document
 * @param {type} action
 * @returns {undefined}
 */
(function($, window, document, name) {
	var CLASS_OFF_CANVAS_LEFT = 'mui-off-canvas-left';
	var CLASS_OFF_CANVAS_RIGHT = 'mui-off-canvas-right';
	var CLASS_ACTION_BACKDROP = 'mui-off-canvas-backdrop';
	var CLASS_OFF_CANVAS_WRAP = 'mui-off-canvas-wrap';

	var CLASS_SLIDE_IN = 'mui-slide-in';
	var CLASS_ACTIVE = 'mui-active';


	var CLASS_TRANSITIONING = 'mui-transitioning';

	var SELECTOR_INNER_WRAP = '.mui-inner-wrap';


	var OffCanvas = $.Class.extend({
		init: function(element, options) {
			this.wrapper = this.element = element;
			this.scroller = this.wrapper.querySelector(SELECTOR_INNER_WRAP);
			this.classList = this.wrapper.classList;
			if (this.scroller) {
				this.options = $.extend(true, {
					dragThresholdX: 10,
					scale: 0.8,
					opacity: 0.1,
					preventDefaultException: {
						tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|VIDEO)$/
					},
				}, options);
				document.body.classList.add('mui-fullscreen'); //fullscreen
				this.refresh();
				this.initEvent();
			}
		},
		_preventDefaultException: function(el, exceptions) {
			for (var i in exceptions) {
				if (exceptions[i].test(el[i])) {
					return true;
				}
			}
			return false;
		},
		refresh: function(offCanvas) {
			//			offCanvas && !offCanvas.classList.contains(CLASS_ACTIVE) && this.classList.remove(CLASS_ACTIVE);
			this.slideIn = this.classList.contains(CLASS_SLIDE_IN);
			this.scalable = this.classList.contains('mui-scalable') && !this.slideIn;
			this.scroller = this.wrapper.querySelector(SELECTOR_INNER_WRAP);
			//			!offCanvas && this.scroller.classList.remove(CLASS_TRANSITIONING);
			//			!offCanvas && this.scroller.setAttribute('style', '');
			this.offCanvasLefts = this.wrapper.querySelectorAll('.' + CLASS_OFF_CANVAS_LEFT);
			this.offCanvasRights = this.wrapper.querySelectorAll('.' + CLASS_OFF_CANVAS_RIGHT);
			if (offCanvas) {
				if (offCanvas.classList.contains(CLASS_OFF_CANVAS_LEFT)) {
					this.offCanvasLeft = offCanvas;
				} else if (offCanvas.classList.contains(CLASS_OFF_CANVAS_RIGHT)) {
					this.offCanvasRight = offCanvas;
				}
			} else {
				this.offCanvasRight = this.wrapper.querySelector('.' + CLASS_OFF_CANVAS_RIGHT);
				this.offCanvasLeft = this.wrapper.querySelector('.' + CLASS_OFF_CANVAS_LEFT);
			}
			this.offCanvasRightWidth = this.offCanvasLeftWidth = 0;
			this.offCanvasLeftSlideIn = this.offCanvasRightSlideIn = false;
			if (this.offCanvasRight) {
				this.offCanvasRightWidth = this.offCanvasRight.offsetWidth;
				this.offCanvasRightSlideIn = this.slideIn && (this.offCanvasRight.parentNode === this.wrapper);
				//				this.offCanvasRight.classList.remove(CLASS_TRANSITIONING);
				//				this.offCanvasRight.classList.remove(CLASS_ACTIVE);
				//				this.offCanvasRight.setAttribute('style', '');
			}
			if (this.offCanvasLeft) {
				this.offCanvasLeftWidth = this.offCanvasLeft.offsetWidth;
				this.offCanvasLeftSlideIn = this.slideIn && (this.offCanvasLeft.parentNode === this.wrapper);
				//				this.offCanvasLeft.classList.remove(CLASS_TRANSITIONING);
				//				this.offCanvasLeft.classList.remove(CLASS_ACTIVE);
				//				this.offCanvasLeft.setAttribute('style', '');
			}
			this.backdrop = this.scroller.querySelector('.' + CLASS_ACTION_BACKDROP);

			this.options.dragThresholdX = this.options.dragThresholdX || 10;

			this.visible = false;
			this.startX = null;
			this.lastX = null;
			this.offsetX = null;
			this.lastTranslateX = null;
		},
		handleEvent: function(e) {
			switch (e.type) {
				case $.EVENT_START:
					e.target && !this._preventDefaultException(e.target, this.options.preventDefaultException) && e.preventDefault();
					break;
				case 'webkitTransitionEnd': //有个bug需要处理，需要考虑假设没有触发webkitTransitionEnd的情况
					if (e.target === this.scroller) {
						this._dispatchEvent();
					}
					break;
				case 'drag':
					var detail = e.detail;
					if (!this.startX) {
						this.startX = detail.center.x;
						this.lastX = this.startX;
					} else {
						this.lastX = detail.center.x;
					}
					if (!this.isDragging && Math.abs(this.lastX - this.startX) > this.options.dragThresholdX && (detail.direction === 'left' || (detail.direction === 'right'))) {
						if (this.slideIn) {
							this.scroller = this.wrapper.querySelector(SELECTOR_INNER_WRAP);
							if (this.classList.contains(CLASS_ACTIVE)) {
								if (this.offCanvasRight && this.offCanvasRight.classList.contains(CLASS_ACTIVE)) {
									this.offCanvas = this.offCanvasRight;
									this.offCanvasWidth = this.offCanvasRightWidth;
								} else {
									this.offCanvas = this.offCanvasLeft;
									this.offCanvasWidth = this.offCanvasLeftWidth;
								}
							} else {
								if (detail.direction === 'left' && this.offCanvasRight) {
									this.offCanvas = this.offCanvasRight;
									this.offCanvasWidth = this.offCanvasRightWidth;
								} else if (detail.direction === 'right' && this.offCanvasLeft) {
									this.offCanvas = this.offCanvasLeft;
									this.offCanvasWidth = this.offCanvasLeftWidth;
								} else {
									this.scroller = null;
								}
							}
						} else {
							if (this.classList.contains(CLASS_ACTIVE)) {
								if (detail.direction === 'left') {
									this.offCanvas = this.offCanvasLeft;
									this.offCanvasWidth = this.offCanvasLeftWidth;
								} else {
									this.offCanvas = this.offCanvasRight;
									this.offCanvasWidth = this.offCanvasRightWidth;
								}
							} else {
								if (detail.direction === 'right') {
									this.offCanvas = this.offCanvasLeft;
									this.offCanvasWidth = this.offCanvasLeftWidth;
								} else {
									this.offCanvas = this.offCanvasRight;
									this.offCanvasWidth = this.offCanvasRightWidth;
								}
							}
						}
						if (this.offCanvas && this.scroller) {
							this.startX = this.lastX;
							this.isDragging = true;

							$.gestures.session.lockDirection = true; //锁定方向
							$.gestures.session.startDirection = detail.direction;

							this.offCanvas.classList.remove(CLASS_TRANSITIONING);
							this.scroller.classList.remove(CLASS_TRANSITIONING);
							this.offsetX = this.getTranslateX();
							this._initOffCanvasVisible();
						}
					}
					if (this.isDragging) {
						this.updateTranslate(this.offsetX + (this.lastX - this.startX));
						detail.gesture.preventDefault();
						e.stopPropagation();
					}
					break;
				case 'dragend':
					if (this.isDragging) {
						var detail = e.detail;
						var direction = detail.direction;
						this.isDragging = false;
						this.offCanvas.classList.add(CLASS_TRANSITIONING);
						this.scroller.classList.add(CLASS_TRANSITIONING);
						var ratio = 0;
						var x = this.getTranslateX();
						if (!this.slideIn) {
							if (x >= 0) {
								ratio = (this.offCanvasLeftWidth && (x / this.offCanvasLeftWidth)) || 0;
							} else {
								ratio = (this.offCanvasRightWidth && (x / this.offCanvasRightWidth)) || 0;
							}
							if (ratio === 0) {
								this.openPercentage(0);
								this._dispatchEvent(); //此处不触发webkitTransitionEnd,所以手动dispatch
								return;
							}
							if (direction === 'right' && ratio >= 0 && (ratio >= 0.5 || detail.swipe)) { //右滑打开
								this.openPercentage(100);
							} else if (direction === 'right' && ratio < 0 && (ratio > -0.5 || detail.swipe)) { //右滑关闭
								this.openPercentage(0);
							} else if (direction === 'right' && ratio > 0 && ratio < 0.5) { //右滑还原关闭
								this.openPercentage(0);
							} else if (direction === 'right' && ratio < 0.5) { //右滑还原打开
								this.openPercentage(-100);
							} else if (direction === 'left' && ratio <= 0 && (ratio <= -0.5 || detail.swipe)) { //左滑打开
								this.openPercentage(-100);
							} else if (direction === 'left' && ratio > 0 && (ratio <= 0.5 || detail.swipe)) { //左滑关闭
								this.openPercentage(0);
							} else if (direction === 'left' && ratio < 0 && ratio >= -0.5) { //左滑还原关闭
								this.openPercentage(0);
							} else if (direction === 'left' && ratio > 0.5) { //左滑还原打开
								this.openPercentage(100);
							} else { //默认关闭
								this.openPercentage(0);
							}
							if (ratio === 1 || ratio === -1) { //此处不触发webkitTransitionEnd,所以手动dispatch
								this._dispatchEvent();
							}
						} else {
							if (x >= 0) {
								ratio = (this.offCanvasRightWidth && (x / this.offCanvasRightWidth)) || 0;
							} else {
								ratio = (this.offCanvasLeftWidth && (x / this.offCanvasLeftWidth)) || 0;
							}
							if (direction === 'right' && ratio <= 0 && (ratio >= -0.5 || detail.swipe)) { //右滑打开
								this.openPercentage(100);
							} else if (direction === 'right' && ratio > 0 && (ratio >= 0.5 || detail.swipe)) { //右滑关闭
								this.openPercentage(0);
							} else if (direction === 'right' && ratio <= -0.5) { //右滑还原关闭
								this.openPercentage(0);
							} else if (direction === 'right' && ratio > 0 && ratio <= 0.5) { //右滑还原打开
								this.openPercentage(-100);
							} else if (direction === 'left' && ratio >= 0 && (ratio <= 0.5 || detail.swipe)) { //左滑打开
								this.openPercentage(-100);
							} else if (direction === 'left' && ratio < 0 && (ratio <= -0.5 || detail.swipe)) { //左滑关闭
								this.openPercentage(0);
							} else if (direction === 'left' && ratio >= 0.5) { //左滑还原关闭
								this.openPercentage(0);
							} else if (direction === 'left' && ratio >= -0.5 && ratio < 0) { //左滑还原打开
								this.openPercentage(100);
							} else {
								this.openPercentage(0);
							}
							if (ratio === 1 || ratio === -1 || ratio === 0) {
								this._dispatchEvent();
								return;
							}

						}
					}
					break;
			}
		},
		_dispatchEvent: function() {
			if (this.classList.contains(CLASS_ACTIVE)) {
				$.trigger(this.wrapper, 'shown', this);
			} else {
				$.trigger(this.wrapper, 'hidden', this);
			}
		},
		_initOffCanvasVisible: function() {
			if (!this.visible) {
				this.visible = true;
				if (this.offCanvasLeft) {
					this.offCanvasLeft.style.visibility = 'visible';
				}
				if (this.offCanvasRight) {
					this.offCanvasRight.style.visibility = 'visible';
				}
			}
		},
		initEvent: function() {
			var self = this;
			if (self.backdrop) {
				self.backdrop.addEventListener('tap', function(e) {
					self.close();
					e.detail.gesture.preventDefault();
				});
			}
			if (this.classList.contains('mui-draggable')) {
				this.wrapper.addEventListener($.EVENT_START, this); //临时处理
				this.wrapper.addEventListener('drag', this);
				this.wrapper.addEventListener('dragend', this);
			}
			this.wrapper.addEventListener('webkitTransitionEnd', this);
		},
		openPercentage: function(percentage) {
			var p = percentage / 100;
			if (!this.slideIn) {
				if (this.offCanvasLeft && percentage >= 0) {
					this.updateTranslate(this.offCanvasLeftWidth * p);
					this.offCanvasLeft.classList[p !== 0 ? 'add' : 'remove'](CLASS_ACTIVE);
				} else if (this.offCanvasRight && percentage <= 0) {
					this.updateTranslate(this.offCanvasRightWidth * p);
					this.offCanvasRight.classList[p !== 0 ? 'add' : 'remove'](CLASS_ACTIVE);
				}
				this.classList[p !== 0 ? 'add' : 'remove'](CLASS_ACTIVE);
			} else {
				if (this.offCanvasLeft && percentage >= 0) {
					p = p === 0 ? -1 : 0;
					this.updateTranslate(this.offCanvasLeftWidth * p);
					this.offCanvasLeft.classList[percentage !== 0 ? 'add' : 'remove'](CLASS_ACTIVE);
				} else if (this.offCanvasRight && percentage <= 0) {
					p = p === 0 ? 1 : 0;
					this.updateTranslate(this.offCanvasRightWidth * p);
					this.offCanvasRight.classList[percentage !== 0 ? 'add' : 'remove'](CLASS_ACTIVE);
				}
				this.classList[percentage !== 0 ? 'add' : 'remove'](CLASS_ACTIVE);
			}
		},
		updateTranslate: function(x) {
			if (x !== this.lastTranslateX) {
				if (!this.slideIn) {
					if ((!this.offCanvasLeft && x > 0) || (!this.offCanvasRight && x < 0)) {
						this.setTranslateX(0);
						return;
					}
					if (this.leftShowing && x > this.offCanvasLeftWidth) {
						this.setTranslateX(this.offCanvasLeftWidth);
						return;
					}
					if (this.rightShowing && x < -this.offCanvasRightWidth) {
						this.setTranslateX(-this.offCanvasRightWidth);
						return;
					}
					this.setTranslateX(x);
					if (x >= 0) {
						this.leftShowing = true;
						this.rightShowing = false;
						if (x > 0) {
							if (this.offCanvasLeft) {
								$.each(this.offCanvasLefts, function(index, offCanvas) {
									if (offCanvas === this.offCanvasLeft) {
										this.offCanvasLeft.style.zIndex = 0;
									} else {
										offCanvas.style.zIndex = -1;
									}
								}.bind(this));
							}
							if (this.offCanvasRight) {
								this.offCanvasRight.style.zIndex = -1;
							}
						}
					} else {
						this.rightShowing = true;
						this.leftShowing = false;
						if (this.offCanvasRight) {
							$.each(this.offCanvasRights, function(index, offCanvas) {
								if (offCanvas === this.offCanvasRight) {
									offCanvas.style.zIndex = 0;
								} else {
									offCanvas.style.zIndex = -1;
								}
							}.bind(this));
						}
						if (this.offCanvasLeft) {
							this.offCanvasLeft.style.zIndex = -1;
						}
					}
				} else {
					if (this.offCanvas.classList.contains(CLASS_OFF_CANVAS_RIGHT)) {
						if (x < 0) {
							this.setTranslateX(0);
							return;
						}
						if (x > this.offCanvasRightWidth) {
							this.setTranslateX(this.offCanvasRightWidth);
							return;
						}
					} else {
						if (x > 0) {
							this.setTranslateX(0);
							return;
						}
						if (x < -this.offCanvasLeftWidth) {
							this.setTranslateX(-this.offCanvasLeftWidth);
							return;
						}
					}
					this.setTranslateX(x);
				}
				this.lastTranslateX = x;
			}
		},
		setTranslateX: $.animationFrame(function(x) {
			if (this.scroller) {
				if (this.scalable && this.offCanvas.parentNode === this.wrapper) {
					var percent = Math.abs(x) / this.offCanvasWidth;
					var zoomOutScale = 1 - (1 - this.options.scale) * percent;
					var zoomInScale = this.options.scale + (1 - this.options.scale) * percent;
					var zoomOutOpacity = 1 - (1 - this.options.opacity) * percent;
					var zoomInOpacity = this.options.opacity + (1 - this.options.opacity) * percent;
					if (this.offCanvas.classList.contains(CLASS_OFF_CANVAS_LEFT)) {
						this.offCanvas.style.webkitTransformOrigin = '-100%';
						this.scroller.style.webkitTransformOrigin = 'left';
					} else {
						this.offCanvas.style.webkitTransformOrigin = '200%';
						this.scroller.style.webkitTransformOrigin = 'right';
					}
					this.offCanvas.style.opacity = zoomInOpacity;
					this.offCanvas.style.webkitTransform = 'translate3d(0,0,0) scale(' + zoomInScale + ')';
					this.scroller.style.webkitTransform = 'translate3d(' + x + 'px,0,0) scale(' + zoomOutScale + ')';
				} else {
					if (this.slideIn) {
						this.offCanvas.style.webkitTransform = 'translate3d(' + x + 'px,0,0)';
					} else {
						this.scroller.style.webkitTransform = 'translate3d(' + x + 'px,0,0)';
					}
				}
			}
		}),
		getTranslateX: function() {
			if (this.offCanvas) {
				var scroller = this.slideIn ? this.offCanvas : this.scroller;
				var result = $.parseTranslateMatrix($.getStyles(scroller, 'webkitTransform'));
				return (result && result.x) || 0;
			}
			return 0;
		},
		isShown: function(direction) {
			var shown = false;
			if (!this.slideIn) {
				var x = this.getTranslateX();
				if (direction === 'right') {
					shown = this.classList.contains(CLASS_ACTIVE) && x < 0;
				} else if (direction === 'left') {
					shown = this.classList.contains(CLASS_ACTIVE) && x > 0;
				} else {
					shown = this.classList.contains(CLASS_ACTIVE) && x !== 0;
				}
			} else {
				if (direction === 'left') {
					shown = this.classList.contains(CLASS_ACTIVE) && this.wrapper.querySelector('.' + CLASS_OFF_CANVAS_LEFT + '.' + CLASS_ACTIVE);
				} else if (direction === 'right') {
					shown = this.classList.contains(CLASS_ACTIVE) && this.wrapper.querySelector('.' + CLASS_OFF_CANVAS_RIGHT + '.' + CLASS_ACTIVE);
				} else {
					shown = this.classList.contains(CLASS_ACTIVE) && (this.wrapper.querySelector('.' + CLASS_OFF_CANVAS_LEFT + '.' + CLASS_ACTIVE) || this.wrapper.querySelector('.' + CLASS_OFF_CANVAS_RIGHT + '.' + CLASS_ACTIVE));
				}
			}
			return shown;
		},
		close: function() {
			this._initOffCanvasVisible();
			this.offCanvas = this.wrapper.querySelector('.' + CLASS_OFF_CANVAS_RIGHT + '.' + CLASS_ACTIVE) || this.wrapper.querySelector('.' + CLASS_OFF_CANVAS_LEFT + '.' + CLASS_ACTIVE);
			this.offCanvasWidth = this.offCanvas.offsetWidth;
			if (this.scroller) {
				this.offCanvas.offsetHeight;
				this.offCanvas.classList.add(CLASS_TRANSITIONING);
				this.scroller.classList.add(CLASS_TRANSITIONING);
				this.openPercentage(0);
			}
		},
		show: function(direction) {
			this._initOffCanvasVisible();
			if (this.isShown(direction)) {
				return false;
			}
			if (!direction) {
				direction = this.wrapper.querySelector('.' + CLASS_OFF_CANVAS_RIGHT) ? 'right' : 'left';
			}
			if (direction === 'right') {
				this.offCanvas = this.offCanvasRight;
				this.offCanvasWidth = this.offCanvasRightWidth;
			} else {
				this.offCanvas = this.offCanvasLeft;
				this.offCanvasWidth = this.offCanvasLeftWidth;
			}
			if (this.scroller) {
				this.offCanvas.offsetHeight;
				this.offCanvas.classList.add(CLASS_TRANSITIONING);
				this.scroller.classList.add(CLASS_TRANSITIONING);
				this.openPercentage(direction === 'left' ? 100 : -100);
			}
			return true;
		},
		toggle: function(directionOrOffCanvas) {
			var direction = directionOrOffCanvas;
			if (directionOrOffCanvas && directionOrOffCanvas.classList) {
				direction = directionOrOffCanvas.classList.contains(CLASS_OFF_CANVAS_LEFT) ? 'left' : 'right';
				this.refresh(directionOrOffCanvas);
			}
			if (!this.show(direction)) {
				this.close();
			}
		}
	});

	//hash to offcanvas
	var findOffCanvasContainer = function(target) {
		parentNode = target.parentNode;
		if (parentNode) {
			if (parentNode.classList.contains(CLASS_OFF_CANVAS_WRAP)) {
				return parentNode;
			} else {
				parentNode = parentNode.parentNode;
				if (parentNode.classList.contains(CLASS_OFF_CANVAS_WRAP)) {
					return parentNode;
				}
			}
		}
	};
	var handle = function(event, target) {
		if (target.tagName === 'A' && target.hash) {
			var offcanvas = document.getElementById(target.hash.replace('#', ''));
			if (offcanvas) {
				var container = findOffCanvasContainer(offcanvas);
				if (container) {
					$.targets._container = container;
					return offcanvas;
				}
			}
		}
		return false;
	};

	$.registerTarget({
		name: name,
		index: 60,
		handle: handle,
		target: false,
		isReset: false,
		isContinue: true
	});

	window.addEventListener('tap', function(e) {
		if (!$.targets.offcanvas) {
			return;
		}
		//TODO 此处类型的代码后续考虑统一优化(target机制)，现在的实现费力不讨好
		var target = e.target;
		for (; target && target !== document; target = target.parentNode) {
			if (target.tagName === 'A' && target.hash && target.hash === ('#' + $.targets.offcanvas.id)) {
				e.detail && e.detail.gesture && e.detail.gesture.preventDefault(); //fixed hashchange
				$($.targets._container).offCanvas().toggle($.targets.offcanvas);
				$.targets.offcanvas = $.targets._container = null;
				break;
			}
		}
	});

	$.fn.offCanvas = function(options) {
		var offCanvasApis = [];
		this.each(function() {
			var offCanvasApi = null;
			var self = this;
			//hack old version
			if (!self.classList.contains(CLASS_OFF_CANVAS_WRAP)) {
				self = findOffCanvasContainer(self);
			}
			var id = self.getAttribute('data-offCanvas');
			if (!id) {
				id = ++$.uuid;
				$.data[id] = offCanvasApi = new OffCanvas(self, options);
				self.setAttribute('data-offCanvas', id);
			} else {
				offCanvasApi = $.data[id];
			}
			if (options === 'show' || options === 'close' || options === 'toggle') {
				offCanvasApi.toggle();
			}
			offCanvasApis.push(offCanvasApi);
		});
		return offCanvasApis.length === 1 ? offCanvasApis[0] : offCanvasApis;
	};
	$.ready(function() {
		$('.mui-off-canvas-wrap').offCanvas();
	});
})(mui, window, document, 'offcanvas');
/**
 * actions
 * @param {type} $
 * @param {type} name
 * @returns {undefined}
 */
(function($, name) {
	var CLASS_ACTION = 'mui-action';

	var handle = function(event, target) {
		var className = target.className || '';
		if (typeof className !== 'string') { //svg className(SVGAnimatedString)
			className = '';
		}
		if (className && ~className.indexOf(CLASS_ACTION)) {
			if (target.classList.contains('mui-action-back')) {
				event.preventDefault();
			}
			return target;
		}
		return false;
	};

	$.registerTarget({
		name: name,
		index: 50,
		handle: handle,
		target: false,
		isContinue: true
	});

})(mui, 'action');
/**
 * Modals
 * @param {type} $
 * @param {type} window
 * @param {type} document
 * @param {type} name
 * @returns {undefined}
 */
(function($, window, document, name) {
	var CLASS_MODAL = 'mui-modal';

	var handle = function(event, target) {
		if (target.tagName === 'A' && target.hash) {
			var modal = document.getElementById(target.hash.replace('#', ''));
			if (modal && modal.classList.contains(CLASS_MODAL)) {
				return modal;
			}
		}
		return false;
	};

	$.registerTarget({
		name: name,
		index: 50,
		handle: handle,
		target: false,
		isReset: false,
		isContinue: true
	});

	window.addEventListener('tap', function(event) {
		if ($.targets.modal) {
			event.detail.gesture.preventDefault(); //fixed hashchange
			$.targets.modal.classList.toggle('mui-active');
		}
	});
})(mui, window, document, 'modal');
/**
 * Popovers
 * @param {type} $
 * @param {type} window
 * @param {type} document
 * @param {type} name
 * @param {type} undefined
 * @returns {undefined}
 */
(function($, window, document, name) {

	var CLASS_POPOVER = 'mui-popover';
	var CLASS_POPOVER_ARROW = 'mui-popover-arrow';
	var CLASS_ACTION_POPOVER = 'mui-popover-action';
	var CLASS_BACKDROP = 'mui-backdrop';
	var CLASS_BAR_POPOVER = 'mui-bar-popover';
	var CLASS_BAR_BACKDROP = 'mui-bar-backdrop';
	var CLASS_ACTION_BACKDROP = 'mui-backdrop-action';
	var CLASS_ACTIVE = 'mui-active';
	var CLASS_BOTTOM = 'mui-bottom';



	var handle = function(event, target) {
		if (target.tagName === 'A' && target.hash) {
			$.targets._popover = document.getElementById(target.hash.replace('#', ''));
			if ($.targets._popover && $.targets._popover.classList.contains(CLASS_POPOVER)) {
				return target;
			} else {
				$.targets._popover = null;
			}
		}
		return false;
	};

	$.registerTarget({
		name: name,
		index: 60,
		handle: handle,
		target: false,
		isReset: false,
		isContinue: true
	});

	var onPopoverShown = function(e) {
		this.removeEventListener('webkitTransitionEnd', onPopoverShown);
		this.addEventListener($.EVENT_MOVE, $.preventDefault);
		$.trigger(this, 'shown', this);
	}
	var onPopoverHidden = function(e) {
		setStyle(this, 'none');
		this.removeEventListener('webkitTransitionEnd', onPopoverHidden);
		this.removeEventListener($.EVENT_MOVE, $.preventDefault);
		$.trigger(this, 'hidden', this);
	};

	var backdrop = (function() {
		var element = document.createElement('div');
		element.classList.add(CLASS_BACKDROP);
		element.addEventListener($.EVENT_MOVE, $.preventDefault);
		element.addEventListener('tap', function(e) {
			var popover = $.targets._popover;
			if (popover) {
				popover.addEventListener('webkitTransitionEnd', onPopoverHidden);
				popover.classList.remove(CLASS_ACTIVE);
				removeBackdrop(popover);
			}
		});

		return element;
	}());
	var removeBackdropTimer;
	var removeBackdrop = function(popover) {
		backdrop.setAttribute('style', 'opacity:0');
		$.targets.popover = $.targets._popover = null; //reset
		removeBackdropTimer = $.later(function() {
			if (!popover.classList.contains(CLASS_ACTIVE) && backdrop.parentNode && backdrop.parentNode === document.body) {
				document.body.removeChild(backdrop);
			}
		}, 350);
	};
	window.addEventListener('tap', function(e) {
		if (!$.targets.popover) {
			return;
		}
		var toggle = false;
		var target = e.target;
		for (; target && target !== document; target = target.parentNode) {
			if (target === $.targets.popover) {
				toggle = true;
			}
		}
		if (toggle) {
			e.detail.gesture.preventDefault(); //fixed hashchange
			togglePopover($.targets._popover, $.targets.popover);
		}

	});

	var togglePopover = function(popover, anchor, state) {
		if ((state === 'show' && popover.classList.contains(CLASS_ACTIVE)) || (state === 'hide' && !popover.classList.contains(CLASS_ACTIVE))) {
			return;
		}
		removeBackdropTimer && removeBackdropTimer.cancel(); //取消remove的timer
		//remove一遍，以免来回快速切换，导致webkitTransitionEnd不触发，无法remove
		popover.removeEventListener('webkitTransitionEnd', onPopoverShown);
		popover.removeEventListener('webkitTransitionEnd', onPopoverHidden);
		backdrop.classList.remove(CLASS_BAR_BACKDROP);
		backdrop.classList.remove(CLASS_ACTION_BACKDROP);
		var _popover = document.querySelector('.mui-popover.mui-active');
		if (_popover) {
			//			_popover.setAttribute('style', '');
			_popover.addEventListener('webkitTransitionEnd', onPopoverHidden);
			_popover.classList.remove(CLASS_ACTIVE);
			//			_popover.removeEventListener('webkitTransitionEnd', onPopoverHidden);
			//同一个弹出则直接返回，解决同一个popover的toggle
			if (popover === _popover) {
				removeBackdrop(_popover);
				return;
			}
		}
		var isActionSheet = false;
		if (popover.classList.contains(CLASS_BAR_POPOVER) || popover.classList.contains(CLASS_ACTION_POPOVER)) { //navBar
			if (popover.classList.contains(CLASS_ACTION_POPOVER)) { //action sheet popover
				isActionSheet = true;
				backdrop.classList.add(CLASS_ACTION_BACKDROP);
			} else { //bar popover
				backdrop.classList.add(CLASS_BAR_BACKDROP);
				//				if (anchor) {
				//					if (anchor.parentNode) {
				//						var offsetWidth = anchor.offsetWidth;
				//						var offsetLeft = anchor.offsetLeft;
				//						var innerWidth = window.innerWidth;
				//						popover.style.left = (Math.min(Math.max(offsetLeft, defaultPadding), innerWidth - offsetWidth - defaultPadding)) + "px";
				//					} else {
				//						//TODO anchor is position:{left,top,bottom,right}
				//					}
				//				}
			}
		}
		setStyle(popover, 'block'); //actionsheet transform
		popover.offsetHeight;
		popover.classList.add(CLASS_ACTIVE);
		backdrop.setAttribute('style', '');
		document.body.appendChild(backdrop);
		calPosition(popover, anchor, isActionSheet); //position
		backdrop.classList.add(CLASS_ACTIVE);
		popover.addEventListener('webkitTransitionEnd', onPopoverShown);
	};
	var setStyle = function(popover, display, top, left) {
		var style = popover.style;
		if (typeof display !== 'undefined')
			style.display = display;
		if (typeof top !== 'undefined')
			style.top = top + 'px';
		if (typeof left !== 'undefined')
			style.left = left + 'px';
	};
	var calPosition = function(popover, anchor, isActionSheet) {
		if (!popover || !anchor) {
			return;
		}

		if (isActionSheet) { //actionsheet
			setStyle(popover, 'block')
			return;
		}

		var wWidth = window.innerWidth;
		var wHeight = window.innerHeight;

		var pWidth = popover.offsetWidth;
		var pHeight = popover.offsetHeight;

		var aWidth = anchor.offsetWidth;
		var aHeight = anchor.offsetHeight;
		var offset = $.offset(anchor);

		var arrow = popover.querySelector('.' + CLASS_POPOVER_ARROW);
		if (!arrow) {
			arrow = document.createElement('div');
			arrow.className = CLASS_POPOVER_ARROW;
			popover.appendChild(arrow);
		}
		var arrowSize = arrow && arrow.offsetWidth / 2 || 0;



		var pTop = 0;
		var pLeft = 0;
		var diff = 0;
		var arrowLeft = 0;
		var defaultPadding = popover.classList.contains(CLASS_ACTION_POPOVER) ? 0 : 5;

		var position = 'top';
		if ((pHeight + arrowSize) < (offset.top - window.pageYOffset)) { //top
			pTop = offset.top - pHeight - arrowSize;
		} else if ((pHeight + arrowSize) < (wHeight - (offset.top - window.pageYOffset) - aHeight)) { //bottom
			position = 'bottom';
			pTop = offset.top + aHeight + arrowSize;
		} else { //middle
			position = 'middle';
			pTop = Math.max((wHeight - pHeight) / 2 + window.pageYOffset, 0);
			pLeft = Math.max((wWidth - pWidth) / 2 + window.pageXOffset, 0);
		}
		if (position === 'top' || position === 'bottom') {
			pLeft = aWidth / 2 + offset.left - pWidth / 2;
			diff = pLeft;
			if (pLeft < defaultPadding) pLeft = defaultPadding;
			if (pLeft + pWidth > wWidth) pLeft = wWidth - pWidth - defaultPadding;

			if (arrow) {
				if (position === 'top') {
					arrow.classList.add(CLASS_BOTTOM);
				} else {
					arrow.classList.remove(CLASS_BOTTOM);
				}
				diff = diff - pLeft;
				arrowLeft = (pWidth / 2 - arrowSize / 2 + diff);
				arrowLeft = Math.max(Math.min(arrowLeft, pWidth - arrowSize * 2 - 6), 6);
				arrow.setAttribute('style', 'left:' + arrowLeft + 'px');
			}
		} else if (position === 'middle') {
			arrow.setAttribute('style', 'display:none');
		}
		setStyle(popover, 'block', pTop, pLeft);
	};

	$.createMask = function(callback) {
		var element = document.createElement('div');
		element.classList.add(CLASS_BACKDROP);
		element.addEventListener($.EVENT_MOVE, $.preventDefault);
		element.addEventListener('tap', function() {
			mask.close();
		});
		var mask = [element];
		mask._show = false;
		mask.show = function() {
			mask._show = true;
			element.setAttribute('style', 'opacity:1');
			document.body.appendChild(element);
			return mask;
		};
		mask._remove = function() {
			if (mask._show) {
				mask._show = false;
				element.setAttribute('style', 'opacity:0');
				$.later(function() {
					var body = document.body;
					element.parentNode === body && body.removeChild(element);
				}, 350);
			}
			return mask;
		};
		mask.close = function() {
			if (callback) {
				if (callback() !== false) {
					mask._remove();
				}
			} else {
				mask._remove();
			}
		};
		return mask;
	};
	$.fn.popover = function() {
		var args = arguments;
		this.each(function() {
			$.targets._popover = this;
			if (args[0] === 'show' || args[0] === 'hide' || args[0] === 'toggle') {
				togglePopover(this, args[1], args[0]);
			}
		});
	};

})(mui, window, document, 'popover');
/**
 * segmented-controllers
 * @param {type} $
 * @param {type} window
 * @param {type} document
 * @param {type} undefined
 * @returns {undefined}
 */
(function($, window, document, name, undefined) {

	var CLASS_CONTROL_ITEM = 'mui-control-item';
	var CLASS_SEGMENTED_CONTROL = 'mui-segmented-control';
	var CLASS_SEGMENTED_CONTROL_VERTICAL = 'mui-segmented-control-vertical';
	var CLASS_CONTROL_CONTENT = 'mui-control-content';
	var CLASS_TAB_BAR = 'mui-bar-tab';
	var CLASS_TAB_ITEM = 'mui-tab-item';
	var CLASS_SLIDER_ITEM = 'mui-slider-item';

	var handle = function(event, target) {
		if (target.classList && (target.classList.contains(CLASS_CONTROL_ITEM) || target.classList.contains(CLASS_TAB_ITEM))) {
			if (target.parentNode && target.parentNode.classList && target.parentNode.classList.contains(CLASS_SEGMENTED_CONTROL_VERTICAL)) {
				//vertical 如果preventDefault会导致无法滚动
			} else {
				event.preventDefault(); //stop hash change				
			}
			//			if (target.hash) {
			return target;
			//			}
		}
		return false;
	};

	$.registerTarget({
		name: name,
		index: 80,
		handle: handle,
		target: false
	});

	window.addEventListener('tap', function(e) {

		var targetTab = $.targets.tab;
		if (!targetTab) {
			return;
		}
		var activeTab;
		var activeBodies;
		var targetBody;
		var className = 'mui-active';
		var classSelector = '.' + className;
		var segmentedControl = targetTab.parentNode;

		for (; segmentedControl && segmentedControl !== document; segmentedControl = segmentedControl.parentNode) {
			if (segmentedControl.classList.contains(CLASS_SEGMENTED_CONTROL)) {
				activeTab = segmentedControl.querySelector(classSelector + '.' + CLASS_CONTROL_ITEM);
				break;
			} else if (segmentedControl.classList.contains(CLASS_TAB_BAR)) {
				activeTab = segmentedControl.querySelector(classSelector + '.' + CLASS_TAB_ITEM);
			}
		}

		if (activeTab) {
			activeTab.classList.remove(className);
		}

		var isLastActive = targetTab === activeTab;
		if (targetTab) {
			targetTab.classList.add(className);
		}

		if (!targetTab.hash) {
			return;
		}
		targetBody = document.getElementById(targetTab.hash.replace('#', ''));

		if (!targetBody) {
			return;
		}
		if (!targetBody.classList.contains(CLASS_CONTROL_CONTENT)) { //tab bar popover
			targetTab.classList[isLastActive ? 'remove' : 'add'](className);
			return;
		}
		if (isLastActive) { //same
			return;
		}
		var parentNode = targetBody.parentNode;
		activeBodies = parentNode.querySelectorAll('.' + CLASS_CONTROL_CONTENT + classSelector);
		for (var i = 0; i < activeBodies.length; i++) {
			var activeBody = activeBodies[i];
			activeBody.parentNode === parentNode && activeBody.classList.remove(className);
		}

		targetBody.classList.add(className);

		var contents = [];
		var _contents = parentNode.querySelectorAll('.' + CLASS_CONTROL_CONTENT);
		for (var i = 0; i < _contents.length; i++) { //查找直属子节点
			_contents[i].parentNode === parentNode && (contents.push(_contents[i]));
		}
		$.trigger(targetBody, $.eventName('shown', name), {
			tabNumber: Array.prototype.indexOf.call(contents, targetBody)
		});
		e.detail && e.detail.gesture.preventDefault(); //fixed hashchange
	});

})(mui, window, document, 'tab');
/**
 * Toggles switch
 * @param {type} $
 * @param {type} window
 * @param {type} name
 * @returns {undefined}
 */
(function($, window, name) {

	var CLASS_SWITCH = 'mui-switch';
	var CLASS_SWITCH_HANDLE = 'mui-switch-handle';
	var CLASS_ACTIVE = 'mui-active';
	var CLASS_DRAGGING = 'mui-dragging';

	var CLASS_DISABLED = 'mui-disabled';

	var SELECTOR_SWITCH_HANDLE = '.' + CLASS_SWITCH_HANDLE;

	var handle = function(event, target) {
		if (target.classList && target.classList.contains(CLASS_SWITCH)) {
			return target;
		}
		return false;
	};

	$.registerTarget({
		name: name,
		index: 100,
		handle: handle,
		target: false
	});


	var Toggle = function(element) {
		this.element = element;
		this.classList = this.element.classList;
		this.handle = this.element.querySelector(SELECTOR_SWITCH_HANDLE);
		this.init();
		this.initEvent();
	};
	Toggle.prototype.init = function() {
		this.toggleWidth = this.element.offsetWidth;
		this.handleWidth = this.handle.offsetWidth;
		this.handleX = this.toggleWidth - this.handleWidth - 3;
	};
	Toggle.prototype.initEvent = function() {
		this.element.addEventListener($.EVENT_START, this);
		this.element.addEventListener('drag', this);
		this.element.addEventListener('swiperight', this);
		this.element.addEventListener($.EVENT_END, this);
		this.element.addEventListener($.EVENT_CANCEL, this);

	};
	Toggle.prototype.handleEvent = function(e) {
		if (this.classList.contains(CLASS_DISABLED)) {
			return;
		}
		switch (e.type) {
			case $.EVENT_START:
				this.start(e);
				break;
			case 'drag':
				this.drag(e);
				break;
			case 'swiperight':
				this.swiperight();
				break;
			case $.EVENT_END:
			case $.EVENT_CANCEL:
				this.end(e);
				break;
		}
	};
	Toggle.prototype.start = function(e) {
		this.handle.style.webkitTransitionDuration = this.element.style.webkitTransitionDuration = '.2s';
		this.classList.add(CLASS_DRAGGING);
		if (this.toggleWidth === 0 || this.handleWidth === 0) { //当switch处于隐藏状态时，width为0，需要重新初始化
			this.init();
		}
	};
	Toggle.prototype.drag = function(e) {
		var detail = e.detail;
		if (!this.isDragging) {
			if (detail.direction === 'left' || detail.direction === 'right') {
				this.isDragging = true;
				this.lastChanged = undefined;
				this.initialState = this.classList.contains(CLASS_ACTIVE);
			}
		}
		if (this.isDragging) {
			this.setTranslateX(detail.deltaX);
			e.stopPropagation();
			detail.gesture.preventDefault();
		}
	};
	Toggle.prototype.swiperight = function(e) {
		if (this.isDragging) {
			e.stopPropagation();
		}
	};
	Toggle.prototype.end = function(e) {
		this.classList.remove(CLASS_DRAGGING);
		if (this.isDragging) {
			this.isDragging = false;
			e.stopPropagation();
			$.trigger(this.element, 'toggle', {
				isActive: this.classList.contains(CLASS_ACTIVE)
			});
		} else {
			this.toggle();
		}
	};
	Toggle.prototype.toggle = function(animate) {
		var classList = this.classList;
		if (animate === false) {
			this.handle.style.webkitTransitionDuration = this.element.style.webkitTransitionDuration = '0s';
		} else {
			this.handle.style.webkitTransitionDuration = this.element.style.webkitTransitionDuration = '.2s';
		}
		if (classList.contains(CLASS_ACTIVE)) {
			classList.remove(CLASS_ACTIVE);
			this.handle.style.webkitTransform = 'translate(0,0)';
		} else {
			classList.add(CLASS_ACTIVE);
			this.handle.style.webkitTransform = 'translate(' + this.handleX + 'px,0)';
		}
		$.trigger(this.element, 'toggle', {
			isActive: this.classList.contains(CLASS_ACTIVE)
		});
	};
	Toggle.prototype.setTranslateX = $.animationFrame(function(x) {
		if (!this.isDragging) {
			return;
		}
		var isChanged = false;
		if ((this.initialState && -x > (this.handleX / 2)) || (!this.initialState && x > (this.handleX / 2))) {
			isChanged = true;
		}
		if (this.lastChanged !== isChanged) {
			if (isChanged) {
				this.handle.style.webkitTransform = 'translate(' + (this.initialState ? 0 : this.handleX) + 'px,0)';
				this.classList[this.initialState ? 'remove' : 'add'](CLASS_ACTIVE);
			} else {
				this.handle.style.webkitTransform = 'translate(' + (this.initialState ? this.handleX : 0) + 'px,0)';
				this.classList[this.initialState ? 'add' : 'remove'](CLASS_ACTIVE);
			}
			this.lastChanged = isChanged;
		}

	});

	$.fn['switch'] = function(options) {
		var switchApis = [];
		this.each(function() {
			var switchApi = null;
			var id = this.getAttribute('data-switch');
			if (!id) {
				id = ++$.uuid;
				$.data[id] = new Toggle(this);
				this.setAttribute('data-switch', id);
			} else {
				switchApi = $.data[id];
			}
			switchApis.push(switchApi);
		});
		return switchApis.length > 1 ? switchApis : switchApis[0];
	};
	$.ready(function() {
		$('.' + CLASS_SWITCH)['switch']();
	});
})(mui, window, 'toggle');
/**
 * Tableviews
 * @param {type} $
 * @param {type} window
 * @param {type} document
 * @returns {undefined}
 */
(function($, window, document) {

	var CLASS_ACTIVE = 'mui-active';
	var CLASS_SELECTED = 'mui-selected';
	var CLASS_GRID_VIEW = 'mui-grid-view';
	var CLASS_RADIO_VIEW = 'mui-table-view-radio';
	var CLASS_TABLE_VIEW_CELL = 'mui-table-view-cell';
	var CLASS_COLLAPSE_CONTENT = 'mui-collapse-content';
	var CLASS_DISABLED = 'mui-disabled';
	var CLASS_TOGGLE = 'mui-switch';
	var CLASS_BTN = 'mui-btn';

	var CLASS_SLIDER_HANDLE = 'mui-slider-handle';
	var CLASS_SLIDER_LEFT = 'mui-slider-left';
	var CLASS_SLIDER_RIGHT = 'mui-slider-right';
	var CLASS_TRANSITIONING = 'mui-transitioning';


	var SELECTOR_SLIDER_HANDLE = '.' + CLASS_SLIDER_HANDLE;
	var SELECTOR_SLIDER_LEFT = '.' + CLASS_SLIDER_LEFT;
	var SELECTOR_SLIDER_RIGHT = '.' + CLASS_SLIDER_RIGHT;
	var SELECTOR_SELECTED = '.' + CLASS_SELECTED;
	var SELECTOR_BUTTON = '.' + CLASS_BTN;
	var overFactor = 0.8;
	var cell, a;

	var isMoved = isOpened = openedActions = progress = false;
	var sliderHandle = sliderActionLeft = sliderActionRight = buttonsLeft = buttonsRight = sliderDirection = sliderRequestAnimationFrame = false;
	var timer = translateX = lastTranslateX = sliderActionLeftWidth = sliderActionRightWidth = 0;



	var toggleActive = function(isActive) {
		if (isActive) {
			if (a) {
				a.classList.add(CLASS_ACTIVE);
			} else if (cell) {
				cell.classList.add(CLASS_ACTIVE);
			}
		} else {
			timer && timer.cancel();
			if (a) {
				a.classList.remove(CLASS_ACTIVE);
			} else if (cell) {
				cell.classList.remove(CLASS_ACTIVE);
			}
		}
	};

	var updateTranslate = function() {
		if (translateX !== lastTranslateX) {
			if (buttonsRight && buttonsRight.length > 0) {
				progress = translateX / sliderActionRightWidth;
				if (translateX < -sliderActionRightWidth) {
					translateX = -sliderActionRightWidth - Math.pow(-translateX - sliderActionRightWidth, overFactor);
				}
				for (var i = 0, len = buttonsRight.length; i < len; i++) {
					var buttonRight = buttonsRight[i];
					if (typeof buttonRight._buttonOffset === 'undefined') {
						buttonRight._buttonOffset = buttonRight.offsetLeft;
					}
					buttonOffset = buttonRight._buttonOffset;
					setTranslate(buttonRight, (translateX - buttonOffset * (1 + Math.max(progress, -1))));
				}
			}
			if (buttonsLeft && buttonsLeft.length > 0) {
				progress = translateX / sliderActionLeftWidth;
				if (translateX > sliderActionLeftWidth) {
					translateX = sliderActionLeftWidth + Math.pow(translateX - sliderActionLeftWidth, overFactor);
				}
				for (var i = 0, len = buttonsLeft.length; i < len; i++) {
					var buttonLeft = buttonsLeft[i];
					if (typeof buttonLeft._buttonOffset === 'undefined') {
						buttonLeft._buttonOffset = sliderActionLeftWidth - buttonLeft.offsetLeft - buttonLeft.offsetWidth;
					}
					buttonOffset = buttonLeft._buttonOffset;
					if (buttonsLeft.length > 1) {
						buttonLeft.style.zIndex = buttonsLeft.length - i;
					}
					setTranslate(buttonLeft, (translateX + buttonOffset * (1 - Math.min(progress, 1))));
				}
			}
			setTranslate(sliderHandle, translateX);
			lastTranslateX = translateX;
		}
		sliderRequestAnimationFrame = requestAnimationFrame(function() {
			updateTranslate();
		});
	};
	var setTranslate = function(element, x) {
		if (element) {
			element.style.webkitTransform = 'translate(' + x + 'px,0)';
		}
	};

	window.addEventListener($.EVENT_START, function(event) {
		if (cell) {
			toggleActive(false);
		}
		cell = a = false;
		isMoved = isOpened = openedActions = false;
		var target = event.target;
		var isDisabled = false;
		for (; target && target !== document; target = target.parentNode) {
			if (target.classList) {
				var classList = target.classList;
				if ((target.tagName === 'INPUT' && target.type !== 'radio' && target.type !== 'checkbox') || target.tagName === 'BUTTON' || classList.contains(CLASS_TOGGLE) || classList.contains(CLASS_BTN) || classList.contains(CLASS_DISABLED)) {
					isDisabled = true;
				}
				if (classList.contains(CLASS_COLLAPSE_CONTENT)) { //collapse content
					break;
				}
				if (classList.contains(CLASS_TABLE_VIEW_CELL)) {
					cell = target;
					//TODO swipe to delete close
					var selected = cell.parentNode.querySelector(SELECTOR_SELECTED);
					if (!cell.parentNode.classList.contains(CLASS_RADIO_VIEW) && selected && selected !== cell) {
						$.swipeoutClose(selected);
						cell = isDisabled = false;
						return;
					}
					if (!cell.parentNode.classList.contains(CLASS_GRID_VIEW)) {
						var link = cell.querySelector('a');
						if (link && link.parentNode === cell) { //li>a
							a = link;
						}
					}
					var handle = cell.querySelector(SELECTOR_SLIDER_HANDLE);
					if (handle) {
						toggleEvents(cell);
						event.stopPropagation();
					}
					if (!isDisabled) {
						if (handle) {
							if (timer) {
								timer.cancel();
							}
							timer = $.later(function() {
								toggleActive(true);
							}, 100);
						} else {
							toggleActive(true);
						}
					}
					break;
				}
			}
		}
	});
	window.addEventListener($.EVENT_MOVE, function(event) {
		toggleActive(false);
	});

	var handleEvent = {
		handleEvent: function(event) {
			switch (event.type) {
				case 'drag':
					this.drag(event);
					break;
				case 'dragend':
					this.dragend(event);
					break;
				case 'flick':
					this.flick(event);
					break;
				case 'swiperight':
					this.swiperight(event);
					break;
				case 'swipeleft':
					this.swipeleft(event);
					break;
			}
		},
		drag: function(event) {
			if (!cell) {
				return;
			}
			if (!isMoved) { //init
				sliderHandle = sliderActionLeft = sliderActionRight = buttonsLeft = buttonsRight = sliderDirection = sliderRequestAnimationFrame = false;
				sliderHandle = cell.querySelector(SELECTOR_SLIDER_HANDLE);
				if (sliderHandle) {
					sliderActionLeft = cell.querySelector(SELECTOR_SLIDER_LEFT);
					sliderActionRight = cell.querySelector(SELECTOR_SLIDER_RIGHT);
					if (sliderActionLeft) {
						sliderActionLeftWidth = sliderActionLeft.offsetWidth;
						buttonsLeft = sliderActionLeft.querySelectorAll(SELECTOR_BUTTON);
					}
					if (sliderActionRight) {
						sliderActionRightWidth = sliderActionRight.offsetWidth;
						buttonsRight = sliderActionRight.querySelectorAll(SELECTOR_BUTTON);
					}
					cell.classList.remove(CLASS_TRANSITIONING);
					isOpened = cell.classList.contains(CLASS_SELECTED);
					if (isOpened) {
						openedActions = cell.querySelector(SELECTOR_SLIDER_LEFT + SELECTOR_SELECTED) ? 'left' : 'right';
					}
				}
			}
			var detail = event.detail;
			var direction = detail.direction;
			var angle = detail.angle;
			if (direction === 'left' && (angle > 150 || angle < -150)) {
				if (buttonsRight || (buttonsLeft && isOpened)) { //存在右侧按钮或存在左侧按钮且是已打开状态
					isMoved = true;
				}
			} else if (direction === 'right' && (angle > -30 && angle < 30)) {
				if (buttonsLeft || (buttonsRight && isOpened)) { //存在左侧按钮或存在右侧按钮且是已打开状态
					isMoved = true;
				}
			}
			if (isMoved) {
				event.stopPropagation();
				event.detail.gesture.preventDefault();
				var translate = event.detail.deltaX;
				if (isOpened) {
					if (openedActions === 'right') {
						translate = translate - sliderActionRightWidth;
					} else {
						translate = translate + sliderActionLeftWidth;
					}
				}
				if ((translate > 0 && !buttonsLeft) || (translate < 0 && !buttonsRight)) {
					if (!isOpened) {
						return;
					}
					translate = 0;
				}
				if (translate < 0) {
					sliderDirection = 'toLeft';
				} else if (translate > 0) {
					sliderDirection = 'toRight';
				} else {
					if (!sliderDirection) {
						sliderDirection = 'toLeft';
					}
				}
				if (!sliderRequestAnimationFrame) {
					updateTranslate();
				}
				translateX = translate;
			}
		},
		flick: function(event) {
			if (isMoved) {
				event.stopPropagation();
			}
		},
		swipeleft: function(event) {
			if (isMoved) {
				event.stopPropagation();
			}
		},
		swiperight: function(event) {
			if (isMoved) {
				event.stopPropagation();
			}
		},
		dragend: function(event) {
			if (!isMoved) {
				return;
			}
			event.stopPropagation();
			if (sliderRequestAnimationFrame) {
				cancelAnimationFrame(sliderRequestAnimationFrame);
				sliderRequestAnimationFrame = null;
			}
			var detail = event.detail;
			isMoved = false;
			var action = 'close';
			var actionsWidth = sliderDirection === 'toLeft' ? sliderActionRightWidth : sliderActionLeftWidth;
			var isToggle = detail.swipe || (Math.abs(translateX) > actionsWidth / 2);
			if (isToggle) {
				if (!isOpened) {
					action = 'open';
				} else if (detail.direction === 'left' && openedActions === 'right') {
					action = 'open';
				} else if (detail.direction === 'right' && openedActions === 'left') {
					action = 'open';
				}

			}
			cell.classList.add(CLASS_TRANSITIONING);
			var buttons;
			if (action === 'open') {
				var newTranslate = sliderDirection === 'toLeft' ? -actionsWidth : actionsWidth;
				setTranslate(sliderHandle, newTranslate);
				buttons = sliderDirection === 'toLeft' ? buttonsRight : buttonsLeft;
				if (typeof buttons !== 'undefined') {
					var button = null;
					for (var i = 0; i < buttons.length; i++) {
						button = buttons[i];
						setTranslate(button, newTranslate);
					}
					button.parentNode.classList.add(CLASS_SELECTED);
					cell.classList.add(CLASS_SELECTED);
					if (!isOpened) {
						$.trigger(cell, sliderDirection === 'toLeft' ? 'slideleft' : 'slideright');
					}
				}
			} else {
				setTranslate(sliderHandle, 0);
				sliderActionLeft && sliderActionLeft.classList.remove(CLASS_SELECTED);
				sliderActionRight && sliderActionRight.classList.remove(CLASS_SELECTED);
				cell.classList.remove(CLASS_SELECTED);
			}
			var buttonOffset;
			if (buttonsLeft && buttonsLeft.length > 0 && buttonsLeft !== buttons) {
				for (var i = 0, len = buttonsLeft.length; i < len; i++) {
					var buttonLeft = buttonsLeft[i];
					buttonOffset = buttonLeft._buttonOffset;
					if (typeof buttonOffset === 'undefined') {
						buttonLeft._buttonOffset = sliderActionLeftWidth - buttonLeft.offsetLeft - buttonLeft.offsetWidth;
					}
					setTranslate(buttonLeft, buttonOffset);
				}
			}
			if (buttonsRight && buttonsRight.length > 0 && buttonsRight !== buttons) {
				for (var i = 0, len = buttonsRight.length; i < len; i++) {
					var buttonRight = buttonsRight[i];
					buttonOffset = buttonRight._buttonOffset;
					if (typeof buttonOffset === 'undefined') {
						buttonRight._buttonOffset = buttonRight.offsetLeft;
					}
					setTranslate(buttonRight, -buttonOffset);
				}
			}
		}
	};

	function toggleEvents(element, isRemove) {
		var method = !!isRemove ? 'removeEventListener' : 'addEventListener';
		element[method]('drag', handleEvent);
		element[method]('dragend', handleEvent);
		element[method]('swiperight', handleEvent);
		element[method]('swipeleft', handleEvent);
		element[method]('flick', handleEvent);
	};
	/**
	 * 打开滑动菜单
	 * @param {Object} el
	 * @param {Object} direction
	 */
	$.swipeoutOpen = function(el, direction) {
		if (!el) return;
		var classList = el.classList;
		if (classList.contains(CLASS_SELECTED)) return;
		if (!direction) {
			if (el.querySelector(SELECTOR_SLIDER_RIGHT)) {
				direction = 'right';
			} else {
				direction = 'left';
			}
		}
		var swipeoutAction = el.querySelector($.classSelector(".slider-" + direction));
		if (!swipeoutAction) return;
		swipeoutAction.classList.add(CLASS_SELECTED);
		classList.add(CLASS_SELECTED);
		classList.remove(CLASS_TRANSITIONING);
		var buttons = swipeoutAction.querySelectorAll(SELECTOR_BUTTON);
		var swipeoutWidth = swipeoutAction.offsetWidth;
		var translate = (direction === 'right') ? -swipeoutWidth : swipeoutWidth;
		var length = buttons.length;
		var button;
		for (var i = 0; i < length; i++) {
			button = buttons[i];
			if (direction === 'right') {
				setTranslate(button, -button.offsetLeft);
			} else {
				setTranslate(button, (swipeoutWidth - button.offsetWidth - button.offsetLeft));
			}
		}
		classList.add(CLASS_TRANSITIONING);
		for (var i = 0; i < length; i++) {
			setTranslate(buttons[i], translate);
		}
		setTranslate(el.querySelector(SELECTOR_SLIDER_HANDLE), translate);
	};
	/**
	 * 关闭滑动菜单
	 * @param {Object} el
	 */
	$.swipeoutClose = function(el) {
		if (!el) return;
		var classList = el.classList;
		if (!classList.contains(CLASS_SELECTED)) return;
		var direction = el.querySelector(SELECTOR_SLIDER_RIGHT + SELECTOR_SELECTED) ? 'right' : 'left';
		var swipeoutAction = el.querySelector($.classSelector(".slider-" + direction));
		if (!swipeoutAction) return;
		swipeoutAction.classList.remove(CLASS_SELECTED);
		classList.remove(CLASS_SELECTED);
		classList.add(CLASS_TRANSITIONING);
		var buttons = swipeoutAction.querySelectorAll(SELECTOR_BUTTON);
		var swipeoutWidth = swipeoutAction.offsetWidth;
		var length = buttons.length;
		var button;
		setTranslate(el.querySelector(SELECTOR_SLIDER_HANDLE), 0);
		for (var i = 0; i < length; i++) {
			button = buttons[i];
			if (direction === 'right') {
				setTranslate(button, (-button.offsetLeft));
			} else {
				setTranslate(button, (swipeoutWidth - button.offsetWidth - button.offsetLeft));
			}
		}
	};

	window.addEventListener($.EVENT_END, function(event) { //使用touchend来取消高亮，避免一次点击既不触发tap，doubletap，longtap的事件
		if (!cell) {
			return;
		}
		toggleActive(false);
		sliderHandle && toggleEvents(cell, true);
	});
	window.addEventListener($.EVENT_CANCEL, function(event) { //使用touchcancel来取消高亮，避免一次点击既不触发tap，doubletap，longtap的事件
		if (!cell) {
			return;
		}
		toggleActive(false);
		sliderHandle && toggleEvents(cell, true);
	});
	var radioOrCheckboxClick = function(event) {
		var type = event.target && event.target.type || '';
		if (type === 'radio' || type === 'checkbox') {
			return;
		}
		var classList = cell.classList;
		if (classList.contains('mui-radio')) {
			var input = cell.querySelector('input[type=radio]');
			if (input) {
				//				input.click();
				if (!input.disabled && !input.readOnly) {
					input.checked = !input.checked;
					$.trigger(input, 'change');
				}
			}
		} else if (classList.contains('mui-checkbox')) {
			var input = cell.querySelector('input[type=checkbox]');
			if (input) {
				//				input.click();
				if (!input.disabled && !input.readOnly) {
					input.checked = !input.checked;
					$.trigger(input, 'change');
				}
			}
		}
	};
	//fixed hashchange(android)
	window.addEventListener($.EVENT_CLICK, function(e) {
		if (cell && cell.classList.contains('mui-collapse')) {
			e.preventDefault();
		}
	});
	window.addEventListener('doubletap', function(event) {
		if (cell) {
			radioOrCheckboxClick(event);
		}
	});
	var preventDefaultException = /^(INPUT|TEXTAREA|BUTTON|SELECT)$/;
	window.addEventListener('tap', function(event) {
		if (!cell) {
			return;
		}
		var isExpand = false;
		var classList = cell.classList;
		var ul = cell.parentNode;
		if (ul && ul.classList.contains(CLASS_RADIO_VIEW)) {
			if (classList.contains(CLASS_SELECTED)) {
				return;
			}
			var selected = ul.querySelector('li' + SELECTOR_SELECTED);
			if (selected) {
				selected.classList.remove(CLASS_SELECTED);
			}
			classList.add(CLASS_SELECTED);
			$.trigger(cell, 'selected', {
				el: cell
			});
			return;
		}
		if (classList.contains('mui-collapse') && !cell.parentNode.classList.contains('mui-unfold')) {
			if (!preventDefaultException.test(event.target.tagName)) {
				event.detail.gesture.preventDefault();
			}

			if (!classList.contains(CLASS_ACTIVE)) { //展开时,需要收缩其他同类
				var collapse = cell.parentNode.querySelector('.mui-collapse.mui-active');
				if (collapse) {
					collapse.classList.remove(CLASS_ACTIVE);
				}
				isExpand = true;
			}
			classList.toggle(CLASS_ACTIVE);
			if (isExpand) {
				//触发展开事件
				$.trigger(cell, 'expand');

				//scroll
				//暂不滚动
				// var offsetTop = $.offset(cell).top;
				// var scrollTop = document.body.scrollTop;
				// var height = window.innerHeight;
				// var offsetHeight = cell.offsetHeight;
				// var cellHeight = (offsetTop - scrollTop + offsetHeight);
				// if (offsetHeight > height) {
				// 	$.scrollTo(offsetTop, 300);
				// } else if (cellHeight > height) {
				// 	$.scrollTo(cellHeight - height + scrollTop, 300);
				// }
			}
		} else {
			radioOrCheckboxClick(event);
		}
	});
})(mui, window, document);
(function($, window) {
	/**
	 * 警告消息框
	 */
	$.alert = function(message, title, btnValue, callback) {
		if ($.os.plus) {
			if (typeof message === 'undefined') {
				return;
			} else {
				if (typeof title === 'function') {
					callback = title;
					title = null;
					btnValue = '确定';
				} else if (typeof btnValue === 'function') {
					callback = btnValue;
					btnValue = null;
				}
				$.plusReady(function() {
					plus.nativeUI.alert(message, callback, title, btnValue);
				});
			}

		} else {
			//TODO H5版本
			window.alert(message);
		}
	};

})(mui, window);
(function($, window) {
	/**
	 * 确认消息框
	 */
	$.confirm = function(message, title, btnArray, callback) {
		if ($.os.plus) {
			if (typeof message === 'undefined') {
				return;
			} else {
				if (typeof title === 'function') {
					callback = title;
					title = null;
					btnArray = null;
				} else if (typeof btnArray === 'function') {
					callback = btnArray;
					btnArray = null;
				}
				$.plusReady(function() {
					plus.nativeUI.confirm(message, callback, title, btnArray);
				});
			}

		} else {
			//H5版本，0为确认，1为取消
			if (window.confirm(message)) {
				callback({
					index: 0
				});
			} else {
				callback({
					index: 1
				});
			}
		}
	};

})(mui, window);
(function($, window) {
	/**
	 * 输入对话框
	 */
	$.prompt = function(text, defaultText, title, btnArray, callback) {
		if ($.os.plus) {
			if (typeof message === 'undefined') {
				return;
			} else {

				if (typeof defaultText === 'function') {
					callback = defaultText;
					defaultText = null;
					title = null;
					btnArray = null;
				} else if (typeof title === 'function') {
					callback = title;
					title = null;
					btnArray = null;
				} else if (typeof btnArray === 'function') {
					callback = btnArray;
					btnArray = null;
				}
				$.plusReady(function() {
					plus.nativeUI.prompt(text, callback, title, defaultText, btnArray);
				});
			}

		} else {
			//H5版本(确认index为0，取消index为1)
			var result = window.prompt(text);
			if (result) {
				callback({
					index: 0,
					value: result
				});
			} else {
				callback({
					index: 1,
					value: ''
				});
			}
		}
	};

})(mui, window);
(function($, window) {
	var CLASS_ACTIVE = 'mui-active';
	/**
	 * 自动消失提示框
	 */
	$.toast = function(message,options) {
		var durations = {
		    'long': 3500,
		    'short': 2000
		};

		//计算显示时间
		 options = $.extend({
	        duration: 'short'
	    }, options || {});


		if ($.os.plus && options.type !== 'div') {
			//默认显示在底部；
			$.plusReady(function() {
				plus.nativeUI.toast(message, {
					verticalAlign: 'bottom',
					duration:options.duration
				});
			});
		} else {
			if (typeof options.duration === 'number') {
		        duration = options.duration>0 ? options.duration:durations['short'];
		    } else {
		        duration = durations[options.duration];
		    }
		    if (!duration) {
		        duration = durations['short'];
		    }
			var toast = document.createElement('div');
			toast.classList.add('mui-toast-container');
			toast.innerHTML = '<div class="' + 'mui-toast-message' + '">' + message + '</div>';
			toast.addEventListener('webkitTransitionEnd', function() {
				if (!toast.classList.contains(CLASS_ACTIVE)) {
					toast.parentNode.removeChild(toast);
					toast = null;
				}
			});
			//点击则自动消失
			toast.addEventListener('click', function() {
		        toast.parentNode.removeChild(toast);
		        toast = null;
		    });
			document.body.appendChild(toast);
			toast.offsetHeight;
			toast.classList.add(CLASS_ACTIVE);
			setTimeout(function() {
				toast && toast.classList.remove(CLASS_ACTIVE);
			}, duration);
			
			return {
		        isVisible: function() {return !!toast;}
		    }
		}   
	};

})(mui, window);
/**
 * Popup(alert,confirm,prompt)  
 * @param {Object} $
 * @param {Object} window
 * @param {Object} document
 */
(function($, window, document) {
    var CLASS_POPUP = 'mui-popup';
    var CLASS_POPUP_BACKDROP = 'mui-popup-backdrop';
    var CLASS_POPUP_IN = 'mui-popup-in';
    var CLASS_POPUP_OUT = 'mui-popup-out';
    var CLASS_POPUP_INNER = 'mui-popup-inner';
    var CLASS_POPUP_TITLE = 'mui-popup-title';
    var CLASS_POPUP_TEXT = 'mui-popup-text';
    var CLASS_POPUP_INPUT = 'mui-popup-input';
    var CLASS_POPUP_BUTTONS = 'mui-popup-buttons';
    var CLASS_POPUP_BUTTON = 'mui-popup-button';
    var CLASS_POPUP_BUTTON_BOLD = 'mui-popup-button-bold';
    var CLASS_POPUP_BACKDROP = 'mui-popup-backdrop';
    var CLASS_ACTIVE = 'mui-active';

    var popupStack = [];
    var backdrop = (function() {
        var element = document.createElement('div');
        element.classList.add(CLASS_POPUP_BACKDROP);
        element.addEventListener($.EVENT_MOVE, $.preventDefault);
        element.addEventListener('webkitTransitionEnd', function() {
            if (!this.classList.contains(CLASS_ACTIVE)) {
                element.parentNode && element.parentNode.removeChild(element);
            }
        });
        return element;
    }());

    var createInput = function(placeholder) {
        return '<div class="' + CLASS_POPUP_INPUT + '"><input type="text" autofocus placeholder="' + (placeholder || '') + '"/></div>';
    };
    var createInner = function(message, title, extra) {
        return '<div class="' + CLASS_POPUP_INNER + '"><div class="' + CLASS_POPUP_TITLE + '">' + title + '</div><div class="' + CLASS_POPUP_TEXT + '">' + message.replace(/\r\n/g, "<br/>").replace(/\n/g, "<br/>") + '</div>' + (extra || '') + '</div>';
    };
    var createButtons = function(btnArray) {
        var length = btnArray.length;
        var btns = [];
        for (var i = 0; i < length; i++) {
            btns.push('<span class="' + CLASS_POPUP_BUTTON + (i === length - 1 ? (' ' + CLASS_POPUP_BUTTON_BOLD) : '') + '">' + btnArray[i] + '</span>');
        }
        return '<div class="' + CLASS_POPUP_BUTTONS + '">' + btns.join('') + '</div>';
    };

    var createPopup = function(html, callback) {
        var popupElement = document.createElement('div');
        popupElement.className = CLASS_POPUP;
        popupElement.innerHTML = html;
        var removePopupElement = function() {
            popupElement.parentNode && popupElement.parentNode.removeChild(popupElement);
            popupElement = null;
        };
        popupElement.addEventListener($.EVENT_MOVE, $.preventDefault);
        popupElement.addEventListener('webkitTransitionEnd', function(e) {
            if (popupElement && e.target === popupElement && popupElement.classList.contains(CLASS_POPUP_OUT)) {
                removePopupElement();
            }
        });
        popupElement.style.display = 'block';
        document.body.appendChild(popupElement);
        popupElement.offsetHeight;
        popupElement.classList.add(CLASS_POPUP_IN);

        if (!backdrop.classList.contains(CLASS_ACTIVE)) {
            backdrop.style.display = 'block';
            document.body.appendChild(backdrop);
            backdrop.offsetHeight;
            backdrop.classList.add(CLASS_ACTIVE);
        }
        var btns = $.qsa('.' + CLASS_POPUP_BUTTON, popupElement);
        var input = popupElement.querySelector('.' + CLASS_POPUP_INPUT + ' input');
        var popup = {
            element: popupElement,
            close: function(index, animate) {
                if (popupElement) {
                    var result = callback && callback({
                        index: index || 0,
                        value: input && input.value || ''
                    });
                    if (result === false) { //返回false则不关闭当前popup
                        return;
                    }
                    if (animate !== false) {
                        popupElement.classList.remove(CLASS_POPUP_IN);
                        popupElement.classList.add(CLASS_POPUP_OUT);
                    } else {
                        removePopupElement();
                    }
                    popupStack.pop();
                    //如果还有其他popup，则不remove backdrop
                    if (popupStack.length) {
                        popupStack[popupStack.length - 1]['show'](animate);
                    } else {
                        backdrop.classList.remove(CLASS_ACTIVE);
                    }
                }
            }
        };
        var handleEvent = function(e) {
            popup.close(btns.indexOf(e.target));
        };
        $(popupElement).on('tap', '.' + CLASS_POPUP_BUTTON, handleEvent);
        if (popupStack.length) {
            popupStack[popupStack.length - 1]['hide']();
        }
        popupStack.push({
            close: popup.close,
            show: function(animate) {
                popupElement.style.display = 'block';
                popupElement.offsetHeight;
                popupElement.classList.add(CLASS_POPUP_IN);
            },
            hide: function() {
                popupElement.style.display = 'none';
                popupElement.classList.remove(CLASS_POPUP_IN);
            }
        });
        return popup;
    };
    var createAlert = function(message, title, btnValue, callback, type) {
        if (typeof message === 'undefined') {
            return;
        } else {
            if (typeof title === 'function') {
                callback = title;
                type = btnValue;
                title = null;
                btnValue = null;
            } else if (typeof btnValue === 'function') {
                type = callback;
                callback = btnValue;
                btnValue = null;
            }
        }
        if (!$.os.plus || type === 'div') {
            return createPopup(createInner(message, title || '提示') + createButtons([btnValue || '确定']), callback);
        }
        return plus.nativeUI.alert(message, callback, title || '提示', btnValue || '确定');
    };
    var createConfirm = function(message, title, btnArray, callback, type) {
        if (typeof message === 'undefined') {
            return;
        } else {
            if (typeof title === 'function') {
                callback = title;
                type = btnArray;
                title = null;
                btnArray = null;
            } else if (typeof btnArray === 'function') {
                type = callback;
                callback = btnArray;
                btnArray = null;
            }
        }
        if (!$.os.plus || type === 'div') {
            return createPopup(createInner(message, title || '提示') + createButtons(btnArray || ['取消', '确认']), callback);
        }
        return plus.nativeUI.confirm(message, callback, title, btnArray || ['取消', '确认']);
    };
    var createPrompt = function(message, placeholder, title, btnArray, callback, type) {
        if (typeof message === 'undefined') {
            return;
        } else {
            if (typeof placeholder === 'function') {
                callback = placeholder;
                type = title;
                placeholder = null;
                title = null;
                btnArray = null;
            } else if (typeof title === 'function') {
                callback = title;
                type = btnArray;
                title = null;
                btnArray = null;
            } else if (typeof btnArray === 'function') {
                type = callback;
                callback = btnArray;
                btnArray = null;
            }
        }
        if (!$.os.plus || type === 'div') {
            return createPopup(createInner(message, title || '提示', createInput(placeholder)) + createButtons(btnArray || ['取消', '确认']), callback);
        }
        return plus.nativeUI.prompt(message, callback, title || '提示', placeholder, btnArray || ['取消', '确认']);
    };
    var closePopup = function() {
        if (popupStack.length) {
            popupStack[popupStack.length - 1]['close']();
            return true;
        } else {
            return false;
        }
    };
    var closePopups = function() {
        while (popupStack.length) {
            popupStack[popupStack.length - 1]['close']();
        }
    };

    $.closePopup = closePopup;
    $.closePopups = closePopups;
    $.alert = createAlert;
    $.confirm = createConfirm;
    $.prompt = createPrompt;
})(mui, window, document);
(function($, document) {
	var CLASS_PROGRESSBAR = 'mui-progressbar';
	var CLASS_PROGRESSBAR_IN = 'mui-progressbar-in';
	var CLASS_PROGRESSBAR_OUT = 'mui-progressbar-out';
	var CLASS_PROGRESSBAR_INFINITE = 'mui-progressbar-infinite';

	var SELECTOR_PROGRESSBAR = '.mui-progressbar';

	var _findProgressbar = function(container) {
		container = $(container || 'body');
		if (container.length === 0) return;
		container = container[0];
		if (container.classList.contains(CLASS_PROGRESSBAR)) {
			return container;
		}
		var progressbars = container.querySelectorAll(SELECTOR_PROGRESSBAR);
		if (progressbars) {
			for (var i = 0, len = progressbars.length; i < len; i++) {
				var progressbar = progressbars[i];
				if (progressbar.parentNode === container) {
					return progressbar;
				}
			}
		}
	};
	/**
	 * 创建并显示进度条 
	 * @param {Object} container  可选，默认body，支持selector,DOM Node,mui wrapper
	 * @param {Object} progress 可选，undefined表示循环，数字表示具体进度
	 * @param {Object} color 可选，指定颜色样式(目前暂未提供实际样式，可暂时不暴露此参数)
	 */
	var showProgressbar = function(container, progress, color) {
		if (typeof container === 'number') {
			color = progress;
			progress = container;
			container = 'body';
		}
		container = $(container || 'body');
		if (container.length === 0) return;
		container = container[0];
		var progressbar;
		if (container.classList.contains(CLASS_PROGRESSBAR)) {
			progressbar = container;
		} else {
			var progressbars = container.querySelectorAll(SELECTOR_PROGRESSBAR + ':not(.' + CLASS_PROGRESSBAR_OUT + ')');
			if (progressbars) {
				for (var i = 0, len = progressbars.length; i < len; i++) {
					var _progressbar = progressbars[i];
					if (_progressbar.parentNode === container) {
						progressbar = _progressbar;
						break;
					}
				}
			}
			if (!progressbar) {
				progressbar = document.createElement('span');
				progressbar.className = CLASS_PROGRESSBAR + ' ' + CLASS_PROGRESSBAR_IN + (typeof progress !== 'undefined' ? '' : (' ' + CLASS_PROGRESSBAR_INFINITE)) + (color ? (' ' + CLASS_PROGRESSBAR + '-' + color) : '');
				if (typeof progress !== 'undefined') {
					progressbar.innerHTML = '<span></span>';
				}
				container.appendChild(progressbar);
			} else {
				progressbar.classList.add(CLASS_PROGRESSBAR_IN);
			}
		}
		if (progress) setProgressbar(container, progress);
		return progressbar;
	};
	/**
	 * 关闭进度条 
	 * @param {Object} container 可选，默认body，支持selector,DOM Node,mui wrapper
	 */
	var hideProgressbar = function(container) {
		var progressbar = _findProgressbar(container);
		if (!progressbar) {
			return;
		}
		var classList = progressbar.classList;
		if (!classList.contains(CLASS_PROGRESSBAR_IN) || classList.contains(CLASS_PROGRESSBAR_OUT)) {
			return;
		}
		classList.remove(CLASS_PROGRESSBAR_IN);
		classList.add(CLASS_PROGRESSBAR_OUT);
		progressbar.addEventListener('webkitAnimationEnd', function() {
			progressbar.parentNode && progressbar.parentNode.removeChild(progressbar);
			progressbar = null;
		});
		return;
	};
	/**
	 * 设置指定进度条进度 
	 * @param {Object} container  可选，默认body，支持selector,DOM Node,mui wrapper
	 * @param {Object} progress 可选，默认0 取值范围[0-100]
	 * @param {Object} speed 进度条动画时间
	 */
	var setProgressbar = function(container, progress, speed) {
		if (typeof container === 'number') {
			speed = progress;
			progress = container;
			container = false;
		}
		var progressbar = _findProgressbar(container);
		if (!progressbar || progressbar.classList.contains(CLASS_PROGRESSBAR_INFINITE)) {
			return;
		}
		if (progress) progress = Math.min(Math.max(progress, 0), 100);
		progressbar.offsetHeight;
		var span = progressbar.querySelector('span');
		if (span) {
			var style = span.style;
			style.webkitTransform = 'translate3d(' + (-100 + progress) + '%,0,0)';
			if (typeof speed !== 'undefined') {
				style.webkitTransitionDuration = speed + 'ms';
			} else {
				style.webkitTransitionDuration = '';
			}
		}
		return progressbar;
	};
	$.fn.progressbar = function(options) {
		var progressbarApis = [];
		options = options || {};
		this.each(function() {
			var self = this;
			var progressbarApi = self.mui_plugin_progressbar;
			if (!progressbarApi) {
				self.mui_plugin_progressbar = progressbarApi = {
					options: options,
					setOptions: function(options) {
						this.options = options;
					},
					show: function() {
						return showProgressbar(self, this.options.progress, this.options.color);
					},
					setProgress: function(progress) {
						return setProgressbar(self, progress);
					},
					hide: function() {
						return hideProgressbar(self);
					}
				};
			} else if (options) {
				progressbarApi.setOptions(options);
			}
			progressbarApis.push(progressbarApi);
		});
		return progressbarApis.length === 1 ? progressbarApis[0] : progressbarApis;
	};
	//	$.setProgressbar = setProgressbar;
	//	$.showProgressbar = showProgressbar;
	//	$.hideProgressbar = hideProgressbar;
})(mui, document);
/**
 * Input(TODO resize)
 * @param {type} $
 * @param {type} window
 * @param {type} document
 * @returns {undefined}
 */
(function($, window, document) {
	var CLASS_ICON = 'mui-icon';
	var CLASS_ICON_CLEAR = 'mui-icon-clear';
	var CLASS_ICON_SPEECH = 'mui-icon-speech';
	var CLASS_ICON_SEARCH = 'mui-icon-search';
	var CLASS_ICON_PASSWORD = 'mui-icon-eye';
	var CLASS_INPUT_ROW = 'mui-input-row';
	var CLASS_PLACEHOLDER = 'mui-placeholder';
	var CLASS_TOOLTIP = 'mui-tooltip';
	var CLASS_HIDDEN = 'mui-hidden';
	var CLASS_FOCUSIN = 'mui-focusin';
	var SELECTOR_ICON_CLOSE = '.' + CLASS_ICON_CLEAR;
	var SELECTOR_ICON_SPEECH = '.' + CLASS_ICON_SPEECH;
	var SELECTOR_ICON_PASSWORD = '.' + CLASS_ICON_PASSWORD;
	var SELECTOR_PLACEHOLDER = '.' + CLASS_PLACEHOLDER;
	var SELECTOR_TOOLTIP = '.' + CLASS_TOOLTIP;

	var findRow = function(target) {
		for (; target && target !== document; target = target.parentNode) {
			if (target.classList && target.classList.contains(CLASS_INPUT_ROW)) {
				return target;
			}
		}
		return null;
	};
	var Input = function(element, options) {
		this.element = element;
		this.options = options || {
			actions: 'clear'
		};
		if (~this.options.actions.indexOf('slider')) { //slider
			this.sliderActionClass = CLASS_TOOLTIP + ' ' + CLASS_HIDDEN;
			this.sliderActionSelector = SELECTOR_TOOLTIP;
		} else { //clear,speech,search
			if (~this.options.actions.indexOf('clear')) {
				this.clearActionClass = CLASS_ICON + ' ' + CLASS_ICON_CLEAR + ' ' + CLASS_HIDDEN;
				this.clearActionSelector = SELECTOR_ICON_CLOSE;
			}
			if (~this.options.actions.indexOf('speech')) { //only for 5+
				this.speechActionClass = CLASS_ICON + ' ' + CLASS_ICON_SPEECH;
				this.speechActionSelector = SELECTOR_ICON_SPEECH;
			}
			if (~this.options.actions.indexOf('search')) {
				this.searchActionClass = CLASS_PLACEHOLDER;
				this.searchActionSelector = SELECTOR_PLACEHOLDER;
			}
			if (~this.options.actions.indexOf('password')) {
				this.passwordActionClass = CLASS_ICON + ' ' + CLASS_ICON_PASSWORD;
				this.passwordActionSelector = SELECTOR_ICON_PASSWORD;
			}
		}
		this.init();
	};
	Input.prototype.init = function() {
		this.initAction();
		this.initElementEvent();
	};
	Input.prototype.initAction = function() {
		var self = this;

		var row = self.element.parentNode;
		if (row) {
			if (self.sliderActionClass) {
				self.sliderAction = self.createAction(row, self.sliderActionClass, self.sliderActionSelector);
			} else {
				if (self.searchActionClass) {
					self.searchAction = self.createAction(row, self.searchActionClass, self.searchActionSelector);
					self.searchAction.addEventListener('tap', function(e) {
						$.focus(self.element);
						e.stopPropagation();
					});
				}
				if (self.speechActionClass) {
					self.speechAction = self.createAction(row, self.speechActionClass, self.speechActionSelector);
					self.speechAction.addEventListener('click', $.stopPropagation);
					self.speechAction.addEventListener('tap', function(event) {
						self.speechActionClick(event);
					});
				}
				if (self.clearActionClass) {
					self.clearAction = self.createAction(row, self.clearActionClass, self.clearActionSelector);
					self.clearAction.addEventListener('tap', function(event) {
						self.clearActionClick(event);
					});
				}
				if (self.passwordActionClass) {
					self.passwordAction = self.createAction(row, self.passwordActionClass, self.passwordActionSelector);
					self.passwordAction.addEventListener('tap', function(event) {
						self.passwordActionClick(event);
					});
				}
			}
		}
	};
	Input.prototype.createAction = function(row, actionClass, actionSelector) {
		var action = row.querySelector(actionSelector);
		if (!action) {
			var action = document.createElement('span');
			action.className = actionClass;
			if (actionClass === this.searchActionClass) {
				action.innerHTML = '<span class="' + CLASS_ICON + ' ' + CLASS_ICON_SEARCH + '"></span><span>' + this.element.getAttribute('placeholder') + '</span>';
				this.element.setAttribute('placeholder', '');
				if (this.element.value.trim()) {
					row.classList.add('mui-active');
				}
			}
			row.insertBefore(action, this.element.nextSibling);
		}
		return action;
	};
	Input.prototype.initElementEvent = function() {
		var element = this.element;

		if (this.sliderActionClass) {
			var tooltip = this.sliderAction;
			var timer = null;
			var showTip = function() { //每次重新计算是因为控件可能被隐藏，初始化时计算是不正确的
				tooltip.classList.remove(CLASS_HIDDEN);
				var offsetLeft = element.offsetLeft;
				var width = element.offsetWidth - 28;
				var tooltipWidth = tooltip.offsetWidth;
				var distince = Math.abs(element.max - element.min);
				var scaleWidth = (width / distince) * Math.abs(element.value - element.min);
				tooltip.style.left = (14 + offsetLeft + scaleWidth - tooltipWidth / 2) + 'px';
				tooltip.innerText = element.value;
				if (timer) {
					clearTimeout(timer);
				}
				timer = setTimeout(function() {
					tooltip.classList.add(CLASS_HIDDEN);
				}, 1000);
			};
			element.addEventListener('input', showTip);
			element.addEventListener('tap', showTip);
			element.addEventListener($.EVENT_MOVE, function(e) {
				e.stopPropagation();
			});
		} else {
			if (this.clearActionClass) {
				var action = this.clearAction;
				if (!action) {
					return;
				}
				$.each(['keyup', 'change', 'input', 'focus', 'cut', 'paste'], function(index, type) {
					(function(type) {
						element.addEventListener(type, function() {
							action.classList[element.value.trim() ? 'remove' : 'add'](CLASS_HIDDEN);
						});
					})(type);
				});
				element.addEventListener('blur', function() {
					action.classList.add(CLASS_HIDDEN);
				});
			}
			if (this.searchActionClass) {
				element.addEventListener('focus', function() {
					element.parentNode.classList.add('mui-active');
				});
				element.addEventListener('blur', function() {
					if (!element.value.trim()) {
						element.parentNode.classList.remove('mui-active');
					}
				});
			}
		}
	};
	Input.prototype.setPlaceholder = function(text) {
		if (this.searchActionClass) {
			var placeholder = this.element.parentNode.querySelector(SELECTOR_PLACEHOLDER);
			placeholder && (placeholder.getElementsByTagName('span')[1].innerText = text);
		} else {
			this.element.setAttribute('placeholder', text);
		}
	};
	Input.prototype.passwordActionClick = function(event) {
		if (this.element.type === 'text') {
			this.element.type = 'password';
		} else {
			this.element.type = 'text';
		}
		this.passwordAction.classList.toggle('mui-active');
		event.preventDefault();
	};
	Input.prototype.clearActionClick = function(event) {
		var self = this;
		self.element.value = '';
		$.focus(self.element);
		self.clearAction.classList.add(CLASS_HIDDEN);
		event.preventDefault();
	};
	Input.prototype.speechActionClick = function(event) {
		if (window.plus) {
			var self = this;
			var oldValue = self.element.value;
			self.element.value = '';
			document.body.classList.add(CLASS_FOCUSIN);
			plus.speech.startRecognize({
				engine: 'iFly'
			}, function(s) {
				self.element.value += s;
				$.focus(self.element);
				plus.speech.stopRecognize();
				$.trigger(self.element, 'recognized', {
					value: self.element.value
				});
				if (oldValue !== self.element.value) {
					$.trigger(self.element, 'change');
					$.trigger(self.element, 'input');
				}
				// document.body.classList.remove(CLASS_FOCUSIN);
			}, function(e) {
				document.body.classList.remove(CLASS_FOCUSIN);
			});
		} else {
			alert('only for 5+');
		}
		event.preventDefault();
	};
	$.fn.input = function(options) {
		var inputApis = [];
		this.each(function() {
			var inputApi = null;
			var actions = [];
			var row = findRow(this.parentNode);
			if (this.type === 'range' && row.classList.contains('mui-input-range')) {
				actions.push('slider');
			} else {
				var classList = this.classList;
				if (classList.contains('mui-input-clear')) {
					actions.push('clear');
				}
				if (!($.os.android && $.os.stream) && classList.contains('mui-input-speech')) {
					actions.push('speech');
				}
				if (classList.contains('mui-input-password')) {
					actions.push('password');
				}
				if (this.type === 'search' && row.classList.contains('mui-search')) {
					actions.push('search');
				}
			}
			var id = this.getAttribute('data-input-' + actions[0]);
			if (!id) {
				id = ++$.uuid;
				inputApi = $.data[id] = new Input(this, {
					actions: actions.join(',')
				});
				for (var i = 0, len = actions.length; i < len; i++) {
					this.setAttribute('data-input-' + actions[i], id);
				}
			} else {
				inputApi = $.data[id];
			}
			inputApis.push(inputApi);
		});
		return inputApis.length === 1 ? inputApis[0] : inputApis;
	};
	$.ready(function() {
		$('.mui-input-row input').input();
	});
})(mui, window, document);
(function($, window) {
    var CLASS_ACTIVE = 'mui-active';
    var rgbaRegex = /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d*(?:\.\d+)?)\)$/;
    var getColor = function(colorStr) {
        var matches = colorStr.match(rgbaRegex);
        if (matches && matches.length === 5) {
            return [
                matches[1],
                matches[2],
                matches[3],
                matches[4]
            ];
        }
        return [];
    };
    var Transparent = function(element, options) {
        this.element = element;
        this.options = $.extend({
            top: 0, //距离顶部高度(到达该高度即触发)
            offset: 150, //滚动透明距离
            duration: 16, //过渡时间
            scrollby: window//监听滚动距离容器
        }, options || {});

        this.scrollByElem = this.options.scrollby || window;
        if (!this.scrollByElem) {
            throw new Error("监听滚动的元素不存在");
        }
        this.isNativeScroll = false;
        if (this.scrollByElem === window) {
            this.isNativeScroll = true;
        } else if (!~this.scrollByElem.className.indexOf('mui-scroll-wrapper')) {
            this.isNativeScroll = true;
        }

        this._style = this.element.style;
        this._bgColor = this._style.backgroundColor;
        var color = getColor(mui.getStyles(this.element, 'backgroundColor'));
        if (color.length) {
            this._R = color[0];
            this._G = color[1];
            this._B = color[2];
            this._A = parseFloat(color[3]);
            this.lastOpacity = this._A;
            this._bufferFn = $.buffer(this.handleScroll, this.options.duration, this);
            this.initEvent();
        } else {
            throw new Error("元素背景颜色必须为RGBA");
        }
    };

    Transparent.prototype.initEvent = function() {
        this.scrollByElem.addEventListener('scroll', this._bufferFn);
        if (this.isNativeScroll) { //原生scroll
            this.scrollByElem.addEventListener($.EVENT_MOVE, this._bufferFn);
        }
    }
    Transparent.prototype.handleScroll = function(e) {
        var y = window.scrollY;
        if (!this.isNativeScroll && e && e.detail) {
            y = -e.detail.y;
        }
        var opacity = (y - this.options.top) / this.options.offset + this._A;
        opacity = Math.min(Math.max(this._A, opacity), 1);
        this._style.backgroundColor = 'rgba(' + this._R + ',' + this._G + ',' + this._B + ',' + opacity + ')';
        if (opacity > this._A) {
            this.element.classList.add(CLASS_ACTIVE);
        } else {
            this.element.classList.remove(CLASS_ACTIVE);
        }
        if (this.lastOpacity !== opacity) {
            $.trigger(this.element, 'alpha', {
                alpha: opacity
            });
            this.lastOpacity = opacity;
        }
    };
    Transparent.prototype.destory = function() {
        this.scrollByElem.removeEventListener('scroll', this._bufferFn);
        this.scrollByElem.removeEventListener($.EVENT_MOVE, this._bufferFn);
        this.element.style.backgroundColor = this._bgColor;
        this.element.mui_plugin_transparent = null;
    };
    $.fn.transparent = function(options) {
        options = options || {};
        var transparentApis = [];
        this.each(function() {
            var transparentApi = this.mui_plugin_transparent;
            if (!transparentApi) {
                var top = this.getAttribute('data-top');
                var offset = this.getAttribute('data-offset');
                var duration = this.getAttribute('data-duration');
                var scrollby = this.getAttribute('data-scrollby');
                if (top !== null && typeof options.top === 'undefined') {
                    options.top = top;
                }
                if (offset !== null && typeof options.offset === 'undefined') {
                    options.offset = offset;
                }
                if (duration !== null && typeof options.duration === 'undefined') {
                    options.duration = duration;
                }
                if (scrollby !== null && typeof options.scrollby === 'undefined') {
                    options.scrollby = document.querySelector(scrollby) || window;
                }
                transparentApi = this.mui_plugin_transparent = new Transparent(this, options);
            }
            transparentApis.push(transparentApi);
        });
        return transparentApis.length === 1 ? transparentApis[0] : transparentApis;
    };
    $.ready(function() {
        $('.mui-bar-transparent').transparent();
    });
})(mui, window);
/**
 * 数字输入框
 * varstion 1.0.1
 * by Houfeng
 * Houfeng@DCloud.io
 */

(function($) {

    var touchSupport = ('ontouchstart' in document);
    var tapEventName = touchSupport ? 'tap' : 'click';
    var changeEventName = 'change';
    var holderClassName = 'mui-numbox';
    var plusClassSelector = '.mui-btn-numbox-plus,.mui-numbox-btn-plus';
    var minusClassSelector = '.mui-btn-numbox-minus,.mui-numbox-btn-minus';
    var inputClassSelector = '.mui-input-numbox,.mui-numbox-input';

    var Numbox = $.Numbox = $.Class.extend({
        /**
         * 构造函数
         **/
        init: function(holder, options) {
            var self = this;
            if (!holder) {
                throw "构造 numbox 时缺少容器元素";
            }
            self.holder = holder;
            options = options || {};
            options.step = parseInt(options.step || 1);
            self.options = options;
            self.input = $.qsa(inputClassSelector, self.holder)[0];
            self.plus = $.qsa(plusClassSelector, self.holder)[0];
            self.minus = $.qsa(minusClassSelector, self.holder)[0];
            self.checkValue();
            self.initEvent();
        },
        /**
         * 初始化事件绑定
         **/
        initEvent: function() {
            var self = this;
            self.plus.addEventListener(tapEventName, function(event) {
                var val = parseInt(self.input.value) + self.options.step;
                self.input.value = val.toString();
                $.trigger(self.input, changeEventName, null);
            });
            self.minus.addEventListener(tapEventName, function(event) {
                var val = parseInt(self.input.value) - self.options.step;
                self.input.value = val.toString();
                $.trigger(self.input, changeEventName, null);
            });
            self.input.addEventListener(changeEventName, function(event) {
                self.checkValue();
                var val = parseInt(self.input.value);
                //触发顶层容器
                $.trigger(self.holder, changeEventName, {
                    value: val
                });
            });
        },
        /**
         * 获取当前值
         **/
        getValue: function() {
            var self = this;
            return parseInt(self.input.value);
        },
        /**
         * 验证当前值是法合法
         **/
        checkValue: function() {
            var self = this;
            var val = self.input.value;
            if (val == null || val == '' || isNaN(val)) {
                self.input.value = self.options.min || 0;
                self.minus.disabled = self.options.min != null;
            } else {
                var val = parseInt(val);
                if (self.options.max != null && !isNaN(self.options.max) && val >= parseInt(self.options.max)) {
                    val = self.options.max;
                    self.plus.disabled = true;
                } else {
                    self.plus.disabled = false;
                }
                if (self.options.min != null && !isNaN(self.options.min) && val <= parseInt(self.options.min)) {
                    val = self.options.min;
                    self.minus.disabled = true;
                } else {
                    self.minus.disabled = false;
                }
                self.input.value = val;
            }
        },
        /**
         * 更新选项
         **/
        setOption: function(name, value) {
            var self = this;
            self.options[name] = value;
        },
        /**
         * 动态设置新值
         **/
        setValue: function(value) {
            this.input.value = value;
            this.checkValue();
        }
    });

    $.fn.numbox = function(options) {
        var instanceArray = [];
        //遍历选择的元素
        this.each(function(i, element) {
            if (element.numbox) {
                return;
            }
            if (options) {
                element.numbox = new Numbox(element, options);
            } else {
                var optionsText = element.getAttribute('data-numbox-options');
                var options = optionsText ? JSON.parse(optionsText) : {};
                options.step = element.getAttribute('data-numbox-step') || options.step;
                options.min = element.getAttribute('data-numbox-min') || options.min;
                options.max = element.getAttribute('data-numbox-max') || options.max;
                element.numbox = new Numbox(element, options);
            }
        });
        return this[0] ? this[0].numbox : null;
    }

    //自动处理 class='mui-locker' 的 dom
    $.ready(function() {
        $('.' + holderClassName).numbox();
    });

}(mui));
/**
 * Button
 * @param {type} $
 * @param {type} window
 * @param {type} document
 * @returns {undefined}
 */
(function($, window, document) {
    var CLASS_ICON = 'mui-icon';
    var CLASS_DISABLED = 'mui-disabled';

    var STATE_RESET = 'reset';
    var STATE_LOADING = 'loading';

    var defaultOptions = {
        loadingText: 'Loading...', //文案
        loadingIcon: 'mui-spinner' + ' ' + 'mui-spinner-white', //图标，可为空
        loadingIconPosition: 'left' //图标所处位置，仅支持left|right
    };

    var Button = function(element, options) {
        this.element = element;
        this.options = $.extend({}, defaultOptions, options);
        if (!this.options.loadingText) {
            this.options.loadingText = defaultOptions.loadingText;
        }
        if (this.options.loadingIcon === null) {
            this.options.loadingIcon = 'mui-spinner';
            if ($.getStyles(this.element, 'color') === 'rgb(255, 255, 255)') {
                this.options.loadingIcon += ' ' + 'mui-spinner-white';
            }
        }
        this.isInput = this.element.tagName === 'INPUT';
        this.resetHTML = this.isInput ? this.element.value : this.element.innerHTML;
        this.state = '';
    };
    Button.prototype.loading = function() {
        this.setState(STATE_LOADING);
    };
    Button.prototype.reset = function() {
        this.setState(STATE_RESET);
    };
    Button.prototype.setState = function(state) {
        if (this.state === state) {
            return false;
        }
        this.state = state;
        if (state === STATE_RESET) {
            this.element.disabled = false;
            this.element.classList.remove(CLASS_DISABLED);
            this.setHtml(this.resetHTML);
        } else if (state === STATE_LOADING) {
            this.element.disabled = true;
            this.element.classList.add(CLASS_DISABLED);
            var html = this.isInput ? this.options.loadingText : ('<span>' + this.options.loadingText + '</span>');
            if (this.options.loadingIcon && !this.isInput) {
                if (this.options.loadingIconPosition === 'right') {
                    html += '&nbsp;<span class="' + this.options.loadingIcon + '"></span>';
                } else {
                    html = '<span class="' + this.options.loadingIcon + '"></span>&nbsp;' + html;
                }
            }
            this.setHtml(html);
        }
    };
    Button.prototype.setHtml = function(html) {
        if (this.isInput) {
            this.element.value = html;
        } else {
            this.element.innerHTML = html;
        }
    }
    $.fn.button = function(state) {
        var buttonApis = [];
        this.each(function() {
            var buttonApi = this.mui_plugin_button;
            if (!buttonApi) {
                var loadingText = this.getAttribute('data-loading-text');
                var loadingIcon = this.getAttribute('data-loading-icon');
                var loadingIconPosition = this.getAttribute('data-loading-icon-position');
                this.mui_plugin_button = buttonApi = new Button(this, {
                    loadingText: loadingText,
                    loadingIcon: loadingIcon,
                    loadingIconPosition: loadingIconPosition
                });
            }
            if (state === STATE_LOADING || state === STATE_RESET) {
                buttonApi.setState(state);
            }
            buttonApis.push(buttonApi);
        });
        return buttonApis.length === 1 ? buttonApis[0] : buttonApis;
    };
})(mui, window, document);
(function($, window, document) {
	var STATE_BEFORECHANGEOFFSET = 'beforeChangeOffset';
	var STATE_AFTERCHANGEOFFSET = 'afterChangeOffset';

	var EVENT_PULLSTART = 'pullstart';
	var EVENT_PULLING = 'pulling';
	var EVENT_BEFORECHANGEOFFSET = STATE_BEFORECHANGEOFFSET;
	var EVENT_AFTERCHANGEOFFSET = STATE_AFTERCHANGEOFFSET;
	var EVENT_DRAGENDAFTERCHANGEOFFSET = 'dragEndAfterChangeOffset';

	var CLASS_TRANSITIONING = $.className('transitioning');
	var CLASS_PULL_TOP_TIPS = $.className('pull-top-tips');
	var CLASS_PULL_BOTTOM_TIPS = $.className('pull-bottom-tips');
	var CLASS_PULL_LOADING = $.className('pull-loading');
	var CLASS_SCROLL = $.className('scroll');

	var CLASS_PULL_TOP_ARROW = $.className('pull-loading') + ' ' + $.className('icon') + ' ' + $.className('icon-pulldown');
	var CLASS_PULL_TOP_ARROW_REVERSE = CLASS_PULL_TOP_ARROW + ' ' + $.className('reverse');
	var CLASS_PULL_TOP_SPINNER = $.className('pull-loading') + ' ' + $.className('spinner');
	var CLASS_HIDDEN = $.className('hidden');

	var SELECTOR_PULL_LOADING = '.' + CLASS_PULL_LOADING;
	$.PullToRefresh = $.Class.extend({
		init: function(element, options) {
			this.element = element;
			this.options = $.extend(true, {
				down: {
					height: 75,
					callback: false,
				},
				up: {
					auto: false,
					offset: 100, //距离底部高度(到达该高度即触发)
					show: true,
					contentinit: '上拉显示更多',
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了',
					callback: false
				},
				preventDefaultException: {
					tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
				}
			}, options);
			
			this.stopped = this.isNeedRefresh = this.isDragging = false;
			this.state = STATE_BEFORECHANGEOFFSET;
			this.isInScroll = this.element.classList.contains(CLASS_SCROLL);
			this.initPullUpTips();

			this.initEvent();
		},
		_preventDefaultException: function(el, exceptions) {
			for (var i in exceptions) {
				if (exceptions[i].test(el[i])) {
					return true;
				}
			}
			return false;
		},
		initEvent: function() {
			if ($.isFunction(this.options.down.callback)) {
				this.element.addEventListener($.EVENT_START, this);
				this.element.addEventListener('drag', this);
				this.element.addEventListener('dragend', this);
			}
			if (this.pullUpTips) {
				this.element.addEventListener('dragup', this);
				if (this.isInScroll) {
					this.element.addEventListener('scrollbottom', this);
				} else {
					window.addEventListener('scroll', this);
				}
			}
		},
		handleEvent: function(e) {
			switch (e.type) {
				case $.EVENT_START:
					this.isInScroll && this._canPullDown() && e.target && !this._preventDefaultException(e.target, this.options.preventDefaultException) && e.preventDefault();
					break;
				case 'drag':
					this._drag(e);
					break;
				case 'dragend':
					this._dragend(e);
					break;
				case 'webkitTransitionEnd':
					this._transitionEnd(e);
					break;
				case 'dragup':
				case 'scroll':
					this._dragup(e);
					break;
				case 'scrollbottom':
					if (e.target === this.element) {
						this.pullUpLoading(e);
					}
					break;
			}
		},
		initPullDownTips: function() {
			var self = this;
			if ($.isFunction(self.options.down.callback)) {
				self.pullDownTips = (function() {
					var element = document.querySelector('.' + CLASS_PULL_TOP_TIPS);
					if (element) {
						element.parentNode.removeChild(element);
					}
					if (!element) {
						element = document.createElement('div');
						element.classList.add(CLASS_PULL_TOP_TIPS);
						element.innerHTML = '<div class="mui-pull-top-wrapper"><span class="mui-pull-loading mui-icon mui-icon-pulldown"></span></div>';
						element.addEventListener('webkitTransitionEnd', self);
					}
					self.pullDownTipsIcon = element.querySelector(SELECTOR_PULL_LOADING);
					document.body.appendChild(element);
					return element;
				}());
			}
		},
		initPullUpTips: function() {
			var self = this;
			if ($.isFunction(self.options.up.callback)) {
				self.pullUpTips = (function() {
					var element = self.element.querySelector('.' + CLASS_PULL_BOTTOM_TIPS);
					if (!element) {
						element = document.createElement('div');
						element.classList.add(CLASS_PULL_BOTTOM_TIPS);
						if (!self.options.up.show) {
							element.classList.add(CLASS_HIDDEN);
						}
						element.innerHTML = '<div class="mui-pull-bottom-wrapper"><span class="mui-pull-loading">' + self.options.up.contentinit + '</span></div>';
						self.element.appendChild(element);
					}
					self.pullUpTipsIcon = element.querySelector(SELECTOR_PULL_LOADING);
					return element;
				}());
			}
		},
		_transitionEnd: function(e) {
			if (e.target === this.pullDownTips && this.removing) {
				this.removePullDownTips();
			}
		},
		_dragup: function(e) {
			var self = this;
			if (self.loading) {
				return;
			}
			if (e && e.detail && $.gestures.session.drag) {
				self.isDraggingUp = true;
			} else {
				if (!self.isDraggingUp) { //scroll event
					return;
				}
			}
			if (!self.isDragging) {
				if (self._canPullUp()) {
					self.pullUpLoading(e);
				}
			}
		},
		_canPullUp: function() {
			if (this.removing) {
				return false;
			}
			if (this.isInScroll) {
				var scrollId = this.element.parentNode.getAttribute('data-scroll');
				if (scrollId) {
					var scrollApi = $.data[scrollId];
					return scrollApi.y === scrollApi.maxScrollY;
				}
			}
			return window.pageYOffset + window.innerHeight + this.options.up.offset >= document.documentElement.scrollHeight;
		},
		_canPullDown: function() {
			if (this.removing) {
				return false;
			}
			if (this.isInScroll) {
				var scrollId = this.element.parentNode.getAttribute('data-scroll');
				if (scrollId) {
					var scrollApi = $.data[scrollId];
					return scrollApi.y === 0;
				}
			}
			return document.body.scrollTop === 0;
		},
		_drag: function(e) {
			if (this.loading || this.stopped) {
				e.stopPropagation();
				e.detail.gesture.preventDefault();
				return;
			}
			var detail = e.detail;
			if (!this.isDragging) {
				if (detail.direction === 'down' && this._canPullDown()) {
					if (document.querySelector('.' + CLASS_PULL_TOP_TIPS)) {
						e.stopPropagation();
						e.detail.gesture.preventDefault();
						return;
					}
					this.isDragging = true;
					this.removing = false;
					this.startDeltaY = detail.deltaY;
					$.gestures.session.lockDirection = true; //锁定方向
					$.gestures.session.startDirection = detail.direction;
					this._pullStart(this.startDeltaY);
				}
			}
			if (this.isDragging) {
				e.stopPropagation();
				e.detail.gesture.preventDefault();
				var deltaY = detail.deltaY - this.startDeltaY;
				deltaY = Math.min(deltaY, 1.5 * this.options.down.height);
				this.deltaY = deltaY;
				this._pulling(deltaY);
				var state = deltaY > this.options.down.height ? STATE_AFTERCHANGEOFFSET : STATE_BEFORECHANGEOFFSET;
				if (this.state !== state) {
					this.state = state;
					if (this.state === STATE_AFTERCHANGEOFFSET) {
						this.removing = false;
						this.isNeedRefresh = true;
					} else {
						this.removing = true;
						this.isNeedRefresh = false;
					}
					this['_' + state](deltaY);
				}
				if ($.os.ios && parseFloat($.os.version) >= 8) {
					var clientY = detail.gesture.touches[0].clientY;
					if ((clientY + 10) > window.innerHeight || clientY < 10) {
						this._dragend(e);
						return;
					}
				}
			}
		},
		_dragend: function(e) {
			var self = this;
			if (self.isDragging) {
				self.isDragging = false;
				self._dragEndAfterChangeOffset(self.isNeedRefresh);
			}
			if (self.isPullingUp) {
				if (self.pullingUpTimeout) {
					clearTimeout(self.pullingUpTimeout);
				}
				self.pullingUpTimeout = setTimeout(function() {
					self.isPullingUp = false;
				}, 1000);
			}
		},
		_pullStart: function(startDeltaY) {
			this.pullStart(startDeltaY);
			$.trigger(this.element, EVENT_PULLSTART, {
				api: this,
				startDeltaY: startDeltaY
			});
		},
		_pulling: function(deltaY) {
			this.pulling(deltaY);
			$.trigger(this.element, EVENT_PULLING, {
				api: this,
				deltaY: deltaY
			});
		},
		_beforeChangeOffset: function(deltaY) {
			this.beforeChangeOffset(deltaY);
			$.trigger(this.element, EVENT_BEFORECHANGEOFFSET, {
				api: this,
				deltaY: deltaY
			});
		},
		_afterChangeOffset: function(deltaY) {
			this.afterChangeOffset(deltaY);
			$.trigger(this.element, EVENT_AFTERCHANGEOFFSET, {
				api: this,
				deltaY: deltaY
			});
		},
		_dragEndAfterChangeOffset: function(isNeedRefresh) {
			this.dragEndAfterChangeOffset(isNeedRefresh);
			$.trigger(this.element, EVENT_DRAGENDAFTERCHANGEOFFSET, {
				api: this,
				isNeedRefresh: isNeedRefresh
			});
		},
		removePullDownTips: function() {
			if (this.pullDownTips) {
				try {
					this.pullDownTips.parentNode && this.pullDownTips.parentNode.removeChild(this.pullDownTips);
					this.pullDownTips = null;
					this.removing = false;
				} catch (e) {}
			}
		},
		pullStart: function(startDeltaY) {
			this.initPullDownTips(startDeltaY);
		},
		pulling: function(deltaY) {
			this.pullDownTips.style.webkitTransform = 'translate3d(0,' + deltaY + 'px,0)';
		},
		beforeChangeOffset: function(deltaY) {
			this.pullDownTipsIcon.className = CLASS_PULL_TOP_ARROW;
		},
		afterChangeOffset: function(deltaY) {
			this.pullDownTipsIcon.className = CLASS_PULL_TOP_ARROW_REVERSE;
		},
		dragEndAfterChangeOffset: function(isNeedRefresh) {
			if (isNeedRefresh) {
				this.pullDownTipsIcon.className = CLASS_PULL_TOP_SPINNER;
				this.pullDownLoading();
			} else {
				this.pullDownTipsIcon.className = CLASS_PULL_TOP_ARROW;
				this.endPullDownToRefresh();
			}
		},
		pullDownLoading: function() {
			if (this.loading) {
				return;
			}
			if (!this.pullDownTips) {
				this.initPullDownTips();
				this.dragEndAfterChangeOffset(true);
				return;
			}
			this.loading = true;
			this.pullDownTips.classList.add(CLASS_TRANSITIONING);
			this.pullDownTips.style.webkitTransform = 'translate3d(0,' + this.options.down.height + 'px,0)';
			this.options.down.callback.apply(this);
		},
		pullUpLoading: function(e) {
			if (this.loading || this.finished) {
				return;
			}
			this.loading = true;
			this.isDraggingUp = false;
			this.pullUpTips.classList.remove(CLASS_HIDDEN);
			e && e.detail && e.detail.gesture && e.detail.gesture.preventDefault();
			this.pullUpTipsIcon.innerHTML = this.options.up.contentrefresh;
			this.options.up.callback.apply(this);
		},
		endPullDownToRefresh: function() {
			this.loading = false;
			this.pullUpTips && this.pullUpTips.classList.remove(CLASS_HIDDEN);
			this.pullDownTips.classList.add(CLASS_TRANSITIONING);
			this.pullDownTips.style.webkitTransform = 'translate3d(0,0,0)';
			if (this.deltaY <= 0) {
				this.removePullDownTips();
			} else {
				this.removing = true;
			}
			if (this.isInScroll) {
				$(this.element.parentNode).scroll().refresh();
			}
		},
		endPullUpToRefresh: function(finished) {
			if (finished) {
				this.finished = true;
				this.pullUpTipsIcon.innerHTML = this.options.up.contentnomore;
				this.element.removeEventListener('dragup', this);
				window.removeEventListener('scroll', this);
			} else {
				this.pullUpTipsIcon.innerHTML = this.options.up.contentdown;
			}
			this.loading = false;
			if (this.isInScroll) {
				$(this.element.parentNode).scroll().refresh();
			}
		},
		setStopped: function(stopped) {
			if (stopped != this.stopped) {
				this.stopped = stopped;
				this.pullUpTips && this.pullUpTips.classList[stopped ? 'add' : 'remove'](CLASS_HIDDEN);
			}
		},
		refresh: function(isReset) {
			if (isReset && this.finished && this.pullUpTipsIcon) {
				this.pullUpTipsIcon.innerHTML = this.options.up.contentdown;
				this.element.addEventListener('dragup', this);
				window.addEventListener('scroll', this);
				this.finished = false;
			}
		}
	});
	$.fn.pullToRefresh = function(options) {
		var pullRefreshApis = [];
		options = options || {};
		this.each(function() {
			var self = this;
			var pullRefreshApi = null;
			var id = self.getAttribute('data-pullToRefresh');
			if (!id) {
				id = ++$.uuid;
				$.data[id] = pullRefreshApi = new $.PullToRefresh(self, options);
				self.setAttribute('data-pullToRefresh', id);
			} else {
				pullRefreshApi = $.data[id];
			}
			if (options.up && options.up.auto) { //如果设置了auto，则自动上拉一次
				pullRefreshApi.pullUpLoading();
			}
			pullRefreshApis.push(pullRefreshApi);
		});
		return pullRefreshApis.length === 1 ? pullRefreshApis[0] : pullRefreshApis;
	}
})(mui, window, document);
(function($) {
	var CLASS_PULL_TOP_TIPS = $.className('pull-top-tips');

	$.PullToRefresh = $.PullToRefresh.extend({
		init: function(element, options) {
			this._super(element, options);
			this.options = $.extend(true, {
				down: {
					tips: {
						colors: ['008000', 'd8ad44', 'd00324', 'dc00b8', '017efc'],
						size: 200, //width=height=size;x=y=size/2;radius=size/4
						lineWidth: 15,
						duration: 1000,
						tail_duration: 1000 * 2.5
					}
				}
			}, this.options);
			this.options.down.tips.color = this.options.down.tips.colors[0];
			this.options.down.tips.colors = this.options.down.tips.colors.map(function(color) {
				return {
					r: parseInt(color.substring(0, 2), 16),
					g: parseInt(color.substring(2, 4), 16),
					b: parseInt(color.substring(4, 6), 16)
				};
			});
		},
		initPullDownTips: function() {
			var self = this;
			if ($.isFunction(self.options.down.callback)) {
				self.pullDownTips = (function() {
					var element = document.querySelector('.' + CLASS_PULL_TOP_TIPS);
					if (element) {
						element.parentNode.removeChild(element);
					}
					if (!element) {
						element = document.createElement('div');
						element.classList.add(CLASS_PULL_TOP_TIPS);
						element.innerHTML = '<div class="mui-pull-top-wrapper"><div class="mui-pull-top-canvas"><canvas id="pullDownTips" width="' + self.options.down.tips.size + '" height="' + self.options.down.tips.size + '"></canvas></div></div>';
						element.addEventListener('webkitTransitionEnd', self);
						document.body.appendChild(element);
					}
					self.pullDownCanvas = document.getElementById("pullDownTips");
					self.pullDownCanvasCtx = self.pullDownCanvas.getContext('2d');
					self.canvasUtils.init(self.pullDownCanvas, self.options.down.tips);
					return element;
				}());
			}
		},
		removePullDownTips: function() {
			this._super();
			this.canvasUtils.stopSpin();
		},
		pulling: function(deltaY) {
			var ratio = Math.min(deltaY / (this.options.down.height * 1.5), 1);
			var ratioPI = Math.min(1, ratio * 2);
			this.pullDownTips.style.webkitTransform = 'translate3d(0,' + (deltaY < 0 ? 0 : deltaY) + 'px,0)';
			this.pullDownCanvas.style.opacity = ratioPI;
			this.pullDownCanvas.style.webkitTransform = 'rotate(' + 300 * ratio + 'deg)';
			var canvas = this.pullDownCanvas;
			var ctx = this.pullDownCanvasCtx;
			var size = this.options.down.tips.size;
			ctx.lineWidth = this.options.down.tips.lineWidth;
			ctx.fillStyle = '#' + this.options.down.tips.color;
			ctx.strokeStyle = '#' + this.options.down.tips.color;
			ctx.stroke();
			ctx.clearRect(0, 0, size, size);
			//fixed android 4.1.x
			canvas.style.display = 'none'; // Detach from DOM
			canvas.offsetHeight; // Force the detach
			canvas.style.display = 'inherit'; // Reattach to DOM
			this.canvasUtils.drawArcedArrow(ctx, size / 2 + 0.5, size / 2, size / 4, 0 * Math.PI, 5 / 3 * Math.PI * ratioPI, false, 1, 2, 0.7853981633974483, 25, this.options.down.tips.lineWidth, this.options.down.tips.lineWidth);
		},

		beforeChangeOffset: function(deltaY) {},
		afterChangeOffset: function(deltaY) {},
		dragEndAfterChangeOffset: function(isNeedRefresh) {
			if (isNeedRefresh) {
				this.canvasUtils.startSpin();
				this.pullDownLoading();
			} else {
				this.canvasUtils.stopSpin();
				this.endPullDownToRefresh();
			}
		},
		canvasUtils: (function() {
			var canvasObj = null,
				ctx = null,
				size = 200,
				lineWidth = 15,
				tick = 0,
				startTime = 0,
				frameTime = 0,
				timeLast = 0,
				oldStep = 0,
				acc = 0,
				head = 0,
				tail = 180,
				rad = Math.PI / 180,
				duration = 1000,
				tail_duration = 1000 * 2.5,
				colors = ['35ad0e', 'd8ad44', 'd00324', 'dc00b8', '017efc'],
				rAF = null;

			function easeLinear(currentIteration, startValue, changeInValue, totalIterations) {
				return changeInValue * currentIteration / totalIterations + startValue;
			}

			function easeInOutQuad(currentIteration, startValue, changeInValue, totalIterations) {
				if ((currentIteration /= totalIterations / 2) < 1) {
					return changeInValue / 2 * currentIteration * currentIteration + startValue;
				}
				return -changeInValue / 2 * ((--currentIteration) * (currentIteration - 2) - 1) + startValue;
			}

			function minmax(value, v0, v1) {
				var min = Math.min(v0, v1);
				var max = Math.max(v0, v1);
				if (value < min)
					return min;
				if (value > max)
					return min;
				return value;
			}
			var drawHead = function(ctx, x0, y0, x1, y1, x2, y2, style) {
				'use strict';
				if (typeof(x0) == 'string') x0 = parseInt(x0);
				if (typeof(y0) == 'string') y0 = parseInt(y0);
				if (typeof(x1) == 'string') x1 = parseInt(x1);
				if (typeof(y1) == 'string') y1 = parseInt(y1);
				if (typeof(x2) == 'string') x2 = parseInt(x2);
				if (typeof(y2) == 'string') y2 = parseInt(y2);
				var radius = 3;
				var twoPI = 2 * Math.PI;
				ctx.save();
				ctx.beginPath();
				ctx.moveTo(x0, y0);
				ctx.lineTo(x1, y1);
				ctx.lineTo(x2, y2);
				switch (style) {
					case 0:
						var backdist = Math.sqrt(((x2 - x0) * (x2 - x0)) + ((y2 - y0) * (y2 - y0)));
						ctx.arcTo(x1, y1, x0, y0, .55 * backdist);
						ctx.fill();
						break;
					case 1:
						ctx.beginPath();
						ctx.moveTo(x0, y0);
						ctx.lineTo(x1, y1);
						ctx.lineTo(x2, y2);
						ctx.lineTo(x0, y0);
						ctx.fill();
						break;
					case 2:
						ctx.stroke();
						break;
					case 3:
						var cpx = (x0 + x1 + x2) / 3;
						var cpy = (y0 + y1 + y2) / 3;
						ctx.quadraticCurveTo(cpx, cpy, x0, y0);
						ctx.fill();
						break;
					case 4:
						var cp1x, cp1y, cp2x, cp2y, backdist;
						var shiftamt = 5;
						if (x2 == x0) {
							backdist = y2 - y0;
							cp1x = (x1 + x0) / 2;
							cp2x = (x1 + x0) / 2;
							cp1y = y1 + backdist / shiftamt;
							cp2y = y1 - backdist / shiftamt;
						} else {
							backdist = Math.sqrt(((x2 - x0) * (x2 - x0)) + ((y2 - y0) * (y2 - y0)));
							var xback = (x0 + x2) / 2;
							var yback = (y0 + y2) / 2;
							var xmid = (xback + x1) / 2;
							var ymid = (yback + y1) / 2;
							var m = (y2 - y0) / (x2 - x0);
							var dx = (backdist / (2 * Math.sqrt(m * m + 1))) / shiftamt;
							var dy = m * dx;
							cp1x = xmid - dx;
							cp1y = ymid - dy;
							cp2x = xmid + dx;
							cp2y = ymid + dy;
						}
						ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x0, y0);
						ctx.fill();
						break;
				}
				ctx.restore();
			};
			var drawArcedArrow = function(ctx, x, y, r, startangle, endangle, anticlockwise, style, which, angle, d, lineWidth, lineRatio) {
				'use strict';
				style = typeof(style) != 'undefined' ? style : 3;
				which = typeof(which) != 'undefined' ? which : 1;
				angle = typeof(angle) != 'undefined' ? angle : Math.PI / 8;
				lineWidth = lineWidth || 1;
				lineRatio = lineRatio || 10;
				d = typeof(d) != 'undefined' ? d : 10;
				ctx.save();
				ctx.lineWidth = lineWidth;
				ctx.beginPath();
				ctx.arc(x, y, r, startangle, endangle, anticlockwise);
				ctx.stroke();
				var sx, sy, lineangle, destx, desty;
				if (which & 1) {
					sx = Math.cos(startangle) * r + x;
					sy = Math.sin(startangle) * r + y;
					lineangle = Math.atan2(x - sx, sy - y);
					if (anticlockwise) {
						destx = sx + 10 * Math.cos(lineangle);
						desty = sy + 10 * Math.sin(lineangle);
					} else {
						destx = sx - 10 * Math.cos(lineangle);
						desty = sy - 10 * Math.sin(lineangle);
					}
					drawArrow(ctx, sx, sy, destx, desty, style, 2, angle, d);
				}
				if (which & 2) {
					sx = Math.cos(endangle) * r + x;
					sy = Math.sin(endangle) * r + y;
					lineangle = Math.atan2(x - sx, sy - y);
					if (anticlockwise) {
						destx = sx - 10 * Math.cos(lineangle);
						desty = sy - 10 * Math.sin(lineangle);
					} else {
						destx = sx + 10 * Math.cos(lineangle);
						desty = sy + 10 * Math.sin(lineangle);
					}
					drawArrow(ctx, sx - lineRatio * Math.sin(endangle), sy + lineRatio * Math.cos(endangle), destx - lineRatio * Math.sin(endangle), desty + lineRatio * Math.cos(endangle), style, 2, angle, d)
				}
				ctx.restore();
			}
			var drawArrow = function(ctx, x1, y1, x2, y2, style, which, angle, d) {
				'use strict';
				if (typeof(x1) == 'string') x1 = parseInt(x1);
				if (typeof(y1) == 'string') y1 = parseInt(y1);
				if (typeof(x2) == 'string') x2 = parseInt(x2);
				if (typeof(y2) == 'string') y2 = parseInt(y2);
				style = typeof(style) != 'undefined' ? style : 3;
				which = typeof(which) != 'undefined' ? which : 1;
				angle = typeof(angle) != 'undefined' ? angle : Math.PI / 8;
				d = typeof(d) != 'undefined' ? d : 10;
				var toDrawHead = typeof(style) != 'function' ? drawHead : style;
				var dist = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
				var ratio = (dist - d / 3) / dist;
				var tox, toy, fromx, fromy;
				if (which & 1) {
					tox = Math.round(x1 + (x2 - x1) * ratio);
					toy = Math.round(y1 + (y2 - y1) * ratio);
				} else {
					tox = x2;
					toy = y2;
				}
				if (which & 2) {
					fromx = x1 + (x2 - x1) * (1 - ratio);
					fromy = y1 + (y2 - y1) * (1 - ratio);
				} else {
					fromx = x1;
					fromy = y1;
				}
				ctx.beginPath();
				ctx.moveTo(fromx, fromy);
				ctx.lineTo(tox, toy);
				ctx.stroke();
				var lineangle = Math.atan2(y2 - y1, x2 - x1);
				var h = Math.abs(d / Math.cos(angle));
				if (which & 1) {
					var angle1 = lineangle + Math.PI + angle;
					var topx = x2 + Math.cos(angle1) * h;
					var topy = y2 + Math.sin(angle1) * h;
					var angle2 = lineangle + Math.PI - angle;
					var botx = x2 + Math.cos(angle2) * h;
					var boty = y2 + Math.sin(angle2) * h;
					toDrawHead(ctx, topx, topy, x2, y2, botx, boty, style);
				}
				if (which & 2) {
					var angle1 = lineangle + angle;
					var topx = x1 + Math.cos(angle1) * h;
					var topy = y1 + Math.sin(angle1) * h;
					var angle2 = lineangle - angle;
					var botx = x1 + Math.cos(angle2) * h;
					var boty = y1 + Math.sin(angle2) * h;
					toDrawHead(ctx, topx, topy, x1, y1, botx, boty, style);
				}
			};

			var spinColors = function(currentIteration, totalIterations) {
				var step = currentIteration % totalIterations;
				if (step < oldStep)
					colors.push(colors.shift());
				var c0 = colors[0],
					c1 = colors[1],
					r = minmax(easeLinear(step, c0.r, c1.r - c0.r, totalIterations), c0.r, c1.r),
					g = minmax(easeLinear(step, c0.g, c1.g - c0.g, totalIterations), c0.g, c1.g),
					b = minmax(easeLinear(step, c0.b, c1.b - c0.b, totalIterations), c0.b, c1.b);

				oldStep = step;
				return "rgb(" + parseInt(r) + "," + parseInt(g) + "," + parseInt(b) + ")";
			}

			var spin = function(t) {
				var timeCurrent = t || (new Date).getTime();
				if (!startTime) {
					startTime = timeCurrent;
				}
				tick = timeCurrent - startTime;
				acc = easeInOutQuad((tick + tail_duration / 2) % tail_duration, 0, duration, tail_duration);
				head = easeLinear((tick + acc) % duration, 0, 360, duration);
				tail = 20 + Math.abs(easeLinear((tick + tail_duration / 2) % tail_duration, -300, 600, tail_duration));

				ctx.lineWidth = lineWidth;
				ctx.lineCap = "round";

				ctx.strokeStyle = spinColors(tick, duration);
				ctx.clearRect(0, 0, size, size);
				//fixed android 4.1.x
				canvasObj.style.display = 'none'; // Detach from DOM
				canvasObj.offsetHeight; // Force the detach
				canvasObj.style.display = 'inherit'; // Reattach to DOM
				ctx.beginPath();
				ctx.arc(size / 2, size / 2, size / 4, parseInt(head - tail) % 360 * rad, parseInt(head) % 360 * rad, false);
				ctx.stroke();

				rAF = requestAnimationFrame(spin);
			};
			var startSpin = function() {
				startTime = 0;
				oldStep = 0;
				rAF = requestAnimationFrame(spin);
			};
			var stopSpin = function() {
				rAF && cancelAnimationFrame(rAF);
			}
			var init = function(canvas, options) {
				canvasObj = canvas;
				ctx = canvasObj.getContext('2d');
				var options = $.extend(true, {}, options);
				colors = options.colors;
				duration = options.duration;
				tail_duration = options.tail_duration;
				size = options.size;
				lineWidth = options.lineWidth;
			};
			return {
				init: init,
				drawArcedArrow: drawArcedArrow,
				startSpin: startSpin,
				stopSpin: stopSpin
			};
		})()
	});
})(mui);
/*! jQuery v2.1.0 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k="".trim,l={},m=a.document,n="2.1.0",o=function(a,b){return new o.fn.init(a,b)},p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};o.fn=o.prototype={jquery:n,constructor:o,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=o.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return o.each(this,a,b)},map:function(a){return this.pushStack(o.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},o.extend=o.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||o.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(o.isPlainObject(d)||(e=o.isArray(d)))?(e?(e=!1,f=c&&o.isArray(c)?c:[]):f=c&&o.isPlainObject(c)?c:{},g[b]=o.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},o.extend({expando:"jQuery"+(n+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===o.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return a-parseFloat(a)>=0},isPlainObject:function(a){if("object"!==o.type(a)||a.nodeType||o.isWindow(a))return!1;try{if(a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(b){return!1}return!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=o.trim(a),a&&(1===a.indexOf("use strict")?(b=m.createElement("script"),b.text=a,m.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":k.call(a)},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?o.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),o.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||o.guid++,f):void 0},now:Date.now,support:l}),o.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=a.length,c=o.type(a);return"function"===c||o.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s="sizzle"+-new Date,t=a.document,u=0,v=0,w=eb(),x=eb(),y=eb(),z=function(a,b){return a===b&&(j=!0),0},A="undefined",B=1<<31,C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=D.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",M=L.replace("w","w#"),N="\\["+K+"*("+L+")"+K+"*(?:([*^$|!~]?=)"+K+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+M+")|)|)"+K+"*\\]",O=":("+L+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+N.replace(3,8)+")*)|.*)\\)|)",P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(O),U=new RegExp("^"+M+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L.replace("w","w*")+")"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=/'|\\/g,ab=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),bb=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{G.apply(D=H.call(t.childNodes),t.childNodes),D[t.childNodes.length].nodeType}catch(cb){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function db(a,b,d,e){var f,g,h,i,j,m,p,q,u,v;if((b?b.ownerDocument||b:t)!==l&&k(b),b=b||l,d=d||[],!a||"string"!=typeof a)return d;if(1!==(i=b.nodeType)&&9!==i)return[];if(n&&!e){if(f=Z.exec(a))if(h=f[1]){if(9===i){if(g=b.getElementById(h),!g||!g.parentNode)return d;if(g.id===h)return d.push(g),d}else if(b.ownerDocument&&(g=b.ownerDocument.getElementById(h))&&r(b,g)&&g.id===h)return d.push(g),d}else{if(f[2])return G.apply(d,b.getElementsByTagName(a)),d;if((h=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(h)),d}if(c.qsa&&(!o||!o.test(a))){if(q=p=s,u=b,v=9===i&&a,1===i&&"object"!==b.nodeName.toLowerCase()){m=ob(a),(p=b.getAttribute("id"))?q=p.replace(_,"\\$&"):b.setAttribute("id",q),q="[id='"+q+"'] ",j=m.length;while(j--)m[j]=q+pb(m[j]);u=$.test(a)&&mb(b.parentNode)||b,v=m.join(",")}if(v)try{return G.apply(d,u.querySelectorAll(v)),d}catch(w){}finally{p||b.removeAttribute("id")}}}return xb(a.replace(P,"$1"),b,d,e)}function eb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function fb(a){return a[s]=!0,a}function gb(a){var b=l.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function hb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function ib(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||B)-(~a.sourceIndex||B);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function jb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function kb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function lb(a){return fb(function(b){return b=+b,fb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function mb(a){return a&&typeof a.getElementsByTagName!==A&&a}c=db.support={},f=db.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},k=db.setDocument=function(a){var b,e=a?a.ownerDocument||a:t,g=e.defaultView;return e!==l&&9===e.nodeType&&e.documentElement?(l=e,m=e.documentElement,n=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){k()},!1):g.attachEvent&&g.attachEvent("onunload",function(){k()})),c.attributes=gb(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=gb(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(e.getElementsByClassName)&&gb(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=gb(function(a){return m.appendChild(a).id=s,!e.getElementsByName||!e.getElementsByName(s).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==A&&n){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){var c=typeof a.getAttributeNode!==A&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==A?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==A&&n?b.getElementsByClassName(a):void 0},p=[],o=[],(c.qsa=Y.test(e.querySelectorAll))&&(gb(function(a){a.innerHTML="<select t=''><option selected=''></option></select>",a.querySelectorAll("[t^='']").length&&o.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||o.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll(":checked").length||o.push(":checked")}),gb(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&o.push("name"+K+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||o.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),o.push(",.*:")})),(c.matchesSelector=Y.test(q=m.webkitMatchesSelector||m.mozMatchesSelector||m.oMatchesSelector||m.msMatchesSelector))&&gb(function(a){c.disconnectedMatch=q.call(a,"div"),q.call(a,"[s!='']:x"),p.push("!=",O)}),o=o.length&&new RegExp(o.join("|")),p=p.length&&new RegExp(p.join("|")),b=Y.test(m.compareDocumentPosition),r=b||Y.test(m.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},z=b?function(a,b){if(a===b)return j=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===t&&r(t,a)?-1:b===e||b.ownerDocument===t&&r(t,b)?1:i?I.call(i,a)-I.call(i,b):0:4&d?-1:1)}:function(a,b){if(a===b)return j=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],k=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:i?I.call(i,a)-I.call(i,b):0;if(f===g)return ib(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)k.unshift(c);while(h[d]===k[d])d++;return d?ib(h[d],k[d]):h[d]===t?-1:k[d]===t?1:0},e):l},db.matches=function(a,b){return db(a,null,null,b)},db.matchesSelector=function(a,b){if((a.ownerDocument||a)!==l&&k(a),b=b.replace(S,"='$1']"),!(!c.matchesSelector||!n||p&&p.test(b)||o&&o.test(b)))try{var d=q.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return db(b,l,null,[a]).length>0},db.contains=function(a,b){return(a.ownerDocument||a)!==l&&k(a),r(a,b)},db.attr=function(a,b){(a.ownerDocument||a)!==l&&k(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!n):void 0;return void 0!==f?f:c.attributes||!n?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},db.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},db.uniqueSort=function(a){var b,d=[],e=0,f=0;if(j=!c.detectDuplicates,i=!c.sortStable&&a.slice(0),a.sort(z),j){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return i=null,a},e=db.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=db.selectors={cacheLength:50,createPseudo:fb,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ab,bb),a[3]=(a[4]||a[5]||"").replace(ab,bb),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||db.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&db.error(a[0]),a},PSEUDO:function(a){var b,c=!a[5]&&a[2];return V.CHILD.test(a[0])?null:(a[3]&&void 0!==a[4]?a[2]=a[4]:c&&T.test(c)&&(b=ob(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ab,bb).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=w[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&w(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==A&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=db.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),t=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&t){k=q[s]||(q[s]={}),j=k[a]||[],n=j[0]===u&&j[1],m=j[0]===u&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[u,n,m];break}}else if(t&&(j=(b[s]||(b[s]={}))[a])&&j[0]===u)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(t&&((l[s]||(l[s]={}))[a]=[u,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||db.error("unsupported pseudo: "+a);return e[s]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?fb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:fb(function(a){var b=[],c=[],d=g(a.replace(P,"$1"));return d[s]?fb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:fb(function(a){return function(b){return db(a,b).length>0}}),contains:fb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:fb(function(a){return U.test(a||"")||db.error("unsupported lang: "+a),a=a.replace(ab,bb).toLowerCase(),function(b){var c;do if(c=n?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===m},focus:function(a){return a===l.activeElement&&(!l.hasFocus||l.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:lb(function(){return[0]}),last:lb(function(a,b){return[b-1]}),eq:lb(function(a,b,c){return[0>c?c+b:c]}),even:lb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:lb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:lb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:lb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=jb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=kb(b);function nb(){}nb.prototype=d.filters=d.pseudos,d.setFilters=new nb;function ob(a,b){var c,e,f,g,h,i,j,k=x[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=Q.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?db.error(a):x(a,i).slice(0)}function pb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function qb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=v++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[u,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[s]||(b[s]={}),(h=i[d])&&h[0]===u&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function rb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function sb(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function tb(a,b,c,d,e,f){return d&&!d[s]&&(d=tb(d)),e&&!e[s]&&(e=tb(e,f)),fb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||wb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:sb(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=sb(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=sb(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ub(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],i=g||d.relative[" "],j=g?1:0,k=qb(function(a){return a===b},i,!0),l=qb(function(a){return I.call(b,a)>-1},i,!0),m=[function(a,c,d){return!g&&(d||c!==h)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>j;j++)if(c=d.relative[a[j].type])m=[qb(rb(m),c)];else{if(c=d.filter[a[j].type].apply(null,a[j].matches),c[s]){for(e=++j;f>e;e++)if(d.relative[a[e].type])break;return tb(j>1&&rb(m),j>1&&pb(a.slice(0,j-1).concat({value:" "===a[j-2].type?"*":""})).replace(P,"$1"),c,e>j&&ub(a.slice(j,e)),f>e&&ub(a=a.slice(e)),f>e&&pb(a))}m.push(c)}return rb(m)}function vb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,i,j,k){var m,n,o,p=0,q="0",r=f&&[],s=[],t=h,v=f||e&&d.find.TAG("*",k),w=u+=null==t?1:Math.random()||.1,x=v.length;for(k&&(h=g!==l&&g);q!==x&&null!=(m=v[q]);q++){if(e&&m){n=0;while(o=a[n++])if(o(m,g,i)){j.push(m);break}k&&(u=w)}c&&((m=!o&&m)&&p--,f&&r.push(m))}if(p+=q,c&&q!==p){n=0;while(o=b[n++])o(r,s,g,i);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=E.call(j));s=sb(s)}G.apply(j,s),k&&!f&&s.length>0&&p+b.length>1&&db.uniqueSort(j)}return k&&(u=w,h=t),r};return c?fb(f):f}g=db.compile=function(a,b){var c,d=[],e=[],f=y[a+" "];if(!f){b||(b=ob(a)),c=b.length;while(c--)f=ub(b[c]),f[s]?d.push(f):e.push(f);f=y(a,vb(e,d))}return f};function wb(a,b,c){for(var d=0,e=b.length;e>d;d++)db(a,b[d],c);return c}function xb(a,b,e,f){var h,i,j,k,l,m=ob(a);if(!f&&1===m.length){if(i=m[0]=m[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&c.getById&&9===b.nodeType&&n&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(ab,bb),b)||[])[0],!b)return e;a=a.slice(i.shift().value.length)}h=V.needsContext.test(a)?0:i.length;while(h--){if(j=i[h],d.relative[k=j.type])break;if((l=d.find[k])&&(f=l(j.matches[0].replace(ab,bb),$.test(i[0].type)&&mb(b.parentNode)||b))){if(i.splice(h,1),a=f.length&&pb(i),!a)return G.apply(e,f),e;break}}}return g(a,m)(f,b,!n,e,$.test(a)&&mb(b.parentNode)||b),e}return c.sortStable=s.split("").sort(z).join("")===s,c.detectDuplicates=!!j,k(),c.sortDetached=gb(function(a){return 1&a.compareDocumentPosition(l.createElement("div"))}),gb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||hb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&gb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||hb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),gb(function(a){return null==a.getAttribute("disabled")})||hb(J,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),db}(a);o.find=t,o.expr=t.selectors,o.expr[":"]=o.expr.pseudos,o.unique=t.uniqueSort,o.text=t.getText,o.isXMLDoc=t.isXML,o.contains=t.contains;var u=o.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(o.isFunction(b))return o.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return o.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return o.filter(b,a,c);b=o.filter(b,a)}return o.grep(a,function(a){return g.call(b,a)>=0!==c})}o.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?o.find.matchesSelector(d,a)?[d]:[]:o.find.matches(a,o.grep(b,function(a){return 1===a.nodeType}))},o.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(o(a).filter(function(){for(b=0;c>b;b++)if(o.contains(e[b],this))return!0}));for(b=0;c>b;b++)o.find(a,e[b],d);return d=this.pushStack(c>1?o.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?o(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=o.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof o?b[0]:b,o.merge(this,o.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:m,!0)),v.test(c[1])&&o.isPlainObject(b))for(c in b)o.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=m.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=m,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):o.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(o):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),o.makeArray(a,this))};A.prototype=o.fn,y=o(m);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};o.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&o(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),o.fn.extend({has:function(a){var b=o(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(o.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?o(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&o.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?o.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(o(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(o.unique(o.merge(this.get(),o(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}o.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return o.dir(a,"parentNode")},parentsUntil:function(a,b,c){return o.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return o.dir(a,"nextSibling")},prevAll:function(a){return o.dir(a,"previousSibling")},nextUntil:function(a,b,c){return o.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return o.dir(a,"previousSibling",c)},siblings:function(a){return o.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return o.sibling(a.firstChild)},contents:function(a){return a.contentDocument||o.merge([],a.childNodes)}},function(a,b){o.fn[a]=function(c,d){var e=o.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=o.filter(d,e)),this.length>1&&(C[a]||o.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return o.each(a.match(E)||[],function(a,c){b[c]=!0}),b}o.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):o.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){o.each(b,function(b,c){var d=o.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&o.each(arguments,function(a,b){var c;while((c=o.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?o.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},o.extend({Deferred:function(a){var b=[["resolve","done",o.Callbacks("once memory"),"resolved"],["reject","fail",o.Callbacks("once memory"),"rejected"],["notify","progress",o.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return o.Deferred(function(c){o.each(b,function(b,f){var g=o.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&o.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?o.extend(a,d):d}},e={};return d.pipe=d.then,o.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&o.isFunction(a.promise)?e:0,g=1===f?a:o.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&o.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;o.fn.ready=function(a){return o.ready.promise().done(a),this},o.extend({isReady:!1,readyWait:1,holdReady:function(a){a?o.readyWait++:o.ready(!0)},ready:function(a){(a===!0?--o.readyWait:o.isReady)||(o.isReady=!0,a!==!0&&--o.readyWait>0||(H.resolveWith(m,[o]),o.fn.trigger&&o(m).trigger("ready").off("ready")))}});function I(){m.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),o.ready()}o.ready.promise=function(b){return H||(H=o.Deferred(),"complete"===m.readyState?setTimeout(o.ready):(m.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},o.ready.promise();var J=o.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===o.type(c)){e=!0;for(h in c)o.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,o.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(o(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};o.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=o.expando+Math.random()}K.uid=1,K.accepts=o.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,o.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(o.isEmptyObject(f))o.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,o.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{o.isArray(b)?d=b.concat(b.map(o.camelCase)):(e=o.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!o.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?o.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}o.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){return M.access(a,b,c)},removeData:function(a,b){M.remove(a,b)},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),o.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;
while(c--)d=g[c].name,0===d.indexOf("data-")&&(d=o.camelCase(d.slice(5)),P(f,d,e[d]));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=o.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),o.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||o.isArray(c)?d=L.access(a,b,o.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=o.queue(a,b),d=c.length,e=c.shift(),f=o._queueHooks(a,b),g=function(){o.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:o.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),o.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?o.queue(this[0],a):void 0===b?this:this.each(function(){var c=o.queue(this,a,b);o._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&o.dequeue(this,a)})},dequeue:function(a){return this.each(function(){o.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=o.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===o.css(a,"display")||!o.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=m.createDocumentFragment(),b=a.appendChild(m.createElement("div"));b.innerHTML="<input type='radio' checked='checked' name='t'/>",l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";l.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return m.activeElement}catch(a){}}o.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=o.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof o!==U&&o.event.triggered!==b.type?o.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],n=q=h[1],p=(h[2]||"").split(".").sort(),n&&(l=o.event.special[n]||{},n=(e?l.delegateType:l.bindType)||n,l=o.event.special[n]||{},k=o.extend({type:n,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&o.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[n])||(m=i[n]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(n,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),o.event.global[n]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],n=q=h[1],p=(h[2]||"").split(".").sort(),n){l=o.event.special[n]||{},n=(d?l.delegateType:l.bindType)||n,m=i[n]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||o.removeEvent(a,n,r.handle),delete i[n])}else for(n in i)o.event.remove(a,n+b[j],c,d,!0);o.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,p=[d||m],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||m,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+o.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[o.expando]?b:new o.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:o.makeArray(c,[b]),n=o.event.special[q]||{},e||!n.trigger||n.trigger.apply(d,c)!==!1)){if(!e&&!n.noBubble&&!o.isWindow(d)){for(i=n.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||m)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:n.bindType||q,l=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),l&&l.apply(g,c),l=k&&g[k],l&&l.apply&&o.acceptData(g)&&(b.result=l.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||n._default&&n._default.apply(p.pop(),c)!==!1||!o.acceptData(d)||k&&o.isFunction(d[q])&&!o.isWindow(d)&&(h=d[k],h&&(d[k]=null),o.event.triggered=q,d[q](),o.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=o.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=o.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=o.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((o.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?o(e,this).index(i)>=0:o.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||m,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[o.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new o.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=m),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&o.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return o.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=o.extend(new o.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?o.event.trigger(e,null,b):o.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},o.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},o.Event=function(a,b){return this instanceof o.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.getPreventDefault&&a.getPreventDefault()?Z:$):this.type=a,b&&o.extend(this,b),this.timeStamp=a&&a.timeStamp||o.now(),void(this[o.expando]=!0)):new o.Event(a,b)},o.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=Z,this.stopPropagation()}},o.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){o.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!o.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),l.focusinBubbles||o.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){o.event.simulate(b,a.target,o.event.fix(a),!0)};o.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),o.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return o().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=o.guid++)),this.each(function(){o.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,o(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){o.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){o.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?o.event.trigger(a,b,c,!0):void 0}});var ab=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bb=/<([\w:]+)/,cb=/<|&#?\w+;/,db=/<(?:script|style|link)/i,eb=/checked\s*(?:[^=]|=\s*.checked.)/i,fb=/^$|\/(?:java|ecma)script/i,gb=/^true\/(.*)/,hb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ib={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ib.optgroup=ib.option,ib.tbody=ib.tfoot=ib.colgroup=ib.caption=ib.thead,ib.th=ib.td;function jb(a,b){return o.nodeName(a,"table")&&o.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function kb(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function lb(a){var b=gb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function mb(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function nb(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)o.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=o.extend({},h),M.set(b,i))}}function ob(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&o.nodeName(a,b)?o.merge([a],c):c}function pb(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}o.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=o.contains(a.ownerDocument,a);if(!(l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||o.isXMLDoc(a)))for(g=ob(h),f=ob(a),d=0,e=f.length;e>d;d++)pb(f[d],g[d]);if(b)if(c)for(f=f||ob(a),g=g||ob(h),d=0,e=f.length;e>d;d++)nb(f[d],g[d]);else nb(a,h);return g=ob(h,"script"),g.length>0&&mb(g,!i&&ob(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,n=a.length;n>m;m++)if(e=a[m],e||0===e)if("object"===o.type(e))o.merge(l,e.nodeType?[e]:e);else if(cb.test(e)){f=f||k.appendChild(b.createElement("div")),g=(bb.exec(e)||["",""])[1].toLowerCase(),h=ib[g]||ib._default,f.innerHTML=h[1]+e.replace(ab,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;o.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===o.inArray(e,d))&&(i=o.contains(e.ownerDocument,e),f=ob(k.appendChild(e),"script"),i&&mb(f),c)){j=0;while(e=f[j++])fb.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f,g,h=o.event.special,i=0;void 0!==(c=a[i]);i++){if(o.acceptData(c)&&(f=c[L.expando],f&&(b=L.cache[f]))){if(d=Object.keys(b.events||{}),d.length)for(g=0;void 0!==(e=d[g]);g++)h[e]?o.event.remove(c,e):o.removeEvent(c,e,b.handle);L.cache[f]&&delete L.cache[f]}delete M.cache[c[M.expando]]}}}),o.fn.extend({text:function(a){return J(this,function(a){return void 0===a?o.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?o.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||o.cleanData(ob(c)),c.parentNode&&(b&&o.contains(c.ownerDocument,c)&&mb(ob(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(o.cleanData(ob(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return o.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!db.test(a)&&!ib[(bb.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(ab,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(o.cleanData(ob(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,o.cleanData(ob(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,k=this.length,m=this,n=k-1,p=a[0],q=o.isFunction(p);if(q||k>1&&"string"==typeof p&&!l.checkClone&&eb.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(k&&(c=o.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=o.map(ob(c,"script"),kb),g=f.length;k>j;j++)h=c,j!==n&&(h=o.clone(h,!0,!0),g&&o.merge(f,ob(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,o.map(f,lb),j=0;g>j;j++)h=f[j],fb.test(h.type||"")&&!L.access(h,"globalEval")&&o.contains(i,h)&&(h.src?o._evalUrl&&o._evalUrl(h.src):o.globalEval(h.textContent.replace(hb,"")))}return this}}),o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){o.fn[a]=function(a){for(var c,d=[],e=o(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),o(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qb,rb={};function sb(b,c){var d=o(c.createElement(b)).appendTo(c.body),e=a.getDefaultComputedStyle?a.getDefaultComputedStyle(d[0]).display:o.css(d[0],"display");return d.detach(),e}function tb(a){var b=m,c=rb[a];return c||(c=sb(a,b),"none"!==c&&c||(qb=(qb||o("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qb[0].contentDocument,b.write(),b.close(),c=sb(a,b),qb.detach()),rb[a]=c),c}var ub=/^margin/,vb=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wb=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)};function xb(a,b,c){var d,e,f,g,h=a.style;return c=c||wb(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||o.contains(a.ownerDocument,a)||(g=o.style(a,b)),vb.test(g)&&ub.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function yb(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d="padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",e=m.documentElement,f=m.createElement("div"),g=m.createElement("div");g.style.backgroundClip="content-box",g.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===g.style.backgroundClip,f.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",f.appendChild(g);function h(){g.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%",e.appendChild(f);var d=a.getComputedStyle(g,null);b="1%"!==d.top,c="4px"===d.width,e.removeChild(f)}a.getComputedStyle&&o.extend(l,{pixelPosition:function(){return h(),b},boxSizingReliable:function(){return null==c&&h(),c},reliableMarginRight:function(){var b,c=g.appendChild(m.createElement("div"));return c.style.cssText=g.style.cssText=d,c.style.marginRight=c.style.width="0",g.style.width="1px",e.appendChild(f),b=!parseFloat(a.getComputedStyle(c,null).marginRight),e.removeChild(f),g.innerHTML="",b}})}(),o.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var zb=/^(none|table(?!-c[ea]).+)/,Ab=new RegExp("^("+Q+")(.*)$","i"),Bb=new RegExp("^([+-])=("+Q+")","i"),Cb={position:"absolute",visibility:"hidden",display:"block"},Db={letterSpacing:0,fontWeight:400},Eb=["Webkit","O","Moz","ms"];function Fb(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Eb.length;while(e--)if(b=Eb[e]+c,b in a)return b;return d}function Gb(a,b,c){var d=Ab.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Hb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=o.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=o.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=o.css(a,"border"+R[f]+"Width",!0,e))):(g+=o.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=o.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ib(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wb(a),g="border-box"===o.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xb(a,b,f),(0>e||null==e)&&(e=a.style[b]),vb.test(e))return e;d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Hb(a,b,c||(g?"border":"content"),d,f)+"px"}function Jb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",tb(d.nodeName)))):f[g]||(e=S(d),(c&&"none"!==c||!e)&&L.set(d,"olddisplay",e?c:o.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}o.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=o.camelCase(b),i=a.style;return b=o.cssProps[h]||(o.cssProps[h]=Fb(i,h)),g=o.cssHooks[b]||o.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Bb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(o.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||o.cssNumber[h]||(c+="px"),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]="",i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=o.camelCase(b);return b=o.cssProps[h]||(o.cssProps[h]=Fb(a.style,h)),g=o.cssHooks[b]||o.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xb(a,b,d)),"normal"===e&&b in Db&&(e=Db[b]),""===c||c?(f=parseFloat(e),c===!0||o.isNumeric(f)?f||0:e):e}}),o.each(["height","width"],function(a,b){o.cssHooks[b]={get:function(a,c,d){return c?0===a.offsetWidth&&zb.test(o.css(a,"display"))?o.swap(a,Cb,function(){return Ib(a,b,d)}):Ib(a,b,d):void 0},set:function(a,c,d){var e=d&&wb(a);return Gb(a,c,d?Hb(a,b,d,"border-box"===o.css(a,"boxSizing",!1,e),e):0)}}}),o.cssHooks.marginRight=yb(l.reliableMarginRight,function(a,b){return b?o.swap(a,{display:"inline-block"},xb,[a,"marginRight"]):void 0}),o.each({margin:"",padding:"",border:"Width"},function(a,b){o.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ub.test(a)||(o.cssHooks[a+b].set=Gb)}),o.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(o.isArray(b)){for(d=wb(a),e=b.length;e>g;g++)f[b[g]]=o.css(a,b[g],!1,d);return f}return void 0!==c?o.style(a,b,c):o.css(a,b)},a,b,arguments.length>1)},show:function(){return Jb(this,!0)},hide:function(){return Jb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?o(this).show():o(this).hide()})}});function Kb(a,b,c,d,e){return new Kb.prototype.init(a,b,c,d,e)}o.Tween=Kb,Kb.prototype={constructor:Kb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(o.cssNumber[c]?"":"px")},cur:function(){var a=Kb.propHooks[this.prop];return a&&a.get?a.get(this):Kb.propHooks._default.get(this)},run:function(a){var b,c=Kb.propHooks[this.prop];return this.pos=b=this.options.duration?o.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Kb.propHooks._default.set(this),this}},Kb.prototype.init.prototype=Kb.prototype,Kb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=o.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){o.fx.step[a.prop]?o.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[o.cssProps[a.prop]]||o.cssHooks[a.prop])?o.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Kb.propHooks.scrollTop=Kb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},o.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},o.fx=Kb.prototype.init,o.fx.step={};var Lb,Mb,Nb=/^(?:toggle|show|hide)$/,Ob=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pb=/queueHooks$/,Qb=[Vb],Rb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Ob.exec(b),f=e&&e[3]||(o.cssNumber[a]?"":"px"),g=(o.cssNumber[a]||"px"!==f&&+d)&&Ob.exec(o.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,o.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sb(){return setTimeout(function(){Lb=void 0}),Lb=o.now()}function Tb(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ub(a,b,c){for(var d,e=(Rb[b]||[]).concat(Rb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Vb(a,b,c){var d,e,f,g,h,i,j,k=this,l={},m=a.style,n=a.nodeType&&S(a),p=L.get(a,"fxshow");c.queue||(h=o._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,k.always(function(){k.always(function(){h.unqueued--,o.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[m.overflow,m.overflowX,m.overflowY],j=o.css(a,"display"),"none"===j&&(j=tb(a.nodeName)),"inline"===j&&"none"===o.css(a,"float")&&(m.display="inline-block")),c.overflow&&(m.overflow="hidden",k.always(function(){m.overflow=c.overflow[0],m.overflowX=c.overflow[1],m.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Nb.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(n?"hide":"show")){if("show"!==e||!p||void 0===p[d])continue;n=!0}l[d]=p&&p[d]||o.style(a,d)}if(!o.isEmptyObject(l)){p?"hidden"in p&&(n=p.hidden):p=L.access(a,"fxshow",{}),f&&(p.hidden=!n),n?o(a).show():k.done(function(){o(a).hide()}),k.done(function(){var b;L.remove(a,"fxshow");for(b in l)o.style(a,b,l[b])});for(d in l)g=Ub(n?p[d]:0,d,k),d in p||(p[d]=g.start,n&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wb(a,b){var c,d,e,f,g;for(c in a)if(d=o.camelCase(c),e=b[d],f=a[c],o.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=o.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xb(a,b,c){var d,e,f=0,g=Qb.length,h=o.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Lb||Sb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:o.extend({},b),opts:o.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:Lb||Sb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=o.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wb(k,j.opts.specialEasing);g>f;f++)if(d=Qb[f].call(j,a,k,j.opts))return d;return o.map(k,Ub,j),o.isFunction(j.opts.start)&&j.opts.start.call(a,j),o.fx.timer(o.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}o.Animation=o.extend(Xb,{tweener:function(a,b){o.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Rb[c]=Rb[c]||[],Rb[c].unshift(b)},prefilter:function(a,b){b?Qb.unshift(a):Qb.push(a)}}),o.speed=function(a,b,c){var d=a&&"object"==typeof a?o.extend({},a):{complete:c||!c&&b||o.isFunction(a)&&a,duration:a,easing:c&&b||b&&!o.isFunction(b)&&b};return d.duration=o.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in o.fx.speeds?o.fx.speeds[d.duration]:o.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){o.isFunction(d.old)&&d.old.call(this),d.queue&&o.dequeue(this,d.queue)},d},o.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=o.isEmptyObject(a),f=o.speed(b,c,d),g=function(){var b=Xb(this,o.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=o.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&o.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=o.timers,g=d?d.length:0;for(c.finish=!0,o.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),o.each(["toggle","show","hide"],function(a,b){var c=o.fn[b];o.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Tb(b,!0),a,d,e)}}),o.each({slideDown:Tb("show"),slideUp:Tb("hide"),slideToggle:Tb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){o.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),o.timers=[],o.fx.tick=function(){var a,b=0,c=o.timers;for(Lb=o.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||o.fx.stop(),Lb=void 0},o.fx.timer=function(a){o.timers.push(a),a()?o.fx.start():o.timers.pop()},o.fx.interval=13,o.fx.start=function(){Mb||(Mb=setInterval(o.fx.tick,o.fx.interval))},o.fx.stop=function(){clearInterval(Mb),Mb=null},o.fx.speeds={slow:600,fast:200,_default:400},o.fn.delay=function(a,b){return a=o.fx?o.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=m.createElement("input"),b=m.createElement("select"),c=b.appendChild(m.createElement("option"));a.type="checkbox",l.checkOn=""!==a.value,l.optSelected=c.selected,b.disabled=!0,l.optDisabled=!c.disabled,a=m.createElement("input"),a.value="t",a.type="radio",l.radioValue="t"===a.value}();var Yb,Zb,$b=o.expr.attrHandle;o.fn.extend({attr:function(a,b){return J(this,o.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){o.removeAttr(this,a)})}}),o.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?o.prop(a,b,c):(1===f&&o.isXMLDoc(a)||(b=b.toLowerCase(),d=o.attrHooks[b]||(o.expr.match.bool.test(b)?Zb:Yb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=o.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void o.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=o.propFix[c]||c,o.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&o.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Zb={set:function(a,b,c){return b===!1?o.removeAttr(a,c):a.setAttribute(c,c),c}},o.each(o.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$b[b]||o.find.attr;$b[b]=function(a,b,d){var e,f;
return d||(f=$b[b],$b[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$b[b]=f),e}});var _b=/^(?:input|select|textarea|button)$/i;o.fn.extend({prop:function(a,b){return J(this,o.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[o.propFix[a]||a]})}}),o.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!o.isXMLDoc(a),f&&(b=o.propFix[b]||b,e=o.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_b.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),l.optSelected||(o.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),o.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){o.propFix[this.toLowerCase()]=this});var ac=/[\t\r\n\f]/g;o.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(o.isFunction(a))return this.each(function(b){o(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=o.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(o.isFunction(a))return this.each(function(b){o(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?o.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(o.isFunction(a)?function(c){o(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=o(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ac," ").indexOf(b)>=0)return!0;return!1}});var bc=/\r/g;o.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=o.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,o(this).val()):a,null==e?e="":"number"==typeof e?e+="":o.isArray(e)&&(e=o.map(e,function(a){return null==a?"":a+""})),b=o.valHooks[this.type]||o.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=o.valHooks[e.type]||o.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bc,""):null==c?"":c)}}}),o.extend({valHooks:{select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(l.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&o.nodeName(c.parentNode,"optgroup"))){if(b=o(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=o.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=o.inArray(o(d).val(),f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),o.each(["radio","checkbox"],function(){o.valHooks[this]={set:function(a,b){return o.isArray(b)?a.checked=o.inArray(o(a).val(),b)>=0:void 0}},l.checkOn||(o.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),o.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){o.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),o.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cc=o.now(),dc=/\?/;o.parseJSON=function(a){return JSON.parse(a+"")},o.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&o.error("Invalid XML: "+a),b};var ec,fc,gc=/#.*$/,hc=/([?&])_=[^&]*/,ic=/^(.*?):[ \t]*([^\r\n]*)$/gm,jc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,kc=/^(?:GET|HEAD)$/,lc=/^\/\//,mc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,nc={},oc={},pc="*/".concat("*");try{fc=location.href}catch(qc){fc=m.createElement("a"),fc.href="",fc=fc.href}ec=mc.exec(fc.toLowerCase())||[];function rc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(o.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function sc(a,b,c,d){var e={},f=a===oc;function g(h){var i;return e[h]=!0,o.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function tc(a,b){var c,d,e=o.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&o.extend(!0,a,d),a}function uc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function vc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}o.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:fc,type:"GET",isLocal:jc.test(ec[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":pc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":o.parseJSON,"text xml":o.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?tc(tc(a,o.ajaxSettings),b):tc(o.ajaxSettings,a)},ajaxPrefilter:rc(nc),ajaxTransport:rc(oc),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=o.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?o(l):o.event,n=o.Deferred(),p=o.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=ic.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(n.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||fc)+"").replace(gc,"").replace(lc,ec[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=o.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=mc.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===ec[1]&&h[2]===ec[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(ec[3]||("http:"===ec[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=o.param(k.data,k.traditional)),sc(nc,k,b,v),2===t)return v;i=k.global,i&&0===o.active++&&o.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!kc.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(dc.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=hc.test(d)?d.replace(hc,"$1_="+cc++):d+(dc.test(d)?"&":"?")+"_="+cc++)),k.ifModified&&(o.lastModified[d]&&v.setRequestHeader("If-Modified-Since",o.lastModified[d]),o.etag[d]&&v.setRequestHeader("If-None-Match",o.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+pc+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=sc(oc,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=uc(k,v,f)),u=vc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(o.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(o.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?n.resolveWith(l,[r,x,v]):n.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--o.active||o.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return o.get(a,b,c,"json")},getScript:function(a,b){return o.get(a,void 0,b,"script")}}),o.each(["get","post"],function(a,b){o[b]=function(a,c,d,e){return o.isFunction(c)&&(e=e||d,d=c,c=void 0),o.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),o.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){o.fn[b]=function(a){return this.on(b,a)}}),o._evalUrl=function(a){return o.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},o.fn.extend({wrapAll:function(a){var b;return o.isFunction(a)?this.each(function(b){o(this).wrapAll(a.call(this,b))}):(this[0]&&(b=o(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(o.isFunction(a)?function(b){o(this).wrapInner(a.call(this,b))}:function(){var b=o(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=o.isFunction(a);return this.each(function(c){o(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){o.nodeName(this,"body")||o(this).replaceWith(this.childNodes)}).end()}}),o.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},o.expr.filters.visible=function(a){return!o.expr.filters.hidden(a)};var wc=/%20/g,xc=/\[\]$/,yc=/\r?\n/g,zc=/^(?:submit|button|image|reset|file)$/i,Ac=/^(?:input|select|textarea|keygen)/i;function Bc(a,b,c,d){var e;if(o.isArray(b))o.each(b,function(b,e){c||xc.test(a)?d(a,e):Bc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==o.type(b))d(a,b);else for(e in b)Bc(a+"["+e+"]",b[e],c,d)}o.param=function(a,b){var c,d=[],e=function(a,b){b=o.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=o.ajaxSettings&&o.ajaxSettings.traditional),o.isArray(a)||a.jquery&&!o.isPlainObject(a))o.each(a,function(){e(this.name,this.value)});else for(c in a)Bc(c,a[c],b,e);return d.join("&").replace(wc,"+")},o.fn.extend({serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=o.prop(this,"elements");return a?o.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!o(this).is(":disabled")&&Ac.test(this.nodeName)&&!zc.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=o(this).val();return null==c?null:o.isArray(c)?o.map(c,function(a){return{name:b.name,value:a.replace(yc,"\r\n")}}):{name:b.name,value:c.replace(yc,"\r\n")}}).get()}}),o.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Cc=0,Dc={},Ec={0:200,1223:204},Fc=o.ajaxSettings.xhr();a.ActiveXObject&&o(a).on("unload",function(){for(var a in Dc)Dc[a]()}),l.cors=!!Fc&&"withCredentials"in Fc,l.ajax=Fc=!!Fc,o.ajaxTransport(function(a){var b;return l.cors||Fc&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Cc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Dc[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Ec[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Dc[g]=b("abort"),f.send(a.hasContent&&a.data||null)},abort:function(){b&&b()}}:void 0}),o.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return o.globalEval(a),a}}}),o.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),o.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=o("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),m.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Gc=[],Hc=/(=)\?(?=&|$)|\?\?/;o.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Gc.pop()||o.expando+"_"+cc++;return this[a]=!0,a}}),o.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Hc.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Hc.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=o.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Hc,"$1"+e):b.jsonp!==!1&&(b.url+=(dc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||o.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Gc.push(e)),g&&o.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),o.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||m;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=o.buildFragment([a],b,e),e&&e.length&&o(e).remove(),o.merge([],d.childNodes))};var Ic=o.fn.load;o.fn.load=function(a,b,c){if("string"!=typeof a&&Ic)return Ic.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=a.slice(h),a=a.slice(0,h)),o.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&o.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?o("<div>").append(o.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},o.expr.filters.animated=function(a){return o.grep(o.timers,function(b){return a===b.elem}).length};var Jc=a.document.documentElement;function Kc(a){return o.isWindow(a)?a:9===a.nodeType&&a.defaultView}o.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=o.css(a,"position"),l=o(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=o.css(a,"top"),i=o.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),o.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},o.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){o.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,o.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Kc(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===o.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),o.nodeName(a[0],"html")||(d=a.offset()),d.top+=o.css(a[0],"borderTopWidth",!0),d.left+=o.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-o.css(c,"marginTop",!0),left:b.left-d.left-o.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Jc;while(a&&!o.nodeName(a,"html")&&"static"===o.css(a,"position"))a=a.offsetParent;return a||Jc})}}),o.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;o.fn[b]=function(e){return J(this,function(b,e,f){var g=Kc(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),o.each(["top","left"],function(a,b){o.cssHooks[b]=yb(l.pixelPosition,function(a,c){return c?(c=xb(a,b),vb.test(c)?o(a).position()[b]+"px":c):void 0})}),o.each({Height:"height",Width:"width"},function(a,b){o.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){o.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return o.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?o.css(b,c,g):o.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),o.fn.size=function(){return this.length},o.fn.andSelf=o.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return o});var Lc=a.jQuery,Mc=a.$;return o.noConflict=function(b){return a.$===o&&(a.$=Mc),b&&a.jQuery===o&&(a.jQuery=Lc),o},typeof b===U&&(a.jQuery=a.$=o),o});

/* 	
   作者：724485868@qq.com
   时间：2017-10-08
   描述：表单验证    
 version:1.0.0
*/

var vd = (function($) {

	var Obj = function(formName) {

		this.formName = typeof formName === "undefined" ? ".form" : formName,

			this.init = function() {

				this.addErrorStyle(false, true);
				this.checkObj(this.formName);
				this.addVidation();
			},

			this.disabled = function(obj) {

				$(obj).attr("disabled", "disabled");

			},

			this.enabled = function(obj) {

				$(obj).removeAttr("disabled");
			},

			this.arrs = [],

			this.compareEmit = function(pName, compareName, value) {
				var el = $("" + pName + " [name=" + compareName + "]");
				if($.trim(el.val()) === "") {
					return;
				}
				for(var i = 0; i < this.arrs.length; i++) {
					if($.trim(this.arrs[i].elName) === $.trim(compareName)) {
						$(el).trigger("keyup");
						break;
					}

				}

			},

			this.oldRemoteValue = "",

			this.checkObj = function(formName) {
				if(typeof formName === "undefined") {
					formName = ".form";
				};

				this.arrs = [];
				$this = this;

				$("" + formName + " .vd-item").each(function() {
					var name = $(this).attr("name");
					var v = $(this).val();
					var req_msg = $(this).attr("vd-req-msg");
					var pattern = $(this).attr("vd-pattern");
					var pattern_msg = $(this).attr("vd-pattern-msg");

					// type=radio 单选框
					var _rd = $(this).attr("vd-rd");
					var _rd_ok = typeof $(this).attr("vd-rd-ok") !== "undefined" ? true : false;

					// type=checkbox 复选框
					var _ck = $(this).attr("vd-ck");
					var _ck_ok = typeof $(this).attr("vd-ck-ok") !== "undefined" ? true : false;

					var errorMsg = "";
					if(typeof req_msg !== "undefined" && v === "") {
						errorMsg = req_msg;
					} else if(typeof pattern_msg !== "undefined") {
						var reg = new RegExp(pattern, "i");
						if(!reg.test(v)) {
							errorMsg = pattern_msg;
						}

					} else {
						errorMsg = "";

					}

					if(name !== "" && name !== "vd-btn") {
						var obj = {};
						obj.pName = formName; //表单name
						obj.elName = name; // 元素name
						obj.errorMsg = errorMsg; // 验证错误提示信息
						obj.val = v;
						obj.el = this; // document.forms[formName][name];
						obj.bl = false;
						if(typeof _rd !== "undefined") {
							obj.rd = "rd"; // type=radio 单选框标记属性
							obj.bl = _rd_ok;
						}
						if(typeof _ck !== "undefined") {

							obj.bl = _ck_ok;
						}

						$this.arrs.push(obj);

					}
				});

			},

			this.addVidation = function() {

				for(var i = 0; i < this.arrs.length; i++) {
					var _obj = this.arrs[i];
					var el = _obj.el; // document.forms[_obj.pName][_obj.elName];
					var $this = this;
					$(el).on("keyup", _obj, function(event) {
						$this.checkElement(event.data, event.target, true, true);
						$this.addVdBtnStyle(el);
					});

					var remote = el.getAttribute("vd-remote");
					if(remote === null) {
						$(el).on("change", _obj, function(event) {
							$this.checkElement(event.data, event.target, true, true);
							$this.addVdBtnStyle(el);
						});
					}

				}

			},

			this.checkElement = function(_obj2, el, isRemote, isRadio) {

				// not vd 不做验证
				var _vd_not = el.getAttribute("vd-ck-not");

				// req
				var _req = el.getAttribute("vd-req");
				var _req_msg = el.getAttribute("vd-req-msg");

				// pattern
				var _pattern = el.getAttribute("vd-pattern");
				var _pattern_msg = el.getAttribute("vd-pattern-msg");

				// remote
				var _remote = el.getAttribute("vd-remote");
				var _remote_msg = el.getAttribute("vd-remote-msg");
				var _remote_length = el.getAttribute("vd-remote-length");

				// compare 
				var _compare = el.getAttribute("vd-compare");
				var _compare_msg = el.getAttribute("vd-compare-msg");
				var _compare_emit = el.getAttribute("vd-compare-emit"); // 触发目标对象

				// type=checkbox 复选框
				var _ck = el.getAttribute("vd-ck");

				var _ck_true = el.getAttribute("vd-ck-true"); // 选中的值
				var _ck_false = el.getAttribute("vd-ck-false"); // 没选中的值
				var _ck_msg = el.getAttribute("vd-ck-msg");

				// type=radio 单选框
				var _rd = el.getAttribute("vd-rd");
				var _rd_ok = el.getAttribute("vd-ck-ok") ? true : false;
				var _rd_msg = el.getAttribute("vd-rd-msg");

				// 当前的值
				var v = $.trim(el.value);

				// 单选
				if(_rd !== null) {
					var _rd_name = $(el).attr("name");
					var _re_length = $("" + _obj2.pName + "  [name=" + _rd_name + "]:checked").length;

					// 没有选择
					if(_re_length <= 0) {

						var p = $(el).parents(".vd-box");
						$(p).addClass("vd-error vd-rd ");
						$(p).removeClass("vd-ok");
						$(el).addClass("vd-error");

						// 遍历选择项 设为false
						for(var i = 0; i < this.arrs.length; i++) {
							if($.trim(this.arrs[i].elName) === $.trim(_obj2.elName)) {
								this.arrs[i].rd_req = false; // radio组是否为空  false为空
								_obj2.bl = false;
								_obj2.val = v;
								_obj2.errorMsg = _rd_msg;
							}
						}
						//  流程终止
						return;
					} else {

						_obj2.val = v;
						var p = $(el).parents(".vd-box");
						$(p).removeClass("vd-error vd-rd ");
						$(el).removeClass("vd-error");
						$(p).addClass("vd-ok");

						// 选择了 流程以下走
					}

					// false 点击提交不触发
					if(isRadio) {

						// 遍历选择项 设为false
						for(var i = 0; i < this.arrs.length; i++) {
							if($.trim(this.arrs[i].elName) === $.trim(_obj2.elName)) {
								this.arrs[i].bl = false;
								this.arrs[i].rd_req = true; // radio组是否为空 true不为空
							}
						}

						// 当前项设置为true
						_obj2.bl = true;
						//_obj2.val=v;
						_obj2.errorMsg = "";
					}

					return;
				}

				// 非空验证
				if(_req !== null) {
					if(v === "") {
						_obj2.bl = false;
						_obj2.val = v;
						_obj2.errorMsg = _req_msg;
						var p = $(el).parents(".vd-box");
						$(p).removeClass("vd-pattern vd-remote vd-compare").addClass("vd-error  ");

						$(p).find(".vd-req,.vd-pattern,.vd-remote,.vd-compare").removeClass("vd-error");
						$(p).find(".vd-req").addClass("vd-error").text(_req_msg);
						$(el).addClass("vd-error");
						$(p).removeClass("vd-ok ");

						$(".vd-dep-btn", p).addClass("vd-error").removeClass("vd-ok"); //依赖按钮

						return;
					} else {

						if(isRemote && (!_remote)) { //远程不去比较
							_obj2.errorMsg = "";
							_obj2.val = v;
							_obj2.bl = true;
							var p = $(el).parents(".vd-box");
							$(p).removeClass("vd-error ");

							$(p).find(".vd-req").removeClass("vd-error").text("");
							$(el).removeClass("vd-error");
							$(p).addClass("vd-ok");
							$(".vd-dep-btn", p).removeClass("vd-error").addClass("vd-ok"); //依赖按钮

						}

					}
				}

				// 触发比较对象
				if(_compare_emit !== null) {
					this.compareEmit(_obj2.pName, _compare_emit, v);
				}

				// 正则验证
				if(_pattern !== null && v != "") {

					var reg = new RegExp(_pattern, "i");
					if(!reg.test(v)) {
						_obj2.errorMsg = _pattern_msg;
						_obj2.bl = false;
						_obj2.val = v;
						var p = $(el).parents(".vd-box");
						$(p).addClass("vd-error");

						$(p).find(".vd-req,.vd-pattern,.vd-remote,.vd-compare").removeClass("vd-error");

						$(p).find(".vd-pattern").addClass("vd-error").text(_pattern_msg);
						$(el).addClass("vd-error");
						$(p).removeClass("vd-ok");
						$(".vd-dep-btn", p).addClass("vd-error").removeClass("vd-ok"); //依赖按钮

						return;
					} else {
						_obj2.errorMsg = "";
						_obj2.val = v;
						_obj2.bl = true;
						var p = $(el).parents(".vd-box");
						$(p).removeClass("vd-error ");

						$(p).find(".vd-pattern").removeClass("vd-error").text("");
						$(el).removeClass("vd-error");
						$(p).addClass("vd-ok");
						$(".vd-dep-btn", p).removeClass("vd-error").addClass("vd-ok"); //依赖按钮

					}

				} else {

					if(!_remote) { //远程不去比较

						_obj2.errorMsg = "";
						_obj2.val = v;
						_obj2.bl = true;
						var p = $(el).parents(".vd-box");
						$(p).removeClass("vd-error ");

						$(p).find(".vd-pattern").removeClass("vd-error").text("");
						$(el).removeClass("vd-error");
						$(p).addClass("vd-ok");
						$(".vd-dep-btn", p).removeClass("vd-error").addClass("vd-ok"); //依赖按钮
					}
				}

				// 比较验证
				if(_compare !== null) {

					var _compare_obj = $("" + _obj2.pName + "  [name=" + _compare + "]");

					//var _compare_obj = document.forms[_obj2.pName][_compare];
					if(v !== $(_compare_obj).val()) {
						_obj2.bl = false;
						_obj2.val = v;
						_obj2.errorMsg = _compare_msg;
						var p = $(el).parents(".vd-box");
						$(p).addClass("vd-error");

						$(p).find(".vd-req,.vd-pattern,.vd-remote,.vd-compare").removeClass("vd-error");
						$(p).find(".vd-compare").addClass("vd-error").text(_compare_msg);
						$(p).removeClass("vd-ok");
						$(el).addClass("vd-error");
						$(".vd-dep-btn", p).addClass("vd-error").removeClass("vd-ok");; //依赖按钮

						return;
					} else {

						_obj2.errorMsg = "";
						_obj2.val = v;
						_obj2.bl = true;
						var p = $(el).parents(".vd-box");
						$(p).removeClass("vd-error vd-compare ");

						$(p).find(".vd-compare").removeClass("vd-error").text("");
						$(el).removeClass("vd-error");
						$(p).addClass("vd-ok");
						$(".vd-dep-btn", p).removeClass("vd-error").addClass("vd-ok"); //依赖按钮

					}

				}

				if(_remote != null) {

					var _index = _remote_length != null ? _remote_length : 0;
					if(v.length < _index) {
						_obj2.errorMsg = _remote_msg;
						_obj2.bl = false;
						_obj2.val = v;
						_obj2.remote_bl = _obj2.bl;

						var p = $(el).parents(".vd-box");
						$(p).addClass("vd-error ");

						$(p).find(".vd-req,.vd-pattern,.vd-remote,.vd-compare").removeClass("vd-error");
						$(p).find(".vd-remote").addClass("vd-error").text(_remote_msg);
						$(el).addClass("vd-error");
						$(p).removeClass("vd-ok");
						$(".vd-dep-btn", p).removeClass("vd-ok").addClass("vd-error"); //依赖按钮
					
						return;
					}

					var $remote = this;

					if(isRemote) {

						$.ajax({
							url: _remote + "?rand=" + Math.random() + "&" + el.name + "=" + v,
							type: "get",
							timeout: 10000,
							success: function(data) {
								data = data || false;

								if(typeof data !== "number") {
									var _num = Number(data);
									data = isNaN(_num) ? false : _num;
								}

								if(!data) {

									$remote.remoteFunError(_obj2, el, _remote_msg);
									$remote.addVdBtnStyle(el);
									return;
								} else {

									$remote.remoteFunOk(_obj2, el);
									$remote.addVdBtnStyle(el);

								}
							},
							error: function(data) {
								$remote.remoteFunError(_obj2, el, _remote_msg);

								return;
							}

						});

					} else {

						if(_obj2.bl) {
							$remote.remoteFunOk(_obj2, el);
							$remote.addVdBtnStyle(el);
						} else {
							$remote.remoteFunError(_obj2, el, _remote_msg);
							$remote.addVdBtnStyle(el);
						}
					}

				}

				// 复选框
				if(_ck !== null) {
					if(el.checked) {
						_obj2.errorMsg = "";
						_obj2.val = _ck_true !== null ? _ck_true : 0;
						_obj2.bl = true;
						if(_vd_not===null) {
							
							var p = $(el).parents(".vd-box");
							$(p).removeClass("vd-error  ");
							$(el).removeClass("vd-error");
							$(p).addClass("vd-ok");
							$(".vd-dep-btn", p).removeClass("vd-error").addClass("vd-ok"); //依赖按钮
						}else{
							_obj2.bl = true;
						}

					} else {
						_obj2.bl = false;
						_obj2.val = _ck_false !== null ? _ck_false : 0;
						_obj2.errorMsg = _ck_msg;
						if(_vd_not ===null) {
							
							var p = $(el).parents(".vd-box");
							$(p).addClass("vd-error vd-ck ");
							$(p).removeClass("vd-ok");
							$(el).addClass("vd-error");
							$(".vd-dep-btn", p).addClass("vd-error").removeClass("vd-ok"); //依赖按钮	
						}else{
						_obj2.bl = true;	
						}

						return;

					}

				}

			},

			this.isSuccess = function(successFun, errorFun) {

				// 添加错误样式
				this.addErrorStyle(false, false);

				// 是否全部验证成功
				var baseBl = true;
				var arr_rd = {};
				for(var i = 0; i < this.arrs.length; i++) {
					var _obj = this.arrs[i];

					// 单选按钮
					if(_obj.rd) {

						if(_obj.rd_req === false) {
							errorFun(_obj);
							return baseBl = false;
						}

					}
					// 非单选按钮
					else {

						if(_obj.bl === false) {

							errorFun(_obj);
							return baseBl = false;
						}
					}

				}

				if(baseBl) {
					var newObj = this.getNewObjs();
					successFun(newObj);
				}
				return true;
			},

			this.getNewObjs = function() {

				// 是否全部验证成功
				var newObj = {};
				for(var i = 0; i < this.arrs.length; i++) {
					var obj = this.arrs[i];
					if(obj.bl) {
						newObj[obj.elName] = obj.val;
					}

				}

				return newObj;

			},

			this.getObj = function(name) {

				// 是否全部验证成功
				var obj = {}
				for(var i = 0; i < this.arrs.length; i++) {

					if($.trim(name) === $.trim(this.arrs[i].elName)) {

						obj = this.arrs[i];
						break;
					}

				}

				return obj;

			},

			this.addErrorStyle = function(isRemote, isRadio) {

				for(var i = 0; i < this.arrs.length; i++) {
					var obj = this.arrs[i];
					var el = obj.el;
					this.checkElement(obj, el, isRemote, isRadio); // false 不去remote验证    isRadio不做比较
					this.addVdBtnStyle(el); // 添加vd-btn提交按钮样式
				}
			},

			this.remoteFunOk = function(_obj2, el) {
				_obj2.errorMsg = "";
				_obj2.bl = true;
				_obj2.val = $(el).val();
				_obj2.remote_bl = _obj2.bl;

				var p = $(el).parents(".vd-box");
				$(p).removeClass("vd-error ");

				$(p).find(".vd-remote").removeClass("vd-error").text("");
				$(el).removeClass("vd-error");
				$(p).addClass("vd-ok");
				$(".vd-dep-btn", p).removeClass("vd-error").addClass("vd-ok"); //依赖按钮

			},

			this.remoteFunError = function(_obj2, el, _remote_msg) {
				_obj2.errorMsg = _remote_msg;
				_obj2.bl = false;
				_obj2.val = $(el).val();
				_obj2.remote_bl = _obj2.bl;

				var p = $(el).parents(".vd-box");
				$(p).addClass("vd-error ");

				$(p).find(".vd-req,.vd-pattern,.vd-remote,.vd-compare").removeClass("vd-error");
				$(p).find(".vd-remote").addClass("vd-error").text(_remote_msg);
				$(el).addClass("vd-error");
				$(p).removeClass("vd-ok");
				$(".vd-dep-btn", p).removeClass("vd-ok").addClass("vd-error"); //依赖按钮

			},

			this.vdIsOk = function() {

				// 是否全部验证成功
				var baseBl = true;
				for(var i = 0; i < this.arrs.length; i++) {
					var _obj = this.arrs[i];

					// 单选按钮
					if(_obj.rd) {

						if(_obj.rd_req === false) {
							return baseBl = false;
						}

					}

					// 非单选按钮
					else {

						if(_obj.bl === false) {
							return baseBl = false;
						}
					}

				}

				return baseBl;
			},

			this.addVdBtnStyle = function(el) {

				// 提交按钮
				var p = $(el).parents(this.formName);
				var $vd_btn = $(".vd-btn", p);
				if($vd_btn.length > 0) {

					if(this.vdIsOk()) {
						$vd_btn.removeClass("vd-error").addClass("vd-ok");
					} else {

						$vd_btn.removeClass("vd-ok").addClass("vd-error");
					}
				}
			}

	}

	return {
		create: function(formName) {
			return new Obj(formName);
		}
	};

})(window.Zepto || window.jQuery);
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

/*鸭式变形法*/
// 定义接口
function Interface(interName, props) {
    if (arguments.length !== 2) {
        throw new Error("parameter length must is two");
    }
    if (typeof interName !== "string") {
        throw new Error("interName must is string");
    }
    this.interName = interName;
    this.props = [];
    if ((typeof props === "undefined" ? "undefined" : _typeof(props)) === "object" && props.constructor === Array) {

        for (var i in props) {
            if (typeof props[i] === "string") {
                this.props.push(props[i]);
            }
        }
    }
}

// 检查是否实现接口
Interface.check = function (obj) {
    if (arguments.length < 2) {
        throw new Error("arguments  length must  is two");
    }
    // 遍历接口
    for (var i = 1; i < arguments.length; i++) {
        var inter = arguments[i];
        if (inter.constructor !== Interface) {
            throw new Error("not Interface type ");
        }
        for (var y in inter.props) {
            var propName = inter.props[y];

            if (!obj[propName]) {
                throw new Error(" Interface " + inter.interName + "  not implemented  properties name is " + propName);
            }
        }
    }

    return true;
};

/*实现例子*/

//// 创建接口 Icat
//var Icat = new Interface("Icat", ["add", "get"]);

//// 创建类 Cat 并实现Icat接口
//var Cat = function (name) {
//    this.name = name;
//    this.constructor.prototype.add = function () {
//        alert("add");
//    }
//    this.constructor.prototype.get = function () {
//        alert("get");
//    }

//    // 检查是否实现接口
//    Interface.check(this, Icat);
//}

//var cat1 = new Cat();
//cat1.add();
var rootName = "yiqidin"; // 顶级命名空间
var rootObj = window[rootName] = {};

var namespace = {}; // 
namespace.extend = function (ns, nsString) {
	if (typeof nsString !== "string") {
		throw new Error("nsString must string type");
	}
	var parent = ns;
	var arrs = nsString.split(".");
	for (var i = 0; i < arrs.length; i++) {
		var prop = arrs[i];
		if (typeof ns[prop] === "undefined") {
			parent[prop] = {};
		}
		parent = parent[prop];
	}

	return parent;
};

/*namespace.extend(rootObj, "api").bsDate=()(function(){})*/
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

namespace.extend(rootObj, "api").h5File = function ($, mui) {

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

namespace.extend(rootObj, "api").muiPullToRefresh = function (mui, $) {

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

namespace.extend(rootObj, "api").muiSelectDate = function () {

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
namespace.extend(rootObj, "api").pickerSelect = function (mui) {

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

namespace.extend(rootObj, "api").wxLazy = function ($) {

	var _init = function _init() {

		var window_h = $(window).height();

		$(window).scroll(function () {

			setTimeout(function () {

				$(".load-lazy").each(function () {

					var img_h = parseInt($(this).offset().top) - parseInt(window_h);
					var img_h2 = parseInt($(this).offset().top) + $(this).height();
					if ($(window).scrollTop() >= img_h && $(window).scrollTop() < img_h2) {

						// set src
						var _src = $(this).attr("src") || "";
						var _src2 = $(this).attr("data-src") || "";
						if (_src.trim() !== _src2.trim()) {

							// is support animate
							if ($(this).animate) {
								$(this).attr("src", $(this).attr("data-src")).animate({

									"opacity": 0.8
								}, 400).animate({

									"opacity": 1
								}, 400);
							} else {
								$(this).attr("src", $(this).attr("data-src"));
							}
						}
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

			// value
			$(document).on("blur", ".num", function (e) {
						var p = $(this).parents(".number");
						//最大值
						var max = Number($(".num", p).attr("data-max"));
						max = window.isNaN(max) ? 9999 : max;
						//最小值
						var min = Number($(".num", p).attr("data-min"));
						min = window.isNaN(min) ? 0 : min;

						var v = Number($(".num", p).val());
						v = window.isNaN(v) ? min : v;

						if (v > max) {
									v = max;
						}

						if (v < min) {
									v = min;
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

namespace.extend(rootObj, "page").address = function () {

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

namespace.extend(rootObj, "page").adminInfo = function () {

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
namespace.extend(rootObj, "page").baseset = function () {

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

namespace.extend(rootObj, "page").batch = function () {

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

namespace.extend(rootObj, "page").collection = function () {

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

namespace.extend(rootObj, "page").index = function () {

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

namespace.extend(rootObj, "page").shop = function () {

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