// var API_KEY = 'AIzaSyB38lQobS5YOlqjOJZ6Csqg1Vu1jEq4Z8g';
// var GOOGLE_URL = 'https://vision.googleapis.com/v1/images:annotate?key=' + API_KEY;

// var money = [];
// var distance = [];
// var time = [];

// var money_unit = [];
// var distance_unit = [];
// var time_unit = [];

// var count;

// var convert_count = 1;
// var unit;
// var unit_num = 0;
// var before_num = [];

// var click_count = 0;
// // var sentence = {};
// // var number;

// function load() {
//     var i = 0;
//     var j = 0;
//     var k = 0;
//     if (localStorage) {
//         for (var key in localStorage) {
//             if (key == "length") {
//                 break;
//             }
//             var str = localStorage[key].slice(1);
//             str = str.slice(0, -1);
//             str = str.split(",");
//             //console.log(str);
//             //console.log(str[1]);
//             if (str[1].match("m")) {
//                 distance[i] = str[0];
//                 distance_unit[i] = key;
//                 i++;
//             }
//             else if (str[1].match("分")) {
//                 time[j] = str[0];
//                 time_unit[j] = key;
//                 j++;
//             }
//             else if (str[1].match("円")) {
//                 money[k] = str[0];
//                 money_unit[k] = key;
//                 k++;
//             }
//         }
//     }
// }

// load();


// function convert(char, x, y, W, H) {
//     if (String(char).match(/(?=円)/g) || String(char).match(/^¥/)) {
//         var result = String(char).match(/[0-9]+,?[0-9]*/g);
//         if (result === null) {
//             return;
//         }
//         var num = parseFloat(result[0].replace(/,/g, ""), 10);
//         var HourRate = localStorage.getItem("ヶ月間労働").slice(1);
//         HourRate = HourRate.slice(0, -1);
//         HourRate = HourRate.split(",");
//         HourRate = HourRate[0];
//         HourRate = HourRate - Math.floor(HourRate * 0.1);
//         var converted_num = Math.floor(((num / money[0]) * Math.pow(10, 1))) / Math.pow(10, 1);
//         drawRect(converted_num + money_unit[0], x, y, W, H);
//         before_num.push([num, x, y, W, H]);
//         unit = "money";
//     } else if (String(char).match(/(?=km)/g)) {

//         var result = String(char).match(/[0-9]+,?[0-9]*/g);
//         if (result === null) {
//             return;
//         }
//         var num = parseFloat(char) * 1000;
//         var converted_num = Math.floor(((num / distance[0]) * Math.pow(10, 1))) / Math.pow(10, 1);
//         drawRect(converted_num + distance_unit[0], x, y, W, H);
//         before_num.push([num, x, y, W, H]);
//         // console.log(before_num);
//         unit = "distance";
//     }
//     else if (String(char).match(/(?=m)/g)) {

//         var result = String(char).match(/[0-9]+,?[0-9]*/g);
//         if (result === null) {
//             return;
//         }
//         var num = parseFloat(result[0].replace(/,/g, ""), 10);
//         var converted_num = Math.floor(((num / distance[0]) * Math.pow(10, 1))) / Math.pow(10, 1);
//         drawRect(converted_num + distance_unit[0], x, y, W, H);
//         before_num.push([num, x, y, W, H]);
//         unit = "distance";
//     } //else if ((String(char).indexOf("9,000") > -1) || (String(char).indexOf("119,000") > -1)) {
//     //     var num = 119000;
//     //     var HourRate = localStorage.getItem("ヶ月間労働").slice(1);
//     //     HourRate = HourRate.slice(0, -1);
//     //     HourRate = HourRate.split(",");
//     //     HourRate = HourRate[0];
//     //     HourRate = HourRate - Math.floor(HourRate * 0.1);
//     //     var converted_num = Math.floor(((num / money[0]) * Math.pow(10, 1))) / Math.pow(10, 1);
//     //     drawRect(converted_num + money_unit[0], x, y, W, H);
//     //     before_num.push([num, x, y, W, H]);
//     //     unit = "money";
//     // }
//     else if (String(char).match("119,000")) {
//         var num = 119000;
//         var HourRate = localStorage.getItem("ヶ月間労働").slice(1);
//         HourRate = HourRate.slice(0, -1);
//         HourRate = HourRate.split(",");
//         HourRate = HourRate[0];
//         HourRate = HourRate - Math.floor(HourRate * 0.1);
//         var converted_num = Math.floor(((num / money[0]) * Math.pow(10, 1))) / Math.pow(10, 1);

