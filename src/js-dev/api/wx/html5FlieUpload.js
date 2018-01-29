
	/*
	 * h5文件上传插件
	 * var file=document.getElementById("fileUp").files[0];
				
            	h5File.upload({
            		data:file,
            		url:"",
            		outTime:30000,
            		el:$(this),
            		size:10000000, //1m=1000000
            		seccess:function(){},//成功回调
            		error:function(){} //错误回调
            	
            	});//调用上传接口

	 <div class="progress-box">
		<!-- 点击提交按钮-->	
		<input type="button" name="up" id="up" value="上传" />	
		<input class="v-hide" type="file" name="" 
		id="fileUp" value=""   accept="image/*" />
		<!--进度条-->
		<div class="progress-all">
			<div class="progress-now"></div>
			<div class="progress-num">0%</div>
		</div>
				
	</div>
	 * 
	 * 
	 * */

	var h5File=(function($,mui){
	
	var fileUpload= function(option) {
		
		if(typeof option !=='object'){
			alert("参数有误！");
			 return ;
		}
		
		
		if(option.size){
			if(option.data.size>option.size){
				mui.alert("文件大于"+option.size/1000000+"M");
				 return ;
			}
		}else{
		mui.alert("参数没有设置文件大小值[size]");
		 return ;	
		}
		
	var data = new FormData();
	
   	 data.append('myFiles', option.data);
		
	    $.ajax({
	        url: option.url,
	        data: data,
	        type: "post",
	        timeout: option.outTime,
	        cache: false,
	        processData: false,
	        contentType: false,
	        xhrFields: {
	            withCredentials: true
	        },
	        xhr: function(){
	            //获取ajaxSettings中的xhr对象，为它的upload属性绑定progress事件的处理函数
	            var myXhr = $.ajaxSettings.xhr();
	            if(myXhr.upload){ //检查upload属性是否存在
	                //绑定progress事件的回调函数
	                myXhr.upload.onprogress = progressFunction;
	            }
	            return myXhr; //xhr对象返回给jQuery或zepto使用
	        },
	        success: option.seccess,
	        error: option.error
	    });
	
	    //progress事件的回调函数
	    function progressFunction(evt) {
	
	      var p=  $(option.el).parents(".progress-box");
	       var widthAll=$(".progress-all",p).width();
	        var progressBar = $(".progress-all",p);
	        var percentageDiv =$(".progress-now",p);
	        var percentageNum =$(".progress-num",p);
	
	        if (evt.lengthComputable) {
	              progressBar.max = evt.total;
	              progressBar.value = evt.loaded;
	             $(percentageDiv).css("width",Math.round(evt.loaded / evt.total *widthAll)+"px");
	            $(percentageNum).text(Math.ceil(evt.loaded / evt.total * 100) + "%");
	//          if (evt.loaded == evt.total) {
	//            //  console.log("上传完成100%");
	//          }
	        }
	    }
	};
	
	
	return {
		upload:fileUpload
		
	};
	
	})(window.Zepto||window.jQuery,window.mui);