// jQuery extension for dynamic font sizes
// Source: github.com/NathanRutzky/jQuery.fontFlex
// Version: 1.0

(function($) {
    $.fn.fontFlex = function(min, max, mid) {

        var $this = this;
		var e;
		var b = function(){
			var size = window.innerWidth / mid;
            if (size < min) size = min;
            if (size > max) size = max;
            $this.css('font-size', size + 'px');
		};
        $(window).resize(function(){
			clearTimeout(e);
			e = setTimeout(b, 300);
		}).trigger('resize');
		$(window).load(b);
    };
})(jQuery);