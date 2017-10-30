var oIndex = 0;
function setFootbtn(x){
	oIndex = x;
	var footbox = document.createElement("footer");
	footbox.className = "footer";
	//position: fixed;

	footbox.innerHTML='<ul class="bottom-list clearfix">\
			        <li name="foobtn" onclick="gotoIndex();">\
			            <a href="javascript:;" >\
			            	<span class="footer-img1"></span>\
			                <p>首页</p>\
			            </a>\
			        </li>\
			        <li name="foobtn" onclick="gotoShoppingMall();">\
			            <a href="javascript:;" >\
			            	<span class="footer-img2"></span>\
			                <p>工程商城</p>\
			            </a>\
			        </li>\
			        <li name="foobtn" onclick="gotoDiscover();">\
			            <a href="javascript:;" >\
			            	<span class="footer-img3"></span>\
			                <p>发现</p>\
			            </a>\
			        </li>\
			         <li name="foobtn" onclick="gotoPersonal();">\
			            <a href="javascript:;" >\
			            	<span class="footer-img4"></span>\
			                <p>我</p>\
			            </a>\
			        </li>\
			    </ul>';
  document.body.appendChild(footbox);

	var foobtn=$$n("foobtn");
    for(var n=0;n<foobtn.length;n++){
      if(n==(x-1)){
        foobtn[n].classList.add('active');
      }
      if(x ==0){
        foobtn[0].classList.add('active');
      }
    }
}


////////////////////////////////////////链接至商城首页
function gotoIndex(){
	if(oIndex ==1||oIndex ==0){
		window.location.href='index.html';
	}else{
		window.location.href='../index.html';
	}
}

////////////////////////////////////////链接至工程商城
function gotoShoppingMall(){
	if(oIndex ==2){
		window.location.href='shopping.html';
	}else if(oIndex ==0){
		window.location.href='shopping/shopping.html';
	}else{
		window.location.href='../shopping/shopping.html';
	}
}


////////////////////////////////////////链接至发现
function gotoDiscover(){
	if(oIndex ==3){
		window.location.href='discover.html';
	}else if(oIndex ==0){
		window.location.href='discover/discover.html';
	}else{
		window.location.href='../discover/discover.html';
	}
}

////////////////////////////////////////链接至我
function gotoPersonal(){
	if(oIndex ==4){
		window.location.href='personal.html';
	}else if(oIndex ==0){
		window.location.href='personal/personal.html';
	}else{
		window.location.href='../personal/personal.html';
	}
}



function $$(n){
	return document.getElementById(n);
}

function $$n(n){
	return document.getElementsByName(n);
}