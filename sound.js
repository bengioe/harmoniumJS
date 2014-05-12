

var SineInstrument = {
    render : function(partition){
	
    }
};


var ctx = AudioContext();
var buffer;

function createStuff(){
    // nchannels, length, sample rate
    buffer = ctx.createBuffer(1, 4400,44000);
    var data = buffer.getChannelData(0);
    var f = 220;
    for (var i=0;i<4400;i++){
	data[i] = 0.3*Math.sin(f*i/4400.0);
    }
    
}


function playStuff(){
    var src = ctx.createBufferSource();
    src.buffer = buffer;
    src.connect(ctx.destination);
    src.start(0);
}

createStuff();
