// Tyrus_ExtensionJS

// 移除数组选中项
Array.prototype.removeItem = function (x) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == x) {
            this.splice(i,1)
            break
        }
    }
}

// 数字从大到小/从小到大排序
Array.prototype.sortFromNum = function (k) {
    // 若没有给定参数 则默认从小到大排序
    if (k == undefined) {k = false}
    var n = 0
    for (var i = 0; i < this.length; i++) {
        for (var j = 0; j <= i; j++) {
            if (k == true) {
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
Array.prototype.getMaxORMinItem = function (k) {
    if (k == undefined) {k = false}
    var n = 0
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

// 根据时间格式获取间隔时间
String.prototype.periodTime = function () {
    //把时间转换为时间戳
    var d = Date.parse(this.replace(/-/gi,'/'))
    var minute = 1000 * 60
    var hour = minute * 60
    var day = hour * 24
    var halfamonth = day * 15
    var month = day * 30
    // 获取当前时间戳
    var now = new Date().getTime()
    var diffValue = now - d
    if (diffValue < 0) {return}
    var monthC = diffValue / month
    var weekC = diffValue / (7 * day)
    var dayC = diffValue / day
    var hourC = diffValue / hour
    var minC = diffValue / minute
    var result = null
    if(monthC >= 1) {
        result = parseInt(monthC) + "月前"
    } else if (weekC >= 1) {
        result = parseInt(weekC) + "周前"
    } else if (dayC >= 1) {
        result = parseInt(dayC) + "天前"
    } else if (hourC >= 1) {
        result = parseInt(hourC) + "小时前"
    } else if (minC >= 1) {
        result = parseInt(minC) + "分钟前"
    } else {
        result = "刚刚"
    }
    return result
}

// 测试区 ------
var numArr = [6,3,4,2,1,7,0,5]
var strArr = ['a','b','c','d','e','f','g']
var strDate = "2018-02-21 21:21:00"
console.log(strDate.periodTime());
// console.log(numArr)
// numArr.removeItem(2)
// numArr.sortFromNum()
// console.log(numArr)
// console.log(numArr.getMaxORMinItem(true))

// 测试区 end ------

// Tyrus_ExtensionJS end ----------