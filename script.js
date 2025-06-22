
let level = document.querySelector('.level');
let game_board = document.querySelector('.game_board');

                
class Game{
    constructor(totalcard){
        this.totalcard = totalcard;
        this.cards = [];
        this.cardval = this.suffle();
        this.game_board();

        game_board.addEventListener('cardClicked' , (event) => {

            this.handleCardClick(event.detail); 
        })

        this.canclick = true;
        this.match = 0;
        this.flipped = [];

    }

    suffle(){
        const symbols = [
    '🍎', '🐶', '🎩', '🎲', '🚗', '🌟', '🎈', '🐸',
    '🍕', '🎸', '🌈', '🚲', '🚀', '👑', '🌵', '🌻' ];
    let pair = this.totalcard /2;
    let used_symbols = symbols.slice(0 , pair);
    let allval = [...used_symbols , ...used_symbols];
    allval.sort(() => Math.random() - 0.5); 
    return allval


    }
        game_board(){
        let col;
        if(this.totalcard === 10 || this.totalcard === 20)  col = 5;
        if(this.totalcard === 30) col = 6
            
        game_board.classList.remove('d-none');
        game_board.style.gridTemplateColumns = `repeat(${col}, 100px)`; 
        game_board.style.gap = '5px';
        for(let i = 0 ; i < this.totalcard ; i++){
            let card_value = this.cardval[i];
            const id = `card-${i}`;
            let card = new cards(card_value , id);
            this.cards.push(card);
            game_board.appendChild(card.create_div);
        }
    }

handleCardClick(clickedCard) {
    console.log("Game board received cardClicked event!");
    if(!this.canclick) return ;
    
    
}

}

class cards{
    constructor(val , id){
        this.val = val;
        this.id = id;
        this.flipped = false;
        this.matched = false;
        this.create_div = this.creatediv();
    }


    creatediv(){

        let card = document.createElement("div");
        card.classList.add("card");
        card.dataset.cardId = this.id;
        
        let inside = document.createElement("div");
        inside.textContent = "?";
        inside.classList.add(
                    "inside" , 
                    "text-white" , 
                    "d-flex" , 
                    "justify-content-center" , 
                    "align-items-center" , 
                    "align-self-center" ,
                    "bg-success" , 
                    "border" , 
                    "rounded" 
                  );
        let reveal = document.createElement("div");
        reveal.textContent = this.val;
        reveal.classList.add("reveal");
        reveal.style.display = "none";

        card.addEventListener('click' , ()=>{

            let event = new CustomEvent('cardClicked', {detail:this , bubbles: true });
            card.dispatchEvent(event)
        })

        card.appendChild(inside);
        card.appendChild(reveal);

        return card; 
    }

    flip(){
        if(this.flipped || this.matched) return ;
        this.flipped = true;
        this.create_div.querySelector('.inside').style.display = 'none';
        this.create_div.querySelector('.reveal').style.display = "flex";


    }
}

function card(num){
    level.classList.remove('d-flex');
    level.classList.add('d-none');
    game = new Game(num)
}

function easy(){
    card(10);
    
}

function medium(){
    card(20)

}

function hard(){
    card(30)
}