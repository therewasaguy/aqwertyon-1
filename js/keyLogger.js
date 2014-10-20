/*
  generate json file with timestamp, 
 */

var keyLog = {}

function logKeyDown(keyCode, note) {
  console.log('key down!' + keyCode + ', ' + note);
}

function logKeyUp(keyCode, note) {
  console.log('key up!' + keyCode + ', ' + note);
}
