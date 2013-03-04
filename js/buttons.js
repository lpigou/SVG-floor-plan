//author: Lionel Pigou

$(document).ready(function(){

	$('#modesButtonSet').buttonset();
	
	$("#btnNext").button({ icons: {primary:'ui-icon-circle-arrow-e'},text:false});
	$("#btnClear").button({ icons: {primary:'ui-icon-trash'},text:false});
	$("#btnSave").button({ icons: {primary:'ui-icon-disk'},text:false});
	
	$("#btnSelect").click(function(){
		hideDrawBtns();
		switchMode("select");
	});
	$("#btnDraw").click(function(){
		showDrawBtns();
		switchMode("draw");
	});
	$("#btnDoors").click(function(){
		hideDrawBtns();
		switchMode("doors");
	});
	$("#btnClear").click(function(){
		if(mode != "draw") return;
		rooms.forEach(function(e){
			e.remove();
		});
		rooms.splice(0,rooms.length);
		(new Room()).select();
	});
	$("#btnNext").click(function(){
		if(mode == "draw")
			(new Room()).select();
	});
	$("#btnSave").click(function(){
		saveState();
	});
	
	$("#btnDraw").click();
});

function hideDrawBtns(){
	$(".btndraw").button("option","disabled",true);
}
function showDrawBtns(){
	$(".btndraw").button("option","disabled",false);
}