var can;
var ct;
var ox = 0, oy = 0, x = 0, y = 0;
var mf = false;
function mam_draw_init() {
    can = document.getElementById("can");
    can.addEventListener("touchstart", onDown, false);
    can.addEventListener("touchmove", onMove, false);
    can.addEventListener("touchend", onUp, false);
    can.addEventListener("mousedown", onMouseDown, false);
    can.addEventListener("mousemove", onMouseMove, false);
    can.addEventListener("mouseup", onMouseUp, false);
    ct = can.getContext("2d");
    ct.strokeStyle = "#000000";
    ct.lineWidth = 20;
    ct.lineJoin = "round";
    ct.lineCap = "round";
    clearCan();
}
function onDown(event) {
    mf = true;
    ox = event.touches[0].pageX - event.target.getBoundingClientRect().left;
    oy = event.touches[0].pageY - event.target.getBoundingClientRect().top;
    event.stopPropagation();
}
function onMove(event) {
    if (mf) {
        x = event.touches[0].pageX - event.target.getBoundingClientRect().left;
        y = event.touches[0].pageY - event.target.getBoundingClientRect().top;
        drawLine();
        ox = x;
        oy = y;
        event.preventDefault();
        event.stopPropagation();
    }
}
function onUp(event) {
    mf = false;
    event.stopPropagation();
}
function onMouseDown(event) {
    ox = event.clientX - event.target.getBoundingClientRect().left;
    oy = event.clientY - event.target.getBoundingClientRect().top;
    mf = true;
}
function onMouseMove(event) {
    if (mf) {
        x = event.clientX - event.target.getBoundingClientRect().left;
        y = event.clientY - event.target.getBoundingClientRect().top;
        drawLine();
        ox = x;
        oy = y;
    }
}
function onMouseUp(event) {
    mf = false;
}
function drawLine() {
    ct.beginPath();
    ct.moveTo(ox, oy);
    ct.lineTo(x, y);
    ct.stroke();
}
function clearCan() {
    ct.fillStyle = "rgb(255,255,255)";
    ct.fillRect(0, 0, can.getBoundingClientRect().width, can.getBoundingClientRect().height);
}

function check(){
    var strName;
    strName = document.getElementById("test").textContent;
    strName = strName.replace("/[\n\r]/g", "<br>");
    test.innerHTML = strName;
    document.body.onload=check;
}

function saveImg() {
    var img = document.getElementById("can").toDataURL('image/png');
    img = img.replace('image/png', 'image/octet-stream');
    document.getElementById("img").value = img;
}

function sendImage() {
    var img = document.getElementById("can").toDataURL('image/png');
    img = img.replace('image/png', 'image/octet-stream');
    $.ajax({
        type: "POST",
        url: "localhost:5555/",
        data: {
            "img": img
        },
        success: function(j_data){

            console.log('hoge')

        }
    });
}
