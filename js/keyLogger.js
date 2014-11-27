/**
 *  keyLogger.js
 *    - logs keystrokes as JSON with timestamp, note, action
 *    - handles playback of takes
 */


var eventLog = {};
eventLog.takes = [];

var Take = function(time, id) {
  this.startTime = time;
  this.endTime;
  this.id = id;
  this.notes = [];
};

function logKeyDown(keyCode, note) {
  currentTake.notes.push([Tone.context.currentTime - currentTake.startTime, note, 'attack']);
}

function logKeyUp(keyCode, note) {
  currentTake.notes.push([Tone.context.currentTime - currentTake.startTime, note, 'release']);
}

// the 0th take is the take that holds all non-takes
var currentTake = new Take(Tone.context.currentTime, eventLog.takes.length);
eventLog.takes.push(currentTake);

function startTake() {
  currentTake = new Take(Tone.context.currentTime, eventLog.takes.length);
  eventLog.takes.push(currentTake)
}

function saveTake() {
  // revert to using the 0th take
  currentTake = eventLog.takes[0];

  // add option to the takesMenu
  var option = document.createElement('option');
  option.text = 'Take ' + (eventLog.takes.length - 1).toString();
  takesMenu.add(option);
}

function takeSelected(e) {
  if (takesMenu.selectedIndex > 0) {
    playTake(takesMenu.selectedIndex);
    var selectedValue = takesMenu.options[takesMenu.selectedIndex].value;
    console.log('playing ' + selectedValue + 'take number: ' + takesMenu.selectedIndex);
    playVideo();
  }
}

function playTake(takeNumber) {
  var take = eventLog.takes[takeNumber];
  console.log(take);
  // schedule all the attacks & releases
  for (var i in take.notes) {
    if (take.notes[i][2] === 'attack') {
      mySynth.triggerAttack( mySynth.midiToNote(take.notes[i][1]), mySynth.now() + take.notes[i][0]);
    }
    else if (take.notes[i][2] === 'release') {
      mySynth.triggerRelease( mySynth.midiToNote(take.notes[i][1]), mySynth.now() + take.notes[i][0]);
    }
  }

  // schedule videoEnd
  var videoStopTime = Math.round(take.endTime * 1000);
  setTimeout(stopVideo, videoStopTime);
}

function flushNotes() {
  for (var i in mySynth._activeVoices) {
    if (mySynth._activeVoices[i]) {
      mySynth._activeVoices[i].triggerRelease();
    }
  }
  currentTake.endTime = Tone.context.currentTime;
}