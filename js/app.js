
var target;
var family;
var member;

var turn;
var gameStarted = false;

var playingTimerSimulator = 1000;

var askedCard = false;

var heightG = window.innerHeight;
var widthG = window.innerWidth;

var mouseX;
var mouseY;

var infosPlayerCards = '';

var board = document.createElement('div');
board.id = 'board';
document.body.appendChild(board);

function startGame(){
  Game.initGame();
  updateBoard();
  //resize();
  gameFlow();
}
startGame();

function gameFlow(){
  var transfertCard = document.getElementById('transfert');
  if (transfertCard) {
    transfertCard.remove();
  }
  //endTurn();
  if (endTurn() != false) {
    // POSER FAMILLE
    console.log('FAMILY !!!');

  }
  //console.log(Game.pick[0]);
  if (Game.pick.length > 0) {
    if (gameStarted) {
      if (askedCard) {

      } else {
        turn++;
      }

      if (turn >= Game.players.length) {
        turn = 0;
      }
    } else {
      var first = getRandomNumber(0, Game.players.length-1);
      //console.log(Game.players);
      gameMasterSay('C\'est ' + Game.playersNames[first] + ' qui commence !');
      turn = first;
      gameStarted = true;
      //selectPlayer();
    }
    if (turn != 0) {
      botsTurn(turn);
    } else {
      selectPlayer();
    }
  } else {
    endGame();
  }


}

function cursorDisabled(){
  document.body.style.cursor = 'not-allowed';
  document.getElementById('pick').style.cursor = 'not-allowed';
  var cardsPointer = document.getElementsByClassName('card');
  for (var i = 0; i < cardsPointer.length; i++){
    cardsPointer[i].style.cursor = 'not-allowed';
  }
  var playerCardPointer = document.getElementsByClassName('cardPlayer');
  for (var j = 0; j < playerCardPointer.length; j++){
    playerCardPointer[j].style.cursor = 'not-allowed';
  }
}

function cursorEnabled(){
  document.body.style.cursor = 'default';
  document.getElementById('pick').style.cursor = 'pointer';
  var cardsPointer = document.getElementsByClassName('card');
  for (var i = 0; i < cardsPointer.length; i++){
    cardsPointer[i].style.cursor = 'pointer';
  }
  var playerCardPointer = document.getElementsByClassName('cardPlayer');
  for (var j = 0; j < playerCardPointer.length; j++){
    playerCardPointer[j].style.cursor = 'pointer';
  }
}

function endGame(){
  console.log('FIN !!!');
  console.log(Game.playerPoints);
}

