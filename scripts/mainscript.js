function switchMode() {
    if (document.body.style.backgroundColor == "black") {
            document.body.style.backgroundColor = "white";
    }
    else {
    document.body.style.backgroundColor = "black";
    }
    
}

function generateRoom() {
    minX = 150;
    minY = 150;
    maxX = 700;
    maxY = 700;
    X = getRandomInt(minX, maxX);
    Y = getRandomInt(minY, maxY)
    console.log(X, Y);
    map = document.getElementById("map");
    map.style.padding = X +"px "+Y+"px"
    console.log(map);
    
    
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function resetRoom() {
    if (confirm("Are you sure you want to reset?")) {
    map = document.getElementById("map");
    map.style.padding = "150px 150px"
    }
    
}