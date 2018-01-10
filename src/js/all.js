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
/* Zepto v1.2.0 - zepto event ajax form ie - zeptojs.com/license */
(function(global, factory) {
  if (typeof define === 'function' && define.amd)
    define(function() { return factory(global) })
  else
    factory(global)
}(this, function(window) {
  var Zepto = (function() {
  var undefined, key, $, classList, emptyArray = [], concat = emptyArray.concat, filter = emptyArray.filter, slice = emptyArray.slice,
    document = window.document,
    elementDisplay = {}, classCache = {},
    cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },
    fragmentRE = /^\s*<(\w+|!)[^>]*>/,
    singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
    rootNodeRE = /^(?:body|html)$/i,
    capitalRE = /([A-Z])/g,

    // special attributes that should be get/set via method calls
    methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

    adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],
    table = document.createElement('table'),
    tableRow = document.createElement('tr'),
    containers = {
      'tr': document.createElement('tbody'),
      'tbody': table, 'thead': table, 'tfoot': table,
      'td': tableRow, 'th': tableRow,
      '*': document.createElement('div')
    },
    readyRE = /complete|loaded|interactive/,
    simpleSelectorRE = /^[\w-]*$/,
    class2type = {},
    toString = class2type.toString,
    zepto = {},
    camelize, uniq,
    tempParent = document.createElement('div'),
    propMap = {
      'tabindex': 'tabIndex',
      'readonly': 'readOnly',
      'for': 'htmlFor',
      'class': 'className',
      'maxlength': 'maxLength',
      'cellspacing': 'cellSpacing',
      'cellpadding': 'cellPadding',
      'rowspan': 'rowSpan',
      'colspan': 'colSpan',
      'usemap': 'useMap',
      'frameborder': 'frameBorder',
      'contenteditable': 'contentEditable'
    },
    isArray = Array.isArray ||
      function(object){ return object instanceof Array }

  zepto.matches = function(element, selector) {
    if (!selector || !element || element.nodeType !== 1) return false
    var matchesSelector = element.matches || element.webkitMatchesSelector ||
                          element.mozMatchesSelector || element.oMatchesSelector ||
                          element.matchesSelector
    if (matchesSelector) return matchesSelector.call(element, selector)
    // fall back to performing a selector:
    var match, parent = element.parentNode, temp = !parent
    if (temp) (parent = tempParent).appendChild(element)
    match = ~zepto.qsa(parent, selector).indexOf(element)
    temp && tempParent.removeChild(element)
    return match
  }

  function type(obj) {
    return obj == null ? String(obj) :
      class2type[toString.call(obj)] || "object"
  }

  function isFunction(value) { return type(value) == "function" }
  function isWindow(obj)     { return obj != null && obj == obj.window }
  function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
  function isObject(obj)     { return type(obj) == "object" }
  function isPlainObject(obj) {
    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
  }

  function likeArray(obj) {
    var length = !!obj && 'length' in obj && obj.length,
      type = $.type(obj)

    return 'function' != type && !isWindow(obj) && (
      'array' == type || length === 0 ||
        (typeof length == 'number' && length > 0 && (length - 1) in obj)
    )
  }

  function compact(array) { return filter.call(array, function(item){ return item != null }) }
  function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }
  camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }
  function dasherize(str) {
    return str.replace(/::/g, '/')
           .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
           .replace(/([a-z\d])([A-Z])/g, '$1_$2')
           .replace(/_/g, '-')
           .toLowerCase()
  }
  uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) }

  function classRE(name) {
    return name in classCache ?
      classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
  }

  function maybeAddPx(name, value) {
    return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
  }

  function defaultDisplay(nodeName) {
    var element, display
    if (!elementDisplay[nodeName]) {
      element = document.createElement(nodeName)
      document.body.appendChild(element)
      display = getComputedStyle(element, '').getPropertyValue("display")
      element.parentNode.removeChild(element)
      display == "none" && (display = "block")
      elementDisplay[nodeName] = display
    }
    return elementDisplay[nodeName]
  }

  function children(element) {
    return 'children' in element ?
      slice.call(element.children) :
      $.map(element.childNodes, function(node){ if (node.nodeType == 1) return node })
  }

  function Z(dom, selector) {
    var i, len = dom ? dom.length : 0
    for (i = 0; i < len; i++) this[i] = dom[i]
    this.length = len
    this.selector = selector || ''
  }

  // `$.zepto.fragment` takes a html string and an optional tag name
  // to generate DOM nodes from the given html string.
  // The generated DOM nodes are returned as an array.
  // This function can be overridden in plugins for example to make
  // it compatible with browsers that don't support the DOM fully.
  zepto.fragment = function(html, name, properties) {
    var dom, nodes, container

    // A special case optimization for a single tag
    if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))

    if (!dom) {
      if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
      if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
      if (!(name in containers)) name = '*'

      container = containers[name]
      container.innerHTML = '' + html
      dom = $.each(slice.call(container.childNodes), function(){
        container.removeChild(this)
      })
    }

    if (isPlainObject(properties)) {
      nodes = $(dom)
      $.each(properties, function(key, value) {
        if (methodAttributes.indexOf(key) > -1) nodes[key](value)
        else nodes.attr(key, value)
      })
    }

    return dom
  }

  // `$.zepto.Z` swaps out the prototype of the given `dom` array
  // of nodes with `$.fn` and thus supplying all the Zepto functions
  // to the array. This method can be overridden in plugins.
  zepto.Z = function(dom, selector) {
    return new Z(dom, selector)
  }

  // `$.zepto.isZ` should return `true` if the given object is a Zepto
  // collection. This method can be overridden in plugins.
  zepto.isZ = function(object) {
    return object instanceof zepto.Z
  }

  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
  // takes a CSS selector and an optional context (and handles various
  // special cases).
  // This method can be overridden in plugins.
  zepto.init = function(selector, context) {
    var dom
    // If nothing given, return an empty Zepto collection
    if (!selector) return zepto.Z()
    // Optimize for string selectors
    else if (typeof selector == 'string') {
      selector = selector.trim()
      // If it's a html fragment, create nodes from it
      // Note: In both Chrome 21 and Firefox 15, DOM error 12
      // is thrown if the fragment doesn't begin with <
      if (selector[0] == '<' && fragmentRE.test(selector))
        dom = zepto.fragment(selector, RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // If it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
    }
    // If a function is given, call it when the DOM is ready
    else if (isFunction(selector)) return $(document).ready(selector)
    // If a Zepto collection is given, just return it
    else if (zepto.isZ(selector)) return selector
    else {
      // normalize array if an array of nodes is given
      if (isArray(selector)) dom = compact(selector)
      // Wrap DOM nodes.
      else if (isObject(selector))
        dom = [selector], selector = null
      // If it's a html fragment, create nodes from it
      else if (fragmentRE.test(selector))
        dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // And last but no least, if it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
    }
    // create a new Zepto collection from the nodes found
    return zepto.Z(dom, selector)
  }

  // `$` will be the base `Zepto` object. When calling this
  // function just call `$.zepto.init, which makes the implementation
  // details of selecting nodes and creating Zepto collections
  // patchable in plugins.
  $ = function(selector, context){
    return zepto.init(selector, context)
  }

  function extend(target, source, deep) {
    for (key in source)
      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key]))
          target[key] = {}
        if (isArray(source[key]) && !isArray(target[key]))
          target[key] = []
        extend(target[key], source[key], deep)
      }
      else if (source[key] !== undefined) target[key] = source[key]
  }

  // Copy all but undefined properties from one or more
  // objects to the `target` object.
  $.extend = function(target){
    var deep, args = slice.call(arguments, 1)
    if (typeof target == 'boolean') {
      deep = target
      target = args.shift()
    }
    args.forEach(function(arg){ extend(target, arg, deep) })
    return target
  }

  // `$.zepto.qsa` is Zepto's CSS selector implementation which
  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
  // This method can be overridden in plugins.
  zepto.qsa = function(element, selector){
    var found,
        maybeID = selector[0] == '#',
        maybeClass = !maybeID && selector[0] == '.',
        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
        isSimple = simpleSelectorRE.test(nameOnly)
    return (element.getElementById && isSimple && maybeID) ? // Safari DocumentFragment doesn't have getElementById
      ( (found = element.getElementById(nameOnly)) ? [found] : [] ) :
      (element.nodeType !== 1 && element.nodeType !== 9 && element.nodeType !== 11) ? [] :
      slice.call(
        isSimple && !maybeID && element.getElementsByClassName ? // DocumentFragment doesn't have getElementsByClassName/TagName
          maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
          element.getElementsByTagName(selector) : // Or a tag
          element.querySelectorAll(selector) // Or it's not simple, and we need to query all
      )
  }

  function filtered(nodes, selector) {
    return selector == null ? $(nodes) : $(nodes).filter(selector)
  }

  $.contains = document.documentElement.contains ?
    function(parent, node) {
      return parent !== node && parent.contains(node)
    } :
    function(parent, node) {
      while (node && (node = node.parentNode))
        if (node === parent) return true
      return false
    }

  function funcArg(context, arg, idx, payload) {
    return isFunction(arg) ? arg.call(context, idx, payload) : arg
  }

  function setAttribute(node, name, value) {
    value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
  }

  // access className property while respecting SVGAnimatedString
  function className(node, value){
    var klass = node.className || '',
        svg   = klass && klass.baseVal !== undefined

    if (value === undefined) return svg ? klass.baseVal : klass
    svg ? (klass.baseVal = value) : (node.className = value)
  }

  // "true"  => true
  // "false" => false
  // "null"  => null
  // "42"    => 42
  // "42.5"  => 42.5
  // "08"    => "08"
  // JSON    => parse if valid
  // String  => self
  function deserializeValue(value) {
    try {
      return value ?
        value == "true" ||
        ( value == "false" ? false :
          value == "null" ? null :
          +value + "" == value ? +value :
          /^[\[\{]/.test(value) ? $.parseJSON(value) :
          value )
        : value
    } catch(e) {
      return value
    }
  }

  $.type = type
  $.isFunction = isFunction
  $.isWindow = isWindow
  $.isArray = isArray
  $.isPlainObject = isPlainObject

  $.isEmptyObject = function(obj) {
    var name
    for (name in obj) return false
    return true
  }

  $.isNumeric = function(val) {
    var num = Number(val), type = typeof val
    return val != null && type != 'boolean' &&
      (type != 'string' || val.length) &&
      !isNaN(num) && isFinite(num) || false
  }

  $.inArray = function(elem, array, i){
    return emptyArray.indexOf.call(array, elem, i)
  }

  $.camelCase = camelize
  $.trim = function(str) {
    return str == null ? "" : String.prototype.trim.call(str)
  }

  // plugin compatibility
  $.uuid = 0
  $.support = { }
  $.expr = { }
  $.noop = function() {}

  $.map = function(elements, callback){
    var value, values = [], i, key
    if (likeArray(elements))
      for (i = 0; i < elements.length; i++) {
        value = callback(elements[i], i)
        if (value != null) values.push(value)
      }
    else
      for (key in elements) {
        value = callback(elements[key], key)
        if (value != null) values.push(value)
      }
    return flatten(values)
  }

  $.each = function(elements, callback){
    var i, key
    if (likeArray(elements)) {
      for (i = 0; i < elements.length; i++)
        if (callback.call(elements[i], i, elements[i]) === false) return elements
    } else {
      for (key in elements)
        if (callback.call(elements[key], key, elements[key]) === false) return elements
    }

    return elements
  }

  $.grep = function(elements, callback){
    return filter.call(elements, callback)
  }

  if (window.JSON) $.parseJSON = JSON.parse

  // Populate the class2type map
  $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
    class2type[ "[object " + name + "]" ] = name.toLowerCase()
  })

  // Define methods that will be available on all
  // Zepto collections
  $.fn = {
    constructor: zepto.Z,
    length: 0,

    // Because a collection acts like an array
    // copy over these useful array functions.
    forEach: emptyArray.forEach,
    reduce: emptyArray.reduce,
    push: emptyArray.push,
    sort: emptyArray.sort,
    splice: emptyArray.splice,
    indexOf: emptyArray.indexOf,
    concat: function(){
      var i, value, args = []
      for (i = 0; i < arguments.length; i++) {
        value = arguments[i]
        args[i] = zepto.isZ(value) ? value.toArray() : value
      }
      return concat.apply(zepto.isZ(this) ? this.toArray() : this, args)
    },

    // `map` and `slice` in the jQuery API work differently
    // from their array counterparts
    map: function(fn){
      return $($.map(this, function(el, i){ return fn.call(el, i, el) }))
    },
    slice: function(){
      return $(slice.apply(this, arguments))
    },

    ready: function(callback){
      // need to check if document.body exists for IE as that browser reports
      // document ready when it hasn't yet created the body element
      if (readyRE.test(document.readyState) && document.body) callback($)
      else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false)
      return this
    },
    get: function(idx){
      return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
    },
    toArray: function(){ return this.get() },
    size: function(){
      return this.length
    },
    remove: function(){
      return this.each(function(){
        if (this.parentNode != null)
          this.parentNode.removeChild(this)
      })
    },
    each: function(callback){
      emptyArray.every.call(this, function(el, idx){
        return callback.call(el, idx, el) !== false
      })
      return this
    },
    filter: function(selector){
      if (isFunction(selector)) return this.not(this.not(selector))
      return $(filter.call(this, function(element){
        return zepto.matches(element, selector)
      }))
    },
    add: function(selector,context){
      return $(uniq(this.concat($(selector,context))))
    },
    is: function(selector){
      return this.length > 0 && zepto.matches(this[0], selector)
    },
    not: function(selector){
      var nodes=[]
      if (isFunction(selector) && selector.call !== undefined)
        this.each(function(idx){
          if (!selector.call(this,idx)) nodes.push(this)
        })
      else {
        var excludes = typeof selector == 'string' ? this.filter(selector) :
          (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
        this.forEach(function(el){
          if (excludes.indexOf(el) < 0) nodes.push(el)
        })
      }
      return $(nodes)
    },
    has: function(selector){
      return this.filter(function(){
        return isObject(selector) ?
          $.contains(this, selector) :
          $(this).find(selector).size()
      })
    },
    eq: function(idx){
      return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)
    },
    first: function(){
      var el = this[0]
      return el && !isObject(el) ? el : $(el)
    },
    last: function(){
      var el = this[this.length - 1]
      return el && !isObject(el) ? el : $(el)
    },
    find: function(selector){
      var result, $this = this
      if (!selector) result = $()
      else if (typeof selector == 'object')
        result = $(selector).filter(function(){
          var node = this
          return emptyArray.some.call($this, function(parent){
            return $.contains(parent, node)
          })
        })
      else if (this.length == 1) result = $(zepto.qsa(this[0], selector))
      else result = this.map(function(){ return zepto.qsa(this, selector) })
      return result
    },
    closest: function(selector, context){
      var nodes = [], collection = typeof selector == 'object' && $(selector)
      this.each(function(_, node){
        while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))
          node = node !== context && !isDocument(node) && node.parentNode
        if (node && nodes.indexOf(node) < 0) nodes.push(node)
      })
      return $(nodes)
    },
    parents: function(selector){
      var ancestors = [], nodes = this
      while (nodes.length > 0)
        nodes = $.map(nodes, function(node){
          if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
            ancestors.push(node)
            return node
          }
        })
      return filtered(ancestors, selector)
    },
    parent: function(selector){
      return filtered(uniq(this.pluck('parentNode')), selector)
    },
    children: function(selector){
      return filtered(this.map(function(){ return children(this) }), selector)
    },
    contents: function() {
      return this.map(function() { return this.contentDocument || slice.call(this.childNodes) })
    },
    siblings: function(selector){
      return filtered(this.map(function(i, el){
        return filter.call(children(el.parentNode), function(child){ return child!==el })
      }), selector)
    },
    empty: function(){
      return this.each(function(){ this.innerHTML = '' })
    },
    // `pluck` is borrowed from Prototype.js
    pluck: function(property){
      return $.map(this, function(el){ return el[property] })
    },
    show: function(){
      return this.each(function(){
        this.style.display == "none" && (this.style.display = '')
        if (getComputedStyle(this, '').getPropertyValue("display") == "none")
          this.style.display = defaultDisplay(this.nodeName)
      })
    },
    replaceWith: function(newContent){
      return this.before(newContent).remove()
    },
    wrap: function(structure){
      var func = isFunction(structure)
      if (this[0] && !func)
        var dom   = $(structure).get(0),
            clone = dom.parentNode || this.length > 1

      return this.each(function(index){
        $(this).wrapAll(
          func ? structure.call(this, index) :
            clone ? dom.cloneNode(true) : dom
        )
      })
    },
    wrapAll: function(structure){
      if (this[0]) {
        $(this[0]).before(structure = $(structure))
        var children
        // drill down to the inmost element
        while ((children = structure.children()).length) structure = children.first()
        $(structure).append(this)
      }
      return this
    },
    wrapInner: function(structure){
      var func = isFunction(structure)
      return this.each(function(index){
        var self = $(this), contents = self.contents(),
            dom  = func ? structure.call(this, index) : structure
        contents.length ? contents.wrapAll(dom) : self.append(dom)
      })
    },
    unwrap: function(){
      this.parent().each(function(){
        $(this).replaceWith($(this).children())
      })
      return this
    },
    clone: function(){
      return this.map(function(){ return this.cloneNode(true) })
    },
    hide: function(){
      return this.css("display", "none")
    },
    toggle: function(setting){
      return this.each(function(){
        var el = $(this)
        ;(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
      })
    },
    prev: function(selector){ return $(this.pluck('previousElementSibling')).filter(selector || '*') },
    next: function(selector){ return $(this.pluck('nextElementSibling')).filter(selector || '*') },
    html: function(html){
      return 0 in arguments ?
        this.each(function(idx){
          var originHtml = this.innerHTML
          $(this).empty().append( funcArg(this, html, idx, originHtml) )
        }) :
        (0 in this ? this[0].innerHTML : null)
    },
    text: function(text){
      return 0 in arguments ?
        this.each(function(idx){
          var newText = funcArg(this, text, idx, this.textContent)
          this.textContent = newText == null ? '' : ''+newText
        }) :
        (0 in this ? this.pluck('textContent').join("") : null)
    },
    attr: function(name, value){
      var result
      return (typeof name == 'string' && !(1 in arguments)) ?
        (0 in this && this[0].nodeType == 1 && (result = this[0].getAttribute(name)) != null ? result : undefined) :
        this.each(function(idx){
          if (this.nodeType !== 1) return
          if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
          else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
        })
    },
    removeAttr: function(name){
      return this.each(function(){ this.nodeType === 1 && name.split(' ').forEach(function(attribute){
        setAttribute(this, attribute)
      }, this)})
    },
    prop: function(name, value){
      name = propMap[name] || name
      return (1 in arguments) ?
        this.each(function(idx){
          this[name] = funcArg(this, value, idx, this[name])
        }) :
        (this[0] && this[0][name])
    },
    removeProp: function(name){
      name = propMap[name] || name
      return this.each(function(){ delete this[name] })
    },
    data: function(name, value){
      var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase()

      var data = (1 in arguments) ?
        this.attr(attrName, value) :
        this.attr(attrName)

      return data !== null ? deserializeValue(data) : undefined
    },
    val: function(value){
      if (0 in arguments) {
        if (value == null) value = ""
        return this.each(function(idx){
          this.value = funcArg(this, value, idx, this.value)
        })
      } else {
        return this[0] && (this[0].multiple ?
           $(this[0]).find('option').filter(function(){ return this.selected }).pluck('value') :
           this[0].value)
      }
    },
    offset: function(coordinates){
      if (coordinates) return this.each(function(index){
        var $this = $(this),
            coords = funcArg(this, coordinates, index, $this.offset()),
            parentOffset = $this.offsetParent().offset(),
            props = {
              top:  coords.top  - parentOffset.top,
              left: coords.left - parentOffset.left
            }

        if ($this.css('position') == 'static') props['position'] = 'relative'
        $this.css(props)
      })
      if (!this.length) return null
      if (document.documentElement !== this[0] && !$.contains(document.documentElement, this[0]))
        return {top: 0, left: 0}
      var obj = this[0].getBoundingClientRect()
      return {
        left: obj.left + window.pageXOffset,
        top: obj.top + window.pageYOffset,
        width: Math.round(obj.width),
        height: Math.round(obj.height)
      }
    },
    css: function(property, value){
      if (arguments.length < 2) {
        var element = this[0]
        if (typeof property == 'string') {
          if (!element) return
          return element.style[camelize(property)] || getComputedStyle(element, '').getPropertyValue(property)
        } else if (isArray(property)) {
          if (!element) return
          var props = {}
          var computedStyle = getComputedStyle(element, '')
          $.each(property, function(_, prop){
            props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
          })
          return props
        }
      }

      var css = ''
      if (type(property) == 'string') {
        if (!value && value !== 0)
          this.each(function(){ this.style.removeProperty(dasherize(property)) })
        else
          css = dasherize(property) + ":" + maybeAddPx(property, value)
      } else {
        for (key in property)
          if (!property[key] && property[key] !== 0)
            this.each(function(){ this.style.removeProperty(dasherize(key)) })
          else
            css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
      }

      return this.each(function(){ this.style.cssText += ';' + css })
    },
    index: function(element){
      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
    },
    hasClass: function(name){
      if (!name) return false
      return emptyArray.some.call(this, function(el){
        return this.test(className(el))
      }, classRE(name))
    },
    addClass: function(name){
      if (!name) return this
      return this.each(function(idx){
        if (!('className' in this)) return
        classList = []
        var cls = className(this), newName = funcArg(this, name, idx, cls)
        newName.split(/\s+/g).forEach(function(klass){
          if (!$(this).hasClass(klass)) classList.push(klass)
        }, this)
        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
      })
    },
    removeClass: function(name){
      return this.each(function(idx){
        if (!('className' in this)) return
        if (name === undefined) return className(this, '')
        classList = className(this)
        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass){
          classList = classList.replace(classRE(klass), " ")
        })
        className(this, classList.trim())
      })
    },
    toggleClass: function(name, when){
      if (!name) return this
      return this.each(function(idx){
        var $this = $(this), names = funcArg(this, name, idx, className(this))
        names.split(/\s+/g).forEach(function(klass){
          (when === undefined ? !$this.hasClass(klass) : when) ?
            $this.addClass(klass) : $this.removeClass(klass)
        })
      })
    },
    scrollTop: function(value){
      if (!this.length) return
      var hasScrollTop = 'scrollTop' in this[0]
      if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset
      return this.each(hasScrollTop ?
        function(){ this.scrollTop = value } :
        function(){ this.scrollTo(this.scrollX, value) })
    },
    scrollLeft: function(value){
      if (!this.length) return
      var hasScrollLeft = 'scrollLeft' in this[0]
      if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset
      return this.each(hasScrollLeft ?
        function(){ this.scrollLeft = value } :
        function(){ this.scrollTo(value, this.scrollY) })
    },
    position: function() {
      if (!this.length) return

      var elem = this[0],
        // Get *real* offsetParent
        offsetParent = this.offsetParent(),
        // Get correct offsets
        offset       = this.offset(),
        parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()

      // Subtract element margins
      // note: when an element has margin: auto the offsetLeft and marginLeft
      // are the same in Safari causing offset.left to incorrectly be 0
      offset.top  -= parseFloat( $(elem).css('margin-top') ) || 0
      offset.left -= parseFloat( $(elem).css('margin-left') ) || 0

      // Add offsetParent borders
      parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0
      parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0

      // Subtract the two offsets
      return {
        top:  offset.top  - parentOffset.top,
        left: offset.left - parentOffset.left
      }
    },
    offsetParent: function() {
      return this.map(function(){
        var parent = this.offsetParent || document.body
        while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
          parent = parent.offsetParent
        return parent
      })
    }
  }

  // for now
  $.fn.detach = $.fn.remove

  // Generate the `width` and `height` functions
  ;['width', 'height'].forEach(function(dimension){
    var dimensionProperty =
      dimension.replace(/./, function(m){ return m[0].toUpperCase() })

    $.fn[dimension] = function(value){
      var offset, el = this[0]
      if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :
        isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
        (offset = this.offset()) && offset[dimension]
      else return this.each(function(idx){
        el = $(this)
        el.css(dimension, funcArg(this, value, idx, el[dimension]()))
      })
    }
  })

  function traverseNode(node, fun) {
    fun(node)
    for (var i = 0, len = node.childNodes.length; i < len; i++)
      traverseNode(node.childNodes[i], fun)
  }

  // Generate the `after`, `prepend`, `before`, `append`,
  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
  adjacencyOperators.forEach(function(operator, operatorIndex) {
    var inside = operatorIndex % 2 //=> prepend, append

    $.fn[operator] = function(){
      // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
      var argType, nodes = $.map(arguments, function(arg) {
            var arr = []
            argType = type(arg)
            if (argType == "array") {
              arg.forEach(function(el) {
                if (el.nodeType !== undefined) return arr.push(el)
                else if ($.zepto.isZ(el)) return arr = arr.concat(el.get())
                arr = arr.concat(zepto.fragment(el))
              })
              return arr
            }
            return argType == "object" || arg == null ?
              arg : zepto.fragment(arg)
          }),
          parent, copyByClone = this.length > 1
      if (nodes.length < 1) return this

      return this.each(function(_, target){
        parent = inside ? target : target.parentNode

        // convert all methods to a "before" operation
        target = operatorIndex == 0 ? target.nextSibling :
                 operatorIndex == 1 ? target.firstChild :
                 operatorIndex == 2 ? target :
                 null

        var parentInDocument = $.contains(document.documentElement, parent)

        nodes.forEach(function(node){
          if (copyByClone) node = node.cloneNode(true)
          else if (!parent) return $(node).remove()

          parent.insertBefore(node, target)
          if (parentInDocument) traverseNode(node, function(el){
            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
               (!el.type || el.type === 'text/javascript') && !el.src){
              var target = el.ownerDocument ? el.ownerDocument.defaultView : window
              target['eval'].call(target, el.innerHTML)
            }
          })
        })
      })
    }

    // after    => insertAfter
    // prepend  => prependTo
    // before   => insertBefore
    // append   => appendTo
    $.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
      $(html)[operator](this)
      return this
    }
  })

  zepto.Z.prototype = Z.prototype = $.fn

  // Export internal API functions in the `$.zepto` namespace
  zepto.uniq = uniq
  zepto.deserializeValue = deserializeValue
  $.zepto = zepto

  return $
})()

window.Zepto = Zepto
window.$ === undefined && (window.$ = Zepto)

;(function($){
  var _zid = 1, undefined,
      slice = Array.prototype.slice,
      isFunction = $.isFunction,
      isString = function(obj){ return typeof obj == 'string' },
      handlers = {},
      specialEvents={},
      focusinSupported = 'onfocusin' in window,
      focus = { focus: 'focusin', blur: 'focusout' },
      hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }

  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

  function zid(element) {
    return element._zid || (element._zid = _zid++)
  }
  function findHandlers(element, event, fn, selector) {
    event = parse(event)
    if (event.ns) var matcher = matcherFor(event.ns)
    return (handlers[zid(element)] || []).filter(function(handler) {
      return handler
        && (!event.e  || handler.e == event.e)
        && (!event.ns || matcher.test(handler.ns))
        && (!fn       || zid(handler.fn) === zid(fn))
        && (!selector || handler.sel == selector)
    })
  }
  function parse(event) {
    var parts = ('' + event).split('.')
    return {e: parts[0], ns: parts.slice(1).sort().join(' ')}
  }
  function matcherFor(ns) {
    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
  }

  function eventCapture(handler, captureSetting) {
    return handler.del &&
      (!focusinSupported && (handler.e in focus)) ||
      !!captureSetting
  }

  function realEvent(type) {
    return hover[type] || (focusinSupported && focus[type]) || type
  }

  function add(element, events, fn, data, selector, delegator, capture){
    var id = zid(element), set = (handlers[id] || (handlers[id] = []))
    events.split(/\s/).forEach(function(event){
      if (event == 'ready') return $(document).ready(fn)
      var handler   = parse(event)
      handler.fn    = fn
      handler.sel   = selector
      // emulate mouseenter, mouseleave
      if (handler.e in hover) fn = function(e){
        var related = e.relatedTarget
        if (!related || (related !== this && !$.contains(this, related)))
          return handler.fn.apply(this, arguments)
      }
      handler.del   = delegator
      var callback  = delegator || fn
      handler.proxy = function(e){
        e = compatible(e)
        if (e.isImmediatePropagationStopped()) return
        e.data = data
        var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))
        if (result === false) e.preventDefault(), e.stopPropagation()
        return result
      }
      handler.i = set.length
      set.push(handler)
      if ('addEventListener' in element)
        element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
    })
  }
  function remove(element, events, fn, selector, capture){
    var id = zid(element)
    ;(events || '').split(/\s/).forEach(function(event){
      findHandlers(element, event, fn, selector).forEach(function(handler){
        delete handlers[id][handler.i]
      if ('removeEventListener' in element)
        element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
      })
    })
  }

  $.event = { add: add, remove: remove }

  $.proxy = function(fn, context) {
    var args = (2 in arguments) && slice.call(arguments, 2)
    if (isFunction(fn)) {
      var proxyFn = function(){ return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments) }
      proxyFn._zid = zid(fn)
      return proxyFn
    } else if (isString(context)) {
      if (args) {
        args.unshift(fn[context], fn)
        return $.proxy.apply(null, args)
      } else {
        return $.proxy(fn[context], fn)
      }
    } else {
      throw new TypeError("expected function")
    }
  }

  $.fn.bind = function(event, data, callback){
    return this.on(event, data, callback)
  }
  $.fn.unbind = function(event, callback){
    return this.off(event, callback)
  }
  $.fn.one = function(event, selector, data, callback){
    return this.on(event, selector, data, callback, 1)
  }

  var returnTrue = function(){return true},
      returnFalse = function(){return false},
      ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,
      eventMethods = {
        preventDefault: 'isDefaultPrevented',
        stopImmediatePropagation: 'isImmediatePropagationStopped',
        stopPropagation: 'isPropagationStopped'
      }

  function compatible(event, source) {
    if (source || !event.isDefaultPrevented) {
      source || (source = event)

      $.each(eventMethods, function(name, predicate) {
        var sourceMethod = source[name]
        event[name] = function(){
          this[predicate] = returnTrue
          return sourceMethod && sourceMethod.apply(source, arguments)
        }
        event[predicate] = returnFalse
      })

      event.timeStamp || (event.timeStamp = Date.now())

      if (source.defaultPrevented !== undefined ? source.defaultPrevented :
          'returnValue' in source ? source.returnValue === false :
          source.getPreventDefault && source.getPreventDefault())
        event.isDefaultPrevented = returnTrue
    }
    return event
  }

  function createProxy(event) {
    var key, proxy = { originalEvent: event }
    for (key in event)
      if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]

    return compatible(proxy, event)
  }

  $.fn.delegate = function(selector, event, callback){
    return this.on(event, selector, callback)
  }
  $.fn.undelegate = function(selector, event, callback){
    return this.off(event, selector, callback)
  }

  $.fn.live = function(event, callback){
    $(document.body).delegate(this.selector, event, callback)
    return this
  }
  $.fn.die = function(event, callback){
    $(document.body).undelegate(this.selector, event, callback)
    return this
  }

  $.fn.on = function(event, selector, data, callback, one){
    var autoRemove, delegator, $this = this
    if (event && !isString(event)) {
      $.each(event, function(type, fn){
        $this.on(type, selector, data, fn, one)
      })
      return $this
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false)
      callback = data, data = selector, selector = undefined
    if (callback === undefined || data === false)
      callback = data, data = undefined

    if (callback === false) callback = returnFalse

    return $this.each(function(_, element){
      if (one) autoRemove = function(e){
        remove(element, e.type, callback)
        return callback.apply(this, arguments)
      }

      if (selector) delegator = function(e){
        var evt, match = $(e.target).closest(selector, element).get(0)
        if (match && match !== element) {
          evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})
          return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
        }
      }

      add(element, event, callback, data, selector, delegator || autoRemove)
    })
  }
  $.fn.off = function(event, selector, callback){
    var $this = this
    if (event && !isString(event)) {
      $.each(event, function(type, fn){
        $this.off(type, selector, fn)
      })
      return $this
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false)
      callback = selector, selector = undefined

    if (callback === false) callback = returnFalse

    return $this.each(function(){
      remove(this, event, callback, selector)
    })
  }

  $.fn.trigger = function(event, args){
    event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)
    event._args = args
    return this.each(function(){
      // handle focus(), blur() by calling them directly
      if (event.type in focus && typeof this[event.type] == "function") this[event.type]()
      // items in the collection might not be DOM elements
      else if ('dispatchEvent' in this) this.dispatchEvent(event)
      else $(this).triggerHandler(event, args)
    })
  }

  // triggers event handlers on current element just as if an event occurred,
  // doesn't trigger an actual event, doesn't bubble
  $.fn.triggerHandler = function(event, args){
    var e, result
    this.each(function(i, element){
      e = createProxy(isString(event) ? $.Event(event) : event)
      e._args = args
      e.target = element
      $.each(findHandlers(element, event.type || event), function(i, handler){
        result = handler.proxy(e)
        if (e.isImmediatePropagationStopped()) return false
      })
    })
    return result
  }

  // shortcut methods for `.bind(event, fn)` for each event type
  ;('focusin focusout focus blur load resize scroll unload click dblclick '+
  'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '+
  'change select keydown keypress keyup error').split(' ').forEach(function(event) {
    $.fn[event] = function(callback) {
      return (0 in arguments) ?
        this.bind(event, callback) :
        this.trigger(event)
    }
  })

  $.Event = function(type, props) {
    if (!isString(type)) props = type, type = props.type
    var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
    if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
    event.initEvent(type, bubbles, true)
    return compatible(event)
  }

})(Zepto)

