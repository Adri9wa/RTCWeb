map = document.getElementById("map");
ctx = map.getContext("2d");
ctx.font = "20px Arial";
//Light/Dark mode
function switchMode() {
    if (document.body.style.backgroundColor == "black") {
            document.body.style.backgroundColor = "white";
    }
    else {
    document.body.style.backgroundColor = "black";
    }
    
}

//Get Random Int in range
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Generate Room Button
function generateRoom() {
    minX = 300;
    minY = 300;
    maxX = 1200;
    maxY = 1200;
    X = getRandomInt(minX, maxX);
    Y = getRandomInt(minY, maxY)
    console.log(X, Y);
    map.width = X;
    map.height = Y;
}

//Reset Room Button
function resetRoom() {
    if (confirm("Are you sure you want to reset?"))
    {
    ctx.clearRect(0, 0, map.width, map.height);
    map.width = 200;
    map.height = 200;
    }
}


function checkRectOverlap(l1, r1, l2, r2) {
    /*
     * Each array in parameter is one rectangle
     * in each array, there is an array showing the co-ordinates of two opposite corners of the rectangle
     * Example:
     * [[x1, y1], [x2, y2]], [[x3, y3], [x4, y4]]
     */
    if (l1[0] >= r2[0] || l2[0] >= r1[0])
        return false;
    
    if (l1[1] <= r2[1] || l2[1] <= r1[1])
        return false;
//    //Check whether there is an x overlap
//    if ((rect1[0][0] < rect2[0][0] && rect2[0][0] < rect1[1][0]) //Event that x3 is inbetween x1 and x2
//        || (rect1[0][0] < rect2[1][0] && rect2[1][0] < rect1[1][0]) //Event that x4 is inbetween x1 and x2
//        || (rect2[0][0] < rect1[0][0] && rect1[1][0] < rect2[1][0])) {  //Event that x1 and x2 are inbetween x3 and x4
//        //Check whether there is a y overlap using the same procedure
//        if ((rect1[0][1] < rect2[0][1] && rect2[0][1] < rect1[1][1]) //Event that y3 is between y1 and y2
//            || (rect1[0][1] < rect2[1][1] && rect2[1][1] < rect1[1][1]) //Event that y4 is between y1 and y2
//            || (rect2[0][1] < rect1[0][1] && rect1[1][1] < rect2[1][1])) { //Event that y1 and y2 are between y3 and y4
//            return true;
//        }
//    }
    return true;
}

function generateObstacles() {
    //console.clear();
    ctx.clearRect(0, 0, map.width, map.height);
    ctx.lineWidth = 2;
    roomX = map.width;
    roomY = map.height;
    amount = getRandomInt(3, 10); //Obstacles amount
    obstacles = [];
    
    //Obstacle placement
    for (i=0; i < amount; i++) {
            ctx.fillStyle = "red";

        trials = 0;
        obstX = getRandomInt(30, 80);
        obstY = getRandomInt(30, 80); //Desired obstacle width and height
        flag = false;
        //While there is overlap, generate new coords
        while (!flag) { 
            trials++;
            //flag = true;
            posX = getRandomInt(0, roomX-obstX);
            posY = getRandomInt(0, roomY-obstY); //Desired coords
            consX = posX + obstX;
            consY = posY + obstY;                  
                                    //Check every other obstacle for overlap
            if (obstacles.length>0) for (j=0; j<obstacles.length; j++)/*obst in obstacles)*/ {
                //console.log(Object.entries(obst), obstacles);
                //console.log(obstacles[j].posX, obstacles[j].posY, obstacles[j].obstX, obstacles[j].obstY);
                     
                flag = true;
                obstConsX = obstacles[j].posX + obstacles[j].obstX;
                obstConsY = obstacles[j].posY + obstacles[j].obstY;
                l1 = [posX, posY]; r1 = [consX, consY];
                l2 = [obstacles[j].posX, obstacles[j].posY]; r2 = [obstConsX, obstConsY];
                console.log(l2[0], r2[1]);
                if (checkRectOverlap(l1, r1, l2, r2)){
                    console.log(i, "Overlap");
                    flag = false;
                    break;
                    }
                //Overlap checking
//                if (consX >= obstacles[j].posX && consX <= obstConsX && consY >= obstacles[j].posY && consY <= obstConsY) {
//                    flag = false;
//                    }
                
            }
            else flag = true;
            
        }
        //if (trials > 0) {
                        obstacles.push({
                        obstX: obstX,
                        obstY: obstY,
                        posX: posX,
                        posY: posY
                        });
        ctx.strokeRect(obstacles[i].posX, obstacles[i].posY, obstacles[i].obstX, obstacles[i].obstY);

        ctx.fillRect(obstacles[i].posX, obstacles[i].posY, obstacles[i].obstX, obstacles[i].obstY);
        //} else continue;
        ctx.fillStyle = "black";
        ctx.fillText(i, obstacles[i].posX+obstacles[i].obstX/2-3, obstacles[i].posY+obstacles[i].obstY/2+3);
        
    }
    console.log(obstacles);
}

