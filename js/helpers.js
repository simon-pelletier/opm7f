function getRandomNumber(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function gameMasterSay(msg){
  var gameMasterElt = document.getElementById('gameMaster');
  gameMasterElt.innerHTML = msg;
}

function animate(elem,style,unit,from,to,time,delay) {
  if( !elem) return;
  setTimeout(function(){
    var start = new Date().getTime(),
        timer = setInterval(function() {
            var step = Math.min(1,(new Date().getTime()-start)/time);
            elem.style[style] = (from+step*(to-from))+unit;
            if( step == 1) clearInterval(timer);
        },25);
    elem.style[style] = from+unit;
  }, delay);
}

function transfert(source, target){
  var card = document.createElement('img');
  card.id = 'transfert';
  card.src = './img/cards/back.jpg';

  board.appendChild(card);

  var topSource = eltTop(source);
  var leftSource = eltLeft(source);

  var topTarget = eltTop(target);
  var leftTarget = eltLeft(target);

  animate(card,"left","px", leftSource, leftTarget, 500, 0);
  animate(card,"top","px", topSource, topTarget, 500, 0);
}

function eltTop(elt){
  if (elt == 0) {
    return heightG;
  }
  if (elt == 1) {
    return (heightG/2) - 71;
  }
  if (elt == 2) {
    return 0;
  }
  if (elt == 3) {
    return (heightG/2) - 71;
  }
  if (elt == 4) {
    return (heightG/2) - 71;
  }
}
function eltLeft(elt){
  if (elt == 0) {
    return (widthG/2) - 50;
  }
  if (elt == 1) {
    return 0;
  }
  if (elt == 2) {
    return (widthG/2) - 50;
  }
  if (elt == 3) {
    return widthG - 100;
  }
  if (elt == 4) {
    return (widthG/2) - 50;
  }
}
