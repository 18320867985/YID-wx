/*  左右两边滑动菜单
 
 	//  左右两边滑动菜单ttl 点击事件
	$(".topBottomTab-menu-ttl ").on("topBottomTab_tap",function(target,el){
		alert($(el).text());
	});
	
 */

+ function($) {

	setHeight();

	//改变大小
	$(window).resize(function() {
		setHeight();
	})

	function setHeight() {

		//获取head高度
		var top_h = $(".topBottomTab-top").height() + 1;
		//获取底部高度
		var bottom_h = $(".topBottomTab-bottom").height() + 1;
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
	$(".topBottomTab-menu-ttl ul").on("tap","li", function() {

		$(".topBottomTab-menu-ttl  ul li").removeClass("active");
		$(this).addClass('active');

		//点击触发自定义事件
		$(this).trigger("topBottomTab_tap", [this]);
	});

}(window.jQuery || window.Zepto)