function botsTurn(turn){
  cursorDisabled();
  var playerName = document.getElementById('infos' + turn);
  playerName.style.color = 'rgb(255, 0, 107)';

  var botHand = Game.players[turn];
  var bot = turn;
  var enemyIa;
  do{
    enemyIa = getRandomNumber(0, Game.players.length-1);
  } while (turn == enemyIa);
  var familyIa;
  var memberIa;
  var bestFamilies = [];
  var handCount = [0,0,0,0,0,0,0];
  for (var i = 0; i < botHand.length; i++){
    if (botHand[i].family == Game.families[0]) {
      handCount[0] = handCount[0] + 1;
    }
    if (botHand[i].family == Game.families[1]) {
      handCount[1] = handCount[1] + 1;
    }
    if (botHand[i].family == Game.families[2]) {
      handCount[2] = handCount[2] + 1;
    }
    if (botHand[i].family == Game.families[3]) {
      handCount[3] = handCount[3] + 1;
    }
    if (botHand[i].family == Game.families[4]) {
      handCount[4] = handCount[4] + 1;
    }
    if (botHand[i].family == Game.families[5]) {
      handCount[5] = handCount[5] + 1;
    }
    if (botHand[i].family == Game.families[6]) {
      handCount[6] = handCount[6] + 1;
    }
  }
  var max = Math.max.apply(null, handCount);
  for (var j = 0; j < handCount.length; j++){
    if (handCount[j] == max) {
      bestFamilies.push(Game.families[j]);
    }
  }
  if (bestFamilies.length > 0) {
    selectRandomFamily = getRandomNumber(0, bestFamilies.length-1);
    familyIa = bestFamilies[selectRandomFamily];
  } else {
    familyIa = bestFamilies[0];
  }
  var cardsAlreadyInHand = [];
  for (var m = 0; m < botHand.length; m++){
    if (botHand[m].family == familyIa) {
      cardsAlreadyInHand.push(botHand[m].member);
    }
  }
  var membersPossibilities = [];
  for (var o = 0; o < Game.members.length; o++){
    if (checkMembers(Game.members[o])) {
      membersPossibilities.push(Game.members[o]);
    }
  }
  function checkMembers(memberToCheck){
    var result = true;
    for (var n = 0; n < cardsAlreadyInHand.length; n++){
      if (memberToCheck == cardsAlreadyInHand[n]) {
        result = false;
      }
    }
    return result;
  }
  memberIa = membersPossibilities[getRandomNumber(0, membersPossibilities.length-1)];

  //console.log('Ennemi : ' + enemyIa);
  //console.log('Famille : ' + familyIa);
  //console.log('Membre : ' + memberIa);
  function timerSimulator(){
    if (Game.isMatching(bot, enemyIa, familyIa, memberIa)){
      gameMasterSay('Et c\'est gagné pour ' + Game.playersNames[turn]);
      transfert(enemyIa, turn);
      askedCard = true;
    } else {

      gameMasterSay('Perdu ! ' + Game.playersNames[turn] + ' pioche...');
      transfert(4, turn);
      // VERIFIER SI PIOCHE BONNE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      var cardAskedId = Game.getId(familyIa, memberIa);
      if (Game.pick[0]) {
        var cardPickedId = Game.pick[0].id;
        if (Game.isMatchingPick(cardAskedId, cardPickedId)) {
          gameMasterSay('Incroyable ! Bonne pioche !!!');
          askedCard = true;
        } else {
          askedCard = false;
        }
      } else {
        askedCard = false;
      }

      Game.pickCard(bot);

      //askedCard = false;
    }

    function result(){
      endTurn();
      updateBoard();
      gameFlow();
    }

















    /*var cardPickedAnimated = document.getElementsByClassName('pick')[0];

    var currentTop = (heightG / 2) - 200;
    var currentLeft = (widthG / 2) - 200;
    var endTop = heightG - 143;
    var endleft = 0;
    var endRight = widthG - 100;

    animate(cardPickedAnimated,"left","px", currentLeft, endleft, 300, 0);
*/








    setTimeout(result, playingTimerSimulator);
  }
  gameMasterSay(Game.playersNames[turn] + ' demande à ' + Game.playersNames[enemyIa] + ' ' + memberIa + ' de la famille ' + familyIa);

  setTimeout(timerSimulator, playingTimerSimulator);
}



function selectPlayer(turn){
  cursorEnabled();
  //console.log('Selectionner un joueur !');
  gameMasterSay('Sélectionnez un joueur');
  var joueurs = document.getElementsByClassName('bot');
  for (var i = 0; i < joueurs.length; i++){
    joueurs[i].addEventListener('click', playerSelection, false);
    //joueurs[i].style.cursor = 'pointer';
  }

}

function verification(){
  if (Game.isMatching(0, target, family, member)) {
    //console.log('Bravo ! Touché !');
    askedCard = true;
    gameMasterSay('Gagné ! C\'est encore à vous...');
    transfert(target, 0);
    setTimeout(result, playingTimerSimulator);
  } else {
    //var card = Game.pickCard(0);
    gameMasterSay('Perdu ! Vous piochez...');

    var thePickElt = document.getElementById('pick');
    thePickElt.addEventListener('click', manualPicker);


    function manualPicker(){
      //console.log('pioche manuelle');

      var card = Game.pick[0];
      showPickedCard(card);

      var cardAskedId = Game.getId(family, member);
      var cardPickedId = Game.pick[0].id;
      if (Game.isMatchingPick(cardAskedId, cardPickedId)) {
        gameMasterSay('Incroyable ! Bonne pioche !!!');
        askedCard = true;
      } else {
        askedCard = false;
      }

      Game.pickCard(0);
      setTimeout(moveCard, 2000);
      //console.log('Non, vous avez perdu !');
      setTimeout(result, playingTimerSimulator + 1300);
    }

  }

  function moveCard(){
    var thisCard = document.getElementById('pickedCard');
    //var currentTop = thisCard.style.top;

    var currentTop = (heightG / 2) - 200;
    var endTop = heightG - 143;

    //(elem,style,unit,from,to,time,delay)
    animate(thisCard,"top","px", currentTop, endTop, 300, 0);
    animate(thisCard,"width","px", 300, 100, 300, 0);
    //thisCard.style.top = '800px';

  }

  function showPickedCard(card){
    var cardElt = document.createElement('img');
    cardElt.src = card.img;
    cardElt.id = 'pickedCard';
    board.appendChild(cardElt);
  }

  function result(){
    endTurn();
    updateBoard();
    //botsTurn();
    gameFlow();
  }

}

