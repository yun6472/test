// JavaScript Document
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////获取参数
var $_GET = (function(){  
     var url = window.document.location.href.toString();  
    var u = url.split("?");  
    if(typeof(u[1]) == "string"){  
         u = u[1].split("&");  
         var get = {};
         for(var i in u){
             var j = u[i].split("=");
             get[j[0]] = j[1];  
         }  
         return get;  
     } else {  
         return {};  
     }  
})();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////设置boxid
function $$(id){
return document.getElementById(id);
}
function $$$(id){
return document.getElementsByTagName(id);
}
function $$n(id){
return document.getElementsByName(id);	
}
function $(id){
return getElementsByTagName(id);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////写cookies
function setCookie(name,value,timen)
{
var exp = new Date();
exp.setTime(exp.getTime()+(timen*1000));
document.cookie = name + "="+ escape (value) + ";expires=" + exp.toUTCString();
//alert(exp.toGMTString());
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////读取cookies
function getCookie(name,name2)
{
var arr,arr2,reg,reg2
//alert(document.cookie)
reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
arr=document.cookie.match(reg)
 if(arr){
	thiscookie= unescape(arr[2]);
 }else{
	return null;
 }

 if(name2){
 reg2=new RegExp(""+name2+"=([^&]+)");
  if(arr2=thiscookie.match(reg2)){
	thiscookie= unescape(arr2[1]);
  }
 }
return thiscookie

}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////读取cookies时间
function getCookie2(name)
{
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg)) return document.cookie.expires//unescape(arr[0]);
else return null;
}
//////////////////////////////////////////////////////////////////// //////////////////////////////////////////////////////////////////////删除cookies
function delCookie(name)
{
var exp = new Date();
exp.setTime(exp.getTime() - 1);
var cval=getCookie(name);
if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////滚动条加载事件
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////滚动条加载事件
function loaded(scrollid) {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');	
	pullUpOffset = pullUpEl.offsetHeight;

	myScroll = new iScroll(scrollid, {
		useTransition: true,
		useTransform:true,
		topOffset: pullDownOffset,
        bounce:true,//启用或禁用边界的反弹，默认为true
        checkDOMChanges : true,
        hScroll:false, //禁止横向滚动 true横向滚动 默认为true
        vScroll:true,//精致垂直滚动 true垂直滚动 默认为true
        hScrollbar:false,//隐藏水平方向上的滚动条
        vScrollbar:false,//隐藏垂直方向上的滚动条 
        //fixedScrollbar:false//在iOS系统上，当元素拖动超出了scroller的边界时，滚动条会收缩，设置为true可以禁止滚动条超出
        //scroller:false,///的可见区域。默认在Android上为true， iOS上为false
        fadeScrollbar:false, //指定在无渐隐效果时隐藏滚动条
        hideScrollbar:false,//在没有用户交互时隐藏滚动条 默认为true
        momentum:true,//启用或禁用惯性，默认为true，此参数在你想要保存资源的时候非常有用
        //lockDirection:false,//取消拖动方向的锁定， true拖动只能在一个方向上（up/down 或者left/right）  为了保持资源的完整性，建议去除滚动条
		
		onRefresh: function () {
			if (pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '刷新内容...';
			} else if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载内容...';
			}
		},
		onScrollMove:function (){
			if (this.y > 5 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '松开刷新内容...';
				this.minScrollY = 0;
			} else if (this.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '松开刷新内容...';
				this.minScrollY = -pullDownOffset;
			} else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '松开加载内容...';
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '松开加载内容...';
				this.maxScrollY = pullUpOffset;
			}
			//document.getElementById('header').innerHTML=pullUpEl.className.match('flip');
		},
		onScrollEnd: function () {
			if (pullDownEl.className.match('flip')) {
			    //alert("是了")
				pullDownEl.className = 'loading';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '正在刷新...';				
				pullDownAction();	// Execute custom function (ajax call?)
			} else if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '正在加载...';				
				pullUpAction();	// Execute custom function (ajax call?)
			}
		}
	});
	//setTimeout(function () { document.getElementById('content').style.left = '0'; }, 100);
}



