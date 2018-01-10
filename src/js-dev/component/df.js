
mui.init({
	
	swipeBack: true //启用右滑关闭功能
			
});

$(".icon-back").on("tap",function(){
	
	if(history.back){
		history.back();
	}
})
