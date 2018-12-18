 var ctx;
var canvas;
var size = 5;

var x = 0;
var y = 0;
var gridSize = 150;
var grid = createArray(gridSize, gridSize);



function run(){
    drawGrid(grid);
    var tempGrid = createArray(gridSize, gridSize);
    for(var x = 1; x < gridSize-1; x++){
        for(var y = 1; y < gridSize-1; y++){
            tempGrid[x][y] = shouldBeAlive(grid[x][y], getNumberOfAliveNeighbours(x,y,grid));
        }
    }
    grid = tempGrid;
    
}


function shouldBeAlive(currentState, numberOfAliveNeighbours){
    return (numberOfAliveNeighbours === 2 || numberOfAliveNeighbours === 3) && !(!currentState && numberOfAliveNeighbours <3);
}

function drawGrid(grid){
    for(var x = 3; x < gridSize-3; x++){
        for(var y = 3; y < gridSize-3; y++){
            drawCell(grid[x][y],x,y);   
        }
    }
}


//Setting up the canvas and kicking off our run method
function init(){
    canvas = document.getElementById('app');
	ctx = canvas.getContext('2d');
    resizeCanvas();

    for(var x = 1 + 50; x < gridSize-1-50; x++){
        for(var y = 1 + 50; y < gridSize-1-50; y++){
            if(Math.random() < 0.1){
                grid[x][y] = true;
            }
        }
    }
    
    setInterval(run, 100);
}

function createArray(x) {
    var arr = new Array(x);

    for (var i = 0; i < x; i++) {
        arr[i] = new Array(x);
        for(var j = 0; j < x; j++){
            arr[i][j] = false;
        }
    }
    return arr;
}

function getNumberOfAliveNeighbours(x, y, grid){
    var subGrid = getSubGrid(x, y, grid);
    var count = 0;
    for(var x = 0; x < 3; x++){
        for(var y = 0; y < 3; y++){
            if(!(x == 1 && y == 1)){
                if(subGrid[x][y]){
                    count++;
                }
            }
        }
    }
    return count;
}

function getSubGrid(x, y, grid){
    var subGrid = createArray(3,3);
    for(var i = -1; i < 2; i++){
        for(var j = -1; j < 2; j++){
            subGrid[i+1][j+1] = grid[x+i][y+j];
        }
    }
    return subGrid;
}


/*===================================*/
/*             Utilities             */
/*===================================*/

function drawCell(isAlive,x,y){
    if(isAlive){
        ctx.fillStyle = '#000000';
    } else {
        ctx.fillStyle = '#FFFFFF';
    }
    
    ctx.fillRect(x*size,y*size,size,size);    
}

function resizeCanvas(e) {
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
}