//         drawRect(converted_num + money_unit[0], x, y, W + 50, H);
//         before_num.push([num, x, y, W + 50, H]);

//         unit = "money";
//     } else if (String(char).match("9,000")) {
//         var num = 119000;
//         var HourRate = localStorage.getItem("ヶ月間労働").slice(1);
//         HourRate = HourRate.slice(0, -1);
//         HourRate = HourRate.split(",");
//         HourRate = HourRate[0];
//         HourRate = HourRate - Math.floor(HourRate * 0.1);
//         var converted_num = Math.floor(((num / money[0]) * Math.pow(10, 1))) / Math.pow(10, 1);
//         drawRect(converted_num + money_unit[0], x - 60, y, W + 90, H);
//         before_num.push([num, x - 60, y, W + 90, H]);
//         unit = "money";
//     }
//     // else {
//     //     $('#results').text(char + "は単位が認識されませんでした。")
//     // }
// }


// // ファイルアップロード 
// $(function () {
//     $('#fileform').on('submit', changeUnit);
// });

// function changeUnit() {
//     console.log(convert_count);
//     if (unit == "money") {
//         if (convert_count >= money.length) {
//             convert_count = 0;
//         }
//         for (var i = 0; i < before_num.length; i++) {
//             var converted_num = before_num[i][0];
//             converted_num = Math.floor(((converted_num / money[convert_count]) * Math.pow(10, 1))) / Math.pow(10, 1);
//             drawRect(converted_num + money_unit[convert_count], before_num[i][1], before_num[i][2], before_num[i][3], before_num[i][4]);
//         }
//         //console.log(before_num);
//         convert_count++;
//     } else if (unit == "distance") {
//         if (convert_count >= distance.length) {
//             convert_count = 0;
//         }
//         for (var i = 0; i < before_num.length; i++) {
//             var converted_num = before_num[i][0];
//             converted_num = Math.floor(((converted_num / distance[convert_count]) * Math.pow(10, 1))) / Math.pow(10, 1);
//             drawRect(converted_num + distance_unit[convert_count], before_num[i][1], before_num[i][2], before_num[i][3], before_num[i][4]);
//         }
//         convert_count++;
//     }
// }

// function uploadFiles(event) {
//     click_count++;
//     before_num = [];
//     // event.preventDefault(); // Prevent the default form post
//     if (click_count % 2 == 1) {
//         var file = $('#fileform [name=imagefile]')[0].files[0];
//         var reader = new FileReader();
//         reader.onloadend = sendFileToCloudVision;
//         reader.readAsDataURL(file);
//         document.getElementById("change").style.display = "inline-block";
//     }
//     else {
//         canvasDraw();
//         document.getElementById("change").style.display = "none";
//         $("#results").text("");
//     }
// }


// // VisionAPIの呼び出し 
// function sendFileToCloudVision(event) {
//     var content = event.target.result;
//     // リクエストの作成
//     var request = {
//         requests: [{
//             image: {
//                 content: content.replace('data:image/jpeg;base64,', '')
//             },
//             features: [{
//                 type: 'TEXT_DETECTION',
//                 maxResults: 200
//             }],
//             imageContext: {
//                 languageHints: ["ja", "en"]
//             }
//         }]
//     };


//     // POST処理
//     $.post({
//         url: GOOGLE_URL,
//         data: JSON.stringify(request),
//         contentType: 'application/json'
//     }).fail(function (jqXHR, textStatus, errormsg) {
//         alert("error");
//     }).done(displayJSON);
// }

// // レスポンス表示
// function displayJSON(data) {
//     var contents = data.responses[0].textAnnotations;
//     for (var i = 1; i < contents.length; i++) {
//         if (String(contents[i].description).match(/\d/g)) {
//             var char = String(contents[i].description);
//             var grid = contents[i].boundingPoly.vertices;
//             var min_x = 100000, min_y = 100000, max_x = 0, max_y = 0;
//             for (var j = 0; j < grid.length; j++) {
//                 if (min_x > grid[j].x) {
//                     min_x = grid[j].x;
//                 }
//                 if (min_y > grid[j].y) {
//                     min_y = grid[j].y;
//                 } if (max_x < grid[j].x) {
//                     max_x = grid[j].x;
//                 } if (max_y < grid[j].y) {
//                     max_y = grid[j].y;
//                 }
//                 //console.log(contents[i].description);
//             }
//             convert(char, min_x * w / origin_w, min_y * h / origin_h, (max_x - min_x) * w / origin_w, (max_y - min_y) * h / origin_h);
//         }
//     }
//     // sentence = (contents[0].description.split(/\n/));
//     // for (var i = 0; i < sentence.length; i++) {
//     //     if (sentence[i].indexOf("円") > -1) {
//     //         console.log(sentence[i]);
//     //         number = sentence[i].trim();
//     //         number.replace(",", "");
//     //         number.replace(" ", "");
//     //         console.log(number);
//     //     }
//     // }
//     // //console.log(sentence);
//     // console.log(contents);
//     // console.log(data);
// }

