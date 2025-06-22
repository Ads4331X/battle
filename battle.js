

class Board{
    checkmessage(){
        let message = document.getElementById('input');
        let cmds = ['/help' , '/p' , '/cd' , '/missions' , '/lv-up' , '/start' , '/battle']
        if(message.value !== ''){
            let content = document.querySelector(".content")
            let info = document.createElement("div");
            info.textContent = message.value;
            info.classList.add("border" , "rounded", "ps-3" , "mb-2");

            for(let i = 0 ; i < cmds.length ; i++){
                if (message.value.toLowerCase() === cmds[i].toLowerCase()) {
                    info.classList.add("text-primary");
                }            
            }
            content.appendChild(info);
            document.getElementById('input').value = "";
            
        }


    }
    
}

class Character{
    constructor(name , hp , att , def , lev , energylevel ){
        this.name = name;
        this.hp = hp;
        this.def = def;
        this.att = att;
        this.lev = lev;
        this.energylevel = energylevel;
    }
    levelUp(){
        this.hp += 10;
        this.def += Math.floor(Math.random() * 3) + 1 ;
        this.att += Math.floor(Math.random() * 3) + 1 ;;
        this.lev += 1;
    }


}



function submit(){
let board = new Board;
board.checkmessage();

}