/*
    寮曞叆: 
    <script src="//ossweb-img.qq.com/images/js/eas/eas.js?v=20151229"></script>
    <script src="//gicp.qq.com/wmp/v5/static/js/gicprp.js"></script>
    涓婃姤浠ｇ爜鏇濆厜,鍙湁鍦ㄥ垪琛ㄤ腑鎵嶄細鐢ㄥ埌鏇濆厜涓婃姤锛�
    if(typeof(Gicprp.send) == 'function'){
        Gicprp.send({
            'action_type':'pop',
            'iuName':'<{$rp.name}>',
            'contentId':'<{$rp.ids}>',
            'serviceType':'<{$rp.st}>',
            'contentType':'<{$rp.ct}>',
            'url':'<{$rp.url}>'
        });
    }
    //璇︽儏椤祊v
    if(typeof(Gicprp.send) == 'function'){
        Gicprp.send({
            'action_type':'pv',
            'iuName':'<{$rp.name}>',
            'contentId':'<{$rp.id}>',
            'serviceType':'<{$rp.st}>',
            'contentType':'<{$rp.ct}>'
        });
    }
    //鍒楄〃鐐瑰嚮涓婃姤
    if(typeof(Gicprp.send) == 'function'){
        Gicprp.send({
            'action_type':'click',
            'iuName':'<{$rp.name}>',
            'contentId':'id',//姝ゅ浼犲叆琚偣鍑诲唴瀹圭殑鍐呭id
            'serviceType':'<{$rp.st}>',
            'contentType':'video',//姝ゅ浼犲叆琚偣鍑诲唴瀹圭殑鍐呭绫诲瀷 video 鎴栬€呮槸news
            'url':url //姝ゅ浼犲叆琚偣鍑诲唴瀹圭殑url鍦板潃
        });
    }
*/
var Gicprp = (typeof Gicprp == 'object') ? Gicprp : {
    //鑾峰彇cookie
    'getCookie' : function(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return (arr[2]);
        } else {
            return null;
        }
    },

    'getScript' : function(url){
        var script = document.createElement('script');
        script.onload = function () {};
        script.src = url;
        document.head.appendChild(script);
    },

    /* 灏佽ajax鍑芥暟
     * @param {string}opt.type http杩炴帴鐨勬柟寮忥紝鍖呮嫭POST鍜孏ET涓ょ鏂瑰紡
     * @param {string}opt.url 鍙戦€佽姹傜殑url
     * @param {boolean}opt.async 鏄惁涓哄紓姝ヨ姹傦紝true涓哄紓姝ョ殑锛宖alse涓哄悓姝ョ殑
     * @param {object}opt.data 鍙戦€佺殑鍙傛暟锛屾牸寮忎负瀵硅薄绫诲瀷
     * @param {function}opt.success ajax鍙戦€佸苟鎺ユ敹鎴愬姛璋冪敤鐨勫洖璋冨嚱鏁�
     * 濡傞渶瑕� 鍙缃甦ataType 涓�"script"
     */
    'getAjax' : function(opt) {
        opt = opt || {};
        opt.method = opt.method.toUpperCase() || 'POST';
        opt.url = opt.url || '';
        opt.async = opt.async || true;
        opt.xhrFields = { withCredentials: true }; //鍙戦€丄jax鏃讹紝Request header涓究浼氬甫涓� Cookie 淇℃伅
        opt.data = opt.data || null;
        opt.success = opt.success || function() {};
        var xmlHttp = null;
        if (XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        } else {
            xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
        }
        var params = [];
        for (var key in opt.data) {
            params.push(key + '=' + opt.data[key]);
        }
        var postData = params.join('&');
        if (opt.method.toUpperCase() === 'POST') {
            xmlHttp.open(opt.method, opt.url, opt.async);
            xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            xmlHttp.send(postData);
        } else if (opt.method.toUpperCase() === 'GET') {

            xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
            xmlHttp.send(null);
        }
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                opt.success(xmlHttp.responseText);
            }
        };
    },
    /*鍙傛暟璇存槑
    娓犻亾  iuName            绯荤粺鍚嶇О锛堜緥锛歲zone锛夊氨鏄� source
    鍐呭id   contentId      瑙嗛id銆佽祫璁痠d銆佺洿鎾棿id銆佽禌浜媔d銆佸箍鍛奿d绛夛紝鏍规嵁鍏蜂綋鍐呭浼犲€悸�
    鍐呭绫诲瀷 contentType    瑙嗛銆佽祫璁€佹敾鐣ャ€佺洿鎾€佷富鎾€佽禌浜嬨€佸箍鍛婄瓑聽
    琛屼负绫诲瀷 action_type    鍐呭绫诲瀷鍒ゆ柇 鏇濆厜鍦板潃鍘诲悜   pv锛屾挱鏀撅紱 鐐瑰嚮锛屾洕鍏夈€�
    涓氬姟id  serviceType     涓ゆ鍚箟锛氫竴 .涓氬姟鍚嶇О 锛堜緥锛歽xzj锛� ; 浜�. 涓氬姟鍙凤紝渚� 鐜嬭€呰崳鑰€涓氬姟涓�18
    涓婃姤鏂瑰紡 sendType       jsonp json
    easid   easid
    */
    'send' : function(obj) {
        var baseUrl = '',
            easid = Gicprp.getCookie('eas_sid');

        if (obj.action_type != 'pv') {
            baseUrl = '//apps.game.qq.com/easnew/go/eas.php'; //鐐瑰嚮,pop  
            if(obj.action_type == 'pop'){
                var data = {
                        'm':'SendLog_web',
                        'click_type':508,
                        'Url':encodeURIComponent(location.href),
                        'iuName':obj.iuName,
                        'contentSource':'list',
                        'serviceType':obj.serviceType,
                        'action_type': obj.action_type,
                        'clickUrl': obj.url,
                        'contentId':obj.contentId,
                        'contentType':obj.contentType
                    };
            }else{
                var data = {
                        'm':'SendLog_web',
                        'click_type':508,
                        'Url':encodeURIComponent(location.href),
                        'iuName':obj.iuName,
                        'contentSource':'list',
                        'serviceType':obj.serviceType,
                        'action_type': obj.action_type,
                        'clickUrl': obj.url,
                        'contentId':obj.contentId,
                        'contentType':obj.contentType
                    };
            }
            var params = [];
            for (var key in data) {
                params.push(key + '=' + data[key]);
            }
            var url = baseUrl + '?' + params.join('&');
            Gicprp.getScript(url);
        } else {
            if(obj.contentType == "news"){
                obj.contentType = 2;
            }else if(obj.contentType == "video"){
                obj.contentType = 1;
            }else{
                obj.contentType = 0;
            }
            baseUrl = '//apps.game.qq.com/cmc/incr'; //pv,鎾斁 
            if (typeof(obj.sendType) != 'undefined' && obj.sendType == 'jsonp'){
                var url = baseUrl + '?p0='+obj.serviceType+'&p2='+obj.contentId+'&p3='+obj.contentType+'&p5=0&source='+obj.iuName+'&action_type='+obj.action_type+'&easid=&rettype=jsonp'
                Gicprp.getScript(url);
            }else{
                Gicprp.getAjax({
                    method: 'GET',
                    url: baseUrl,
                    data: {
                        'p0':obj.serviceType,
                        'p2':obj.contentId,
                        'p3':obj.contentType,
                        'p5':0,
                        'source':obj.iuName,
                        'action_type': obj.action_type,
                        'easid': easid
                    }
                });
            }
        }

    }
};