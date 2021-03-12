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
    minX = 150;
    minY = 150;
    maxX = 900;
    maxY = 900;
    X = getRandomInt(minX, maxX);
    Y = getRandomInt(minY, maxY)
    console.log(X, Y);
    map = document.getElementById("map");
    map.width = X;
    map.height = Y;
}

//Reset Room Button
function resetRoom() {
    if (confirm("Are you sure you want to reset?"))
    {
    map = document.getElementById("map");
    ctx = map.getContext("2d");
    ctx.clearRect(0, 0, map.width, map.height);
    map.width = 200;
    map.height = 200;
    }
}

//Generate Robot and Docking Station Button
function generateRTC() {
    map = document.getElementById("map");
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
    
    ctx = map.getContext("2d");
    ctx.clearRect(0, 0, map.width, map.height);
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














