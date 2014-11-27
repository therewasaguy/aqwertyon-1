/**
 *  main.js calls setup() to initialize everything when the page loads,
 *  and draw() for the animation loop. Also listens for events like key/mouse press.
 */

var myKeymap;
var keyRows = [];
var keyDiags = [];


function setup() {
  // set the canvas position so that mouseX and mouseY are relative to top corner
  cnv = createCanvas(0,0);
  cnv.position(0,0);
  loadJSON('keymap.json', registerKeymap);
  scale = major;
  root = 48;
  isChords = false;
  thirds = major3rds;
  fifths = major5ths;
  chords = major;
  
  // set up the menu of takes
  setupTakesMenu();
  setupSynthMenu();

  // initialize to major scale
  clickMajor();

  // initialize tone.js instrument
  setupTone();
}


//set up Tone Synth
var mySynth = new Tone.PolySynth(10, Tone.MonoSynth);
mySynth.setPreset('Pianoetta');
mySynth.toMaster();


window.onkeydown = function (e) {
  for (var k in myKeymap) {
    if (myKeymap[k].keyCode === e.keyCode && !myKeymap[k].playing) {
      console.log(e.keyCode);
      myKeymap[k].playing = true;
      if (myKeymap[k].note > 20) {

        logKeyDown(myKeymap[k].keyCode, myKeymap[k].note);

        mySynth.triggerAttack( mySynth.midiToNote(myKeymap[k].note), mySynth.now() );
      }
      return;
    }
  }
}

window.onkeyup = function(e) {
  for (var k in myKeymap) {
    if (myKeymap[k].keyCode === (e.keyCode) ) {
      if (myKeymap[k].note > 20) {
        myKeymap[k].playing = false;

        logKeyUp(myKeymap[k].keyCode, myKeymap[k].note);

        mySynth.triggerRelease( mySynth.midiToNote(myKeymap[k].note), mySynth.now() );
      }
      return;
    }
  }
}

var playing = false;

function mouseClicked() {
  if (mouseX < videoWidth && mouseY < videoHeight) {
    if (playing === false) {
      playVideo();
      playing = true;
    } else {
      stopVideo();
      playing = false;
    }
  }
}
