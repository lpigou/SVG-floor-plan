//author: Lionel Pigou

/////////////////////////////////////////////////////////////////////////////////////////	
//-----------------------------UI--------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){

	$("#btnUnsetName").button()
		.click(function(){
			currentRoom.name = null;
			selectRoomByName('null');
		});
	
	
	$("#btnSetName").button()
		.click(function(){
			currentRoom.name = $("#slctBox option:selected").text();
			showDialog(currentRoom.name+' set!');
		});
	
	//slctBox
	var data = {
		room1: "Keuken",
		room2: "Lokaal 3.08",
		room3: "Gang",
		room4: "Vergaderzaal A",
		room5: "WC"
		
	};
	$.each(data, function(val,text) {
		$('#slctBox').append(
			$('<option></option>').val(text).html(text)
		);
	});
	$('#slctBox').append($('<option></option>').val('null').html('null'));
	$('#slctBox').selectBox()
	.change(function(){
		console.log($(this).val());	
		selectRoomByName($(this).val());		
	});
	
	//slctBox2
	var data2 = {
		room1: "Ruben",
		room2: "Thomas",
		room3: "Steven",
		room4: "Lionel"
		
	};
	$.each(data2, function(val,text) {
		$('#slctBox2').append(
			$('<option></option>').val(text).html(text)
		);
	});
	$('#slctBox2').selectBox()
	.change(function(){
		console.log($(this).val());	
		trackUser($(this).val());		
	});
	
	
	$('#modesButtonSet').buttonset();
	$('#drawButtonSet').buttonset();
	$('#roomBtns').buttonset();
	
	$("#btnNext").button({ icons: {primary:'ui-icon-circle-arrow-e'}});
	$("#btnClear").button({ icons: {primary:'ui-icon-trash'},text:false});
	$("#btnSave").button({ icons: {primary:'ui-icon-disk'},text:false});
	
	$("#btnWatch").click(function(){
		hideDrawBtns();
		switchMode("watch");
	});
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
		currentRoom = null;
		(new Room()).select();
	});
	$("#btnNext").click(function(){
			console.log('select');
		if(mode == "draw")
			(new Room()).select();
	});
	$("#btnSave").click(function(){
		saveState();
	});
	
	$("#btnDraw").click();
});

var timer;
function showDialog(msg){
	if($("#dialog-message"))$("#dialog-message").remove();
	
	$('#'+divId).append('<div id="dialog-message"></div>');
	
	$("#dialog-message").dialog({
		//modal : true,
		resizable:false,
		height:0,
		width: msg.length*9,
		title: msg,
		position:'right'
	});
	clearTimeout(timer);
	timer=setTimeout("removeDialog()",3000);
}
function removeDialog(){
	if($("#dialog-message"))$("#dialog-message").remove();
}

function hideDrawBtns(){
	//$(".btndraw").button("option","disabled",true);
}
function showDrawBtns(){
	$(".btndraw").button("option","disabled",false);
}