function cardSelection(){
  var id = this.id;
  family = Game.getFamily(id);
  var cards = document.getElementsByClassName('cardPlayer');
  for (var i = 0; i < cards.length; i++){
    cards[i].removeEventListener('click', cardSelection, false);
  }
  //console.log('Vous avez selectionné la famille : ' + family);
  memberSelection();
}

function playerSelection(){
  var joueurs = document.getElementsByClassName('bot');
  for (var i = 0; i < joueurs.length; i++){
    joueurs[i].removeEventListener('click', playerSelection, false);
    //joueurs[i].style.cursor = 'default';
  }
  target = this.id.charAt(this.id.length - 1)
  //console.log('Vous avez selectionné le joueur ' + target);
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
    //memberSelector.innerHTML += '<div class="member" onClick="selectedMember(' + i + ')">' + Game.members[i] + '</div>';
    if (Game.alreadyHave(family, i)) {
    } else {
      memberSelector.innerHTML += '<div class="member" onClick="selectedMember(' + i + ')">' + Game.members[i] + '</div>';
    }
  }
  document.body.appendChild(memberSelector);
}

function selectedMember(i){
  //member = i;
  member = Game.members[i];
  //console.log('Vous avez selectionné le membre : ' + member);
  document.getElementById('memberSelector').remove();
  verification();
}

function endTurn(){
  var count = 0;
  var previousFamily = '';
  var familyCompleted = false;
  for (var i = 0; i < Game.players.length; i++){
    count = 0;
    previousFamily = 'start';
    for (var j = 0; j < Game.players[i].length; j++){
      if (previousFamily == 'start') {
        previousFamily = Game.players[i][j].family;
        count++;
      } else {
        if (previousFamily == Game.players[i][j].family) {
          count++;
          if (count >= 5) {
            familyCompleted = Game.players[i][j].family;
            Game.removeFamilyFromHand(i, Game.players[i][j].family);
            Game.playerPoints[i] = Game.playerPoints[i] + 1;
            var familyId = Game.getFamilyId(familyCompleted);
            addMiniFamily(i, familyId);
          }
        } else {
          previousFamily = Game.players[i][j].family;
          count = 0;
        }
      }
    }
  }

  return familyCompleted;
}

function addMiniFamily(playerId, familyId){
  if (playerId == 0) {
    Game.p0families.push(familyId);
  }
  if (playerId == 1) {
    Game.p1families.push(familyId);
  }
  if (playerId == 2) {
    Game.p2families.push(familyId);
  }
  if (playerId == 3) {
    Game.p3families.push(familyId);
  }



  /*var playerInfosElt = document.getElementById('infos' + playerId);
  console.log(playerId);
  console.log(playerInfosElt);
  var miniFamily = document.createElement('img');
  miniFamily.src = './img/' + Game.miniFamilies[familyId] + '.png';
  miniFamily.id = 'miniFamily';
  console.log(miniFamily);


  playerInfosElt.appendChild(miniFamily);*/
}



