var $global_sudoku = [
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],

	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],

	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0]
];
var empty = [
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],

	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],

	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0]
];



var $global_animation = [
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],

	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],

	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0]
];

var ran = [
  [2,1,0,0,8,5,3,0,0],
  [8,0,4,3,2,9,0,0,0],
	[3,0,0,6,0,0,0,8,2],

	[0,0,0,0,0,0,2,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,9,0,0,0,0,0,0],

	[4,5,0,0,0,3,0,0,1],
	[0,0,0,2,9,8,5,0,3],
	[0,0,3,5,1,0,0,6,8]
];

var random3 = [
  [3,0,5,8,0,0,0,0,0],
  [9,0,0,0,0,0,0,0,0],
	[0,0,1,5,0,0,0,0,0],

	[0,0,0,0,0,7,0,1,0],
	[0,0,0,0,8,0,0,0,0],
	[0,5,0,1,0,0,0,0,0],

	[0,0,0,0,0,1,8,0,0],
	[0,0,0,0,0,0,0,0,9],
	[0,0,0,0,0,4,1,0,6]
];


var random1 = [
  [0,9,0, 5,2,0, 0,7,0],
  [0,0,7, 0,9,8, 0,1,0],
	[6,0,0, 1,0,0, 9,0,0],

	[7,0,0, 0,0,0, 3,0,0],
	[0,8,0, 0,3,0, 0,4,0],
	[0,0,1, 0,0,0, 0,0,7],

	[0,0,5, 0,0,1, 0,0,4],
	[0,0,0, 9,8,0, 7,0,0],
	[0,3,0, 0,5,4, 0,2,0]
];

var random2 = [
  [0,0,6,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,4,0],
	[0,8,0,0,9,0,0,3,0],

	[0,0,0,4,0,0,1,9,0],
	[0,0,0,0,8,0,0,0,0],
	[0,4,9,0,0,5,0,0,0],

	[0,7,0,0,3,0,0,5,0],
	[0,1,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,6,0,0]
];

var $count =0;
var $time = 0;
var $animation= [];

function loadSudoku(){
	disableinput();
	drawcanvas();
	$global_sudoku = empty;
	switch (Math.floor((Math.random() * 2) + 1)) {
    case 1:
       $global_sudoku = random1;
        break;
    case 2:
       $global_sudoku = random2;
       break;
	}
	for(var i=0;i<9;i++){
		for(var j=0;j<9;j++){
			if($global_sudoku[i][j] != 0){
				putfix($global_sudoku[i][j],i,j,0,"d");
			}
		}
	}
}

function drawcanvas(){
	var canvas = document.getElementById("sudoku");
	var ctx = canvas.getContext("2d");
	var img = document.getElementById(0);
	for(var a=0;a<9;a++){
		for(var b=0;b<9;b++){
			ctx.drawImage(img, a*60, b*60, 60,60);
		}
	}
}

// load the image
function loadimage(){
	drawcanvas();
}

function putfix(value,x,y,box,color){
	var canvas = document.getElementById("sudoku");
  var ctx = canvas.getContext("2d");
	var name = color + value;
	if(box != 0){
		y= getY(box);
		x= getX(box,y);
		ctx.drawImage(img, y*60, x*60, 60,60);
		return;
	}
	var img = document.getElementById(name);
	if(value != 0)
		ctx.drawImage(img, y*60, x*60, 60,60);
}

function syncBoard(x){
	var id= x.id;
	id = id.replace("input_" , "");
	globalchange(id,x.value);

}
function corrupted(x,y,val){
	board = $global_sudoku;
	value = parseInt(val);
    for(var i=0;i<9;i++){
		if(i == x)
			continue;
		if(board[i][y] == value){
			badBlock(i,y,value);
		}
	}
    for(var i=0;i<9;i++){
		if(i == y)
			continue;
		if(board[x][i] == value){
			badBlock(x,i,value);
		}
	}
    var p=0;
    var q=0;
    if(x >= 0 && x <= 2)
        p=0;
    else if(x >= 3 && x <= 5)
        p=3;
    else
        p=6;

    if(y >= 0 && y <= 2)
        q=0;
    else if(y >= 3 && y <= 5)
        q=3;
    else
        q=6;
    for(var i=p;i<p+3;i++)
        for(var j=q;j<q+3;j++){
			if(i!=x && j!=y){
				if(board[i][j] == value)
                	badBlock(i,j,value);
			}
		}
}
function startStats(){
	var canvas = document.getElementById("statistics");
	var ctx = canvas.getContext("2d");
	ctx.font="20px Verdana";
	ctx.fillText("Total Moves= "+$count,0,100);
	if(getlength($time) <= 9 ){
		ctx.fillText("Total Time= 0.00"+ $time +" s",0,300);
	}else if(getlength($time) <= 99 ){
		ctx.fillText("Total Time= 0.0"+ $time +" s",0,300);
	}else if(getlength($time) <= 999 ){
		ctx.fillText("Total Time= 0."+ $time +" s",0,300);
	}else if(getlength($time) <= 9999 ){
		ctx.fillText("Total Time= "+ $time +" ms",0,300);
	}
}
function badBlock(x,y,value){
	drawimage(value,x,y,0,"r");
}

function getinput(){
	var newval = document.getElementById("input").innerHTML ;
	var count = 0;
	for(var i=1;i<82;i++){
		newval += "<input id='input_"+ i +"' type='text' size='1' onkeyup='validate(this);'  onchange='syncBoard(this);CheckPre();' >";
		if(i %3 == 0){
			newval += "<img src='img/space.png'  height='10' width='5'>";
		}
		if(i %9 == 0){
			newval += "<br>";
			count++;
		}
		if(count ==3){
			newval += "<br>";
			count=0;
		}
	}
	document.getElementById("input").innerHTML = newval;
}

function syncBoard(x){
	var id= x.id;
	id = id.replace("input_" , "");
	globalchange(id,x.value);
}

function getlength(number) {
    return number.toString().length;
}