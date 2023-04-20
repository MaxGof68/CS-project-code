class Deck {
    constructor() { 
      
      //array of suits, faces and an empty cards array.
         this.suits = ["S", "H", "C", "D"]
         this.faces = ["A",2,3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"]
         this.cards = []
         //merge array suits and faces into cards array
         for (let suit of this.suits) {
            for  (let face of this.faces) {
                this.cards.push(suit+"-"+face)
            }
          }
          this.shuffle(this.cards)
          this.next_card = 51
    }
    shuffle(cards) {
      //loops through each card
        for (var i = cards.length - 1; i > 0; i--) {
          //picks a random card
            var j = Math.floor(Math.random() * (i + 1));
            //swaps the cards
            var temp = cards[i];
            cards[i] = cards[j];
            cards[j] = temp;
      }
    }
    deal_card() {
        this.next_card -= 1;
        return this.cards[this.next_card + 1]
    }

}

class Blackjack {

    constructor(){
        this.deck = new Deck()
        this.set_card_values()
        this.player_score = 0
        this.dealer_score = 0
        this.player_hand = []
        this.dealer_hand = []
    }

    set_card_values(cards) {
      //splits the cards in the array, e.g. C-4 into (C , 4)
      let data = cards?.split("-");
      //picks the second index as the value, e.g. 4
      let value = data[1];

      //if not a number return 10
      if (isNaN(value)) {
        //if value is "A" return 1
        if (value =="A") {
          return 1
        }
        return 10
      }
      return parseInt(value);
    }

      card_img() {

        //create element <img>
        let cardimg = document.createElement("img");
        // sets source to "./cardimages", select the card name, adds ".png" to the end
        cardimg.src = "./cardimages/" + cards + ".png";
      }

      hit(hand) {
        let card = this.deck.deal_card();
        hand.push(card);
      }

      hitdealer() {
        this.hit(this.dealer_hand);
        var p = document.getElementById("dealers_cards")
        p.innerHTML += this.card_img(this.dealerhand[this.dealer_hand.length-1])
      }

      hitplayer() {
        this.hit(this.player_hand);
        var p = document.getElementById("players_cards")
        p.innerHTML += this.card_img(this.player_hand[this.player_hand.length-1])
      }

      play() {
        console.log('reset table');
        this.reset_table();
        console.log('deal hand');
        this.deal_hand();
        console.log('display deal');
        this.display_hand();      
        console.log('check player');
      }

      reset_table() {
        var d = document.getElementById('players_cards')
        var p = document.getElementById('dealers_cards');
        p.innerHTML = "";
        d.innerHTML = "";
      }

      deal_hand() {
        this.players_hand=[]
        this.dealers_hand=[]        
        this.players_hand.push(this.deck.deal_card())
        this.dealers_hand.push(this.deck.deal_card())
        this.players_hand.push(this.deck.deal_card())
        this.dealers_hand.push(this.deck.deal_card())
        //this.toggleButtons() ; 
      }
      
      display_hand() {
        var p = document.getElementById('players_cards')
        p.innerHTML += this.card_img(this.players_hand[0])
        p.innerHTML += this.card_img(this.players_hand[1])
        var d = document.getElementById('dealers_cards')
        d.innerHTML += this.card_img(this.dealers_hand[0])
      }

      aces(hand) {
        //creates variable count_of_aces
        let count_of_aces = 0;
        //loops through each card in the hand
        for (let card of hand) {
          //if the face on a card is "A" add 1 to count_of_aces
          if (card.face=="A") {
            count_of_aces += 1;
          }
        }
        return (count_of_aces > 0)
      }
  
  
      evaluate_hand(hand) {
       //creates variable total and results array
        let total = 0
        let results = []
        //loops through each card in the hand
        for (let card of hand) {
          //add the value of each card to the total
          total += card.value
        }
        //push the value of total into the results array
        results.push(total);
        //if there are any aces in the hand then add 10 to the total
        if (this.aces(hand)) {
          results.push(total+10)
        }
        return results
      }    
  
  
      best_hand(hand) {
        //create best variable and set it to -1
        let best = -1;
        //create hands variable and import the hand variable from the evaluate_hand method
        let hands = this.evaluate_hand(hand)
        //loop through each hand in the hands variable
        for (let hand of hands) {
          //if the hand is bigger than best(-1) and smaller than 22, set best to the value of the hand
          if (hand> best && hand < 22) {
            best = hand
            //else best stays at -1
          }
        }
        return best;
      }

      has_blackjack(hand) {
        //if the hand value is 21 and has only 2 cards the it is blackjack
        return this.best_hand(hand) == 21 &&  hand.length == 2;
    }

    is_bust(hand) {
      //if the hand value is -1 then the had is bust
      return this.best_hand(hand) == -1;
    }

    not_bust(hand) {
      //if the hand does not equal -1 then the hand is not bust
      return this.best_hand(hand) != -1;
    }

    check_player() {
      if (this.has_blackjack(this.players_hand)) {
          //this.message('BlackJack!!')
          this.toggleButtons();     
      }
      if (this.is_bust(this.players_hand)) {
          //this.message('You Bust!!')                  
      this.toggleButtons();
      }
      if(this.best_hand(this.players_hand)==21) {
          this.toggleButtons();
      }
  }

  toggleButtons() {
    var b = document.getElementsByTagName("button")
          b[0].classList.toggle('hidden');
          b[1].classList.toggle('hidden');
          b[2].classList.toggle('hidden');
  }

  whoWon() {
    if(this.best_hand(this.dealers_hand) < this.best_hand(this.players_hand)) {
      //this.message("Player Wins");
      console.log('Player Wins');
  }
  else if(this.best_hand(this.dealers_hand) > this.best_hand(this.players_hand)) {
      //this.message("Dealer Wins");
      console.log('Dealer Wins');
  } else {
      //this.message("Push");
      console.log('Push');
  }
  this.toggleButtons();
  }

  dealersTurn() {
    //variable p is set to the value of "dealers_cards"
    var p = document.getElementById('dealers_cards')
    //the card in index 1 in the dealers hand is shown
    p.innerHTML +=this.card_img(this.dealers_hand[1]);
    //check if the dealer and player are bust
    while (this.not_bust(this.players_hand) && (this.not_bust(this.dealers_hand))) { 
      //if no-one is bust, dealers hand is checked with has_blackjack method
        if(this.has_blackjack(this.dealers_hand)) {
          //if dealer has blackjack console.log "blackjack" and stop method
            console.log("Blackjack!")
            break;
        }
        //if the value of the dealers hand is lower than 17 
        if(this.best_hand(this.dealers_hand)<17) {
          //the dealer hits for another card
            this.hitDealer();
            console.log(`Dealer's Hand: ${this.best_hand(this.dealers_hand, "player")}`);
        }
        //check if the dealer is bust
        if(this.is_bust(this.dealers_hand)) {
            //if dealer is bust, reset game
            console.log('Dealer Busts.  You Win!');
            this.toggleButtons();
            //if the value of the dealers hand is equal to or more than 17 
        } else if(this.best_hand(this.dealers_hand)>=17) {
            //run  the method that decides who wins
            console.log(`Dealer Stands on ${this.best_hand(this.dealers_hand)}`);
            this.whoWon();                
            break;
        } else {
        }

    }
}

      myFunction() {
        var x = document.getElementById("buttondeal");
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
      }
      
          
}

function start() {
  game = new Blackjack()
  game.play()
}

