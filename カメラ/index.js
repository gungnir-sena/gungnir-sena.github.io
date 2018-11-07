const medias = {
    audio: false, video: {
        facingMode: {
            exact: "environment"
        }
    }
},
    video = document.getElementById("video"),
    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

navigator.getUserMedia(medias, successCallback, errorCallback);

requestAnimationFrame(draw);

function successCallback(stream) {
    video.srcObject = stream;
};

function errorCallback(err) {
    alert(err);
};

function draw() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.drawImage(video, 0, 0);

    requestAnimationFrame(draw);
}

function take_picture() {
    alert("press button10");

    context.drawImage(video, 0, 0);
    const url = canvas.toDataURL("image/png");
    Tesseract
        .recognize(url, {
            lang: 'jpn'
        })
        .progress(function (p) {
            alert(p.status + ": " + p.progress)
        })
        .then(function (result) {
            console.log(result.symbols);
            alert("Progress Complete")
            // var elem = document.createElement('div');
            // elem.innerHTML = "<div id=" + num + " style='width:300px; background-color:#EEEEEE'><img src=" + url + " /></div><br>"
            // var parent = document.getElementById("results");
            // parent.insertBefore(elem, parent.firstChild);
            // var numdiv = document.getElementById(num);
            // var msg = document.createElement('div');
            alert(result.text);
        });
};