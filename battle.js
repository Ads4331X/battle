let character = null;
let race = null;


class Cmds{
    constructor(character){
        this.character = character;
    }
    handle(cmds){

        switch(cmds.toLowerCase()){
            case '/help':
                return `/help <br> <p class='text-dark'>Available Commands are:</p>
                <a href='#' onclick=\"document.getElementById('input').value = '/Start'\">/Start</a><br>
                <a href='#' onclick=\"document.getElementById('input').value = '/Cd'\">/Cd</a><br>
                <a href='#' onclick=\"document.getElementById('input').value = '/Battle'\">/Battle</a><br>
                <a href='#' onclick=\"document.getElementById('input').value = '/Lv-up'\">/Lv-up</a><br>
                <a href='#' onclick=\"document.getElementById('input').value = '/Missions'\">/Missions</a><br>
                <a href='#' onclick=\"document.getElementById('input').value = '/P'\">/P</a><br>
                <a href='#' onclick=\"document.getElementById('input').value = '/Help'\">/Help</a>`;
            case '/start':

                if(race === null){
                    return "/Start" + "<p class='text-dark'>Choose a race:</p><br>" + 
                "<a href='#' onclick=\"document.getElementById('input').value = '/Human'\">Human</a> <br>" + 
                "<a href='#' onclick=\"document.getElementById('input').value = '/Demon'\">Demon</a> <br>" +
                "<a href='#' onclick=\"document.getElementById('input').value = '/Goddess'\">Goddess</a> <br>" +
                "<a href='#' onclick=\"document.getElementById('input').value = '/Elves'\">Elves</a> <br>" +
                "<a href='#' onclick=\"document.getElementById('input').value = '/Dwarfs'\">Dwarfs</a> <br>";
                }else{
                    return `<p class='text-danger'>You have already started. Your race is ${race}</p>`;
                    
                }
    
            case '/cd':
                return "<p>Time of Cooldowns:</p>" + "";
            case '/p':
                
                if (this.character) {
                    return `
                        <div class='text-dark border-0 rounded p-0 mt-1 profile-stats-block'>
                        <h3>Player Profile</h3>
                        <p><strong>Name:</strong> ${this.character.name}</p>
                        <p><strong>Level:</strong> ${this.character.lev}<strong class='race_space'>Race:</strong> ${race}</p>
                        <p><strong>HP:</strong> ${this.character.hp}</p>
                        <p><strong>Attack:</strong> ${this.character.att}</p>
                        <p><strong>Defense:</strong> ${this.character.def}</p>
                        <p><strong>Energy:</strong> ${this.character.energylevel}</p>
                        <p><strong>Money:</strong> ${this.character.money}</p></div>
                    `;
                } else {
                    return "You need to start your adventure first! Use <a href='#'onclick=\"document.getElementById('input').value = '/Start'\" >/start</a> to choose a race.";
                }

            case '/lv-up':

                if (this.character) {
                    const req_money = 1000;
                    if(this.character.money > req_money){
                        let old_lev = this.character.lev;
                        let old_hp = this.character.hp;
                        let old_att = this.character.att;
                        let old_def = this.character.def;

                        this.character.levelUp();
                        this.character.money -= req_money;
                        return `
                        <div class='level_up text-secondary'>
                        <p><strong class='text-dark'>Level Up:</strong></p>
                        <p>Level: ${old_lev} => ${this.character.lev}</p>
                        <p>HP: ${old_hp} => ${this.character.hp}</p>
                        <p>Att: ${old_att} => ${this.character.att}</p>
                        <p>Def: ${old_def} => ${this.character.def}</p>
                        <p >Money:${this.character.money}</p>
                        </div>`;

                    }
                    else{
                        return `<p class='text-danger'>You don't have enough money to level Up your character. You have Rs.${this.character.money}. you need Rs.${req_money - this.character.money} more.</p>`;
                    }
                }else{
                    return "You need to start your adventure first! Use <a href='#'onclick=\"document.getElementById('input').value = '/Start'\" >/start</a> to choose a race.";
                }


                

            case '/human':
                if(race === null) {
                    race = "Human";
                    character = new Character("Name" , 100, 10 , 10 , 1 , 8 , 100, race);
                    return "/human <br> <p class='text-success'>Race Selected as Human</p>"
                }
                else  {
                    return `<p class='text-danger'>You have already started. Your race is ${race}</p>`;
                 }           
            case '/demon':
                 if(race === null) {
                    race = "Demon";
                    character = new Character("Name" , 150, 18 , 6 , 1 , 4 , 100, race);
                    return "/demon <br> <p class='text-success'>Race Selected as Demon</p>"}
                else  return `<p class='text-danger'>You have already started. Your race is ${race}</p>`;   
            case '/goddess':
                 if(race === null) {
                    race = "Goddess";
                    character = new Character("Name" , 200, 4 , 8 , 1 , 14 , 100, race);
                    return "/goddess <br> <p class='text-success'>Race Selected as Goddess</p>"}
                else  return `<p class='text-danger'>You have already started. Your race is ${race}</p>`;   
            case '/elves':
                 if(race === null) {
                    race = "Elves";
                    character = new Character("Name" , 150, 14 , 14 , 1 , 20 , 100, race)
                    return "/elves <br> <p class='text-success'>Race Selected as Elves</p>"}
                else  return `<p class='text-danger'>You have already started. Your race is ${race}</p>`;   
            case '/dwarfs':
                if(race === null) {
                    race = "Dwarfs";
                    character = new Character("Name" , 120, 12 , 18 , 1 , 14 , 100, race)
                    return "/dwarfs <br> <p class='text-success'>Race Selected as Dwarfs</p>";
                }
                else  return `<p class='text-danger'>You have already started. Your race is ${race}</p>`;   
            
            case '/battle':
                if(!character) {
                    return "<p class='text-danger'>You Have To Create a Character first</p>"
                }
                let round = 0;
                let enemy = new Enemy()
                while(character.hp > 0 && enemy.hp > 0){
                    round++;
                    let battle = document.querySelector('.battle');
                    let battle_board = document.createElement("div");
                    battle_board.classList.add("bg-secondary" , "w-25" , "h-25" , "pb-2" );
                    let action_buttons = document.createElement("button");
                    action_buttons.classList.add("btn" , "btn-info" , "btn-sm" , "text-light");
                    battle_board.innerHTML = "1";
                    action_buttons.innerHTML = 1;



                    battle.appendChild(battle_board);
                    battle_board.appendChild(action_buttons);
                     
                                        character.hp = 0;
                }
            default:
                return cmds;
                // return "<p class='text-danger'>Unknown Command. Try <a href='#'onclick=\"document.getElementById('input').value = '/Help'\">/Help</a></p>"
        }
    }
}



