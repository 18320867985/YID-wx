
/**
 * mui  select date
 *<input class="date-box mui-date" type="text" data-options='{"type":"datetime","beginYear":2010,"endYear":2050}' name="" id="" value="" placeholder="输入时间" />
 * 	
 * // css
 * <link rel="stylesheet" href="css/mui.picker.min.css" />
 * 
 * //js
 * 	<script src="js/mui.picker.min.js" type="text/javascript" charset="utf-8"></script>
 * 
 * **/ 

var muiSelectDate=(function(){
	
		var _init=  function(selector) {
				selector=selector||".mui-date";
				if(typeof selector === "string") {

					// 时间
					var btns = mui(selector);
					btns.each(function(i, btn) {

						btn.addEventListener('tap', function() {
							this.blur();
							var optionsJson = this.getAttribute('data-options') || '{}';
							var options = JSON.parse(optionsJson);

							/*
							 * 首次显示时实例化组件
							 * 示例为了简洁，将 options 放在了按钮的 dom 上
							 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
							 */
							var picker = new mui.DtPicker(options);
							picker.show(function(rs) {
								btn.value = rs.text;
								picker.dispose();

							});
						}, false);
						
					});
				}
			}
		
		
		return {
			init:_init
		}
		
	
})();