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

+ function($) {

	setHeight();

	//改变大小
	$(window).resize(function() {
		setHeight();
	})

	function setHeight() {

		//获取head高度
		var top_h = $(".topBottomTab-top").height() ;
		//获取底部高度
		var bottom_h = $(".topBottomTab-bottom").height() ;
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
	$(".topBottomTab-menu-ttl ul").on("tap", "li", function() {

		$(".topBottomTab-menu-ttl  ul li").removeClass("active");
		$(this).addClass('active');

		//点击触发自定义事件
		$(this).trigger("topBottomTab_tap", [this]);
	});

}(window.jQuery || window.Zepto);