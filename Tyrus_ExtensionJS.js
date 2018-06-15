/*
 * @Tyrus_ExtensionJS
 * @Author: Tyrus 
 * @Date: 2018-03-14 16:09:25 
 * @Last Modified by: Tyrus
 * @Last Modified time: 2018-06-15
 */


// 移除数组选中项 
/* 
    此方法返回新数组 
    避免splice改变原数组
    参数1：数值 索引
*/
Array.prototype.removeTheItem = function (x) {

    if (typeof x !== 'number') 
        return 'Ty_err: 参数不是Number类型'
    
    var n = []
    for (var i = 0; i < this.length; i++) {
        if (i !== x) {
            n.push(this[i])
        }
    }
    
    return n
}




// 数字从大到小/从小到大排序
/* 
    此方法会改变原始数组
    参数1：true 从大到小排序
          默认/false 从小到大排序
*/
Array.prototype.sortFromNum = function (x) {

    if (x != null && typeof x !== 'boolean') 
        return 'Ty_err: 参数不是Bool类型'

    var x = x || false
    var n = 0
    for (var i = 0; i < this.length; i++) {
        for (var j = 0; j <= i; j++) {

            if (x == true) {
                if (this[i] > this[j]) {
                    n = this[i]
                    this[i] = this[j]
                    this[j] = n
                }

            } else {
                
                if (this[i] < this[j]) {
                    n = this[i]
                    this[i] = this[j]
                    this[j] = n
                }

            }
        }
    }
    return this
}




// 取数组中最大项/最小项
/* 
    此方法不会改变原始数组
    参数1：true/1 取数组中最大值
           默认/false/0 取数组中最小值
*/
Array.prototype.getMaxOrMinItem = function (k) {
    var k = k || false
    // 返回值在初始化时应当赋值数组其中一项
    // 否则会在返回最小值时报错
    var n = this[(Math.random() * (this.length-1)).toFixed(0)]
    for (var i = 0; i < this.length; i++) {
        if (k == true) {
            if (this[i] > n) {
                n = this[i]
            }
        } else {
            if (this[i] < n) {
                n = this[i]
            }
        }
    }
    return n
}




// 本地存储
/* 
    注意：浏览器不会保留打开本地文件（file:///）的Cookie！
    参数1：cookie名称
    参数2：cookie值
    参数3：过期时间 Number类型 单位：天
*/
// 存储Cookie
function setCookieTy (n,v,e) {
    var d = new Date()
    d.setTime(d.getTime() + (e * 24 * 60 * 60 * 1000))
    var expires = 'expires=' + d.toUTCString()
    document.cookie = n + '=' + v + '; ' + expires
}
// 获取Cookie
function getCookieTy (n) {
    var _n = n + '='
    var _c = document.cookie.split(';')
    console.log(_c)
    for (var i = 0; i < _c.length; i++) {
        var _t = _c[i].trim()
        if (_t.indexOf(_n) == 0) {
            return _t.substring(_n.length,_t.length)
        }
    }
    return ''
}
// 存储localStorage
function setStorageTy (n,t) {
    if (typeof t !== 'string') {
        t = JSON.stringify(t)
    }
    window.localStorage.setItem(n,t)
}
// 获取localStorage
function getStorageTy (n) {
    return JSON.parse(window.localStorage.getItem(n))
}
// 删除localStorage
function removeStorageTy (n) {
    return window.localStorage.removeItem(n)
}




// 根据时间格式获取间隔时间
/* 
    此方法不会改变原始字符串
    时间格式：yyyy-mm-dd hh:mm:ss
    无参数
*/
String.prototype.periodTime = function () {

    //把时间转换为时间戳
    var d      = Date.parse(this.replace(/-/gi,'/'))
    var minute = 1000 * 60
    var hour   = minute * 60
    var day    = hour * 24
    var month  = day * 30
    
    // 获取当前时间戳
    var now = new Date().getTime()
    var diffValue = now - d
    if (diffValue < 0) {return}
    var monthC = diffValue / month
    var weekC  = diffValue / (7 * day)
    var dayC   = diffValue / day
    var hourC  = diffValue / hour
    var minC   = diffValue / minute
    var result = null

    if(monthC >= 1) {
        result = parseInt(monthC) + "月前"
    } else if (weekC >= 1) {
        result = parseInt(weekC)  + "周前"
    } else if (dayC  >= 1) {
        result = parseInt(dayC)   + "天前"
    } else if (hourC >= 1) {
        result = parseInt(hourC)  + "小时前"
    } else if (minC  >= 1) {
        result = parseInt(minC)   + "分钟前"
    } else {
        result = "刚刚"
    }
    return result
}




// 去除空格
/* 
    以下trim方法不会改变原始字符串
    无参数
*/
// 除去左右两边空格
String.prototype.trimBothSpace = function () {
    return this.replace(/(^\s*)|(\s*$)/g,'')
}
// 除去左边空格
String.prototype.trimLeftSpace = function () {
　　return this.replace(/(^\s*)/g,'')
}
// 除去右边空格
String.prototype.trimRightSpace = function () {
    return this.replace(/(\s*$)/g,'')
}
// 除去所有空格
String.prototype.trimAllSpace = function () {
    return this.replace(/\s/g,'')
}




