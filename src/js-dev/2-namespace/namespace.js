	var rootName = "hqs"; // 顶级命名空间
	var rootObj = window[rootName] = {};

	var namespace = {}; // 
	namespace.extend = function(ns, nsString) {
		if(typeof nsString !== "string") {
			throw new Error("nsString must string type");
		}
		var parent = ns;
		var arrs = nsString.split(".");
		for(var i = 0; i < arrs.length; i++) {
			var prop = arrs[i];
			if(typeof ns[prop] === "undefined") {
				parent[prop] = {};
			}
			parent = parent[prop];
		}

		return parent;
	}
	
/*namespace.extend(rootObj, "api").bsDate=()(function(){})*/