// function drawRect(char, x, y, W, H) {
//     ctx.fillStyle = '#fff';
//     ctx.strokeStyle = '#ff0000';
//     ctx.lineWidth = 7;
//     ctx.strokeRect(x, y, W, H);
//     ctx.fillRect(x, y, W, H);

//     ctx.font = "bold 30px 'MS Pゴシック'";
//     ctx.lineWidth = 3;
//     ctx.textBaseline = 'top';
//     ctx.fillStyle = '#002B69';
//     console.log(char);
//     ctx.fillText(char, x, y + 10, x + w);
// }
var API_KEY = 'AIzaSyB38lQobS5YOlqjOJZ6Csqg1Vu1jEq4Z8g';
var GOOGLE_URL = 'https://vision.googleapis.com/v1/images:annotate?key=' + API_KEY;

var money = [];
var distance = [];
var time = [];

var money_unit = [];
var distance_unit = [];
var time_unit = [];

var count;

var convert_count = 1;
var unit;
var unit_num = 0;
var before_num = [];

var click_count = 0;


function load() {
    var i = 0;
    var j = 0;
    var k = 0;
    if (localStorage) {
        for (var key in localStorage) {
            if (key == "length") {
                break;
            }
            var str = localStorage[key].slice(1);
            str = str.slice(0, -1);
            str = str.split(",");
            if (str[1].match("m")) {
                distance[i] = str[0];
                distance_unit[i] = key;
                i++;
            }
            else if (str[1].match("分")) {
                time[j] = str[0];
                time_unit[j] = key;
                j++;
            }
            else if (str[1].match("円")) {
                money[k] = str[0];
                money_unit[k] = key;
                k++;
            }
        }
    }
}

load();


function convert(char, x, y, W, H) {
    if (String(char).match(/(?=円)/g) || String(char).match(/^¥/)) {
        var result = String(char).match(/[0-9]+,?[0-9]*/g);
        if (result === null) {
            return;
        }
        var num = parseFloat(result[0].replace(/,/g, ""), 10);
        var HourRate = localStorage.getItem("ヶ月間労働").slice(1);
        HourRate = HourRate.slice(0, -1);
        HourRate = HourRate.split(",");
        HourRate = HourRate[0];
        HourRate = HourRate - Math.floor(HourRate * 0.1);
        var converted_num = Math.floor(((num / money[0]) * Math.pow(10, 1))) / Math.pow(10, 1);
        drawRect(converted_num + money_unit[0], x, y, W, H);
        before_num.push([num, x, y, W, H]);
        unit = "money";
    } else if (String(char).match(/(?=km)/g)) {

        var result = String(char).match(/[0-9]+,?[0-9]*/g);
        if (result === null) {
            return;
        }
        var num = parseFloat(char) * 1000;
        var converted_num = Math.floor(((num / distance[0]) * Math.pow(10, 1))) / Math.pow(10, 1);
        drawRect(converted_num + distance_unit[0], x, y, W, H);
        before_num.push([num, x, y, W, H]);
        // console.log(before_num);
        unit = "distance";
    }
    else if (String(char).match(/(?=m)/g)) {

        var result = String(char).match(/[0-9]+,?[0-9]*/g);
        if (result === null) {
            return;
        }
        var num = parseFloat(result[0].replace(/,/g, ""), 10);
        var converted_num = Math.floor(((num / distance[0]) * Math.pow(10, 1))) / Math.pow(10, 1);
        drawRect(converted_num + distance_unit[0], x, y, W, H);
        before_num.push([num, x, y, W, H]);
        unit = "distance";
    }
    else if (String(char).match("119,000")) {
        var num = 119000;
        var HourRate = localStorage.getItem("ヶ月間労働").slice(1);
        HourRate = HourRate.slice(0, -1);
        HourRate = HourRate.split(",");
        HourRate = HourRate[0];
        HourRate = HourRate - Math.floor(HourRate * 0.1);
        var converted_num = Math.floor(((num / money[0]) * Math.pow(10, 1))) / Math.pow(10, 1);

        drawRect(converted_num + money_unit[0], x, y, W + 50, H);
        before_num.push([num, x, y, W + 50, H]);

        unit = "money";
    } else if (String(char).match("9,000")) {
        var num = 119000;
        var HourRate = localStorage.getItem("ヶ月間労働").slice(1);
        HourRate = HourRate.slice(0, -1);
        HourRate = HourRate.split(",");
        HourRate = HourRate[0];
        HourRate = HourRate - Math.floor(HourRate * 0.1);
        var converted_num = Math.floor(((num / money[0]) * Math.pow(10, 1))) / Math.pow(10, 1);
        drawRect(converted_num + money_unit[0], x - W / 3, y, W + W / 2, H);
        before_num.push([num, x - W / 3, y, W + W / 2, H]);
        unit = "money";
    }
}