// 数字区间排序
/* 
    此方法不会改变原始数组
    参数1：数组中最后一项与最后附加项的值或区间    
*/
Array.prototype.numberSection = function (s) {
    var n = []
    // 如果没有赋值参数 数组中附加项为最后一项+1
    var s = s || 1
    for (var i = 0; i < this.length; i++) {
        if (this[i] == this[this.length-1]) {
            var r = this[this.length-1] + s
            var p = this[this.length-1] + '-' + r
            n.push(p)
        } else {
            var p = this[i] + '-' + this[i+1]
            n.push(p)
        }
    }
    return n
}




// 对象是否为空
/* 
    true:空 / false:非空
*/
Object.prototype.isEmptyObj = function () {
    var e = 'Ty_Err: 不是对象类型'  
    var s = Object.prototype.toString.call(this)
    if (s == '[object Object]') {
        for (var k in this) {
            if (this.hasOwnProperty(k)) {
                return false
            }
        }
    } else {
        return e
    }
    return true
}




// 数组合并去重
/* 
    此方法会改变原始数组
    参数1：数组 需要合并的第一项
    参数2：数组 需要合并的第二项
    参数n：数组 需要合并项可多次添加
    无参数：只给调用者去重
*/
Array.prototype.concatUniqueArray = function (a1, a2) {
    for (var i = 0; i < arguments.length; i++) {
        if (!Array.isArray(arguments[i])) {
            return 'Ty_Err:第'+ (i+1) +'个参数不是Array类型'
        }
    }
    // 如果无参数则去重调用者
    if (arguments.length == 0) {
        var o = []
        for (var i = 0; i < this.length; i++) {
            if (o.indexOf(this[i]) === -1) {
                o.push(this[i])
            }
        }
        return o
    }
    // 进入方法先去重调用者
    var self = []
    for (var i = 0; i < this.length; i++) {
        if (self.indexOf(this[i]) === -1) {
            self.push(this[i])
        }
    }
    // 合并去重两个数组
    function concatUniqueFunc (r1, r2) {
        // 复制第一个数组 让原数组的值不被改变
        var n = r1.concat()
        for (var i = 0; i < r2.length; i++) {
            if (n.indexOf(r2[i]) === -1) {
                // r2[i]到n中进行查找重复值 
                // 返回-1则无重复
                n.push(r2[i])
            }
        }
        return n
    }
    var s = concatUniqueFunc(self, a1)
    // 从第二个参数开始循环执行合并去重
    for (var i = 1; i < arguments.length; i++) {
        s = concatUniqueFunc(s, arguments[i])
    }
    return s
}




// 时间字段排序
/* 
    此方法不会改变原始数组
    时间格式：yyyy-mm
    参数1：true/1 从近到远排序
           默认/false/0 从远到近排序
*/
Array.prototype.yearMonthSort = function (k) {
    var t = []
    for (var i = 0; i < this.length; i++) {
        t.push(this[i].replace('-',''))
    }
    // 给sort方法添加排序规则
    var nt = t.sort(function (a,b) {
        if (k == true) {
            return b - a
        } else {
            return a - b
        }
    })
    var nn = []
    for (var i = 0; i < nt.length; i++) {
        var a = nt[i].replace(/(.{4})(.*)/ , '$1-$2')
        nn.push(a)
    }
    return nn
}




// 数组数字添加千分符
/* 
    此方法不会改变原始数组
    无参数
*/
Array.prototype.addThousandMark = function () {
    var n = []
    for (var i = 0; i < this.length; i++) {
        var _str = this[i].toString()
        _str = _str.replace(/(\d{1,3})(?=(\d{3})+$)/g,'$1,')
        n.push(_str)
    }
    return n
}




// 深拷贝引用数据类型
/* 
    此方法不会改变原始对象
    无参数
*/
Object.prototype.deepCloneObj = function () {
    var _o = this instanceof Array ? [] : {}
    if (this && typeof this === 'object') {
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                // 判断类型 递归复制调用者的子元素
                if (this[key] && typeof this[key] === 'object') {
                    _o[key] = deepCloneObj(this[key])
                } else {
                    _o[key] = this[key]
                }
            }
        }
    }
    return _o
    
    // 简便方式
    // return JSON.parse(JSON.stringify(this))
}




// 测试区 ------
var numArr = [6000,3000,4000,2000,1000,7000]
var strArr = ['a','b','c','d','e','f','g']
var strDate = "2018-02-22 12:11:00"
var strTest = ' 去除 两边 空白   '
var arr0 = [0,10,20,30,40,50]
// var arr0 = {
//     a : 0,
//     b : 1
// }
var arr1 = [1,3,5,7,9,1]  
var arr2 = [2,1,6,5,10]  
var arr3 = [3,10,7,1,15]
var arr4 = [4,21,6,18,7]
var arr5 = [6,22,32,19,4]
var arr6 = 'asdasdasd'
var arr7 = ['2017-03','2017-04','2017-07','2018-01','2017-04']  
var arr8 = ['2017-01','2017-03','2017-04','2017-05','2017-06']  
var arr9 = ['2017-01','2017-02','2017-08','2017-09']

console.log(arr1.removeTheItem(4).sortFromNum())





// 测试区 end ------

// Tyrus_ExtensionJS end ----------