;(function($){
  var jsonpID = +new Date(),
      document = window.document,
      key,
      name,
      rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      scriptTypeRE = /^(?:text|application)\/javascript/i,
      xmlTypeRE = /^(?:text|application)\/xml/i,
      jsonType = 'application/json',
      htmlType = 'text/html',
      blankRE = /^\s*$/,
      originAnchor = document.createElement('a')

  originAnchor.href = window.location.href

  // trigger a custom event and return false if it was cancelled
  function triggerAndReturn(context, eventName, data) {
    var event = $.Event(eventName)
    $(context).trigger(event, data)
    return !event.isDefaultPrevented()
  }

  // trigger an Ajax "global" event
  function triggerGlobal(settings, context, eventName, data) {
    if (settings.global) return triggerAndReturn(context || document, eventName, data)
  }

  // Number of active Ajax requests
  $.active = 0

  function ajaxStart(settings) {
    if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')
  }
  function ajaxStop(settings) {
    if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')
  }

  // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
  function ajaxBeforeSend(xhr, settings) {
    var context = settings.context
    if (settings.beforeSend.call(context, xhr, settings) === false ||
        triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
      return false

    triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])
  }
  function ajaxSuccess(data, xhr, settings, deferred) {
    var context = settings.context, status = 'success'
    settings.success.call(context, data, status, xhr)
    if (deferred) deferred.resolveWith(context, [data, status, xhr])
    triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])
    ajaxComplete(status, xhr, settings)
  }
  // type: "timeout", "error", "abort", "parsererror"
  function ajaxError(error, type, xhr, settings, deferred) {
    var context = settings.context
    settings.error.call(context, xhr, type, error)
    if (deferred) deferred.rejectWith(context, [xhr, type, error])
    triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type])
    ajaxComplete(type, xhr, settings)
  }
  // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
  function ajaxComplete(status, xhr, settings) {
    var context = settings.context
    settings.complete.call(context, xhr, status)
    triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])
    ajaxStop(settings)
  }

  function ajaxDataFilter(data, type, settings) {
    if (settings.dataFilter == empty) return data
    var context = settings.context
    return settings.dataFilter.call(context, data, type)
  }

  // Empty function, used as default callback
  function empty() {}

  $.ajaxJSONP = function(options, deferred){
    if (!('type' in options)) return $.ajax(options)

    var _callbackName = options.jsonpCallback,
      callbackName = ($.isFunction(_callbackName) ?
        _callbackName() : _callbackName) || ('Zepto' + (jsonpID++)),
      script = document.createElement('script'),
      originalCallback = window[callbackName],
      responseData,
      abort = function(errorType) {
        $(script).triggerHandler('error', errorType || 'abort')
      },
      xhr = { abort: abort }, abortTimeout

    if (deferred) deferred.promise(xhr)

    $(script).on('load error', function(e, errorType){
      clearTimeout(abortTimeout)
      $(script).off().remove()

      if (e.type == 'error' || !responseData) {
        ajaxError(null, errorType || 'error', xhr, options, deferred)
      } else {
        ajaxSuccess(responseData[0], xhr, options, deferred)
      }

      window[callbackName] = originalCallback
      if (responseData && $.isFunction(originalCallback))
        originalCallback(responseData[0])

      originalCallback = responseData = undefined
    })

    if (ajaxBeforeSend(xhr, options) === false) {
      abort('abort')
      return xhr
    }

    window[callbackName] = function(){
      responseData = arguments
    }

    script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName)
    document.head.appendChild(script)

    if (options.timeout > 0) abortTimeout = setTimeout(function(){
      abort('timeout')
    }, options.timeout)

    return xhr
  }

  $.ajaxSettings = {
    // Default type of request
    type: 'GET',
    // Callback that is executed before request
    beforeSend: empty,
    // Callback that is executed if the request succeeds
    success: empty,
    // Callback that is executed the the server drops error
    error: empty,
    // Callback that is executed on request complete (both: error and success)
    complete: empty,
    // The context for the callbacks
    context: null,
    // Whether to trigger "global" Ajax events
    global: true,
    // Transport
    xhr: function () {
      return new window.XMLHttpRequest()
    },
    // MIME types mapping
    // IIS returns Javascript as "application/x-javascript"
    accepts: {
      script: 'text/javascript, application/javascript, application/x-javascript',
      json:   jsonType,
      xml:    'application/xml, text/xml',
      html:   htmlType,
      text:   'text/plain'
    },
    // Whether the request is to another domain
    crossDomain: false,
    // Default timeout
    timeout: 0,
    // Whether data should be serialized to string
    processData: true,
    // Whether the browser should be allowed to cache GET responses
    cache: true,
    //Used to handle the raw response data of XMLHttpRequest.
    //This is a pre-filtering function to sanitize the response.
    //The sanitized response should be returned
    dataFilter: empty
  }

  function mimeToDataType(mime) {
    if (mime) mime = mime.split(';', 2)[0]
    return mime && ( mime == htmlType ? 'html' :
      mime == jsonType ? 'json' :
      scriptTypeRE.test(mime) ? 'script' :
      xmlTypeRE.test(mime) && 'xml' ) || 'text'
  }

  function appendQuery(url, query) {
    if (query == '') return url
    return (url + '&' + query).replace(/[&?]{1,2}/, '?')
  }

  // serialize payload and append it to the URL for GET requests
  function serializeData(options) {
    if (options.processData && options.data && $.type(options.data) != "string")
      options.data = $.param(options.data, options.traditional)
    if (options.data && (!options.type || options.type.toUpperCase() == 'GET' || 'jsonp' == options.dataType))
      options.url = appendQuery(options.url, options.data), options.data = undefined
  }

  $.ajax = function(options){
    var settings = $.extend({}, options || {}),
        deferred = $.Deferred && $.Deferred(),
        urlAnchor, hashIndex
    for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]

    ajaxStart(settings)

    if (!settings.crossDomain) {
      urlAnchor = document.createElement('a')
      urlAnchor.href = settings.url
      // cleans up URL for .href (IE only), see https://github.com/madrobby/zepto/pull/1049
      urlAnchor.href = urlAnchor.href
      settings.crossDomain = (originAnchor.protocol + '//' + originAnchor.host) !== (urlAnchor.protocol + '//' + urlAnchor.host)
    }

    if (!settings.url) settings.url = window.location.toString()
    if ((hashIndex = settings.url.indexOf('#')) > -1) settings.url = settings.url.slice(0, hashIndex)
    serializeData(settings)

    var dataType = settings.dataType, hasPlaceholder = /\?.+=\?/.test(settings.url)
    if (hasPlaceholder) dataType = 'jsonp'

    if (settings.cache === false || (
         (!options || options.cache !== true) &&
         ('script' == dataType || 'jsonp' == dataType)
        ))
      settings.url = appendQuery(settings.url, '_=' + Date.now())

    if ('jsonp' == dataType) {
      if (!hasPlaceholder)
        settings.url = appendQuery(settings.url,
          settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?')
      return $.ajaxJSONP(settings, deferred)
    }

    var mime = settings.accepts[dataType],
        headers = { },
        setHeader = function(name, value) { headers[name.toLowerCase()] = [name, value] },
        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
        xhr = settings.xhr(),
        nativeSetHeader = xhr.setRequestHeader,
        abortTimeout

    if (deferred) deferred.promise(xhr)

    if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest')
    setHeader('Accept', mime || '*/*')
    if (mime = settings.mimeType || mime) {
      if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
      xhr.overrideMimeType && xhr.overrideMimeType(mime)
    }
    if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
      setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded')

    if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name])
    xhr.setRequestHeader = setHeader

    xhr.onreadystatechange = function(){
      if (xhr.readyState == 4) {
        xhr.onreadystatechange = empty
        clearTimeout(abortTimeout)
        var result, error = false
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
          dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'))

          if (xhr.responseType == 'arraybuffer' || xhr.responseType == 'blob')
            result = xhr.response
          else {
            result = xhr.responseText

            try {
              // http://perfectionkills.com/global-eval-what-are-the-options/
              // sanitize response accordingly if data filter callback provided
              result = ajaxDataFilter(result, dataType, settings)
              if (dataType == 'script')    (1,eval)(result)
              else if (dataType == 'xml')  result = xhr.responseXML
              else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result)
            } catch (e) { error = e }

            if (error) return ajaxError(error, 'parsererror', xhr, settings, deferred)
          }

          ajaxSuccess(result, xhr, settings, deferred)
        } else {
          ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred)
        }
      }
    }

    if (ajaxBeforeSend(xhr, settings) === false) {
      xhr.abort()
      ajaxError(null, 'abort', xhr, settings, deferred)
      return xhr
    }

    var async = 'async' in settings ? settings.async : true
    xhr.open(settings.type, settings.url, async, settings.username, settings.password)

    if (settings.xhrFields) for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name]

    for (name in headers) nativeSetHeader.apply(xhr, headers[name])

    if (settings.timeout > 0) abortTimeout = setTimeout(function(){
        xhr.onreadystatechange = empty
        xhr.abort()
        ajaxError(null, 'timeout', xhr, settings, deferred)
      }, settings.timeout)

    // avoid sending empty string (#319)
    xhr.send(settings.data ? settings.data : null)
    return xhr
  }

  // handle optional data/success arguments
  function parseArguments(url, data, success, dataType) {
    if ($.isFunction(data)) dataType = success, success = data, data = undefined
    if (!$.isFunction(success)) dataType = success, success = undefined
    return {
      url: url
    , data: data
    , success: success
    , dataType: dataType
    }
  }

  $.get = function(/* url, data, success, dataType */){
    return $.ajax(parseArguments.apply(null, arguments))
  }

  $.post = function(/* url, data, success, dataType */){
    var options = parseArguments.apply(null, arguments)
    options.type = 'POST'
    return $.ajax(options)
  }

  $.getJSON = function(/* url, data, success */){
    var options = parseArguments.apply(null, arguments)
    options.dataType = 'json'
    return $.ajax(options)
  }

  $.fn.load = function(url, data, success){
    if (!this.length) return this
    var self = this, parts = url.split(/\s/), selector,
        options = parseArguments(url, data, success),
        callback = options.success
    if (parts.length > 1) options.url = parts[0], selector = parts[1]
    options.success = function(response){
      self.html(selector ?
        $('<div>').html(response.replace(rscript, "")).find(selector)
        : response)
      callback && callback.apply(self, arguments)
    }
    $.ajax(options)
    return this
  }

  var escape = encodeURIComponent

  function serialize(params, obj, traditional, scope){
    var type, array = $.isArray(obj), hash = $.isPlainObject(obj)
    $.each(obj, function(key, value) {
      type = $.type(value)
      if (scope) key = traditional ? scope :
        scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']'
      // handle data in serializeArray() format
      if (!scope && array) params.add(value.name, value.value)
      // recurse into nested objects
      else if (type == "array" || (!traditional && type == "object"))
        serialize(params, value, traditional, key)
      else params.add(key, value)
    })
  }

  $.param = function(obj, traditional){
    var params = []
    params.add = function(key, value) {
      if ($.isFunction(value)) value = value()
      if (value == null) value = ""
      this.push(escape(key) + '=' + escape(value))
    }
    serialize(params, obj, traditional)
    return params.join('&').replace(/%20/g, '+')
  }
})(Zepto)

;(function($){
  $.fn.serializeArray = function() {
    var name, type, result = [],
      add = function(value) {
        if (value.forEach) return value.forEach(add)
        result.push({ name: name, value: value })
      }
    if (this[0]) $.each(this[0].elements, function(_, field){
      type = field.type, name = field.name
      if (name && field.nodeName.toLowerCase() != 'fieldset' &&
        !field.disabled && type != 'submit' && type != 'reset' && type != 'button' && type != 'file' &&
        ((type != 'radio' && type != 'checkbox') || field.checked))
          add($(field).val())
    })
    return result
  }

  $.fn.serialize = function(){
    var result = []
    this.serializeArray().forEach(function(elm){
      result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value))
    })
    return result.join('&')
  }

  $.fn.submit = function(callback) {
    if (0 in arguments) this.bind('submit', callback)
    else if (this.length) {
      var event = $.Event('submit')
      this.eq(0).trigger(event)
      if (!event.isDefaultPrevented()) this.get(0).submit()
    }
    return this
  }

})(Zepto)

;(function(){
  // getComputedStyle shouldn't freak out when called
  // without a valid element as argument
  try {
    getComputedStyle(undefined)
  } catch(e) {
    var nativeGetComputedStyle = getComputedStyle
    window.getComputedStyle = function(element, pseudoElement){
      try {
        return nativeGetComputedStyle(element, pseudoElement)
      } catch(e) {
        return null
      }
    }
  }
})()
  return Zepto
}))

/* 	
   作者：724485868@qq.com
   时间：2017-10-08
   描述：表单验证    
 version:1.0.0
*/

