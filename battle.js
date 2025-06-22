let character = null;
let race = null;


class Cmds{
    constructor(character){
        this.character = character;
    }
    handle(cmds){

        switch(cmds.toLowerCase()){
            case '/help':
                return "/help <br> <p class='text-dark'>Available Commands are:</p><br>" +
                "<a href='#' onclick=\"document.getElementById('input').value = '/Start'\">/Start</a><br>" +
                "<a href='#' onclick=\"document.getElementById('input').value = '/Cd'\">/Cd</a><br>" +
                "<a href='#' onclick=\"document.getElementById('input').value = '/Battle'\">/Battle</a><br>" +
                "<a href='#' onclick=\"document.getElementById('input').value = '/Lv-up'\">/Lv-up</a><br>" +
                "<a href='#' onclick=\"document.getElementById('input').value = '/Missions'\">/Missions</a><br>" +
                "<a href='#' onclick=\"document.getElementById('input').value = '/P'\">/P</a><br>" +
                "<a href='#' onclick=\"document.getElementById('input').value = '/Help'\">/Help</a>";
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
                return "Time of Cooldowns:";
            case '/p':
                return "Profile";

            case '/human':
                if(race === null) {
                    race = "Human";
                    return "/human <br> <p class='text-success'>Race Selected as Human</p>"}
                else  {
                    return `<p class='text-danger'>You have already started. Your race is ${race}</p>`;
                 }           
            case '/demon':
                 if(race === null) {
                    race = "Demon";
                    return "/demon <br> <p class='text-success'>Race Selected as Demon</p>"}
                else  return `<p class='text-danger'>You have already started. Your race is ${race}</p>`;   
            case '/goddess':
                 if(race === null) {
                    race = "Goddess";
                    return "/goddess <br> <p class='text-success'>Race Selected as Goddess</p>"}
                else  return `<p class='text-danger'>You have already started. Your race is ${race}</p>`;   
            case '/elves':
                 if(race === null) {
                    race = "Elves";
                    return "/elves <br> <p class='text-success'>Race Selected as Elves</p>"}
                else  return `<p class='text-danger'>You have already started. Your race is ${race}</p>`;   
            case '/Dwarfs':
                 if(race === null) {
                    race = "Dwarfs";
                    return "/dwarfs <br> <p class='text-success'>Race Selected as Dwarfs</p>"}
                else  return `<p class='text-danger'>You have already started. Your race is ${race}</p>`;   

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
        if(message.value !== ''){
            let content = document.querySelector(".content")
            let info = document.createElement("div");
            info.textContent = message.value;
            info.classList.add("border" , "rounded", "ps-3" , "mb-2" );

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
        this.att += Math.floor(Math.random() * 3) + 1 ;
        this.lev += 1;
    }


}



function submit(){
let board = new Board;
board.checkmessage();

}