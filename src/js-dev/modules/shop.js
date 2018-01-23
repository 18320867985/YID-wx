var shop = (function() {

	var _init = function() {
	
		// 编辑
		$(".head-right-btn").on("tap",function(){
			var o=$(this).attr("data-text")||{};
			o=JSON.parse(o);
			var isEdit=$(this).attr("data-edit");
			
			if(typeof isEdit==="undefined"){
				
				// 编辑
				$(this).text(o.complate);
				$(this).attr("data-edit",true);
				isShow(false);
			
			}else{
					
				//完成
				$(this).text(o.edit);
				$(this).removeAttr("data-edit");
				isShow(true); 
			
			}
		});
		
		
		// 结算与删除 show  or  hide
		function isShow(bl){
			
			if(bl){
				$(".shop-select .edit").show();
				$(".shop-select .complate").hide();
			}else{
				$(".shop-select .edit").hide();
				$(".shop-select .complate").show();
			}
		}
		
		
		// checkbox 选择
		$("#check_all").on("click", function() {

			if($(this).attr("data-bl")) {
				$(this).removeAttr("data-bl");
				select_ck(false);

			} else {

				$(this).attr("data-bl", "true");
				select_ck(true);

			}

		});
		
		// checkbox function
		function select_ck(bl) {

			if(bl) {

				$(".shop-item input[type=checkbox]").each(function() {
					if($(this).attr("checked") != "false") {
						$(this).triggerHandler("tap");
						$(this).attr("checked", true);
					}

				});
				

			} else {

				$(".shop-item input[type=checkbox]").each(function() {
					$(this).triggerHandler("tap");
					$(this).removeAttr("checked");

				});
				
			}

		}

	}

	return {
		init: _init
	}

})();