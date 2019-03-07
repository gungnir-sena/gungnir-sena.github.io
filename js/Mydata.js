var storage = null;
//var storageArray = new Array();
var count = 0;
// var total_distance, total_money, total_time;
window.onload = function () {
    try {
        // total_money = localStorage.getItem("total_money");
        // total_distance = localStorage.getItem("total_distance");
        // total_time = localStorage.getItem("total_time");
        // localStorage.removeItem("total_money");
        // localStorage.removeItem("total_distance");
        // localStorage.removeItem("total_time");
        storage = JSON.parse(localStorage || '{}');
    } catch (e) {
        storage = {};
    }
    show();
    // localStorage.setItem("total_money", total_money);
    // localStorage.setItem("total_distance", total_distance);
    // localStorage.setItem("total_time", total_time);
}

window.onbeforeunload = function () {
    localStorage = JSON.stringify(storage);
}

function hozon() {
    var weight = document.getElementById("weight").value;
    var height = document.getElementById("height").value;
    var fee = document.getElementById("fee").value;
    var kyuuyo = document.getElementById("kyuuyoseido").value;
    if (kyuuyo == "時給") {
        var fee_h = document.getElementById("fee").value;
        var fee_d = fee_h * 8;
        var fee_w = fee_d * 5;
        var fee_m = fee_w * 4;
    } else if (kyuuyo == "日給") {
        var fee_d = document.getElementById("fee").value;
        var fee_h = fee_d / 8;
        var fee_w = fee_d * 5;
        var fee_m = fee_w * 4;
    }
    else if (kyuuyo == "週給") {
        var fee_w = document.getElementById("fee").value;
        var fee_d = fee_w / 5;
        var fee_h = fee_d / 8;
        var fee_m = fee_w * 4;
    }
    else if (kyuuyo == "月給") {
        var fee_m = document.getElementById("fee").value;
        var fee_w = fee_m / 4;
        var fee_d = fee_w / 5;
        var fee_h = fee_d / 8;
    }

    var hohaba = height * 0.45 / 100;
    var kcal = Math.floor(((1 / weight) * Math.pow(10, 2))) / Math.pow(10, 2);
    var walk_min = 80;
    var bike_min = 200;
    var car_min = 400;

    if (fee != 0) {
        localStorage.setItem("時間労働", JSON.stringify(fee_h + "," + "円"));
        localStorage.setItem("日間労働", JSON.stringify(fee_d + "," + "円"));
        localStorage.setItem("週間労働", JSON.stringify(fee_w + "," + "円"));
        localStorage.setItem("ヶ月間労働", JSON.stringify(fee_m + "," + "円"));
    }
    if (hohaba != 0) {
        localStorage.setItem("歩", JSON.stringify(hohaba + "," + "m"));
    }
    if (kcal != Infinity) {
        localStorage.setItem("cal", JSON.stringify(kcal + "," + "m"));
    }
    if (walk_min != 0) {
        localStorage.setItem("分(徒歩)", JSON.stringify(walk_min + "," + "m"));
    }
    if (bike_min != 0) {
        localStorage.setItem("分(チャリ)", JSON.stringify(bike_min + "," + "m"));
    }
    if (car_min != 0) {
        localStorage.setItem("分(車)", JSON.stringify(car_min + "," + "m"));
    }
    console.log(localStorage);
    count++;
    window.location.reload();
}
function save() {
    var key = document.getElementById('key').value;
    var value = document.getElementById('value').value;
    var unit = document.getElementById('unit').value;
    var values = value + "," + unit;
    //var values = key + "," + value + "," + unit;
    values = JSON.stringify(values);
    if (key && value) {
        //storage[key] = values;
        localStorage.setItem(key, values);
        //storageArray[count] = values;
        count++;
    }
    window.location.reload();
}

function del() {
    var key = document.getElementById('key').value;
    if (key) {
        localStorage.removeItem(key);
    }
    window.location.reload();
}

function show() {
    var listElement = document.getElementById('list');
    var a = SortLocalStorage();
    for (i = 0; i < a.length; i++) {
        var str = a[i].slice(0);
        str = str.split(",");
        var trElement = document.createElement('tr');
        var keyElement = document.createElement('td');
        keyElement.textContent = str[0];
        var valueElement = document.createElement('td');
        valueElement.textContent = str[1];
        var unitElement = document.createElement('td');
        unitElement.textContent = str[2];
        if (str[2] == "円") {
            trElement.setAttribute('class', 'unit');
        }

        listElement.appendChild(trElement);
        trElement.appendChild(keyElement);
        trElement.appendChild(valueElement);
        trElement.appendChild(unitElement);
    }
}

function SortLocalStorage() {
    if (localStorage.length > 0) {
        var localStorageArray = new Array();
        for (i = 0; i < localStorage.length; i++) {
            // if (key == "total_money" || key == "total_distance" || key == "total_time") {
            //     console.log("a");
            //     break;
            // }
            var str = localStorage.getItem(localStorage.key(i)).slice(1);
            str = str.slice(0, -1);
            str = str.split(",");
            localStorageArray[i] = localStorage.key(i) + "," + str[0] + "," + str[1];
        }
    }
    var sortedArray = localStorageArray.sort(compareNumbers);
    sortedArray = sortedArray.sort(compareUnits);
    return sortedArray;
}

function compareNumbers(a, b) {
    a = a.slice(0);
    a = a.split(",");
    b = b.slice(0);
    b = b.split(",");
    return a[1] - b[1];
}

function compareUnits(a, b) {
    a = a.slice(0);
    a = a.split(",");
    b = b.slice(0);
    b = b.split(",");
    let comparison = 0;
    if (a[2] > b[2]) {
        comparison = 1;
    } else if (a[2] < b[2]) {
        comparison = -1;
    }
    return comparison;
}
function reset() {
    localStorage.clear();
    window.location.reload();
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("save").addEventListener("click", save);
    document.getElementById("delete").addEventListener("click", del);
    document.getElementById("hozon").addEventListener("click", hozon);
    document.getElementById("reset").addEventListener("click", reset);
});