var vd = (function($) {

	var Obj = function(formName) {

			this.formName = typeof formName==="undefined"?".form":formName,

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
					if($.trim(this.arrs[i].elName) ===$.trim( compareName)) {
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
					var $this=this;
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
							if($.trim(this.arrs[i].elName) ===$.trim( _obj2.elName)) {
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
							if($.trim(this.arrs[i].elName) ===$.trim( _obj2.elName)) {
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
						
						$(p).find(".vd-pattern").addClass("vd-error").text( _pattern_msg);
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
						_obj2.remote_bl=_obj2.bl;

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
								data=data||false;
								
								if(typeof data!=="number"){
									var _num=Number(data);
									data=isNaN(_num)?false:_num;
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

					}else{
						
						if(_obj2.remote_bl){
							$remote.remoteFunOk(_obj2, el);
							$remote.addVdBtnStyle(el);
						}else{
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
						var p = $(el).parents(".vd-box");
						$(p).removeClass("vd-error  ");
						$(el).removeClass("vd-error");
						$(p).addClass("vd-ok");
						$(".vd-dep-btn", p).removeClass("vd-error").addClass("vd-ok"); //依赖按钮
					

					} else {
						_obj2.bl = false;
						_obj2.val = _ck_false !== null ? _ck_false : 0;
						_obj2.errorMsg = _ck_msg;
						var p = $(el).parents(".vd-box");
						$(p).addClass("vd-error vd-ck ");
						$(p).removeClass("vd-ok");
						$(el).addClass("vd-error");
						$(".vd-dep-btn", p).addClass("vd-error").removeClass("vd-ok"); //依赖按钮
							

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
					this.addVdBtnStyle(el);  // 添加vd-btn提交按钮样式
				}
			},

			this.remoteFunOk = function(_obj2, el) {
				_obj2.errorMsg = "";
				_obj2.bl = true;
				_obj2.val = $(el).val();
				_obj2.remote_bl=_obj2.bl;

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
				_obj2.remote_bl=_obj2.bl;

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
			
			this.addVdBtnStyle=function(el){
				
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

;
(function ($) {

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
			GetQueryString: function GetQueryString(name) {
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
			deleteItem: function deleteItem(item) {
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
			deleteItem: function deleteItem(item) {
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
/*
 * 默认js
 * 添加 class="bs-date " 
	<input type="text" class="form-control bs-date " value="" placeholder="订单开始时间" />
 * 
 */

var bsDate = function ($) {

	var _init = function _init() {
		// bs 日历插件
		$('.bs-date').datetimepicker({

			format: "yyyy-mm-dd  ", //'yyyy-mm-dd hh:ii'
			showMeridian: true,
			autoclose: true,
			todayBtn: true,
			minView: 3 //选择日期
			//forceParse :true  //转换格式

		});

		//日期不准输入
		$('.bs-date').focus(function () {

			$(this).blur();
		});
	};

	return {
		init: _init
	};
}(window.jQuery);
var cityData3 = [{
	value: '110000',
	text: '北京市',
	children: [{
		value: "110100",
		text: "北京市",
		children: [{
			value: "110101",
			text: "东城区"
		}, {
			value: "110102",
			text: "西城区"
		}, {
			value: "110103",
			text: "崇文区"
		}, {
			value: "110104",
			text: "宣武区"
		}, {
			value: "110105",
			text: "朝阳区"
		}, {
			value: "110106",
			text: "丰台区"
		}, {
			value: "110107",
			text: "石景山区"
		}, {
			value: "110108",
			text: "海淀区"
		}, {
			value: "110109",
			text: "门头沟区"
		}, {
			value: "110111",
			text: "房山区"
		}, {
			value: "110112",
			text: "通州区"
		}, {
			value: "110113",
			text: "顺义区"
		}, {
			value: "110114",
			text: "昌平区"
		}, {
			value: "110115",
			text: "大兴区"
		}, {
			value: "110116",
			text: "怀柔区"
		}, {
			value: "110117",
			text: "平谷区"
		}, {
			value: "110228",
			text: "密云县"
		}, {
			value: "110229",
			text: "延庆县"
		}, {
			value: "110230",
			text: "其它区"
		}]
	}]
}, {
	value: '120000',
	text: '天津市',
	children: [{
		value: "120100",
		text: "天津市",
		children: [{
			value: "120101",
			text: "和平区"
		}, {
			value: "120102",
			text: "河东区"
		}, {
			value: "120103",
			text: "河西区"
		}, {
			value: "120104",
			text: "南开区"
		}, {
			value: "120105",
			text: "河北区"
		}, {
			value: "120106",
			text: "红桥区"
		}, {
			value: "120107",
			text: "塘沽区"
		}, {
			value: "120108",
			text: "汉沽区"
		}, {
			value: "120109",
			text: "大港区"
		}, {
			value: "120110",
			text: "东丽区"
		}, {
			value: "120111",
			text: "西青区"
		}, {
			value: "120112",
			text: "津南区"
		}, {
			value: "120113",
			text: "北辰区"
		}, {
			value: "120114",
			text: "武清区"
		}, {
			value: "120115",
			text: "宝坻区"
		}, {
			value: "120116",
			text: "滨海新区"
		}, {
			value: "120221",
			text: "宁河县"
		}, {
			value: "120223",
			text: "静海县"
		}, {
			value: "120225",
			text: "蓟县"
		}, {
			value: "120226",
			text: "其它区"
		}]
	}]
}, {
	value: '130000',
	text: '河北省',
	children: [{
		value: "130100",
		text: "石家庄市",
		children: [{
			value: "130102",
			text: "长安区"
		}, {
			value: "130103",
			text: "桥东区"
		}, {
			value: "130104",
			text: "桥西区"
		}, {
			value: "130105",
			text: "新华区"
		}, {
			value: "130107",
			text: "井陉矿区"
		}, {
			value: "130108",
			text: "裕华区"
		}, {
			value: "130121",
			text: "井陉县"
		}, {
			value: "130123",
			text: "正定县"
		}, {
			value: "130124",
			text: "栾城县"
		}, {
			value: "130125",
			text: "行唐县"
		}, {
			value: "130126",
			text: "灵寿县"
		}, {
			value: "130127",
			text: "高邑县"
		}, {
			value: "130128",
			text: "深泽县"
		}, {
			value: "130129",
			text: "赞皇县"
		}, {
			value: "130130",
			text: "无极县"
		}, {
			value: "130131",
			text: "平山县"
		}, {
			value: "130132",
			text: "元氏县"
		}, {
			value: "130133",
			text: "赵县"
		}, {
			value: "130181",
			text: "辛集市"
		}, {
			value: "130182",
			text: "藁城市"
		}, {
			value: "130183",
			text: "晋州市"
		}, {
			value: "130184",
			text: "新乐市"
		}, {
			value: "130185",
			text: "鹿泉市"
		}, {
			value: "130186",
			text: "其它区"
		}]
	}, {
		value: "130200",
		text: "唐山市",
		children: [{
			value: "130202",
			text: "路南区"
		}, {
			value: "130203",
			text: "路北区"
		}, {
			value: "130204",
			text: "古冶区"
		}, {
			value: "130205",
			text: "开平区"
		}, {
			value: "130207",
			text: "丰南区"
		}, {
			value: "130208",
			text: "丰润区"
		}, {
			value: "130223",
			text: "滦县"
		}, {
			value: "130224",
			text: "滦南县"
		}, {
			value: "130225",
			text: "乐亭县"
		}, {
			value: "130227",
			text: "迁西县"
		}, {
			value: "130229",
			text: "玉田县"
		}, {
			value: "130230",
			text: "唐海县"
		}, {
			value: "130281",
			text: "遵化市"
		}, {
			value: "130283",
			text: "迁安市"
		}, {
			value: "130284",
			text: "其它区"
		}]
	}, {
		value: "130300",
		text: "秦皇岛市",
		children: [{
			value: "130302",
			text: "海港区"
		}, {
			value: "130303",
			text: "山海关区"
		}, {
			value: "130304",
			text: "北戴河区"
		}, {
			value: "130321",
			text: "青龙满族自治县"
		}, {
			value: "130322",
			text: "昌黎县"
		}, {
			value: "130323",
			text: "抚宁县"
		}, {
			value: "130324",
			text: "卢龙县"
		}, {
			value: "130398",
			text: "其它区"
		}, {
			value: "130399",
			text: "经济技术开发区"
		}]
	}, {
		value: "130400",
		text: "邯郸市",
		children: [{
			value: "130402",
			text: "邯山区"
		}, {
			value: "130403",
			text: "丛台区"
		}, {
			value: "130404",
			text: "复兴区"
		}, {
			value: "130406",
			text: "峰峰矿区"
		}, {
			value: "130421",
			text: "邯郸县"
		}, {
			value: "130423",
			text: "临漳县"
		}, {
			value: "130424",
			text: "成安县"
		}, {
			value: "130425",
			text: "大名县"
		}, {
			value: "130426",
			text: "涉县"
		}, {
			value: "130427",
			text: "磁县"
		}, {
			value: "130428",
			text: "肥乡县"
		}, {
			value: "130429",
			text: "永年县"
		}, {
			value: "130430",
			text: "邱县"
		}, {
			value: "130431",
			text: "鸡泽县"
		}, {
			value: "130432",
			text: "广平县"
		}, {
			value: "130433",
			text: "馆陶县"
		}, {
			value: "130434",
			text: "魏县"
		}, {
			value: "130435",
			text: "曲周县"
		}, {
			value: "130481",
			text: "武安市"
		}, {
			value: "130482",
			text: "其它区"
		}]
	}, {
		value: "130500",
		text: "邢台市",
		children: [{
			value: "130502",
			text: "桥东区"
		}, {
			value: "130503",
			text: "桥西区"
		}, {
			value: "130521",
			text: "邢台县"
		}, {
			value: "130522",
			text: "临城县"
		}, {
			value: "130523",
			text: "内丘县"
		}, {
			value: "130524",
			text: "柏乡县"
		}, {
			value: "130525",
			text: "隆尧县"
		}, {
			value: "130526",
			text: "任县"
		}, {
			value: "130527",
			text: "南和县"
		}, {
			value: "130528",
			text: "宁晋县"
		}, {
			value: "130529",
			text: "巨鹿县"
		}, {
			value: "130530",
			text: "新河县"
		}, {
			value: "130531",
			text: "广宗县"
		}, {
			value: "130532",
			text: "平乡县"
		}, {
			value: "130533",
			text: "威县"
		}, {
			value: "130534",
			text: "清河县"
		}, {
			value: "130535",
			text: "临西县"
		}, {
			value: "130581",
			text: "南宫市"
		}, {
			value: "130582",
			text: "沙河市"
		}, {
			value: "130583",
			text: "其它区"
		}]
	}, {
		value: "130600",
		text: "保定市",
		children: [{
			value: "130602",
			text: "新市区"
		}, {
			value: "130603",
			text: "北市区"
		}, {
			value: "130604",
			text: "南市区"
		}, {
			value: "130621",
			text: "满城县"
		}, {
			value: "130622",
			text: "清苑县"
		}, {
			value: "130623",
			text: "涞水县"
		}, {
			value: "130624",
			text: "阜平县"
		}, {
			value: "130625",
			text: "徐水县"
		}, {
			value: "130626",
			text: "定兴县"
		}, {
			value: "130627",
			text: "唐县"
		}, {
			value: "130628",
			text: "高阳县"
		}, {
			value: "130629",
			text: "容城县"
		}, {
			value: "130630",
			text: "涞源县"
		}, {
			value: "130631",
			text: "望都县"
		}, {
			value: "130632",
			text: "安新县"
		}, {
			value: "130633",
			text: "易县"
		}, {
			value: "130634",
			text: "曲阳县"
		}, {
			value: "130635",
			text: "蠡县"
		}, {
			value: "130636",
			text: "顺平县"
		}, {
			value: "130637",
			text: "博野县"
		}, {
			value: "130638",
			text: "雄县"
		}, {
			value: "130681",
			text: "涿州市"
		}, {
			value: "130682",
			text: "定州市"
		}, {
			value: "130683",
			text: "安国市"
		}, {
			value: "130684",
			text: "高碑店市"
		}, {
			value: "130698",
			text: "高开区"
		}, {
			value: "130699",
			text: "其它区"
		}]
	}, {
		value: "130700",
		text: "张家口市",
		children: [{
			value: "130702",
			text: "桥东区"
		}, {
			value: "130703",
			text: "桥西区"
		}, {
			value: "130705",
			text: "宣化区"
		}, {
			value: "130706",
			text: "下花园区"
		}, {
			value: "130721",
			text: "宣化县"
		}, {
			value: "130722",
			text: "张北县"
		}, {
			value: "130723",
			text: "康保县"
		}, {
			value: "130724",
			text: "沽源县"
		}, {
			value: "130725",
			text: "尚义县"
		}, {
			value: "130726",
			text: "蔚县"
		}, {
			value: "130727",
			text: "阳原县"
		}, {
			value: "130728",
			text: "怀安县"
		}, {
			value: "130729",
			text: "万全县"
		}, {
			value: "130730",
			text: "怀来县"
		}, {
			value: "130731",
			text: "涿鹿县"
		}, {
			value: "130732",
			text: "赤城县"
		}, {
			value: "130733",
			text: "崇礼县"
		}, {
			value: "130734",
			text: "其它区"
		}]
	}, {
		value: "130800",
		text: "承德市",
		children: [{
			value: "130802",
			text: "双桥区"
		}, {
			value: "130803",
			text: "双滦区"
		}, {
			value: "130804",
			text: "鹰手营子矿区"
		}, {
			value: "130821",
			text: "承德县"
		}, {
			value: "130822",
			text: "兴隆县"
		}, {
			value: "130823",
			text: "平泉县"
		}, {
			value: "130824",
			text: "滦平县"
		}, {
			value: "130825",
			text: "隆化县"
		}, {
			value: "130826",
			text: "丰宁满族自治县"
		}, {
			value: "130827",
			text: "宽城满族自治县"
		}, {
			value: "130828",
			text: "围场满族蒙古族自治县"
		}, {
			value: "130829",
			text: "其它区"
		}]
	}, {
		value: "130900",
		text: "沧州市",
		children: [{
			value: "130902",
			text: "新华区"
		}, {
			value: "130903",
			text: "运河区"
		}, {
			value: "130921",
			text: "沧县"
		}, {
			value: "130922",
			text: "青县"
		}, {
			value: "130923",
			text: "东光县"
		}, {
			value: "130924",
			text: "海兴县"
		}, {
			value: "130925",
			text: "盐山县"
		}, {
			value: "130926",
			text: "肃宁县"
		}, {
			value: "130927",
			text: "南皮县"
		}, {
			value: "130928",
			text: "吴桥县"
		}, {
			value: "130929",
			text: "献县"
		}, {
			value: "130930",
			text: "孟村回族自治县"
		}, {
			value: "130981",
			text: "泊头市"
		}, {
			value: "130982",
			text: "任丘市"
		}, {
			value: "130983",
			text: "黄骅市"
		}, {
			value: "130984",
			text: "河间市"
		}, {
			value: "130985",
			text: "其它区"
		}]
	}, {
		value: "131000",
		text: "廊坊市",
		children: [{
			value: "131002",
			text: "安次区"
		}, {
			value: "131003",
			text: "广阳区"
		}, {
			value: "131022",
			text: "固安县"
		}, {
			value: "131023",
			text: "永清县"
		}, {
			value: "131024",
			text: "香河县"
		}, {
			value: "131025",
			text: "大城县"
		}, {
			value: "131026",
			text: "文安县"
		}, {
			value: "131028",
			text: "大厂回族自治县"
		}, {
			value: "131051",
			text: "开发区"
		}, {
			value: "131052",
			text: "燕郊经济技术开发区"
		}, {
			value: "131081",
			text: "霸州市"
		}, {
			value: "131082",
			text: "三河市"
		}, {
			value: "131083",
			text: "其它区"
		}]
	}, {
		value: "131100",
		text: "衡水市",
		children: [{
			value: "131102",
			text: "桃城区"
		}, {
			value: "131121",
			text: "枣强县"
		}, {
			value: "131122",
			text: "武邑县"
		}, {
			value: "131123",
			text: "武强县"
		}, {
			value: "131124",
			text: "饶阳县"
		}, {
			value: "131125",
			text: "安平县"
		}, {
			value: "131126",
			text: "故城县"
		}, {
			value: "131127",
			text: "景县"
		}, {
			value: "131128",
			text: "阜城县"
		}, {
			value: "131181",
			text: "冀州市"
		}, {
			value: "131182",
			text: "深州市"
		}, {
			value: "131183",
			text: "其它区"
		}]
	}]
}, {
	value: '140000',
	text: '山西省',
	children: [{
		value: "140100",
		text: "太原市",
		children: [{
			value: "140105",
			text: "小店区"
		}, {
			value: "140106",
			text: "迎泽区"
		}, {
			value: "140107",
			text: "杏花岭区"
		}, {
			value: "140108",
			text: "尖草坪区"
		}, {
			value: "140109",
			text: "万柏林区"
		}, {
			value: "140110",
			text: "晋源区"
		}, {
			value: "140121",
			text: "清徐县"
		}, {
			value: "140122",
			text: "阳曲县"
		}, {
			value: "140123",
			text: "娄烦县"
		}, {
			value: "140181",
			text: "古交市"
		}, {
			value: "140182",
			text: "其它区"
		}]
	}, {
		value: "140200",
		text: "大同市",
		children: [{
			value: "140202",
			text: "城区"
		}, {
			value: "140203",
			text: "矿区"
		}, {
			value: "140211",
			text: "南郊区"
		}, {
			value: "140212",
			text: "新荣区"
		}, {
			value: "140221",
			text: "阳高县"
		}, {
			value: "140222",
			text: "天镇县"
		}, {
			value: "140223",
			text: "广灵县"
		}, {
			value: "140224",
			text: "灵丘县"
		}, {
			value: "140225",
			text: "浑源县"
		}, {
			value: "140226",
			text: "左云县"
		}, {
			value: "140227",
			text: "大同县"
		}, {
			value: "140228",
			text: "其它区"
		}]
	}, {
		value: "140300",
		text: "阳泉市",
		children: [{
			value: "140302",
			text: "城区"
		}, {
			value: "140303",
			text: "矿区"
		}, {
			value: "140311",
			text: "郊区"
		}, {
			value: "140321",
			text: "平定县"
		}, {
			value: "140322",
			text: "盂县"
		}, {
			value: "140323",
			text: "其它区"
		}]
	}, {
		value: "140400",
		text: "长治市",
		children: [{
			value: "140421",
			text: "长治县"
		}, {
			value: "140423",
			text: "襄垣县"
		}, {
			value: "140424",
			text: "屯留县"
		}, {
			value: "140425",
			text: "平顺县"
		}, {
			value: "140426",
			text: "黎城县"
		}, {
			value: "140427",
			text: "壶关县"
		}, {
			value: "140428",
			text: "长子县"
		}, {
			value: "140429",
			text: "武乡县"
		}, {
			value: "140430",
			text: "沁县"
		}, {
			value: "140431",
			text: "沁源县"
		}, {
			value: "140481",
			text: "潞城市"
		}, {
			value: "140482",
			text: "城区"
		}, {
			value: "140483",
			text: "郊区"
		}, {
			value: "140484",
			text: "高新区"
		}, {
			value: "140485",
			text: "其它区"
		}]
	}, {
		value: "140500",
		text: "晋城市",
		children: [{
			value: "140502",
			text: "城区"
		}, {
			value: "140521",
			text: "沁水县"
		}, {
			value: "140522",
			text: "阳城县"
		}, {
			value: "140524",
			text: "陵川县"
		}, {
			value: "140525",
			text: "泽州县"
		}, {
			value: "140581",
			text: "高平市"
		}, {
			value: "140582",
			text: "其它区"
		}]
	}, {
		value: "140600",
		text: "朔州市",
		children: [{
			value: "140602",
			text: "朔城区"
		}, {
			value: "140603",
			text: "平鲁区"
		}, {
			value: "140621",
			text: "山阴县"
		}, {
			value: "140622",
			text: "应县"
		}, {
			value: "140623",
			text: "右玉县"
		}, {
			value: "140624",
			text: "怀仁县"
		}, {
			value: "140625",
			text: "其它区"
		}]
	}, {
		value: "140700",
		text: "晋中市",
		children: [{
			value: "140702",
			text: "榆次区"
		}, {
			value: "140721",
			text: "榆社县"
		}, {
			value: "140722",
			text: "左权县"
		}, {
			value: "140723",
			text: "和顺县"
		}, {
			value: "140724",
			text: "昔阳县"
		}, {
			value: "140725",
			text: "寿阳县"
		}, {
			value: "140726",
			text: "太谷县"
		}, {
			value: "140727",
			text: "祁县"
		}, {
			value: "140728",
			text: "平遥县"
		}, {
			value: "140729",
			text: "灵石县"
		}, {
			value: "140781",
			text: "介休市"
		}, {
			value: "140782",
			text: "其它区"
		}]
	}, {
		value: "140800",
		text: "运城市",
		children: [{
			value: "140802",
			text: "盐湖区"
		}, {
			value: "140821",
			text: "临猗县"
		}, {
			value: "140822",
			text: "万荣县"
		}, {
			value: "140823",
			text: "闻喜县"
		}, {
			value: "140824",
			text: "稷山县"
		}, {
			value: "140825",
			text: "新绛县"
		}, {
			value: "140826",
			text: "绛县"
		}, {
			value: "140827",
			text: "垣曲县"
		}, {
			value: "140828",
			text: "夏县"
		}, {
			value: "140829",
			text: "平陆县"
		}, {
			value: "140830",
			text: "芮城县"
		}, {
			value: "140881",
			text: "永济市"
		}, {
			value: "140882",
			text: "河津市"
		}, {
			value: "140883",
			text: "其它区"
		}]
	}, {
		value: "140900",
		text: "忻州市",
		children: [{
			value: "140902",
			text: "忻府区"
		}, {
			value: "140921",
			text: "定襄县"
		}, {
			value: "140922",
			text: "五台县"
		}, {
			value: "140923",
			text: "代县"
		}, {
			value: "140924",
			text: "繁峙县"
		}, {
			value: "140925",
			text: "宁武县"
		}, {
			value: "140926",
			text: "静乐县"
		}, {
			value: "140927",
			text: "神池县"
		}, {
			value: "140928",
			text: "五寨县"
		}, {
			value: "140929",
			text: "岢岚县"
		}, {
			value: "140930",
			text: "河曲县"
		}, {
			value: "140931",
			text: "保德县"
		}, {
			value: "140932",
			text: "偏关县"
		}, {
			value: "140981",
			text: "原平市"
		}, {
			value: "140982",
			text: "其它区"
		}]
	}, {
		value: "141000",
		text: "临汾市",
		children: [{
			value: "141002",
			text: "尧都区"
		}, {
			value: "141021",
			text: "曲沃县"
		}, {
			value: "141022",
			text: "翼城县"
		}, {
			value: "141023",
			text: "襄汾县"
		}, {
			value: "141024",
			text: "洪洞县"
		}, {
			value: "141025",
			text: "古县"
		}, {
			value: "141026",
			text: "安泽县"
		}, {
			value: "141027",
			text: "浮山县"
		}, {
			value: "141028",
			text: "吉县"
		}, {
			value: "141029",
			text: "乡宁县"
		}, {
			value: "141030",
			text: "大宁县"
		}, {
			value: "141031",
			text: "隰县"
		}, {
			value: "141032",
			text: "永和县"
		}, {
			value: "141033",
			text: "蒲县"
		}, {
			value: "141034",
			text: "汾西县"
		}, {
			value: "141081",
			text: "侯马市"
		}, {
			value: "141082",
			text: "霍州市"
		}, {
			value: "141083",
			text: "其它区"
		}]
	}, {
		value: "141100",
		text: "吕梁市",
		children: [{
			value: "141102",
			text: "离石区"
		}, {
			value: "141121",
			text: "文水县"
		}, {
			value: "141122",
			text: "交城县"
		}, {
			value: "141123",
			text: "兴县"
		}, {
			value: "141124",
			text: "临县"
		}, {
			value: "141125",
			text: "柳林县"
		}, {
			value: "141126",
			text: "石楼县"
		}, {
			value: "141127",
			text: "岚县"
		}, {
			value: "141128",
			text: "方山县"
		}, {
			value: "141129",
			text: "中阳县"
		}, {
			value: "141130",
			text: "交口县"
		}, {
			value: "141181",
			text: "孝义市"
		}, {
			value: "141182",
			text: "汾阳市"
		}, {
			value: "141183",
			text: "其它区"
		}]
	}]
}, {
	value: '150000',
	text: '内蒙古',
	children: [{
		value: "150100",
		text: "呼和浩特市",
		children: [{
			value: "150102",
			text: "新城区"
		}, {
			value: "150103",
			text: "回民区"
		}, {
			value: "150104",
			text: "玉泉区"
		}, {
			value: "150105",
			text: "赛罕区"
		}, {
			value: "150121",
			text: "土默特左旗"
		}, {
			value: "150122",
			text: "托克托县"
		}, {
			value: "150123",
			text: "和林格尔县"
		}, {
			value: "150124",
			text: "清水河县"
		}, {
			value: "150125",
			text: "武川县"
		}, {
			value: "150126",
			text: "其它区"
		}]
	}, {
		value: "150200",
		text: "包头市",
		children: [{
			value: "150202",
			text: "东河区"
		}, {
			value: "150203",
			text: "昆都仑区"
		}, {
			value: "150204",
			text: "青山区"
		}, {
			value: "150205",
			text: "石拐区"
		}, {
			value: "150206",
			text: "白云矿区"
		}, {
			value: "150207",
			text: "九原区"
		}, {
			value: "150221",
			text: "土默特右旗"
		}, {
			value: "150222",
			text: "固阳县"
		}, {
			value: "150223",
			text: "达尔罕茂明安联合旗"
		}, {
			value: "150224",
			text: "其它区"
		}]
	}, {
		value: "150300",
		text: "乌海市",
		children: [{
			value: "150302",
			text: "海勃湾区"
		}, {
			value: "150303",
			text: "海南区"
		}, {
			value: "150304",
			text: "乌达区"
		}, {
			value: "150305",
			text: "其它区"
		}]
	}, {
		value: "150400",
		text: "赤峰市",
		children: [{
			value: "150402",
			text: "红山区"
		}, {
			value: "150403",
			text: "元宝山区"
		}, {
			value: "150404",
			text: "松山区"
		}, {
			value: "150421",
			text: "阿鲁科尔沁旗"
		}, {
			value: "150422",
			text: "巴林左旗"
		}, {
			value: "150423",
			text: "巴林右旗"
		}, {
			value: "150424",
			text: "林西县"
		}, {
			value: "150425",
			text: "克什克腾旗"
		}, {
			value: "150426",
			text: "翁牛特旗"
		}, {
			value: "150428",
			text: "喀喇沁旗"
		}, {
			value: "150429",
			text: "宁城县"
		}, {
			value: "150430",
			text: "敖汉旗"
		}, {
			value: "150431",
			text: "其它区"
		}]
	}, {
		value: "150500",
		text: "通辽市",
		children: [{
			value: "150502",
			text: "科尔沁区"
		}, {
			value: "150521",
			text: "科尔沁左翼中旗"
		}, {
			value: "150522",
			text: "科尔沁左翼后旗"
		}, {
			value: "150523",
			text: "开鲁县"
		}, {
			value: "150524",
			text: "库伦旗"
		}, {
			value: "150525",
			text: "奈曼旗"
		}, {
			value: "150526",
			text: "扎鲁特旗"
		}, {
			value: "150581",
			text: "霍林郭勒市"
		}, {
			value: "150582",
			text: "其它区"
		}]
	}, {
		value: "150600",
		text: "鄂尔多斯市",
		children: [{
			value: "150602",
			text: "东胜区"
		}, {
			value: "150621",
			text: "达拉特旗"
		}, {
			value: "150622",
			text: "准格尔旗"
		}, {
			value: "150623",
			text: "鄂托克前旗"
		}, {
			value: "150624",
			text: "鄂托克旗"
		}, {
			value: "150625",
			text: "杭锦旗"
		}, {
			value: "150626",
			text: "乌审旗"
		}, {
			value: "150627",
			text: "伊金霍洛旗"
		}, {
			value: "150628",
			text: "其它区"
		}]
	}, {
		value: "150700",
		text: "呼伦贝尔市",
		children: [{
			value: "150702",
			text: "海拉尔区"
		}, {
			value: "150721",
			text: "阿荣旗"
		}, {
			value: "150722",
			text: "莫力达瓦达斡尔族自治旗"
		}, {
			value: "150723",
			text: "鄂伦春自治旗"
		}, {
			value: "150724",
			text: "鄂温克族自治旗"
		}, {
			value: "150725",
			text: "陈巴尔虎旗"
		}, {
			value: "150726",
			text: "新巴尔虎左旗"
		}, {
			value: "150727",
			text: "新巴尔虎右旗"
		}, {
			value: "150781",
			text: "满洲里市"
		}, {
			value: "150782",
			text: "牙克石市"
		}, {
			value: "150783",
			text: "扎兰屯市"
		}, {
			value: "150784",
			text: "额尔古纳市"
		}, {
			value: "150785",
			text: "根河市"
		}, {
			value: "150786",
			text: "其它区"
		}]
	}, {
		value: "150800",
		text: "巴彦淖尔市",
		children: [{
			value: "150802",
			text: "临河区"
		}, {
			value: "150821",
			text: "五原县"
		}, {
			value: "150822",
			text: "磴口县"
		}, {
			value: "150823",
			text: "乌拉特前旗"
		}, {
			value: "150824",
			text: "乌拉特中旗"
		}, {
			value: "150825",
			text: "乌拉特后旗"
		}, {
			value: "150826",
			text: "杭锦后旗"
		}, {
			value: "150827",
			text: "其它区"
		}]
	}, {
		value: "150900",
		text: "乌兰察布市",
		children: [{
			value: "150902",
			text: "集宁区"
		}, {
			value: "150921",
			text: "卓资县"
		}, {
			value: "150922",
			text: "化德县"
		}, {
			value: "150923",
			text: "商都县"
		}, {
			value: "150924",
			text: "兴和县"
		}, {
			value: "150925",
			text: "凉城县"
		}, {
			value: "150926",
			text: "察哈尔右翼前旗"
		}, {
			value: "150927",
			text: "察哈尔右翼中旗"
		}, {
			value: "150928",
			text: "察哈尔右翼后旗"
		}, {
			value: "150929",
			text: "四子王旗"
		}, {
			value: "150981",
			text: "丰镇市"
		}, {
			value: "150982",
			text: "其它区"
		}]
	}, {
		value: "152200",
		text: "兴安盟",
		children: [{
			value: "152201",
			text: "乌兰浩特市"
		}, {
			value: "152202",
			text: "阿尔山市"
		}, {
			value: "152221",
			text: "科尔沁右翼前旗"
		}, {
			value: "152222",
			text: "科尔沁右翼中旗"
		}, {
			value: "152223",
			text: "扎赉特旗"
		}, {
			value: "152224",
			text: "突泉县"
		}, {
			value: "152225",
			text: "其它区"
		}]
	}, {
		value: "152500",
		text: "锡林郭勒盟",
		children: [{
			value: "152501",
			text: "二连浩特市"
		}, {
			value: "152502",
			text: "锡林浩特市"
		}, {
			value: "152522",
			text: "阿巴嘎旗"
		}, {
			value: "152523",
			text: "苏尼特左旗"
		}, {
			value: "152524",
			text: "苏尼特右旗"
		}, {
			value: "152525",
			text: "东乌珠穆沁旗"
		}, {
			value: "152526",
			text: "西乌珠穆沁旗"
		}, {
			value: "152527",
			text: "太仆寺旗"
		}, {
			value: "152528",
			text: "镶黄旗"
		}, {
			value: "152529",
			text: "正镶白旗"
		}, {
			value: "152530",
			text: "正蓝旗"
		}, {
			value: "152531",
			text: "多伦县"
		}, {
			value: "152532",
			text: "其它区"
		}]
	}, {
		value: "152900",
		text: "阿拉善盟",
		children: [{
			value: "152921",
			text: "阿拉善左旗"
		}, {
			value: "152922",
			text: "阿拉善右旗"
		}, {
			value: "152923",
			text: "额济纳旗"
		}, {
			value: "152924",
			text: "其它区"
		}]
	}]
}, {
	value: '210000',
	text: '辽宁省',
	children: [{
		value: "210100",
		text: "沈阳市",
		children: [{
			value: "210102",
			text: "和平区"
		}, {
			value: "210103",
			text: "沈河区"
		}, {
			value: "210104",
			text: "大东区"
		}, {
			value: "210105",
			text: "皇姑区"
		}, {
			value: "210106",
			text: "铁西区"
		}, {
			value: "210111",
			text: "苏家屯区"
		}, {
			value: "210112",
			text: "东陵区"
		}, {
			value: "210113",
			text: "新城子区"
		}, {
			value: "210114",
			text: "于洪区"
		}, {
			value: "210122",
			text: "辽中县"
		}, {
			value: "210123",
			text: "康平县"
		}, {
			value: "210124",
			text: "法库县"
		}, {
			value: "210181",
			text: "新民市"
		}, {
			value: "210182",
			text: "浑南新区"
		}, {
			value: "210183",
			text: "张士开发区"
		}, {
			value: "210184",
			text: "沈北新区"
		}, {
			value: "210185",
			text: "其它区"
		}]
	}, {
		value: "210200",
		text: "大连市",
		children: [{
			value: "210202",
			text: "中山区"
		}, {
			value: "210203",
			text: "西岗区"
		}, {
			value: "210204",
			text: "沙河口区"
		}, {
			value: "210211",
			text: "甘井子区"
		}, {
			value: "210212",
			text: "旅顺口区"
		}, {
			value: "210213",
			text: "金州区"
		}, {
			value: "210224",
			text: "长海县"
		}, {
			value: "210251",
			text: "开发区"
		}, {
			value: "210281",
			text: "瓦房店市"
		}, {
			value: "210282",
			text: "普兰店市"
		}, {
			value: "210283",
			text: "庄河市"
		}, {
			value: "210297",
			text: "岭前区"
		}, {
			value: "210298",
			text: "其它区"
		}]
	}, {
		value: "210300",
		text: "鞍山市",
		children: [{
			value: "210302",
			text: "铁东区"
		}, {
			value: "210303",
			text: "铁西区"
		}, {
			value: "210304",
			text: "立山区"
		}, {
			value: "210311",
			text: "千山区"
		}, {
			value: "210321",
			text: "台安县"
		}, {
			value: "210323",
			text: "岫岩满族自治县"
		}, {
			value: "210351",
			text: "高新区"
		}, {
			value: "210381",
			text: "海城市"
		}, {
			value: "210382",
			text: "其它区"
		}]
	}, {
		value: "210400",
		text: "抚顺市",
		children: [{
			value: "210402",
			text: "新抚区"
		}, {
			value: "210403",
			text: "东洲区"
		}, {
			value: "210404",
			text: "望花区"
		}, {
			value: "210411",
			text: "顺城区"
		}, {
			value: "210421",
			text: "抚顺县"
		}, {
			value: "210422",
			text: "新宾满族自治县"
		}, {
			value: "210423",
			text: "清原满族自治县"
		}, {
			value: "210424",
			text: "其它区"
		}]
	}, {
		value: "210500",
		text: "本溪市",
		children: [{
			value: "210502",
			text: "平山区"
		}, {
			value: "210503",
			text: "溪湖区"
		}, {
			value: "210504",
			text: "明山区"
		}, {
			value: "210505",
			text: "南芬区"
		}, {
			value: "210521",
			text: "本溪满族自治县"
		}, {
			value: "210522",
			text: "桓仁满族自治县"
		}, {
			value: "210523",
			text: "其它区"
		}]
	}, {
		value: "210600",
		text: "丹东市",
		children: [{
			value: "210602",
			text: "元宝区"
		}, {
			value: "210603",
			text: "振兴区"
		}, {
			value: "210604",
			text: "振安区"
		}, {
			value: "210624",
			text: "宽甸满族自治县"
		}, {
			value: "210681",
			text: "东港市"
		}, {
			value: "210682",
			text: "凤城市"
		}, {
			value: "210683",
			text: "其它区"
		}]
	}, {
		value: "210700",
		text: "锦州市",
		children: [{
			value: "210702",
			text: "古塔区"
		}, {
			value: "210703",
			text: "凌河区"
		}, {
			value: "210711",
			text: "太和区"
		}, {
			value: "210726",
			text: "黑山县"
		}, {
			value: "210727",
			text: "义县"
		}, {
			value: "210781",
			text: "凌海市"
		}, {
			value: "210782",
			text: "北镇市"
		}, {
			value: "210783",
			text: "其它区"
		}]
	}, {
		value: "210800",
		text: "营口市",
		children: [{
			value: "210802",
			text: "站前区"
		}, {
			value: "210803",
			text: "西市区"
		}, {
			value: "210804",
			text: "鲅鱼圈区"
		}, {
			value: "210811",
			text: "老边区"
		}, {
			value: "210881",
			text: "盖州市"
		}, {
			value: "210882",
			text: "大石桥市"
		}, {
			value: "210883",
			text: "其它区"
		}]
	}, {
		value: "210900",
		text: "阜新市",
		children: [{
			value: "210902",
			text: "海州区"
		}, {
			value: "210903",
			text: "新邱区"
		}, {
			value: "210904",
			text: "太平区"
		}, {
			value: "210905",
			text: "清河门区"
		}, {
			value: "210911",
			text: "细河区"
		}, {
			value: "210921",
			text: "阜新蒙古族自治县"
		}, {
			value: "210922",
			text: "彰武县"
		}, {
			value: "210923",
			text: "其它区"
		}]
	}, {
		value: "211000",
		text: "辽阳市",
		children: [{
			value: "211002",
			text: "白塔区"
		}, {
			value: "211003",
			text: "文圣区"
		}, {
			value: "211004",
			text: "宏伟区"
		}, {
			value: "211005",
			text: "弓长岭区"
		}, {
			value: "211011",
			text: "太子河区"
		}, {
			value: "211021",
			text: "辽阳县"
		}, {
			value: "211081",
			text: "灯塔市"
		}, {
			value: "211082",
			text: "其它区"
		}]
	}, {
		value: "211100",
		text: "盘锦市",
		children: [{
			value: "211102",
			text: "双台子区"
		}, {
			value: "211103",
			text: "兴隆台区"
		}, {
			value: "211121",
			text: "大洼县"
		}, {
			value: "211122",
			text: "盘山县"
		}, {
			value: "211123",
			text: "其它区"
		}]
	}, {
		value: "211200",
		text: "铁岭市",
		children: [{
			value: "211202",
			text: "银州区"
		}, {
			value: "211204",
			text: "清河区"
		}, {
			value: "211221",
			text: "铁岭县"
		}, {
			value: "211223",
			text: "西丰县"
		}, {
			value: "211224",
			text: "昌图县"
		}, {
			value: "211281",
			text: "调兵山市"
		}, {
			value: "211282",
			text: "开原市"
		}, {
			value: "211283",
			text: "其它区"
		}]
	}, {
		value: "211300",
		text: "朝阳市",
		children: [{
			value: "211302",
			text: "双塔区"
		}, {
			value: "211303",
			text: "龙城区"
		}, {
			value: "211321",
			text: "朝阳县"
		}, {
			value: "211322",
			text: "建平县"
		}, {
			value: "211324",
			text: "喀喇沁左翼蒙古族自治县"
		}, {
			value: "211381",
			text: "北票市"
		}, {
			value: "211382",
			text: "凌源市"
		}, {
			value: "211383",
			text: "其它区"
		}]
	}, {
		value: "211400",
		text: "葫芦岛市",
		children: [{
			value: "211402",
			text: "连山区"
		}, {
			value: "211403",
			text: "龙港区"
		}, {
			value: "211404",
			text: "南票区"
		}, {
			value: "211421",
			text: "绥中县"
		}, {
			value: "211422",
			text: "建昌县"
		}, {
			value: "211481",
			text: "兴城市"
		}, {
			value: "211482",
			text: "其它区"
		}]
	}]
}, {
	value: '220000',
	text: '吉林省',
	children: [{
		value: "220100",
		text: "长春市",
		children: [{
			value: "220102",
			text: "南关区"
		}, {
			value: "220103",
			text: "宽城区"
		}, {
			value: "220104",
			text: "朝阳区"
		}, {
			value: "220105",
			text: "二道区"
		}, {
			value: "220106",
			text: "绿园区"
		}, {
			value: "220112",
			text: "双阳区"
		}, {
			value: "220122",
			text: "农安县"
		}, {
			value: "220181",
			text: "九台市"
		}, {
			value: "220182",
			text: "榆树市"
		}, {
			value: "220183",
			text: "德惠市"
		}, {
			value: "220184",
			text: "高新技术产业开发区"
		}, {
			value: "220185",
			text: "汽车产业开发区"
		}, {
			value: "220186",
			text: "经济技术开发区"
		}, {
			value: "220187",
			text: "净月旅游开发区"
		}, {
			value: "220188",
			text: "其它区"
		}]
	}, {
		value: "220200",
		text: "吉林市",
		children: [{
			value: "220202",
			text: "昌邑区"
		}, {
			value: "220203",
			text: "龙潭区"
		}, {
			value: "220204",
			text: "船营区"
		}, {
			value: "220211",
			text: "丰满区"
		}, {
			value: "220221",
			text: "永吉县"
		}, {
			value: "220281",
			text: "蛟河市"
		}, {
			value: "220282",
			text: "桦甸市"
		}, {
			value: "220283",
			text: "舒兰市"
		}, {
			value: "220284",
			text: "磐石市"
		}, {
			value: "220285",
			text: "其它区"
		}]
	}, {
		value: "220300",
		text: "四平市",
		children: [{
			value: "220302",
			text: "铁西区"
		}, {
			value: "220303",
			text: "铁东区"
		}, {
			value: "220322",
			text: "梨树县"
		}, {
			value: "220323",
			text: "伊通满族自治县"
		}, {
			value: "220381",
			text: "公主岭市"
		}, {
			value: "220382",
			text: "双辽市"
		}, {
			value: "220383",
			text: "其它区"
		}]
	}, {
		value: "220400",
		text: "辽源市",
		children: [{
			value: "220402",
			text: "龙山区"
		}, {
			value: "220403",
			text: "西安区"
		}, {
			value: "220421",
			text: "东丰县"
		}, {
			value: "220422",
			text: "东辽县"
		}, {
			value: "220423",
			text: "其它区"
		}]
	}, {
		value: "220500",
		text: "通化市",
		children: [{
			value: "220502",
			text: "东昌区"
		}, {
			value: "220503",
			text: "二道江区"
		}, {
			value: "220521",
			text: "通化县"
		}, {
			value: "220523",
			text: "辉南县"
		}, {
			value: "220524",
			text: "柳河县"
		}, {
			value: "220581",
			text: "梅河口市"
		}, {
			value: "220582",
			text: "集安市"
		}, {
			value: "220583",
			text: "其它区"
		}]
	}, {
		value: "220600",
		text: "白山市",
		children: [{
			value: "220602",
			text: "八道江区"
		}, {
			value: "220621",
			text: "抚松县"
		}, {
			value: "220622",
			text: "靖宇县"
		}, {
			value: "220623",
			text: "长白朝鲜族自治县"
		}, {
			value: "220625",
			text: "江源市"
		}, {
			value: "220681",
			text: "临江市"
		}, {
			value: "220682",
			text: "其它区"
		}]
	}, {
		value: "220700",
		text: "松原市",
		children: [{
			value: "220702",
			text: "宁江区"
		}, {
			value: "220721",
			text: "前郭尔罗斯蒙古族自治县"
		}, {
			value: "220722",
			text: "长岭县"
		}, {
			value: "220723",
			text: "乾安县"
		}, {
			value: "220724",
			text: "扶余县"
		}, {
			value: "220725",
			text: "其它区"
		}]
	}, {
		value: "220800",
		text: "白城市",
		children: [{
			value: "220802",
			text: "洮北区"
		}, {
			value: "220821",
			text: "镇赉县"
		}, {
			value: "220822",
			text: "通榆县"
		}, {
			value: "220881",
			text: "洮南市"
		}, {
			value: "220882",
			text: "大安市"
		}, {
			value: "220883",
			text: "其它区"
		}]
	}, {
		value: "222400",
		text: "延边朝鲜族自治州",
		children: [{
			value: "222401",
			text: "延吉市"
		}, {
			value: "222402",
			text: "图们市"
		}, {
			value: "222403",
			text: "敦化市"
		}, {
			value: "222404",
			text: "珲春市"
		}, {
			value: "222405",
			text: "龙井市"
		}, {
			value: "222406",
			text: "和龙市"
		}, {
			value: "222424",
			text: "汪清县"
		}, {
			value: "222426",
			text: "安图县"
		}, {
			value: "222427",
			text: "其它区"
		}]
	}]
}, {
	value: '230000',
	text: '黑龙江省',
	children: [{
		value: "230100",
		text: "哈尔滨市",
		children: [{
			value: "230102",
			text: "道里区"
		}, {
			value: "230103",
			text: "南岗区"
		}, {
			value: "230104",
			text: "道外区"
		}, {
			value: "230106",
			text: "香坊区"
		}, {
			value: "230107",
			text: "动力区"
		}, {
			value: "230108",
			text: "平房区"
		}, {
			value: "230109",
			text: "松北区"
		}, {
			value: "230111",
			text: "呼兰区"
		}, {
			value: "230123",
			text: "依兰县"
		}, {
			value: "230124",
			text: "方正县"
		}, {
			value: "230125",
			text: "宾县"
		}, {
			value: "230126",
			text: "巴彦县"
		}, {
			value: "230127",
			text: "木兰县"
		}, {
			value: "230128",
			text: "通河县"
		}, {
			value: "230129",
			text: "延寿县"
		}, {
			value: "230181",
			text: "阿城市"
		}, {
			value: "230182",
			text: "双城市"
		}, {
			value: "230183",
			text: "尚志市"
		}, {
			value: "230184",
			text: "五常市"
		}, {
			value: "230185",
			text: "阿城市"
		}, {
			value: "230186",
			text: "其它区"
		}]
	}, {
		value: "230200",
		text: "齐齐哈尔市",
		children: [{
			value: "230202",
			text: "龙沙区"
		}, {
			value: "230203",
			text: "建华区"
		}, {
			value: "230204",
			text: "铁锋区"
		}, {
			value: "230205",
			text: "昂昂溪区"
		}, {
			value: "230206",
			text: "富拉尔基区"
		}, {
			value: "230207",
			text: "碾子山区"
		}, {
			value: "230208",
			text: "梅里斯达斡尔族区"
		}, {
			value: "230221",
			text: "龙江县"
		}, {
			value: "230223",
			text: "依安县"
		}, {
			value: "230224",
			text: "泰来县"
		}, {
			value: "230225",
			text: "甘南县"
		}, {
			value: "230227",
			text: "富裕县"
		}, {
			value: "230229",
			text: "克山县"
		}, {
			value: "230230",
			text: "克东县"
		}, {
			value: "230231",
			text: "拜泉县"
		}, {
			value: "230281",
			text: "讷河市"
		}, {
			value: "230282",
			text: "其它区"
		}]
	}, {
		value: "230300",
		text: "鸡西市",
		children: [{
			value: "230302",
			text: "鸡冠区"
		}, {
			value: "230303",
			text: "恒山区"
		}, {
			value: "230304",
			text: "滴道区"
		}, {
			value: "230305",
			text: "梨树区"
		}, {
			value: "230306",
			text: "城子河区"
		}, {
			value: "230307",
			text: "麻山区"
		}, {
			value: "230321",
			text: "鸡东县"
		}, {
			value: "230381",
			text: "虎林市"
		}, {
			value: "230382",
			text: "密山市"
		}, {
			value: "230383",
			text: "其它区"
		}]
	}, {
		value: "230400",
		text: "鹤岗市",
		children: [{
			value: "230402",
			text: "向阳区"
		}, {
			value: "230403",
			text: "工农区"
		}, {
			value: "230404",
			text: "南山区"
		}, {
			value: "230405",
			text: "兴安区"
		}, {
			value: "230406",
			text: "东山区"
		}, {
			value: "230407",
			text: "兴山区"
		}, {
			value: "230421",
			text: "萝北县"
		}, {
			value: "230422",
			text: "绥滨县"
		}, {
			value: "230423",
			text: "其它区"
		}]
	}, {
		value: "230500",
		text: "双鸭山市",
		children: [{
			value: "230502",
			text: "尖山区"
		}, {
			value: "230503",
			text: "岭东区"
		}, {
			value: "230505",
			text: "四方台区"
		}, {
			value: "230506",
			text: "宝山区"
		}, {
			value: "230521",
			text: "集贤县"
		}, {
			value: "230522",
			text: "友谊县"
		}, {
			value: "230523",
			text: "宝清县"
		}, {
			value: "230524",
			text: "饶河县"
		}, {
			value: "230525",
			text: "其它区"
		}]
	}, {
		value: "230600",
		text: "大庆市",
		children: [{
			value: "230602",
			text: "萨尔图区"
		}, {
			value: "230603",
			text: "龙凤区"
		}, {
			value: "230604",
			text: "让胡路区"
		}, {
			value: "230605",
			text: "红岗区"
		}, {
			value: "230606",
			text: "大同区"
		}, {
			value: "230621",
			text: "肇州县"
		}, {
			value: "230622",
			text: "肇源县"
		}, {
			value: "230623",
			text: "林甸县"
		}, {
			value: "230624",
			text: "杜尔伯特蒙古族自治县"
		}, {
			value: "230625",
			text: "其它区"
		}]
	}, {
		value: "230700",
		text: "伊春市",
		children: [{
			value: "230702",
			text: "伊春区"
		}, {
			value: "230703",
			text: "南岔区"
		}, {
			value: "230704",
			text: "友好区"
		}, {
			value: "230705",
			text: "西林区"
		}, {
			value: "230706",
			text: "翠峦区"
		}, {
			value: "230707",
			text: "新青区"
		}, {
			value: "230708",
			text: "美溪区"
		}, {
			value: "230709",
			text: "金山屯区"
		}, {
			value: "230710",
			text: "五营区"
		}, {
			value: "230711",
			text: "乌马河区"
		}, {
			value: "230712",
			text: "汤旺河区"
		}, {
			value: "230713",
			text: "带岭区"
		}, {
			value: "230714",
			text: "乌伊岭区"
		}, {
			value: "230715",
			text: "红星区"
		}, {
			value: "230716",
			text: "上甘岭区"
		}, {
			value: "230722",
			text: "嘉荫县"
		}, {
			value: "230781",
			text: "铁力市"
		}, {
			value: "230782",
			text: "其它区"
		}]
	}, {
		value: "230800",
		text: "佳木斯市",
		children: [{
			value: "230802",
			text: "永红区"
		}, {
			value: "230803",
			text: "向阳区"
		}, {
			value: "230804",
			text: "前进区"
		}, {
			value: "230805",
			text: "东风区"
		}, {
			value: "230811",
			text: "郊区"
		}, {
			value: "230822",
			text: "桦南县"
		}, {
			value: "230826",
			text: "桦川县"
		}, {
			value: "230828",
			text: "汤原县"
		}, {
			value: "230833",
			text: "抚远县"
		}, {
			value: "230881",
			text: "同江市"
		}, {
			value: "230882",
			text: "富锦市"
		}, {
			value: "230883",
			text: "其它区"
		}]
	}, {
		value: "230900",
		text: "七台河市",
		children: [{
			value: "230902",
			text: "新兴区"
		}, {
			value: "230903",
			text: "桃山区"
		}, {
			value: "230904",
			text: "茄子河区"
		}, {
			value: "230921",
			text: "勃利县"
		}, {
			value: "230922",
			text: "其它区"
		}]
	}, {
		value: "231000",
		text: "牡丹江市",
		children: [{
			value: "231002",
			text: "东安区"
		}, {
			value: "231003",
			text: "阳明区"
		}, {
			value: "231004",
			text: "爱民区"
		}, {
			value: "231005",
			text: "西安区"
		}, {
			value: "231024",
			text: "东宁县"
		}, {
			value: "231025",
			text: "林口县"
		}, {
			value: "231081",
			text: "绥芬河市"
		}, {
			value: "231083",
			text: "海林市"
		}, {
			value: "231084",
			text: "宁安市"
		}, {
			value: "231085",
			text: "穆棱市"
		}, {
			value: "231086",
			text: "其它区"
		}]
	}, {
		value: "231100",
		text: "黑河市",
		children: [{
			value: "231102",
			text: "爱辉区"
		}, {
			value: "231121",
			text: "嫩江县"
		}, {
			value: "231123",
			text: "逊克县"
		}, {
			value: "231124",
			text: "孙吴县"
		}, {
			value: "231181",
			text: "北安市"
		}, {
			value: "231182",
			text: "五大连池市"
		}, {
			value: "231183",
			text: "其它区"
		}]
	}, {
		value: "231200",
		text: "绥化市",
		children: [{
			value: "231202",
			text: "北林区"
		}, {
			value: "231221",
			text: "望奎县"
		}, {
			value: "231222",
			text: "兰西县"
		}, {
			value: "231223",
			text: "青冈县"
		}, {
			value: "231224",
			text: "庆安县"
		}, {
			value: "231225",
			text: "明水县"
		}, {
			value: "231226",
			text: "绥棱县"
		}, {
			value: "231281",
			text: "安达市"
		}, {
			value: "231282",
			text: "肇东市"
		}, {
			value: "231283",
			text: "海伦市"
		}, {
			value: "231284",
			text: "其它区"
		}]
	}, {
		value: "232700",
		text: "大兴安岭地区",
		children: [{
			value: "232721",
			text: "呼玛县"
		}, {
			value: "232722",
			text: "塔河县"
		}, {
			value: "232723",
			text: "漠河县"
		}, {
			value: "232724",
			text: "加格达奇区"
		}, {
			value: "232725",
			text: "其它区"
		}]
	}]
}, {
	value: '310000',
	text: '上海市',
	children: [{
		value: '310100',
		text: '上海市',
		children: [{
			value: "310101",
			text: "黄浦区"
		}, {
			value: "310103",
			text: "卢湾区"
		}, {
			value: "310104",
			text: "徐汇区"
		}, {
			value: "310105",
			text: "长宁区"
		}, {
			value: "310106",
			text: "静安区"
		}, {
			value: "310107",
			text: "普陀区"
		}, {
			value: "310108",
			text: "闸北区"
		}, {
			value: "310109",
			text: "虹口区"
		}, {
			value: "310110",
			text: "杨浦区"
		}, {
			value: "310112",
			text: "闵行区"
		}, {
			value: "310113",
			text: "宝山区"
		}, {
			value: "310114",
			text: "嘉定区"
		}, {
			value: "310115",
			text: "浦东新区"
		}, {
			value: "310116",
			text: "金山区"
		}, {
			value: "310117",
			text: "松江区"
		}, {
			value: "310118",
			text: "青浦区"
		}, {
			value: "310119",
			text: "南汇区"
		}, {
			value: "310120",
			text: "奉贤区"
		}, {
			value: "310152",
			text: "川沙区"
		}, {
			value: "310230",
			text: "崇明县"
		}, {
			value: "310231",
			text: "其它区"
		}]
	}]
}, {
	value: '320000',
	text: '江苏省',
	children: [{
		value: "320100",
		text: "南京市",
		children: [{
			value: "320102",
			text: "玄武区"
		}, {
			value: "320103",
			text: "白下区"
		}, {
			value: "320104",
			text: "秦淮区"
		}, {
			value: "320105",
			text: "建邺区"
		}, {
			value: "320106",
			text: "鼓楼区"
		}, {
			value: "320107",
			text: "下关区"
		}, {
			value: "320111",
			text: "浦口区"
		}, {
			value: "320113",
			text: "栖霞区"
		}, {
			value: "320114",
			text: "雨花台区"
		}, {
			value: "320115",
			text: "江宁区"
		}, {
			value: "320116",
			text: "六合区"
		}, {
			value: "320124",
			text: "溧水县"
		}, {
			value: "320125",
			text: "高淳县"
		}, {
			value: "320126",
			text: "其它区"
		}]
	}, {
		value: "320200",
		text: "无锡市",
		children: [{
			value: "320202",
			text: "崇安区"
		}, {
			value: "320203",
			text: "南长区"
		}, {
			value: "320204",
			text: "北塘区"
		}, {
			value: "320205",
			text: "锡山区"
		}, {
			value: "320206",
			text: "惠山区"
		}, {
			value: "320211",
			text: "滨湖区"
		}, {
			value: "320281",
			text: "江阴市"
		}, {
			value: "320282",
			text: "宜兴市"
		}, {
			value: "320296",
			text: "新区"
		}, {
			value: "320297",
			text: "其它区"
		}]
	}, {
		value: "320300",
		text: "徐州市",
		children: [{
			value: "320302",
			text: "鼓楼区"
		}, {
			value: "320303",
			text: "云龙区"
		}, {
			value: "320304",
			text: "九里区"
		}, {
			value: "320305",
			text: "贾汪区"
		}, {
			value: "320311",
			text: "泉山区"
		}, {
			value: "320321",
			text: "丰县"
		}, {
			value: "320322",
			text: "沛县"
		}, {
			value: "320323",
			text: "铜山县"
		}, {
			value: "320324",
			text: "睢宁县"
		}, {
			value: "320381",
			text: "新沂市"
		}, {
			value: "320382",
			text: "邳州市"
		}, {
			value: "320383",
			text: "其它区"
		}]
	}, {
		value: "320400",
		text: "常州市",
		children: [{
			value: "320402",
			text: "天宁区"
		}, {
			value: "320404",
			text: "钟楼区"
		}, {
			value: "320405",
			text: "戚墅堰区"
		}, {
			value: "320411",
			text: "新北区"
		}, {
			value: "320412",
			text: "武进区"
		}, {
			value: "320481",
			text: "溧阳市"
		}, {
			value: "320482",
			text: "金坛市"
		}, {
			value: "320483",
			text: "其它区"
		}]
	}, {
		value: "320500",
		text: "苏州市",
		children: [{
			value: "320502",
			text: "沧浪区"
		}, {
			value: "320503",
			text: "平江区"
		}, {
			value: "320504",
			text: "金阊区"
		}, {
			value: "320505",
			text: "虎丘区"
		}, {
			value: "320506",
			text: "吴中区"
		}, {
			value: "320507",
			text: "相城区"
		}, {
			value: "320581",
			text: "常熟市"
		}, {
			value: "320582",
			text: "张家港市"
		}, {
			value: "320583",
			text: "昆山市"
		}, {
			value: "320584",
			text: "吴江市"
		}, {
			value: "320585",
			text: "太仓市"
		}, {
			value: "320594",
			text: "新区"
		}, {
			value: "320595",
			text: "园区"
		}, {
			value: "320596",
			text: "其它区"
		}]
	}, {
		value: "320600",
		text: "南通市",
		children: [{
			value: "320602",
			text: "崇川区"
		}, {
			value: "320611",
			text: "港闸区"
		}, {
			value: "320612",
			text: "通州区"
		}, {
			value: "320621",
			text: "海安县"
		}, {
			value: "320623",
			text: "如东县"
		}, {
			value: "320681",
			text: "启东市"
		}, {
			value: "320682",
			text: "如皋市"
		}, {
			value: "320683",
			text: "通州市"
		}, {
			value: "320684",
			text: "海门市"
		}, {
			value: "320693",
			text: "开发区"
		}, {
			value: "320694",
			text: "其它区"
		}]
	}, {
		value: "320700",
		text: "连云港市",
		children: [{
			value: "320703",
			text: "连云区"
		}, {
			value: "320705",
			text: "新浦区"
		}, {
			value: "320706",
			text: "海州区"
		}, {
			value: "320721",
			text: "赣榆县"
		}, {
			value: "320722",
			text: "东海县"
		}, {
			value: "320723",
			text: "灌云县"
		}, {
			value: "320724",
			text: "灌南县"
		}, {
			value: "320725",
			text: "其它区"
		}]
	}, {
		value: "320800",
		text: "淮安市",
		children: [{
			value: "320802",
			text: "清河区"
		}, {
			value: "320803",
			text: "楚州区"
		}, {
			value: "320804",
			text: "淮阴区"
		}, {
			value: "320811",
			text: "清浦区"
		}, {
			value: "320826",
			text: "涟水县"
		}, {
			value: "320829",
			text: "洪泽县"
		}, {
			value: "320830",
			text: "盱眙县"
		}, {
			value: "320831",
			text: "金湖县"
		}, {
			value: "320832",
			text: "其它区"
		}]
	}, {
		value: "320900",
		text: "盐城市",
		children: [{
			value: "320902",
			text: "亭湖区"
		}, {
			value: "320903",
			text: "盐都区"
		}, {
			value: "320921",
			text: "响水县"
		}, {
			value: "320922",
			text: "滨海县"
		}, {
			value: "320923",
			text: "阜宁县"
		}, {
			value: "320924",
			text: "射阳县"
		}, {
			value: "320925",
			text: "建湖县"
		}, {
			value: "320981",
			text: "东台市"
		}, {
			value: "320982",
			text: "大丰市"
		}, {
			value: "320983",
			text: "其它区"
		}]
	}, {
		value: "321000",
		text: "扬州市",
		children: [{
			value: "321002",
			text: "广陵区"
		}, {
			value: "321003",
			text: "邗江区"
		}, {
			value: "321011",
			text: "维扬区"
		}, {
			value: "321023",
			text: "宝应县"
		}, {
			value: "321081",
			text: "仪征市"
		}, {
			value: "321084",
			text: "高邮市"
		}, {
			value: "321088",
			text: "江都市"
		}, {
			value: "321092",
			text: "经济开发区"
		}, {
			value: "321093",
			text: "其它区"
		}]
	}, {
		value: "321100",
		text: "镇江市",
		children: [{
			value: "321102",
			text: "京口区"
		}, {
			value: "321111",
			text: "润州区"
		}, {
			value: "321112",
			text: "丹徒区"
		}, {
			value: "321181",
			text: "丹阳市"
		}, {
			value: "321182",
			text: "扬中市"
		}, {
			value: "321183",
			text: "句容市"
		}, {
			value: "321184",
			text: "其它区"
		}]
	}, {
		value: "321200",
		text: "泰州市",
		children: [{
			value: "321202",
			text: "海陵区"
		}, {
			value: "321203",
			text: "高港区"
		}, {
			value: "321281",
			text: "兴化市"
		}, {
			value: "321282",
			text: "靖江市"
		}, {
			value: "321283",
			text: "泰兴市"
		}, {
			value: "321284",
			text: "姜堰市"
		}, {
			value: "321285",
			text: "其它区"
		}]
	}, {
		value: "321300",
		text: "宿迁市",
		children: [{
			value: "321302",
			text: "宿城区"
		}, {
			value: "321311",
			text: "宿豫区"
		}, {
			value: "321322",
			text: "沭阳县"
		}, {
			value: "321323",
			text: "泗阳县"
		}, {
			value: "321324",
			text: "泗洪县"
		}, {
			value: "321325",
			text: "其它区"
		}]
	}]
}, {
	value: '330000',
	text: '浙江省',
	children: [{
		value: "330100",
		text: "杭州市",
		children: [{
			value: "330102",
			text: "上城区"
		}, {
			value: "330103",
			text: "下城区"
		}, {
			value: "330104",
			text: "江干区"
		}, {
			value: "330105",
			text: "拱墅区"
		}, {
			value: "330106",
			text: "西湖区"
		}, {
			value: "330108",
			text: "滨江区"
		}, {
			value: "330109",
			text: "萧山区"
		}, {
			value: "330110",
			text: "余杭区"
		}, {
			value: "330122",
			text: "桐庐县"
		}, {
			value: "330127",
			text: "淳安县"
		}, {
			value: "330182",
			text: "建德市"
		}, {
			value: "330183",
			text: "富阳市"
		}, {
			value: "330185",
			text: "临安市"
		}, {
			value: "330186",
			text: "其它区"
		}]
	}, {
		value: "330200",
		text: "宁波市",
		children: [{
			value: "330203",
			text: "海曙区"
		}, {
			value: "330204",
			text: "江东区"
		}, {
			value: "330205",
			text: "江北区"
		}, {
			value: "330206",
			text: "北仑区"
		}, {
			value: "330211",
			text: "镇海区"
		}, {
			value: "330212",
			text: "鄞州区"
		}, {
			value: "330225",
			text: "象山县"
		}, {
			value: "330226",
			text: "宁海县"
		}, {
			value: "330281",
			text: "余姚市"
		}, {
			value: "330282",
			text: "慈溪市"
		}, {
			value: "330283",
			text: "奉化市"
		}, {
			value: "330284",
			text: "其它区"
		}]
	}, {
		value: "330300",
		text: "温州市",
		children: [{
			value: "330302",
			text: "鹿城区"
		}, {
			value: "330303",
			text: "龙湾区"
		}, {
			value: "330304",
			text: "瓯海区"
		}, {
			value: "330322",
			text: "洞头县"
		}, {
			value: "330324",
			text: "永嘉县"
		}, {
			value: "330326",
			text: "平阳县"
		}, {
			value: "330327",
			text: "苍南县"
		}, {
			value: "330328",
			text: "文成县"
		}, {
			value: "330329",
			text: "泰顺县"
		}, {
			value: "330381",
			text: "瑞安市"
		}, {
			value: "330382",
			text: "乐清市"
		}, {
			value: "330383",
			text: "其它区"
		}]
	}, {
		value: "330400",
		text: "嘉兴市",
		children: [{
			value: "330402",
			text: "南湖区"
		}, {
			value: "330411",
			text: "秀洲区"
		}, {
			value: "330421",
			text: "嘉善县"
		}, {
			value: "330424",
			text: "海盐县"
		}, {
			value: "330481",
			text: "海宁市"
		}, {
			value: "330482",
			text: "平湖市"
		}, {
			value: "330483",
			text: "桐乡市"
		}, {
			value: "330484",
			text: "其它区"
		}]
	}, {
		value: "330500",
		text: "湖州市",
		children: [{
			value: "330502",
			text: "吴兴区"
		}, {
			value: "330503",
			text: "南浔区"
		}, {
			value: "330521",
			text: "德清县"
		}, {
			value: "330522",
			text: "长兴县"
		}, {
			value: "330523",
			text: "安吉县"
		}, {
			value: "330524",
			text: "其它区"
		}]
	}, {
		value: "330600",
		text: "绍兴市",
		children: [{
			value: "330602",
			text: "越城区"
		}, {
			value: "330621",
			text: "柯桥区"
		}, {
			value: "330624",
			text: "新昌县"
		}, {
			value: "330681",
			text: "诸暨市"
		}, {
			value: "330682",
			text: "上虞区"
		}, {
			value: "330683",
			text: "嵊州市"
		}, {
			value: "330684",
			text: "其它区"
		}]
	}, {
		value: "330700",
		text: "金华市",
		children: [{
			value: "330702",
			text: "婺城区"
		}, {
			value: "330703",
			text: "金东区"
		}, {
			value: "330723",
			text: "武义县"
		}, {
			value: "330726",
			text: "浦江县"
		}, {
			value: "330727",
			text: "磐安县"
		}, {
			value: "330781",
			text: "兰溪市"
		}, {
			value: "330782",
			text: "义乌市"
		}, {
			value: "330783",
			text: "东阳市"
		}, {
			value: "330784",
			text: "永康市"
		}, {
			value: "330785",
			text: "其它区"
		}]
	}, {
		value: "330800",
		text: "衢州市",
		children: [{
			value: "330802",
			text: "柯城区"
		}, {
			value: "330803",
			text: "衢江区"
		}, {
			value: "330822",
			text: "常山县"
		}, {
			value: "330824",
			text: "开化县"
		}, {
			value: "330825",
			text: "龙游县"
		}, {
			value: "330881",
			text: "江山市"
		}, {
			value: "330882",
			text: "其它区"
		}]
	}, {
		value: "330900",
		text: "舟山市",
		children: [{
			value: "330902",
			text: "定海区"
		}, {
			value: "330903",
			text: "普陀区"
		}, {
			value: "330921",
			text: "岱山县"
		}, {
			value: "330922",
			text: "嵊泗县"
		}, {
			value: "330923",
			text: "其它区"
		}]
	}, {
		value: "331000",
		text: "台州市",
		children: [{
			value: "331002",
			text: "椒江区"
		}, {
			value: "331003",
			text: "黄岩区"
		}, {
			value: "331004",
			text: "路桥区"
		}, {
			value: "331021",
			text: "玉环县"
		}, {
			value: "331022",
			text: "三门县"
		}, {
			value: "331023",
			text: "天台县"
		}, {
			value: "331024",
			text: "仙居县"
		}, {
			value: "331081",
			text: "温岭市"
		}, {
			value: "331082",
			text: "临海市"
		}, {
			value: "331083",
			text: "其它区"
		}]
	}, {
		value: "331100",
		text: "丽水市",
		children: [{
			value: "331102",
			text: "莲都区"
		}, {
			value: "331121",
			text: "青田县"
		}, {
			value: "331122",
			text: "缙云县"
		}, {
			value: "331123",
			text: "遂昌县"
		}, {
			value: "331124",
			text: "松阳县"
		}, {
			value: "331125",
			text: "云和县"
		}, {
			value: "331126",
			text: "庆元县"
		}, {
			value: "331127",
			text: "景宁畲族自治县"
		}, {
			value: "331181",
			text: "龙泉市"
		}, {
			value: "331182",
			text: "其它区"
		}]
	}]
}, {
	value: '340000',
	text: '安徽省',
	children: [{
		value: "340100",
		text: "合肥市",
		children: [{
			value: "340102",
			text: "瑶海区"
		}, {
			value: "340103",
			text: "庐阳区"
		}, {
			value: "340104",
			text: "蜀山区"
		}, {
			value: "340111",
			text: "包河区"
		}, {
			value: "340121",
			text: "长丰县"
		}, {
			value: "340122",
			text: "肥东县"
		}, {
			value: "340123",
			text: "肥西县"
		}, {
			value: "340151",
			text: "高新区"
		}, {
			value: "340191",
			text: "中区"
		}, {
			value: "340192",
			text: "其它区"
		}, {
			value: "341400",
			text: "巢湖市"
		}, {
			value: "341402",
			text: "居巢区"
		}, {
			value: "341421",
			text: "庐江县"
		}]
	}, {
		value: "340200",
		text: "芜湖市",
		children: [{
			value: "340202",
			text: "镜湖区"
		}, {
			value: "340203",
			text: "弋江区"
		}, {
			value: "340207",
			text: "鸠江区"
		}, {
			value: "340208",
			text: "三山区"
		}, {
			value: "340221",
			text: "芜湖县"
		}, {
			value: "340222",
			text: "繁昌县"
		}, {
			value: "340223",
			text: "南陵县"
		}, {
			value: "340224",
			text: "其它区"
		}, {
			value: "341422",
			text: "无为县"
		}]
	}, {
		value: "340300",
		text: "蚌埠市",
		children: [{
			value: "340302",
			text: "龙子湖区"
		}, {
			value: "340303",
			text: "蚌山区"
		}, {
			value: "340304",
			text: "禹会区"
		}, {
			value: "340311",
			text: "淮上区"
		}, {
			value: "340321",
			text: "怀远县"
		}, {
			value: "340322",
			text: "五河县"
		}, {
			value: "340323",
			text: "固镇县"
		}, {
			value: "340324",
			text: "其它区"
		}]
	}, {
		value: "340400",
		text: "淮南市",
		children: [{
			value: "340402",
			text: "大通区"
		}, {
			value: "340403",
			text: "田家庵区"
		}, {
			value: "340404",
			text: "谢家集区"
		}, {
			value: "340405",
			text: "八公山区"
		}, {
			value: "340406",
			text: "潘集区"
		}, {
			value: "340421",
			text: "凤台县"
		}, {
			value: "340422",
			text: "其它区"
		}]
	}, {
		value: "340500",
		text: "马鞍山市",
		children: [{
			value: "340502",
			text: "金家庄区"
		}, {
			value: "340503",
			text: "花山区"
		}, {
			value: "340504",
			text: "雨山区"
		}, {
			value: "340521",
			text: "当涂县"
		}, {
			value: "340522",
			text: "其它区"
		}, {
			value: "341423",
			text: "含山县"
		}, {
			value: "341424",
			text: "和县"
		}]
	}, {
		value: "340600",
		text: "淮北市",
		children: [{
			value: "340602",
			text: "杜集区"
		}, {
			value: "340603",
			text: "相山区"
		}, {
			value: "340604",
			text: "烈山区"
		}, {
			value: "340621",
			text: "濉溪县"
		}, {
			value: "340622",
			text: "其它区"
		}]
	}, {
		value: "340700",
		text: "铜陵市",
		children: [{
			value: "340702",
			text: "铜官山区"
		}, {
			value: "340703",
			text: "狮子山区"
		}, {
			value: "340711",
			text: "郊区"
		}, {
			value: "340721",
			text: "铜陵县"
		}, {
			value: "340722",
			text: "其它区"
		}]
	}, {
		value: "340800",
		text: "安庆市",
		children: [{
			value: "340802",
			text: "迎江区"
		}, {
			value: "340803",
			text: "大观区"
		}, {
			value: "340811",
			text: "宜秀区"
		}, {
			value: "340822",
			text: "怀宁县"
		}, {
			value: "340823",
			text: "枞阳县"
		}, {
			value: "340824",
			text: "潜山县"
		}, {
			value: "340825",
			text: "太湖县"
		}, {
			value: "340826",
			text: "宿松县"
		}, {
			value: "340827",
			text: "望江县"
		}, {
			value: "340828",
			text: "岳西县"
		}, {
			value: "340881",
			text: "桐城市"
		}, {
			value: "340882",
			text: "其它区"
		}]
	}, {
		value: "341000",
		text: "黄山市",
		children: [{
			value: "341002",
			text: "屯溪区"
		}, {
			value: "341003",
			text: "黄山区"
		}, {
			value: "341004",
			text: "徽州区"
		}, {
			value: "341021",
			text: "歙县"
		}, {
			value: "341022",
			text: "休宁县"
		}, {
			value: "341023",
			text: "黟县"
		}, {
			value: "341024",
			text: "祁门县"
		}, {
			value: "341025",
			text: "其它区"
		}]
	}, {
		value: "341100",
		text: "滁州市",
		children: [{
			value: "341102",
			text: "琅琊区"
		}, {
			value: "341103",
			text: "南谯区"
		}, {
			value: "341122",
			text: "来安县"
		}, {
			value: "341124",
			text: "全椒县"
		}, {
			value: "341125",
			text: "定远县"
		}, {
			value: "341126",
			text: "凤阳县"
		}, {
			value: "341181",
			text: "天长市"
		}, {
			value: "341182",
			text: "明光市"
		}, {
			value: "341183",
			text: "其它区"
		}]
	}, {
		value: "341200",
		text: "阜阳市",
		children: [{
			value: "341202",
			text: "颍州区"
		}, {
			value: "341203",
			text: "颍东区"
		}, {
			value: "341204",
			text: "颍泉区"
		}, {
			value: "341221",
			text: "临泉县"
		}, {
			value: "341222",
			text: "太和县"
		}, {
			value: "341225",
			text: "阜南县"
		}, {
			value: "341226",
			text: "颍上县"
		}, {
			value: "341282",
			text: "界首市"
		}, {
			value: "341283",
			text: "其它区"
		}]
	}, {
		value: "341300",
		text: "宿州市",
		children: [{
			value: "341302",
			text: "埇桥区"
		}, {
			value: "341321",
			text: "砀山县"
		}, {
			value: "341322",
			text: "萧县"
		}, {
			value: "341323",
			text: "灵璧县"
		}, {
			value: "341324",
			text: "泗县"
		}, {
			value: "341325",
			text: "其它区"
		}]
	}, {
		value: "341500",
		text: "六安市",
		children: [{
			value: "341502",
			text: "金安区"
		}, {
			value: "341503",
			text: "裕安区"
		}, {
			value: "341521",
			text: "寿县"
		}, {
			value: "341522",
			text: "霍邱县"
		}, {
			value: "341523",
			text: "舒城县"
		}, {
			value: "341524",
			text: "金寨县"
		}, {
			value: "341525",
			text: "霍山县"
		}, {
			value: "341526",
			text: "其它区"
		}]
	}, {
		value: "341600",
		text: "亳州市",
		children: [{
			value: "341602",
			text: "谯城区"
		}, {
			value: "341621",
			text: "涡阳县"
		}, {
			value: "341622",
			text: "蒙城县"
		}, {
			value: "341623",
			text: "利辛县"
		}, {
			value: "341624",
			text: "其它区"
		}]
	}, {
		value: "341700",
		text: "池州市",
		children: [{
			value: "341702",
			text: "贵池区"
		}, {
			value: "341721",
			text: "东至县"
		}, {
			value: "341722",
			text: "石台县"
		}, {
			value: "341723",
			text: "青阳县"
		}, {
			value: "341724",
			text: "其它区"
		}]
	}, {
		value: "341800",
		text: "宣城市",
		children: [{
			value: "341802",
			text: "宣州区"
		}, {
			value: "341821",
			text: "郎溪县"
		}, {
			value: "341822",
			text: "广德县"
		}, {
			value: "341823",
			text: "泾县"
		}, {
			value: "341824",
			text: "绩溪县"
		}, {
			value: "341825",
			text: "旌德县"
		}, {
			value: "341881",
			text: "宁国市"
		}, {
			value: "341882",
			text: "其它区"
		}]
	}]
}, {
	value: '350000',
	text: '福建省',
	children: [{
		value: "350100",
		text: "福州市",
		children: [{
			value: "350102",
			text: "鼓楼区"
		}, {
			value: "350103",
			text: "台江区"
		}, {
			value: "350104",
			text: "仓山区"
		}, {
			value: "350105",
			text: "马尾区"
		}, {
			value: "350111",
			text: "晋安区"
		}, {
			value: "350121",
			text: "闽侯县"
		}, {
			value: "350122",
			text: "连江县"
		}, {
			value: "350123",
			text: "罗源县"
		}, {
			value: "350124",
			text: "闽清县"
		}, {
			value: "350125",
			text: "永泰县"
		}, {
			value: "350128",
			text: "平潭县"
		}, {
			value: "350181",
			text: "福清市"
		}, {
			value: "350182",
			text: "长乐市"
		}, {
			value: "350183",
			text: "其它区"
		}]
	}, {
		value: "350200",
		text: "厦门市",
		children: [{
			value: "350203",
			text: "思明区"
		}, {
			value: "350205",
			text: "海沧区"
		}, {
			value: "350206",
			text: "湖里区"
		}, {
			value: "350211",
			text: "集美区"
		}, {
			value: "350212",
			text: "同安区"
		}, {
			value: "350213",
			text: "翔安区"
		}, {
			value: "350214",
			text: "其它区"
		}]
	}, {
		value: "350300",
		text: "莆田市",
		children: [{
			value: "350302",
			text: "城厢区"
		}, {
			value: "350303",
			text: "涵江区"
		}, {
			value: "350304",
			text: "荔城区"
		}, {
			value: "350305",
			text: "秀屿区"
		}, {
			value: "350322",
			text: "仙游县"
		}, {
			value: "350323",
			text: "其它区"
		}]
	}, {
		value: "350400",
		text: "三明市",
		children: [{
			value: "350402",
			text: "梅列区"
		}, {
			value: "350403",
			text: "三元区"
		}, {
			value: "350421",
			text: "明溪县"
		}, {
			value: "350423",
			text: "清流县"
		}, {
			value: "350424",
			text: "宁化县"
		}, {
			value: "350425",
			text: "大田县"
		}, {
			value: "350426",
			text: "尤溪县"
		}, {
			value: "350427",
			text: "沙县"
		}, {
			value: "350428",
			text: "将乐县"
		}, {
			value: "350429",
			text: "泰宁县"
		}, {
			value: "350430",
			text: "建宁县"
		}, {
			value: "350481",
			text: "永安市"
		}, {
			value: "350482",
			text: "其它区"
		}]
	}, {
		value: "350500",
		text: "泉州市",
		children: [{
			value: "350502",
			text: "鲤城区"
		}, {
			value: "350503",
			text: "丰泽区"
		}, {
			value: "350504",
			text: "洛江区"
		}, {
			value: "350505",
			text: "泉港区"
		}, {
			value: "350521",
			text: "惠安县"
		}, {
			value: "350524",
			text: "安溪县"
		}, {
			value: "350525",
			text: "永春县"
		}, {
			value: "350526",
			text: "德化县"
		}, {
			value: "350527",
			text: "金门县"
		}, {
			value: "350581",
			text: "石狮市"
		}, {
			value: "350582",
			text: "晋江市"
		}, {
			value: "350583",
			text: "南安市"
		}, {
			value: "350584",
			text: "其它区"
		}]
	}, {
		value: "350600",
		text: "漳州市",
		children: [{
			value: "350602",
			text: "芗城区"
		}, {
			value: "350603",
			text: "龙文区"
		}, {
			value: "350622",
			text: "云霄县"
		}, {
			value: "350623",
			text: "漳浦县"
		}, {
			value: "350624",
			text: "诏安县"
		}, {
			value: "350625",
			text: "长泰县"
		}, {
			value: "350626",
			text: "东山县"
		}, {
			value: "350627",
			text: "南靖县"
		}, {
			value: "350628",
			text: "平和县"
		}, {
			value: "350629",
			text: "华安县"
		}, {
			value: "350681",
			text: "龙海市"
		}, {
			value: "350682",
			text: "其它区"
		}]
	}, {
		value: "350700",
		text: "南平市",
		children: [{
			value: "350702",
			text: "延平区"
		}, {
			value: "350721",
			text: "顺昌县"
		}, {
			value: "350722",
			text: "浦城县"
		}, {
			value: "350723",
			text: "光泽县"
		}, {
			value: "350724",
			text: "松溪县"
		}, {
			value: "350725",
			text: "政和县"
		}, {
			value: "350781",
			text: "邵武市"
		}, {
			value: "350782",
			text: "武夷山市"
		}, {
			value: "350783",
			text: "建瓯市"
		}, {
			value: "350784",
			text: "建阳市"
		}, {
			value: "350785",
			text: "其它区"
		}]
	}, {
		value: "350800",
		text: "龙岩市",
		children: [{
			value: "350802",
			text: "新罗区"
		}, {
			value: "350821",
			text: "长汀县"
		}, {
			value: "350822",
			text: "永定县"
		}, {
			value: "350823",
			text: "上杭县"
		}, {
			value: "350824",
			text: "武平县"
		}, {
			value: "350825",
			text: "连城县"
		}, {
			value: "350881",
			text: "漳平市"
		}, {
			value: "350882",
			text: "其它区"
		}]
	}, {
		value: "350900",
		text: "宁德市",
		children: [{
			value: "350902",
			text: "蕉城区"
		}, {
			value: "350921",
			text: "霞浦县"
		}, {
			value: "350922",
			text: "古田县"
		}, {
			value: "350923",
			text: "屏南县"
		}, {
			value: "350924",
			text: "寿宁县"
		}, {
			value: "350925",
			text: "周宁县"
		}, {
			value: "350926",
			text: "柘荣县"
		}, {
			value: "350981",
			text: "福安市"
		}, {
			value: "350982",
			text: "福鼎市"
		}, {
			value: "350983",
			text: "其它区"
		}]
	}]
}, {
	value: '360000',
	text: '江西省',
	children: [{
		value: "360100",
		text: "南昌市",
		children: [{
			value: "360102",
			text: "东湖区"
		}, {
			value: "360103",
			text: "西湖区"
		}, {
			value: "360104",
			text: "青云谱区"
		}, {
			value: "360105",
			text: "湾里区"
		}, {
			value: "360111",
			text: "青山湖区"
		}, {
			value: "360121",
			text: "南昌县"
		}, {
			value: "360122",
			text: "新建县"
		}, {
			value: "360123",
			text: "安义县"
		}, {
			value: "360124",
			text: "进贤县"
		}, {
			value: "360125",
			text: "红谷滩新区"
		}, {
			value: "360126",
			text: "经济技术开发区"
		}, {
			value: "360127",
			text: "昌北区"
		}, {
			value: "360128",
			text: "其它区"
		}]
	}, {
		value: "360200",
		text: "景德镇市",
		children: [{
			value: "360202",
			text: "昌江区"
		}, {
			value: "360203",
			text: "珠山区"
		}, {
			value: "360222",
			text: "浮梁县"
		}, {
			value: "360281",
			text: "乐平市"
		}, {
			value: "360282",
			text: "其它区"
		}]
	}, {
		value: "360300",
		text: "萍乡市",
		children: [{
			value: "360302",
			text: "安源区"
		}, {
			value: "360313",
			text: "湘东区"
		}, {
			value: "360321",
			text: "莲花县"
		}, {
			value: "360322",
			text: "上栗县"
		}, {
			value: "360323",
			text: "芦溪县"
		}, {
			value: "360324",
			text: "其它区"
		}]
	}, {
		value: "360400",
		text: "九江市",
		children: [{
			value: "360402",
			text: "庐山区"
		}, {
			value: "360403",
			text: "浔阳区"
		}, {
			value: "360421",
			text: "九江县"
		}, {
			value: "360423",
			text: "武宁县"
		}, {
			value: "360424",
			text: "修水县"
		}, {
			value: "360425",
			text: "永修县"
		}, {
			value: "360426",
			text: "德安县"
		}, {
			value: "360427",
			text: "星子县"
		}, {
			value: "360428",
			text: "都昌县"
		}, {
			value: "360429",
			text: "湖口县"
		}, {
			value: "360430",
			text: "彭泽县"
		}, {
			value: "360481",
			text: "瑞昌市"
		}, {
			value: "360482",
			text: "其它区"
		}]
	}, {
		value: "360500",
		text: "新余市",
		children: [{
			value: "360502",
			text: "渝水区"
		}, {
			value: "360521",
			text: "分宜县"
		}, {
			value: "360522",
			text: "其它区"
		}]
	}, {
		value: "360600",
		text: "鹰潭市",
		children: [{
			value: "360602",
			text: "月湖区"
		}, {
			value: "360622",
			text: "余江县"
		}, {
			value: "360681",
			text: "贵溪市"
		}, {
			value: "360682",
			text: "其它区"
		}]
	}, {
		value: "360700",
		text: "赣州市",
		children: [{
			value: "360702",
			text: "章贡区"
		}, {
			value: "360721",
			text: "赣县"
		}, {
			value: "360722",
			text: "信丰县"
		}, {
			value: "360723",
			text: "大余县"
		}, {
			value: "360724",
			text: "上犹县"
		}, {
			value: "360725",
			text: "崇义县"
		}, {
			value: "360726",
			text: "安远县"
		}, {
			value: "360727",
			text: "龙南县"
		}, {
			value: "360728",
			text: "定南县"
		}, {
			value: "360729",
			text: "全南县"
		}, {
			value: "360730",
			text: "宁都县"
		}, {
			value: "360731",
			text: "于都县"
		}, {
			value: "360732",
			text: "兴国县"
		}, {
			value: "360733",
			text: "会昌县"
		}, {
			value: "360734",
			text: "寻乌县"
		}, {
			value: "360735",
			text: "石城县"
		}, {
			value: "360751",
			text: "黄金区"
		}, {
			value: "360781",
			text: "瑞金市"
		}, {
			value: "360782",
			text: "南康市"
		}, {
			value: "360783",
			text: "其它区"
		}]
	}, {
		value: "360800",
		text: "吉安市",
		children: [{
			value: "360802",
			text: "吉州区"
		}, {
			value: "360803",
			text: "青原区"
		}, {
			value: "360821",
			text: "吉安县"
		}, {
			value: "360822",
			text: "吉水县"
		}, {
			value: "360823",
			text: "峡江县"
		}, {
			value: "360824",
			text: "新干县"
		}, {
			value: "360825",
			text: "永丰县"
		}, {
			value: "360826",
			text: "泰和县"
		}, {
			value: "360827",
			text: "遂川县"
		}, {
			value: "360828",
			text: "万安县"
		}, {
			value: "360829",
			text: "安福县"
		}, {
			value: "360830",
			text: "永新县"
		}, {
			value: "360881",
			text: "井冈山市"
		}, {
			value: "360882",
			text: "其它区"
		}]
	}, {
		value: "360900",
		text: "宜春市",
		children: [{
			value: "360902",
			text: "袁州区"
		}, {
			value: "360921",
			text: "奉新县"
		}, {
			value: "360922",
			text: "万载县"
		}, {
			value: "360923",
			text: "上高县"
		}, {
			value: "360924",
			text: "宜丰县"
		}, {
			value: "360925",
			text: "靖安县"
		}, {
			value: "360926",
			text: "铜鼓县"
		}, {
			value: "360981",
			text: "丰城市"
		}, {
			value: "360982",
			text: "樟树市"
		}, {
			value: "360983",
			text: "高安市"
		}, {
			value: "360984",
			text: "其它区"
		}]
	}, {
		value: "361000",
		text: "抚州市",
		children: [{
			value: "361002",
			text: "临川区"
		}, {
			value: "361021",
			text: "南城县"
		}, {
			value: "361022",
			text: "黎川县"
		}, {
			value: "361023",
			text: "南丰县"
		}, {
			value: "361024",
			text: "崇仁县"
		}, {
			value: "361025",
			text: "乐安县"
		}, {
			value: "361026",
			text: "宜黄县"
		}, {
			value: "361027",
			text: "金溪县"
		}, {
			value: "361028",
			text: "资溪县"
		}, {
			value: "361029",
			text: "东乡县"
		}, {
			value: "361030",
			text: "广昌县"
		}, {
			value: "361031",
			text: "其它区"
		}]
	}, {
		value: "361100",
		text: "上饶市",
		children: [{
			value: "361102",
			text: "信州区"
		}, {
			value: "361121",
			text: "上饶县"
		}, {
			value: "361122",
			text: "广丰县"
		}, {
			value: "361123",
			text: "玉山县"
		}, {
			value: "361124",
			text: "铅山县"
		}, {
			value: "361125",
			text: "横峰县"
		}, {
			value: "361126",
			text: "弋阳县"
		}, {
			value: "361127",
			text: "余干县"
		}, {
			value: "361128",
			text: "鄱阳县"
		}, {
			value: "361129",
			text: "万年县"
		}, {
			value: "361130",
			text: "婺源县"
		}, {
			value: "361181",
			text: "德兴市"
		}, {
			value: "361182",
			text: "其它区"
		}]
	}]
}, {
	value: '370000',
	text: '山东省',
	children: [{
		value: "370100",
		text: "济南市",
		children: [{
			value: "370102",
			text: "历下区"
		}, {
			value: "370103",
			text: "市中区"
		}, {
			value: "370104",
			text: "槐荫区"
		}, {
			value: "370105",
			text: "天桥区"
		}, {
			value: "370112",
			text: "历城区"
		}, {
			value: "370113",
			text: "长清区"
		}, {
			value: "370124",
			text: "平阴县"
		}, {
			value: "370125",
			text: "济阳县"
		}, {
			value: "370126",
			text: "商河县"
		}, {
			value: "370181",
			text: "章丘市"
		}, {
			value: "370182",
			text: "其它区"
		}]
	}, {
		value: "370200",
		text: "青岛市",
		children: [{
			value: "370202",
			text: "市南区"
		}, {
			value: "370203",
			text: "市北区"
		}, {
			value: "370205",
			text: "四方区"
		}, {
			value: "370211",
			text: "黄岛区"
		}, {
			value: "370212",
			text: "崂山区"
		}, {
			value: "370213",
			text: "李沧区"
		}, {
			value: "370214",
			text: "城阳区"
		}, {
			value: "370251",
			text: "开发区"
		}, {
			value: "370281",
			text: "胶州市"
		}, {
			value: "370282",
			text: "即墨市"
		}, {
			value: "370283",
			text: "平度市"
		}, {
			value: "370284",
			text: "胶南市"
		}, {
			value: "370285",
			text: "莱西市"
		}, {
			value: "370286",
			text: "其它区"
		}]
	}, {
		value: "370300",
		text: "淄博市",
		children: [{
			value: "370302",
			text: "淄川区"
		}, {
			value: "370303",
			text: "张店区"
		}, {
			value: "370304",
			text: "博山区"
		}, {
			value: "370305",
			text: "临淄区"
		}, {
			value: "370306",
			text: "周村区"
		}, {
			value: "370321",
			text: "桓台县"
		}, {
			value: "370322",
			text: "高青县"
		}, {
			value: "370323",
			text: "沂源县"
		}, {
			value: "370324",
			text: "其它区"
		}]
	}, {
		value: "370400",
		text: "枣庄市",
		children: [{
			value: "370402",
			text: "市中区"
		}, {
			value: "370403",
			text: "薛城区"
		}, {
			value: "370404",
			text: "峄城区"
		}, {
			value: "370405",
			text: "台儿庄区"
		}, {
			value: "370406",
			text: "山亭区"
		}, {
			value: "370481",
			text: "滕州市"
		}, {
			value: "370482",
			text: "其它区"
		}]
	}, {
		value: "370500",
		text: "东营市",
		children: [{
			value: "370502",
			text: "东营区"
		}, {
			value: "370503",
			text: "河口区"
		}, {
			value: "370521",
			text: "垦利县"
		}, {
			value: "370522",
			text: "利津县"
		}, {
			value: "370523",
			text: "广饶县"
		}, {
			value: "370589",
			text: "西城区"
		}, {
			value: "370590",
			text: "东城区"
		}, {
			value: "370591",
			text: "其它区"
		}]
	}, {
		value: "370600",
		text: "烟台市",
		children: [{
			value: "370602",
			text: "芝罘区"
		}, {
			value: "370611",
			text: "福山区"
		}, {
			value: "370612",
			text: "牟平区"
		}, {
			value: "370613",
			text: "莱山区"
		}, {
			value: "370634",
			text: "长岛县"
		}, {
			value: "370681",
			text: "龙口市"
		}, {
			value: "370682",
			text: "莱阳市"
		}, {
			value: "370683",
			text: "莱州市"
		}, {
			value: "370684",
			text: "蓬莱市"
		}, {
			value: "370685",
			text: "招远市"
		}, {
			value: "370686",
			text: "栖霞市"
		}, {
			value: "370687",
			text: "海阳市"
		}, {
			value: "370688",
			text: "其它区"
		}]
	}, {
		value: "370700",
		text: "潍坊市",
		children: [{
			value: "370702",
			text: "潍城区"
		}, {
			value: "370703",
			text: "寒亭区"
		}, {
			value: "370704",
			text: "坊子区"
		}, {
			value: "370705",
			text: "奎文区"
		}, {
			value: "370724",
			text: "临朐县"
		}, {
			value: "370725",
			text: "昌乐县"
		}, {
			value: "370751",
			text: "开发区"
		}, {
			value: "370781",
			text: "青州市"
		}, {
			value: "370782",
			text: "诸城市"
		}, {
			value: "370783",
			text: "寿光市"
		}, {
			value: "370784",
			text: "安丘市"
		}, {
			value: "370785",
			text: "高密市"
		}, {
			value: "370786",
			text: "昌邑市"
		}, {
			value: "370787",
			text: "其它区"
		}]
	}, {
		value: "370800",
		text: "济宁市",
		children: [{
			value: "370802",
			text: "市中区"
		}, {
			value: "370811",
			text: "任城区"
		}, {
			value: "370826",
			text: "微山县"
		}, {
			value: "370827",
			text: "鱼台县"
		}, {
			value: "370828",
			text: "金乡县"
		}, {
			value: "370829",
			text: "嘉祥县"
		}, {
			value: "370830",
			text: "汶上县"
		}, {
			value: "370831",
			text: "泗水县"
		}, {
			value: "370832",
			text: "梁山县"
		}, {
			value: "370881",
			text: "曲阜市"
		}, {
			value: "370882",
			text: "兖州市"
		}, {
			value: "370883",
			text: "邹城市"
		}, {
			value: "370884",
			text: "其它区"
		}]
	}, {
		value: "370900",
		text: "泰安市",
		children: [{
			value: "370902",
			text: "泰山区"
		}, {
			value: "370903",
			text: "岱岳区"
		}, {
			value: "370921",
			text: "宁阳县"
		}, {
			value: "370923",
			text: "东平县"
		}, {
			value: "370982",
			text: "新泰市"
		}, {
			value: "370983",
			text: "肥城市"
		}, {
			value: "370984",
			text: "其它区"
		}]
	}, {
		value: "371000",
		text: "威海市",
		children: [{
			value: "371002",
			text: "环翠区"
		}, {
			value: "371081",
			text: "文登市"
		}, {
			value: "371082",
			text: "荣成市"
		}, {
			value: "371083",
			text: "乳山市"
		}, {
			value: "371084",
			text: "其它区"
		}]
	}, {
		value: "371100",
		text: "日照市",
		children: [{
			value: "371102",
			text: "东港区"
		}, {
			value: "371103",
			text: "岚山区"
		}, {
			value: "371121",
			text: "五莲县"
		}, {
			value: "371122",
			text: "莒县"
		}, {
			value: "371123",
			text: "其它区"
		}]
	}, {
		value: "371200",
		text: "莱芜市",
		children: [{
			value: "371202",
			text: "莱城区"
		}, {
			value: "371203",
			text: "钢城区"
		}, {
			value: "371204",
			text: "其它区"
		}]
	}, {
		value: "371300",
		text: "临沂市",
		children: [{
			value: "371302",
			text: "兰山区"
		}, {
			value: "371311",
			text: "罗庄区"
		}, {
			value: "371312",
			text: "河东区"
		}, {
			value: "371321",
			text: "沂南县"
		}, {
			value: "371322",
			text: "郯城县"
		}, {
			value: "371323",
			text: "沂水县"
		}, {
			value: "371324",
			text: "苍山县"
		}, {
			value: "371325",
			text: "费县"
		}, {
			value: "371326",
			text: "平邑县"
		}, {
			value: "371327",
			text: "莒南县"
		}, {
			value: "371328",
			text: "蒙阴县"
		}, {
			value: "371329",
			text: "临沭县"
		}, {
			value: "371330",
			text: "其它区"
		}]
	}, {
		value: "371400",
		text: "德州市",
		children: [{
			value: "371402",
			text: "德城区"
		}, {
			value: "371421",
			text: "陵县"
		}, {
			value: "371422",
			text: "宁津县"
		}, {
			value: "371423",
			text: "庆云县"
		}, {
			value: "371424",
			text: "临邑县"
		}, {
			value: "371425",
			text: "齐河县"
		}, {
			value: "371426",
			text: "平原县"
		}, {
			value: "371427",
			text: "夏津县"
		}, {
			value: "371428",
			text: "武城县"
		}, {
			value: "371451",
			text: "开发区"
		}, {
			value: "371481",
			text: "乐陵市"
		}, {
			value: "371482",
			text: "禹城市"
		}, {
			value: "371483",
			text: "其它区"
		}]
	}, {
		value: "371500",
		text: "聊城市",
		children: [{
			value: "371502",
			text: "东昌府区"
		}, {
			value: "371521",
			text: "阳谷县"
		}, {
			value: "371522",
			text: "莘县"
		}, {
			value: "371523",
			text: "茌平县"
		}, {
			value: "371524",
			text: "东阿县"
		}, {
			value: "371525",
			text: "冠县"
		}, {
			value: "371526",
			text: "高唐县"
		}, {
			value: "371581",
			text: "临清市"
		}, {
			value: "371582",
			text: "其它区"
		}]
	}, {
		value: "371600",
		text: "滨州市",
		children: [{
			value: "371602",
			text: "滨城区"
		}, {
			value: "371621",
			text: "惠民县"
		}, {
			value: "371622",
			text: "阳信县"
		}, {
			value: "371623",
			text: "无棣县"
		}, {
			value: "371624",
			text: "沾化县"
		}, {
			value: "371625",
			text: "博兴县"
		}, {
			value: "371626",
			text: "邹平县"
		}, {
			value: "371627",
			text: "其它区"
		}]
	}, {
		value: "371700",
		text: "菏泽市",
		children: [{
			value: "371702",
			text: "牡丹区"
		}, {
			value: "371721",
			text: "曹县"
		}, {
			value: "371722",
			text: "单县"
		}, {
			value: "371723",
			text: "成武县"
		}, {
			value: "371724",
			text: "巨野县"
		}, {
			value: "371725",
			text: "郓城县"
		}, {
			value: "371726",
			text: "鄄城县"
		}, {
			value: "371727",
			text: "定陶县"
		}, {
			value: "371728",
			text: "东明县"
		}, {
			value: "371729",
			text: "其它区"
		}]
	}]
}, {
	value: '410000',
	text: '河南省',
	children: [{
		value: "410100",
		text: "郑州市",
		children: [{
			value: "410102",
			text: "中原区"
		}, {
			value: "410103",
			text: "二七区"
		}, {
			value: "410104",
			text: "管城回族区"
		}, {
			value: "410105",
			text: "金水区"
		}, {
			value: "410106",
			text: "上街区"
		}, {
			value: "410108",
			text: "惠济区"
		}, {
			value: "410122",
			text: "中牟县"
		}, {
			value: "410181",
			text: "巩义市"
		}, {
			value: "410182",
			text: "荥阳市"
		}, {
			value: "410183",
			text: "新密市"
		}, {
			value: "410184",
			text: "新郑市"
		}, {
			value: "410185",
			text: "登封市"
		}, {
			value: "410186",
			text: "郑东新区"
		}, {
			value: "410187",
			text: "高新区"
		}, {
			value: "410188",
			text: "其它区"
		}]
	}, {
		value: "410200",
		text: "开封市",
		children: [{
			value: "410202",
			text: "龙亭区"
		}, {
			value: "410203",
			text: "顺河回族区"
		}, {
			value: "410204",
			text: "鼓楼区"
		}, {
			value: "410205",
			text: "禹王台区"
		}, {
			value: "410211",
			text: "金明区"
		}, {
			value: "410221",
			text: "杞县"
		}, {
			value: "410222",
			text: "通许县"
		}, {
			value: "410223",
			text: "尉氏县"
		}, {
			value: "410224",
			text: "开封县"
		}, {
			value: "410225",
			text: "兰考县"
		}, {
			value: "410226",
			text: "其它区"
		}]
	}, {
		value: "410300",
		text: "洛阳市",
		children: [{
			value: "410302",
			text: "老城区"
		}, {
			value: "410303",
			text: "西工区"
		}, {
			value: "410304",
			text: "廛河回族区"
		}, {
			value: "410305",
			text: "涧西区"
		}, {
			value: "410306",
			text: "吉利区"
		}, {
			value: "410307",
			text: "洛龙区"
		}, {
			value: "410322",
			text: "孟津县"
		}, {
			value: "410323",
			text: "新安县"
		}, {
			value: "410324",
			text: "栾川县"
		}, {
			value: "410325",
			text: "嵩县"
		}, {
			value: "410326",
			text: "汝阳县"
		}, {
			value: "410327",
			text: "宜阳县"
		}, {
			value: "410328",
			text: "洛宁县"
		}, {
			value: "410329",
			text: "伊川县"
		}, {
			value: "410381",
			text: "偃师市"
		}, {
			value: "471004",
			text: "高新区"
		}, {
			value: "471005",
			text: "其它区"
		}]
	}, {
		value: "410400",
		text: "平顶山市",
		children: [{
			value: "410402",
			text: "新华区"
		}, {
			value: "410403",
			text: "卫东区"
		}, {
			value: "410404",
			text: "石龙区"
		}, {
			value: "410411",
			text: "湛河区"
		}, {
			value: "410421",
			text: "宝丰县"
		}, {
			value: "410422",
			text: "叶县"
		}, {
			value: "410423",
			text: "鲁山县"
		}, {
			value: "410425",
			text: "郏县"
		}, {
			value: "410481",
			text: "舞钢市"
		}, {
			value: "410482",
			text: "汝州市"
		}, {
			value: "410483",
			text: "其它区"
		}]
	}, {
		value: "410500",
		text: "安阳市",
		children: [{
			value: "410502",
			text: "文峰区"
		}, {
			value: "410503",
			text: "北关区"
		}, {
			value: "410505",
			text: "殷都区"
		}, {
			value: "410506",
			text: "龙安区"
		}, {
			value: "410522",
			text: "安阳县"
		}, {
			value: "410523",
			text: "汤阴县"
		}, {
			value: "410526",
			text: "滑县"
		}, {
			value: "410527",
			text: "内黄县"
		}, {
			value: "410581",
			text: "林州市"
		}, {
			value: "410582",
			text: "其它区"
		}]
	}, {
		value: "410600",
		text: "鹤壁市",
		children: [{
			value: "410602",
			text: "鹤山区"
		}, {
			value: "410603",
			text: "山城区"
		}, {
			value: "410611",
			text: "淇滨区"
		}, {
			value: "410621",
			text: "浚县"
		}, {
			value: "410622",
			text: "淇县"
		}, {
			value: "410623",
			text: "其它区"
		}]
	}, {
		value: "410700",
		text: "新乡市",
		children: [{
			value: "410702",
			text: "红旗区"
		}, {
			value: "410703",
			text: "卫滨区"
		}, {
			value: "410704",
			text: "凤泉区"
		}, {
			value: "410711",
			text: "牧野区"
		}, {
			value: "410721",
			text: "新乡县"
		}, {
			value: "410724",
			text: "获嘉县"
		}, {
			value: "410725",
			text: "原阳县"
		}, {
			value: "410726",
			text: "延津县"
		}, {
			value: "410727",
			text: "封丘县"
		}, {
			value: "410728",
			text: "长垣县"
		}, {
			value: "410781",
			text: "卫辉市"
		}, {
			value: "410782",
			text: "辉县市"
		}, {
			value: "410783",
			text: "其它区"
		}]
	}, {
		value: "410800",
		text: "焦作市",
		children: [{
			value: "410802",
			text: "解放区"
		}, {
			value: "410803",
			text: "中站区"
		}, {
			value: "410804",
			text: "马村区"
		}, {
			value: "410811",
			text: "山阳区"
		}, {
			value: "410821",
			text: "修武县"
		}, {
			value: "410822",
			text: "博爱县"
		}, {
			value: "410823",
			text: "武陟县"
		}, {
			value: "410825",
			text: "温县"
		}, {
			value: "410882",
			text: "沁阳市"
		}, {
			value: "410883",
			text: "孟州市"
		}, {
			value: "410884",
			text: "其它区"
		}]
	}, {
		value: "410900",
		text: "濮阳市",
		children: [{
			value: "410902",
			text: "华龙区"
		}, {
			value: "410922",
			text: "清丰县"
		}, {
			value: "410923",
			text: "南乐县"
		}, {
			value: "410926",
			text: "范县"
		}, {
			value: "410927",
			text: "台前县"
		}, {
			value: "410928",
			text: "濮阳县"
		}, {
			value: "410929",
			text: "其它区"
		}]
	}, {
		value: "411000",
		text: "许昌市",
		children: [{
			value: "411002",
			text: "魏都区"
		}, {
			value: "411023",
			text: "许昌县"
		}, {
			value: "411024",
			text: "鄢陵县"
		}, {
			value: "411025",
			text: "襄城县"
		}, {
			value: "411081",
			text: "禹州市"
		}, {
			value: "411082",
			text: "长葛市"
		}, {
			value: "411083",
			text: "其它区"
		}]
	}, {
		value: "411100",
		text: "漯河市",
		children: [{
			value: "411102",
			text: "源汇区"
		}, {
			value: "411103",
			text: "郾城区"
		}, {
			value: "411104",
			text: "召陵区"
		}, {
			value: "411121",
			text: "舞阳县"
		}, {
			value: "411122",
			text: "临颍县"
		}, {
			value: "411123",
			text: "其它区"
		}]
	}, {
		value: "411200",
		text: "三门峡市",
		children: [{
			value: "411202",
			text: "湖滨区"
		}, {
			value: "411221",
			text: "渑池县"
		}, {
			value: "411222",
			text: "陕县"
		}, {
			value: "411224",
			text: "卢氏县"
		}, {
			value: "411281",
			text: "义马市"
		}, {
			value: "411282",
			text: "灵宝市"
		}, {
			value: "411283",
			text: "其它区"
		}]
	}, {
		value: "411300",
		text: "南阳市",
		children: [{
			value: "411302",
			text: "宛城区"
		}, {
			value: "411303",
			text: "卧龙区"
		}, {
			value: "411321",
			text: "南召县"
		}, {
			value: "411322",
			text: "方城县"
		}, {
			value: "411323",
			text: "西峡县"
		}, {
			value: "411324",
			text: "镇平县"
		}, {
			value: "411325",
			text: "内乡县"
		}, {
			value: "411326",
			text: "淅川县"
		}, {
			value: "411327",
			text: "社旗县"
		}, {
			value: "411328",
			text: "唐河县"
		}, {
			value: "411329",
			text: "新野县"
		}, {
			value: "411330",
			text: "桐柏县"
		}, {
			value: "411381",
			text: "邓州市"
		}, {
			value: "411382",
			text: "其它区"
		}]
	}, {
		value: "411400",
		text: "商丘市",
		children: [{
			value: "411402",
			text: "梁园区"
		}, {
			value: "411403",
			text: "睢阳区"
		}, {
			value: "411421",
			text: "民权县"
		}, {
			value: "411422",
			text: "睢县"
		}, {
			value: "411423",
			text: "宁陵县"
		}, {
			value: "411424",
			text: "柘城县"
		}, {
			value: "411425",
			text: "虞城县"
		}, {
			value: "411426",
			text: "夏邑县"
		}, {
			value: "411481",
			text: "永城市"
		}, {
			value: "411482",
			text: "其它区"
		}]
	}, {
		value: "411500",
		text: "信阳市",
		children: [{
			value: "411502",
			text: "浉河区"
		}, {
			value: "411503",
			text: "平桥区"
		}, {
			value: "411521",
			text: "罗山县"
		}, {
			value: "411522",
			text: "光山县"
		}, {
			value: "411523",
			text: "新县"
		}, {
			value: "411524",
			text: "商城县"
		}, {
			value: "411525",
			text: "固始县"
		}, {
			value: "411526",
			text: "潢川县"
		}, {
			value: "411527",
			text: "淮滨县"
		}, {
			value: "411528",
			text: "息县"
		}, {
			value: "411529",
			text: "其它区"
		}]
	}, {
		value: "411600",
		text: "周口市",
		children: [{
			value: "411602",
			text: "川汇区"
		}, {
			value: "411621",
			text: "扶沟县"
		}, {
			value: "411622",
			text: "西华县"
		}, {
			value: "411623",
			text: "商水县"
		}, {
			value: "411624",
			text: "沈丘县"
		}, {
			value: "411625",
			text: "郸城县"
		}, {
			value: "411626",
			text: "淮阳县"
		}, {
			value: "411627",
			text: "太康县"
		}, {
			value: "411628",
			text: "鹿邑县"
		}, {
			value: "411681",
			text: "项城市"
		}, {
			value: "411682",
			text: "其它区"
		}]
	}, {
		value: "411700",
		text: "驻马店市",
		children: [{
			value: "411702",
			text: "驿城区"
		}, {
			value: "411721",
			text: "西平县"
		}, {
			value: "411722",
			text: "上蔡县"
		}, {
			value: "411723",
			text: "平舆县"
		}, {
			value: "411724",
			text: "正阳县"
		}, {
			value: "411725",
			text: "确山县"
		}, {
			value: "411726",
			text: "泌阳县"
		}, {
			value: "411727",
			text: "汝南县"
		}, {
			value: "411628",
			text: "遂平县"
		}, {
			value: "411729",
			text: "新蔡县"
		}]
	}]
}, {
	value: '420000',
	text: '湖北省',
	children: [{
		value: "420100",
		text: "武汉市",
		children: [{
			value: "420102",
			text: "江岸区"
		}, {
			value: "420103",
			text: "江汉区"
		}, {
			value: "420104",
			text: "硚口区"
		}, {
			value: "420105",
			text: "汉阳区"
		}, {
			value: "420106",
			text: "武昌区"
		}, {
			value: "420107",
			text: "青山区"
		}, {
			value: "420111",
			text: "洪山区"
		}, {
			value: "420112",
			text: "东西湖区"
		}, {
			value: "420113",
			text: "汉南区"
		}, {
			value: "420114",
			text: "蔡甸区"
		}, {
			value: "420115",
			text: "江夏区"
		}, {
			value: "420116",
			text: "黄陂区"
		}, {
			value: "420117",
			text: "新洲区"
		}, {
			value: "420118",
			text: "其它区"
		}]
	}, {
		value: "420200",
		text: "黄石市",
		children: [{
			value: "420202",
			text: "黄石港区"
		}, {
			value: "420203",
			text: "西塞山区"
		}, {
			value: "420204",
			text: "下陆区"
		}, {
			value: "420205",
			text: "铁山区"
		}, {
			value: "420222",
			text: "阳新县"
		}, {
			value: "420281",
			text: "大冶市"
		}, {
			value: "420282",
			text: "其它区"
		}]
	}, {
		value: "420300",
		text: "十堰市",
		children: [{
			value: "420302",
			text: "茅箭区"
		}, {
			value: "420303",
			text: "张湾区"
		}, {
			value: "420321",
			text: "郧县"
		}, {
			value: "420322",
			text: "郧西县"
		}, {
			value: "420323",
			text: "竹山县"
		}, {
			value: "420324",
			text: "竹溪县"
		}, {
			value: "420325",
			text: "房县"
		}, {
			value: "420381",
			text: "丹江口市"
		}, {
			value: "420382",
			text: "城区"
		}, {
			value: "420383",
			text: "其它区"
		}]
	}, {
		value: "420500",
		text: "宜昌市",
		children: [{
			value: "420502",
			text: "西陵区"
		}, {
			value: "420503",
			text: "伍家岗区"
		}, {
			value: "420504",
			text: "点军区"
		}, {
			value: "420505",
			text: "猇亭区"
		}, {
			value: "420506",
			text: "夷陵区"
		}, {
			value: "420525",
			text: "远安县"
		}, {
			value: "420526",
			text: "兴山县"
		}, {
			value: "420527",
			text: "秭归县"
		}, {
			value: "420528",
			text: "长阳土家族自治县"
		}, {
			value: "420529",
			text: "五峰土家族自治县"
		}, {
			value: "420551",
			text: "葛洲坝区"
		}, {
			value: "420552",
			text: "开发区"
		}, {
			value: "420581",
			text: "宜都市"
		}, {
			value: "420582",
			text: "当阳市"
		}, {
			value: "420583",
			text: "枝江市"
		}, {
			value: "420584",
			text: "其它区"
		}]
	}, {
		value: "420600",
		text: "襄阳市",
		children: [{
			value: "420602",
			text: "襄城区"
		}, {
			value: "420606",
			text: "樊城区"
		}, {
			value: "420607",
			text: "襄州区"
		}, {
			value: "420624",
			text: "南漳县"
		}, {
			value: "420625",
			text: "谷城县"
		}, {
			value: "420626",
			text: "保康县"
		}, {
			value: "420682",
			text: "老河口市"
		}, {
			value: "420683",
			text: "枣阳市"
		}, {
			value: "420684",
			text: "宜城市"
		}, {
			value: "420685",
			text: "其它区"
		}]
	}, {
		value: "420700",
		text: "鄂州市",
		children: [{
			value: "420702",
			text: "梁子湖区"
		}, {
			value: "420703",
			text: "华容区"
		}, {
			value: "420704",
			text: "鄂城区"
		}, {
			value: "420705",
			text: "其它区"
		}]
	}, {
		value: "420800",
		text: "荆门市",
		children: [{
			value: "420802",
			text: "东宝区"
		}, {
			value: "420804",
			text: "掇刀区"
		}, {
			value: "420821",
			text: "京山县"
		}, {
			value: "420822",
			text: "沙洋县"
		}, {
			value: "420881",
			text: "钟祥市"
		}, {
			value: "420882",
			text: "其它区"
		}]
	}, {
		value: "420900",
		text: "孝感市",
		children: [{
			value: "420902",
			text: "孝南区"
		}, {
			value: "420921",
			text: "孝昌县"
		}, {
			value: "420922",
			text: "大悟县"
		}, {
			value: "420923",
			text: "云梦县"
		}, {
			value: "420981",
			text: "应城市"
		}, {
			value: "420982",
			text: "安陆市"
		}, {
			value: "420984",
			text: "汉川市"
		}, {
			value: "420985",
			text: "其它区"
		}]
	}, {
		value: "421000",
		text: "荆州市",
		children: [{
			value: "421002",
			text: "沙市区"
		}, {
			value: "421003",
			text: "荆州区"
		}, {
			value: "421022",
			text: "公安县"
		}, {
			value: "421023",
			text: "监利县"
		}, {
			value: "421024",
			text: "江陵县"
		}, {
			value: "421081",
			text: "石首市"
		}, {
			value: "421083",
			text: "洪湖市"
		}, {
			value: "421087",
			text: "松滋市"
		}, {
			value: "421088",
			text: "其它区"
		}]
	}, {
		value: "421100",
		text: "黄冈市",
		children: [{
			value: "421102",
			text: "黄州区"
		}, {
			value: "421121",
			text: "团风县"
		}, {
			value: "421122",
			text: "红安县"
		}, {
			value: "421123",
			text: "罗田县"
		}, {
			value: "421124",
			text: "英山县"
		}, {
			value: "421125",
			text: "浠水县"
		}, {
			value: "421126",
			text: "蕲春县"
		}, {
			value: "421127",
			text: "黄梅县"
		}, {
			value: "421181",
			text: "麻城市"
		}, {
			value: "421182",
			text: "武穴市"
		}, {
			value: "421183",
			text: "其它区"
		}]
	}, {
		value: "421200",
		text: "咸宁市",
		children: [{
			value: "421202",
			text: "咸安区"
		}, {
			value: "421221",
			text: "嘉鱼县"
		}, {
			value: "421222",
			text: "通城县"
		}, {
			value: "421223",
			text: "崇阳县"
		}, {
			value: "421224",
			text: "通山县"
		}, {
			value: "421281",
			text: "赤壁市"
		}, {
			value: "421282",
			text: "温泉城区"
		}, {
			value: "421283",
			text: "其它区"
		}]
	}, {
		value: "421300",
		text: "随州市",
		children: [{
			value: "421302",
			text: "曾都区"
		}, {
			value: "421321",
			text: "随县"
		}, {
			value: "421381",
			text: "广水市"
		}, {
			value: "421382",
			text: "其它区"
		}]
	}, {
		value: "422800",
		text: "恩施土家族苗族自治州",
		children: [{
			value: "422801",
			text: "恩施市"
		}, {
			value: "422802",
			text: "利川市"
		}, {
			value: "422822",
			text: "建始县"
		}, {
			value: "422823",
			text: "巴东县"
		}, {
			value: "422825",
			text: "宣恩县"
		}, {
			value: "422826",
			text: "咸丰县"
		}, {
			value: "422827",
			text: "来凤县"
		}, {
			value: "422828",
			text: "鹤峰县"
		}, {
			value: "422829",
			text: "其它区"
		}]
	}, {
		value: "429004",
		text: "仙桃市"
	}, {
		value: "429005",
		text: "潜江市"
	}, {
		value: "429006",
		text: "天门市"
	}, {
		value: "429021",
		text: "神农架林区"
	}]
}, {
	value: '430000',
	text: '湖南省',
	children: [{
		value: "430100",
		text: "长沙市",
		children: [{
			value: "430102",
			text: "芙蓉区"
		}, {
			value: "430103",
			text: "天心区"
		}, {
			value: "430104",
			text: "岳麓区"
		}, {
			value: "430105",
			text: "开福区"
		}, {
			value: "430111",
			text: "雨花区"
		}, {
			value: "430121",
			text: "长沙县"
		}, {
			value: "430122",
			text: "望城县"
		}, {
			value: "430124",
			text: "宁乡县"
		}, {
			value: "430181",
			text: "浏阳市"
		}, {
			value: "430182",
			text: "其它区"
		}]
	}, {
		value: "430200",
		text: "株洲市",
		children: [{
			value: "430202",
			text: "荷塘区"
		}, {
			value: "430203",
			text: "芦淞区"
		}, {
			value: "430204",
			text: "石峰区"
		}, {
			value: "430211",
			text: "天元区"
		}, {
			value: "430221",
			text: "株洲县"
		}, {
			value: "430223",
			text: "攸县"
		}, {
			value: "430224",
			text: "茶陵县"
		}, {
			value: "430225",
			text: "炎陵县"
		}, {
			value: "430281",
			text: "醴陵市"
		}, {
			value: "430282",
			text: "其它区"
		}]
	}, {
		value: "430300",
		text: "湘潭市",
		children: [{
			value: "430302",
			text: "雨湖区"
		}, {
			value: "430304",
			text: "岳塘区"
		}, {
			value: "430321",
			text: "湘潭县"
		}, {
			value: "430381",
			text: "湘乡市"
		}, {
			value: "430382",
			text: "韶山市"
		}, {
			value: "430383",
			text: "其它区"
		}]
	}, {
		value: "430400",
		text: "衡阳市",
		children: [{
			value: "430405",
			text: "珠晖区"
		}, {
			value: "430406",
			text: "雁峰区"
		}, {
			value: "430407",
			text: "石鼓区"
		}, {
			value: "430408",
			text: "蒸湘区"
		}, {
			value: "430412",
			text: "南岳区"
		}, {
			value: "430421",
			text: "衡阳县"
		}, {
			value: "430422",
			text: "衡南县"
		}, {
			value: "430423",
			text: "衡山县"
		}, {
			value: "430424",
			text: "衡东县"
		}, {
			value: "430426",
			text: "祁东县"
		}, {
			value: "430481",
			text: "耒阳市"
		}, {
			value: "430482",
			text: "常宁市"
		}, {
			value: "430483",
			text: "其它区"
		}]
	}, {
		value: "430500",
		text: "邵阳市",
		children: [{
			value: "430502",
			text: "双清区"
		}, {
			value: "430503",
			text: "大祥区"
		}, {
			value: "430511",
			text: "北塔区"
		}, {
			value: "430521",
			text: "邵东县"
		}, {
			value: "430522",
			text: "新邵县"
		}, {
			value: "430523",
			text: "邵阳县"
		}, {
			value: "430524",
			text: "隆回县"
		}, {
			value: "430525",
			text: "洞口县"
		}, {
			value: "430527",
			text: "绥宁县"
		}, {
			value: "430528",
			text: "新宁县"
		}, {
			value: "430529",
			text: "城步苗族自治县"
		}, {
			value: "430581",
			text: "武冈市"
		}, {
			value: "430582",
			text: "其它区"
		}]
	}, {
		value: "430600",
		text: "岳阳市",
		children: [{
			value: "430602",
			text: "岳阳楼区"
		}, {
			value: "430603",
			text: "云溪区"
		}, {
			value: "430611",
			text: "君山区"
		}, {
			value: "430621",
			text: "岳阳县"
		}, {
			value: "430623",
			text: "华容县"
		}, {
			value: "430624",
			text: "湘阴县"
		}, {
			value: "430626",
			text: "平江县"
		}, {
			value: "430681",
			text: "汨罗市"
		}, {
			value: "430682",
			text: "临湘市"
		}, {
			value: "430683",
			text: "其它区"
		}]
	}, {
		value: "430700",
		text: "常德市",
		children: [{
			value: "430702",
			text: "武陵区"
		}, {
			value: "430703",
			text: "鼎城区"
		}, {
			value: "430721",
			text: "安乡县"
		}, {
			value: "430722",
			text: "汉寿县"
		}, {
			value: "430723",
			text: "澧县"
		}, {
			value: "430724",
			text: "临澧县"
		}, {
			value: "430725",
			text: "桃源县"
		}, {
			value: "430726",
			text: "石门县"
		}, {
			value: "430781",
			text: "津市市"
		}, {
			value: "430782",
			text: "其它区"
		}]
	}, {
		value: "430800",
		text: "张家界市",
		children: [{
			value: "430802",
			text: "永定区"
		}, {
			value: "430811",
			text: "武陵源区"
		}, {
			value: "430821",
			text: "慈利县"
		}, {
			value: "430822",
			text: "桑植县"
		}, {
			value: "430823",
			text: "其它区"
		}]
	}, {
		value: "430900",
		text: "益阳市",
		children: [{
			value: "430902",
			text: "资阳区"
		}, {
			value: "430903",
			text: "赫山区"
		}, {
			value: "430921",
			text: "南县"
		}, {
			value: "430922",
			text: "桃江县"
		}, {
			value: "430923",
			text: "安化县"
		}, {
			value: "430981",
			text: "沅江市"
		}, {
			value: "430982",
			text: "其它区"
		}]
	}, {
		value: "431000",
		text: "郴州市",
		children: [{
			value: "431002",
			text: "北湖区"
		}, {
			value: "431003",
			text: "苏仙区"
		}, {
			value: "431021",
			text: "桂阳县"
		}, {
			value: "431022",
			text: "宜章县"
		}, {
			value: "431023",
			text: "永兴县"
		}, {
			value: "431024",
			text: "嘉禾县"
		}, {
			value: "431025",
			text: "临武县"
		}, {
			value: "431026",
			text: "汝城县"
		}, {
			value: "431027",
			text: "桂东县"
		}, {
			value: "431028",
			text: "安仁县"
		}, {
			value: "431081",
			text: "资兴市"
		}, {
			value: "431082",
			text: "其它区"
		}]
	}, {
		value: "431100",
		text: "永州市",
		children: [{
			value: "431102",
			text: "零陵区"
		}, {
			value: "431103",
			text: "冷水滩区"
		}, {
			value: "431121",
			text: "祁阳县"
		}, {
			value: "431122",
			text: "东安县"
		}, {
			value: "431123",
			text: "双牌县"
		}, {
			value: "431124",
			text: "道县"
		}, {
			value: "431125",
			text: "江永县"
		}, {
			value: "431126",
			text: "宁远县"
		}, {
			value: "431127",
			text: "蓝山县"
		}, {
			value: "431128",
			text: "新田县"
		}, {
			value: "431129",
			text: "江华瑶族自治县"
		}, {
			value: "431130",
			text: "其它区"
		}]
	}, {
		value: "431200",
		text: "怀化市",
		children: [{
			value: "431202",
			text: "鹤城区"
		}, {
			value: "431221",
			text: "中方县"
		}, {
			value: "431222",
			text: "沅陵县"
		}, {
			value: "431223",
			text: "辰溪县"
		}, {
			value: "431224",
			text: "溆浦县"
		}, {
			value: "431225",
			text: "会同县"
		}, {
			value: "431226",
			text: "麻阳苗族自治县"
		}, {
			value: "431227",
			text: "新晃侗族自治县"
		}, {
			value: "431228",
			text: "芷江侗族自治县"
		}, {
			value: "431229",
			text: "靖州苗族侗族自治县"
		}, {
			value: "431230",
			text: "通道侗族自治县"
		}, {
			value: "431281",
			text: "洪江市"
		}, {
			value: "431282",
			text: "其它区"
		}]
	}, {
		value: "431300",
		text: "娄底市",
		children: [{
			value: "431302",
			text: "娄星区"
		}, {
			value: "431321",
			text: "双峰县"
		}, {
			value: "431322",
			text: "新化县"
		}, {
			value: "431381",
			text: "冷水江市"
		}, {
			value: "431382",
			text: "涟源市"
		}, {
			value: "431383",
			text: "其它区"
		}]
	}, {
		value: "433100",
		text: "湘西土家族苗族自治州",
		children: [{
			value: "433101",
			text: "吉首市"
		}, {
			value: "433122",
			text: "泸溪县"
		}, {
			value: "433123",
			text: "凤凰县"
		}, {
			value: "433124",
			text: "花垣县"
		}, {
			value: "433125",
			text: "保靖县"
		}, {
			value: "433126",
			text: "古丈县"
		}, {
			value: "433127",
			text: "永顺县"
		}, {
			value: "433130",
			text: "龙山县"
		}, {
			value: "433131",
			text: "其它区"
		}]
	}]
}, {
	value: '440000',
	text: '广东省',
	children: [{
		value: "440100",
		text: "广州市",
		children: [{
			value: "440103",
			text: "荔湾区"
		}, {
			value: "440104",
			text: "越秀区"
		}, {
			value: "440105",
			text: "海珠区"
		}, {
			value: "440106",
			text: "天河区"
		}, {
			value: "440111",
			text: "白云区"
		}, {
			value: "440112",
			text: "黄埔区"
		}, {
			value: "440113",
			text: "番禺区"
		}, {
			value: "440114",
			text: "花都区"
		}, {
			value: "440115",
			text: "南沙区"
		}, {
			value: "440116",
			text: "萝岗区"
		}, {
			value: "440183",
			text: "增城市"
		}, {
			value: "440184",
			text: "从化市"
		}, {
			value: "440188",
			text: "东山区"
		}, {
			value: "440189",
			text: "其它区"
		}]
	}, {
		value: "440200",
		text: "韶关市",
		children: [{
			value: "440203",
			text: "武江区"
		}, {
			value: "440204",
			text: "浈江区"
		}, {
			value: "440205",
			text: "曲江区"
		}, {
			value: "440222",
			text: "始兴县"
		}, {
			value: "440224",
			text: "仁化县"
		}, {
			value: "440229",
			text: "翁源县"
		}, {
			value: "440232",
			text: "乳源瑶族自治县"
		}, {
			value: "440233",
			text: "新丰县"
		}, {
			value: "440281",
			text: "乐昌市"
		}, {
			value: "440282",
			text: "南雄市"
		}, {
			value: "440283",
			text: "其它区"
		}]
	}, {
		value: "440300",
		text: "深圳市",
		children: [{
			value: "440303",
			text: "罗湖区"
		}, {
			value: "440304",
			text: "福田区"
		}, {
			value: "440305",
			text: "南山区"
		}, {
			value: "440306",
			text: "宝安区"
		}, {
			value: "440307",
			text: "龙岗区"
		}, {
			value: "440308",
			text: "盐田区"
		}, {
			value: "440309",
			text: "其它区"
		}]
	}, {
		value: "440400",
		text: "珠海市",
		children: [{
			value: "440402",
			text: "香洲区"
		}, {
			value: "440403",
			text: "斗门区"
		}, {
			value: "440404",
			text: "金湾区"
		}, {
			value: "440486",
			text: "金唐区"
		}, {
			value: "440487",
			text: "南湾区"
		}, {
			value: "440488",
			text: "其它区"
		}]
	}, {
		value: "440500",
		text: "汕头市",
		children: [{
			value: "440507",
			text: "龙湖区"
		}, {
			value: "440511",
			text: "金平区"
		}, {
			value: "440512",
			text: "濠江区"
		}, {
			value: "440513",
			text: "潮阳区"
		}, {
			value: "440514",
			text: "潮南区"
		}, {
			value: "440515",
			text: "澄海区"
		}, {
			value: "440523",
			text: "南澳县"
		}, {
			value: "440524",
			text: "其它区"
		}]
	}, {
		value: "440600",
		text: "佛山市",
		children: [{
			value: "440604",
			text: "禅城区"
		}, {
			value: "440605",
			text: "南海区"
		}, {
			value: "440606",
			text: "顺德区"
		}, {
			value: "440607",
			text: "三水区"
		}, {
			value: "440608",
			text: "高明区"
		}, {
			value: "440609",
			text: "其它区"
		}]
	}, {
		value: "440700",
		text: "江门市",
		children: [{
			value: "440703",
			text: "蓬江区"
		}, {
			value: "440704",
			text: "江海区"
		}, {
			value: "440705",
			text: "新会区"
		}, {
			value: "440781",
			text: "台山市"
		}, {
			value: "440783",
			text: "开平市"
		}, {
			value: "440784",
			text: "鹤山市"
		}, {
			value: "440785",
			text: "恩平市"
		}, {
			value: "440786",
			text: "其它区"
		}]
	}, {
		value: "440800",
		text: "湛江市",
		children: [{
			value: "440802",
			text: "赤坎区"
		}, {
			value: "440803",
			text: "霞山区"
		}, {
			value: "440804",
			text: "坡头区"
		}, {
			value: "440811",
			text: "麻章区"
		}, {
			value: "440823",
			text: "遂溪县"
		}, {
			value: "440825",
			text: "徐闻县"
		}, {
			value: "440881",
			text: "廉江市"
		}, {
			value: "440882",
			text: "雷州市"
		}, {
			value: "440883",
			text: "吴川市"
		}, {
			value: "440884",
			text: "其它区"
		}]
	}, {
		value: "440900",
		text: "茂名市",
		children: [{
			value: "440902",
			text: "茂南区"
		}, {
			value: "440903",
			text: "茂港区"
		}, {
			value: "440923",
			text: "电白县"
		}, {
			value: "440981",
			text: "高州市"
		}, {
			value: "440982",
			text: "化州市"
		}, {
			value: "440983",
			text: "信宜市"
		}, {
			value: "440984",
			text: "其它区"
		}]
	}, {
		value: "441200",
		text: "肇庆市",
		children: [{
			value: "441202",
			text: "端州区"
		}, {
			value: "441203",
			text: "鼎湖区"
		}, {
			value: "441223",
			text: "广宁县"
		}, {
			value: "441224",
			text: "怀集县"
		}, {
			value: "441225",
			text: "封开县"
		}, {
			value: "441226",
			text: "德庆县"
		}, {
			value: "441283",
			text: "高要市"
		}, {
			value: "441284",
			text: "四会市"
		}, {
			value: "441285",
			text: "其它区"
		}]
	}, {
		value: "441300",
		text: "惠州市",
		children: [{
			value: "441302",
			text: "惠城区"
		}, {
			value: "441303",
			text: "惠阳区"
		}, {
			value: "441322",
			text: "博罗县"
		}, {
			value: "441323",
			text: "惠东县"
		}, {
			value: "441324",
			text: "龙门县"
		}, {
			value: "441325",
			text: "其它区"
		}]
	}, {
		value: "441400",
		text: "梅州市",
		children: [{
			value: "441402",
			text: "梅江区"
		}, {
			value: "441421",
			text: "梅县"
		}, {
			value: "441422",
			text: "大埔县"
		}, {
			value: "441423",
			text: "丰顺县"
		}, {
			value: "441424",
			text: "五华县"
		}, {
			value: "441426",
			text: "平远县"
		}, {
			value: "441427",
			text: "蕉岭县"
		}, {
			value: "441481",
			text: "兴宁市"
		}, {
			value: "441482",
			text: "其它区"
		}]
	}, {
		value: "441500",
		text: "汕尾市",
		children: [{
			value: "441502",
			text: "城区"
		}, {
			value: "441521",
			text: "海丰县"
		}, {
			value: "441523",
			text: "陆河县"
		}, {
			value: "441581",
			text: "陆丰市"
		}, {
			value: "441582",
			text: "其它区"
		}]
	}, {
		value: "441600",
		text: "河源市",
		children: [{
			value: "441602",
			text: "源城区"
		}, {
			value: "441621",
			text: "紫金县"
		}, {
			value: "441622",
			text: "龙川县"
		}, {
			value: "441623",
			text: "连平县"
		}, {
			value: "441624",
			text: "和平县"
		}, {
			value: "441625",
			text: "东源县"
		}, {
			value: "441626",
			text: "其它区"
		}]
	}, {
		value: "441700",
		text: "阳江市",
		children: [{
			value: "441702",
			text: "江城区"
		}, {
			value: "441721",
			text: "阳西县"
		}, {
			value: "441723",
			text: "阳东县"
		}, {
			value: "441781",
			text: "阳春市"
		}, {
			value: "441782",
			text: "其它区"
		}]
	}, {
		value: "441800",
		text: "清远市",
		children: [{
			value: "441802",
			text: "清城区"
		}, {
			value: "441821",
			text: "佛冈县"
		}, {
			value: "441823",
			text: "阳山县"
		}, {
			value: "441825",
			text: "连山壮族瑶族自治县"
		}, {
			value: "441826",
			text: "连南瑶族自治县"
		}, {
			value: "441827",
			text: "清新县"
		}, {
			value: "441881",
			text: "英德市"
		}, {
			value: "441882",
			text: "连州市"
		}, {
			value: "441883",
			text: "其它区"
		}]
	}, {
		value: "441900",
		text: "东莞市",
		children: [{
			value: "445102",
			text: "莞城区"
		}, {
			value: "445121",
			text: "东城区"
		}, {
			value: "445122",
			text: "南城区"
		}, {
			value: "445121",
			text: "万江区"
		}, {
			value: "445122",
			text: "长安镇"
		}, {
			value: "445121",
			text: "虎门镇"
		}, {
			value: "445122",
			text: "厚街镇"
		}, {
			value: "445121",
			text: "大朗镇"
		}, {
			value: "445122",
			text: "黄江镇"
		}, {
			value: "445122",
			text: "中堂镇"
		}, {
			value: "445122",
			text: "麻涌镇"
		}, {
			value: "445122",
			text: "高埗镇"
		}, {
			value: "445122",
			text: "石碣镇"
		}, {
			value: "445122",
			text: "石龙镇"
		}, {
			value: "445122",
			text: "企石镇"
		}, {
			value: "445122",
			text: "石排镇"
		}, {
			value: "445122",
			text: "常平镇"
		}, {
			value: "445122",
			text: "洪梅镇"
		}, {
			value: "445122",
			text: "道滘镇"
		}, {
			value: "445122",
			text: "沙田镇"
		}, {
			value: "445122",
			text: "凤岗镇"
		}, {
			value: "445122",
			text: "谢岗镇"
		}, {
			value: "445122",
			text: "横沥镇"
		}, {
			value: "445122",
			text: "寮步镇"
		}, {
			value: "445122",
			text: "桥头镇"
		}, {
			value: "445122",
			text: "东坑镇"
		}, {
			value: "445122",
			text: "清溪镇"
		}, {
			value: "445122",
			text: "塘厦镇"
		}, {
			value: "445122",
			text: "大岭山镇"
		}, {
			value: "445122",
			text: "望牛墩镇"
		}, {
			value: "445122",
			text: "樟木头镇"

		}]

	}, {
		value: "442000",
		text: "中山市",
		children: [{
			value: "445102",
			text: "东区"
		}, {
			value: "445121",
			text: "南区"
		}, {
			value: "445122",
			text: "石岐区"
		}, {
			value: "445185",
			text: "西区"
		}, {
			value: "445186",
			text: "五桂山区"
		}, {
			value: "445121",
			text: "板芙镇"
		}, {
			value: "445122",
			text: "大涌镇"
		}, {
			value: "445185",
			text: "东凤镇"
		}, {
			value: "445121",
			text: "东升镇"
		}, {
			value: "445122",
			text: "阜沙镇"
		}, {
			value: "445185",
			text: "港口镇"
		}, {
			value: "445186",
			text: "古镇镇"
		}, {
			value: "445121",
			text: "横栏镇"
		}, {
			value: "445122",
			text: "黄圃镇"
		}, {
			value: "445185",
			text: "民众镇"
		}, {
			value: "445185",
			text: "南朗镇"
		}, {
			value: "445121",
			text: "南头镇"
		}, {
			value: "445122",
			text: "三角镇"
		}, {
			value: "445185",
			text: "三乡镇"
		}, {
			value: "445186",
			text: "沙溪镇"
		}, {
			value: "445121",
			text: "神湾镇"
		}, {
			value: "445122",
			text: "坦洲镇"
		}, {
			value: "445185",
			text: "小榄镇"
		}]
	}, {
		value: "445100",
		text: "潮州市",
		children: [{
			value: "445102",
			text: "湘桥区"
		}, {
			value: "445121",
			text: "潮安县"
		}, {
			value: "445122",
			text: "饶平县"
		}, {
			value: "445185",
			text: "枫溪区"
		}, {
			value: "445186",
			text: "其它区"
		}]
	}, {
		value: "445200",
		text: "揭阳市",
		children: [{
			value: "445202",
			text: "榕城区"
		}, {
			value: "445221",
			text: "揭东县"
		}, {
			value: "445222",
			text: "揭西县"
		}, {
			value: "445224",
			text: "惠来县"
		}, {
			value: "445281",
			text: "普宁市"
		}, {
			value: "445284",
			text: "东山区"
		}, {
			value: "445285",
			text: "其它区"
		}]
	}, {
		value: "445300",
		text: "云浮市",
		children: [{
			value: "445302",
			text: "云城区"
		}, {
			value: "445321",
			text: "新兴县"
		}, {
			value: "445322",
			text: "郁南县"
		}, {
			value: "445323",
			text: "云安县"
		}, {
			value: "445381",
			text: "罗定市"
		}, {
			value: "445382",
			text: "其它区"
		}]
	}]
}, {
	value: '450000',
	text: '广西壮族',
	children: [{
		value: "450100",
		text: "南宁市",
		children: [{
			value: "450102",
			text: "兴宁区"
		}, {
			value: "450103",
			text: "青秀区"
		}, {
			value: "450105",
			text: "江南区"
		}, {
			value: "450107",
			text: "西乡塘区"
		}, {
			value: "450108",
			text: "良庆区"
		}, {
			value: "450109",
			text: "邕宁区"
		}, {
			value: "450122",
			text: "武鸣县"
		}, {
			value: "450123",
			text: "隆安县"
		}, {
			value: "450124",
			text: "马山县"
		}, {
			value: "450125",
			text: "上林县"
		}, {
			value: "450126",
			text: "宾阳县"
		}, {
			value: "450127",
			text: "横县"
		}, {
			value: "450128",
			text: "其它区"
		}]
	}, {
		value: "450200",
		text: "柳州市",
		children: [{
			value: "450202",
			text: "城中区"
		}, {
			value: "450203",
			text: "鱼峰区"
		}, {
			value: "450204",
			text: "柳南区"
		}, {
			value: "450205",
			text: "柳北区"
		}, {
			value: "450221",
			text: "柳江县"
		}, {
			value: "450222",
			text: "柳城县"
		}, {
			value: "450223",
			text: "鹿寨县"
		}, {
			value: "450224",
			text: "融安县"
		}, {
			value: "450225",
			text: "融水苗族自治县"
		}, {
			value: "450226",
			text: "三江侗族自治县"
		}, {
			value: "450227",
			text: "其它区"
		}]
	}, {
		value: "450300",
		text: "桂林市",
		children: [{
			value: "450302",
			text: "秀峰区"
		}, {
			value: "450303",
			text: "叠彩区"
		}, {
			value: "450304",
			text: "象山区"
		}, {
			value: "450305",
			text: "七星区"
		}, {
			value: "450311",
			text: "雁山区"
		}, {
			value: "450321",
			text: "阳朔县"
		}, {
			value: "450322",
			text: "临桂县"
		}, {
			value: "450323",
			text: "灵川县"
		}, {
			value: "450324",
			text: "全州县"
		}, {
			value: "450325",
			text: "兴安县"
		}, {
			value: "450326",
			text: "永福县"
		}, {
			value: "450327",
			text: "灌阳县"
		}, {
			value: "450328",
			text: "龙胜各族自治县"
		}, {
			value: "450329",
			text: "资源县"
		}, {
			value: "450330",
			text: "平乐县"
		}, {
			value: "450331",
			text: "荔浦县"
		}, {
			value: "450332",
			text: "恭城瑶族自治县"
		}, {
			value: "450333",
			text: "其它区"
		}]
	}, {
		value: "450400",
		text: "梧州市",
		children: [{
			value: "450403",
			text: "万秀区"
		}, {
			value: "450404",
			text: "蝶山区"
		}, {
			value: "450405",
			text: "长洲区"
		}, {
			value: "450421",
			text: "苍梧县"
		}, {
			value: "450422",
			text: "藤县"
		}, {
			value: "450423",
			text: "蒙山县"
		}, {
			value: "450481",
			text: "岑溪市"
		}, {
			value: "450482",
			text: "其它区"
		}]
	}, {
		value: "450500",
		text: "北海市",
		children: [{
			value: "450502",
			text: "海城区"
		}, {
			value: "450503",
			text: "银海区"
		}, {
			value: "450512",
			text: "铁山港区"
		}, {
			value: "450521",
			text: "合浦县"
		}, {
			value: "450522",
			text: "其它区"
		}]
	}, {
		value: "450600",
		text: "防城港市",
		children: [{
			value: "450602",
			text: "港口区"
		}, {
			value: "450603",
			text: "防城区"
		}, {
			value: "450621",
			text: "上思县"
		}, {
			value: "450681",
			text: "东兴市"
		}, {
			value: "450682",
			text: "其它区"
		}]
	}, {
		value: "450700",
		text: "钦州市",
		children: [{
			value: "450702",
			text: "钦南区"
		}, {
			value: "450703",
			text: "钦北区"
		}, {
			value: "450721",
			text: "灵山县"
		}, {
			value: "450722",
			text: "浦北县"
		}, {
			value: "450723",
			text: "其它区"
		}]
	}, {
		value: "450800",
		text: "贵港市",
		children: [{
			value: "450802",
			text: "港北区"
		}, {
			value: "450803",
			text: "港南区"
		}, {
			value: "450804",
			text: "覃塘区"
		}, {
			value: "450821",
			text: "平南县"
		}, {
			value: "450881",
			text: "桂平市"
		}, {
			value: "450882",
			text: "其它区"
		}]
	}, {
		value: "450900",
		text: "玉林市",
		children: [{
			value: "450902",
			text: "玉州区"
		}, {
			value: "450921",
			text: "容县"
		}, {
			value: "450922",
			text: "陆川县"
		}, {
			value: "450923",
			text: "博白县"
		}, {
			value: "450924",
			text: "兴业县"
		}, {
			value: "450981",
			text: "北流市"
		}, {
			value: "450982",
			text: "其它区"
		}]
	}, {
		value: "451000",
		text: "百色市",
		children: [{
			value: "451002",
			text: "右江区"
		}, {
			value: "451021",
			text: "田阳县"
		}, {
			value: "451022",
			text: "田东县"
		}, {
			value: "451023",
			text: "平果县"
		}, {
			value: "451024",
			text: "德保县"
		}, {
			value: "451025",
			text: "靖西县"
		}, {
			value: "451026",
			text: "那坡县"
		}, {
			value: "451027",
			text: "凌云县"
		}, {
			value: "451028",
			text: "乐业县"
		}, {
			value: "451029",
			text: "田林县"
		}, {
			value: "451030",
			text: "西林县"
		}, {
			value: "451031",
			text: "隆林各族自治县"
		}, {
			value: "451032",
			text: "其它区"
		}]
	}, {
		value: "451100",
		text: "贺州市",
		children: [{
			value: "451102",
			text: "八步区"
		}, {
			value: "451121",
			text: "昭平县"
		}, {
			value: "451122",
			text: "钟山县"
		}, {
			value: "451123",
			text: "富川瑶族自治县"
		}, {
			value: "451124",
			text: "其它区"
		}]
	}, {
		value: "451200",
		text: "河池市",
		children: [{
			value: "451202",
			text: "金城江区"
		}, {
			value: "451221",
			text: "南丹县"
		}, {
			value: "451222",
			text: "天峨县"
		}, {
			value: "451223",
			text: "凤山县"
		}, {
			value: "451224",
			text: "东兰县"
		}, {
			value: "451225",
			text: "罗城仫佬族自治县"
		}, {
			value: "451226",
			text: "环江毛南族自治县"
		}, {
			value: "451227",
			text: "巴马瑶族自治县"
		}, {
			value: "451228",
			text: "都安瑶族自治县"
		}, {
			value: "451229",
			text: "大化瑶族自治县"
		}, {
			value: "451281",
			text: "宜州市"
		}, {
			value: "451282",
			text: "其它区"
		}]
	}, {
		value: "451300",
		text: "来宾市",
		children: [{
			value: "451302",
			text: "兴宾区"
		}, {
			value: "451321",
			text: "忻城县"
		}, {
			value: "451322",
			text: "象州县"
		}, {
			value: "451323",
			text: "武宣县"
		}, {
			value: "451324",
			text: "金秀瑶族自治县"
		}, {
			value: "451381",
			text: "合山市"
		}, {
			value: "451382",
			text: "其它区"
		}]
	}, {
		value: "451400",
		text: "崇左市",
		children: [{
			value: "451402",
			text: "江洲区"
		}, {
			value: "451421",
			text: "扶绥县"
		}, {
			value: "451422",
			text: "宁明县"
		}, {
			value: "451423",
			text: "龙州县"
		}, {
			value: "451424",
			text: "大新县"
		}, {
			value: "451425",
			text: "天等县"
		}, {
			value: "451481",
			text: "凭祥市"
		}, {
			value: "451482",
			text: "其它区"
		}]
	}]
}, {
	value: '460000',
	text: '海南省',
	children: [{
		value: "460100",
		text: "海口市",
		children: [{
			value: "460105",
			text: "秀英区"
		}, {
			value: "460106",
			text: "龙华区"
		}, {
			value: "460107",
			text: "琼山区"
		}, {
			value: "460108",
			text: "美兰区"
		}, {
			value: "460109",
			text: "其它区"
		}]
	}, {
		value: "460200",
		text: "三亚市"
	}, {
		value: "469001",
		text: "五指山市"
	}, {
		value: "469002",
		text: "琼海市"
	}, {
		value: "469003",
		text: "儋州市"
	}, {
		value: "469005",
		text: "文昌市"
	}, {
		value: "469006",
		text: "万宁市"
	}, {
		value: "469007",
		text: "东方市"
	}, {
		value: "469025",
		text: "定安县"
	}, {
		value: "469026",
		text: "屯昌县"
	}, {
		value: "469027",
		text: "澄迈县"
	}, {
		value: "469028",
		text: "临高县"
	}, {
		value: "469030",
		text: "白沙黎族自治县"
	}, {
		value: "469031",
		text: "昌江黎族自治县"
	}, {
		value: "469033",
		text: "乐东黎族自治县"
	}, {
		value: "469034",
		text: "陵水黎族自治县"
	}, {
		value: "469035",
		text: "保亭黎族苗族自治县"
	}, {
		value: "469036",
		text: "琼中黎族苗族自治县"
	}, {
		value: "469037",
		text: "西沙群岛"
	}, {
		value: "469038",
		text: "南沙群岛"
	}, {
		value: "469039",
		text: "中沙群岛的岛礁及其海域"
	}]
}, {
	value: '500000',
	text: '重庆',
	children: [{
		value: '500000',
		text: '重庆',
		children: [{
			value: "500101",
			text: "万州区"
		}, {
			value: "500102",
			text: "涪陵区"
		}, {
			value: "500103",
			text: "渝中区"
		}, {
			value: "500104",
			text: "大渡口区"
		}, {
			value: "500105",
			text: "江北区"
		}, {
			value: "500106",
			text: "沙坪坝区"
		}, {
			value: "500107",
			text: "九龙坡区"
		}, {
			value: "500108",
			text: "南岸区"
		}, {
			value: "500109",
			text: "北碚区"
		}, {
			value: "500110",
			text: "万盛区"
		}, {
			value: "500111",
			text: "双桥区"
		}, {
			value: "500112",
			text: "渝北区"
		}, {
			value: "500113",
			text: "巴南区"
		}, {
			value: "500114",
			text: "黔江区"
		}, {
			value: "500115",
			text: "长寿区"
		}, {
			value: "500222",
			text: "綦江县"
		}, {
			value: "500223",
			text: "潼南县"
		}, {
			value: "500224",
			text: "铜梁县"
		}, {
			value: "500225",
			text: "大足县"
		}, {
			value: "500226",
			text: "荣昌县"
		}, {
			value: "500227",
			text: "璧山县"
		}, {
			value: "500228",
			text: "梁平县"
		}, {
			value: "500229",
			text: "城口县"
		}, {
			value: "500230",
			text: "丰都县"
		}, {
			value: "500231",
			text: "垫江县"
		}, {
			value: "500232",
			text: "武隆县"
		}, {
			value: "500233",
			text: "忠县"
		}, {
			value: "500234",
			text: "开县"
		}, {
			value: "500235",
			text: "云阳县"
		}, {
			value: "500236",
			text: "奉节县"
		}, {
			value: "500237",
			text: "巫山县"
		}, {
			value: "500238",
			text: "巫溪县"
		}, {
			value: "500240",
			text: "石柱土家族自治县"
		}, {
			value: "500241",
			text: "秀山土家族苗族自治县"
		}, {
			value: "500242",
			text: "酉阳土家族苗族自治县"
		}, {
			value: "500243",
			text: "彭水苗族土家族自治县"
		}, {
			value: "500381",
			text: "江津区"
		}, {
			value: "500382",
			text: "合川区"
		}, {
			value: "500383",
			text: "永川区"
		}, {
			value: "500384",
			text: "南川区"
		}, {
			value: "500385",
			text: "其它区"
		}]
	}]
}, {
	value: '510000',
	text: '四川省',
	children: [{
		value: "510100",
		text: "成都市",
		children: [{
			value: "510104",
			text: "锦江区"
		}, {
			value: "510105",
			text: "青羊区"
		}, {
			value: "510106",
			text: "金牛区"
		}, {
			value: "510107",
			text: "武侯区"
		}, {
			value: "510108",
			text: "成华区"
		}, {
			value: "510112",
			text: "龙泉驿区"
		}, {
			value: "510113",
			text: "青白江区"
		}, {
			value: "510114",
			text: "新都区"
		}, {
			value: "510115",
			text: "温江区"
		}, {
			value: "510121",
			text: "金堂县"
		}, {
			value: "510122",
			text: "双流县"
		}, {
			value: "510124",
			text: "郫县"
		}, {
			value: "510129",
			text: "大邑县"
		}, {
			value: "510131",
			text: "蒲江县"
		}, {
			value: "510132",
			text: "新津县"
		}, {
			value: "510181",
			text: "都江堰市"
		}, {
			value: "510182",
			text: "彭州市"
		}, {
			value: "510183",
			text: "邛崃市"
		}, {
			value: "510184",
			text: "崇州市"
		}, {
			value: "510185",
			text: "其它区"
		}]
	}, {
		value: "510300",
		text: "自贡市",
		children: [{
			value: "510302",
			text: "自流井区"
		}, {
			value: "510303",
			text: "贡井区"
		}, {
			value: "510304",
			text: "大安区"
		}, {
			value: "510311",
			text: "沿滩区"
		}, {
			value: "510321",
			text: "荣县"
		}, {
			value: "510322",
			text: "富顺县"
		}, {
			value: "510323",
			text: "其它区"
		}]
	}, {
		value: "510400",
		text: "攀枝花市",
		children: [{
			value: "510402",
			text: "东区"
		}, {
			value: "510403",
			text: "西区"
		}, {
			value: "510411",
			text: "仁和区"
		}, {
			value: "510421",
			text: "米易县"
		}, {
			value: "510422",
			text: "盐边县"
		}, {
			value: "510423",
			text: "其它区"
		}]
	}, {
		value: "510500",
		text: "泸州市",
		children: [{
			value: "510502",
			text: "江阳区"
		}, {
			value: "510503",
			text: "纳溪区"
		}, {
			value: "510504",
			text: "龙马潭区"
		}, {
			value: "510521",
			text: "泸县"
		}, {
			value: "510522",
			text: "合江县"
		}, {
			value: "510524",
			text: "叙永县"
		}, {
			value: "510525",
			text: "古蔺县"
		}, {
			value: "510526",
			text: "其它区"
		}]
	}, {
		value: "510600",
		text: "德阳市",
		children: [{
			value: "510603",
			text: "旌阳区"
		}, {
			value: "510623",
			text: "中江县"
		}, {
			value: "510626",
			text: "罗江县"
		}, {
			value: "510681",
			text: "广汉市"
		}, {
			value: "510682",
			text: "什邡市"
		}, {
			value: "510683",
			text: "绵竹市"
		}, {
			value: "510684",
			text: "其它区"
		}]
	}, {
		value: "510700",
		text: "绵阳市",
		children: [{
			value: "510703",
			text: "涪城区"
		}, {
			value: "510704",
			text: "游仙区"
		}, {
			value: "510722",
			text: "三台县"
		}, {
			value: "510723",
			text: "盐亭县"
		}, {
			value: "510724",
			text: "安县"
		}, {
			value: "510725",
			text: "梓潼县"
		}, {
			value: "510726",
			text: "北川羌族自治县"
		}, {
			value: "510727",
			text: "平武县"
		}, {
			value: "510751",
			text: "高新区"
		}, {
			value: "510781",
			text: "江油市"
		}, {
			value: "510782",
			text: "其它区"
		}]
	}, {
		value: "510800",
		text: "广元市",
		children: [{
			value: "510802",
			text: "利州区"
		}, {
			value: "510811",
			text: "元坝区"
		}, {
			value: "510812",
			text: "朝天区"
		}, {
			value: "510821",
			text: "旺苍县"
		}, {
			value: "510822",
			text: "青川县"
		}, {
			value: "510823",
			text: "剑阁县"
		}, {
			value: "510824",
			text: "苍溪县"
		}, {
			value: "510825",
			text: "其它区"
		}]
	}, {
		value: "510900",
		text: "遂宁市",
		children: [{
			value: "510903",
			text: "船山区"
		}, {
			value: "510904",
			text: "安居区"
		}, {
			value: "510921",
			text: "蓬溪县"
		}, {
			value: "510922",
			text: "射洪县"
		}, {
			value: "510923",
			text: "大英县"
		}, {
			value: "510924",
			text: "其它区"
		}]
	}, {
		value: "511000",
		text: "内江市",
		children: [{
			value: "511002",
			text: "市中区"
		}, {
			value: "511011",
			text: "东兴区"
		}, {
			value: "511024",
			text: "威远县"
		}, {
			value: "511025",
			text: "资中县"
		}, {
			value: "511028",
			text: "隆昌县"
		}, {
			value: "511029",
			text: "其它区"
		}]
	}, {
		value: "511100",
		text: "乐山市",
		children: [{
			value: "511102",
			text: "市中区"
		}, {
			value: "511111",
			text: "沙湾区"
		}, {
			value: "511112",
			text: "五通桥区"
		}, {
			value: "511113",
			text: "金口河区"
		}, {
			value: "511123",
			text: "犍为县"
		}, {
			value: "511124",
			text: "井研县"
		}, {
			value: "511126",
			text: "夹江县"
		}, {
			value: "511129",
			text: "沐川县"
		}, {
			value: "511132",
			text: "峨边彝族自治县"
		}, {
			value: "511133",
			text: "马边彝族自治县"
		}, {
			value: "511181",
			text: "峨眉山市"
		}, {
			value: "511182",
			text: "其它区"
		}]
	}, {
		value: "511300",
		text: "南充市",
		children: [{
			value: "511302",
			text: "顺庆区"
		}, {
			value: "511303",
			text: "高坪区"
		}, {
			value: "511304",
			text: "嘉陵区"
		}, {
			value: "511321",
			text: "南部县"
		}, {
			value: "511322",
			text: "营山县"
		}, {
			value: "511323",
			text: "蓬安县"
		}, {
			value: "511324",
			text: "仪陇县"
		}, {
			value: "511325",
			text: "西充县"
		}, {
			value: "511381",
			text: "阆中市"
		}, {
			value: "511382",
			text: "其它区"
		}]
	}, {
		value: "511400",
		text: "眉山市",
		children: [{
			value: "511402",
			text: "东坡区"
		}, {
			value: "511421",
			text: "仁寿县"
		}, {
			value: "511422",
			text: "彭山县"
		}, {
			value: "511423",
			text: "洪雅县"
		}, {
			value: "511424",
			text: "丹棱县"
		}, {
			value: "511425",
			text: "青神县"
		}, {
			value: "511426",
			text: "其它区"
		}]
	}, {
		value: "511500",
		text: "宜宾市",
		children: [{
			value: "511502",
			text: "翠屏区"
		}, {
			value: "511521",
			text: "宜宾县"
		}, {
			value: "511522",
			text: "南溪县"
		}, {
			value: "511523",
			text: "江安县"
		}, {
			value: "511524",
			text: "长宁县"
		}, {
			value: "511525",
			text: "高县"
		}, {
			value: "511526",
			text: "珙县"
		}, {
			value: "511527",
			text: "筠连县"
		}, {
			value: "511528",
			text: "兴文县"
		}, {
			value: "511529",
			text: "屏山县"
		}, {
			value: "511530",
			text: "其它区"
		}]
	}, {
		value: "511600",
		text: "广安市",
		children: [{
			value: "511602",
			text: "广安区"
		}, {
			value: "511621",
			text: "岳池县"
		}, {
			value: "511622",
			text: "武胜县"
		}, {
			value: "511623",
			text: "邻水县"
		}, {
			value: "511681",
			text: "华蓥市"
		}, {
			value: "511682",
			text: "市辖区"
		}, {
			value: "511683",
			text: "其它区"
		}]
	}, {
		value: "511700",
		text: "达州市",
		children: [{
			value: "511702",
			text: "通川区"
		}, {
			value: "511721",
			text: "达县"
		}, {
			value: "511722",
			text: "宣汉县"
		}, {
			value: "511723",
			text: "开江县"
		}, {
			value: "511724",
			text: "大竹县"
		}, {
			value: "511725",
			text: "渠县"
		}, {
			value: "511781",
			text: "万源市"
		}, {
			value: "511782",
			text: "其它区"
		}]
	}, {
		value: "511800",
		text: "雅安市",
		children: [{
			value: "511802",
			text: "雨城区"
		}, {
			value: "511821",
			text: "名山县"
		}, {
			value: "511822",
			text: "荥经县"
		}, {
			value: "511823",
			text: "汉源县"
		}, {
			value: "511824",
			text: "石棉县"
		}, {
			value: "511825",
			text: "天全县"
		}, {
			value: "511826",
			text: "芦山县"
		}, {
			value: "511827",
			text: "宝兴县"
		}, {
			value: "511828",
			text: "其它区"
		}]
	}, {
		value: "511900",
		text: "巴中市",
		children: [{
			value: "511902",
			text: "巴州区"
		}, {
			value: "511921",
			text: "通江县"
		}, {
			value: "511922",
			text: "南江县"
		}, {
			value: "511923",
			text: "平昌县"
		}, {
			value: "511924",
			text: "其它区"
		}]
	}, {
		value: "512000",
		text: "资阳市",
		children: [{
			value: "512002",
			text: "雁江区"
		}, {
			value: "512021",
			text: "安岳县"
		}, {
			value: "512022",
			text: "乐至县"
		}, {
			value: "512081",
			text: "简阳市"
		}, {
			value: "512082",
			text: "其它区"
		}]
	}, {
		value: "513200",
		text: "阿坝藏族羌族自治州",
		children: [{
			value: "513221",
			text: "汶川县"
		}, {
			value: "513222",
			text: "理县"
		}, {
			value: "513223",
			text: "茂县"
		}, {
			value: "513224",
			text: "松潘县"
		}, {
			value: "513225",
			text: "九寨沟县"
		}, {
			value: "513226",
			text: "金川县"
		}, {
			value: "513227",
			text: "小金县"
		}, {
			value: "513228",
			text: "黑水县"
		}, {
			value: "513229",
			text: "马尔康县"
		}, {
			value: "513230",
			text: "壤塘县"
		}, {
			value: "513231",
			text: "阿坝县"
		}, {
			value: "513232",
			text: "若尔盖县"
		}, {
			value: "513233",
			text: "红原县"
		}, {
			value: "513234",
			text: "其它区"
		}]
	}, {
		value: "513300",
		text: "甘孜藏族自治州",
		children: [{
			value: "513321",
			text: "康定县"
		}, {
			value: "513322",
			text: "泸定县"
		}, {
			value: "513323",
			text: "丹巴县"
		}, {
			value: "513324",
			text: "九龙县"
		}, {
			value: "513325",
			text: "雅江县"
		}, {
			value: "513326",
			text: "道孚县"
		}, {
			value: "513327",
			text: "炉霍县"
		}, {
			value: "513328",
			text: "甘孜县"
		}, {
			value: "513329",
			text: "新龙县"
		}, {
			value: "513330",
			text: "德格县"
		}, {
			value: "513331",
			text: "白玉县"
		}, {
			value: "513332",
			text: "石渠县"
		}, {
			value: "513333",
			text: "色达县"
		}, {
			value: "513334",
			text: "理塘县"
		}, {
			value: "513335",
			text: "巴塘县"
		}, {
			value: "513336",
			text: "乡城县"
		}, {
			value: "513337",
			text: "稻城县"
		}, {
			value: "513338",
			text: "得荣县"
		}, {
			value: "513339",
			text: "其它区"
		}]
	}, {
		value: "513400",
		text: "凉山彝族自治州",
		children: [{
			value: "513401",
			text: "西昌市"
		}, {
			value: "513422",
			text: "木里藏族自治县"
		}, {
			value: "513423",
			text: "盐源县"
		}, {
			value: "513424",
			text: "德昌县"
		}, {
			value: "513425",
			text: "会理县"
		}, {
			value: "513426",
			text: "会东县"
		}, {
			value: "513427",
			text: "宁南县"
		}, {
			value: "513428",
			text: "普格县"
		}, {
			value: "513429",
			text: "布拖县"
		}, {
			value: "513430",
			text: "金阳县"
		}, {
			value: "513431",
			text: "昭觉县"
		}, {
			value: "513432",
			text: "喜德县"
		}, {
			value: "513433",
			text: "冕宁县"
		}, {
			value: "513434",
			text: "越西县"
		}, {
			value: "513435",
			text: "甘洛县"
		}, {
			value: "513436",
			text: "美姑县"
		}, {
			value: "513437",
			text: "雷波县"
		}, {
			value: "513438",
			text: "其它区"
		}]
	}]
}, {
	value: '520000',
	text: '贵州省',
	children: [{
		value: "520100",
		text: "贵阳市",
		children: [{
			value: "520102",
			text: "南明区"
		}, {
			value: "520103",
			text: "云岩区"
		}, {
			value: "520111",
			text: "花溪区"
		}, {
			value: "520112",
			text: "乌当区"
		}, {
			value: "520113",
			text: "白云区"
		}, {
			value: "520114",
			text: "小河区"
		}, {
			value: "520121",
			text: "开阳县"
		}, {
			value: "520122",
			text: "息烽县"
		}, {
			value: "520123",
			text: "修文县"
		}, {
			value: "520151",
			text: "金阳开发区"
		}, {
			value: "520181",
			text: "清镇市"
		}, {
			value: "520182",
			text: "其它区"
		}]
	}, {
		value: "520200",
		text: "六盘水市",
		children: [{
			value: "520201",
			text: "钟山区"
		}, {
			value: "520203",
			text: "六枝特区"
		}, {
			value: "520221",
			text: "水城县"
		}, {
			value: "520222",
			text: "盘县"
		}, {
			value: "520223",
			text: "其它区"
		}]
	}, {
		value: "520300",
		text: "遵义市",
		children: [{
			value: "520302",
			text: "红花岗区"
		}, {
			value: "520303",
			text: "汇川区"
		}, {
			value: "520321",
			text: "遵义县"
		}, {
			value: "520322",
			text: "桐梓县"
		}, {
			value: "520323",
			text: "绥阳县"
		}, {
			value: "520324",
			text: "正安县"
		}, {
			value: "520325",
			text: "道真仡佬族苗族自治县"
		}, {
			value: "520326",
			text: "务川仡佬族苗族自治县"
		}, {
			value: "520327",
			text: "凤冈县"
		}, {
			value: "520328",
			text: "湄潭县"
		}, {
			value: "520329",
			text: "余庆县"
		}, {
			value: "520330",
			text: "习水县"
		}, {
			value: "520381",
			text: "赤水市"
		}, {
			value: "520382",
			text: "仁怀市"
		}, {
			value: "520383",
			text: "其它区"
		}]
	}, {
		value: "520400",
		text: "安顺市",
		children: [{
			value: "520402",
			text: "西秀区"
		}, {
			value: "520421",
			text: "平坝县"
		}, {
			value: "520422",
			text: "普定县"
		}, {
			value: "520423",
			text: "镇宁布依族苗族自治县"
		}, {
			value: "520424",
			text: "关岭布依族苗族自治县"
		}, {
			value: "520425",
			text: "紫云苗族布依族自治县"
		}, {
			value: "520426",
			text: "其它区"
		}]
	}, {
		value: "522200",
		text: "铜仁地区",
		children: [{
			value: "522201",
			text: "铜仁市"
		}, {
			value: "522222",
			text: "江口县"
		}, {
			value: "522223",
			text: "玉屏侗族自治县"
		}, {
			value: "522224",
			text: "石阡县"
		}, {
			value: "522225",
			text: "思南县"
		}, {
			value: "522226",
			text: "印江土家族苗族自治县"
		}, {
			value: "522227",
			text: "德江县"
		}, {
			value: "522228",
			text: "沿河土家族自治县"
		}, {
			value: "522229",
			text: "松桃苗族自治县"
		}, {
			value: "522230",
			text: "万山特区"
		}, {
			value: "522231",
			text: "其它区"
		}]
	}, {
		value: "522300",
		text: "黔西南布依族苗族自治州",
		children: [{
			value: "522301",
			text: "兴义市"
		}, {
			value: "522322",
			text: "兴仁县"
		}, {
			value: "522323",
			text: "普安县"
		}, {
			value: "522324",
			text: "晴隆县"
		}, {
			value: "522325",
			text: "贞丰县"
		}, {
			value: "522326",
			text: "望谟县"
		}, {
			value: "522327",
			text: "册亨县"
		}, {
			value: "522328",
			text: "安龙县"
		}, {
			value: "522329",
			text: "其它区"
		}]
	}, {
		value: "522400",
		text: "毕节地区",
		children: [{
			value: "522401",
			text: "毕节市"
		}, {
			value: "522422",
			text: "大方县"
		}, {
			value: "522423",
			text: "黔西县"
		}, {
			value: "522424",
			text: "金沙县"
		}, {
			value: "522425",
			text: "织金县"
		}, {
			value: "522426",
			text: "纳雍县"
		}, {
			value: "522427",
			text: "威宁彝族回族苗族自治县"
		}, {
			value: "522428",
			text: "赫章县"
		}, {
			value: "522429",
			text: "其它区"
		}]
	}, {
		value: "522600",
		text: "黔东南苗族侗族自治州",
		children: [{
			value: "522601",
			text: "凯里市"
		}, {
			value: "522622",
			text: "黄平县"
		}, {
			value: "522623",
			text: "施秉县"
		}, {
			value: "522624",
			text: "三穗县"
		}, {
			value: "522625",
			text: "镇远县"
		}, {
			value: "522626",
			text: "岑巩县"
		}, {
			value: "522627",
			text: "天柱县"
		}, {
			value: "522628",
			text: "锦屏县"
		}, {
			value: "522629",
			text: "剑河县"
		}, {
			value: "522630",
			text: "台江县"
		}, {
			value: "522631",
			text: "黎平县"
		}, {
			value: "522632",
			text: "榕江县"
		}, {
			value: "522633",
			text: "从江县"
		}, {
			value: "522634",
			text: "雷山县"
		}, {
			value: "522635",
			text: "麻江县"
		}, {
			value: "522636",
			text: "丹寨县"
		}, {
			value: "522637",
			text: "其它区"
		}]
	}, {
		value: "522700",
		text: "黔南布依族苗族自治州",
		children: [{
			value: "522701",
			text: "都匀市"
		}, {
			value: "522702",
			text: "福泉市"
		}, {
			value: "522722",
			text: "荔波县"
		}, {
			value: "522723",
			text: "贵定县"
		}, {
			value: "522725",
			text: "瓮安县"
		}, {
			value: "522726",
			text: "独山县"
		}, {
			value: "522727",
			text: "平塘县"
		}, {
			value: "522728",
			text: "罗甸县"
		}, {
			value: "522729",
			text: "长顺县"
		}, {
			value: "522730",
			text: "龙里县"
		}, {
			value: "522731",
			text: "惠水县"
		}, {
			value: "522732",
			text: "三都水族自治县"
		}, {
			value: "522733",
			text: "其它区"
		}]
	}]
}, {
	value: '530000',
	text: '云南省',
	children: [{
		value: "530100",
		text: "昆明市",
		children: [{
			value: "530102",
			text: "五华区"
		}, {
			value: "530103",
			text: "盘龙区"
		}, {
			value: "530111",
			text: "官渡区"
		}, {
			value: "530112",
			text: "西山区"
		}, {
			value: "530113",
			text: "东川区"
		}, {
			value: "530121",
			text: "呈贡县"
		}, {
			value: "530122",
			text: "晋宁县"
		}, {
			value: "530124",
			text: "富民县"
		}, {
			value: "530125",
			text: "宜良县"
		}, {
			value: "530126",
			text: "石林彝族自治县"
		}, {
			value: "530127",
			text: "嵩明县"
		}, {
			value: "530128",
			text: "禄劝彝族苗族自治县"
		}, {
			value: "530129",
			text: "寻甸回族彝族自治县"
		}, {
			value: "530181",
			text: "安宁市"
		}, {
			value: "530182",
			text: "其它区"
		}]
	}, {
		value: "530300",
		text: "曲靖市",
		children: [{
			value: "530302",
			text: "麒麟区"
		}, {
			value: "530321",
			text: "马龙县"
		}, {
			value: "530322",
			text: "陆良县"
		}, {
			value: "530323",
			text: "师宗县"
		}, {
			value: "530324",
			text: "罗平县"
		}, {
			value: "530325",
			text: "富源县"
		}, {
			value: "530326",
			text: "会泽县"
		}, {
			value: "530328",
			text: "沾益县"
		}, {
			value: "530381",
			text: "宣威市"
		}, {
			value: "530382",
			text: "其它区"
		}]
	}, {
		value: "530400",
		text: "玉溪市",
		children: [{
			value: "530402",
			text: "红塔区"
		}, {
			value: "530421",
			text: "江川县"
		}, {
			value: "530422",
			text: "澄江县"
		}, {
			value: "530423",
			text: "通海县"
		}, {
			value: "530424",
			text: "华宁县"
		}, {
			value: "530425",
			text: "易门县"
		}, {
			value: "530426",
			text: "峨山彝族自治县"
		}, {
			value: "530427",
			text: "新平彝族傣族自治县"
		}, {
			value: "530428",
			text: "元江哈尼族彝族傣族自治县"
		}, {
			value: "530429",
			text: "其它区"
		}]
	}, {
		value: "530500",
		text: "保山市",
		children: [{
			value: "530502",
			text: "隆阳区"
		}, {
			value: "530521",
			text: "施甸县"
		}, {
			value: "530522",
			text: "腾冲县"
		}, {
			value: "530523",
			text: "龙陵县"
		}, {
			value: "530524",
			text: "昌宁县"
		}, {
			value: "530525",
			text: "其它区"
		}]
	}, {
		value: "530600",
		text: "昭通市",
		children: [{
			value: "530602",
			text: "昭阳区"
		}, {
			value: "530621",
			text: "鲁甸县"
		}, {
			value: "530622",
			text: "巧家县"
		}, {
			value: "530623",
			text: "盐津县"
		}, {
			value: "530624",
			text: "大关县"
		}, {
			value: "530625",
			text: "永善县"
		}, {
			value: "530626",
			text: "绥江县"
		}, {
			value: "530627",
			text: "镇雄县"
		}, {
			value: "530628",
			text: "彝良县"
		}, {
			value: "530629",
			text: "威信县"
		}, {
			value: "530630",
			text: "水富县"
		}, {
			value: "530631",
			text: "其它区"
		}]
	}, {
		value: "530700",
		text: "丽江市",
		children: [{
			value: "530702",
			text: "古城区"
		}, {
			value: "530721",
			text: "玉龙纳西族自治县"
		}, {
			value: "530722",
			text: "永胜县"
		}, {
			value: "530723",
			text: "华坪县"
		}, {
			value: "530724",
			text: "宁蒗彝族自治县"
		}, {
			value: "530725",
			text: "其它区"
		}]
	}, {
		value: "530800",
		text: "普洱市",
		children: [{
			value: "530802",
			text: "思茅区"
		}, {
			value: "530821",
			text: "宁洱哈尼族彝族自治县"
		}, {
			value: "530822",
			text: "墨江哈尼族自治县"
		}, {
			value: "530823",
			text: "景东彝族自治县"
		}, {
			value: "530824",
			text: "景谷傣族彝族自治县"
		}, {
			value: "530825",
			text: "镇沅彝族哈尼族拉祜族自治县"
		}, {
			value: "530826",
			text: "江城哈尼族彝族自治县"
		}, {
			value: "530827",
			text: "孟连傣族拉祜族佤族自治县"
		}, {
			value: "530828",
			text: "澜沧拉祜族自治县"
		}, {
			value: "530829",
			text: "西盟佤族自治县"
		}, {
			value: "530830",
			text: "其它区"
		}]
	}, {
		value: "530900",
		text: "临沧市",
		children: [{
			value: "530902",
			text: "临翔区"
		}, {
			value: "530921",
			text: "凤庆县"
		}, {
			value: "530922",
			text: "云县"
		}, {
			value: "530923",
			text: "永德县"
		}, {
			value: "530924",
			text: "镇康县"
		}, {
			value: "530925",
			text: "双江拉祜族佤族布朗族傣族自治县"
		}, {
			value: "530926",
			text: "耿马傣族佤族自治县"
		}, {
			value: "530927",
			text: "沧源佤族自治县"
		}, {
			value: "530928",
			text: "其它区"
		}]
	}, {
		value: "532300",
		text: "楚雄彝族自治州",
		children: [{
			value: "532301",
			text: "楚雄市"
		}, {
			value: "532322",
			text: "双柏县"
		}, {
			value: "532323",
			text: "牟定县"
		}, {
			value: "532324",
			text: "南华县"
		}, {
			value: "532325",
			text: "姚安县"
		}, {
			value: "532326",
			text: "大姚县"
		}, {
			value: "532327",
			text: "永仁县"
		}, {
			value: "532328",
			text: "元谋县"
		}, {
			value: "532329",
			text: "武定县"
		}, {
			value: "532331",
			text: "禄丰县"
		}, {
			value: "532332",
			text: "其它区"
		}]
	}, {
		value: "532500",
		text: "红河哈尼族彝族自治州",
		children: [{
			value: "532501",
			text: "个旧市"
		}, {
			value: "532502",
			text: "开远市"
		}, {
			value: "532522",
			text: "蒙自县"
		}, {
			value: "532523",
			text: "屏边苗族自治县"
		}, {
			value: "532524",
			text: "建水县"
		}, {
			value: "532525",
			text: "石屏县"
		}, {
			value: "532526",
			text: "弥勒县"
		}, {
			value: "532527",
			text: "泸西县"
		}, {
			value: "532528",
			text: "元阳县"
		}, {
			value: "532529",
			text: "红河县"
		}, {
			value: "532530",
			text: "金平苗族瑶族傣族自治县"
		}, {
			value: "532531",
			text: "绿春县"
		}, {
			value: "532532",
			text: "河口瑶族自治县"
		}, {
			value: "532533",
			text: "其它区"
		}]
	}, {
		value: "532600",
		text: "文山壮族苗族自治州",
		children: [{
			value: "532621",
			text: "文山县"
		}, {
			value: "532622",
			text: "砚山县"
		}, {
			value: "532623",
			text: "西畴县"
		}, {
			value: "532624",
			text: "麻栗坡县"
		}, {
			value: "532625",
			text: "马关县"
		}, {
			value: "532626",
			text: "丘北县"
		}, {
			value: "532627",
			text: "广南县"
		}, {
			value: "532628",
			text: "富宁县"
		}, {
			value: "532629",
			text: "其它区"
		}]
	}, {
		value: "532800",
		text: "西双版纳傣族自治州",
		children: [{
			value: "532801",
			text: "景洪市"
		}, {
			value: "532822",
			text: "勐海县"
		}, {
			value: "532823",
			text: "勐腊县"
		}, {
			value: "532824",
			text: "其它区"
		}]
	}, {
		value: "532900",
		text: "大理白族自治州",
		children: [{
			value: "532901",
			text: "大理市"
		}, {
			value: "532922",
			text: "漾濞彝族自治县"
		}, {
			value: "532923",
			text: "祥云县"
		}, {
			value: "532924",
			text: "宾川县"
		}, {
			value: "532925",
			text: "弥渡县"
		}, {
			value: "532926",
			text: "南涧彝族自治县"
		}, {
			value: "532927",
			text: "巍山彝族回族自治县"
		}, {
			value: "532928",
			text: "永平县"
		}, {
			value: "532929",
			text: "云龙县"
		}, {
			value: "532930",
			text: "洱源县"
		}, {
			value: "532931",
			text: "剑川县"
		}, {
			value: "532932",
			text: "鹤庆县"
		}, {
			value: "532933",
			text: "其它区"
		}]
	}, {
		value: "533100",
		text: "德宏傣族景颇族自治州",
		children: [{
			value: "533102",
			text: "瑞丽市"
		}, {
			value: "533103",
			text: "潞西市"
		}, {
			value: "533122",
			text: "梁河县"
		}, {
			value: "533123",
			text: "盈江县"
		}, {
			value: "533124",
			text: "陇川县"
		}, {
			value: "533125",
			text: "其它区"
		}]
	}, {
		value: "533300",
		text: "怒江傈僳族自治州",
		children: [{
			value: "533321",
			text: "泸水县"
		}, {
			value: "533323",
			text: "福贡县"
		}, {
			value: "533324",
			text: "贡山独龙族怒族自治县"
		}, {
			value: "533325",
			text: "兰坪白族普米族自治县"
		}, {
			value: "533326",
			text: "其它区"
		}]
	}, {
		value: "533400",
		text: "迪庆藏族自治州",
		children: [{
			value: "533421",
			text: "香格里拉县"
		}, {
			value: "533422",
			text: "德钦县"
		}, {
			value: "533423",
			text: "维西傈僳族自治县"
		}, {
			value: "533424",
			text: "其它区"
		}]
	}]
}, {
	value: '540000',
	text: '西藏',
	children: [{
		value: "540100",
		text: "拉萨市",
		children: [{
			value: "540102",
			text: "城关区"
		}, {
			value: "540121",
			text: "林周县"
		}, {
			value: "540122",
			text: "当雄县"
		}, {
			value: "540123",
			text: "尼木县"
		}, {
			value: "540124",
			text: "曲水县"
		}, {
			value: "540125",
			text: "堆龙德庆县"
		}, {
			value: "540126",
			text: "达孜县"
		}, {
			value: "540127",
			text: "墨竹工卡县"
		}, {
			value: "540128",
			text: "其它区"
		}]
	}, {
		value: "542100",
		text: "昌都地区",
		children: [{
			value: "542121",
			text: "昌都县"
		}, {
			value: "542122",
			text: "江达县"
		}, {
			value: "542123",
			text: "贡觉县"
		}, {
			value: "542124",
			text: "类乌齐县"
		}, {
			value: "542125",
			text: "丁青县"
		}, {
			value: "542126",
			text: "察雅县"
		}, {
			value: "542127",
			text: "八宿县"
		}, {
			value: "542128",
			text: "左贡县"
		}, {
			value: "542129",
			text: "芒康县"
		}, {
			value: "542132",
			text: "洛隆县"
		}, {
			value: "542133",
			text: "边坝县"
		}, {
			value: "542134",
			text: "其它区"
		}]
	}, {
		value: "542200",
		text: "山南地区",
		children: [{
			value: "542221",
			text: "乃东县"
		}, {
			value: "542222",
			text: "扎囊县"
		}, {
			value: "542223",
			text: "贡嘎县"
		}, {
			value: "542224",
			text: "桑日县"
		}, {
			value: "542225",
			text: "琼结县"
		}, {
			value: "542226",
			text: "曲松县"
		}, {
			value: "542227",
			text: "措美县"
		}, {
			value: "542228",
			text: "洛扎县"
		}, {
			value: "542229",
			text: "加查县"
		}, {
			value: "542231",
			text: "隆子县"
		}, {
			value: "542232",
			text: "错那县"
		}, {
			value: "542233",
			text: "浪卡子县"
		}, {
			value: "542234",
			text: "其它区"
		}]
	}, {
		value: "542300",
		text: "日喀则地区",
		children: [{
			value: "542301",
			text: "日喀则市"
		}, {
			value: "542322",
			text: "南木林县"
		}, {
			value: "542323",
			text: "江孜县"
		}, {
			value: "542324",
			text: "定日县"
		}, {
			value: "542325",
			text: "萨迦县"
		}, {
			value: "542326",
			text: "拉孜县"
		}, {
			value: "542327",
			text: "昂仁县"
		}, {
			value: "542328",
			text: "谢通门县"
		}, {
			value: "542329",
			text: "白朗县"
		}, {
			value: "542330",
			text: "仁布县"
		}, {
			value: "542331",
			text: "康马县"
		}, {
			value: "542332",
			text: "定结县"
		}, {
			value: "542333",
			text: "仲巴县"
		}, {
			value: "542334",
			text: "亚东县"
		}, {
			value: "542335",
			text: "吉隆县"
		}, {
			value: "542336",
			text: "聂拉木县"
		}, {
			value: "542337",
			text: "萨嘎县"
		}, {
			value: "542338",
			text: "岗巴县"
		}, {
			value: "542339",
			text: "其它区"
		}]
	}, {
		value: "542400",
		text: "那曲地区",
		children: [{
			value: "542421",
			text: "那曲县"
		}, {
			value: "542422",
			text: "嘉黎县"
		}, {
			value: "542423",
			text: "比如县"
		}, {
			value: "542424",
			text: "聂荣县"
		}, {
			value: "542425",
			text: "安多县"
		}, {
			value: "542426",
			text: "申扎县"
		}, {
			value: "542427",
			text: "索县"
		}, {
			value: "542428",
			text: "班戈县"
		}, {
			value: "542429",
			text: "巴青县"
		}, {
			value: "542430",
			text: "尼玛县"
		}, {
			value: "542431",
			text: "其它区"
		}]
	}, {
		value: "542500",
		text: "阿里地区",
		children: [{
			value: "542521",
			text: "普兰县"
		}, {
			value: "542522",
			text: "札达县"
		}, {
			value: "542523",
			text: "噶尔县"
		}, {
			value: "542524",
			text: "日土县"
		}, {
			value: "542525",
			text: "革吉县"
		}, {
			value: "542526",
			text: "改则县"
		}, {
			value: "542527",
			text: "措勤县"
		}, {
			value: "542528",
			text: "其它区"
		}]
	}, {
		value: "542600",
		text: "林芝地区",
		children: [{
			value: "542621",
			text: "林芝县"
		}, {
			value: "542622",
			text: "工布江达县"
		}, {
			value: "542623",
			text: "米林县"
		}, {
			value: "542624",
			text: "墨脱县"
		}, {
			value: "542625",
			text: "波密县"
		}, {
			value: "542626",
			text: "察隅县"
		}, {
			value: "542627",
			text: "朗县"
		}, {
			value: "542628",
			text: "其它区"
		}]
	}]
}, {
	value: '610000',
	text: '陕西省',
	children: [{
		value: "610100",
		text: "西安市",
		children: [{
			value: "610102",
			text: "新城区"
		}, {
			value: "610103",
			text: "碑林区"
		}, {
			value: "610104",
			text: "莲湖区"
		}, {
			value: "610111",
			text: "灞桥区"
		}, {
			value: "610112",
			text: "未央区"
		}, {
			value: "610113",
			text: "雁塔区"
		}, {
			value: "610114",
			text: "阎良区"
		}, {
			value: "610115",
			text: "临潼区"
		}, {
			value: "610116",
			text: "长安区"
		}, {
			value: "610122",
			text: "蓝田县"
		}, {
			value: "610124",
			text: "周至县"
		}, {
			value: "610125",
			text: "户县"
		}, {
			value: "610126",
			text: "高陵县"
		}, {
			value: "610127",
			text: "其它区"
		}]
	}, {
		value: "610200",
		text: "铜川市",
		children: [{
			value: "610202",
			text: "王益区"
		}, {
			value: "610203",
			text: "印台区"
		}, {
			value: "610204",
			text: "耀州区"
		}, {
			value: "610222",
			text: "宜君县"
		}, {
			value: "610223",
			text: "其它区"
		}]
	}, {
		value: "610300",
		text: "宝鸡市",
		children: [{
			value: "610302",
			text: "渭滨区"
		}, {
			value: "610303",
			text: "金台区"
		}, {
			value: "610304",
			text: "陈仓区"
		}, {
			value: "610322",
			text: "凤翔县"
		}, {
			value: "610323",
			text: "岐山县"
		}, {
			value: "610324",
			text: "扶风县"
		}, {
			value: "610326",
			text: "眉县"
		}, {
			value: "610327",
			text: "陇县"
		}, {
			value: "610328",
			text: "千阳县"
		}, {
			value: "610329",
			text: "麟游县"
		}, {
			value: "610330",
			text: "凤县"
		}, {
			value: "610331",
			text: "太白县"
		}, {
			value: "610332",
			text: "其它区"
		}]
	}, {
		value: "610400",
		text: "咸阳市",
		children: [{
			value: "610402",
			text: "秦都区"
		}, {
			value: "610403",
			text: "杨陵区"
		}, {
			value: "610404",
			text: "渭城区"
		}, {
			value: "610422",
			text: "三原县"
		}, {
			value: "610423",
			text: "泾阳县"
		}, {
			value: "610424",
			text: "乾县"
		}, {
			value: "610425",
			text: "礼泉县"
		}, {
			value: "610426",
			text: "永寿县"
		}, {
			value: "610427",
			text: "彬县"
		}, {
			value: "610428",
			text: "长武县"
		}, {
			value: "610429",
			text: "旬邑县"
		}, {
			value: "610430",
			text: "淳化县"
		}, {
			value: "610431",
			text: "武功县"
		}, {
			value: "610481",
			text: "兴平市"
		}, {
			value: "610482",
			text: "其它区"
		}]
	}, {
		value: "610500",
		text: "渭南市",
		children: [{
			value: "610502",
			text: "临渭区"
		}, {
			value: "610521",
			text: "华县"
		}, {
			value: "610522",
			text: "潼关县"
		}, {
			value: "610523",
			text: "大荔县"
		}, {
			value: "610524",
			text: "合阳县"
		}, {
			value: "610525",
			text: "澄城县"
		}, {
			value: "610526",
			text: "蒲城县"
		}, {
			value: "610527",
			text: "白水县"
		}, {
			value: "610528",
			text: "富平县"
		}, {
			value: "610581",
			text: "韩城市"
		}, {
			value: "610582",
			text: "华阴市"
		}, {
			value: "610583",
			text: "其它区"
		}]
	}, {
		value: "610600",
		text: "延安市",
		children: [{
			value: "610602",
			text: "宝塔区"
		}, {
			value: "610621",
			text: "延长县"
		}, {
			value: "610622",
			text: "延川县"
		}, {
			value: "610623",
			text: "子长县"
		}, {
			value: "610624",
			text: "安塞县"
		}, {
			value: "610625",
			text: "志丹县"
		}, {
			value: "610626",
			text: "吴起县"
		}, {
			value: "610627",
			text: "甘泉县"
		}, {
			value: "610628",
			text: "富县"
		}, {
			value: "610629",
			text: "洛川县"
		}, {
			value: "610630",
			text: "宜川县"
		}, {
			value: "610631",
			text: "黄龙县"
		}, {
			value: "610632",
			text: "黄陵县"
		}, {
			value: "610633",
			text: "其它区"
		}]
	}, {
		value: "610700",
		text: "汉中市",
		children: [{
			value: "610702",
			text: "汉台区"
		}, {
			value: "610721",
			text: "南郑县"
		}, {
			value: "610722",
			text: "城固县"
		}, {
			value: "610723",
			text: "洋县"
		}, {
			value: "610724",
			text: "西乡县"
		}, {
			value: "610725",
			text: "勉县"
		}, {
			value: "610726",
			text: "宁强县"
		}, {
			value: "610727",
			text: "略阳县"
		}, {
			value: "610728",
			text: "镇巴县"
		}, {
			value: "610729",
			text: "留坝县"
		}, {
			value: "610730",
			text: "佛坪县"
		}, {
			value: "610731",
			text: "其它区"
		}]
	}, {
		value: "610800",
		text: "榆林市",
		children: [{
			value: "610802",
			text: "榆阳区"
		}, {
			value: "610821",
			text: "神木县"
		}, {
			value: "610822",
			text: "府谷县"
		}, {
			value: "610823",
			text: "横山县"
		}, {
			value: "610824",
			text: "靖边县"
		}, {
			value: "610825",
			text: "定边县"
		}, {
			value: "610826",
			text: "绥德县"
		}, {
			value: "610827",
			text: "米脂县"
		}, {
			value: "610828",
			text: "佳县"
		}, {
			value: "610829",
			text: "吴堡县"
		}, {
			value: "610830",
			text: "清涧县"
		}, {
			value: "610831",
			text: "子洲县"
		}, {
			value: "610832",
			text: "其它区"
		}]
	}, {
		value: "610900",
		text: "安康市",
		children: [{
			value: "610902",
			text: "汉滨区"
		}, {
			value: "610921",
			text: "汉阴县"
		}, {
			value: "610922",
			text: "石泉县"
		}, {
			value: "610923",
			text: "宁陕县"
		}, {
			value: "610924",
			text: "紫阳县"
		}, {
			value: "610925",
			text: "岚皋县"
		}, {
			value: "610926",
			text: "平利县"
		}, {
			value: "610927",
			text: "镇坪县"
		}, {
			value: "610928",
			text: "旬阳县"
		}, {
			value: "610929",
			text: "白河县"
		}, {
			value: "610930",
			text: "其它区"
		}]
	}, {
		value: "611000",
		text: "商洛市",
		children: [{
			value: "611002",
			text: "商州区"
		}, {
			value: "611021",
			text: "洛南县"
		}, {
			value: "611022",
			text: "丹凤县"
		}, {
			value: "611023",
			text: "商南县"
		}, {
			value: "611024",
			text: "山阳县"
		}, {
			value: "611025",
			text: "镇安县"
		}, {
			value: "611026",
			text: "柞水县"
		}, {
			value: "611027",
			text: "其它区"
		}]
	}]
}, {
	value: '620000',
	text: '甘肃省',
	children: [{
		value: "620100",
		text: "兰州市",
		children: [{
			value: "620102",
			text: "城关区"
		}, {
			value: "620103",
			text: "七里河区"
		}, {
			value: "620104",
			text: "西固区"
		}, {
			value: "620105",
			text: "安宁区"
		}, {
			value: "620111",
			text: "红古区"
		}, {
			value: "620121",
			text: "永登县"
		}, {
			value: "620122",
			text: "皋兰县"
		}, {
			value: "620123",
			text: "榆中县"
		}, {
			value: "620124",
			text: "其它区"
		}]
	}, {
		value: "620200",
		text: "嘉峪关市",
		children: []
	}, {
		value: "620300",
		text: "金昌市",
		children: [{
			value: "620302",
			text: "金川区"
		}, {
			value: "620321",
			text: "永昌县"
		}, {
			value: "620322",
			text: "其它区"
		}]
	}, {
		value: "620400",
		text: "白银市",
		children: [{
			value: "620402",
			text: "白银区"
		}, {
			value: "620403",
			text: "平川区"
		}, {
			value: "620421",
			text: "靖远县"
		}, {
			value: "620422",
			text: "会宁县"
		}, {
			value: "620423",
			text: "景泰县"
		}, {
			value: "620424",
			text: "其它区"
		}]
	}, {
		value: "620500",
		text: "天水市",
		children: [{
			value: "620502",
			text: "秦州区"
		}, {
			value: "620503",
			text: "麦积区"
		}, {
			value: "620521",
			text: "清水县"
		}, {
			value: "620522",
			text: "秦安县"
		}, {
			value: "620523",
			text: "甘谷县"
		}, {
			value: "620524",
			text: "武山县"
		}, {
			value: "620525",
			text: "张家川回族自治县"
		}, {
			value: "620526",
			text: "其它区"
		}]
	}, {
		value: "620600",
		text: "武威市",
		children: [{
			value: "620602",
			text: "凉州区"
		}, {
			value: "620621",
			text: "民勤县"
		}, {
			value: "620622",
			text: "古浪县"
		}, {
			value: "620623",
			text: "天祝藏族自治县"
		}, {
			value: "620624",
			text: "其它区"
		}]
	}, {
		value: "620700",
		text: "张掖市",
		children: [{
			value: "620702",
			text: "甘州区"
		}, {
			value: "620721",
			text: "肃南裕固族自治县"
		}, {
			value: "620722",
			text: "民乐县"
		}, {
			value: "620723",
			text: "临泽县"
		}, {
			value: "620724",
			text: "高台县"
		}, {
			value: "620725",
			text: "山丹县"
		}, {
			value: "620726",
			text: "其它区"
		}]
	}, {
		value: "620800",
		text: "平凉市",
		children: [{
			value: "620802",
			text: "崆峒区"
		}, {
			value: "620821",
			text: "泾川县"
		}, {
			value: "620822",
			text: "灵台县"
		}, {
			value: "620823",
			text: "崇信县"
		}, {
			value: "620824",
			text: "华亭县"
		}, {
			value: "620825",
			text: "庄浪县"
		}, {
			value: "620826",
			text: "静宁县"
		}, {
			value: "620827",
			text: "其它区"
		}]
	}, {
		value: "620900",
		text: "酒泉市",
		children: [{
			value: "620902",
			text: "肃州区"
		}, {
			value: "620921",
			text: "金塔县"
		}, {
			value: "620922",
			text: "安西县"
		}, {
			value: "620923",
			text: "肃北蒙古族自治县"
		}, {
			value: "620924",
			text: "阿克塞哈萨克族自治县"
		}, {
			value: "620981",
			text: "玉门市"
		}, {
			value: "620982",
			text: "敦煌市"
		}, {
			value: "620983",
			text: "其它区"
		}]
	}, {
		value: "621000",
		text: "庆阳市",
		children: [{
			value: "621002",
			text: "西峰区"
		}, {
			value: "621021",
			text: "庆城县"
		}, {
			value: "621022",
			text: "环县"
		}, {
			value: "621023",
			text: "华池县"
		}, {
			value: "621024",
			text: "合水县"
		}, {
			value: "621025",
			text: "正宁县"
		}, {
			value: "621026",
			text: "宁县"
		}, {
			value: "621027",
			text: "镇原县"
		}, {
			value: "621028",
			text: "其它区"
		}]
	}, {
		value: "621100",
		text: "定西市",
		children: [{
			value: "621102",
			text: "安定区"
		}, {
			value: "621121",
			text: "通渭县"
		}, {
			value: "621122",
			text: "陇西县"
		}, {
			value: "621123",
			text: "渭源县"
		}, {
			value: "621124",
			text: "临洮县"
		}, {
			value: "621125",
			text: "漳县"
		}, {
			value: "621126",
			text: "岷县"
		}, {
			value: "621127",
			text: "其它区"
		}]
	}, {
		value: "621200",
		text: "陇南市",
		children: [{
			value: "621202",
			text: "武都区"
		}, {
			value: "621221",
			text: "成县"
		}, {
			value: "621222",
			text: "文县"
		}, {
			value: "621223",
			text: "宕昌县"
		}, {
			value: "621224",
			text: "康县"
		}, {
			value: "621225",
			text: "西和县"
		}, {
			value: "621226",
			text: "礼县"
		}, {
			value: "621227",
			text: "徽县"
		}, {
			value: "621228",
			text: "两当县"
		}, {
			value: "621229",
			text: "其它区"
		}]
	}, {
		value: "622900",
		text: "临夏回族自治州",
		children: [{
			value: "622901",
			text: "临夏市"
		}, {
			value: "622921",
			text: "临夏县"
		}, {
			value: "622922",
			text: "康乐县"
		}, {
			value: "622923",
			text: "永靖县"
		}, {
			value: "622924",
			text: "广河县"
		}, {
			value: "622925",
			text: "和政县"
		}, {
			value: "622926",
			text: "东乡族自治县"
		}, {
			value: "622927",
			text: "积石山保安族东乡族撒拉族自治县"
		}, {
			value: "622928",
			text: "其它区"
		}]
	}, {
		value: "623000",
		text: "甘南藏族自治州",
		children: [{
			value: "623001",
			text: "合作市"
		}, {
			value: "623021",
			text: "临潭县"
		}, {
			value: "623022",
			text: "卓尼县"
		}, {
			value: "623023",
			text: "舟曲县"
		}, {
			value: "623024",
			text: "迭部县"
		}, {
			value: "623025",
			text: "玛曲县"
		}, {
			value: "623026",
			text: "碌曲县"
		}, {
			value: "623027",
			text: "夏河县"
		}, {
			value: "623028",
			text: "其它区"
		}]
	}]
}, {
	value: '630000',
	text: '青海省',
	children: [{
		value: "630100",
		text: "西宁市",
		children: [{
			value: "630102",
			text: "城东区"
		}, {
			value: "630103",
			text: "城中区"
		}, {
			value: "630104",
			text: "城西区"
		}, {
			value: "630105",
			text: "城北区"
		}, {
			value: "630121",
			text: "大通回族土族自治县"
		}, {
			value: "630122",
			text: "湟中县"
		}, {
			value: "630123",
			text: "湟源县"
		}, {
			value: "630124",
			text: "其它区"
		}]
	}, {
		value: "632100",
		text: "海东地区",
		children: [{
			value: "632121",
			text: "平安县"
		}, {
			value: "632122",
			text: "民和回族土族自治县"
		}, {
			value: "632123",
			text: "乐都县"
		}, {
			value: "632126",
			text: "互助土族自治县"
		}, {
			value: "632127",
			text: "化隆回族自治县"
		}, {
			value: "632128",
			text: "循化撒拉族自治县"
		}, {
			value: "632129",
			text: "其它区"
		}]
	}, {
		value: "632200",
		text: "海北藏族自治州",
		children: [{
			value: "632221",
			text: "门源回族自治县"
		}, {
			value: "632222",
			text: "祁连县"
		}, {
			value: "632223",
			text: "海晏县"
		}, {
			value: "632224",
			text: "刚察县"
		}, {
			value: "632225",
			text: "其它区"
		}]
	}, {
		value: "632300",
		text: "黄南藏族自治州",
		children: [{
			value: "632321",
			text: "同仁县"
		}, {
			value: "632322",
			text: "尖扎县"
		}, {
			value: "632323",
			text: "泽库县"
		}, {
			value: "632324",
			text: "河南蒙古族自治县"
		}, {
			value: "632325",
			text: "其它区"
		}]
	}, {
		value: "632500",
		text: "海南藏族自治州",
		children: [{
			value: "632521",
			text: "共和县"
		}, {
			value: "632522",
			text: "同德县"
		}, {
			value: "632523",
			text: "贵德县"
		}, {
			value: "632524",
			text: "兴海县"
		}, {
			value: "632525",
			text: "贵南县"
		}, {
			value: "632526",
			text: "其它区"
		}]
	}, {
		value: "632600",
		text: "果洛藏族自治州",
		children: [{
			value: "632621",
			text: "玛沁县"
		}, {
			value: "632622",
			text: "班玛县"
		}, {
			value: "632623",
			text: "甘德县"
		}, {
			value: "632624",
			text: "达日县"
		}, {
			value: "632625",
			text: "久治县"
		}, {
			value: "632626",
			text: "玛多县"
		}, {
			value: "632627",
			text: "其它区"
		}]
	}, {
		value: "632700",
		text: "玉树藏族自治州",
		children: [{
			value: "632721",
			text: "玉树县"
		}, {
			value: "632722",
			text: "杂多县"
		}, {
			value: "632723",
			text: "称多县"
		}, {
			value: "632724",
			text: "治多县"
		}, {
			value: "632725",
			text: "囊谦县"
		}, {
			value: "632726",
			text: "曲麻莱县"
		}, {
			value: "632727",
			text: "其它区"
		}]
	}, {
		value: "632800",
		text: "海西蒙古族藏族自治州",
		children: [{
			value: "632801",
			text: "格尔木市"
		}, {
			value: "632802",
			text: "德令哈市"
		}, {
			value: "632821",
			text: "乌兰县"
		}, {
			value: "632822",
			text: "都兰县"
		}, {
			value: "632823",
			text: "天峻县"
		}, {
			value: "632824",
			text: "其它区"
		}]
	}]
}, {
	value: '640000',
	text: '宁夏',
	children: [{
		value: "640100",
		text: "银川市",
		children: [{
			value: "640104",
			text: "兴庆区"
		}, {
			value: "640105",
			text: "西夏区"
		}, {
			value: "640106",
			text: "金凤区"
		}, {
			value: "640121",
			text: "永宁县"
		}, {
			value: "640122",
			text: "贺兰县"
		}, {
			value: "640181",
			text: "灵武市"
		}, {
			value: "640182",
			text: "其它区"
		}]
	}, {
		value: "640200",
		text: "石嘴山市",
		children: [{
			value: "640202",
			text: "大武口区"
		}, {
			value: "640205",
			text: "惠农区"
		}, {
			value: "640221",
			text: "平罗县"
		}, {
			value: "640222",
			text: "其它区"
		}]
	}, {
		value: "640300",
		text: "吴忠市",
		children: [{
			value: "640302",
			text: "利通区"
		}, {
			value: "640303",
			text: "红寺堡区"
		}, {
			value: "640323",
			text: "盐池县"
		}, {
			value: "640324",
			text: "同心县"
		}, {
			value: "640381",
			text: "青铜峡市"
		}, {
			value: "640382",
			text: "其它区"
		}]
	}, {
		value: "640400",
		text: "固原市",
		children: [{
			value: "640402",
			text: "原州区"
		}, {
			value: "640422",
			text: "西吉县"
		}, {
			value: "640423",
			text: "隆德县"
		}, {
			value: "640424",
			text: "泾源县"
		}, {
			value: "640425",
			text: "彭阳县"
		}, {
			value: "640426",
			text: "其它区"
		}]
	}, {
		value: "640500",
		text: "中卫市",
		children: [{
			value: "640502",
			text: "沙坡头区"
		}, {
			value: "640521",
			text: "中宁县"
		}, {
			value: "640522",
			text: "海原县"
		}, {
			value: "640523",
			text: "其它区"
		}]
	}]
}, {
	value: '650000',
	text: '新疆',
	children: [{
		value: "650100",
		text: "乌鲁木齐市",
		children: [{
			value: "650102",
			text: "天山区"
		}, {
			value: "650103",
			text: "沙依巴克区"
		}, {
			value: "650104",
			text: "新市区"
		}, {
			value: "650105",
			text: "水磨沟区"
		}, {
			value: "650106",
			text: "头屯河区"
		}, {
			value: "650107",
			text: "达坂城区"
		}, {
			value: "650108",
			text: "东山区"
		}, {
			value: "650109",
			text: "米东区"
		}, {
			value: "650121",
			text: "乌鲁木齐县"
		}, {
			value: "650122",
			text: "其它区"
		}]
	}, {
		value: "650200",
		text: "克拉玛依市",
		children: [{
			value: "650202",
			text: "独山子区"
		}, {
			value: "650203",
			text: "克拉玛依区"
		}, {
			value: "650204",
			text: "白碱滩区"
		}, {
			value: "650205",
			text: "乌尔禾区"
		}, {
			value: "650206",
			text: "其它区"
		}]
	}, {
		value: "652100",
		text: "吐鲁番地区",
		children: [{
			value: "652101",
			text: "吐鲁番市"
		}, {
			value: "652122",
			text: "鄯善县"
		}, {
			value: "652123",
			text: "托克逊县"
		}, {
			value: "652124",
			text: "其它区"
		}]
	}, {
		value: "652200",
		text: "哈密地区",
		children: [{
			value: "652201",
			text: "哈密市"
		}, {
			value: "652222",
			text: "巴里坤哈萨克自治县"
		}, {
			value: "652223",
			text: "伊吾县"
		}, {
			value: "652224",
			text: "其它区"
		}]
	}, {
		value: "652300",
		text: "昌吉回族自治州",
		children: [{
			value: "652301",
			text: "昌吉市"
		}, {
			value: "652302",
			text: "阜康市"
		}, {
			value: "652303",
			text: "米泉市"
		}, {
			value: "652323",
			text: "呼图壁县"
		}, {
			value: "652324",
			text: "玛纳斯县"
		}, {
			value: "652325",
			text: "奇台县"
		}, {
			value: "652327",
			text: "吉木萨尔县"
		}, {
			value: "652328",
			text: "木垒哈萨克自治县"
		}, {
			value: "652329",
			text: "其它区"
		}]
	}, {
		value: "652700",
		text: "博尔塔拉蒙古自治州",
		children: [{
			value: "652701",
			text: "博乐市"
		}, {
			value: "652722",
			text: "精河县"
		}, {
			value: "652723",
			text: "温泉县"
		}, {
			value: "652724",
			text: "其它区"
		}]
	}, {
		value: "652800",
		text: "巴音郭楞蒙古自治州",
		children: [{
			value: "652801",
			text: "库尔勒市"
		}, {
			value: "652822",
			text: "轮台县"
		}, {
			value: "652823",
			text: "尉犁县"
		}, {
			value: "652824",
			text: "若羌县"
		}, {
			value: "652825",
			text: "且末县"
		}, {
			value: "652826",
			text: "焉耆回族自治县"
		}, {
			value: "652827",
			text: "和静县"
		}, {
			value: "652828",
			text: "和硕县"
		}, {
			value: "652829",
			text: "博湖县"
		}, {
			value: "652830",
			text: "其它区"
		}]
	}, {
		value: "652900",
		text: "阿克苏地区",
		children: [{
			value: "652901",
			text: "阿克苏市"
		}, {
			value: "652922",
			text: "温宿县"
		}, {
			value: "652923",
			text: "库车县"
		}, {
			value: "652924",
			text: "沙雅县"
		}, {
			value: "652925",
			text: "新和县"
		}, {
			value: "652926",
			text: "拜城县"
		}, {
			value: "652927",
			text: "乌什县"
		}, {
			value: "652928",
			text: "阿瓦提县"
		}, {
			value: "652929",
			text: "柯坪县"
		}, {
			value: "652930",
			text: "其它区"
		}]
	}, {
		value: "653000",
		text: "克孜勒苏柯尔克孜自治州",
		children: [{
			value: "653001",
			text: "阿图什市"
		}, {
			value: "653022",
			text: "阿克陶县"
		}, {
			value: "653023",
			text: "阿合奇县"
		}, {
			value: "653024",
			text: "乌恰县"
		}, {
			value: "653025",
			text: "其它区"
		}]
	}, {
		value: "653100",
		text: "喀什地区",
		children: [{
			value: "653101",
			text: "喀什市"
		}, {
			value: "653121",
			text: "疏附县"
		}, {
			value: "653122",
			text: "疏勒县"
		}, {
			value: "653123",
			text: "英吉沙县"
		}, {
			value: "653124",
			text: "泽普县"
		}, {
			value: "653125",
			text: "莎车县"
		}, {
			value: "653126",
			text: "叶城县"
		}, {
			value: "653127",
			text: "麦盖提县"
		}, {
			value: "653128",
			text: "岳普湖县"
		}, {
			value: "653129",
			text: "伽师县"
		}, {
			value: "653130",
			text: "巴楚县"
		}, {
			value: "653131",
			text: "塔什库尔干塔吉克自治县"
		}, {
			value: "653132",
			text: "其它区"
		}]
	}, {
		value: "653200",
		text: "和田地区",
		children: [{
			value: "653201",
			text: "和田市"
		}, {
			value: "653221",
			text: "和田县"
		}, {
			value: "653222",
			text: "墨玉县"
		}, {
			value: "653223",
			text: "皮山县"
		}, {
			value: "653224",
			text: "洛浦县"
		}, {
			value: "653225",
			text: "策勒县"
		}, {
			value: "653226",
			text: "于田县"
		}, {
			value: "653227",
			text: "民丰县"
		}, {
			value: "653228",
			text: "其它区"
		}]
	}, {
		value: "654000",
		text: "伊犁哈萨克自治州",
		children: [{
			value: "654002",
			text: "伊宁市"
		}, {
			value: "654003",
			text: "奎屯市"
		}, {
			value: "654021",
			text: "伊宁县"
		}, {
			value: "654022",
			text: "察布查尔锡伯自治县"
		}, {
			value: "654023",
			text: "霍城县"
		}, {
			value: "654024",
			text: "巩留县"
		}, {
			value: "654025",
			text: "新源县"
		}, {
			value: "654026",
			text: "昭苏县"
		}, {
			value: "654027",
			text: "特克斯县"
		}, {
			value: "654028",
			text: "尼勒克县"
		}, {
			value: "654029",
			text: "其它区"
		}]
	}, {
		value: "654200",
		text: "塔城地区",
		children: [{
			value: "654201",
			text: "塔城市"
		}, {
			value: "654202",
			text: "乌苏市"
		}, {
			value: "654221",
			text: "额敏县"
		}, {
			value: "654223",
			text: "沙湾县"
		}, {
			value: "654224",
			text: "托里县"
		}, {
			value: "654225",
			text: "裕民县"
		}, {
			value: "654226",
			text: "和布克赛尔蒙古自治县"
		}, {
			value: "654227",
			text: "其它区"
		}]
	}, {
		value: "654300",
		text: "阿勒泰地区",
		children: [{
			value: "654301",
			text: "阿勒泰市"
		}, {
			value: "654321",
			text: "布尔津县"
		}, {
			value: "654322",
			text: "富蕴县"
		}, {
			value: "654323",
			text: "福海县"
		}, {
			value: "654324",
			text: "哈巴河县"
		}, {
			value: "654325",
			text: "青河县"
		}, {
			value: "654326",
			text: "吉木乃县"
		}, {
			value: "654327",
			text: "其它区"
		}]
	}, {
		value: "659001",
		text: "石河子市"
	}, {
		value: "659002",
		text: "阿拉尔市"
	}, {
		value: "659003",
		text: "图木舒克市"
	}, {
		value: "659004",
		text: "五家渠市"
	}]
}, {
	value: '710000',
	text: '台湾省',
	children: [{
		value: "710100",
		text: "台北市",
		children: [{
			value: "710101",
			text: "中正区"
		}, {
			value: "710102",
			text: "大同区"
		}, {
			value: "710103",
			text: "中山区"
		}, {
			value: "710104",
			text: "松山区"
		}, {
			value: "710105",
			text: "大安区"
		}, {
			value: "710106",
			text: "万华区"
		}, {
			value: "710107",
			text: "信义区"
		}, {
			value: "710108",
			text: "士林区"
		}, {
			value: "710109",
			text: "北投区"
		}, {
			value: "710110",
			text: "内湖区"
		}, {
			value: "710111",
			text: "南港区"
		}, {
			value: "710112",
			text: "文山区"
		}, {
			value: "710113",
			text: "其它区"
		}]
	}, {
		value: "710200",
		text: "高雄市",
		children: [{
			value: "710201",
			text: "新兴区"
		}, {
			value: "710202",
			text: "前金区"
		}, {
			value: "710203",
			text: "芩雅区"
		}, {
			value: "710204",
			text: "盐埕区"
		}, {
			value: "710205",
			text: "鼓山区"
		}, {
			value: "710206",
			text: "旗津区"
		}, {
			value: "710207",
			text: "前镇区"
		}, {
			value: "710208",
			text: "三民区"
		}, {
			value: "710209",
			text: "左营区"
		}, {
			value: "710210",
			text: "楠梓区"
		}, {
			value: "710211",
			text: "小港区"
		}, {
			value: "710212",
			text: "其它区"
		}]
	}, {
		value: "710300",
		text: "台南市",
		children: [{
			value: "710301",
			text: "中西区"
		}, {
			value: "710302",
			text: "东区"
		}, {
			value: "710303",
			text: "南区"
		}, {
			value: "710304",
			text: "北区"
		}, {
			value: "710305",
			text: "安平区"
		}, {
			value: "710306",
			text: "安南区"
		}, {
			value: "710307",
			text: "其它区"
		}]
	}, {
		value: "710400",
		text: "台中市",
		children: [{
			value: "710401",
			text: "中区"
		}, {
			value: "710402",
			text: "东区"
		}, {
			value: "710403",
			text: "南区"
		}, {
			value: "710404",
			text: "西区"
		}, {
			value: "710405",
			text: "北区"
		}, {
			value: "710406",
			text: "北屯区"
		}, {
			value: "710407",
			text: "西屯区"
		}, {
			value: "710408",
			text: "南屯区"
		}, {
			value: "710409",
			text: "其它区"
		}]
	}, {
		value: "710500",
		text: "金门县"
	}, {
		value: "710600",
		text: "南投县"
	}, {
		value: "710700",
		text: "基隆市",
		children: [{
			value: "710701",
			text: "仁爱区"
		}, {
			value: "710702",
			text: "信义区"
		}, {
			value: "710703",
			text: "中正区"
		}, {
			value: "710704",
			text: "中山区"
		}, {
			value: "710705",
			text: "安乐区"
		}, {
			value: "710706",
			text: "暖暖区"
		}, {
			value: "710707",
			text: "七堵区"
		}, {
			value: "710708",
			text: "其它区"
		}]
	}, {
		value: "710800",
		text: "新竹市",
		children: [{
			value: "710801",
			text: "东区"
		}, {
			value: "710802",
			text: "北区"
		}, {
			value: "710803",
			text: "香山区"
		}, {
			value: "710804",
			text: "其它区"
		}]
	}, {
		value: "710900",
		text: "嘉义市",
		children: [{
			value: "710901",
			text: "东区"
		}, {
			value: "710902",
			text: "西区"
		}, {
			value: "710903",
			text: "其它区"
		}]
	}, {
		value: "711100",
		text: "新北市"
	}, {
		value: "711200",
		text: "宜兰县"
	}, {
		value: "711300",
		text: "新竹县"
	}, {
		value: "711400",
		text: "桃园县"
	}, {
		value: "711500",
		text: "苗栗县"
	}, {
		value: "711700",
		text: "彰化县"
	}, {
		value: "711900",
		text: "嘉义县"
	}, {
		value: "712100",
		text: "云林县"
	}, {
		value: "712400",
		text: "屏东县"
	}, {
		value: "712500",
		text: "台东县"
	}, {
		value: "712600",
		text: "花莲县"
	}, {
		value: "712700",
		text: "澎湖县"
	}]
}, {
	value: '810000',
	text: '香港',
	children: [{
		value: "810100",
		text: "香港岛",
		children: [{
			value: "810101",
			text: "中西区"
		}, {
			value: "810102",
			text: "湾仔"
		}, {
			value: "810103",
			text: "东区"
		}, {
			value: "810104",
			text: "南区"
		}]
	}, {
		value: "810200",
		text: "九龙",
		children: [{
			value: "810201",
			text: "九龙城区"
		}, {
			value: "810202",
			text: "油尖旺区"
		}, {
			value: "810203",
			text: "深水埗区"
		}, {
			value: "810204",
			text: "黄大仙区"
		}, {
			value: "810205",
			text: "观塘区"
		}]
	}, {
		value: "810300",
		text: "新界",
		children: [{
			value: "810301",
			text: "北区"
		}, {
			value: "810302",
			text: "大埔区"
		}, {
			value: "810303",
			text: "沙田区"
		}, {
			value: "810304",
			text: "西贡区"
		}, {
			value: "810305",
			text: "元朗区"
		}, {
			value: "810306",
			text: "屯门区"
		}, {
			value: "810307",
			text: "荃湾区"
		}, {
			value: "810308",
			text: "葵青区"
		}, {
			value: "810309",
			text: "离岛区"
		}]
	}]
}, {
	value: '820000',
	text: '澳门',
	children: [{
		value: "820100",
		text: "澳门半岛"
	}, {
		value: "820200",
		text: "离岛"
	}]
}, {
	value: '990000',
	text: '海外',
	children: [{
		value: "990100",
		text: "海外"
	}]
}];
/**
 * iframe
 * **/

var iframe = function ($) {

	// 设置iframe 高度
	var _setHeight = function _setHeight() {
		var windows_h = $(document).height() + 50;
		$(window.parent.document).find(".parent-window").css("height", windows_h);
	};

	return {
		setHeight: _setHeight
	};
}(window.jQuery);
/**延迟加载**/

/**
 * 延迟加载
 *  * <img class="load-lazy"
 * 	src="images/Home/lazy.jpg"
 * alt="新品上市图片"
 * data-src="images/Home/板块图片1.png"
 * > 
 * */
var lazy = function ($) {

	var _init = function _init() {

		var window_h = $(window).height();

		$(window).scroll(function () {

			setTimeout(function () {

				$(".load-lazy").each(function () {

					var img_h = parseInt($(this).offset().top) - parseInt(window_h);
					var img_h2 = parseInt($(this).offset().top) + $(this).height();
					if ($(document).scrollTop() >= img_h && $(document).scrollTop() < img_h2) {

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
			}, 100);
		});
	};

	return {
		init: _init
	};
}(window.jQuery || window.Zepto);
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
		mui.ready(function() {

			muiPullToRefresh.init({
				indexPage:1  , 								 // 当前页
				maxPage :10   , 							// 总共页数
				pullToRefreshBig:".pullToRefresh-big" ,	 	// 上拉的大框
				pullToRefreshBox:".pullToRefresh-box"  ,	// 上拉的加载框
				url: "json/index.json",                		// ajax url
				showText:{									// 上拉 的文本
						init:"上拉显示更多",
						down:"上拉显示更多",
						refresh:"正在加载...",
						nomore:"没有更多数据了"
						},   
				obj:{}  ,                              	// ajax 参数
				fn:function(data){
					data = data.constructor === Array ? data : JSON.parse(data);
					var template = Handlebars.compile(document.getElementById("handlebars-templete").innerHTML);
					var html = template({
							lists: data
					});
						
				$(this.pullToRefreshBox).append(html);
																	
									
				}
			});
			

		});


 * 
 * **/

var muiPullToRefresh = function (mui, $) {

	if (!mui) {
		return;
	}

	var _init = function pullUpToRefresh(obj) {
		obj.indexPage = typeof obj.indexPage === "number" ? obj.indexPage : 0;
		obj.maxPage = typeof obj.maxPage === "number" ? obj.maxPage : 0;
		obj.pullToRefreshBig = typeof obj.pullToRefreshBig === "string" ? obj.pullToRefreshBig : ".pullToRefresh-big";
		obj.pullToRefreshBox = typeof obj.pullToRefreshBox === "string" ? obj.pullToRefreshBox : ".pullToRefresh-box";
		obj.url = typeof obj.url === "string" ? obj.url : "";
		obj.obj = obj.obj || {};
		obj.obj = obj.obj.constructor === Object ? obj.obj : {};
		obj.fn = typeof obj.fn === "function" ? obj.fn : function () {};
		obj.showText = obj.showText || { init: "上拉显示更多", down: "上拉显示更多", refresh: "正在加载...", nomore: "没有更多数据了" };

		// 没有更多数据
		if (obj.maxPage <= obj.indexPage) {
			var div = document.createElement("div");
			div.innerText = obj.showText.nomore;
			div.style.textAlign = "center";
			div.style.padding = "10px 0";
			div.style.background = "#efeff4";
			div.style.color = "#777";
			div.style.fontSize = "16px";
			document.querySelector(obj.pullToRefreshBig).appendChild(div);
			$(obj.pullToRefreshBig).css("margin-bottom", "0");

			return;
		}
		//循环初始化所有下拉刷新，上拉加载。
		mui.each(document.querySelectorAll(obj.pullToRefreshBig), function (index, pullRefreshEl) {

			mui(pullRefreshEl).pullToRefresh({

				up: {
					callback: function callback() {
						var self = this;
						setTimeout(function () {
							var ul = self.element.querySelector(obj.pullToRefreshBox);

							//ajax数据 ......		
							$.get(obj.url + "?pullToRefreshBoxid=" + obj.indexPage, obj.obj, function (data) {

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
	};

	return {
		init: _init
	};
}(mui, window.Zepto || window.jQuery);
//
//
//var pickerSelect=(function(mui){
//	
//	
//			// 	一级选择
//		var _oneSelect=	function oneSelect(selector, data) {
//
//				var userPicker = new mui.PopPicker();
//				userPicker.setData(data);
//
//				var showUserPickerButton = document.querySelector(selector);
//
//				showUserPickerButton.addEventListener('tap', function(event) {
//					userPicker.show(function(items) {
//						event.target.blur();
//						showUserPickerButton.value = items[0].text;
//						showUserPickerButton.setAttribute("data-value", items[0].value);
//						//返回 false 可以阻止选择框的关闭
//						//return false;
//					});
//				}, false);
//
//			}
//
//			// 省份-级联示例
//			var _getParam = function(obj, prop) {
//				return obj[prop] || '';
//			};
//
//			// 	二级选择
//	var _twoSelect=		function twoSelect(selector) {
//
//				//级联示例
//				var cityPicker = new mui.PopPicker({
//					layer: 2
//				});
//				cityPicker.setData(cityData);
//				var showCityPickerButton = document.querySelector(selector);
//
//				showCityPickerButton.addEventListener('tap', function(event) {
//					cityPicker.show(function(items) {
//						event.target.blur();
//						showCityPickerButton.value = _getParam(items[0], 'text') + "-" + _getParam(items[1], 'text');
//						//返回 false 可以阻止选择框的关闭
//						//return false;
//					});
//				}, false);
//
//			}
//
//			// 三级选择
//			var _threeSelect=function threeSelect(selector) {
//
//				//级联示例
//				var cityPicker = new mui.PopPicker({
//					layer: 3
//				});
//				cityPicker.setData(cityData3);
//				var showCityPickerButton = document.querySelector(selector);
//
//				showCityPickerButton.addEventListener('tap', function(event) {
//					cityPicker.show(function(items) {
//						event.target.blur();
//						showCityPickerButton.value = _getParam(items[0], 'text') + "-" + _getParam(items[1], 'text')+ "-" + _getParam(items[2], 'text');
//						//返回 false 可以阻止选择框的关闭
//						//return false;
//					});
//				}, false);
//
//			}
//
//			// 日期选择  class="mui-date" type="datetime,date ,time,month"
//		var _dateSelect=	function dateSelect(dateSelect) {
//
//				dateSelect = dateSelect || ".dateSelect";
//				var btns = $(dateSelect);
//
//				btns.each(function(i, btn) {
//
//					btn.addEventListener('tap', function(event) {
//						var _self = this;
//						this.blur();
//						if(_self.picker) {
//							_self.picker.show(function(rs) {
//								_self.value = rs.text;
//								_self.picker.dispose();
//								_self.picker = null;
//							});
//						} else {
//							var optionsJson = this.getAttribute('data-options') || '{}';
//							var options = JSON.parse(optionsJson);
//							var id = this.getAttribute('id');
//
//							_self.picker = new mui.DtPicker(options);
//							_self.picker.show(function(rs) {
//								_self.value = rs.text;
//
//								_self.picker.dispose();
//								_self.picker = null;
//							});
//						}
//
//					}, false);
//
//				});
//			}
//		
//		
//		return{
//			oneSelect:_oneSelect,
//			twoSelect:_twoSelect,
//			threeSelect:_threeSelect,
//			dateSelect:_dateSelect
//				
//		}
//	
//	
//})(mui);
/*
	 滚动监听
	 <body data-spy="spy" data-target="#scroll_ttl">
		 
		 <aside id="scroll_ttl">

			<ul>
				<li class="active">
					<a href="#banner_1">1</a>
				</li>
				<li>
					<a href="#banner_2">2</a>
				</li>
				<li>
					<a href="#banner_3">3</a>
				</li>
			</ul>

		</aside>
	 </body>
 */
var scroll = function ($) {

	var obj = {

		init: function init(top) {

			var _top = Number(top);
			_top = isNaN(_top) ? 0 : _top;

			this.offsetTop = _top;
			this.bindEvent(this.offsetTop);
			this.onLoad();
			this.onReset();
		},

		offsetTop: 0,

		setOffsetTop: function setOffsetTop(top) {
			this.offsetTop = typeof top === "number" ? top : 0;
		},

		onReset: function onReset() {

			$(window).resize(function () {
				this.scrollList();
				this.scroll(this.offsetTop);
			}.bind(this));
		},
		onLoad: function onLoad() {

			$(window).load(function () {
				this.scrollList();
				this.scroll(this.offsetTop);
			}.bind(this));
		},

		selector: function selector() {
			var _tagget = $("[data-spy=spy]").attr("data-target");
			return $(_tagget);
		},

		bindEvent: function bindEvent(top) {

			var p = this.selector();
			this.selector().find(" ul li  a").click(function () {

				// animation
				var $this = $(this);
				var _top = Math.floor($($this.attr("href")).offset().top) - parseInt(top);
				$("body,html").stop().animate({
					scrollTop: _top
				}, 500);
			});
		},

		scroll: function scroll(top) {

			var ff = this.getScrollList;
			var p = this.selector();
			$(window).on("scroll", function () {

				var arrs = ff || [];

				arrs.forEach(function (item) {

					var m1 = parseInt(item.top); //- parseInt(top);
					var m2 = parseInt(item.maxTop); //- parseInt(top);
					if ($(window).scrollTop() >= m1 && $(window).scrollTop() < m2) {
						//alert(item.selector)
						p.find("ul li").removeClass("active");
						$("[href=" + item.selector + "]").parent().addClass("active");
						return false;
					}
				});
			});
		},

		scrollList: function scrollList() {

			var objs = [];

			var _offsetTop = this.offsetTop;
			var els = this.selector().find("li");
			for (var i = 0; i < els.length; i++) {

				var _el = $(els[i]).find("a").attr("href");

				if (_el) {

					var obj = {};
					var _top = Math.floor($(_el).offset().top) - _offsetTop;

					var maxTop = 0;
					if (i < els.length - 1) {
						var _el2 = $(els[i + 1]).find("a").attr("href");
						maxTop = Math.floor($(_el2).offset().top) - _offsetTop;
					} else {
						maxTop = Math.floor($(document).height());
					}

					obj.selector = _el;
					obj.top = _top;
					obj.maxTop = maxTop;
					objs.push(obj);
				}
			}

			return this.getScrollList = objs;
		},

		getScrollList: []

	};

	return {
		init: function init(top) {
			obj.init(top);
		},
		setOffsetTop: function setOffsetTop(top) {
			obj.setOffsetTop(top);
		}
	};
}(window.jQuery || window.Zepto);
/*

三级联动地址

<select id="address_1"  >
	<option value="">==省份==</option>
</select>
<select id="address_2"  >
	<option value="">==省份==</option>
</select>
<select id="address_3"  >
	<option value="">==省份==</option>
</select>
var el_select1 = document.getElementById("address_1");
var el_select2 = document.getElementById("address_2");
var el_select3 = document.getElementById("address_3");

 * */

var threeAddress = function () {

	var _init = function _init(v1, v2, v3) {
		var el_select1 = document.getElementById("address_1");
		var el_select2 = document.getElementById("address_2");
		var el_select3 = document.getElementById("address_3");
		var select_data2 = [];

		v1 = v1 || "省区";
		v2 = v2 || "市区";
		v3 = v3 || "县城";

		//  一级地址
		for (var i in cityData3) {

			var el_option = document.createElement("option");
			el_option.value = cityData3[i].text.toString();
			el_option.innerText = cityData3[i].text.toString();
			el_select1.insertBefore(el_option, null);
		}

		// 二级地址 change event
		el_select1.addEventListener("change", function (e) {
			e = e || event;

			select_data2 = getBYcityValue(cityData3, e.target.value);
			el_select2.innerHTML = "";
			var el_empty = document.createElement("option");
			el_empty.innerText = v2;
			el_select2.insertBefore(el_empty, null);
			for (var i2 in select_data2) {
				var el_option = document.createElement("option");
				el_option.value = select_data2[i2].text.toString();
				el_option.innerText = select_data2[i2].text.toString();

				el_select2.insertBefore(el_option, null);
			}

			// 恢复三级
			el_select3.innerHTML = "";
			var el_empty3 = document.createElement("option");
			el_empty3.innerText = v3;
			el_select3.insertBefore(el_empty3, null);
		});

		// 三级地址 change event
		el_select2.addEventListener("change", function (e) {
			e = e || event;

			var l3 = getBYcityValue(select_data2, e.target.value);
			el_select3.innerHTML = "";
			var el_empty3 = document.createElement("option");
			el_empty3.innerText = v3;
			el_select3.insertBefore(el_empty3, null);
			for (var i3 in l3) {
				var el_option = document.createElement("option");
				el_option.value = l3[i3].text.toString();
				el_option.innerText = l3[i3].text.toString();
				el_select3.insertBefore(el_option, null);
			}
		});

		function getBYcityValue(objs, val) {

			for (var name in objs) {
				if (objs[name].text.trim() === val.trim()) {
					return objs[name].children || [];
				}
			}
		}
	};

	return {
		init: _init
	};
}();
/*
 三级地址
 * 
 * <div class="form-group form-inline">
 * 
	<label for="">year</label>

	<select class="form-control" name="" id="date-year" data-start="1970" data-text="==选择年份==">

	</select>
	<label for="">Month</label>

	<select class="form-control" name="" id="date-month" data-text="==选择月份==">

	</select>
	<label for="">date</label>

	<select class="form-control" name="" id="date-day" data-text="==选择天数==">

	</select>

	</div>
 * 
 * */

var threeDate = function () {

	var _init = function _init() {

		var _year = document.getElementById("date-year");
		var _month = document.getElementById("date-month");
		var _day = document.getElementById("date-day");

		createYear();

		_year.onchange = function () {
			var v = _year.value || "";

			if (v == "") {
				createMonth(0);
				createday(0);
			} else {
				createMonth(12);
				createday(0);
			}
		};

		_month.onchange = function () {
			var y = _year.value || "";
			if (y == "") {
				return;
			}
			var m = _month.value || "";
			if (m == "") {
				createday(0);
				return;
			}
			y = Number(y);
			m = Number(m);
			var d = 0;
			switch (m) {
				case 1:
					d = 31;
					break;
				case 2:
					d = 30;
					if (y % 400 == 0 || y % 4 == 0 && y % 100 != 0) {
						//document.write(num + "是闰年。");
						d = 29;
					} else {
						//document.write(num + "是平年。");
						d = 28;
					}

					break;
				case 3:
					d = 31;
					break;
				case 4:
					d = 30;
					break;
				case 5:
					d = 31;
					break;
				case 6:
					d = 30;
					break;
				case 7:
					d = 31;
					break;
				case 8:
					d = 31;
					break;
				case 9:
					d = 30;
					break;
				case 10:
					d = 31;
					break;
				case 11:
					d = 30;
					break;
				case 12:
					d = 31;
					break;
			}

			createday(d);
		};

		function createYear() {

			var fragment = document.createDocumentFragment();

			var startid = _year.getAttribute("data-start") || 1970;
			var _yearName = _year.getAttribute("data-text") || "==选择年份==";
			startid = Number(startid);
			startid = isNaN(startid) ? 1970 : startid;

			var fragment = document.createDocumentFragment();
			var endId = new Date().getFullYear();

			var _notOption = document.createElement("option");
			_notOption.innerText = _yearName;
			_notOption.value = "";
			_notOption.selected = "selected";
			fragment.appendChild(_notOption);

			for (; startid <= endId; endId--) {
				var _option = document.createElement("option");
				_option.innerText = endId;
				_option.value = endId;
				fragment.appendChild(_option);
			}
			_year.innerHTML = "";
			_year.appendChild(fragment);
		}

		function createMonth(max) {

			//max=max.constructor===Number?max:12;
			var fragment = document.createDocumentFragment();
			var _monthName = _month.getAttribute("data-text") || "==选择月份==";
			var _notOption = document.createElement("option");
			_notOption.innerText = _monthName;
			_notOption.value = "";
			_notOption.selected = "selected";
			fragment.appendChild(_notOption);
			for (var m = 0; m < max; m++) {
				var _option = document.createElement("option");
				_option.innerText = m + 1;
				_option.value = m + 1;
				fragment.appendChild(_option);
			}
			_month.innerHTML = "";
			_month.appendChild(fragment);
		}

		function createday(max) {

			var fragment = document.createDocumentFragment();
			var _dayName = _day.getAttribute("data-text") || "==选择天数==";
			var _notOption = document.createElement("option");
			_notOption.innerText = _dayName;
			_notOption.value = "";
			_notOption.selected = "selected";
			fragment.appendChild(_notOption);
			for (var d = 0; d < max; d++) {
				var _option = document.createElement("option");
				_option.innerText = d + 1;
				_option.value = d + 1;
				fragment.appendChild(_option);
			}
			_day.innerHTML = "";
			_day.appendChild(fragment);
		}
	};

	return {
		init: _init
	};
}();


/*单个按钮组件
 * 
 * 
 * <ul>
 * 	<li class="comp-btn"> 
 * 		<a class="comp-btn-item">技术牛逼</a>
 * 	</li>
 * 	<li class="comp-btn"> 
 * 		<a class="comp-btn-item">信息大师</a>
 * 	</li>
 * </ul>
 * 
 * 		
 * 选中点击事件
		$(".comp-btn").on("comp_btn_select",function(event,element){			
			
			// element 当前点击的元素
			alert($(element));
		});
		
		// 取消点击事件
		$(".comp-btn").on("comp_btn_unselect",function(event,element){			
			
			// element 当前点击的元素
			alert($(element));
		});
 * 
 * */

+function ($) {

	$(".comp-btn-item").on("click", function () {

		if (typeof $(this).attr("data-bl") === "undefined") {
			$(this).addClass("active");
			$(this).attr("data-bl", "true");

			//点击触发自定义事件
			$(this).trigger("comp_btn_select", [this]);
		} else {
			//点击触发自定义事件
			$(this).trigger("comp_btn_unselect", [this]);
			$(this).removeClass("active");
			$(this).removeAttr("data-bl");
		}
	});
}(window.jQuery || window.Zepto);
/*****单选按钮组件**
 * 
 * 
 * <div class="comp-radio">             
   <div class="comp-radio-item active">盆</div>
   <div class="comp-radio-item">箱</div>
   <div class="comp-radio-item">斤</div>
   <div class="comp-radio-item">米</div>
   </div>
 * 
 * 
 * ****/

+function ($) {

	$(".comp-radio-item").on("tap", function () {
		var p = $(this).parents(".comp-radio");
		$(".comp-radio-item", p).removeClass("active");
		$(this).addClass("active");

		//点击触发自定义事件
		$(this).trigger("radio_click", [this]);
	});
}(window.jQuery || window.Zepto);

mui.init({

	swipeBack: true //启用右滑关闭功能

});

$(".icon-back").on("tap", function () {

	if (history.back) {
		history.back();
	}
});
/*
  
<div class="number" >
    <button class="plus btn" type="button">+</button>
  <input class="num" type="number" value="1"data-min="0" data-max="9999" data-step="1" />
   <button class="minus btn" type="button">-</button>
  
 </div>

 * 数字框组件start
 * 事件：number_click
 *
 * 点击事件
	$(".number").on("number_click",function(event,element){			
		//element 当前点击的元素	
		var p=$(element).parents(".number");
		alert($(p).find(".num").val());
							
	});
 * */

+function ($) {

	//minus
	$(".minus").on("click", function (e) {
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
	$(".plus").on("click", function (e) {
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
    $(this).trigger("tab_select");
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
/*es6*/