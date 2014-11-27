var takesMenu;
var synthMenu;

function setupTakesMenu() {
  // Frontend Menu of takes
  takesMenu = document.createElement('SELECT');
  takesMenu.id = 'takesMenu';
  var option = document.createElement('option');
  option.text = 'demo melody';
  takesMenu.add(option);
  takesMenu.onchange = function(e) {takeSelected(e)};

  var ui = document.getElementById('takes');
  ui.appendChild(takesMenu);
  // document.body.appendChild(takesMenu);
}

function setupSynthMenu() {
  // Frontend Menu of takes
  synthMenu = document.createElement('SELECT');
  synthMenu.id = 'synthMenu';

  for (var i in synths) {
    var option = document.createElement('option');
    option.text = synths[i];
    synthMenu.add(option);
  }
  synthMenu.onchange = function(e) {synthSelected(e)};

  var ui = document.getElementById('synths');
  ui.appendChild(synthMenu);
  // document.body.appendChild(takesMenu);
}
// var 