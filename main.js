
function start(){
    document.getElementById("statusbar").innerHTML = "Loading...";
    var m = new Measure();
    m.beats.push(new Beat());
    m.beats.push(new Beat());
    var instrument = new StringInstrument();
    m.beats[0].notes.push(new Note(instrument.strings[5]+2,6));
    m.beats[0].notes.push(new Note(instrument.strings[4]+4,5));
    m.beats[0].notes.push(new Note(instrument.strings[3]+4,4));
    m.beats[1].notes.push(new Note(instrument.strings[5]+3,6));
    m.beats[1].notes.push(new Note(instrument.strings[4]+5,5));
    m.beats[1].notes.push(new Note(instrument.strings[3]+5,4));
    var text = m.toTabHTML(instrument);
    document.getElementById("statusbar").innerHTML = text;
}

var screen;
var editor;

function redraw(){
    screen.fillStyle = "#eee";
    screen.fillRect(0,0,800,400);
    editor.draw();
}

function init(){
    screen = document.getElementById("noteCanvas").getContext("2d");
    editor = new noteEditor();
    setInterval(function(){
    }, 1000);

    addEventListener('keydown',
		     function(e){
			 if (this.isShowingKeyCodes)
			     console.log(e.keyCode);
			 if (e.keyCode == 32)
			     playStuff();
			 else if (e.keyCode == 107)
			     this.isShowingKeyCodes = !this.isShowingKeyCodes;
			 else
			     editor.handleKey(e);
			 
		     });

}
