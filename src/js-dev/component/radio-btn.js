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


+(function($){
	
	$(".radio-btn-item").on("tap",function(){
		var p=$(this).parents(".radio-btn");
		$(".radio-btn-item",p).removeClass("active");
		$(this).addClass("active");
		
		//点击触发自定义事件
		$(this).trigger("radio_click",[this]);
	});
	

	
	
	
})(window.jQuery||window.Zepto)
