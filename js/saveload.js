//author: Lionel Pigou

/////////////////////////////////////////////////////////////////////////////////////////	
//-----------------------------Save/Load-------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////////////

function saveState(){
	var jsonRects = [];
	var l = rects.length;
	for(var i=0;i<l;i++){
		if(rects[i].roomId != 0)
			jsonRects.push({i: i, ri: rects[i].roomId});
	}
	
	var jsonDoors = [];
	var l = edges.length;
	for(var i=0;i<l;i++){
		if(edges[i].isDoor)
			jsonDoors.push({i: i});
	}
	
	var jsonRooms = [];
	var l = rooms.length;
	for(var i=0;i<l;i++)
		jsonRooms.push({id: rooms[i].id, name: rooms[i].name});
		

	var jsonSave = $.toJSON({rects: jsonRects, rooms: jsonRooms, doors: jsonDoors});
	
	
	$.post("dataHandler.php",{save:jsonSave},function(data){
		console.log(data);
		showDialog('Save complete!');
	});
}

var timer2;
function getData(){
	$.post("dataHandler.php",{save:""},function(encodedData){
		console.log("post: "+encodedData);
		loadState(encodedData);
	});
	$.post("passRoomsToJS.php",{},function(encodedData){
		console.log("rooms: "+encodedData);
		addRoomsToList(encodedData);
	});
	$.post("passUsersToJS.php",{},function(encodedData){
		console.log("users: "+encodedData);
		addUsersToList(encodedData);
	});
	timer2 = setTimeout("getNewLocation()",1000);
}

function getNewLocation(){
	clearTimeout(timer2);
	if(mode=="watch"){
		timer2 = setTimeout("getNewLocation()",1000);
		$.post("newLocationHandler.php",{},function(loc){
			console.log("new location: " + loc);
				var name = $.evalJSON(loc);
				selectRoomByName(name);
		});
	}
}

function addRoomsToList(encodedData){
	if(!encodedData || /^\s*$/.test(encodedData))return;
	var data = $.evalJSON(encodedData);
	$.each(data, function(val,text) {
		$('#slctBox').append(
			$('<option></option>').val(text).html(text)
		);
	});
	$('#slctBox').selectBox()
	.change(function(){
		console.log($(this).val());	
		selectRoomByName($(this).val());		
	});
}

function addUsersToList(encodedData){
	if(!encodedData || /^\s*$/.test(encodedData))return;
	var data = $.evalJSON(encodedData);
	$.each(data, function(val,text) {
		$('#slctBox2').append(
			$('<option></option>').val(text).html(text)
		);
	});
	$('#slctBox2').selectBox()
	.change(function(){
		console.log($(this).val());	
		trackUser($(this).val());		
	});
	console.log($('#slctBox2').val());
	trackUser($('#slctBox2').val());	
}

function trackUser(userName){
	var userJSON = $.toJSON(userName.toString());
	$.post("passUsersToPHP.php",{user:userJSON},function(encodedData){
		console.log("Trackuser: "+encodedData);
	});
}

function loadState(encodedData){
	if(!encodedData || /^\s*$/.test(encodedData)){
		(new Room()).select();
		return;
	}
	var data = $.evalJSON(encodedData);
	console.log($.toJSON(data));
	var re = data.rects;
	var ro = data.rooms;
	var doors = data.doors;
	
	var l = re.length;
	for(var i=0;i<l;i++){
		var r = rects[re[i].i];
		var room = getRoom(re[i].ri);
		if(!room){
			room = new Room();
			room.id = re[i].ri;
		}
		room.rects.push(r);
		r.roomId = room.id;
		r.hidden=false;
		r.attr(rectUnselectAttr);
		var x = re[i].i % nWidth,
			y = Math.floor(re[i].i / nWidth);
		var e = getSurroundingEdges(x,y);
		for(var j=0; j<4;j++)
			if(e[j]) e[j].toggle(room.id);
	}
	
	var l = doors.length;
	for(var i=0;i<l;i++){
		edges[doors[i].i].toggleDoor();
	}
	
	var l = ro.length;
	for(var i=0;i<l;i++){
		var room = getRoom(ro[i].id)
		if(room){
			room.name = ro[i].name;
		}
	}
	countID = ro[l-1].id+1;
	(new Room()).select();
	
}
