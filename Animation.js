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
var $count =0;
var $time = 0;
var $animation= [];

var $current = 1;

function rendercount(current){
	var canvas = document.getElementById("statistics");
   	var ctx = canvas.getContext("2d");
	ctx.clearRect(0,150,1000,50);
	ctx.fillText( "Current Move= "+current,0,200);
}

function rendersmartimage(x,y,value){
	var boxcount = 0;
	var boxnumber = x * 9 + y + 1;
	for(var i=0;i<9;i++){
		for(var j=0;j<9;j++){
			boxcount++;
			if(i==x && j==y){
				drawimage(value,i,j,0,'r');
				continue;
			}
			if(boxcount < boxnumber){
				if($global_animation[i][j] !=0)
					drawimage($global_animation[i][j],i,j,0,'');
				continue;
			}
			if($global_animation[i][j] !=0)
					drawimage(0,i,j,0,'');
		}
	}
}
function drawimage(value,x,y,box,color){
	var canvas = document.getElementById("sudoku");
   	var ctx = canvas.getContext("2d");
	var name = color + value;

	var img = document.getElementById(name);
	//alert(img);
	if(img == null){
		img = document.getElementById(0);
	}
	ctx.drawImage(img, y*60, x*60, 60,60);

}