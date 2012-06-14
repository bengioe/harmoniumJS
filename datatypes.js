
function Part(){
    this.measures = [];
}

function Measure(){
    this.notes = [];
}

function Note(){
    /* The pitch, midi equivalent
     * C4 == 60
     */
    this.pitch = 60;
    /* The duration, fraction of the measure
     * a quarter note is 4, a whole note is 1
     */
    this.duration = 4
    /* The string, as in a stringed instrument
     * string 1 is the highest one
     */
    this.string = 6
}