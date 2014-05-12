

function str2note(s){
    // A0 is considered the lowest note, note 0, 11.25 Hz
    var note = s.charCodeAt(0) - "A".charCodeAt(0) + 12 * (1 * s.substr(1));
    return note;
}

function Partition(){
    this.bars = [];
    this.addNote = function(bar, index, note, length){
	this.bars[bar][index] = [note, length];
    }
    this.addBar = function(){
	this.bars.push([]);
    }
}

function noteEditor(){
    this.currentPart = new Partition();
    this.cursor = [0,0,0];
    this.draw = function(){
	screen.fillStyle = "#000";
	screen.font = "12px sans-serif";
	var bars = this.currentPart.bars;
	for (var i=0;i<bars.length;i++){
	    var bar = bars[i];
	    for (var j=0;j<bar.length;j++){
		screen.fillText(bars[i].toString(), j*10+i*100, (i+1)*20);
	    }
	}
	var bar = this.cursor[0];
	var ind = this.cursor[1];
	var height = this.cursor[2];
	screen.fillRect(bar * 100 + ind * 10, height*10 +10, 10, 10);
	
    }
    this.handleKey = function(e){
	if (e.keyCode == 38){ // up
	    this.cursor[2] -= 1; redraw();
	} else if (e.keyCode == 40){ // down
	    this.cursor[2] += 1; redraw();
	} else if (e.keyCode == 37){ // left
	    this.cursor[1] -= 1; redraw();
	} else if (e.keyCode == 39){ // right
	    this.cursor[1] += 1; redraw();
	} 
    }
}
