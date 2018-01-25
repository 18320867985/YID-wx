/** 上拉加载
 * 
 * <!--pullToRefresh-big 上拉加载大框-->
			<div class="index-list  pullToRefresh-big">
				
				<!-- pullToRefresh-box 上拉加载每一项-->
				<div class="mui-row pullToRefresh-box">
					<div class="mui-col-xs-6 ">
						<a href="javascript:;">
							<img src="images/index-list (1).png" alt="img" />
						</a>
						<div class="caption mui-text-left">
							<h4 class="mui-ellipsis width-100">Theland新西兰进口牛奶牛市兰</h4>
							<p class="">口牛奶牛市兰</p>
							<p>250ml*24 <span>家庭装</span></p>
							
							<div class="op mui-clearfix">
								<span class="text-danger">79.9元/箱</span>
								 <button class="btn" type="button">立即购买</button>
							</div>
						</div>
						
					</div>
					
				</div>
					
		</div>
		
	// js  
		mui.ready(function() {

			muiPullToRefresh.init({
				indexPage:1  , 								 // 当前页
				maxPage :10   , 							// 总共页数
				pullToRefreshBig:".pullToRefresh-big" ,	 	// 上拉的大框
				pullToRefreshBox:".pullToRefresh-box"  ,	// 上拉的加载框
				url: "json/index.json",                		// ajax url
				showText:{									// 上拉 的文本
						init:"上拉显示更多",
						down:"上拉显示更多",
						refresh:"正在加载...",
						nomore:"没有更多数据了"
						},   
				obj:{}  ,                              	// ajax 参数
				fn:function(data){
					data = data.constructor === Array ? data : JSON.parse(data);
					var template = Handlebars.compile(document.getElementById("handlebars-templete").innerHTML);
					var html = template({
							lists: data
					});
						
				$(this.pullToRefreshBox).append(html);
																	
									
				}
			});
			

		});


 * 
 * **/

var muiPullToRefresh = (function(mui, $) {

	if(!mui) {
		return;
	}


	var _init = function pullUpToRefresh(obj,fn) {
		obj.indexPage = typeof obj.indexPage === "number" ? obj.indexPage : 0;
		obj.maxPage = typeof obj.maxPage === "number" ? obj.maxPage : 0;
		obj.pullToRefreshBig = typeof obj.pullToRefreshBig === "string" ? obj.pullToRefreshBig : ".pullToRefresh-big";
		obj.pullToRefreshBox = typeof obj.pullToRefreshBox === "string" ? obj.pullToRefreshBox : ".pullToRefresh-box";
		obj.url = typeof obj.url === "string" ? obj.url : "";
		obj.obj = obj.obj || {};
		obj.obj = obj.obj.constructor === Object ? obj.obj : {};
		
		obj.fn = typeof obj.fn === "function" ? obj.fn : function() {};
		obj.showText=obj.showText||{init:"上拉显示更多",down:"上拉显示更多",	refresh:"正在加载...",nomore:"没有更多数据了"};

	
	
		// ajax数据 ......		
		$.get(obj.url + "?pullToRefreshBoxid=" + obj.indexPage, obj.obj, function(data) {
			
			$(obj.pullToRefreshBox).empty();
			obj.fn(data);
			obj.indexPage++; //页码
		
			// 回调函数
			 if(typeof fn==="function"){
			 	fn(data);
			 }
		});

			
		// 没有更多数据
		if(obj.maxPage <= obj.indexPage) {
			var div = document.createElement("div");
			div.innerText = obj.showText.nomore;
			div.style.textAlign = "center";
			div.style.padding = "10px 0";
			div.style.background = "#fff";
			//div.style.color = "#777";
			//div.style.fontSize = "14px";
			div.classList.add("mui-pull-bottom-wrapper");
			//document.querySelector(obj.pullToRefreshBig).innerHTML="";
			document.querySelector(obj.pullToRefreshBig).appendChild(div);
			$(obj.pullToRefreshBig).css("margin-bottom", "0");
			
			return;
		}
	
		 
		//循环初始化所有下拉刷新，上拉加载。
		mui.each(document.querySelectorAll(obj.pullToRefreshBig), function(index, pullRefreshEl) {
			

			mui(pullRefreshEl).pullToRefresh({
	
				up: {
					
					callback: function() {
						var self = this;
						self.refresh(true);
						setTimeout(function() {
							var ul = self.element.querySelector(obj.pullToRefreshBox);

							//ajax数据 ......		
							$.get(obj.url + "?pullToRefreshBoxid=" + obj.indexPage, obj.obj, function(data) {

								obj.fn(data);
								obj.indexPage++; //页码
								self.endPullUpToRefresh((obj.indexPage > obj.maxPage));
							
							});

						}, 1000);
					},
					contentinit: obj.showText.init,
					contentdown:obj.showText.down,
					contentrefresh: obj.showText.refresh,
					contentnomore: obj.showText.nomore,
				}

			});

		});
		
		return obj;
	}
	


	return {
		init: _init,
		
	}

})(mui, window.Zepto || window.jQuery);