class Board{
    checkmessage(){
        let message = document.getElementById('input');
        let cmds = ['/help' , '/p' , '/cd' , '/missions' , '/lv-up' , '/start' , '/battle' , '/human' , '/demon' , '/goddess' , '/elves' , '/dwarfs'];
        if(message.value.trim() !== ''){
            let content = document.querySelector(".content")
            let info = document.createElement("div");
            info.textContent = message.value;
            info.classList.add("border" , "rounded" ,"ps-3" , "mb-2" ,  "text-primary" );

            for(let i = 0 ; i < cmds.length ; i++){
                if (message.value.toLowerCase() === cmds[i].toLowerCase()) {
                    info.classList.add("text-primary" );
                }            
            }
            let comand_handle = new Cmds(character);
            info.innerHTML = comand_handle.handle(message.value);
            content.appendChild(info);
            document.getElementById('input').value = "";
            
        }


    }
    
}

class Enemy{
    constructor(){
        let eny_name= ["Xyz" , "Abc" , "Pan" , "Doe" , "QBee" , "li-li" , "wine" , "Pipec"];
        this.name = eny_name[Math.floor(Math.random() * eny_name.length)];
        const min_hp = 50;
        const max_hp = 1000;
        this.hp = Math.floor(Math.random() * (max_hp -min_hp) + min_hp);
        const min_att = 8;
        const max_att = 20;
        this.att = Math.floor(Math.random() * (max_att - min_att) + min_att);
        const min_def = 6;
        const max_def = 12;
        this.def = Math.floor(Math.random() * (max_def - min_def) + min_def);
        this.energylevel = 10;

}

}



class Character{
    constructor(name , hp , att , def , lev , energylevel , money , race ){
        this.name = name;
        this.hp = hp;
        this.def = def;
        this.att = att;
        this.lev = lev;
        this.energylevel = energylevel;
        this.money = money;
        this.race = race
    }
    levelUp(){
        this.lev += 1;
        this.hp += 10;
        this.def += Math.floor(Math.random() * 3) + 1 ;
        this.att += Math.floor(Math.random() * 3) + 1 ;
    }


}



function submit(){
let board = new Board;
board.checkmessage();
let scrollbottom = document.querySelector('.content');
scrollbottom.scrollTop = scrollbottom.scrollHeight;

}