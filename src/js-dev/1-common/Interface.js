
/*鸭式变形法*/
// 定义接口
function Interface(interName, props) {
    if (arguments.length !== 2) {
        throw new Error("parameter length must is two");
    }
    if (typeof interName !== "string") {
        throw new Error("interName must is string");
    }
    this.interName = interName;
    this.props = [];
    if (typeof props === "object" && props.constructor === Array) {

        for (var i in props) {
            if (typeof props[i] === "string") {
                this.props.push(props[i]);
            }

        }

    }
}

// 检查是否实现接口
Interface.check = function (obj) {
    if (arguments.length < 2) {
        throw new Error("arguments  length must  is two");
    }
    // 遍历接口
    for (var i = 1; i < arguments.length; i++) {
        var inter = arguments[i];
        if (inter.constructor !== Interface) {
            throw new Error("not Interface type ");
        }
        for (var y in inter.props) {
            var propName = inter.props[y];

            if (!obj[propName]) {
                throw new Error(" Interface " + inter.interName + "  not implemented  properties name is " + propName);
            }
        }
    }

    return true;
}



        /*实现例子*/

        //// 创建接口 Icat
        //var Icat = new Interface("Icat", ["add", "get"]);

        //// 创建类 Cat 并实现Icat接口
        //var Cat = function (name) {
        //    this.name = name;
        //    this.constructor.prototype.add = function () {
        //        alert("add");
        //    }
        //    this.constructor.prototype.get = function () {
        //        alert("get");
        //    }

        //    // 检查是否实现接口
        //    Interface.check(this, Icat);
        //}

        //var cat1 = new Cat();
        //cat1.add();
