//--DOCUMENT READY FUNCTION BEGIN
jQuery(document).ready(function () {
 	jQuery(".flag a").click(function(e) {
		e.preventDefault();
		//$.post( "/bantag", { tag: "lovers_nippon" }).done(function( data ) {
			jQuery(".flag").html("Thanks! Content will be reviewed.");
		//});
	});
    var ps = new PerfectScrollbar('#detail-post-scroll');

});
//--DOCUMENT READY FUNCTION END

//--WINDOW LOADED FUNCTION BEGIN
jQuery(window).bind("load", function () {

});
//--WINDOW LOADED FUNCTION END

//--WINDOW RESIZE FUNCTION BEGIN
jQuery(window).resize(function () {

});
//--WINDOW RESIZE FUNCTION END