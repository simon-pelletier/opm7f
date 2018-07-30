//300x428

Game.initGame();

var target;
var family;
var member;

var board = document.createElement('div');
board.id = 'board';
document.body.appendChild(board);

updateBoard();

function playerTurn(){
  console.log('Selectionner un joueur !');
  gameMasterSay('Sélectionnez un joueur');
  var joueurs = document.getElementsByClassName('bot');
  for (var i = 0; i < joueurs.length; i++){
    joueurs[i].addEventListener('click', playerSelection, false);
    joueurs[i].style.cursor = 'pointer';
  }
}
playerTurn();

function verification(){
  if (Game.isMatching(0, target, family, member)) {
    console.log('Bravo ! Touché !');
  } else {
    Game.pickCard(0);
    console.log('Non, vous avez perdu !');
  }
  updateBoard();
  botsTurn();
}

function botsTurn(){
  console.log('Alley, c\'est aux bots de jouer');
}

function cardSelection(){
  var id = this.id;
  family = Game.getFamily(id);
  var cards = document.getElementsByClassName('cardPlayer');
  for (var i = 0; i < cards.length; i++){
    cards[i].removeEventListener('click', cardSelection, false);
  }
  console.log('Vous avez selectionné la famille : ' + family);
  memberSelection();
}

function playerSelection(){
  var joueurs = document.getElementsByClassName('bot');
  for (var i = 0; i < joueurs.length; i++){
    joueurs[i].removeEventListener('click', playerSelection, false);
    joueurs[i].style.cursor = 'default';
  }
  target = this.id.charAt(this.id.length - 1)
  console.log('Vous avez selectionné le joueur ' + target);
  familySelection(target);
}

function familySelection(target){
  gameMasterSay('Sélectionnez une famille parmis vos cartes');
  var cards = document.getElementsByClassName('cardPlayer');
  for (var i = 0; i < cards.length; i++){
    cards[i].addEventListener('click', cardSelection, false);
  }
}

function memberSelection(){
  gameMasterSay('Sélectionnez un membre de cette famille');
  var memberSelector = document.createElement('div');
  memberSelector.id = 'memberSelector';
  for (var i = 0; i < Game.members.length; i++){
    if (Game.alreadyHave(family, i)) {
    } else {
      memberSelector.innerHTML += '<div class="member" onClick="selectedMember(' + i + ')">' + Game.members[i] + '</div>';
    }
  }
  document.body.appendChild(memberSelector);
}

function selectedMember(i){
  member = i;
  console.log('Vous avez selectionné le membre : ' + member);
  document.getElementById('memberSelector').remove();
  verification();
}







function updateBoard(){
  board.innerHTML = '';
  for (var i = 0; i < Game.playerNumber; i++){
    var aPlayer = document.createElement('div');
    aPlayer.className = 'player';
    aPlayer.id = 'player' + i;
    if (i == 0) {
      aPlayer.className = 'player';
    } else {
      aPlayer.className = 'bot';
    }

    for (var j = 0; j < Game.players[i].length; j++){
      var anImage = document.createElement('img');
      if (i == 0) {
        anImage.className = 'cardPlayer';
      } else {
        anImage.className = 'card';
      }
      anImage.id = Game.players[i][j].id;
      anImage.src = Game.players[i][j].img;
      aPlayer.appendChild(anImage);
    }
    board.appendChild(aPlayer);
  }

  var thePick = document.createElement('div');
  thePick.id = 'pick';
  for (var k = 0; k < Game.pick.length; k++){
    var anImage = document.createElement('img');
    anImage.className = 'pick';
    anImage.src = './img/cards/back.jpg';
    var r = getRandomNumber(-5, 5);
    anImage.style.transform = 'rotate(' + r + 'deg)';
    thePick.appendChild(anImage);
  }

  var theGameMaster = document.createElement('div');
  theGameMaster.id = 'gameMaster';

  thePick.appendChild(theGameMaster);

  board.appendChild(thePick);
}
