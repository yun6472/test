function setFootbtn(){
	var footbox = document.createElement("div");
	footbox.innerHTML='\
	<div class="divmargin" style="height:3em;">\
	  <div class="tbox boxu boxu-h pos2 bj-w1 bk-x1 bk-t1 bk-cw3 pt1 pb1" style="z-index:1000;left:0em;bottom:0em;height:2.6em;">\
	    <div onclick="gotoShop()" name="foobtn" sbjgbg="#ccc" class="boxbf1 btncs1"></div>\
		<div onclick="gotojx()" name="foobtn" sbjgbg="#ccc" class="boxbf1 btncs2"></div>\
		<div onclick="gotofl()" name="foobtn" sbjgbg="#ccc" class="boxbf1 btncs3"></div>\
		<div onclick="gotoMy()" name="foobtn" sbjgbg="#ccc" class="boxbf1 btncs4"></div>\
		<div onclick="gotoMy()" name="foobtn" sbjgbg="#ccc" class="boxbf1 btncs5"></div>\
	  </div>\
	</div>\
	'
  document.body.appendChild(footbox);

  if(!btnnn) btnnn=0;
	var foobtn=$$n("foobtn");
    for(var n=0;n<foobtn.length;n++){
      if((n+1)==btnnn){
        foobtn[n].style.backgroundPosition="center 100%";
      }
    }

  getlink();
}

////////////////////////////////////////链接至商城首页
function gotoShop(){
	window.location.href='/';
}

////////////////////////////////////////链接至服务页
function gotojx(){
	window.location.href='jiexiao.html';
}
////////////////////////////////////////
function gotofl(){
	window.location.href='fenlui.html';
}
////////////////////////////////////////链接至服务页
function gotoMy(){
	window.location.href='grzx_home.html';
}