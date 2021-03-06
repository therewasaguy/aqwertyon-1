/**
 *  sounds.js has stuff that has to do with sound and Tone.js
 */

// scale mapping
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
var root, chords, isChords;
var thirds = [], fifths = [];

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
var mySynth, myReverb;
var initialVolume = 0.5;

// Presets are defined in lib/Tone.Preset.js
var synths = ['Pianoetta', 'Bassy', 'BrassCircuit', 'Trumpet', 'Koto', 'Steely', 'Organ'];

function synthSelected() {
  var presetName = synthMenu.options[synthMenu.selectedIndex].value;
  mySynth.dispose();

  // presets and correspond with either FMSynth, DuoSynth or MonoSynth
  switch(presetName){
    case 'Koto':
    case 'Trumpet':
        mySynth = new Tone.PolySynth(10, Tone.FMSynth);
        break;
    case 'Steely':
    case 'Organ':
        mySynth = new Tone.PolySynth(10, Tone.DuoSynth);
        break;
    default:
        mySynth = new Tone.PolySynth(10, Tone.MonoSynth);
  }
  mySynth.setPreset(presetName);
  mySynth.connect(myReverb);
}

function setupTone() {
  // put reverb on everything
  myReverb = new Tone.Freeverb();
  myReverb.setPreset('coolRoom');
  myReverb.dryWet.setWet(.32);
  myReverb.toMaster();

  //set up Tone Synth
  mySynth = new Tone.PolySynth(10, Tone.MonoSynth);
  mySynth.setPreset('Pianoetta');
  // mySynth.connect(myReverb);
  mySynth.toMaster();
  // initialize volume
  var initialDb = Tone.Master.gainToDb(initialVolume);
  Tone.Master.setVolume(initialDb);
}


function setMasterVolume(vol) {
  document.querySelector('#vol').value = vol;
  var gain = vol/100;
  var db = Tone.Master.gainToDb(gain);
  Tone.Master.setVolume(db);
}
