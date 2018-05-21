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

namespace.extend(rootObj, "api").wxLazy = (function($) {

var _init = function() {

		var window_h = $(window).height();

		$(window).scroll(function() {
			
				setTimeout(function() {
					
						$(".load-lazy").each(function() {

								var img_h = parseInt($(this).offset().top) - parseInt(window_h);
								var img_h2 = parseInt($(this).offset().top) + $(this).height();
								if($(window).scrollTop() >= img_h && $(window).scrollTop() < img_h2) {

									// set src
									var _src = $(this).attr("src") || "";
									var _src2 = $(this).attr("data-src") || "";
									if(_src.trim() !== _src2.trim()) {

										// is support animate
										if($(this).animate) {
											$(this).attr("src", $(this).attr("data-src")).animate({
											
												"opacity":0.8
											},400).animate({
												
												"opacity":1
											},400);
											
											
										} else {
											$(this).attr("src", $(this).attr("data-src"));
										}

									}

								}

						});
				}, 400);
				
			});
		
};

var _reset = function() {

	$(".load-lazy").each(function() {
		$(this).attr("src", $(this).attr("data-src"));
	});
};

return {
	init: _init,
	reset: _reset
}

})(window.jQuery || window.Zepto);