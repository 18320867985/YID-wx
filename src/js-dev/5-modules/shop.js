
namespace.extend(rootObj, "page").shop = (function() {

	var _init = function() {

		// 编辑
		$(".head-right-btn").on("tap", function() {
			var o = $(this).attr("data-text") || {};
			o = JSON.parse(o);
			var isEdit = $(this).attr("data-edit");

			if(typeof isEdit === "undefined") {

				// 编辑
				$(this).text(o.complate);
				$(this).attr("data-edit", true);
				isShow(false);
				select_ck(false);
				$(".shop-select .check-all").removeClass("icon-xuanzhongduigou").addClass("icon-checknormal");
				$(".shop-select .check-all").removeAttr("data-bl");
				

			} else {

				//完成
				$(this).text(o.edit);
				$(this).removeAttr("data-edit");
				isShow(true);
				select_ck(false);
				$(".shop-select .check-all").removeClass("icon-xuanzhongduigou").addClass("icon-checknormal");
				$(".shop-select .check-all").removeAttr("data-bl");
				$(".shop-select").find(".price").text("0.00");
				$(".shop-select").find(".count").text("0");

			}
		});


		// 结算与删除 show  or  hide
		function isShow(bl) {

			if(bl) {
				$(".shop-select .edit").show();
				$(".shop-select .complate").hide();
			} else {
				$(".shop-select .edit").hide();
				$(".shop-select .complate").show();
			}
		}

		// checkbox 选择
			$(".shop-select .check-all").on("tap", function() {

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
		$(".shop-select .label-click").on("tap",function(){
			$(".shop-select .check-all").trigger("tap");
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