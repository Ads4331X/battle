
    let input = document.getElementById('input').addEventListener("keydown" , () =>{
        if (event.key === "Enter") {
            submit();
        }
    })


let character =null;
let race = null;
let enemy;
let round;
let player_dmg;
let enemy_dmg;
let enemy_action;
let battle_ongoing = false;
let player_hp;


document.querySelector('.body').width = window.innerWidth + "px";
document.querySelector('.body').height = window.innerHeight + "px"; 

class Cmds{
    constructor(character){
        this.character = character;
    }
    handle(cmds){

        switch(cmds.toLowerCase()){
            case '/help':
                return `/help <br> <p class='text-dark'>Available Commands are:</p>
                <a href='#' class='input_focus'onclick=\"document.getElementById('input').value = '/Start';\ ">/Start</a><br>
                <a href='#' class='input_focus'onclick=\"document.getElementById('input').value = '/Cd'\">/Cd</a><br>
                <a href='#' class='input_focus'onclick=\"document.getElementById('input').value = '/Battle'\">/Battle</a><br>
                <a href='#' class='input_focus'onclick=\"document.getElementById('input').value = '/Lv-up'\">/Lv-up</a><br>
                <a href='#' class='input_focus'onclick=\"document.getElementById('input').value = '/Missions'\">/Missions</a><br>
                <a href='#' class='input_focus'onclick=\"document.getElementById('input').value = '/P'\">/P</a><br>
                <a href='#' class='input_focus'onclick=\"document.getElementById('input').value = '/Help'\">/Help</a>`;

                    
            case '/start':

                if(race === null){
                    return `/Start  <p class='text-dark'>Choose a race:</p><br>  
                <p class='text-dark'><a href='#' onclick=\"document.getElementById('input').value = '/Human'\">Human</a>&nbsp; (Initially 100HP 10ATT 10DEF 10MP)<br>
                <a href='#' onclick=\"document.getElementById('input').value = '/Demon'\">Demon</a> &nbsp;(Initially 150HP 18Att 12DEF 10MP)<br>
                <a href='#' onclick=\"document.getElementById('input').value = '/Goddess'\">Goddess</a>&nbsp; (Initially 200HP 12ATT 20DEf 14MP) <br>
                <a href='#' onclick=\"document.getElementById('input').value = '/Elves'\">Elves</a> &nbsp; (Initially 140HP 11ATT 12DEF 15MP) <br>
                <a href='#' onclick=\"document.getElementById('input').value = '/Dwarfs'\">Dwarfs</a>&nbsp;(Initially 110HP 11ATT 8Def 10MP )</p>  <br>`;
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
                        <p><strong>HP:</strong>${this.character.hp}</p>
                        <p><strong>Attack:</strong> ${this.character.att}</p>
                        <p><strong>Defense:</strong> ${this.character.def}</p>
                        <p><strong>Energy:</strong> ${this.character.energylevel}</p>
                        <p><strong>Money:</strong> $${this.character.money}</p></div>
                    `;
                } else {
                    return "You need to start your adventure first! Use <a href='#'onclick=\"document.getElementById('input').value = '/Start'\" >/start</a> to choose a race.";
                }

            case '/lv-up':

                if (this.character) {
                    const req_money = 5000;
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
                    character = new Character("Name" , 100, 10 , 10 , 1 , 10 , 100, race);
                    return "/human <br> <p class='text-success'>Race Selected as Human</p>"
                }
                else  {
                    return `<p class='text-danger'>You have already started. Your race is ${race}</p>`;
                 }           
            case '/demon':
                 if(race === null) {
                    race = "Demon";
                    character = new Character("Name" , 150, 20 , 10 , 1 , 4 , 100, race);
                    return "/demon <br> <p class='text-success'>Race Selected as Demon</p>"}
                else  return `<p class='text-danger'>You have already started. Your race is ${race}</p>`;   
            case '/goddess':
                 if(race === null) {
                    race = "Goddess";
                    character = new Character("Name" , 200, 16 , 12 , 1 , 14 , 100, race);
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
                    document.getElementById("input").value = "";
                    return "<p class='text-danger'>You Have To Create a Character first</p>";

                }

            default:
                return cmds;
                // return "<p class='text-danger'>Unknown Command. Try <a href='#'onclick=\"document.getElementById('input').value = '/Help'\">/Help</a></p>"
    
            }
        
    }
}




    
  
    
class Board {
    constructor(characterInstance) {
        this.character = characterInstance;
        this.enemy = null;
        this.currentBattleBoard = null; 
        this.originalInfoDiv = null;
    }  checkmessage(){
        let message = document.getElementById('input');
        let cmds = ['/help' , '/p' , '/cd' , '/missions' , '/lv-up' , '/start' , '/battle' , '/human' , '/demon' , '/goddess' , '/elves' , '/dwarfs'];
        if(message.value.trim() !== ''){
            let content = document.querySelector(".content")
            let info = document.createElement("div");
            info.textContent = message.value;
            info.classList.add("border" , "rounded" ,"ps-3" , "mb-2" ,  "text-primary" , "white" );

            for(let i = 0 ; i < cmds.length ; i++){
                if (message.value.toLowerCase() === cmds[i].toLowerCase()) {
                    info.classList.add("text-primary" );
                } else{
                    info.classList.add("text-dark");
                }           
            }
            
            let comand_handle = new Cmds(character);
            info.innerHTML = comand_handle.handle(message.value);
            content.appendChild(info);
            if(battle_ongoing && message.value.toLowerCase() === "/battle"){
                document.getElementById("input").value = "";
                let error = document.createElement("div");
                error.classList.add("error");
                error.innerHTML = `<p class='text-danger'>You are already in battle</p>`;
                let content = document.querySelector('.content');
                content.appendChild(error);
            }
            if (message.value.toLowerCase() === "/battle" && !battle_ongoing) {
                let board = new Board(character);
                round = 1;
                battle_ongoing = true;
                
                character.hp = character.maxhp;
                character.att = character.maxatt;
                character.def = character.def;
                character.energylevel = character.maxenergylevel;

                this.originalInfoDiv = info; 
                board.battle(round , info);

                }
            
            document.getElementById('input').value = "";
            
        }
    }

    battle(round, infoDiv) { 
        if (!this.enemy || round === 1) {
            this.enemy = new Enemy();
        }
        if(round === 1 ) { 
            character.hp = character.maxhp;
            character.energylevel = character.maxenergylevel;
        }

        let tempBattleContentDiv = document.createElement("div");
        

        tempBattleContentDiv.innerHTML = `
            <p class='text-center text-light'><strong class='h1'>Round:${round}</strong></p>
            <div class='battle_visual'>
                <div class='player text-light'>
                <p>Player</p>
                <img src='https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'>
                 <div class='player_info'>
                        <p>Players info:</p>
                        <p>HP:<span class='hp'>${character.hp}</span>/<span class='text-warning'>${character.maxhp}</span></p>
                        <P>Att:<span class='text-danger'>${character.att}</span></P>
                        <p>Def:<span class='text-info'>${character.def}</span></p>
                        <P>Energy:<span class='text-gradient'>${character.energylevel}</span></P>
                    </div></div>


                    <div class='text-center  battle_choices'> 
                    <p class='text-danger'>1.Attack</p>
                    <p class='text-primary'>2.Defend</p>
                    <P class='text-lime'>3.Sleep</P>
                    <P class='surrender-text'>4.Surrender</P>
                    <P class='text-gradient'>5.Special Move</P>
                </div>
                
                <div class='enemy text-light'>
                <p>Enemy</p>
                <img src='https://w7.pngwing.com/pngs/9/115/png-transparent-bomb-cartoon-cherry-enemy-evil-explosive-eyes-fuse-game-purple-thumbnail.png'>
                <div class='enemy_info'>
                    <p>Enemy info:</p>
                    <p>HP:<span class='enemy_hp'>${this.enemy.hp}</span>/<span class='text-warning'>${this.enemy.maxhp}</span></p> <P>Att:<span class='text-danger'>${this.enemy.att}</span></P>
                    <p>Def:<span class='text-info'>${this.enemy.def}</span></p>
                    <P>Energy:<span class='text-gradient'>${this.enemy.energylevel}</span></P>
                </div></div>
            </div><br>
            
        `; 
        
        let content = document.querySelector('.content');
        let battlelog = document.createElement("div");
        battlelog.classList.add("battlelog")

        battlelog.innerHTML = `<div class='bg-secondary rounded p-3 mt-3'><p class='h3 text-light'>Battle Log:</p></div>`

        if (this.currentBattleBoard) {
            this.currentBattleBoard.innerHTML = tempBattleContentDiv.innerHTML; 
        } else {
            this.currentBattleBoard = document.createElement("div");
            this.currentBattleBoard.classList.add("pb-2", "bg-dark", "battle" , "rounded");
            this.currentBattleBoard.innerHTML = tempBattleContentDiv.innerHTML; 
            content.appendChild(battlelog);
            infoDiv.insertAdjacentElement("afterend", this.currentBattleBoard);
        }
        this.addBattleActionButtons(this.currentBattleBoard, round, infoDiv);

        let enemy_hp = document.querySelector('.enemy_hp');
        let hp = document.querySelector('.hp');

        if(character.hp >= character.maxhp * 0.9){
            hp.style.color = "yellow";
        }
        if(character.hp <= character.maxhp * 10){
            hp.style.color = "#FF0000";
        }
        if(character.hp <= character.maxhp * 0.5){
            hp.style.color = "#E34234";
        }
        if(character.hp >= character.maxhp * 0.5){
            hp.style.color = "#FF8C00";

        }

        if(this.enemy.hp >= this.enemy.maxhp * 0.9){
            enemy_hp.style.color = "yellow";
        }
        if(this.enemy.hp <= this.enemy.maxhp * 10){
            enemy_hp.style.color = "#FF0000";
        }
        if(this.enemy.hp <= this.enemy.maxhp * 0.5){
            enemy_hp.style.color = "#E34234";
        }
        if(this.enemy.hp >= this.enemy.maxhp * 0.5){
            enemy_hp.style.color = "#FF8C00";

        }
    }

    addBattleActionButtons(battleBoardDiv, _currentRound, currentInfoDiv) {

        let existingActionDiv = battleBoardDiv.querySelector(".action-buttons-container");
        if (existingActionDiv) {
            existingActionDiv.remove();
        }

        let actionBtnDiv = document.createElement("div"); 
        actionBtnDiv.classList.add("p-3", "text-center", "action-buttons-container");

        let button_ids = ["attack", "defend", "sleep", "surrender", "special"];
        let action_buttons;

        for (let i = 0; i <= 4; i++) {

            action_buttons = document.createElement("button");
            action_buttons.classList.add("btn", "btn-info", "btn-sm", "text-light", "ms-2", "px-3", "text-center", `${button_ids[i]}`);
            if(!battle_ongoing) {
                action_buttons.classList.add("disabled");
                action_buttons.disabled = true;

            }

            if (i === 4) {
                action_buttons.classList.add("special_move_btn");
                action_buttons.textContent = "Special";
            } else {
                action_buttons.textContent = i + 1;
            }

            action_buttons.addEventListener("click", () => {
                switch (button_ids[i]) {
                    case "attack":
                        this.player_attack();
                        break;
                    case "defend":
                        this.player_defend();
                        break;
                    case "sleep":
                        this.player_sleep();
                        break;
                    case "surrender":
                        this.player_surrender();
                        break;
                    case "special":
                        this.player_special();
                        break;
                }
                 this.battle(round, currentInfoDiv);
            });
            actionBtnDiv.appendChild(action_buttons);
        }
        let content = document.querySelector('.content')

        if(this.enemy.hp <= 0){
            

            let content = document.querySelector('.content');

            
            setTimeout(() => {
                content.scrollTo({
                    top: content.scrollHeight,
                    behavior: 'smooth'
                });
            }, 10)
            

             
            let win = document.createElement("div");
            win.classList.add("rounded" , "bg-light");
            win.innerHTML = `<div class='won_info rounded w-50 pt-2 mt-2 bg-secondary'>
            <p class='win-text'><strong class='h3'>You Win</strong></p>
            <p class='text-light'><strong>Money earned:  $${character.money + 50}</strong></p>
            <div class='win_actions'>
            <button class='btn btn-success continue_battle'>Continue</button>
            <button class='btn btn-danger leave_battle' >Leave</button>
            </div></div>`;
            character.money += 50;
            content.appendChild(win);

            win.querySelector('.continue_battle').addEventListener("click" , () =>{
                round = 1;
                this.enemy = null;
                battle_ongoing = true;
                let battlelog = document.querySelector('.battlelog');
                if (battlelog) {
                    battlelog.innerHTML = `<div class='bg-secondary rounded p-3 mt-3'><p class='h3 text-light'>Battle Log:</p></div>`;
                
                }
                win.remove();

                this.battle(round , this.originalInfoDiv);
     
            })
        }
        
        if(character.hp <= 0){
            
            let lose = document.createElement("div");
            lose.classList.add("rounded" , "bg-light");
            lose.innerHTML = `<div class='bg-secondary w-50 rounded pt-2 mt-2 lose'> <p class='text-danger'><strong class='h3'>You lose</strong></p>
            <div class='lose'>
            <p class='text-light'><strong>Money earned: $${character.money + 100}</strong></p></div>
            <button class='btn btn-danger text-light battle_again' >Battle Again</button></div>`;
            character.money += 100;

            content.appendChild(lose);
            let battleagain;

            battleagain = document.querySelector('.battle_again').addEventListener("click" , () =>{
                round = 1;
                this.enemy = null;
                battle_ongoing = true;
                let battlelog = document.querySelector('.battlelog');
                if (battlelog) {
                    battlelog.innerHTML = `<div class='bg-secondary rounded p-3 mt-3'><p class='h3 text-light'>Battle Log:</p></div>`;
                
                }
                lose.remove();

                this.battle(round , this.originalInfoDiv);


            })
        }
        battleBoardDiv.appendChild(actionBtnDiv); 

    }

    battle_choices(player_action  , enemy_action){
        let current_round = round - 1;
        let player_text = '';
        let enemy_text = '';
        if(character.hp <= 0 || this.enemy.hp <= 0) {
            let content = document.querySelector('.content');
                    battle_ongoing = false;
                    setTimeout(() => {
                content.scrollTo({
                    top: content.scrollHeight,
                    behavior: 'smooth'
                });
            }, 10)
                    
                }
        switch (player_action){
            case 'attack':
                player_text = `Player has attacked and dealt ${player_dmg} dmg`;
                break;
            case 'defend':
                let dodge = Math.random(); 
                player_text = dodge > 0.5
                ? "Player has dodged"
                : `Player has defended and taken ${enemy_dmg} dmg`;
                break;
            case 'sleep':
                player_text = `Player slept and gained 4 MP`;
                break;
            case 'surrender':
                player_text = `Player has surrendered`;
                break;
            case 'special':
                player_text = (player_dmg === 0) ?
                      `Player used a special move, but it had no effect or they didn't have enough energy!` : 
                      `Player has used their energy to perform a magical attack and dealt ${player_dmg} dmg`;
                break;
            default:
                break;                
                
        }

        switch (enemy_action){
            case 'attack':
                enemy_text = `Enemy has attacked and dealt ${enemy_dmg} dmg`;
                break;
            case 'defend':
                enemy_text = `Enemy has defended and taken ${enemy_dmg} dmg`;
                break;
            case 'sleep':
                enemy_text = `Enemy slept and gained 4Mp`;
                break;
            case `special`:
                enemy_text = `Enemy has used their MP to perform magical attack to the Player and dealt ${enemy_dmg} dmg`;
                break;
            default: 
            break;
        }
        let battlelog = document.querySelector('.battlelog');
        let chosen_option = document.createElement("div");
        chosen_option.classList.add("divofchosenoption")
        chosen_option.innerHTML = `<div class='d-grid chosen_option bg-secondary text-light rounded'>
        <p><strong>Round: ${current_round}</strong></p>
        <p>${player_text}</p>
        <p>${enemy_text}</p>
        <div class='battle_hp_detail'>
        <p><strong>Player HP:</strong>${character.hp}</p>
        <p><strong>Enemy HP:</strong>${this.enemy.hp}</p>
        </div></div>`;
        battlelog.appendChild(chosen_option);
                
    }

        player_attack(){

            let player_action = `attack`;
            let player_att = character.att; 
            let enemy_def = this.enemy.def;
            let random = Math.random() * 5;
            player_dmg = Math.floor(Math.max(0, player_att - enemy_def +random));
            this.enemy.hp -= player_dmg;
            this.Move_of_enemy( player_action)
        }

        player_defend(){
            let player_action = `defend`;
            let dodge = Math.random(); 
            let defenseFactor = character.def / (character.def + 100); 
            let damageTaken = Math.floor(enemy_dmg * (1 - defenseFactor));
            player_dmg = dodge > 0.6 ? 0 : damageTaken;
            this.Move_of_enemy( player_action)
            
            
        }

        player_sleep(){
            let player_action = `sleep`;
            character.energylevel += 4;
            this.Move_of_enemy(player_action);

        }

        player_surrender(){
            let player_action = 'surrender';
            character.hp = 0;
            battle_ongoing = false;
            this.Move_of_enemy(player_action);
        }

        player_special(){
            let player_action = 'special';
            let MP = character.energylevel;
            let MPcost;
            if(race.toLowerCase() === "human"){
                MPcost = 10;
                if(MP < MPcost) {player_dmg = 0;}
                else{
                     this.enemy.enemysleep = 4; // Sets sleep to 4
        character.energylevel -= MPcost;
        this.enemy.enemysleep = 0;
                }
            }

            if(race.toLowerCase() === "demon"){
                MPcost = 12;
                if(MP < MPcost) {player_dmg = 0;}
                else{
                    this.enemy.player_att_buff = 4;
                    character.energylevel -= MPcost;
                }

            }
            // if(MP < 10) {player_dmg = 0;}
            // else{
            //     player_dmg = Math.floor(Math.max(0, character.att - this.enemy.def +(Math.random() * 8)) *  (MP / 10));
            //     this.enemy.hp -= player_dmg;
            //     character.energylevel = 0;
            // }
            this.handleenemymove(player_action);
        }

        handleenemymove(player_action){
            let normalatt = character.maxatt;
            if(this.enemy.enemysleep > 0 ){
                this.enemyChoise("sleep", player_action);
                this.enemy.enemysleep--;
            } else {
                this.Move_of_enemy(player_action); 
            }

            if(this.character.player_att_buff > 0){
                this.character.att = normalatt * 3; 
            } else {
                this.character.att = normalatt; 
            }
            if (this.character.player_att_buff > 0 && player_action === 'special' && race.toLowerCase() === "demon") {
                this.character.player_att_buff--;
            }
        }


        Move_of_enemy( player_action){
            let enemy_options= ['attack' , 'defend' , 'sleep' , 'special'];
            let enemy_choise = enemy_options[Math.floor(Math.random() * enemy_options.length)];

            if(player_action === "special" && race === "human" && character.energylevel >= 10) {
                if(this.enemy.enemysleep >= 0){
                    this.enemyChoise("sleep" , player_action);
                    this.enemy.enemysleep--;
                }

                
            }
            this.enemyChoise(enemy_choise, player_action);

        }

        enemyChoise(enemy_choise, player_action){
            console.log(enemy_choise);
            switch (enemy_choise){
                case 'attack':
                    let enemy_att = this.enemy.att;
                    let player_def = character.def;
                    enemy_dmg = Math.floor(Math.max(0, enemy_att - player_def + (Math.random() * 5)));
                    character.hp -=   enemy_dmg; 
                    this.enemy_action = "attack";
                    break;

                case 'defend':
                    let defenseFactor = character.def / (character.def + 100); 
                    let damageTaken = Math.floor(player_dmg * (1 - defenseFactor));
                    player_dmg = damageTaken;
                    if(isNaN(player_dmg )|| isNaN(damageTaken) ){
                        player_dmg = 0;
                    }
                    this.enemy.hp -= player_dmg;
                    this.enemy_action = "defend";
                    break;

                case 'sleep':
                    this.enemy_action = 'sleep';
                    this.enemy.energylevel += 4;
                    break;

                case 'special':
                    let MP = this.enemy.energylevel;
                    if(MP < 10) {enemy_dmg = 0;}
                    else{
                    enemy_dmg = Math.floor(Math.max(0, this.enemy.att - character.def +(Math.random() * 6)) *  (MP / 10));
                    character.hp -= enemy_dmg;
                    this.enemy.energylevel = 0;
                    }
                    this.enemy_action = "special";
                    break;
                
            }

            round++;
            this.battle_choices(player_action, this.enemy_action);
        }





    
}    
             
class Enemy{
    constructor(){
        let eny_name= ["Xyz" , "Abc" , "Pan" , "Doe" , "QBee" , "li-li" , "wine" , "Pipec"];
        this.name = eny_name[Math.floor(Math.random() * eny_name.length)];
        const min_hp = 50;
        const max_hp = 100;
        this.hp = Math.floor(Math.random() * (max_hp -min_hp) + min_hp);
        this.maxhp = this.hp;
        const min_att = 8;
        const max_att = 20;
        this.att = Math.floor(Math.random() * (max_att - min_att) + min_att);
        const min_def = 6;
        const max_def = 12;
        this.def = Math.floor(Math.random() * (max_def - min_def) + min_def);
        this.energylevel = 10;
        this.enemysleep = 0;
        this.player_att_buff = 0;

}

}



class Character{
    constructor(name , hp , att , def , lev , energylevel , money , race ){
        this.name = name;
        this.hp = hp;
        this.maxhp = hp;
        this.def = def;
        this.att = att;
        this.lev = lev;
        this.maxatt = att;
        this.maxdef = def;
        this.energylevel = energylevel;
        this.maxenergylevel = energylevel;
        this.money = money;
        this.race = race
    }
    levelUp(){
        this.lev += 1;
        this.hp += 10;
        this.maxhp += 10;
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