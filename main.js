
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
    var p = new Part();
    p.measures.push(m);
    var mididata = generate_midi([p]);
    console.log(escape(mididata));
    document.getElementById("player").innerHTML = '<embed src="data:audio/midi;base64,'+btoa(mididata)+
	'" hidden="true" autostart="true" autoplay="true" loop="false" volume="75%">';
}

//number to packed string of k bytes
function n2s(n,k){
    var chars = [];
    for(var i = 0; i < k;i++) {
        chars.push(n & 0xff);
	n>>=8;
    }
    return String.fromCharCode.apply(null, chars.reverse());
}

// encodes a variable length number
function midi_var(n){
    var chars = [];
    if (n==0){return "\x00";}
    while(n>0) {
        chars.push(n & 0x7f);
	n>>=7;
    }
    return String.fromCharCode.apply(null, chars.reverse());
}

function generate_midi(parts){
    raw_data = "";
    // header
    raw_data += "Mthd"; 
    raw_data += "\x00\x00\x00\x06"; // header chuck size
    raw_data += "\x00\x00"; // format type, should be 1 for multiple tracks, but 1 track is 0 for now
    raw_data += n2s(1,2); // number of tracks
    raw_data += "\x99\x78"; // time division...? 0x78 = 120, 120 ticks per quarter
    /* On time division:
     * It would seem that in the header we give the number of ticks per quarter note
     * that the duration of a quarter note is given by the tempo (default 120 bpm?)
     * So the delta times should be 120*duration fraction relative to quarter note of delta
     */
    for (var i=0;i<parts.length;i++){
	raw_data += "Mtrk";
	// a part can be considered a track
	// each chunk of data is a track
	chunk = midi_part_chunk(parts[i], i);
	raw_data += n2s(chunk.length,4);
    }
    return raw_data;
}

function midi_part_chunk(part, channel){
    var chunk = "";
    var delta_stack = 0;
    for (var i=0,plen=part.measures.length;i<plen;i++){
	console.log("i"+i);
	var measure = part.measures[i];
	for (var j=0,mlen=measure.beats.length;j<mlen;j++){
	    console.log("j"+j);
	    var beat = measure.beats[j]
	    if (beat.notes.length>0){
		// generate first note_on
		chunk += midi_var(delta_stack) + 
		    midi_note_on(channel, beat.notes[0].pitch, 90);
		delta_stack = 0;
		for (var k=1,blen=beat.notes.length;k<blen;k++){
		    console.log("k"+k);
		    chunk += "\x00"+
			midi_note_on(channel, beat.notes[k].pitch, 90);
		}
	    }
	    delta_stack += 120/(beat.duration/4);
	}
    }
    return chunk;
}

function midi_note_on(channel,note,velocity){
    // midi note on is 0x9 and the other 4 bits of 
    // the first byte is the channel
    return String.fromCharCode.apply(null,[0x90+channel,note,velocity]);
}
