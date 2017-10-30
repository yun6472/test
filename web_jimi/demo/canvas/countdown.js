var WINDOW_WIDHT = 1024;
var WINDOW_HEIGHT = 768;

var RADIUS= 6 ;
var MARGIN_TOP = 60;
var MARGIN_BOTTOM = 30;

var hours = 0;
var minutes = 0;
var seconds = 0;

var endTime  = new Date(2017, 8,28,15,10,12);

var curShowTimeSeconds = 0;

var balls = [];
var colors = ["33b5e5"];

window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    canvas.width  = WINDOW_WIDHT ;
    canvas.height = WINDOW_HEIGHT ;
    curShowTimeSeconds = getCurrentShowTimeSeconds();

    setInterval(function () {


        render (context);
        update();


    },50);
};



function update(){
    var nexShowTimeSeconds = getCurrentShowTimeSeconds();

    var nextHours = parseInt(nexShowTimeSeconds / 3600);
    var nextMinutes = parseInt((nexShowTimeSeconds - nextHours*3600) /60);
    var nextSeconds = parseInt(nexShowTimeSeconds % 60);

    hours = parseInt(curShowTimeSeconds / 3600);
    minutes = parseInt((curShowTimeSeconds - hours*3600) /60);
    seconds = parseInt(curShowTimeSeconds % 60);

    if( nextSeconds != seconds){//时间发生改变
        curShowTimeSeconds  = nexShowTimeSeconds ;
        


    }



}


function render(cxt) {

    cxt.clearRect(0 , 0,WINDOW_WIDHT ,WINDOW_HEIGHT);//清除画布
    renderDigit(MARGIN_BOTTOM ,MARGIN_TOP ,parseInt(hours/10) , cxt);
    renderDigit(MARGIN_BOTTOM + 15*(RADIUS +1) ,MARGIN_TOP ,parseInt(hours % 10) , cxt);//15是 14+1
    renderDigit(MARGIN_BOTTOM + 30*(RADIUS +1) ,MARGIN_TOP ,10 , cxt);//冒号
    renderDigit(MARGIN_BOTTOM + 39*(RADIUS +1) ,MARGIN_TOP ,parseInt(minutes/10) , cxt);
    renderDigit(MARGIN_BOTTOM + 54*(RADIUS +1) ,MARGIN_TOP ,parseInt(minutes % 10) , cxt);
    renderDigit(MARGIN_BOTTOM + 69*(RADIUS +1) ,MARGIN_TOP ,10 , cxt);//冒号
    renderDigit(MARGIN_BOTTOM + 78*(RADIUS +1) ,MARGIN_TOP ,parseInt(seconds/10) , cxt);
    renderDigit(MARGIN_BOTTOM + 93*(RADIUS +1) ,MARGIN_TOP ,parseInt(seconds % 10) , cxt);
}
//x+j*2(R+1) +(R+1)
//y +j*2(R+1) +(R+1)
function renderDigit(x,y,num,cxt) {
    cxt.fillStyle ="rgb(0,102, 153)";
    for(var i = 0 ; i<digit[num].length;i++){
        for(var j = 0; j<digit[num][i].length;j++){
            if (digit[num][i][j] == 1) {
                cxt.beginPath();

                cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
                cxt.closePath();

                cxt.fill();
            }
        }
    }
}

//计算剩余时间
function getCurrentShowTimeSeconds(){
    var this_data = new Date();
    var count_data = (endTime.getTime() - this_data.getTime() );
    var ret = Math.round(count_data/1000);
    return ret >= 0 ? ret : 0;
}