function updateBoard(){
  board.innerHTML = '';

  for (var i = 0; i < Game.playerNumber; i++){
    var cardContainerElt = document.createElement('div');
    cardContainerElt.className = 'cardContainer';
    var aPlayer = document.createElement('div');
    aPlayer.className = 'player';
    aPlayer.id = 'player' + i;
    if (i == 0) {
      aPlayer.className = 'player';
    } else {
      aPlayer.className = 'bot';
    }


    var playerNameElt = document.createElement('div');
    playerNameElt.innerHTML = Game.playersNames[i] + '<div class="infoPoints">Points : ' + Game.playerPoints[i] + '</div>';
    playerNameElt.id = 'infos' + i;
    playerNameElt.className = 'infos';

    var familiesCompletedTab = [Game.p0families, Game.p1families, Game.p2families, Game.p3families]
    var familiesCompletedList = familiesCompletedTab[i];
    for (var r = 0; r < familiesCompletedList.length; r++){
      var aMiniFamily = document.createElement('img');
      aMiniFamily.src = './img/' + Game.miniFamilies[familiesCompletedList[r]] + '.png';
      aMiniFamily.id = 'miniFamily';
      playerNameElt.appendChild(aMiniFamily);
    }
































    var rotation = -10;
    for (var j = 0; j < Game.players[i].length; j++){
      var anImage = document.createElement('img');
      if (i == 0) {
        anImage.className = 'cardPlayer';
        anImage.src = Game.players[i][j].img;
        anImage.addEventListener('mouseover', function( event ){
          var memberOver = Game.getMember(event.target.id);
          var familyOver = Game.getFamily(event.target.id);
          infosPlayerCards = familyOver + ' - ' + memberOver;
          var infoSelectionElt = document.getElementById('infoSelection');
          infoSelectionElt.innerHTML = infosPlayerCards;
          infoSelectionElt.style.display = 'block';
        }, false);
        anImage.addEventListener('mouseout', function( event ){
          infosPlayerCards = '';
          var infoSelectionElt = document.getElementById('infoSelection');
          infoSelectionElt.innerHTML = infosPlayerCards;
          infoSelectionElt.style.display = 'none';
        }, false);

      } else {
        anImage.className = 'card';
        //anImage.src = Game.players[i][j].img;
        anImage.src = './img/cards/back.jpg';
        anImage.style.transform = 'rotate(' + rotation + 'deg)';
        rotation += 3;
      }
      anImage.id = Game.players[i][j].id;

      cardContainerElt.appendChild(anImage);

    }

    aPlayer.appendChild(cardContainerElt);
    aPlayer.appendChild(playerNameElt);
    board.appendChild(aPlayer);
  }

  var thePick = document.createElement('div');
  thePick.id = 'pick';
  for (var k = 0; k < Game.pick.length; k++){
    var anImage = document.createElement('img');
    anImage.className = 'pick';
    //anImage.src = Game.pick[k].img;
    anImage.src = './img/cards/back.jpg';
    var r = getRandomNumber(-5, 5);
    anImage.style.transform = 'rotate(' + r + 'deg)';
    thePick.appendChild(anImage);
  }

  var theGameMaster = document.createElement('div');
  theGameMaster.id = 'gameMaster';

  var infoSelectionElt = document.createElement('div');
  infoSelectionElt.id = 'infoSelection';
  infoSelectionElt.innerHTML = infosPlayerCards;
  infoSelectionElt.style.top = mouseY;
  infoSelectionElt.style.left = mouseX;


  board.appendChild(infoSelectionElt);

  board.appendChild(theGameMaster);

  board.appendChild(thePick);
  resize();
}
setTimeout(function(){ resize(); }, 100);

function resize() {
    heightG = window.innerHeight;
    widthG = window.innerWidth;

    var pick = document.getElementById('pick');
    pick.style.left = (widthG / 2) - (100/2) + 'px';
    pick.style.top = (heightG / 2) - (143/2) + 'px';

    var gameMaster = document.getElementById('gameMaster');
    gameMaster.style.left = (widthG / 2) - (400/2) + 'px';
    gameMaster.style.top = (heightG / 2) - 140 + 'px';

    var playerElt = document.getElementById('player0');
    var playerWidth = playerElt.offsetWidth;
    playerElt.style.left = (widthG / 2) - (playerWidth/2) + 'px';

    var player1Base = document.getElementById('player1');
    if (player1Base) {
      var player1Container = document.getElementById('player1').childNodes[0];
      player1Container.style.top = (heightG/2) - 50 + 'px';
    }

    var player3Base = document.getElementById('player3');
    if (player3Base) {
      var player3Container = document.getElementById('player3').childNodes[0];
      player3Container.style.top = (heightG/2) - 130 + 'px';
    }




/*
    var player1Elt = document.getElementById('player1');
    player1EltWidth = player1Elt.offsetWidth;
    player1EltHeight = player1Elt.offsetHeight;
    player1Elt.style.top = (heightG / 2) - (player1EltHeight/2) + 'px';

    var player2Elt = document.getElementById('player2');
    player2EltWidth = player2Elt.offsetWidth;
    player2EltHeight = player2Elt.offsetHeight;
    player2Elt.style.left = (widthG / 2) - (player2EltWidth/2) + 'px';

    var player3Elt = document.getElementById('player3');
    player3EltWidth = player3Elt.offsetWidth;
    player3EltHeight = player3Elt.offsetHeight;
    player3Elt.style.top = (heightG / 2) - (player3EltHeight/2) + 'px';*/
}

window.onresize = resize;
onmousemove = function(e){

  var infoSelectionElt = document.getElementById('infoSelection');

  if (infoSelectionElt) {
    if (infoSelectionElt.innerHTML != '') {
      mouseX = e.clientX;
      mouseY = e.clientY;
      infoSelectionElt.style.top = mouseY + 'px';
      infoSelectionElt.style.left = mouseX + 'px';
    }

  }

}
