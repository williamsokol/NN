const BoardPosX = canvas.width/2-canvas.height/4;
const BoardPosY = canvas.height/4;
const BoardSize = canvas.height/2
drawRect(BoardPosX,BoardPosY,BoardSize,BoardSize,"#fff");

let training_data = [
    {
        inputs: [1,0],
        targets: [1]
    },
    {
        inputs: [0,1],
        targets: [1]
    },
    {
        inputs: [0,0],
        targets: [0]
    },
    {
        inputs: [1,1],
        targets: [0]
    }
]
//var m1,m2;
var nn;

function Start() {
    nn = new NeuralNetwork(2,4,1);     
    res = 30;

    ctx.font = "30px Arial";
    ctx.fillText("XOR",BoardPosX+BoardSize/2-30,BoardPosY-130);
    ctx.fillText("Neural Net Thing",BoardPosX+BoardSize/4,BoardPosY-100);
    ctx.fillText("0,0",BoardPosX-30,BoardPosY-30);
    ctx.fillText("1,0",BoardPosX+BoardSize,BoardPosY-30);
    ctx.fillText("0,1",BoardPosX-30,BoardPosY+BoardSize+30);
    ctx.fillText("1,1",BoardPosX+BoardSize,BoardPosY+BoardSize+30);
    
}

function draw(){
    for(let i =0; i<1000;i++){
        let data = training_data[getRndInteger(0,3)];
        nn.train(data.inputs,data.targets);
    }  

    for(let i=0;i<res;i++){
        for(let j=0;j<res;j++){
            ctx.lineWidth = 10;
            let x = i/res;
            let y = j/res;
            //fill(50);
            let fill = nn.FeedForward([x,y]);

            drawRect(BoardPosX+i*BoardSize/res,BoardPosY+j*BoardSize/res,BoardSize/res,BoardSize/res,`rgb(${fill*255},${fill*255},0)`);
        }
    }
}
function log(){
    console.clear();
    console.log("1 , 0");
    console.table(nn.FeedForward([1,0]));
    console.log("0 , 1");
    console.table(nn.FeedForward([0,1]));
    console.log("0 , 0");
    console.table(nn.FeedForward([0,0]));
    console.log("1 , 1");
    console.table(nn.FeedForward([1,1]));
    console.log("Weight data:");
    console.table(nn.ih_weights.data);
    console.table(nn.ho_weights.data);
}


Start();
log();
setInterval(log,3000);
thing();

function thing(){
    window.setTimeout(function(){
        
        draw();
        window.requestAnimationFrame(thing);
    },1000/30)    
}