const canvas = document.getElementById("can");

 canvas.width =  window.innerWidth/1;
 canvas.height =  window.innerHeight/1.2;
// getContext of canvas = methods and properties to draw and do a lot of thing to the canvas
const ctx = canvas.getContext('2d');

color = "#fff"



function drawRect(x,y,w,h,c){
    
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.strokeStyle = "#000";
    ctx.stroke();
    ctx.fillStyle  = c
    ctx.fill();
    
}
function drawCircle(x,y,r,c,fill=true){
    //ctx.fillStyle = c;

    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    if(fill = true){
        ctx.fill();
        ctx.strokeStyle = c;
    }
    ctx.stroke();

}
function drawLine(x1,y1,x2,y2,c)
{
    //make line:
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    //make visable:
    ctx.strokeStyle = c;
    ctx.stroke();
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
function sign(int)
{
    if(int >= 0)
    {
        return 1;
    }else{
        return -1
    }
}

function sigmoid(x){
    return 1/(1+Math.exp(-x));
}

// the derivative of my sigmoid
function dsigmoid(y){
    // return sigmoid(x) * (1-sigmoid(x));
    return y *(1-y);
}