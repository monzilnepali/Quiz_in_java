$(document).ready(function(){

	$(".sidebar-toggle").click(function(){
		$(".flex-sidebar").toggleClass("sidebar-open");
		$(".color-overlay").toggleClass("reveal");
	});
});