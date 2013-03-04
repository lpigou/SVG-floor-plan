//author: Lionel Pigou

/////////////////////////////////////////////////////////////////////////////////////////	
//-----------------------------Rects-----------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////////////

function makeRect(x,y){
	var r = paper.rect(x,y,g,g).attr(rectAttr);
	r.hidden = true;
	r.roomId = 0;
	r.hide = rectHide;
	r.show = rectShow;
	r.toggle = rectToggle;
	r.clicker = rectClick;
	r.remove = rectRemove;
	r.hide();
	rects[rects.length] = r;
}
function rectHide(){
	this.attr(rectHideAttr);
	this.hidden=true;
	this.roomId = 0; 
}
function rectShow(){
	this.attr(rectShowAttr);
	this.hidden=false;
	this.roomID = currentRoom.id;
}
function rectClick(){
	getRoom(this.roomId).select();
	//$("#btnDraw").click();
}
function rectRemove(){
	this.roomId = 0;
	this.hide();
}
function rectToggle(id){
	if(this.roomId == id){
		this.hide();
	}else if(this.roomId==0){
		this.show();
		this.roomId = id;
	}
}
function selectRects(id){
	var l = rects.length;
	for(var j=0;j<l;j++){
		if(currentRoom != null 
			&& rects[j].roomId == currentRoom.id)
			rects[j].attr(rectUnselectAttr);
		else if(rects[j].roomId == id)
			rects[j].attr(rectSelectAttr);
	}
}