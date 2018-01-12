

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


+(function($) {

	
	$(".check-btn-item").on("click",function() {

		if(typeof $(this).attr("data-bl") === "undefined") {
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

})(window.jQuery || window.Zepto);