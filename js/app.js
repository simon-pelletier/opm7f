Game.initGame();

var board = document.createElement('div');
board.id = 'board';

for (var i = 0; i < Game.playerNumber; i++){
  var aPlayer = document.createElement('div');
  aPlayer.className = 'player';
  aPlayer.id = 'player' + i;
  for (var j = 0; j < Game.players[i].length; j++){
    var anImage = document.createElement('img');
    anImage.className = 'card';
    anImage.src = Game.players[i][j].img;
    aPlayer.appendChild(anImage);
  }
  board.appendChild(aPlayer);
}

var thePick = document.createElement('div');
thePick.id = 'pick';
for (var k = 0; k < Game.pick.length; k++){
  var anImage = document.createElement('img');
  anImage.className = 'card';
  anImage.src = Game.pick[k].img;
  thePick.appendChild(anImage);
}

board.appendChild(thePick);

document.body.appendChild(board);
