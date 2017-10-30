window.onload = function () {
    var canvas = document.getElementById("canvas");


    canvas.width = 800;
    canvas.height = 800;
    var context = canvas.getContext("2d");

    
   
    //context.lineJoin = "miter";
    //context.miterLimit = 20;

    context.fillRect(0,0,canvas.width,canvas.height);
    for(var i = 0 ; i<200 ; i ++){
        var r  = Math.random()*10 +10;
        var x  = Math.random()*canvas.width;
        var y  = Math.random()*canvas.height;
        var rot = Math.random()*360;
        drawStar(context , r/2 ,r ,x , y,rot);

    }
};
function drawStar(cxt , r ,R , x ,y ,rot){
   
    cxt.save();

    cxt.translate(x,y);
    cxt.rotate(rot / 180 *Math.PI);
    cxt.scale(r/10,r/10);
    starPath(cxt);

    cxt.fillStyle = "#fb3";
    //cxt.strokeStyle = "#fd5";
    //cxt.lineJoin = "round";
    //cxt.lineWidth = 3;
    cxt.fill();
    cxt.stroke();
    cxt.restore();
}

function starPath(cxt){
    cxt.beginPath();

    for(var i=0;i<5;i++){
        cxt.lineTo(Math.cos((18+ i*72 )/180 *Math.PI) *20,
                -Math.sin((18+ i*72 )/180 *Math.PI) *20);

        cxt.lineTo(Math.cos((54+ i*72 )/180 *Math.PI) *0.5*20,
                -Math.sin((54+ i*72 )/180 *Math.PI) *0.5*20);
    }


    cxt.closePath();
}