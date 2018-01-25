/*
 * 商品批量购买
 * */

var  batch  = (function() {

	var _init = function() {

		
		
		// checkbox 选择
			$(".batch-select .check-all").on("tap", function() {

				if($(this).attr("data-bl")) {
					$(this).removeClass("icon-xuanzhongduigou").addClass("icon-checknormal");
					$(this).removeAttr("data-bl");
					select_ck(false)
					
				} else {
					$(this).removeClass("icon-checknormal").addClass("icon-xuanzhongduigou");
					$(this).attr("data-bl", true);
					select_ck(true);
				}
			});
			

		//	label-click	
		$(".batch-select  .label-click").on("tap",function(){
			$(".check-all",".batch-select").trigger("tap");
		})
		
		// checkbox function
		function select_ck(bl) {

			if(bl) {
				var els=$(".shop-cont input[type=checkbox]");
					els.attr("checked", false);
					els.click();
					els.attr("checked", true);

			} else {
				var els=$(".shop-cont input[type=checkbox]");
					els.click()
					els.attr("checked", false);
			}

		}

	}

	return {
		init: _init
	}

})();
