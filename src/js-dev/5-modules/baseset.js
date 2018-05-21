/**
 * baseset 修改基本信息
 * 
 * **/
namespace.extend(rootObj, "page").baseset = (function() {

	var edit = function(fn) {

		//修改show
		$(".baseset-xx .edit").on("tap", function() {
			$(".baseinfo-alert").show();
			var v = $(this).find("span").text();
			var p = $(".baseinfo-alert");

			$(".back-ttl", p).text($(this).prevAll("label").text());
			$(p).find(".txt-v").val(v).focus(); // 内容值
			$(p).find(".txt-v").attr("data-filed", $(this).attr("data-filed"));
			var pattern = $(this).attr("data-pattern");
			var pattern_msg = $(this).attr("data-pattern-msg");
			var data_empty = $(this).attr("data-empty");
			$(p).find(".txt-v").attr("data-empty", data_empty);
			if(typeof pattern !== "undefined") {
				$(p).find(".txt-v").attr("data-pattern", pattern);
				$(p).find(".txt-v").attr("data-pattern-msg", pattern_msg);
			
				
			} else {
				$(p).find(".txt-v").removeAttr("data-pattern");
				$(p).find(".txt-v").removeAttr("data-pattern-msg");
				
			}

		});

		// 返回hide
		$(".baseinfo-alert .close").on("tap", function() {
			$(this).parents(".baseinfo-alert").hide();

		});

		// 保存
		$(".baseinfo-alert .btn").on("tap", function() {
			edit.apply(this);
		});

		// 修改信息api
		function edit() {

			var p = $(".baseinfo-alert");
			var v = $(".txt-v", p).val(); // 内容值
			var filed = $(".txt-v", p).attr("data-filed") || ""; //字段名称
			var regx_v = $(".txt-v", p).attr("data-pattern"); //字段名称
			var regx_msg = $(".txt-v", p).attr("data-pattern-msg") || ""; //字段名称
			var btn_text=$(this).attr("data-btn-text");
			var empty= $(".txt-v", p).attr("data-empty")||"not data  is empty";
			// 非空验证
			if(v == "" || v === null) {
				mui.alert(empty, " ", btn_text, function() {});
				return;
			}
			// 正则验证
			var regx = new RegExp(regx_v, "ig");
			if(!regx.test(v)) {
				mui.alert(regx_msg, " ", btn_text, function() {});
				return;
			}
			
			 if(typeof  fn!=="undefined"){
			 	fn(v,filed);
			 }

			$(".baseinfo-alert").hide(); // 大框hide
			// $(".txt-v", p).val();
			//	});

		};

	}

	return {
		edit: edit
	}

})();