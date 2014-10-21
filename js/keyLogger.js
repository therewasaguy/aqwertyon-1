/*
  generate json file with timestamp, note, action
 */

var keyLog = [];
var takes = [];

function logKeyDown(keyCode, note) {
  console.log('key down!' + keyCode + ', ' + note);
  keyLog.push([Tone.context.currentTime, note, 'triggerAttack']);
}

function logKeyUp(keyCode, note) {
  console.log('key up!' + keyCode + ', ' + note);
  keyLog.push([Tone.context.currentTime, note, 'triggerRelease']);
}


function saveTake() {
  // save(keyLog, 'keylog.json');
  var currentTake = keyLog;
  takes.push(currentTake);

  // reset keylog
  keyLog = [];

  // startTime is the time of the first note in the take
  var startTime = currentTake[0][0];

  // add option to the takesMenu
  var option = document.createElement('option');
  option.text = 'Take ' + takes.length;
  takesMenu.add(option);

  for (var i in takes[takes.length - 1]) {
    // schedule notes

    if (currentTake[i][2] === 'triggerAttack') {
      console.log('saving attack');
      mySynth.triggerAttack( mySynth.midiToNote(currentTake[i][1]), mySynth.now() + currentTake[i][0] - startTime );
    } else if (currentTake[i][2] === 'triggerRelease') {
      console.log('saving release');
      mySynth.triggerRelease( mySynth.midiToNote(currentTake[i][1]), mySynth.now() + currentTake[i][0] - startTime );
    }
  }
}

function setupTakesMenu() {
  // Frontend Menu of takes
  var takesMenu = document.createElement('SELECT');
  takesMenu.id = 'takesMenu';
  document.body.appendChild(takesMenu);
}