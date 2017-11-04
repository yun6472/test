function setFootbtn(x){
	var footbox = document.createElement("footer");
	footbox.className = "footer";
	//position: fixed;

	footbox.innerHTML='<ul class="bottom-list clearfix">\
				        <li name="foobtn">\
				            <a href="javascript:;"  onclick="gotoIndex()" >\
				                <i class="iconfont icon-shouye"></i>\
				                <p>首页</p>\
				            </a>\
				        </li>\
				        <li name="foobtn">\
				            <a href="javascript:;"  onclick="gotoCustomerServiece()" >\
				                <i class="iconfont icon-kefu"></i>\
				                <p>客服</p>\
				            </a>\
				        </li>\
				        <li name="foobtn">\
				            <a href="javascript:;"  onclick="gotoMy()" >\
				               <i class="iconfont icon-geren"></i>\
				                <p>我的</p>\
				            </a>\
				        </li>\
				    </ul>';
  document.body.appendChild(footbox);

  if(!x) x=1;
	var foobtn=$$n("foobtn");
    for(var n=0;n<foobtn.length;n++){
      if(n==(x-1)){
        foobtn[n].classList.add('active');
      }
    }
  //getlink();
}


////////////////////////////////////////链接至商城首页
function gotoIndex(){
	window.location.href='index.html';
}

////////////////////////////////////////链接至全部商品
function gotoCustomerServiece(){
	/*window.location.href='lift.html';*/
}




////////////////////////////////////////链接至个人中心
function gotoMy(){
	window.location.href='my.html';
}



function $$(n){
	return document.getElementById(n);
}
function $$n(n){
	return document.getElementsByName(n);
}