function loadedview(scrollid,gdt) {
	myScroll2 = new iScroll(scrollid,{
		useTransition: true,
		useTransform:true,
		topOffset:false,
        //bounce:false,//启用或禁用边界的反弹，默认为true
        checkDOMChanges :true,
        hScroll:false, //禁止横向滚动 true横向滚动 默认为true
        vScroll:true,//精致垂直滚动 true垂直滚动 默认为true
        hScrollbar:false,//隐藏水平方向上的滚动条
        vScrollbar:gdt,//隐藏垂直方向上的滚动条 
//fixedScrollbar:false//在iOS系统上，当元素拖动超出了scroller的边界时，滚动条会收缩，设置为true可以禁止滚动条超出
//scroller:false,///的可见区域。默认在Android上为true， iOS上为false
        fadeScrollbar:false, //指定在无渐隐效果时隐藏滚动条
        hideScrollbar:true,//在没有用户交互时隐藏滚动条 默认为true
        momentum:true,//启用或禁用惯性，默认为true，此参数在你想要保存资源的时候非常有用
//lockDirection:false,//取消拖动方向的锁定， true拖动只能在一个方向上（up/down 或者left/right）  为了保持资源的完整性，建议去除滚动条
 });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////加载页面
///////////////////////////////
function post_(pageurl,divid,cssm,agen,okfun){
var myDate=new Date();
 var xmlHttp = GetXmlHttpObject(); //创建ajax实
 if (xmlHttp==null){
 alert ("您的浏览器不支持AJAX！");
 return;
 }
if(divid){
	var element = $$(divid);
}else{
	var element=false;
}
var httpinfo=element.innerHTML;
var parameters = cssm; //post的参数
if(pageurl.indexOf("http")<0){
	if(pageurl.indexOf("?")<0){
	    sURL=pageurl+"?d="+myDate;
	}else{
		sURL=pageurl+"&d="+myDate;
	}
}else{
	sURL="/geturlcontent.asp?"+pageurl;
}

sURL = encodeURI(sURL);
xmlHttp.onreadystatechange = okdealData; //处理post获取的数
xmlHttp.open("POST",sURL,true);
xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
xmlHttp.overrideMimeType("text/html;charset=gb2312");
xmlHttp.send(parameters);
 function okdealData(){//处理获取的数据的
  if(xmlHttp.readyState==4&&xmlHttp.status==200){
	  //alert(xmlHttp.responseText)
	  //alert(agen)
    if(agen==2){httpinfo=httpinfo+xmlHttp.responseText;}
	if(agen==1){httpinfo=xmlHttp.responseText+httpinfo;}
	if(agen==0){httpinfo=xmlHttp.responseText;}
	if(element) element.innerHTML=httpinfo;
	//return httpinfo;
	getlink();
	if(okfun) okfun(httpinfo);
  }
 }
 
//创建ajax对象
 function GetXmlHttpObject(){ 
 var xmlHttp_;
 try{
 xmlHttp_=new XMLHttpRequest();
  }
  catch(e){
  try{ 
  xmlHttp_=new ActiveXObject("Msxml2.XMLHTTP"); 
  }catch(e){
  try{
  xmlHttp_=new ActiveXObject("Microsoft.XMLHTTP");
  }catch(e){
  alert("您的浏览器不支持AJAX！");
  return false;
  }
  }
  }
  return xmlHttp_;
  }//GetXmlHttpObject end
}



function gettext(pageurl,cssm,func){
var myDate=new Date();
var parameters = cssm; //post的参数
 var xmlHttp2 = GetXmlHttpObject(); //创建ajax实
 if (xmlHttp2==null){
 alert ("您的浏览器不支持AJAX！");
 return;
 }

if(pageurl.indexOf("http")<0){
	if(pageurl.indexOf("?")<0){
	    sURL=pageurl//+"?d="+myDate;
	}else{
		sURL=pageurl//+"&d="+myDate;
	}
}else{
	sURL="/geturlcontent.asp?Turl="+pageurl;
}

sURL = encodeURI(sURL);
xmlHttp2.onreadystatechange = okdealData2; //处理post获取的数
xmlHttp2.open("POST",sURL,true);
xmlHttp2.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
xmlHttp2.overrideMimeType("text/html;charset=gb2312");
xmlHttp2.send(parameters);
httpinfo="";
function okdealData2(){//处理获取的数据的
  if(xmlHttp2.readyState==4&&xmlHttp2.status==200){
	//var httpinfo=xmlHttp2.responseText;
	var httpinfo = eval("("+xmlHttp2.responseText+")");
	//alert(httpinfo)
	if(func) func(httpinfo);
  }
 }
 
//创建ajax对象
 function GetXmlHttpObject(){ 
 var xmlHttp2_;
 try{
 xmlHttp2_=new XMLHttpRequest();
  }
  catch(e){
  try{ 
  xmlHttp2_=new ActiveXObject("Msxml2.XMLHTTP"); 
  }catch(e){
  try{
  xmlHttp2_=new ActiveXObject("Microsoft.XMLHTTP");
  }catch(e){
  alert("您的浏览器不支持AJAX！");
  return false;
  }
  }
  }
  return xmlHttp2_;
  }//GetXmlHttpObject end
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////获取xml事件
function getxml(xmlurl,okgo,notok,t){
 if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
 xmlHttp=new XMLHttpRequest();
 }else{// code for IE6, IE5
 xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
 }
xmlHttp.onreadystatechange = okdealData; //处理post获取的数
xmlHttp.open("GET",xmlurl,true);
//xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
//xmlHttp.overrideMimeType("text/html;charset=gb2312");
xmlHttp.send();
 function okdealData(){//处理获取的数据的
 //alert(xmlHttp.readyState)
  if(xmlHttp.readyState==4&&xmlHttp.status==200){
	 thisTEXT=xmlHttp.responseText;
	 thisXML=xmlHttp.responseXML;
	 if(okgo){
	   if(t==0) return okgo(thisTEXT);
	   if(t==1) return okgo(thisXML);
	 }
  }else if(xmlHttp.readyState==4&&xmlHttp.status==404){
   if(notok) return notok();
  return false;
  }
 }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////综合调用方法
function httppos(pageurl,cssm,func,act){
var parameters = cssm; //post的参数
 var imghttp = GetXmlHttpObject(); //创建ajax实
 if (imghttp==null){
 alert ("您的浏览器不支持AJAX！");
 return;
 }
var sURL = encodeURI(pageurl);
imghttp.onreadystatechange = okdealData2; //处理post获取的数
imghttp.open("POST",sURL,true);
imghttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
imghttp.overrideMimeType("text/html;charset=gb2312");

imghttp.send(parameters);
thttpinfo="";
function okdealData2(){//处理获取的数据的
  if(imghttp.readyState==4&&imghttp.status==200){
	if(act==1) thttpinfo=imghttp.responseText;
	if(act==2) thttpinfo=eval("("+imghttp.responseText+")");
	if(act==3){
		thttpinfo=imghttp.responseXML;
		if(!thttpinfo) thttpinfo=(new DOMParser()).parseFromString(imghttp.responseText, 'text/xml'); 
	}
	if(func) func(thttpinfo);
  }
 }
 
 function GetXmlHttpObject(){ 
 var imghttp;
 try{
 imghttp=new XMLHttpRequest();
  }
  catch(e){
  try{ 
  imghttp=new ActiveXObject("Msxml2.XMLHTTP"); 
  }catch(e){
  try{
  imghttp=new ActiveXObject("Microsoft.XMLHTTP");
  }catch(e){
  alert("您的浏览器不支持AJAX！");
  return false;
  }
  }
  }
  return imghttp;
  }//GetXmlHttpObject end
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////按钮点击事件
var sbmousewindow = ("createTouch" in document) || ('ontouchstart' in window) || 0;
var ADStartEvent = sbmousewindow ? "touchstart" : "mouseover";
var ADMoveEvent = sbmousewindow ? "touchmove" : "mousemove";
var ADEndEvent = sbmousewindow ? "touchend" : "mouseout";
if(ADMoveEvent=="mousemove") var moact=1
if(ADMoveEvent=="touchmove") var moact=2

var getlink=function(){	
obj=document.getElementsByTagName("div");
 for(i=0;i<obj.length;i++){
  ///////////////////
  if(obj[i].getAttribute('sbjgbg')&&obj[i].thbg!="ok"){
	obj[i].thbg="ok";
    obj[i].addEventListener(ADStartEvent,function (){
					         //alert(this.getAttribute('sbjgbg'))
	this.oldcolor=this.style.backgroundColor;
	this.style.backgroundColor=this.getAttribute('sbjgbg');
	});
	obj[i].addEventListener(ADMoveEvent,function (){
		if(moact==1){
	      this.style.backgroundColor=this.getAttribute('sbjgbg');
		}else{
		  this.style.backgroundColor=this.oldcolor;
		}
	});
	obj[i].addEventListener(ADEndEvent,function (){
	this.style.backgroundColor=this.oldcolor;
	});
   }
   ///////////////////
  if(obj[i].getAttribute('sbjgtm')&&obj[i].thtm!="ok"){
	obj[i].thtm="ok";
    obj[i].addEventListener(ADStartEvent,function (e){
												   //alert(e)
	                         //alert(Number(this.getAttribute('sbjgtm')));
	this.style.opacity=this.getAttribute('sbjgtm');
	});
	obj[i].addEventListener(ADMoveEvent,function (){
	  if(moact==1){
	     this.style.opacity=this.getAttribute('sbjgtm');
	  }else{
		 this.style.opacity="1.0";
	  }
	});
	obj[i].addEventListener(ADEndEvent,function (){
	this.style.opacity="1.0";
	});
   }
   
  /////////////////////////
  if(obj[i].getAttribute('sbjgclass')&&obj[i].thcss!="ok"){
     obj[i].thcss="ok";
	 obj[i].addEventListener(ADStartEvent,function (){
		var oldcss=this.className.replace("  "," ");
		 this.oldcss=oldcss.replace(" "+this.getAttribute('sbjgclass'),"");
		this.className=this.oldcss+" "+this.getAttribute('sbjgclass');
	 });
	 obj[i].addEventListener(ADMoveEvent,function (){
		var newc=this.oldcss.replace(this.getAttribute('sbjgclass'),"");
		if(moact==1){
			this.className=this.oldcss+" "+this.getAttribute('sbjgclass');
		}else{
		    this.className=this.oldcss;
		}
	 });
	 obj[i].addEventListener(ADEndEvent,function (){
		var newc=this.oldcss.replace(this.getAttribute('sbjgclass'),"");
		this.className=this.oldcss;
	 });
  }
  
  if(obj[i].getAttribute('setinput')&&obj[i].setin!="ok"){
     obj[i].setin="ok";
	 obj[i].addEventListener('click',function (){
		if($$(this.getAttribute('setinput'))) $$(this.getAttribute('setinput')).checked=!$$(this.getAttribute('setinput')).checked; 
	 });
  }


 }
}
////////////////////////////////////////////////条件点击
function inputdhgd(inid,url,s){
  $$(inid).checked="1";
  setTimeout(function(){gotourl(url)},s);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////获取页面
var pageobj=document.getElementsByTagName("div");
var pagen=new Array();
//sessionStorage["pagels"]=0;
var pn=0;

function getpage(){
 for(i=0;i<pageobj.length;i++){
  if(pageobj[i].getAttribute('data-role')=="page"){
  pagen[pn]=pageobj[i];
  pn=pn+1
  }
 }
}

function pagego(pageid){
	if(isNaN(pageid)||pageid>=pagen.length) return false;
	if(pagen[pageid]){
     return pagen[pageid];
	}
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////过渡效果
function divmove0(divid){
	var mx=50;
	var mxm=0.9876;
	var mygoto;
	var leftmix=0.2
	var leftmax=1
	var leftmixn=parseInt(document.body.offsetWidth*leftmix);
	var leftmaxn=parseInt(document.body.offsetWidth*leftmax);
    var tleft=divid.offsetLeft;
	divid.style.display="";
	if(!divid.mopen){
		mygoto=setInterval(mo2,5);
	}else{
		mygoto=setInterval(mo,5);
	}
	//if(tleft==3){
	//    mygoto=setInterval(mo,5);
	//}
	//if(tleft==leftmaxn){
	//    mygoto=setInterval(mo2,5);
	//}
	 function mo(){
		 divid.mopen=0;
		var tleft=divid.offsetLeft;
		divid.style.left=parseInt(tleft+mx)+"px";
		if(tleft>leftmaxn){
			divid.style.left=leftmaxn+"px";
			clearTimeout(mygoto);
			divid.style.display="none";
		}
		if(mx>0) mx=parseInt(mx*mxm);
		
	 }
	 function mo2(){
		 divid.mopen=1;
		var tleft=divid.offsetLeft;
		var tleftbf=document.body.offsetWidth*leftmax;
		if(tleft>leftmixn){
		divid.style.left=parseInt(tleft-mx)+"px";
		}else{
			divid.style.left=leftmixn+"px";
			clearTimeout(mygoto);
		}
		if(mx>0) mx=parseInt(mx*mxm);
	 }

}



function divmove1(divid){
	var mx=50;
	var mxm=0.9876;
	var mygoto;
	divid.style.display="";
	divid.style.left="100%;";
	divid.style.top="0px";
		//alert(divid.offsetLeft);
	 function mo(){
		var tleft=divid.offsetLeft;
		if(tleft>0){
		divid.style.left=parseInt(tleft-mx)+"px";
		}else{
			divid.style.left="0px";
			clearTimeout(mygoto);
		}
		if(mx>0) mx=parseInt(mx*mxm);
	 }
	mygoto=setInterval(mo,10);
}
function divout1(divid){
	var mx=50;
	var mxm=0.9876;
	var mygoto;
	var winw=document.body.offsetWidth;
	 function mo(){
		var tleft=divid.offsetLeft;
		if(tleft<winw){
		    divid.style.left=parseInt(tleft+mx)+"px";
		}else{
			divid.style.left=winw+"px";
			clearTimeout(mygoto);
			divid.style.display="none";
		}
		if(mx>0) mx=parseInt(mx*mxm);
	 }
	mygoto=setInterval(mo,10);
}

function divmove2(divid){
	var mx=150;
	var mxm=0.9876;
	var mygoto;
	divid.style.left="-100%";
	divid.style.top="0px";
		//alert(divid.offsetLeft);
	 function mo(){
		var tleft=divid.offsetLeft;
		if(tleft<0){
		divid.style.left=parseInt(tleft+mx)+"px";
		}else{
		divid.style.left="0px";
		clearTimeout(mygoto);
		}
		mx=parseInt(mx*mxm);
	 }
	mygoto=setInterval(mo,10);
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////验证链接有限与提示
function opurl(urlgo,act,info){
 if(act){
	 window.open(urlgo);
 }else{
	alert(info);
	return false;
 }
}


function upbgclose(thisdiv){
	thisdiv.style.background="#ff0000";
}
function upbgclose2(thisdiv){
	thisdiv.style.background="";
}










function setdisplay(divid){
	var thisdivid=$$(divid);
	if(thisdivid.style.display=="none"){
	thisdivid.style.display="";	
	}else{
	thisdivid.style.display="none";	
	}
}

////////////////////////////////////////////////调用公司名称
function getcompany(pageurl,divid){
var myDate=new Date();
//var myDate=1;
var infobox = $$(divid); 
var xmlhttp2;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp2=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp2=new ActiveXObject("Microsoft.XMLHTTP");
  }
if(pageurl.indexOf("http")<0){
	if(pageurl.indexOf("?")<0){
	    sURL=pageurl+"?d="+myDate;
	}else{
		sURL=pageurl+"&d="+myDate;
	}
}else{
	sURL="geturlcontent.asp?Turl="+pageurl+"&d="+myDate;
}
xmlhttp2.onreadystatechange=function()
  {
  if (xmlhttp2.readyState==4 && xmlhttp2.status==200){
	infobox.innerHTML=xmlhttp2.responseText;
	getlink();
    }
  }
xmlhttp2.open("GET",sURL,true);
xmlhttp2.send();
}

/*改变背景*/
function upbgcolor(btnid){
	btnid.style.background="#556770";
}
/*加载页面*/
onloadhtml=function(){
loadHTML(okurl,"pagel",1,1,1);
}

getshou=function(){
var sinfobox=$$("sinfobox");
sinfobox.style.display="none";
shouqs=$$("q").value;
window.location.href="?s="+shouqs;

/*if(shouqs){
thispage.value=1;
okurl=thisurl+"?s="+shouqs+"";
loadHTML(okurl,"pagel",1,1,0);
}*/
return false;
}



/////////////////////////////////////////
var csmap=function(){
	/*var baidumap="http://api.map.baidu.com/api?v=2.0&ak=myak";
	var script = document.createElement('script');
	script.type = 'text/javascript';
	var newURL = baidumap.replace('myak', 'ADec500702d3abcff55b4025db4c253f');
	script.src = newURL;
	document.body.appendChild(script);*/
 map = new BMap.Map("allmap",{minZoom:4,maxZoom:25});
 var point = new BMap.Point(mapxx, mapyy);    // 创建点坐标
 map.centerAndZoom(point,25);
 //map.centerAndZoom(new BMap.Point(120.413034, 27.514845),25);
 marker1 = new BMap.Marker(new BMap.Point(mapxx, mapyy));// 创建标注
 map.addOverlay(marker1);
 map.addControl(new BMap.NavigationControl());//添加默认缩放平移控件
 map.enableScrollWheelZoom(true);
}

var getmapto=function(lng,lat,act){
  map = new BMap.Map("allmap",{minZoom:4,maxZoom:25});
  var p1 = new BMap.Point(lng,lat);
  var p2 = new BMap.Point(mapxx,mapyy);
  if(act==1){
  var driving = new BMap.DrivingRoute(map, {renderOptions: {map: map, panel: "result", autoViewport: true}});
  driving.search(p1, p2);
  }else{
  var walking = new BMap.WalkingRoute(map, {renderOptions: {map: map, panel: "result", autoViewport: true}});
  walking.search(p1, p2); 
  }
  map.addControl(new BMap.NavigationControl());//添加默认缩放平移控件

}

var getmap=function (act){
	map.addOverlay(marker1);
	$$("result").innerHTML="玩命加载中..."
  if(typeof uexBaiduMap == 'undefined'){
	  
        getmapto(getCookie("lng"),getCookie("lat"),act);
		
  }else{
	uexBaiduMap.getCurrentLocation();
	uexLocation.openLocation();
    uexLocation.onChange=function(inLat,inLog){
    //alert("经度："+inLat+";纬度："+inLog);
	 getmapto(inLog,inLat);
     }
  }
}
/*
var getmymap=function(){
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
    if(this.getStatus() == BMAP_STATUS_SUCCESS){
         if(getCookie("lng")!=r.point.lng||getCookie("lat")!=r.point.lat){
		 //alert("不一样了")
		   setCookie("lng",r.point.lng,86400);//写入cookie
		   setCookie("lat",r.point.lat,86400);
		 }
    }
    else {
		getmymap();
        //alert('failed'+this.getStatus());
    }
    },{enableHighAccuracy: true})
}
*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function opendh(pageid){
var e=pagego(pageid);
if(!e) var e=$$(pageid);
//alert(e)
if(e) divmove0(e);

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////显示隐藏子div
var myloadinfo='<div id="mylo" class="divmargin tc " style="display:none;"><dt class="myloadimg" style="width:2em;height:2em;"></dt><dt class="p2">玩命加载中..</dt></div>\
	      <div class="divmargin p2 tc" style="display:none" onClick="pullUpAction()">更多内容</div>'

function zdivnot(div,num){
taln=$$(div).getElementsByTagName("div").length;
if(num>=taln) num=taln-1;
if($$(div).getElementsByTagName("div")[num]) $$(div).getElementsByTagName("div")[num].style.display="none";
}
function zdivyes(div,num){
taln=$$(div).getElementsByTagName("div").length;
if(num>=taln) num=taln-1;
if($$(div).getElementsByTagName("div")[num]) $$(div).getElementsByTagName("div")[num].style.display="";
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////复选框选择与反选input
function fjclick(inputname){
$$(inputname).checked=!$$(inputname).checked;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////单选框选择input
function dxclick(inputname,num){
document.getElementsByName(inputname)[num].checked="checked";
}
///////////////////////////////////////////////////////////////////////////////////////////////


//JS版的Server.UrlEncode编码函数    
function UrlEncode(str) 
{ 
return transform(str); 
} 
    
function transform(s) 
{ 
var hex=''    
var i,j,t 
    
j=0 
for (i=0; i<s.length; i++) 
{ 
t = hexfromdec( s.charCodeAt(i) ); 
if (t=='25') 
{ 
t=''; 
} 
hex += '%' + t; 
} 
return hex; 
} 
    
function hexfromdec(num) { 
if (num > 65535) { return ("err!") } 
first = Math.round(num/4096 - .5); 
temp1 = num - first * 4096; 
second = Math.round(temp1/256 -.5); 
temp2 = temp1 - second * 256; 
third = Math.round(temp2/16 - .5); 
fourth = temp2 - third * 16; 
return (""+getletter(third)+getletter(fourth)); 
} 
    
function getletter(num) { 
if (num < 10) { 
return num; 
} 
else { 
if (num == 10) { return "A" } 
if (num == 11) { return "B" } 
if (num == 12) { return "C" } 
if (num == 13) { return "D" } 
if (num == 14) { return "E" } 
if (num == 15) { return "F" } 
} 
} 

//JS版的Server.UrlEncode编码函数    
String.prototype.UrlEncode = function()
{    
var str = this;    
str = str.replace(/./g,function(sHex)    
{    
window.EnCodeStr = "";    
window.sHex = sHex;    
window.execScript('window.EnCodeStr=Hex(Asc(window.sHex))',"vbscript");    
return window.EnCodeStr.replace(/../g,"%contentamp;");    
}); 
return str;    
}

 
function EncodeUtf8(s1) 
{  
var s = escape(s1);
//alert(s)
var sa = s.split("%"); 
var retV =""; 
if(sa[0] != "") 
{  
retV = sa[0]; 
}
//alert(sa.length)
for(var i = 1; i < sa.length; i ++) 
{  
if(sa[i].substring(0,1) == "u") 
{  
retV += Hex2Utf8(Str2Hex(sa[i].substring(1,5)));
}  
else retV += "%" + sa[i]; 
}  
return retV; 
}  
function Str2Hex(s) 
{  
var c = "";  
var n;  
var ss = "0123456789ABCDEF"; 
var digS = "";  
for(var i = 0; i < s.length; i ++) 
{  
c = s.charAt(i); 
n = ss.indexOf(c); 
digS += Dec2Dig(eval(n)); 
}  
//return value; 
return digS; 
}  
function Dec2Dig(n1) 
{  
var s = "";  
var n2 = 0;  
for(var i = 0; i < 4; i++) 
{  
n2 = Math.pow(2,3 - i); 
if(n1 >= n2) 
{  
s += '1';  
n1 = n1 - n2; 
} 
else 
s += '0'; 
} 
return s; 
}  
function Dig2Dec(s) 
{  
var retV = 0;  
if(s.length == 4) 
{  
for(var i = 0; i < 4; i ++)  
{  
retV += eval(s.charAt(i)) * Math.pow(2, 3 - i); 
}  
return retV; 
}  
return -1; 
} 
function Hex2Utf8(s) 
{  
var retS = ""; 
var tempS = ""; 
var ss = "";  
if(s.length == 16)  
{  
tempS = "1110" + s.substring(0, 4); 
tempS += "10" + 
s.substring(4, 10); 
tempS += "10" + s.substring(10,16); 
var sss = "0123456789ABCDEF"; 
for(var i = 0; i < 3; i ++) 
{  
retS += "\%"; 
//retS += "\\x";  
ss = tempS.substring(i * 8, (eval(i)+1)*8); 
retS += sss.charAt(Dig2Dec(ss.substring(0,4)));
retS += sss.charAt(Dig2Dec(ss.substring(4,8)));
}  
return retS; 
} 
return ""; 
}
//alert(encodeURI("aa振aa可"))
////////////////////////////////////////////////////////////////////////////////////////////////////////////转换字符
function jszf(txt){
if(txt){
var reg=new RegExp("</br>","g");
txt=txt.replace(reg,'\n');

return txt;}
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////转rgb颜色
function reverseColor(rgbColor) {//205,15,20 
// console.log(rgbColor); 
rgbColor = rgbColor.replace(/\s/g, ""); 
var arrRGB = new Array(3); 
if (rgbColor.indexOf("rgb") > -1) { 
var colorReg = /\s*\d+,\s*\d+,\s*\d+/i; 
var t = colorReg.exec(rgbColor)[0].split(","); 
console.log(t); 
for (var i = 0; i < arrRGB.length; i++) { 
arrRGB[i] = t[i]; 
} 
} 
else if (rgbColor.indexOf("#") > -1) { 
if (rgbColor.length > 4)//"#fc0,#ffcc00" 
{ 
var j = 1; 
for (var i = 0; i < arrRGB.length; i++) { 
arrRGB[i] = parseInt(rgbColor.substr((i + j), 2), 16); 
j += 1; 
} 
} else { 
for (var i = 0; i < arrRGB.length; i++) { 
var t = rgbColor.substr((i + 1), 1); 
t = t + t; 
arrRGB[i] = parseInt(t, 16); 
} 
} 
} 
return "" + arrRGB.join(",") + "";
}

///////////////////////////////////////////////////////////////////////////////////////////////////////图片加载
function myimgload(limgcs){
var imgdivbox=limgcs.div;
var top=limgcs.top;
var myimgs=document.getElementsByTagName("img");
if(imgdivbox) myimgs=$$(imgdivbox).getElementsByTagName("img");
 for(var imgn=0;imgn<myimgs.length;imgn++){
   var thisimg=myimgs[imgn];
   var ytimg=thisimg.getAttribute('olsrc')||thisimg.src;
   var limg=limgcs.img||thisimg.src;
   thisimg.olsrc=ytimg;
   thisimg.src=limg;
 };
 scrollimg=function(){
   for(var imgn=0;imgn<myimgs.length;imgn++){
   var w=document.documentElement.clientWidth;
   var h=document.documentElement.clientHeight;
   var t1=document.body.scrollTop//滚动上去的内容高度;
   var timg=myimgs[imgn];
   var imgtop=timg.offsetTop;
    if(parseInt(h+t1+top)>=imgtop&&timg.src.indexOf(limg)>=0){
	//alert(timg.olsrc)
	  var timgn=new Image();
	  timgn.src=timg.olsrc;
	  timgn.n=imgn;
	  timgn.addEventListener('load',function(){
			myimgs[this.n].src=this.src;
											  });
	 //timg.src=timg.olsrc;
	}
   }
 }
 addEventListener('scroll',scrollimg);
 scrollimg();
}

/////////////////////////////////////返回按钮
function goback(){
  window.history.back();
}
//////////////////////////////////////////////////////打电话
function gettel(teln){
var caltel=teln;
  caltel=caltel.replace(/-/g,"");
  caltel=caltel.replace(/\//g,"|");
  caltel=caltel.replace(/;/g,"|");
  caltel=caltel.replace(/[ ]/g,"|");
  caltel=caltel.replace(/,/g,"|");
  //caltel=caltel.replace(/\||/g,"|");
  
  var calln=caltel.split("|");
  for(var i = 0 ;i<calln.length;i++){ 
             if(calln[i] == "" || typeof(calln[i]) == "undefined"){ 
                      calln.splice(i,1); 
                      i= i-1; 
             } 
  }
  if(calln.length>1){
	  var telinfospan='<p class="p2 tc">检测到有以下多个号码,请选择</p>';
	  for(var t=0;t<calln.length;t++){
		 telinfospan=telinfospan+'<div class="m3 bj-w2 tc p1" onclick=gettel("'+calln[t]+'")>'+parseInt(t+1)+'、'+calln[t]+'</div>'; 
	  }
	  alertawg(telinfospan,1,"")
  }else{
	  window.location.href='tel:'+calln[0];
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////去链接
var urlcs;
function gotourl(gurl){
var d=Math.ceil(Math.random()*10000);
  if(gurl.indexOf("taobao")>=0||gurl.indexOf("tmall")>=0){
	  window.location.href="/tao.asp?turl="+gurl
  }else{
	 //if(urlcs) window.history.replaceState("","","?"+urlcs);//修改history实体;
	 if(gurl.indexOf("http://")>=0){
		 window.location.href=gurl;
	 }else{
	  if(gurl.indexOf("?")>=0){
	      window.location.href=""+gurl+"&t="+d;
	  }else{
		  window.location.href=""+gurl+"?t="+d;
	  }
	 }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////提示框
function cztsalert(txt){  
  var bodydiv = document.body;
  var alertdiv = document.createElement("div");
  alertdiv.className="tbox pos2 tmbj-b2 boxu boxu-s";
  alertdiv.style.zIndex="3000";
  alertdiv.style.left="0px";
  alertdiv.style.top="0px";
  bodydiv.appendChild(alertdiv);
  alertdiv.innerHTML='\
  <div class="boxbf1"></div>\
  <div class="tscsdiv boxu boxu-h m4">\
    <div class="boxbf1"></div>\
	<div class="tmbj-b7 bk-b0 p3 tcol-w1 ts-0d8">'+txt+'</div>\
	<div class="boxbf1"></div>\
  </div>\
  <div class="boxbf1"></div>\
  '
  setTimeout(function(){
					bodydiv.removeChild(alertdiv);
					  },1500)
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////对话框
var newalert;
function alertawg(txt,act,fun){ 
  var askact=act||0,laskbtn="";
  if(askact==2){
    var laskbtn='\
	<div class="divmargin p3 bj-w2 tcol-w9 tc"><btn class="p2 ml2 mr2 tc bj-w8 tcol-w1 ona sbbj3-4">确定</btn></div>\
	'
  }
  if(askact==3){
    var laskbtn='\
	<p class="divmargin p3 bj-w2 tcol-w9 tc">\
	  <btn name="btnok" class="p2 pl4 pr4 ml2 mr2 tc bj-w8 tcol-w1 yj1 ">确定</btn>\
	  <btn name="btnnot" class="p2 pl4 pr4 mr2 tc bj-w8 tcol-w1 yj1 ">取消</btn>\
	</p>\
	'
  }
  var fdsagewal = document.body;
  newalert = document.createElement("div");
  newalert.className="tbox pos2 askdis-not";
  newalert.style.zIndex="3000";
  newalert.innerHTML='\
  <div class="tbox" style="background:rgba(0,0,0,0.5);">\
   <div class="myasktbox pos1">\
    <div class="divmargin yj2 bj-w6 bks2">\
      <p class="divmargin p3 pt4 pb4 bj-w8 tb1 tcol-w1">小城生活提示</p>\
      <div class="divmargin p3 pt4 pb4 bj-w2 tcol-w9">'+txt+'</div>\
	  '+laskbtn+'\
	</div>\
   </div>\
  </div>\
  ';
  fdsagewal.appendChild(newalert);
  setTimeout(function(){
    if(newalert) newalert.className=newalert.className.replace("askdis-not","askdis-yes");
	if(!askact){
	  setTimeout(function(){
        if(newalert) newalert.className=newalert.className.replace("askdis-yes","askdis-not");
	    setTimeout(function(){
        if(newalert) newalert.parentNode.removeChild(newalert);
        },600);
       },5000);
	 }
	 
	 if(askact==3){
	   var btnok=newalert.getElementsByTagName("btn");
	   if(btnok[0]) btnok[0].addEventListener('click',function(){
															   newalert.parentNode.removeChild(newalert);
															   if(fun) return fun(1);
															   },false);
	   if(btnok[1]) btnok[1].addEventListener('click',function(){
															   newalert.parentNode.removeChild(newalert);
															   if(fun) return fun(0);
															   },false);
	 }
	 
	 if(newalert){
	     newalert.addEventListener('click', function(){
         if(newalert) newalert.className=newalert.className.replace("askdis-yes","askdis-not");
	     setTimeout(function(){
         if(newalert) newalert.parentNode.removeChild(newalert);
		 if(fun) return fun();
         },600);
	     }, false);
	 }
	 
  },50);
  
}


function delload(deldiv){
  deldiv.parentNode.removeChild(deldiv);
}