$(document).ready(function(){
    var cardDeck = $("#cardDeck").playingCards();
    cardDeck.spread(); // show it

    var hand = [];
    var computerHand = [];
    var discardPile = [];

    var showError = function(msg){
        $('#error').html(msg).show();
        setTimeout(function(){
            $('#error').fadeOut('slow');
        },3000);
    };
    var showHands = function(){
        var el = $('#yourHand');
        el.html('');
        for (var i=0; i<hand.length; i++){
            el.append(hand[i].getHTML());
            
        }
        el = $('#computerHand');
        el.html('');
        for(i=0; i<computerHand.length; i++){
            el.append(computerHand[i].getHTML());
        }
        el = $('#discardPile');
        el.html('');
        for(i=0, i<discardPile.length;i++){
            el.append(discardPile[i].getHTML());
        }
    };
    var doShuffle = function(){
        cardDeck.shuffle();
        cardDeck.spread(); // update card table
    };
    var doDrawCard1 = function(){
        var c = cardDeck.draw();
        if(!c){
            showError('no more cards');
            return;
        }
        hand[hand.length] = c;
        cardDeck.spread();
        showHands();
    };
    var doDrawCard2 = function(){
        var c = cardDeck.draw();
        if(!c){
            showError('no more cards');
            return;
        }
        computerHand[computerHand.length] = c;
        cardDeck.spread();
        showHands();
    };
    var doDiscard = function(){
       if(!discardPile.length){
           showError('Discard pile is empty');
           return;
       }
       var c = discardPile.pop();
       showHands;
       discardPile.[discardPile.length] = c;
       showHands();
    }
    var doDeal = function(){
        var c;
        for (i = 0; i < 7; i++){
            c = cardDeck.draw();
            if (!c){
                showError('no more cards');
                return;
            }
            hand[hand.length] = c;

           c = cardDeck.draw();
           if (!c){
                showError('no more cards');
                return;
            }
            computerHand[computerHand.length] = c;

            cardDeck.spread();
            showHands();
        }
    };
    var doOrderByRank = function(){
        cardDeck.orderByRank();
        cardDeck.spread(); // update card table
    };
    var doOrderBySuit = function(){
        cardDeck.orderBySuit();
        cardDeck.spread(); // update card table
    };
    $('#shuffler').click(doShuffle);
    $('#draw1').click(doDrawCard1);
    $('#draw2').click(doDrawCard2);
    $('#shuffleDraw').click(function(){
        doShuffle();
        doDrawCard();
    });
    $('#discard1').click(function(){
        if(!hand.length){
            showError('your hand is empty');
            return;
        }
        var c = hand.pop();
        showHands();
        discardPile.spread();
    });

    $('#discard2').click(function(){
        if(!computerHand.length){
            showError('your computer hand is empty');
            return;
        }
        var c = computerHand.pop();
        showHands();
        discardPile.spread();
    });
    $('#orderByRank').click(doOrderByRank);
    $('#orderBySuit').click(doOrderBySuit);
    $('#dealer').click(doDeal);
    $('#discard').click(doDiscard);

});
/*
// if we weren't using jquery to handle the document ready state, we would do this:
if (window.addEventListener) {
    window.addEventListener("load",initPlayingCards,false);
} else if (window.attachEvent) {
    window.attachEvent("onload",initPlayingCards);
} else {
    window.onload = function() {initPlayingCards();}
}
function initPlayingCards() {
    cardDeck = new playingCards();
}
*/
