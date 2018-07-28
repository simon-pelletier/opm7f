
var Game = {

  allCards: new Array(),
  cardsNumber: Number = 42,

  startCardNumber: Number = 7,

  families: new Array(),
  members: new Array(),

  players: new Array(),
  playerNumber: Number = 4,

  pick: new Array(),

  initCard: function(id, family, member, img){
    this.id = id;
    this.family = family;
    this.member = member;
    this.img = img;
  },


  initGame: function(){
    this.families.push('Europe', 'Afrique Noire', 'Asie', 'Inde', 'Amérique du Sud', 'Grand Nord', 'Pays Arabes');
    this.members.push('Le grand-père', 'La grand-mère', 'Le père', 'La mère', 'Le fils', 'La fille');

    // Création des cartes
    var familyMarker = 0;
    var memberMarker = 0;

    for(var i = 0; i < this.cardsNumber; i++){
      var aCard = Object.create(Card);
      aCard.initCard(i, this.families[familyMarker], this.members[memberMarker], './img/cards/' + i + '.jpg');
      this.allCards.push(aCard);

      memberMarker++;
      if (memberMarker == 6){
        memberMarker = 0;
        familyMarker++;
      }

    }

    // Mélange des cartes
    shuffle(this.allCards);

    // Création des joueurs
    var playerMarker = 0;
    var distributedNumber = 0;
    for (var j = 0; j < this.playerNumber; j++){
      aPlayer = new Array();
      this.players.push(aPlayer);
      // Distribution
      for (var k = 0; k < this.startCardNumber; k++){
        this.players[j].push(this.allCards[playerMarker + k]);
        distributedNumber++;
      }
      playerMarker = playerMarker + this.startCardNumber;
    }

    // Le reste va en pioche
    for (var l = distributedNumber; l < this.cardsNumber; l++){
      this.pick.push(this.allCards[l]);
    }

    // Affichage du jeu
    console.log(this.players);
    console.log(this.pick);

  }


}
