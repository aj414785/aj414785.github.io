(function(){var isInitOK=false;var isLoadingAegis=false;var isLoadingTdm=false;var loadAegisCb=[];var loadTdmCb=[];var oCurrentConfig=null;var oExtraParams={};var aegisInstanse=null;var isTdmLoad=false;var isInitMiloOK=false;var aegisInstanseForMilo=null;var arrInitMiloCb=[];var loadMiloStatus=0;var arrGetDomainListCb=[];var oDomainConfig=null;var iDomainConfigStatus=0;var fBeforeAegisReport=function(log,isMilo){var uin=frontmonitor.getUin();if(isTdmLoad&&oCurrentConfig.sTdmId){window.TDM.reportEvents({events:[{srcId:15002,eventName:"ErrorLog",eventInfo:{s_from:location.href,s_uin:uin,s_itemId:oCurrentConfig.sAegisId,s_errlevel:log.level,s_errcontent:log.msg}}],success:function(result){console.info(result)},error:function(errMessage){console.error(errMessage)}})}};var getDomainListConfig=function(callback){if(2==iDomainConfigStatus){isFunction(callback)&&callback(oDomainConfig);return}arrGetDomainListCb.push(callback);if(1==iDomainConfigStatus){return}iDomainConfigStatus=1;milo.loadScript("//ossweb-img.qq.com/images/js/milo_config_server/milo_monitor_alldomain.js",function(isLoad){iDomainConfigStatus=2;if(false!==isLoad){oDomainConfig=window["Milo_Monitor_All_Domain"]&&window["Milo_Monitor_All_Domain"][location.host]||null}while(arrGetDomainListCb.length){var tmpCb=arrGetDomainListCb.shift();isFunction(tmpCb)&&tmpCb(oDomainConfig)}})};var getMonitorConfig=function(callback){if(oCurrentConfig){callback(oCurrentConfig);return}getDomainListConfig(function(oDomainConfig){if(oDomainConfig&&1!=oDomainConfig.isOnlyMilo){milo.loadScript("//ossweb-img.qq.com/images/js/milo_config_server/milo_monitor_web_"+location.host+".js",function(isLoad){if(false===isLoad){callback(null)}else{var hostConfig=window.Milo_Monitor_Config;if(hostConfig){var currentHash=hostConfig.hash;var arrConfig=hostConfig.data;if(isArray(arrConfig)){var currentUrl=location.href.substring(7);var currentConfig=null;if("https:"==location.protocol){currentUrl=location.href.substring(8)}for(var i=0;i<arrConfig.length;i++){if(!arrConfig[i].isOnline){continue}var sUrl=arrConfig[i].url;if(currentUrl.length>=sUrl.length&&0==currentUrl.indexOf(sUrl)){currentConfig=arrConfig[i];break}if(sUrl==location.host){currentConfig=arrConfig[i];break}if(new RegExp("^([\\w\\-]+\\.)+"+sUrl+"$").test(location.host)){currentConfig=arrConfig[i];break}}oCurrentConfig=currentConfig;callback(currentConfig)}else{callback(null)}}}})}else{callback(null)}})};var isLogAboutMilo=function(log){var msg=log.msg||"";var isAbout=false;var arrAboutReg=[/((ossweb\-img\.qq\.com)|(game\.gtimg\.cn))\/images\/js\/(milo|(milo\_bundle)|mobile|(mobile\_bundle)|(mobile\_build))/gi];var arrNotAboutReg=[/(ossweb\-img\.qq\.com|game\.gtimg\.cn)\/images\/js\/(milo|milo\_bundle|mobile|mobile\_bundle|mobile\_build)\/util\/(jquery|zepto)\.js/gi];for(var j=0;j<arrNotAboutReg.length;j++){msg=msg.replace(arrNotAboutReg[j],"")}for(var i=0;i<arrAboutReg.length;i++){if(arrAboutReg[i].test(msg)){isAbout=true;break}}return isAbout};var frontmonitor={init:function(callback,extraParams){var self=this;this.initForMilo();if(isInitOK){isFunction(callback)&&callback({oAegis:aegisInstanse,oTdm:window.TDM});return}oExtraParams=extraParams||{aegis:null,tdm:null};getMonitorConfig(function(currentConfig){if(!currentConfig){isInitOK=true;return}if(currentConfig.sTdmId){self.initTdm(function(){self.initAegis(function(){isInitOK=true;isFunction(callback)&&callback({oAegis:aegisInstanse,oTdm:window.TDM})})})}else{self.initAegis(function(){isInitOK=true;isFunction(callback)&&callback({oAegis:aegisInstanse})})}})},initAegis:function(callback){var self=this;if(!oCurrentConfig){callback(null);return}if(aegisInstanse){isFunction(callback)&&callback(aegisInstanse)}else{var uin=self.getUin();var id=oCurrentConfig.sAegisId;this.loadAegis(function(Aegis){var oInitAegisParams={id:id};var oExtra=isObject(oExtraParams.aegis)?oExtraParams.aegis:{};if(uin){oInitAegisParams.uin=uin}if(1==oCurrentConfig.iReportAssetsSpeed){oInitAegisParams.reportAssetSpeed=true}if(1==oCurrentConfig.iReportCgiSpeed){oInitAegisParams.reportApiSpeed=true}if("all"!=oCurrentConfig.sProtocolFilter){if(location.protocol.substr(0,location.protocol.length-1)!=oCurrentConfig.sProtocolFilter){callback();return}}if("mobile"==oCurrentConfig.sPcMobileFilter){callback();return}if(isFunction(oExtra.onReport)){oInitAegisParams.onReport=function(){return oExtra.onReport.call(null,arguments)}}if(isFunction(oExtra.beforeReport)){oInitAegisParams.beforeReport=function(log){if(isLogAboutMilo(log)){return false}fBeforeAegisReport(log,false);return oExtra.beforeReport.call(null,arguments)}}else{oInitAegisParams.beforeReport=function(log){if(isLogAboutMilo(log)){return false}fBeforeAegisReport(log,false)}}aegisInstanse=new Aegis(oInitAegisParams);isFunction(callback)&&callback(aegisInstanse)})}},initTdm:function(callback){var self=this;if(!oCurrentConfig){callback(null);return}if(isTdmLoad){isFunction(callback)&&callback(window.TDM)}else{var uin=self.getUin();var sTdmId=oCurrentConfig.sTdmId;this.loadTdm(function(Tdm){Tdm.init({env:"cn",appId:Number(sTdmId),appVer:""+milo.config.version,userId:uin,channel:"milo"}).then(function(){isInitTdm=true;isFunction(callback)&&callback()}).catch(function(errMessage){console.error(errMessage)})})}},loadAegis:function(callback){if(window.Aegis){isFunction(callback)&&callback(window.Aegis)}else{loadAegisCb.push(callback);if(isLoadingAegis){return}isLoadingAegis=true;milo.loadScript("https://cdn-go.cn/aegis/aegis-sdk/latest/aegis.global.min.js",function(isLoad){if(!isLoad){return}while(loadAegisCb.length){var cb=loadAegisCb.shift();isFunction(cb)&&cb(window.Aegis)}})}},loadTdm:function(callback){if(window.TDM){isFunction(callback)&&callback(window.TDM)}else{loadTdmCb.push(callback);if(isLoadingTdm){return}isLoadingTdm=true;if(typeof window["define"]==="function"&&window["define"].amd){need("https://game.gtimg.cn/images/js/tdm/tdm.js",function(Tdm){if(!Tdm){return}isTdmLoad=true;window.TDM=Tdm;callback(Tdm)})}else{milo.loadScript("https://game.gtimg.cn/images/js/tdm/tdm.js",function(isLoad){if(!isLoad){return}isTdmLoad=true;while(loadTdmCb.length){var cb=loadTdmCb.shift();isFunction(cb)&&cb(window.TDM)}})}}},getUin:function(){var acctype=milo.cookie.get("acctype"),uin="",appid=milo.cookie.get("appid");if(acctype){uin=milo.cookie.get("openid")}else{acctype="pt";uin=milo.cookie.get("uin")}if("pt"==acctype){if(uin){return acctype+"-"+uin}}else if(/^(wx|qc|wg)$/.test(acctype)){if(uin&&appid){return acctype+"-"+appid+"-"+uin}else if(uin){return acctype+"-unknown-"+uin}}return""},initForMilo:function(callback){var self=this;if(1==loadMiloStatus&&isFunction(callback)){arrInitMiloCb.push(callback);return}if(2==loadMiloStatus){isFunction(callback)&&callback({oAegis:aegisInstanseForMilo});return}loadMiloStatus=1;arrInitMiloCb.push(callback);getDomainListConfig(function(oDomainConfig){if(!oDomainConfig||!oDomainConfig.config||!oDomainConfig.config.sAegisId){return}var sAegisId=oDomainConfig.config.sAegisId;self.loadAegis(function(Aegis){var uin=self.getUin();var oInitParams={id:sAegisId,reportApiSpeed:true,reportAssetSpeed:true,beforeReport:function(log){if(!isLogAboutMilo(log)){return false}}};if(uin){oInitParams.uin=uin}aegisInstanseForMilo=new Aegis(oInitParams);loadMiloStatus=2;isInitMiloOK=true;while(arrInitMiloCb.length){var tmpCb=arrInitMiloCb.shift();isFunction(tmpCb)&&tmpCb({oAegis:aegisInstanseForMilo})}})})}};milo.loader.loadByTag([{name:"biz.frontmonitor",value:frontmonitor}])})();