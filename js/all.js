var height = document.getElementById('heightId');
var weight = document.getElementById('weightId');
var countBtnId = document.getElementById('countBtnId');
var bmiList = document.querySelector('.bmiList');
var countBox = document.querySelector('.count');
var data = JSON.parse(localStorage.getItem('BMI')) || [];


init();
bmiList.addEventListener('click', delData);
countBtnId.addEventListener('click', getBMI);


function init() {
    showList();


}

/*判斷輸入格式*/
function getBMI(e) {
    e.preventDefault();
    if (!(isHeight(height.value) && isweight(weight.value))) {
        alert('格式輸入錯誤!!!');
        return
    };

    var count = weight.value / Math.pow((height.value / 100), 2);
    count = count.toFixed(1);

    getData(count)
    showList();
    viewResult(count);
    
    countBtnId.setAttribute('disabled','disabled');
}
/*紀錄&取得資料*/
function getData(bmi) {
    bmi = parseFloat(bmi);
    var text = getState(bmi);
    var date = new Date();

    var obj = {
        state: text,
        BMI: bmi,
        weight: weight.value,
        height: height.value,
        date: {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            days: date.getDate(),
        }
    }
    data.push(obj);
    localStorage.setItem('BMI', JSON.stringify(data));
}


function getState(bmi) {
    let result = '';
    if (bmi <= 18.4)
        result = '過輕';
    else if (bmi >= 18.5 && bmi <= 24.9)
        result = '理想';
    else if (bmi >= 25 && bmi <= 29.9)
        result = '過重';
    else if (bmi >= 30 && bmi <= 34.9)
        result = '輕度肥胖';
    else if (bmi >= 35 && bmi <= 39.9)
        result = '中度肥胖';
    else
        result = '重度肥胖';

    return result;
}

/*列出紀錄*/
function showList() {
    var str = '';
    var bmiReport = JSON.parse(localStorage.getItem('BMI')) || [];
    for (var i = 0; i < bmiReport.length; i++) {
        str += `<li>
            <div class="colorBox" style="background-color:${colorSelect(bmiReport[i].state)};border-top-left-radius:10px;border-bottom-left-radius:10px;"></div>
            <ul class="record"> 
            <li><h3>${bmiReport[i].state}</h3></li> 
            <li><span class="smallSize">BMI</span>${bmiReport[i].BMI}kg</li> 
            <li><span class="smallSize">weight</span>${bmiReport[i].weight}kg</li> 
            <li><span class="smallSize">height</span>${bmiReport[i].height}cm</li>
            <li><span class="smallSize">${bmiReport[i].date.month}/${bmiReport[i].date.days}/${bmiReport[i].date.year}</span></li>
            <li><button type="button" class="delBtn" data-num>刪除</button></li>
            </ul></li>`;
    }
    bmiList.innerHTML = str;

}

function delData(e) {
    e.preventDefault();
    if (e.target.nodeName != 'BUTTON') { return }
    var index = e.target.dataset.index;
    data.splice(index, 1);
    localStorage.setItem('BMI', JSON.stringify(data));
    showList();
}

/*判斷BMI顏色*/
function colorSelect(item) {
    switch (item) {
        case '過輕':
            return '#31BAF9';
            break;
        case '理想':
            return '#86D73F'
            break;
        case '過重':
            return '#FF982D';
            break;
        case '輕度肥胖':
            return '#FF6C03';
            break;
        case '中度肥胖':
            return '#FF6C03';
            break;
        default:
            return '#FF1200';
            break;
    }
}
/*countBtn*/
function viewResult(value) {
    
    countBtnId.value = value;
    var color = getState(value);
    countBtnId.style.backgroundColor = '#424242';
    countBtnId.style.color = colorSelect(color) ;
    countBtnId.style.border = `5px solid ${colorSelect(color)}`;
    var retry =document.querySelector('.retry');
    retry.style.backgroundColor = colorSelect(color) ;
    retry.style.display = 'block';

    var bmiTag =document.querySelector('.bmiTag');
    bmiTag.style.display = 'block';
    bmiTag.style.color = colorSelect(color) ;

    var stateTag =document.querySelector('.stateTag');
    stateTag.style.display = 'block';
    stateTag.textContent = getState(value);
    stateTag.style.color = colorSelect(color) ;
}


var reTry =document.querySelector('.retry');


reTry.addEventListener('click', function(){
    window.location.reload();
    
})

/*正則表示*/
function isHeight(num) {
    var ruls = /^[0-2]\d{1,2}$/;
    return ruls.test(num);
}

function isweight(num) {
    var ruls = /^[0-9]\d{1,2}$/;
    return ruls.test(num);
}
