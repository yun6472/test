function setFootbtn(){
	var footbox = document.createElement("div");
	//position: fixed;
	footbox.innerHTML=
	'<footer class="footer">\
			<a onclick="gotoShop()" name="foobtn">\
				<i class="iconfont icon-shouye"></i>\
				<div class="footer-txt">首页</div>\
			</a>\
			<a onclick="gotoAllProd()" name="foobtn">\
				<i class="iconfont icon-qiche"></i>\
				<div class="footer-txt">品牌车型</div>\
			</a>\
			<a onclick="gotoPtype()" name="foobtn">\
				<i class="iconfont icon-hezi101"></i>\
				<div class="footer-txt">精品配件</div>\
			</a>\
			<a onclick="gotoGoWuChe()" name="foobtn">\
				<i class="iconfont icon-iorder"></i>\
				<div class="footer-txt">个人中心</div>\
			</a>\
		</footer>\
	';
  document.body.appendChild(footbox);

  if(!btnnn) btnnn=1;
	var foobtn=$$n("foobtn");
    for(var n=0;n<foobtn.length;n++){
      if(n==(btnnn-1)){
        foobtn[n].classList.add('active');
      }
    }
  //getlink();
}

//首页特殊   
function setFootbtnIndex(){
	var footbox = document.createElement("div");
	//position: fixed;
	footbox.innerHTML=
	'<footer class="footer">\
			<a onclick="gotoShop()" name="foobtn">\
				<i class="iconfont icon-shouye"></i>\
				<div class="footer-txt">首页</div>\
			</a>\
			<a onclick="gotoAllProd()" name="foobtn">\
				<i class="iconfont icon-qiche"></i>\
				<div class="footer-txt">品牌车型</div>\
			</a>\
			<a onclick="gotoPtype()" name="foobtn">\
				<i class="iconfont icon-hezi101"></i>\
				<div class="footer-txt">精品配件</div>\
			</a>\
			<a onclick="gotoGoWuChe()" name="foobtn">\
				<i class="iconfont icon-iorder"></i>\
				<div class="footer-txt">个人中心</div>\
			</a>\
		</footer>\
	';
  
  document.body.appendChild(footbox);

  if(!btnnn) btnnn=1;
	var foobtn=$$n("foobtn");
    for(var n=0;n<foobtn.length;n++){
      if(n==(btnnn-1)){
        foobtn[n].classList.add('active');
      }
    }
}

////////////////////////////////////////链接至商城首页
function gotoShop(){
	window.location.href='index.html';
}

////////////////////////////////////////链接至全部商品
function gotoAllProd(){
	window.location.href='goods_list.html';
}

////////////////////////////////////////链接至分类页面
function gotoPtype(){
	window.location.href='cate_list.html';
}

////////////////////////////////////////链接至购物车
function gotoGoWuChe(){
	window.location.href='user_cart.html';
}

////////////////////////////////////////链接至个人中心
function gotoMy(){
	window.location.href='user_center.html';
}

////////////////////////////////////////显示购物车提示
function disgwcts(n){
	var footgwcts=$$("footgwcts");
	footgwcts.innerHTML=n;
	footgwcts.style.display='';
}

function $$(n){
	return document.getElementById(n);
}
function $$n(n){
	return document.getElementsByName(n);
}