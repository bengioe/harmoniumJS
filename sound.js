

var SineInstrument = {
    render : function(partition){
	
    }
};


var ctx = new AudioContext();
var buffer;

function note2freq(n){
    var d = n-69;
    var f = 440 * Math.pow(2, d / 12.)
    return f;
}

function createStuff(){
    // nchannels, length, sample rate
    buffer = ctx.createBuffer(1, 44000*2,44000);
    var data = buffer.getChannelData(0);
    var f = [];
    for (var i=0;i<10;i++){
	f.push(note2freq(60+Math.round(12*Math.random())));
    }
    var t = 0;
    for (var k=0;k<8;k++){
	for (var i=0;i<=8000;i++){
	    data[i+k*8800] = 0.2*Math.sin(f[k]*t++/4400.0) * (1-i/8000.);
	    data[i+k*8800] += 0.2*Math.sin((f[k]/2)*t/4400.0) * (1-i/8000.);
	    data[i+k*8800] += 0.2*Math.sin((f[k]/4)*t/4400.0) * (1-i/8000.);
	    data[i+k*8800] += 0.2*Math.sin((f[k]/8)*t/4400.0) * (1-i/8000.);
	}
    }
}

// play a blank second to fix weird sound stuff?
function createBlank(){
    // nchannels, length, sample rate
    buffer = ctx.createBuffer(1, 44000,44000);
    var data = buffer.getChannelData(0);
    for (var i=0;i<44000;i++){
	data[i] = 0;
    }
}


function playStuff(){
    var src = ctx.createBufferSource();
    src.buffer = buffer;
    src.connect(ctx.destination);
    src.start(0);
}

createBlank();
playStuff();

createStuff();
