/*
  generate json file with timestamp, note, action
 */

var keyLog = [];
var takes = [];

// data model:

function logKeyDown(keyCode, note) {
  console.log('key down!' + keyCode + ', ' + note);
  keyLog.push([Tone.context.currentTime - takeStart, note, 'triggerAttack']);
}

function logKeyUp(keyCode, note) {
  console.log('key up!' + keyCode + ', ' + note);
  keyLog.push([Tone.context.currentTime - takeStart, note, 'triggerRelease']);
}

var takeStart = 0;
function startTake() {
  takeStart = mySynth.now();
}

function saveTake() {
  // save(keyLog, 'keylog.json');
  var currentTake = keyLog;
  takes.push(currentTake);

  // reset keylog
  keyLog = [];

  // add option to the takesMenu
  var option = document.createElement('option');
  option.text = 'Take ' + takes.length;
  takesMenu.add(option);
}

var takesMenu;
function setupTakesMenu() {
  // Frontend Menu of takes
  takesMenu = document.createElement('SELECT');
  takesMenu.id = 'takesMenu';
  var option = document.createElement('option');
  option.text = 'Select Your Take to Play Back';
  takesMenu.add(option);
  takesMenu.onchange = function(e) {takeSelected(e)};
  document.body.appendChild(takesMenu);
}

function takeSelected(e) {
  if (takesMenu.selectedIndex > 0) {
    playTake(takesMenu.selectedIndex - 1);
    var selectedValue = takesMenu.options[takesMenu.selectedIndex].value;
    console.log('playing ' + selectedValue);
    playVideo();
  }
}

function playTake(takeNumber) {
  var currentTake = takes[takeNumber];

  for (var i in currentTake) {
    // schedule notes from currentTake
    if (currentTake[i][2] === 'triggerAttack') {
      console.log('saving attack');
      mySynth.triggerAttack( mySynth.midiToNote(currentTake[i][1]), mySynth.now() + currentTake[i][0]);
    }
    else if (currentTake[i][2] === 'triggerRelease') {
      console.log('saving release');
      mySynth.triggerRelease( mySynth.midiToNote(currentTake[i][1]), mySynth.now() + currentTake[i][0]);
    }
  }
}

function flushNotes() {
  for (var i in mySynth._activeVoices) {
    mySynth.triggerRelease(i);
  }
}