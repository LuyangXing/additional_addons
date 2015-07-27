    var jiathis_config={
        url:"http://henan.qq.com/zt/2014/loveHenan/",
        summary:"企鹅爱河南_腾讯大豫网",
        title:"#企鹅爱河南#",
        pic:"http://mat1.gtimg.com/henan/images/henan_zt/2014zt/2014qeahn/cards.png",
        shortUrl:false,
        hideMore:false
    }
    window.onload=function(){
        var oUl=document.getElementById("scroll"),
                oPrev=document.getElementById("prev"),
                oNext=document.getElementById("next"),
                oTopBtn=document.getElementById("topBtn"),
                oBomBtn=document.getElementById("bottomBtn"),
                oLi=oUl.getElementsByTagName("li"),
                oSeleCont=document.getElementById("selectContent"),
                oSeleList=document.getElementById("selectList");
        var iNum= 0;
        oUl.innerHTML+=oUl.innerHTML;
        iNum=oLi.length;
        var iUlWidth=iNum*(196+30);
        var iShow=4*(196+30);
        oUl.style.width=iUlWidth+"px";
        bind(oNext,"click",moveRight);
        bind(oPrev,"click",moveLeft);
        PicShow();
        var lock=false;
        oSeleCont.onclick=function(){
            if(lock==false){
                oSeleList.style.display="block";lock = true
            }else{
                oSeleList.style.display="none";lock=false;
            }

        }
        var oLiSele=oSeleList.getElementsByTagName("li");
        var $card = $('#card_pic');
        var $msg = $('#msg');
        var formT="http://image3.afyji.com/index/index/id/";
        var _url="";
        for(var n = 0;n<oLiSele.length;n++){
            oLiSele[n].index=n;
            oLiSele[n].onclick=function(){
                oSeleCont.innerHTML=this.innerHTML;
                oSeleList.style.display="none";lock=false;
                $card.attr('src',json[this.index]["src"]);
                $msg.attr("action",formT+json[this.index]["id"]);
                _url=json[this.index]["urls"];
            }
        }
        function PicShow(){
            var PicBlock=document.getElementById("PicBlock");
            imgSrc=PicBlock.getElementsByTagName("img")[0],
                    closePic=PicBlock.getElementsByTagName("div")[0];
            for(var i = 0;i<oLi.length;i++){
                oLi[i].onclick=function(){
                    imgSrc.src=this.getElementsByTagName("img")[0].src;
                    PicBlock.style.display="block";
                }
            }
            closePic.onclick=function(){
                PicBlock.style.display="none";
            }
        }
        var shareBtn=document.getElementById("shareBtn");
        bind(shareBtn,"mouseover",shareArg);
        function shareArg(){
            jiathis_config["pic"]="qqpng/earth7.png";
            jiathis_config["title"]="场景秀-企鹅18变";
            jiathis_config["url"]="http://show.qq.com/live/qie18/";
        }
        videoShow();picListShow(DataMap);
        function picListShow(json){
            var hnMap=document.getElementById("hnMap"),
                    mapPic=document.getElementById("mapPicShow"),
                    hnMapList=hnMap.getElementsByTagName("li"),
                    mapPicSrc=mapPic.getElementsByTagName("img")[0];
            for(var m=0;m<json.length;m++){
                hnMapList[m].index=m;
                hnMapList[m].onclick=function(){
                    if(json[this.index].pic==""){
                        alert("请等待后续活动")
                    }else{
                        mapPic.href=json[this.index].href;
                        mapPicSrc.src=json[this.index].pic;
                    }
                }
            }
        }
        function videoShow(){
            bind(oTopBtn,"click",moveTop);
            bind(oBomBtn,"click",moveBom);
            var scrollTopList=document.getElementById("scrollTop"),
                    videoSrc=document.getElementById("videoSrc");
            scrollTopList.innerHTML+=scrollTopList.innerHTML;
            var oVideoLi=scrollTopList.getElementsByTagName("li");
            var scrollTopHeight=oVideoLi.length*140;
            for(var i = 0;i<oVideoLi.length;i++){
                oVideoLi[i].onclick=function(){
                    var videoStr="http://v.qq.com/iframe/player.html?vid="+this.id+"&width=455&height=312&auto=0";
                    videoSrc.src=videoStr;
                }
            }
            function moveTop(){
                clearInterval(oTopBtn.timer);
                var iTop=parseInt(getStyle(scrollTopList,"top"));
                if(iTop>(-scrollTopHeight/2)){
                    startMove(scrollTopList,{top: iTop-140});
                }else{
                    scrollTopList.style.top=0+"px";
                    startMove(scrollTopList,{top: parseInt(getStyle(scrollTopList,"top"))-140});
                }
            }
            function moveBom(){
                var iBom=parseInt(getStyle(scrollTopList,"top"));
                if(iBom>=-100){
                    scrollTopList.style.top=-scrollTopHeight/2+"px";
                    startMove(scrollTopList,{top: parseInt(getStyle(scrollTopList,"top"))+140});
                }else{
                    startMove(scrollTopList,{top: iBom+140});
                }
            }

        }

        $msg.on('submit', function(e){
            e.preventDefault();
            $.getJSON($msg.attr('action')+'?callback=?', $msg.serialize(), function(json){
                var urls = _url+ json.id;
                jiathis_config["pic"]=urls;
                $card.attr('src', urls);
            });
        });
        function moveLeft(){
            var iLeft=parseInt(getStyle(oUl,"left"));
            if(iLeft>(-iUlWidth/2)){
                startMove(oUl,{left: iLeft-iShow});
            }else{
                oUl.style.left=0+"px";
                startMove(oUl,{left: parseInt(getStyle(oUl,"left"))-iShow});
            }
        }

        function moveRight (){
            var iReft=parseInt(getStyle(oUl,"left"));
            if(iReft>=-820){
                oUl.style.left=-iUlWidth/2+"px";
                startMove(oUl,{left: parseInt(getStyle(oUl,"left"))+iShow});
            }else{
                startMove(oUl,{left: iReft+iShow});
            }
        }
        function getStyle(obj,attr) {
            return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
        }
        function bind(objs,evName,fn){
            if (objs.addEventListener) {
                objs.addEventListener(evName,fn,false);  //标准浏览器
            } else {
                objs.attachEvent('on'+evName,function(){
                    fn.call(objs);  //IE9以下
                });
            }
        }
        function startMove(obj, json, fn)
        {
            clearInterval(obj.timer);
            obj.timer=setInterval(function (){
                var bStop=true;
                for(var attr in json)
                {
                    var iCur=0;
                    if(attr=='opacity')
                    {
                        iCur=parseInt(parseFloat(getStyle(obj, attr))*100);
                    }
                    else
                    {
                        iCur=parseInt(getStyle(obj, attr));
                    }
                    var iSpeed=(json[attr]-iCur)/8;
                    iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
                    if(iCur!=json[attr])
                    {
                        bStop=false;
                    }
                    if(attr=='opacity')
                    {
                        obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
                        obj.style.opacity=(iCur+iSpeed)/100;
                    }
                    else
                    {
                        obj.style[attr]=iCur+iSpeed+'px';
                    }
                }
                if(bStop)
                {
                    clearInterval(obj.timer);
                    if(fn)
                    {
                        fn();
                    }
                }
            }, 30)
        }
        var glide =new function(){
            function $id(id){return document.getElementById(id);};
            this.layerGlide=function(auto,oEventCont,oSlider,sSingleSize,second,fSpeed,point){
                var oSubLi = $id(oEventCont).getElementsByTagName('li');
                var interval,timeout,oslideRange;
                var time=1;
                var speed = fSpeed
                var sum = oSubLi.length;
                var a=0;
                var delay=second * 1000;
                var setValLeft=function(s){
                    return function(){
                        oslideRange = Math.abs(parseInt($id(oSlider).style[point]));
                        $id(oSlider).style[point] =-Math.floor(oslideRange+(parseInt(s*sSingleSize) - oslideRange)*speed) +'px';
                        if(oslideRange==[(sSingleSize * s)]){
                            clearInterval(interval);
                            a=s;
                        }
                    }
                };
                var setValRight=function(s){
                    return function(){
                        oslideRange = Math.abs(parseInt($id(oSlider).style[point]));
                        $id(oSlider).style[point] =-Math.ceil(oslideRange+(parseInt(s*sSingleSize) - oslideRange)*speed) +'px';
                        if(oslideRange==[(sSingleSize * s)]){
                            clearInterval(interval);
                            a=s;
                        }
                    }
                }

                function autoGlide(){
                    for(var c=0;c<sum;c++){oSubLi[c].className='';};
                    clearTimeout(interval);
                    if(a==(parseInt(sum)-1)){
                        for(var c=0;c<sum;c++){oSubLi[c].className='';};
                        a=0;
                        oSubLi[a].className="active";
                        interval = setInterval(setValLeft(a),time);
                        timeout = setTimeout(autoGlide,delay);
                    }else{
                        a++;
                        oSubLi[a].className="active";
                        interval = setInterval(setValRight(a),time);
                        timeout = setTimeout(autoGlide,delay);
                    }
                }

                if(auto){timeout = setTimeout(autoGlide,delay);};
                for(var i=0;i<sum;i++){
                    oSubLi[i].onmouseover = (function(i){
                        return function(){
                            for(var c=0;c<sum;c++){oSubLi[c].className='';};
                            clearTimeout(timeout);
                            clearInterval(interval);
                            oSubLi[i].className="active";
                            if(Math.abs(parseInt($id(oSlider).style[point]))>[(sSingleSize * i)]){
                                interval = setInterval(setValLeft(i),time);
                                this.onmouseout=function(){if(auto){timeout = setTimeout(autoGlide,delay);};};
                            }else if(Math.abs(parseInt($id(oSlider).style[point]))<[(sSingleSize * i)]){
                                interval = setInterval(setValRight(i),time);
                                this.onmouseout=function(){if(auto){timeout = setTimeout(autoGlide,delay);};};
                            }
                        }
                    })(i)
                }
            }
        }
        glide.layerGlide(true,'icon_num','show_pic',410,2,0.1,'left');
    }