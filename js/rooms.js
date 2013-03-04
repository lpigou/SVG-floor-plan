//author: Lionel Pigou

/////////////////////////////////////////////////////////////////////////////////////////	
//-----------------------------Rooms-----------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////////////

function Room(){
	this.id = countID++;
	this.name = null;
	this.select = roomSelect;
	this.unselect = roomUnselect;
	this.modify = roomModify;
	this.remove = roomRemove;
	this.rects = [];
	rooms.push(this);
}
function roomSetName(name){
	currentRoom.name = name;
}
function roomRemove(){
	var l1 = edges.length,
		l2 = rects.length;
	for(var i=0;i<l1;i++)
		edges[i].remove();
	for(var i=0;i<l2;i++)
		rects[i].remove();
	countID = 1;
}
function roomModify(x,y){
	var w = nWidth,
		r = rects[x+y*w];
	if(r.roomId != 0 && r.roomId != this.id) return;
	if(r.roomId == 0){
		this.rects.push(r);
	}else this.rects.splice(this.rects.indexOf(r),1);
	r.toggle(this.id);
	var e = getSurroundingEdges(x,y);
	for(var i=0; i<4;i++)
		if(e[i]) e[i].toggle(this.id);
}
function roomSelect(){
	if(currentRoom)
		currentRoom.unselect();
	currentRoom = this;
	var l = this.rects.length;
	for(var i=0;i<l;i++){
		this.rects[i].animate(rectSelectAttr,300);
	}
	if(this.name) $("#slctBox").selectBox('value',this.name);
	else $("#slctBox").selectBox('value','null');
}
function roomUnselect(){
	var l = this.rects.length;
	for(var i=0;i<l;i++){
		this.rects[i].animate(rectUnselectAttr,300);
	}
}
function getRoom(id){
	var l = rooms.length;
	for(var i=0;i<l;i++){
		if(rooms[i].id == id)
			return rooms[i]
	}
	return false;
}
function getRoomByName(name){
	var l = rooms.length;
	for(var i=0;i<l;i++){
		if(rooms[i].name){
			if(rooms[i].name == name)
				return rooms[i]
		}
	}
	return false;
}
function selectRoomByName(name){
	if(!name || /^\s*$/.test(name))return;
	if(name == 'null')
		$("#slctBox").selectBox('value','null');
	var room = getRoomByName(name);
	if(room){
		room.select();
	}else if(name=='null'){
		if(currentRoom) currentRoom.unselect();
	}else{
		//if(currentRoom) currentRoom.unselect();
		showDialog(name+" has not been set yet!");
	}
}