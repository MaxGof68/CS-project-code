class Deck {
    constructor() { 
      
         this.suits = ["♠", "♥", "♣", "♦"]
         this.faces = ["A",2,3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"]
         this.cards = []
         for (let suit of this.suits) {
            for  (let face of this.faces) {
                this.cards.push({ suit: suit, face: face })
            }
          }
          this.shuffle(this.cards)
    }
    shuffle(cards) {
        for (var i = cards.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = cards[i];
            cards[i] = cards[j];
            cards[j] = temp;
    }
    
    }
    deal

}

newdeck = new Deck()
console.log(newdeck)

