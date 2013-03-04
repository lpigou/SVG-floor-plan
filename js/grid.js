//author: Lionel Pigou

$(document).ready(function(){gridInit()});
/////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------Globals---------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////////////

var canvasW = 400,
	canvasH = 400,
	divId = 'container',
	g = 20; //gridstep

var paper, 
	space,
	rects = [],
	rooms = [],
	countID = 1,
	currentRoom,
	edges = [],
	buttons=[],
	mode = '',
	nWidth = Math.floor(canvasW/g)+1;
	
/////////////////////////////////////////////////////////////////////////////////////////
//-----------------------------Fncts-----------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////////////
function gridInit(){
	paper = Raphael(divId, canvasW, canvasH);
	paper.renderfix();
	disableSelection();
	makeClickSpace();
	
	//getData();
	(new Room()).select();
}

function makeClickSpace(){
	space = paper.rect(0,0,canvasW,canvasH)
		.attr({stroke:'none',fill: 'black', 'fill-opacity': 0});
	space.move = function(e){
		e.preventDefault();
		var mx = getMouse(e).x,
			my = getMouse(e).y,
			x = Math.floor(mx/g);
			y = Math.floor(my/g);
		if((x!=space.ox || y!=space.oy)
			&& !(mx>=canvasW||my>=canvasH||mx<0||my<0)){
			currentRoom.modify(x,y);
			space.ox = x;
			space.oy = y;
		}
	};
	space.down = function(e){
		e.preventDefault();
		this.ox = Math.floor(getMouse(e).x/g);
		this.oy = Math.floor(getMouse(e).y/g);
		currentRoom.modify(this.ox,this.oy);
		this.mousemove(space.move);
	};
	space.up = function(e){
		e.preventDefault();
		for(var i=0;i<3;i++)
			this.unmousemove(space.move);
	};
	
	makeGrid();
}

function makeGrid(){
	var nx = Math.floor(canvasW/g),ny = Math.floor(canvasH/g);
	for(var j=0; j<ny+1;j++){
		for(var i=0; i<nx+1;i++){
			makeRect(i*g,j*g);
			makeEdge(i*g,j*g,g,0);
			makeEdge(i*g,j*g,0,g);
		}
	}
}

function switchMode(newmode){
	if(mode == newmode) return;
	removeHandlers();
	if(mode == "doors" && newmode != "doors"){
		for(var j=0 ; j<edges.length;j++){
			if(!edges[j].hidden || edges[j].isDoor)
				edges[j].attr(edgeUnclickAttr);
		}
		toFront();
	}
	if(newmode == "draw"){
		space.mousedown(space.down);
		space.mouseup(space.up);
		space.mouseout(space.up);
		for(var j=0 ; j<edges.length;j++)
			edges[j].toFront();
		toFront();
		if(currentRoom)currentRoom.select();
	}else if(newmode == "doors"){
		for(var j=0 ; j<edges.length;j++){
			if(!edges[j].hidden || edges[j].isDoor){
				edges[j].toFront();
				edges[j].attr(edgeClickAttr);
				edges[j].click(edges[j].clicker);
			}
		}
	}else if(newmode == "select"){
		for(var j=0 ; j<rects.length;j++){
			if(!rects[j].hidden){
				rects[j].click(rects[j].clicker);
			}
		}
		for(var j=0 ; j<edges.length;j++){
			if(edges[j].hidden){
				edges[j].toBack();
			}
		}
		space.toBack();
	}else if(newmode == "watch"){
		timer2 = setTimeout("getNewLocation()",1000);
	}
	mode = newmode;
}

function removeHandlers(){
	if(space.move) space.unmousemove(space.move);
	if(space.down) space.unmousedown(space.down);
	if(space.up) space.unmouseup(space.up);
	if(space.up) space.unmouseout(space.up);
	for(var j=0 ; j<edges.length;j++){
		if(!edges[j].hidden || edges[j].isDoor){
			edges[j].unclick(edges[j].clicker);
		}
	}
	for(var j=0 ; j<rects.length;j++){
		rects[j].unclick(rects[j].clicker);
	}
	if(currentRoom)currentRoom.unselect();
}
function toBack(obj){
	var l = rects.length; 
	for(var i=0; i<l;i++){
		rects[i].toBack();
	}
	
	var l = edges.length;
	for(var i=0; i<l;i++){
		edges[i].toBack();
	}
	
	if(obj) obj.toBack();
}

function toFront(obj){
	if(obj) obj.toFront();
	space.toFront();
}

function getMouse(e){
	posx = e.pageX /*- $(document).scrollLeft() */- $('#'+divId).offset().left;
	posy = e.pageY /*- $(document).scrollTop()*/ - $('#'+divId).offset().top;
	return {x: posx, y: posy};
}

function disableSelection(target){
	$(document).attr('unselectable','on').css('MozUserSelect','none');
	document.onselectstart = function () { return false; };
}