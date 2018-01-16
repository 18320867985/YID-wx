mui.init({

	swipeBack: true //启用右滑关闭功能

});

/*****置顶组件start*********/
(function($, mui) {

	$(".icon-back").on("tap", function() {

		if(history.back) {
			history.back();
		}
	});

	$(window).scroll(function() {

		if($(window).scrollTop() >= 500) {
			$(".zhiding").show();
		} else {
			$(".zhiding").hide();
		}

	});

	//置顶点击
	$(".zhiding").on("tap", function() {
		mui.scrollTo(0, 300);
	});



})(window.Zepto, mui);



// 页脚的跳转
$(".mui-bar-tab a").on("tap",function(){

	var href=$(this).attr("href");
	window.location.assign(href);
})
