class Deck {
    constructor() { 
      
         this.suits = ["S", "H", "C", "D"]
         this.faces = ["A",2,3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"]
         this.cards = []
         for (let suit of this.suits) {
            for  (let face of this.faces) {
                this.cards.push({ suit: suit, face: face })
            }
          }
          this.shuffle(this.cards)
          this.next_card = 51
    }
    shuffle(cards) {
        for (var i = cards.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
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

class blackjack {

    constructor(){
        this.deck = new Deck()
        this.set_card_values()
        this.player_score = 0
        this.dealer_score = 0
        this.player_hand = []
        this.dealer_hand = []
    }

    set_card_values() {
    
        for (let card of this.deck.cards) {
          switch(card.face) {
            case 'A':
              card.value = 1;
              break;
            case 'K':
            case 'Q':
            case 'J':
            case '10':
              card.value = 10;
              break;
            default:
              card.value = card.face;
          }
        }
      }
/*
      card_img() {

        let cardimg = document.createElement("img");
        cardimg.src = 
      }
*/
      hit(hand) {
        let card = this.deck.deal_card();
        hand.push(card);
      }
/*
      hitdealer() {
        this.hit(this.dealer_hand);
        var p = document.getElementById("dealer_cards")
        p.innerHTML += this.
      }
*/
}

newdeck = new Deck()
console.log(newdeck)

