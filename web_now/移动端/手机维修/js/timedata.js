var arrday = [];
var now = new Date();
var nowYear = now.getFullYear();
var nowMonth = now.getMonth() + 1;
var nowDate = now.getDate();

function formatMonth () {
    var arr = [];
    for (var i = 1; i <= 12; i++) {
        arr.push({
            id: i + '',
            value: i + '月',

        });
    }
    return arr;
}

function formatDate (count,pId) {
    for (var i = 1; i <= count; i++) {
        arrday.push({
            id: i + '',
            value: i + '日',
            parentId:pId
        });
    }
    return arrday;
    
}



var monthData = function () {
    formatMonth();
};


function dateData (nowYear, formatMonth) {
    var aMonth = formatMonth();
    console.log(aMonth);
    for(var i =0; i<aMonth.length;i++){
        var month = parseInt(aMonth[i].value);
        var monthId = aMonth[i].id
         if (/^(1|3|5|7|8|10|12)$/.test(month)) {
            formatDate(31,monthId)
        }
        else if (/^(4|6|9|11)$/.test(month)) {
            formatDate(30,monthId)
        }
        else if (/^2$/.test(month)) {
            if (nowYear % 4 === 0 && nowYear % 100 !==0 || nowYear % 400 === 0) {
                formatDate(29,monthId)
            }
            else {
                 formatDate(28,monthId)
            }
        }
        else {
            throw new Error('month is illegal');
        }

    }
};
 dateData(nowYear,formatMonth);
 