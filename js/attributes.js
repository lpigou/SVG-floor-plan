//author: Lionel Pigou

/////////////////////////////////////////////////////////////////////////////////////////	
//-----------------------------Attributes------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////////////

//rect	
rectAttr = {
	stroke:'none'
},
rectHideAttr = {
	fill:'white', 
	'fill-opacity': 1
},
rectShowAttr = {
	fill:'gray', 
	'fill-opacity': 0.4
},
rectSelectAttr =rectShowAttr,
rectUnselectAttr = {
	fill:'gray',
	'fill-opacity':0.1
},

//edge attributes
edgeAttr = {
	stroke: 'black',
	'stroke-width': 2,
	'stroke-linecap':'round',
	'stroke-linejoin':'round'
},
edgeHideAttr = {
	'stroke-opacity': 0
},
edgeShowAttr = {
	'stroke-opacity': 1
},
edgeDoorAttr = {
	'stroke-opacity': 0.2
},
edgeUndoorAttr = {
	'stroke-opacity': 1
},
edgeClickAttr = {
	'stroke-width': 6
},
edgeUnclickAttr = {
	'stroke-width': 2
},

//background
bgAttr = {
	fill:'white', 
	'fill-opacity': 0
};