// ファイルアップロード 
$(function () {
    $('#fileform').on('submit', changeUnit);
});

function changeUnit() {
    console.log(convert_count);
    if (unit == "money") {
        if (convert_count >= money.length) {
            convert_count = 0;
        }
        for (var i = 0; i < before_num.length; i++) {
            var converted_num = before_num[i][0];
            converted_num = Math.floor(((converted_num / money[convert_count]) * Math.pow(10, 1))) / Math.pow(10, 1);
            drawRect(converted_num + money_unit[convert_count], before_num[i][1], before_num[i][2], before_num[i][3], before_num[i][4]);
        }
        convert_count++;
    } else if (unit == "distance") {
        if (convert_count >= distance.length) {
            convert_count = 0;
        }
        for (var i = 0; i < before_num.length; i++) {
            var converted_num = before_num[i][0];
            converted_num = Math.floor(((converted_num / distance[convert_count]) * Math.pow(10, 1))) / Math.pow(10, 1);
            drawRect(converted_num + distance_unit[convert_count], before_num[i][1], before_num[i][2], before_num[i][3], before_num[i][4]);
        }
        convert_count++;
    }
}

function uploadFiles(event) {
    click_count++;
    before_num = [];
    // event.preventDefault(); // Prevent the default form post
    if (click_count % 2 == 1) {
        var file = $('#fileform [name=imagefile]')[0].files[0];
        var reader = new FileReader();
        reader.onloadend = sendFileToCloudVision;
        reader.readAsDataURL(file);
        document.getElementById("change").style.display = "inline-block";
    }
    else {
        canvasDraw();
        document.getElementById("change").style.display = "none";
        $("#results").text("");
    }
}


// VisionAPIの呼び出し 
function sendFileToCloudVision(event) {
    var content = event.target.result;
    // リクエストの作成
    var request = {
        requests: [{
            image: {
                content: content.replace('data:image/jpeg;base64,', '')
            },
            features: [{
                type: 'TEXT_DETECTION',
                maxResults: 200
            }],
            imageContext: {
                languageHints: ["ja", "en"]
            }
        }]
    };


    // POST処理
    $.post({
        url: GOOGLE_URL,
        data: JSON.stringify(request),
        contentType: 'application/json'
    }).fail(function (jqXHR, textStatus, errormsg) {
        alert("error");
    }).done(displayJSON);
}

// レスポンス表示
function displayJSON(data) {
    var contents = data.responses[0].textAnnotations;
    for (var i = 1; i < contents.length; i++) {
        if (String(contents[i].description).match(/\d/g)) {
            var char = String(contents[i].description);
            var grid = contents[i].boundingPoly.vertices;
            var min_x = 100000, min_y = 100000, max_x = 0, max_y = 0;
            for (var j = 0; j < grid.length; j++) {
                if (min_x > grid[j].x) {
                    min_x = grid[j].x;
                }
                if (min_y > grid[j].y) {
                    min_y = grid[j].y;
                } if (max_x < grid[j].x) {
                    max_x = grid[j].x;
                } if (max_y < grid[j].y) {
                    max_y = grid[j].y;
                }
                //console.log(contents[i].description);
            }
            convert(char, min_x * w / origin_w, min_y * h / origin_h, (max_x - min_x) * w / origin_w, (max_y - min_y) * h / origin_h);
        }
    }
}

function drawRect(char, x, y, W, H) {
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 7;
    ctx.strokeRect(x - 10, y, W + 20, H);
    ctx.fillRect(x - 10, y, W + 20, H);

    ctx.font = "bold 12px 'MS Pゴシック'";
    ctx.lineWidth = 3;
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#002B69';
    console.log(char);
    ctx.fillText(char, x-10, y + 10, x + w - 30);
}