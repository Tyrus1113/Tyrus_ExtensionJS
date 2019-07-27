/*
 * @Tyrus_ExtensionJS
 * @Author: Tyrus
 */

//  ---- **** Ty start **** ----
var TyUI = {

    /**
     * 设置文档根节点字号
     * @method setRem
     *
     * @example
     * Ty.setRem()
     * window.onresize = Ty.setRem 浏览器被重置大小时也需要调用
     * 
     */
    setRem: function() {

        var _doc = 0
        var _clWidth = 0
        document.compatMode === 'CSS1Compat'
            ? _doc = document.documentElement
            : _doc = document.body

        _clWidth = _doc.clientWidth

        if (_clWidth > 750) _clWidth = 750
        _doc.style.fontSize = _clWidth / 10 + 'px'
    },

    /**
     * 获取系统信息
     * @method getSystemInfo
     *
     * @param  {DOM}   _el    DOM元素的 id 显示信息的容器
     */
    getSystemInfo: function(_el) {

        // 参数类型校验
        if (!_el.nodeType) {
            var vali = Object.prototype.toString.call(_el).split(' ')[1].match(/[a-z]+/i)[0]
            console.warn('Ty_err: 参数应为DOM元素 但获取到' + vali + '类型')
            return 
        }

        // 避免重复加载 清空列表中的元素
        _el.innerHTML = ''

        // 获取 userAgent 信息
        var info = window.navigator.userAgent.split(' ')
        var _ = new Date()
        var time = `${_.getFullYear()}年${_.getMonth() + 1}月${_.getDate()}日`
        var device = info[1].replace(/^\(|;$/g, '')
        var version = info[6].replace(/_|;|\)/g, ' ')

        // 获取显卡信息
        var gl = document.createElement('canvas').getContext('experimental-webgl')
        var debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
        var graphics = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)

        var deviceInfo = [
            `当前时间: ${time}`,
            `当前设备: ${device}`,
            `系统版本号: ${info[3] + ' ' + info[4] + ' ' + info[5] + ' ' + version}`,
            `设备显卡: ${graphics}`
        ]

        for (var i = 0; i < deviceInfo.length; i++) {
            var _li = document.createElement('li')
            _li.innerHTML = deviceInfo[i]
            _el.appendChild(_li)
        }
    },

    /**
     * 推送通知
     * @method sendNotification
     * 
     * @param  {String}    _tit  通知的标题
     * @param  {Object}    _opt  通知的配置参数
     * @param  {Function}  _cli  点击通知的回调函数
     * 
     * @example
     *      var options = {
        *          body: '通知的内容',
        *          requireInteraction: true,
        *          icon: '../static/img/img01.png'
        *      }
        *      sendNotification('推送的内容', options, function() {
        *          console.log('_cli dosomthing')
        *      })
        */
    sendNotification: function(_tit, _opt, _cli) {
   
        // 检查浏览器是否支持
        if (!window.Notification || !window.Notification.requestPermission()) {
            console.warn('Ty_err: 此浏览器不支持通知')
            return false
        } else {
            // 用户未选择 发起询问通知
            Notification.requestPermission().then(result => {
                if (result === 'granted' || result === 'default') {
                    const noti = new Notification(_tit, _opt)
                    noti.onclick = _cli
                } else if (result === 'default') {
                    console.warn('Ty_err: 用户关闭授权 可再次请求授权')
                } else {
                    console.warn('Ty_err: 用户拒绝授权')
                }
            }).catch(() => {
                console.warn('Ty_err: 授权失败')
            })
        }
    },

    /**
     * 获取图片色值
     * @method getImageColor
     * 
     * @param  {Object}    _params  画布信息
     * 
     * @example
     *      Ty.getImageColor({
        *          url: 图片的url,
        *          canvas: {
        *              el: document.getElementById('canvas') canvas元素,
        *              width: 画布宽度,
        *              height: 画布高度
        *          }
        *          el: document.getElementById('canv') 需要设置背景色的元素,
        *          direction: '45deg' 渐变的方向,
        *          col1: { x: 30, y: 30 } 第一个色值的坐标
        *          col2 : { x: 170, y: 70 }第二个色值的坐标
        *      })
        */
    getImageColor: function(_params) {
   
        var img = new Image()
   
        // 解决跨越
        img.crossOrigin = ''
        img.src = _params.url
   
        // 设置canvas宽高
        _params.canvas.el.width = _params.canvas.width
        _params.canvas.el.height = _params.canvas.height
           
        var ctx = _params.canvas.el.getContext('2d')
   
        img.onload = function() {
            // 开始绘图
            ctx.drawImage(img, 0, 0, _params.canvas.width, _params.canvas.height)
               
            _params.el.style.background = 'linear-gradient(' +
                   _params.direction +
                   ', ' +
                   getRGBA(_params.col1) +
                   ', ' +
                   getRGBA(_params.col2) + ')'
        }
   
        function getRGBA(_p) {
               
            // 获取图片像素信息
            var pixel = ctx.getImageData(
                _p.x,
                _p.y,
                _params.canvas.width,
                _params.canvas.height
            )
            var data = pixel.data
   
            // 获取rgba值
            var rgba = 'rgba(' +
                   data[0] +
                   ',' +
                   data[1] +
                   ',' +
                   data[2] +
                   ',' +
                   (data[3] / 255) +
                   ')'
   
            return rgba
        }
    }

} //  ---- **** Ty end **** ----
export default TyUI