
function nloadScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) {
        script.onreadystatechange = function() {
            if (script.readyState == "loaded" || script.readyState == "compvare") {
                script.onreadystatechange = null;
                callback && callback();
            }
        };
    } else {
        script.onload = function() {
            callback && callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}



function getNewData(className,shownum){
       console.log(className,shownum)
        var listData=[];    
      
        $(className).each(function(){
            var  aurl = $(this).find('a').attr('href');
            var  showdata = aurl.split('.html')[0].split('/')
            // console.log(aurl)
           //  console.log(showdata)
           //  console.log(showdata[showdata.length-1])
       
                if(/news/.test(aurl) && showdata[showdata.length -1]){

                    listData.push("1_"+showdata[showdata.length -1])
                    
                } 
                if(/video/.test(aurl) && showdata[showdata.length -1]){
                    listData.push("2_"+showdata[showdata.length -1])
                   
                }
            
              
        })

      var dataNum = listData.toString()
       
       var url='//apps.game.qq.com/cmc/getplay?p0=182&r0=script&r1=userobj&ids='+dataNum
        nloadScript(url,function(){
         var  data = userobj.data 
           var thisType='';
       
          $(className).each(function(){
        
              var  aurl = $(this).find('a').attr('href');
              var  showdata = aurl.split('.html')[0].split('/')

             if(/news/.test(aurl) && showdata[showdata.length -1]){
                   thisType = 1
                } 
                if(/video/.test(aurl) && showdata[showdata.length -1]){
                    thisType = 2
                }
       
             
           $(this).find(shownum).html(data[thisType][showdata[showdata.length -1]]) 

           })


 })



}
/* #t6Hl8#E29F79580EF0FA7F6273A7BF90481708 */