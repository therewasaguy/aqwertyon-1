var scale = [];
var major = [0, 2, 4, 5, 7, 9, 11];
var major3rds = [4,5,7,9,11,12,14];
var major5ths = [7,9,11,12,14,16,17];
var minor = [0, 2, 3, 5, 7, 8, 10];
var minor3rds = [3,5,7,8,10,12,14];
var minor5ths = [7,8,10,12,14,15,17];
var mnPent = [0, 3, 5, 7, 10];
var MjPent = [0, 2, 4, 7, 9];
var blues = [0,3,5,6,7,10];
var wholeTone = [0,2,4,6,8,10];
var harmMinor = [0,2,3,5,7,8,11];
var hMinor3rds = [3,5,7,8,11,12,14];
var hMinor5ths = [7,8,10,12,14,15,17];
var root;
var chords;
var isChords;
var thirds = [];
var fifths = [];

function rootUp(){
  root+=1;  
  if (isChords == true) 
  assignChords(chords);
  else
  mapScales();
}

function rootDown(){
  root-=1;
  if (isChords == true) 
  assignChords(chords);
  else
  mapScales();
}

/**
 *  ToneJS Settings
 */
var mySynth;
var initialVolume = 0.5;
var synths = ['Pianoetta', 'Barky', 'Bassy', 'BrassCircuit', 'Pizz', 'LaserSteps'];

function setupTone() {
  //set up Tone Synth
  mySynth = new Tone.PolySynth(10, Tone.MonoSynth);
  mySynth.setPreset('Pianoetta');
  mySynth.toMaster();

  // initialize volume
  var initialDb = Tone.Master.gainToDb(initialVolume);
  Tone.Master.setVolume(initialDb);

}


function setMasterVolume(vol) {
  document.querySelector('#volume').value = vol;
  var gain = vol/100;
  var db = Tone.Master.gainToDb(gain);
  Tone.Master.setVolume(db);
}

function synthSelected(s) {
  var s = synthMenu.options[synthMenu.selectedIndex].value;
  console.log(s);
  mySynth.dispose();
  mySynth = new Tone.PolySynth(10, Tone.MonoSynth);
  mySynth.setPreset(s);
  mySynth.toMaster();
}
