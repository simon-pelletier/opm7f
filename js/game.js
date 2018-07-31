
var Game = {

  allCards: new Array(),
  cardsNumber: Number = 42,

  startCardNumber: Number = 6,

  families: new Array(),
  members: new Array(),

  players: new Array(),
  playerNumber: Number = 2,

  pick: new Array(),

  playerPoints: new Array(),


  playersNames: new Array('Humain', 'Georges', 'Rick', 'Marty'),

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
      this.playerPoints.push(0);
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

    // Range les mains
    for (var m = 0; m < this.playerNumber; m++){
      this.players[m].sort(function(obj1, obj2) {
      	return obj1.id - obj2.id;
      });
    }

    // Affichage du jeu
    //console.log(this.players);
    //console.log(this.pick);

  },

  getFamily(id){
    for (var i = 0; i < this.allCards.length; i++){
      if (this.allCards[i].id == id) {
        return this.allCards[i].family;
      }
    }
  },

  getMember(id){
    for (var i = 0; i < this.allCards.length; i++){
      if (this.allCards[i].id == id) {
        return this.allCards[i].member;
      }
    }
  },

  alreadyHave(family, member){
    result = false;
    for (var i = 0; i < this.players[0].length; i++){
      if (this.players[0][i].family == family && this.players[0][i].member == this.members[member]) {
        result = true;
      }
    }
    return result;
  },

  isMatching(player, target, family, member){
    var targetHandTemp = this.players[target];
    var playerHandTemp = this.players[player];

    for (var i = 0; i < this.players[target].length; i++){
      if (this.players[target][i].family == family && this.players[target][i].member == member) {
        var id = this.players[target][i].id
        this.players[target] = [];

        for (var j = 0; j < targetHandTemp.length; j++){
          if (id == targetHandTemp[j].id) {
            this.players[player].push(targetHandTemp[j]);
            this.orderHand(player);
          } else {
            this.players[target].push(targetHandTemp[j]);
          }
        }
        return true;
        break;
      } else {

      }
    }
  },

  orderHand(i){
    this.players[i].sort(function(obj1, obj2) {
      return obj1.id - obj2.id;
    });
  },

  pickCard(player){
    var pickTemp = this.pick;
    this.players[player].push(this.pick[0]);
    this.pick = [];
    for (var i = 0; i < pickTemp.length; i++){
      if (i == 0) {

      } else {
        this.pick.push(pickTemp[i]);
      }
    }
    this.orderHand(player);
    //console.log(this.players);
    //console.log(this.pick);
  },

  removeFamilyFromHand(playerS, familyS){
    var playerHandTemp = this.players[playerS];

    this.players[playerS] = [];

    for (var i = 0; i < playerHandTemp.length; i++){
      if (playerHandTemp[i].family != familyS) {
        this.players[playerS].push(playerHandTemp[i]);
      }
    }
  }

}
