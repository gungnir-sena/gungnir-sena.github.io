var file = document.getElementById('InputFile');
var canvas = document.getElementById('canvas');
var w = $('.canvas_wrap').width();
var h = $('.canvas_wrap').height();
$('#canvas').attr('width', w);
$('#canvas').attr('height', h);
var canvasWidth = w;
var canvasHeight = h;
var uploadImgSrc;
var origin_w, origin_h;


// // Canvasの準備
var ctx = canvas.getContext('2d');

function loadLocalImage(e) {
    // ファイル情報を取得
    var fileData = e.target.files[0];

    // 画像ファイル以外は処理を止める
    if (!fileData.type.match('image.*')) {
        alert('画像を選択してください');
        return;
    }

    // FileReaderオブジェクトを使ってファイル読み込み
    var reader = new FileReader();
    // ファイル読み込みに成功したときの処理
    reader.onload = function () {
        // Canvas上に表示する
        uploadImgSrc = reader.result;
        canvasDraw();
    }
    // ファイル読み込みを実行
    reader.readAsDataURL(fileData);
}

// ファイルが指定された時にloadLocalImage()を実行
file.addEventListener('change', loadLocalImage, false);

// Canvas上に画像を表示する
function canvasDraw() {
    // canvas内の要素をクリアする
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Canvas上に画像を表示
    var img = new Image();
    img.src = uploadImgSrc;
    img.onload = function () {
        canvas.width = this.width * (canvasHeight / this.height);
        w = canvas.width;
        ctx.drawImage(img, 0, 0, this.width * (canvasHeight / this.height), canvasHeight);
        origin_h = this.height;
        origin_w = this.width;
    }
}