//Generate Robot and Docking Station Button
function generateRTC() {
    roomX = map.width;
    roomY = map.height;
    //--map
    
    minRTCX = 25;
    minRTCY = 25;
    maxRTCX = 70;
    maxRTCY = 70;
    rtcX = getRandomInt(minRTCX, maxRTCX);
    rtcY = getRandomInt(minRTCY, maxRTCY);
    posRTCX = getRandomInt(0, roomX-rtcX);
    posRTCY = getRandomInt(0, roomY-rtcY);
    //--robot
    
    //ctx.clearRect(0, 0, map.width, map.height);
    ctx.fillStyle = "#037403";
    ctx.fillRect(posRTCX, posRTCY, rtcX, rtcY);
    //--robot fill
    
    minDockX = 25;
    minDockY = 25;
    maxDockX = rtcX;
    maxDockY = rtcY;
    DockX = getRandomInt(minDockX, maxDockX);
    DockY = getRandomInt(minDockY, maxDockY);
    posDX = [];
    posDY = [];
    
    minDockPosX = posRTCX - DockX;
    minDockPosY = posRTCY - DockY;
    
    
    posDX[0] = getRandomInt(0, posRTCX-DockX);
    posDX[1] = getRandomInt(posRTCX+rtcX, roomX-DockX);
    console.log(posDX[0], posDX[1]);
    posDY[0] = getRandomInt(0, posRTCY-DockY);
    posDY[1] = getRandomInt(posRTCY+rtcY, roomY-DockY);
    console.log(posDY[0], posDY[1]);
    
    if (roomX-DockX < posRTCX+rtcX) posDockX = posDX[0];
    else tempX = getRandomInt(0, 1);
    
    if (roomY-DockY < posRTCY+rtcY) posDockY = posDY[0];
    else tempY = getRandomInt(0, 1);
    
    
//    if (posDX[tempX] + DockX >= posRTCX && posDX[tempX] <= posRTCX+rtcX)
    posDockX = posDX[tempX];
    posDockY = posDY[tempY];
    //--docking st
    
    console.log("Range X: [0]:", 0, posRTCX-DockX, "[1]:", posRTCX+rtcX, roomX-DockX, "Range Y: [0]:", 0, posRTCY-DockY, "[1]:", posRTCY+rtcY, roomY-DockY, "\nDOCK log: X: [0] =", posDX[0], "| [1] =", posDX[1], "Y: [0] =", posDY[0], "| [1] =", posDY[1], "\nROBOT cons: X =", rtcX, "Y =", rtcY, "| pos: X =", posRTCX, "Y =", posRTCY, "\nDOCK  cons: X =", DockX, "Y =", DockY, "| pos: X =", posDockX, "Y =", posDockY);
    ctx.fillStyle = "#00c600";
    ctx.fillRect(posDockX, posDockY, DockX, DockY);
    //--docking st fill
    
}

//Clear Canvas Button
function clearCanvas() {
    ctx.clearRect(0, 0, map.width, map.height);
}














