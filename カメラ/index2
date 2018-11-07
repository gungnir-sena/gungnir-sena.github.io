var video = document.getElementById("player"),
    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");
requestAnimationFrame(draw);
function draw() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.drawImage(video, 0, 0);
    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.putImageData(imgData, 0, 0);
    requestAnimationFrame(draw);
}
//var snapshotCanvas = document.getElementById('snapshot');
var captureButton = document.getElementById('capture');

var handleSuccess = function (stream) {
    video.srcObject = stream;
};
var num = 1;

captureButton.addEventListener('click', function () {
    var context = canvas.getContext('2d');
    context.drawImage(video, 0, 0);
    const url = canvas.toDataURL("image/png");
    Tesseract
        .recognize(url, {
            lang: 'jpn'
        })
        .progress(function (p) {
            $("#msg").text(p.status + ": " + p.progress)
        })
        .then(function (result) {
            console.log(result.symbols);
            $("#msg").text("Progress Complete")
            var elem = document.createElement('div');
            elem.innerHTML = "<div id=" + num + " style='width:300px; background-color:#EEEEEE'><img src=" + url + " /></div><br>"
            var parent = document.getElementById("results");
            parent.insertBefore(elem, parent.firstChild);
            var numdiv = document.getElementById(num);
            var msg = document.createElement('div');
            msg.innerHTML = result.text;
            numdiv.appendChild(msg);
            num += 1;
        });
});
console.log();
var front = false;
var constraints = {
    audio: false,
    video: {
        facingMode: (front ? "user" : "environment")
    }
};
navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess);