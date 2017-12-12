$(document).ready(function(){

	$(".sidebar-toggle").click(function(){
		$(".flex-sidebar").toggleClass("sidebar-open");
		$(".color-overlay").toggleClass("reveal");
	});
	$(".rightsidebar-toggle").click(function(){
		console.log("toggler click");
		$(".header-rightsidebar").toggleClass("rightsidebar-open");
	});
	
});