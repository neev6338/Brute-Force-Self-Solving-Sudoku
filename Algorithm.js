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
function bruteForce(board){
    var x_cord=0;
    var y_cord=0;
    var arr= [];
    var possibleEntries;
    // Base case
    if(isBoardFull(board)){
        $global_sudoku = board;
        return;
    }else{
        arr = nextEmptySpace(board);
        x_cord = arr[0];
        y_cord = arr[1];
        possibleEntries = getAllPossibleEntries(board,x_cord,y_cord);
        var ans = 0;
        for(var i=0;i<9;i++){
            if(possibleEntries[i] != 0){
              board[x_cord][y_cord] = possibleEntries[i];
				      var temp = [x_cord,y_cord,possibleEntries[i]];
	            $animation.push(temp);
		          $count++;
              bruteForce(board);
              if(isBoardFull(board))
                  break;
            }
        }
        if(isBoardFull(board))
                    return;
         board[x_cord][y_cord] = 0;
        }
}

function nextEmptySpace(board){
  var arr = [];
  for(var i=0;i<9;i++){
      for(var j=0;j<9;j++){
          if(board[i][j] == 0){
              arr[0] = i;
              arr[1] = j;
              return arr;
            }
        }
  }
}

function CheckPre(){
	for(var i=0;i<9;i++){
		for(var j=0;j<9;j++){
			if($global_sudoku[i][j] != 0){
				if(corrupted(i,j,$global_sudoku[i][j])){
					return false;
				}
			}
		}
	}
	return true;
}
//check is board is full- for breaking condiiton of the sudoku
// <--- board
// ----> true or flase
function isBoardFull(board){
    for(var i=0;i<9;i++)
        for(var j=0;j<9;j++)
            if(board[i][j] == 0)
                return false;
    return true;
}
//return an array with all possible entries for a the position
// <--- board + x and y cordiante
// ----> all possible values
function getAllPossibleEntries(board,x,y){
    var values = [0,0,0,0,0,0,0,0,0];
    var possibleEntries ;
    for(var i=0;i<9;i++)
        if(board[i][y] != 0){
			values[board[i][y] - 1] = 1;
		}
    for(var i=0;i<9;i++)
        if(board[x][i] != 0){
			values[board[x][i] - 1] = 1;
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
        for(var j=q;j<q+3;j++)
            if(board[i][j] != 0)
                values[board[i][j] - 1] = 1;

    for(var i=0;i<9;i++)
        if(values[i] == 0)
            values[i] = i + 1;
        else
            values[i] = 0;
    return values;
}

function startbruteforce(){
	disableall();
	disableinput();

	if(CheckPre()){
		document.getElementById("input").hidden = true;
		document.getElementById("info").hidden = true;
		document.getElementById("stats").hidden = false;
		var start = new Date();
		bruteForce($global_sudoku);
		var end = new Date();
		$time = end - start;
		startStats();
		if($count > 50000){
			alert("The rendering animation may take time. For a faster result plesae check the console :)");
			console.log("Thanks for visiting the console. Please find the answer below");
			console.log($global_sudoku);
		}else
			myFunction("May the force be with you", 3000);
		animate();
	}else{
		myFunction("Please check!!", 3000);
	}
}

function CanPut(x){
	var value = x.value;
	var str = x.id;
	var id = str.replace("input_", "");
	var y = getY(id);
	var x = getX(id,y);
	var possibleEntries = getAllPossibleEntries(board,x,y);
	var answer = false;
	for(var i=0;i<9;i++){
		if(value == possibleEntries[i]){
			answer = true;
			break;
		}
	}
	return answer;
}

function validate(x){
	var allowed = [1,2,3,4,5,6,7,8,9,''];
	for(var i=0;i<10;i++)
		if(allowed[i]==x.value){
			return true;
		}
	x.value = '';
	toast("Sorry! "+ x.value +" Not allowed");
	return false;
}


function globalchange(id,value){
	var y = getY(id)
	var x = getX(id,y);
	if(value == "")
		value=0;
	$global_sudoku[x][y] = value;
	drawimage(value,x,y,0,'d');

}

function toast(message){
	alert(message);
}
function getY(box){
	return (box - 1) % 9;
}
function getX(box,y){
	return (box - 1- y)/9;
}
function disableinput(){
	for(var i=1;i<82;i++)
		document.getElementById("input_" + i).disabled =true;
}

function myFunction(message , time) {
    var x = document.getElementById("snackbar");
	document.getElementById("toast").innerHTML = message;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, time );
}

