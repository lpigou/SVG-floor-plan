//author: Lionel Pigou

/////////////////////////////////////////////////////////////////////////////////////////	
//-----------------------------Edges-----------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////////////

function makeEdge(x,y,lx,ly){
	var e = paper.path([['M',x,y],['l',lx,ly]]).attr(edgeAttr);
	e.hidden = true;
	e.isDoor = false;
	e.roomId = 0;
	e.roomId2 = 0;
	e.hide = edgeHide;
	e.show = edgeShow;
	e.toggle = edgeToggle;
	e.toggleDoor = edgeDoor;
	e.clicker = edgeClick;
	e.remove = edgeRemove;
	e.hide();
	edges[edges.length]= e;
}
function edgeHide(){
	this.attr(edgeHideAttr);
	this.hidden = true;
	this.isDoor = false;
}
function edgeShow(){
	if(this.isDoor)return;
	this.attr(edgeShowAttr);
	this.hidden = false;
}
function edgeDoor(){
	if(this.isDoor) {
		this.isDoor = false;
		this.attr(edgeUndoorAttr);
	}else if(!this.hidden){
		this.isDoor = true;
		this.attr(edgeDoorAttr);
	}	
}
function edgeClick(){
	this.toggleDoor();
}
function edgeRemove(){
	this.isDoor = false;
	this.roomId = 0;
	this.roomId2 = 0;
	this.shared = false;
	this.hide();
}
function getSurroundingEdges(x,y){
	var w = Math.floor(canvasW/g)+1;
	return [
		edges[(x+y*w)*2],//up
		edges[(x+(y+1)*w)*2], //down
		edges[(x+y*w)*2+1], //left
		edges[(x+y*w)*2+3] //right
	]
}
function edgeToggle(id){
	var id1 = this.roomId,
		id2 = this.roomId2;
	if(id1 == 0 && id2 == 0){ 
		this.show();
		this.roomId = id;
	}else if(id1 == id && id2 == 0){ 
		this.hide();
		this.roomId = 0;
	}else if(id1 != id && id2 == 0){ 
		this.roomId2 = id;
	}else if(id1 != id && id2 == id){ 
		this.roomId2 = 0;
	}else if(id1 == id && id2 != id){ 
		this.roomId = id2;
		this.roomId2 = 0;
	}
}
