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
	
  =======================================分页============================================
  			wxLazy.init(); // 图片延迟加载

			mui.ready(function() {

				// 分页
				muiPullToRefreshObj = page(1, 2, {
					name: "mini",
					age: 12
				}, function() {
					wxLazy.reset(); // 重新执行 图片延迟加载
				});

				// 查询
				$(".submit-btn").on("tap", function() {

					resetPage(1, 4); //重新加载分页
				});

			});

			var muiPullToRefreshObj = {}; // 获取 上拉加载对象
			// 重新加载分页
			function resetPage(min, max, obj,olddata) {

				muiPullToRefreshObj.indexPage = min;
				muiPullToRefreshObj.maxPage = max;
				muiPullToRefreshObj.obj = obj || {}; // 
				muiPullToRefreshObj.getFirstPage();   // muiPullToRefreshObj.getFirstPage(olddata);   // 已有的数据
				if(muiPullToRefreshObj.self) {
					muiPullToRefreshObj.self.refresh(true);
				}
			}

			// 分页
			function page(min, max, obj, fn,olddata) {
				return muiPullToRefresh.init({
					indexPage: min, // 当前页
					maxPage: max, // 总共页数
					pullToRefreshBig: ".pullToRefresh-big", // 上拉的大框
					pullToRefreshBox: ".pullToRefresh-box", // 上拉的加载框
					url: "json/index.json", // ajax url
					showText: { // 上拉 的文本
						init: "上拉显示更多",
						down: "上拉显示更多",
						refresh: "正在加载...",
						nomore: "没有更多数据了"
					},

					obj: obj, // ajax 参数
					fn: function(data) {
						data = data.constructor === Array ? data : JSON.parse(data);
						var template = Handlebars.compile(document.getElementById("handlebars-templete").innerHTML);
						var html = template({
							lists: data
						});

						$(this.pullToRefreshBig).find(this.pullToRefreshBox).append(html);

					}
				}, fn,olddata);

			}

	==========================================================================================
 * 
 * **/

namespace.extend(rootObj, "api").muiPullToRefresh = (function(mui, $) {

	if(!mui) {
		return;
	}

	var _init = function pullUpToRefresh(obj, fn,oldData) {
		obj.indexPage = typeof obj.indexPage === "number" ? obj.indexPage : 0;
		obj.maxPage = typeof obj.maxPage === "number" ? obj.maxPage : 0;
		obj.pullToRefreshBig = typeof obj.pullToRefreshBig === "string" ? obj.pullToRefreshBig : ".pullToRefresh-big";
		obj.pullToRefreshBox = typeof obj.pullToRefreshBox === "string" ? obj.pullToRefreshBox : ".pullToRefresh-box";
		obj.url = typeof obj.url === "string" ? obj.url : "";
		obj.obj = obj.obj || {};
		obj.obj = obj.obj.constructor === Object ? obj.obj : {};
		obj.endPullUp=false;

		obj.fn = typeof obj.fn === "function" ? obj.fn : function() {};
		obj.showText = obj.showText || {
			init: "上拉显示更多",
			down: "上拉显示更多",
			refresh: "正在加载...",
			nomore: "没有更多数据了"
		};
		obj.getFirstPage = getFirstPage;

		if(getFirstPage(oldData)) {
			return;
		}

		function getFirstPage(oldData) {
			var bl = false; 
			
			// 原有的数据
			if(oldData){
				$(obj.pullToRefreshBig).find(obj.pullToRefreshBox).html("");
				obj.fn(oldData);
				//obj.indexPage++; //页码
				// 回调函数
				if(typeof fn === "function") {
					fn(oldData);
				}
			}
			else{
				
			// ajax数据 ......		
			$.get(obj.url + "?pullToRefreshBoxid=" + obj.indexPage, obj.obj, function(data) {
				
				$(obj.pullToRefreshBig).find(obj.pullToRefreshBox).html("");
				obj.fn(data);
				//obj.indexPage++; //页码
				// 回调函数
				if(typeof fn === "function") {
					fn(data);
				}
				
				
			});
		}

			// 没有更多数据
			if(obj.maxPage <= obj.indexPage) {
				$(obj.pullToRefreshBig).find(".mui-pull-bottom-wrapper").remove();
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
				$(obj.pullToRefreshBig).find(".mui-pull-bottom-tips").remove();
				
				 bl=true;
			}
			
			return bl;
			

		}
		
		
		//循环初始化所有下拉刷新，上拉加载。 
		mui.each(document.querySelectorAll(obj.pullToRefreshBig), function(index, pullRefreshEl) {

			mui(pullRefreshEl).pullToRefresh({

				up: {

					callback: function() {
						obj.self=this;
						var self = this;
						//self.refresh(true);
						setTimeout(function() {
							var ul = self.element.querySelector(obj.pullToRefreshBox);

							//ajax数据 ......		
							obj.endPullUp=obj.indexPage >= obj.maxPage;
							if(obj.endPullUp){
							
								return;
							}
							var pullToRefreshBoxid=obj.indexPage+1;
							$.get(obj.url + "?pullToRefreshBoxid=" +pullToRefreshBoxid , obj.obj, function(data) {

								obj.fn(data);
								obj.indexPage++; //页码
								self.endPullUpToRefresh(obj.indexPage >= obj.maxPage);

							});

						}, 1000);
					},
					contentinit: obj.showText.init,
					contentdown: obj.showText.down,
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