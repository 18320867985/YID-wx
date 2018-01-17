var index=(function(){
	
	var _init=function(){
		
		$(".head.mui-bar").find("input[type=search]").on("tap",function(){
			
			var url=$(this).attr("data-url");
			if(typeof url!=="undefined"){
				 window.location.assign(url);
			}
			
		});
		
	}
	
	return{
		init:_init
	}
	
})();
