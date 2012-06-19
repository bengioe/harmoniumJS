
function Part(){
    this.measures = [];
}

function Measure(){
    this.beats = [];

    this.toTabHTML = function(instrument){
        var strings = new Array();
        for (var i=0;i<6;i++){strings[i]=new Array();}
        for (var i=0,len=this.beats.length;
             i<len;i++){
            var beat=this.beats[i];
            for (var j=0,nlen=beat.notes.length;
                 j<nlen; j++){
                var note=beat.notes[j];
                console.log(note.pitch+":"+i);
                strings[note.string-1][i] = 
                    note.pitch - instrument.strings[note.string-1];
            }
        }
        var text = "";
        for (var i=0;i<6;i++){
            text+="|";
            for (var j=0;j<this.beats.length;j++){
                if (strings[i][j]){
                    text+="-"+strings[i][j];
                }else{
                    text+="--";
                }
            }
            text+="-|<br/>";
        }
        return text;
    }
}

function Beat(){
    /* The duration, fraction of the measure
     * a quarter note is 4, a whole note is 1
     */
    this.duration = 4;
    
    /* the notes of the beat
     * (normally ordered by pitch)
     */
    this.notes = [];
}

function Note(p,s){
    /* The pitch, midi equivalent
     * C4 == 60
     */
    this.pitch = 60;
    if (p!=undefined){
        this.pitch = p;
    }
    /* The string, if in a stringed instrument
     * string 1 is the highest one
     */
    this.string = 6;
    if (s!=undefined){
        this.string = s;
    }
}

function StringInstrument(){
    // EBGDAE
    this.strings = [88,83,79,74,69,64];
}