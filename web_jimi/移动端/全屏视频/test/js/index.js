/*! Copyright©2008-2016 10101111.com All Rights Reserved.2017-05-11 */

function orientationchange() 
{
	0 == window.orientation || 180 == window.orientation ? (document.getElementById("horizontal").style.display = "none", window.OBJ360 && window.OBJ360.play()) : (document.getElementById("horizontal").style.display = "block", window.OBJ360 && window.OBJ360.stop())
}

function isWeixin() {
	return navigator.userAgent.indexOf("MicroMessenger") > 0
}

function loadImg() {
	function preloadimages(obj, complete_cb, progress_cb) {
		function load() {
			++loaded, progress_cb && progress_cb(loaded, toload), loaded >= toload && complete_cb(images)
		}
		var loaded = 0,
			toload = 0,
			images = obj instanceof Array ? [] : {};
		toload = obj.length;
		for (var i = 0; i < obj.length; i++) images[i] = new Image, images[i].onload = load, images[i].onerror = load, images[i].onabort = load, images[i].src = mktimage + "/wap/2017/szvideocard/" + obj[i];
		0 == obj.length && complete_cb(images)
	}
	var tempProgress = 0;
	preloadimages(preloadImageList, function(loaded, total) {}, function(progress) {
		var progressPercent = parseInt(progress / preloadImageList.length * 100);
		tempProgress != progressPercent && (tempProgress = progressPercent, $(".percentN").html(tempProgress + "%")), 100 == tempProgress && (isWeixin() ? bipinitwx() : bipinitapp())
	})
}

function bipinitapp() {

	 $("#newloading").css({
		background: "url(file/start.png) no-repeat",
		"background-size": "100% 100%"
	}),
	$(".playerBtn").on("click", function() {
		v1.play(), v1.addEventListener("timeupdate", hh1, !1)
	})
}
function bipinitwx() {
	browser.versions.android ? ($(".loading").hide(), $("#newloading").css({
		background: "url(file/start.png) no-repeat",
		"background-size": "100% 100%"
	}), $(".playerBtn").fadeIn(), $(".playerBtn").on("click", function() {
		v1.play(), v1.addEventListener("timeupdate", hh1, !1), $(".playerBtn").hide(), $(".slide0").addClass("active").fadeIn(), $("#newloading").css({
			display: "none"
		})
	})) : document.addEventListener("WeixinJSBridgeReady", function() {
		WeixinJSBridge.invoke("getNetworkType", {}, function(e) {
			v1.play(), v1.addEventListener("timeupdate", hh1, !1), $(".slide0").addClass("active").fadeIn(), $("#newloading").css({
				display: "none"
			})
		})
	})
}
var browser = {
	versions: function() {
		var u = navigator.userAgent;
		navigator.appVersion;
		return {
			trident: u.indexOf("Trident") > -1,
			presto: u.indexOf("Presto") > -1,
			webKit: u.indexOf("AppleWebKit") > -1,
			gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1,
			mobile: !! u.match(/AppleWebKit.*Mobile.*/) || !! u.match(/AppleWebKit/),
			ios: !! u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
			android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1,
			iPhone: u.indexOf("iPhone") > -1 || u.indexOf("Mac") > -1,
			iPad: u.indexOf("iPad") > -1,
			webApp: u.indexOf("Safari") == -1
		}
	}(),
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
},

v1 = document.getElementById("video1"),
v2 = document.getElementById("video2"),
hh1 = function() {
	browser.versions.android && (v1.paused ? $(".btn_continue").show().on("click", function() {
		v1.play()
	}) : $(".btn_continue").hide()), v1.currentTime > 0 && $(".loading").hide(), v1.currentTime > 124 && (s0ToS1(), v1.removeEventListener("timeupdate", hh1, !1))
},
hh2 = function(){
	browser.versions.android && (
		v2.paused ? 
		$(".btn_continue").show().on("click", function() {v2.play()}) : 
		$(".btn_continue").hide()),

	
		v2.currentTime > 0 && $(".loading").hide(), 
		v2.currentTime > 124 && (s0ToS1(), v2.removeEventListener("timeupdate", hh2, !1))
}



$(function() 
{
	$bili = 640 / 1029, $height = $(window).height(), $width = $(window).width(), $w = $height * $bili;
	var $h = $height + "px";
	$biliW = $(window).width() / $(window).height(), $biliV = 640 / 1028,
	$biliW < $biliV ? ($videoH = $height, $videoW = $height / $biliV, marLeft = ($width - $videoW) / 2 + "px", marTop = 0)
	: ($videoW = $(window).width(), $videoH = $(window).width() / $biliV, marTop = ($height - $videoH) / 2 + "px", marLeft = 0), 
	console.log($width + ",===" + $videoW + "====" + marLeft), $("#video1").css
	({
		width: $videoW,
		height: $videoH,
		"margin-left": marLeft,
		"margin-top": marTop
	}), $(".page").css({
		width: $w,
		height: $h
	}), $("body").css({
		height: $h
	}), setTimeout(scrollTo, 0, 0, 0), window.onorientationchange = function() {
		orientationchange()
	}, document.body.addEventListener("touchmove", function(evt) {
		evt._isScroller || evt.preventDefault()
	}), $(".btn_card, .btn_card1").on("click", function() {
		location.href = "https://ecentre.spdbccc.com.cn/creditcard/indexActivity.htm?data=P1660066"
	}), $(".btn_detail").on("click", function() {
		$(".rule").fadeIn()
	}), $(".btn_close").on("click", function() {
		$(".rule").fadeOut()
	}), $(".btn_share").on("click", function() {
		$(".share").fadeIn().addClass("active")
	}), $(".share").on("click", function() {
		$(this).fadeOut().removeClass("active")
	}), $(".btn_tiao").on("click", function() {
		s0ToS1(), v1.removeEventListener("timeupdate", hh1, !1)
	})
		
	
	v1 = document.getElementById("video1");
	v1.play(), v1.addEventListener("timeupdate", hh1, !1),  $(".slide0").addClass("active").fadeIn();
	v2.play(), v1.addEventListener("timeupdate", hh2, !1),  $(".slide0").addClass("active").fadeIn();
	
});
var loadFlag = 1;