const colorSelector = document.getElementById("colorSelector");
let penColor = colorSelector.value;

colorSelector.addEventListener("input",function (){
    penColor = colorSelector.value;
});

function changePen(){
    document.getElementById("penTool").style.borderColor = "red";
    document.getElementById("eraserTool").style.borderColor = null;
    penColor = colorSelector.value;
}
function changeEraser(){
    document.getElementById("penTool").style.borderColor = null;
    document.getElementById("eraserTool").style.borderColor = "red";
    penColor = "white";
}

// Handles pen size input from size scroller and input box
const penSizeSelector = document.getElementById("penSizeSlider");
const penSizeInput = document.getElementById("penSize");

let penSize = penSizeSelector.value;
penSizeInput.value = penSize;

penSizeSelector.addEventListener("input",function(){
    penSize = penSizeSelector.value;
    penSizeInput.value = penSizeSelector.value;
});

penSizeInput.addEventListener("keyup",function (event){
    if(event.key === "Enter"){
        if(penSizeInput.value > 0 && penSizeInput.value <= 100){
            penSize = penSizeInput.value;
            penSizeSelector.value = penSizeInput.value;
        }else{
            penSizeInput.value = penSize;
        }
    }
})

// Main and only canvas that will actually be used in the final project
const canvas =  document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Test Canvas is to demonstrate what's happening with the image getting turned into
// string with base64 encoding and decoded into an image on a canvas
ctx.canvas.width = 1200;
ctx.canvas.height = 650;

// changes background to white
ctx.rect(0,0,canvas.width,canvas.height);
ctx.fillStyle = "white";
ctx.fill();


let mousedown = false;
let x;
let y;

// checks to see if the mouse button is being held down on the specified element (canvas)
// calls on the draw function to draw
canvas.addEventListener("mousedown", function(event){
    mousedown = true;
    x = event.offsetX;
    y = event.offsetY;
    drawLine(x, y, event.offsetX, event.offsetY, ctx, penColor, penSize);
});

// Handles drawing the line when the mouse is moved and updates
canvas.addEventListener("mousemove", function(event) {
    if (mousedown) {
        drawLine(x, y, event.offsetX, event.offsetY, ctx, penColor, penSize);
        x = event.offsetX;
        y = event.offsetY;
    }
});
// checks to see if the mouse button is NOT being pressed in the specified element (canvas)
canvas.addEventListener("mouseup", function(event) {
    mousedown = false;
});
// checks to see if the mouse is no longer on the specified element (canvas)
canvas.addEventListener("mouseleave", function(event) {
    mousedown = false;
});

// Takes in a base64 string of an image and draws it onto the canvas
function updateCanvas(encodedData){
    let image = new Image();
    image.src = encodedData;
    image.onload = function() {
        ctx.clearRect(0,0,ctx.width,ctx.height); // clears the canvas on each redraw so things dont get drawn over and over and over
        ctx.drawImage(image, 0, 0);
    };
}

// Will need to think with the brush size and stuff for a smooth line
// that can change sizes without losing smoothness
function drawLine(x1,y1,x2,y2,context,color,size){
    context.beginPath();
    context.lineCap = "round";
    context.strokeStyle = color;
    context.lineWidth = size;
    context.moveTo(x1,y1);
    context.lineTo(x2,y2);
    context.stroke();
    context.closePath();
    if(ws !== null){
        sendData();
    }
}

const servletURL = "http://localhost:8080/FinalProject-1.0-SNAPSHOT/room-servlet";
const serverURL = "ws://localhost:8080/FinalProject-1.0-SNAPSHOT/ws/";
let roomList = new Set();
let currRoom = null;
let ws = null;

const roomIDInput = document.getElementById("roomID");

function enterRoom(){
    fetchRooms();
    let roomCode = document.getElementById("roomID").value;
    if(roomCode !== "" && roomList.has(roomCode)){
        joinRoom(roomCode);
    }else{
        roomIDInput.value = null;
    }
}

function joinRoom(code){
    console.log("Entering room: " + code);
    leaveRoom();
    roomIDInput.value = code;
    currRoom = code;
    // need to make a fetch request if there room exist for the current canvas state
    ws = new WebSocket(serverURL+code);

    ws.onmessage = function(event){
        let dataIn = JSON.parse(event.data);
        updateCanvas(dataIn.encodedData); //updates canvas whenever another client draws
    }

}

function newRoom() {
    fetch(servletURL, {
        method: 'GET',
        headers: {
            'Accept': 'text/plain',
        },
    })
        .then(response => response.text())
        .then(response => joinRoom(response))// need to implement room functionality
        .catch((err) => {
            console.log("Something went wrong: " + err);
        }); // enter the room with the code
}

function leaveRoom(){
    ctx.clearRect(0,0,ctx.width,ctx.height);
    ctx.rect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "white";
    ctx.fill();
    roomIDInput.value = null;
    if(ws != null) {
        console.log("Leaving room"); // need to add notif for leaving room on client side
        ws.close();
        currRoom = null;
        ws = null;
    }
}

// Makes a request to the servlet get all the current room codes
function fetchRooms(){
    fetch(servletURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
    })
        .then(response => response.json())
        .then(response => setRoomList(response))
        .catch((err) => {
            console.log("Something went wrong: " + err);
        });
}

// updates the room list
function setRoomList(roomIDs){
    roomList.clear();
    for (let roomID of roomIDs.rooms) {
        roomList.add(roomID);
    }
}

function sendData(){
    let encodedData = canvas.toDataURL();
    let data = {"roomID":currRoom,"encodedData":encodedData};
    ws.send(JSON.stringify(data));
}



// code from https://fjolt.com/article/html-canvas-save-as-image
// Saves drawing as a png image to your computer
document.getElementById('download').addEventListener('click', function(e){
    // turns canvas into a string url with the png image type and quality of 100% (0-1)
    let url = canvas.toDataURL("image/png",1);

    // creates a temporary link to emulate downloading from a link
    const aElement = document.createElement('a');
    // inserts the url variable as the link within the link element
    aElement.href = url;
    // gives the download file a name
    aElement.download = "Drawing";

    // emulates clicking on the link and then removing the link
    aElement.click();
    // removes the link element from the html
    aElement.remove();
});

(function(){
    fetchRooms();
    setInterval(()=> fetchRooms(),500);
})();
