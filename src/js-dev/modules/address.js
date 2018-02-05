/**
 * 收货地址
 * **/

var address = (function() {

	var obj = {
		id: 1,
		isDefault: true, // 是否设为默认值
		name: "刘小明",
		phone: "13488889999",
		address: "广东省-深圳市-福田区",
		dtlAddress: "福华路海鹰大厦28E"
	}
	var list = [];
//list.push(obj);

	// 获取地址列表
	var _getAddressList = function() {

		return com.localStorage.getItem("address") ||[];

	}
	// 获取地址列表
	var _setAddress = function(obj) {
		var arrs = com.localStorage.getItem("address") || [];
		
		// 设为默认
		if(obj.isDefault=="1"){
			com.list.map(arrs,function(item){
				item.isDefault=false;
			
			});
		}
		obj.isDefault=Number(obj.isDefault);
		//自增id
		 var  lastObj=common.list.last(arrs);
		 	 obj.id=lastObj?lastObj.id+1:1;
		 
		var index = arrs.push(obj);
		com.localStorage.setItem("address", arrs);
		return index;

	}
	
	// 根据id去查询数据
	function _where(qid){
		return  com.list.where(com.localStorage.getItem("address")||[],function(item){
			return item.id==qid;
		});
		
		
	};



	// 修改数据
	function _edit(obj){
		var data=com.localStorage.getItem("address")||[];

		var index=com.list.index(data,function(item){
			return item.id==obj.id;
		});
		
		// 设置默认值
		if(Number(obj.isDefault)){
			com.list.map(data,function(item){
				item.isDefault=0;
				 return item;
			});
		}
		data.splice(index,1,obj);
		com.localStorage.setItem("address", data);
		return  true;
	}
	
	// 删除数据
	function _delete(id){
		var data=com.localStorage.getItem("address")||[];
	
		var index=com.list.index(data,function(item){
			return	id===item.id;
		});

		data.splice(index,1);
		com.localStorage.setItem("address", data);
		return index;
		
	};
	
	
	

	return {
		getAddressList: _getAddressList,
		setAddress: _setAddress,
		where:_where,
		edit:_edit,
		delete:_delete
	}

})();