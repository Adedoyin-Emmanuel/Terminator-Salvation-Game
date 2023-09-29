
//RAW FILE OF TERMINATOR SALVATION 
//PRODUCED BY EMMYSOFT GAMES EG GAMES


const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//initialize some variables for the game
var animateId;
var player;
var tank;
var tiles;
var groundY;
var gameSpeed = 15;
var backgroundSpeed = Math.floor(gameSpeed/3);
var backgroundImageWidth = 990;
var backgroundImage = new Image();
backgroundImage.src = "sky_background_mountains.png";
var backgroundX = 0;
var backgroundX2 = backgroundImageWidth;
var enemies;
var worldSpeed = 0;
var keyDown = false;
var keyUp = false;
var movingRight = false;
var movingLeft = false;
var grass = new Image();
grass.src = "grassBackground.png";
var grassBackgroundWidth = 4171;
var grassBackgroundX = 0;
var grassBackgroundX2 = grassBackgroundWidth;
var bullets;
var planes;
var planesRandomFrame = 0;
var birds;
var lifeBar;
var birdsRandomFrame = 50;
var house = new Image();
house.png = "house.png";
var grassMonsters;
var ravens;
var shootingValue = 73;
var explosions;
var hoverBoard;
var grassBackgroundSpeed = Math.floor(gameSpeed);
var playerCollideHoverBoard;
var msgs=[];
var powerUps; 
var score=0;
var playerLogo;
var playingGame = false;
var bgLevel=1;
var enemyLifeBar;
var randomSpeed=200;
var onGameGui=true;
//this variable would be set to true when the monsters attack the player
var playerHarmed=false;
var shot=false;
var scoreBox=document.getElementById("scoreBox");
var enemyKilled=0;
var ENEMY_STATS_INFO;
var playerLifeState="Active..";
var BULLET_POWERUP_SPEED=gameSpeed*randomNumber(7,5);
//create the highscore variable

let highScore = localStorage.getItem("TerminatorHighScore") || 0;
let highScoreMsg = "Your HighScore Is " + highScore;
let brokenHighScore=false;
//create a function to change the highscore when the user sets a new highscore
function changeHighScore() {
    if (score > localStorage.getItem("TerminatorHighScore")) {
        brokenHighScore=true;
        localStorage.setItem("TerminatorHighScore", score);
        highScore = score;
        highScoreMsg = "Your Current HighScore Is " + highScore;
    }
}

class PlayerStats{
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.image=new Image();
        this.image.src="playerStats.png";


        //draw the stats image
        this.draw=()=>{
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
        }

        //create the update function
        this.update=()=>{
            this.draw();
        }
    }
}

var playerStats=new PlayerStats(innerWidth-400,5,400,100);

class PlayerStatsInfo{
    constructor(text,color,y){
        this.text=text;
        this.color=color;
        this.x=playerStats.x+200;
        this.y=y;

        this.draw=()=>{
            ctx.save();
            ctx.font = "20px Comic Sans MS";
            ctx.textAlign="center";
            ctx.fillStyle=this.color;
            ctx.fillText(this.text,this.x,this.y);
            ctx.restore();
        };


        this.update=()=>{
            this.draw();
            //this.text="Enemies Shot: "+enemyKilled;
        }
    }
}

//ENEMY_STATS_INFO=new PlayerStatsInfo("Enemies Shot: "+enemyKilled,"lime");
class GAME_LEVEL{
    constructor(score){
    //returns an error if the score is not defined
    if(typeof score==undefined || typeof score==null || typeof score==""){
        throw new Error("Score Is Not Defined");
    }

    this.score=score;
    this.allLevels=12;
    this.playing=false;
    this.playingLevelOne=false;
    this.playingLevelTwo=false;
    this.playingLevelThree=false;
    this.playingLevelFour=false;
    this.playingLevelFive=false;
    this.playingLevelSix=false;
    this.playingLevelSeven=false;
    this.playingLevelEight=false;
    this.playingLevelNine=false;
    this.playingLevelTen=false;
    this.playingLevelEleven=false;
    this.playingLevelTwelve=false;
    this.nextLevel=undefined;
    this.gameEnd=false;
    this.nextLevelCheck=false;
    this.totalBackground=12;
    this.defaultBackground=1;
    this.currentBackground=2;
    this.currentLevel=undefined;
    this.currentMessage=false;
    this.messageVelocity={dx:5,dy:5};
    this.nextMessagePush=`Welcome To ${this.nextLevel} Try To Survive The Aliens...`;
    this.nextLevelNumber=1;
    this.gameSpeed=gameSpeed;
    this.worldFrame=0;
    this.randomFrame=randomNumber(200,100);
    this.gameType={
        easy:false,
        normal:false,
        hard:false
    };


    this.checkScore=(score)=>{
       if(score>200){
        //if the score is greater than 200 then the next level is level 2
          this.nextLevelNumber=2;
          this.nextLevel=2;
       }

       if(score>400){
          this.nextLevelNumber=3;
          this.nextLevel=3;
       }
    }

    //create the method that proceed the next level


//NOTE A FLAG IS SIMPLY A BOOLEAN VALUE THAT CHANGES OVER TIME TO CREATE MANIPULATION OF SOME EVENTS IN THIS GAME 

    switch(this.currentLevel){
        case 1:
        //level one is very simple and easy
        //the game speed is 10
        this.gameSpeed=10;
        //set the flag to true
        this.playingLevelOne=true;

        //the current game background is the first background
        this.currentBackground=1;

        //set the game type to easy
        this.gameType.easy=true;

            break;
        case 2:
        //increase the game speed
        this.gameSpeed=12;
        //change the flag
        this.playingLevelTwo=true;
        //change the game background
        this.currentBackground=2;
        //define the game type to tell the user
        this.gameType.easy=true;
            break;
        case 3:
        //increase the game speed
        this.gameSpeed=13;
        //change the current background
        this.currentBackground=3;

        //change the flag
        this.playingLevelThree=true;
        //define the game type and render it to the user
        this.gameType.easy=true;
            break;
        case 4:
        //increment the game speed
        this.gameSpeed=14;
        //change the current game background
        this.currentBackground=4;
        //change the flag
        this.playingLevelFour=true;
        //define the game leve to render to the user
        this.gameType.easy=true;
            break;
        case 5:
        //increment the game speed
        this.gameSpeed=15;
        //change the current game background
        this.currentBackground=5;
        //change the flag
        this.playingLevelFive=true;
        //define the game leve to render to the user
        this.gameType.normal=true;
            break;
        case 6:
        //increment the game speed
        this.gameSpeed=16;
        //change the current game background
        this.currentBackground=6;
        //change the flag
        this.playingLevelSix=true;
        //define the game leve to render to the user
        this.gameType.normal=true;
            break;
        case 7:
        //increment the game speed
        this.gameSpeed=16;
        //change the current game background
        this.currentBackground=7;
        //change the flag
        this.playingLevelSeven=true;
        //define the game leve to render to the user
        this.gameType.normal=true;
            break;
        case 8:
        //increment the game speed
        this.gameSpeed=17;
        //change the current game background
        this.currentBackground=8;
        //change the flag
        this.playingLevelEight=true;
        //define the game leve to render to the user
        this.gameType.normal=true;
            break;
        case 9:
        //increment the game speed
        this.gameSpeed=18;
        //change the current game background
        this.currentBackground=9;
        //change the flag
        this.playingLevelNine=true;
        //define the game leve to render to the user
        this.gameType.hard=true;
            break;
        case 10:
        //increment the game speed
        this.gameSpeed=19;
        //change the current game background
        this.currentBackground=10;
        //change the flag
        this.playingLevelTen=true;
        //define the game leve to render to the user
        this.gameType.hard=true;
            break;
        case 11:
        //increment the game speed
        this.gameSpeed=20;
        //change the current game background
        this.currentBackground=11;
        //change the flag
        this.playingLevelEleven=true;
        //define the game leve to render to the user
        this.gameType.hard=true;
            break;
        case 12:
        //increment the game speed
        this.gameSpeed=20;
        //change the current game background
        this.currentBackground=12;
        //change the flag
        this.playingLevelTwelve=true;
        //define the game leve to render to the user
        this.gameType.hard=true;
            break;

        default:
     //   throw new Error("Current Level Is Not Defined!!");
    }




    this.franticLevel=()=>{
        //create the frantic level method which is an endless game
    }



    this.nextLevel=(currentLevel)=>{
        
    //check the current level the user is currently playing
      
        switch(this.currentLevel){
            case 1:
        this.playingLevelOne=true;
        this.checkScore();
        this.playingLevelOne=false;
        this.playingLevelTwo=true;

        //throw a new message to the user to make them know they are already in another level
        THROW_MSG(canvas.width/2,canvas.height/2,this.nextMessagePush,"aqua",10);
                break;
            case 2:
        this.playingLevelTwo=true;
                break;
            case 3:
        this.playingLevelThree=true;
                break;
            case 4:
        this.playingLevelFour=true;
                break;
            case 5:
        this.playingLevelFive=true;
                break;
            case 6:
        this.playingLevelSix=true;
                break;
            case 7:
        this.playingLevelSeven=true;
                break;
            case 8:
        this.playingLevelEight=true;
                break;
            case 9:
        this.playingLevelNine=true;
                break;
            case 10:
        this.playingLevelTen=true;
                break;
            case 11:
        this.playingLevelEleven=true;
                break;
            case 12:
        this.playingLevelTwelve=true;
                break;


            default:
            //throw a new error message to the user
            THROW_CUSTOM_MESSAGE("Error","Something Occured During The Process",5000,"error",()=>{
            //reload the page for the user
                location.reload();
            },()=>{
            //reload the page for the user
                location.reload();
            })
       }
    }

  }
}


var ALL_GAME_LEVELS=new GAME_LEVEL(score);






//initialize some variables for the game GUI
var levelOne=document.getElementById("levelOne");
var levelTwo=document.getElementById("levelTwo");
var levelThree=document.getElementById("levelThree");
var levelFour=document.getElementById("levelFour");
var levelFive=document.getElementById("levelFive");
var levelSix=document.getElementById("levelSix");
var levelSeven=document.getElementById("levelSeven");
var levelEight=document.getElementById("levelEight");
var levelNine=document.getElementById("levelNine");
var levelTen=document.getElementById("levelTen");
var levelEleven=document.getElementById("levelEleven");
var levelTwelve=document.getElementById("levelTwelve");
var playing=false;
var highScoreButton=document.getElementById("highScore");
var moreLevels=document.getElementById("moreLevels");
//this is the game documentation and how to play the game is included in the game
var aboutUs=document.getElementById("aboutUs");
var gameGUI=document.getElementById("gameGUI");

//declare some flag variables
var playingLevelOne=false;
var playingLevelTwo=false;
var playingLevelThree=false;
var playingLevelFour=false;
var playingLevelFive=false;
var playingLevelSix=false;
var playingLevelSeven=false;
var playingLevelEight=false;
var playingLevelNine=false;
var playingLevelTen=false;
var playingLevelEleven=false;
var playingLevelTwelve=false;

function GAME_SETUP(){
    gameGUI.style.display="none";
    canvas.style.display="block";
    scoreBox.style.display="flex";
    playingGame=true;
    onGameGui=false;
    document.documentElement.requestFullscreen();
}


//set an event listener for all the levels to check if they were clicked

levelOne.addEventListener("click",()=>{

        //throw a message to the user to ask if they really wanna play level one
        THROW_CUSTOM_MESSAGE("Level One","Do You Want To Play Level One??",5000,"info",()=>{
        //start the level one game here
        playing=true;
        GAME_SETUP();
        gameSpeed=5;
        playingLevelOne=true;

        SPAWN_ALL_GAME_OBJECT();

        init();
        animate();
},()=>{
    return ;
})

//perform some functions
});

levelTwo.addEventListener("click",()=>{
        //throw a message to the user to ask if they want to really play level two
        THROW_CUSTOM_MESSAGE("Level Two","Do You Want To Play Level Two??",5000,"info",()=>{
        //start the level one game here

        playing=true;
        GAME_SETUP();
        gameSpeed=7;
        playingLevelTwo=true;
        //console.log(bgLevel);
        bgLevel=2;
        SPAWN_ALL_GAME_OBJECT();
        init();
        animate();
},()=>{
    return ;
})

   //perform some functions
});

levelThree.addEventListener("click",()=>{
   //perform some functions

        THROW_CUSTOM_MESSAGE("Level Three","Do You Want To Play Level Three??",5000,"info",()=>{
        //start the level one game here
        playing=true;
        GAME_SETUP();
        gameSpeed=8;
        playingLevelThree=true;
        //console.log(bgLevel);
        bgLevel=3;
        SPAWN_ALL_GAME_OBJECT();
        init();
        animate();
},()=>{
    return ;
})

});

levelFour.addEventListener("click",()=>{
           //perform some functions

        THROW_CUSTOM_MESSAGE("Level Four","Do You Want To Play Level four??",5000,"info",()=>{
        //start the level one game here
        playing=true;
        GAME_SETUP();
        playingLevelFour=true;
        gameSpeed=10;
        //console.log(bgLevel);
        bgLevel=4;
        SPAWN_ALL_GAME_OBJECT();
        init();
        animate();
},()=>{
    return ;
})

});


levelFive.addEventListener("click",()=>{
   //perform some functions
        THROW_CUSTOM_MESSAGE("Level five","Do You Want To Play Level five??",5000,"info",()=>{
        //start the level one game here
        playing=true;
        GAME_SETUP();
        gameSpeed=12;
        playingLevelFive=true;
        bgLevel=5;
        SPAWN_ALL_GAME_OBJECT();
        init();
        animate();
},()=>{
    return ;
})

});

levelSix.addEventListener("click",()=>{
           //perform some functions
        THROW_CUSTOM_MESSAGE("Level Six","Do You Want To Play Level Six??",5000,"info",()=>{
        //start the level one game here
        playing=true;
        GAME_SETUP();
        gameSpeed=14;
        playingLevelSix=true;
        bgLevel=6;
        SPAWN_ALL_GAME_OBJECT();
        init();
        animate();
},()=>{
    return ;
})

});

levelSeven.addEventListener("click",()=>{
   //perform some functions
        THROW_CUSTOM_MESSAGE("Level Seven","Do You Want To Play Level Seven??",5000,"info",()=>{
        //start the level one game here
        playing=true;
        GAME_SETUP();
        gameSpeed=15;
        playingLevelSeven=true;
        bgLevel=7;
        SPAWN_ALL_GAME_OBJECT();
        init();
        animate();
},()=>{
    return ;
})

});

levelEight.addEventListener("click",()=>{

   //perform some functions
        THROW_CUSTOM_MESSAGE("Level Eight","Do You Want To Play Level Eight??",5000,"info",()=>{
        //start the level one game here
        playing=true;
        GAME_SETUP();
        gameSpeed=15.5;
        playingLevelEight=true;
        //console.log(bgLevel);
        bgLevel=8;
        SPAWN_ALL_GAME_OBJECT();
        init();
        animate();
},()=>{
    return ;
})

});

levelNine.addEventListener("click",()=>{
   //perform some functions
        THROW_CUSTOM_MESSAGE("Level Nine","Do You Want To Play Level Nine??",5000,"info",()=>{
        //start the level one game here
        playing=true;
        GAME_SETUP();
        gameSpeed=15.6;
        playingLevelNine=true;
        bgLevel=9;
        SPAWN_ALL_GAME_OBJECT();
        init();
        animate();
},()=>{
    return ;
})

});

levelTen.addEventListener("click",()=>{
   //perform some functions
        THROW_CUSTOM_MESSAGE("Level Ten","Do You Want To Play Level Ten??",5000,"info",()=>{
        //start the level one game here
        playing=true;
        GAME_SETUP();
        gameSpeed=15.7;
        playingLevelTen=true;
        bgLevel=10;
        SPAWN_ALL_GAME_OBJECT();
        init();
        animate();
},()=>{
    return ;
})

});

levelEleven.addEventListener("click",()=>{
   //perform some functions
        THROW_CUSTOM_MESSAGE("Level Eleven","Do You Want To Play Level Eleven??",5000,"info",()=>{
        //start the level one game here
        playing=true;
        GAME_SETUP();
        gameSpeed=15.8;
        playingLevelEleven=true;
        bgLevel=11;
        SPAWN_ALL_GAME_OBJECT();
        init();
        animate();
},()=>{
    return ;
})

});

levelTwelve.addEventListener("click",()=>{
   //perform some functions
        THROW_CUSTOM_MESSAGE("Level Twelve","Do You Want To Play Level Twelve??",5000,"info",()=>{
        //start the level one game here
        playing=true;
        GAME_SETUP();
        gameSpeed=16;
        playingLevelTwelve=true;
        bgLevel=12;
        SPAWN_ALL_GAME_OBJECT();
        init();
        animate();
},()=>{
    return ;
})

});



highScoreButton.addEventListener("click",()=>{

    playing=true;
    //throw a new message
    swal.fire({
        title:"High Score",
        text:highScoreMsg,
        icon:"info",
        showCloseButton:true,
        showCancelButton:true,
        cancelButtonColor:"tomato",
        cancelButtonText:"Reset Highscore",
        footer:"Powered By EmmSoft Games EG" + "<sup>TM</sup>"
     

    }).then((willProceed)=>{
        //if the user clicks the ok button
        if(willProceed.isConfirmed){
            return;
        }
        //if the user clicks the reset highscore button
        if(willProceed.isDismissed){
       
            swal.fire({
                title:"Reset Highscore",
                text:"Do You Want To Clear Your Current Highscore?? Note That Once Cleared, It Can't Be Recovered!!!",
                icon:"question",
                showCancelButton:true,
                cancelButtonColor:"tomato",
                showCloseButton:true,
                footer:"Powered By EmmSoft Games EG" + "<sup>TM</sup>"
                

            }).then((willDelete)=>{
                //if the user clicks the ok button (ie) the user want's to reset the high score value
                if(willDelete.isConfirmed){
                  //clear the user's current high score and set it back to 0
                  localStorage.removeItem("TerminatorHighScore");
                  //inform the user that the highscore have been cleared
                    swal.fire({
                        title:"Highscore Cleared",
                        text:"Your Highscore Have Been Set Back To Default Which Is Zero!!!",
                        icon:"success",
                        timer:5000,
                        showCancelButton:true,
                        cancelButtonColor:"tomato",
                        showConfirmButton:true,
                        showCloseButton:true,
                        footer:"Powered By EmmSoft Games EG" + "<sup>TM</sup>"
                    }).then((willProceed)=>{
                    //reload the page so the highscore would be set back to 0
                        if(willProceed){
                            location.reload();
                        }else{
                            location.reload();
                        }
                        if(willProceed.isConfirmed){
                            location.reload();
                        }
                        if(willProceed.isDismissed){
                            location.reload();
                        }
                    })
                }else{
                    return;
                }
            })
        }
    })

});




moreLevels.addEventListener("click",()=>{
    //perform something

        THROW_CUSTOM_MESSAGE("More Levels","Are You Ready For Frantic Levels",5000,"info",()=>{
        //start the frantic level here
        THROW_CUSTOM_MESSAGE("Coming Soon","Frantic Levels Are Not Avaliable Now...",5000,"info",()=>{return;},()=>{return;})
        
},()=>{
    return;
})

});



aboutUs.addEventListener("click",()=>{
    //peform something
        //ask the player a message
        THROW_CUSTOM_MESSAGE("About Us","Do You Want To View The Game Documentations And Also How To Play The Game??",5000,"info",()=>{
        //perform the action
        //set playing to true so the default background sound wouldn't play 
        playing=true;
        onGameGui=false;
        //navigate the user to the required page
        
        location.href="aboutUS.html";
            
},()=>{
    //if the user clicks the close button or cancel button 
    return;
})
    
})



var randomSpawnNumber1=randomNumber(6000,4000);
var randomNumber2=randomNumber(12000,9000);

var randomNumber3=randomNumber(3000,2000);
var randomNumber4=randomNumber(35000,30000);

var randomNumber5=randomNumber(30000,25000);


function SPAWN_ALL_GAME_OBJECT(){


    
if(playing){
    setInterval(() => {
    spawnEnemies();
    enemyLifeBar.color="gold";
    THROW_MSG(canvas.width/2,canvas.width/2,"Aliens Incoming !!!","red",7);
    enemyLifeBar.width=50;
    insectSoundWalking.play();
    randomSpawnNumber1=randomNumber(6000,4000);
},randomSpawnNumber1);

setInterval(() => {
    spawnBirds();
    // birdSoundFlying.play();
    randomNumber2=randomNumber(12000,9000);
}, randomNumber2);
setInterval(() => {
    spawnMonsters();
    monsterSoundWalking.play();
   // THROW_MSG("Insect Monsters Incoming !!!","red",7);
   randomNumber3=randomNumber(3000,2000);
}, randomNumber3);

setInterval(()=>{
    spawnPlanes();
    THROW_MSG(canvas.width/2,canvas.height/2,"Plane Incoming !!!","red",7);
    randomNumber4=randomNumber(35000,30000);
},randomNumber4);

setInterval(() => {
    spawnPowerUps();
    randomNumber5=randomNumber(30000,25000);
},randomNumber5);

}   
}


var randomSpeed2=300;
var randomSpeed3=400;
var randomSpeed4=500;
var randomSpeed5=450;

var GAME_GUI_SONG=new Audio();
GAME_GUI_SONG.src="gameGuiBackgroundSound.mp3";
function GAME_GUI_BACKGROUND_SONG_PLAY(){
    //if the user is on the game gui then play the game GUI background song

}

function RANDOM_SPAWN(){
    //if the world speed is divisible by a certain amount then spawn them
    if(worldSpeed%randomSpeed){
    spawnEnemies();
    enemyLifeBar.color="gold";
    THROW_MSG(canvas.width/2,canvas.width/2,"Aliens Incoming !!!","red",7);
    enemyLifeBar.width=50;
    insectSoundWalking.play();
    randomSpeed=randomNumber(300,200);
    }


    if(worldSpeed%randomSpeed2){
        //spawn the monsters
      spawnMonsters();
      monsterSoundWalking.play();
   // THROW_MSG("Insect Monsters Incoming !!!","red",7);
       randomSpeed2=randomNumber(200,100);
    }



    if(worldSpeed%randomSpeed3){
         spawnBirds();
         randomSpeed3=randomNumber(400,350);
    }


    if(worldSpeed%randomSpeed4){
          spawnPlanes();
          randomSpeed4=randomNumber(500,400);
    }



    if(worldSpeed%randomSpeed5){
        spawnPowerUps();
        randomSpeed5=randomNumber(550,500);
    }



}













class LifeBar {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;


        //create the draw method
        this.draw = () => {
                ctx.save();
                ctx.fillStyle = this.color;
                ctx.shadowColor = this.color;
                ctx.shadowBlur = 20;
                ctx.strokeStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
                ctx.strokeRect(this.x, this.y, this.width, this.height);
                ctx.restore();
            }
            //create the update method

        this.update = () => {
            this.draw();
        }
    }
}

var color="blue";
var width=270;
var enemyLifeColor="gold";
lifeBar=new LifeBar(30, 110, width, 20, color);

enemyLifeBar=new LifeBar(undefined,undefined,50,10,enemyLifeColor);


//create a class for the player's state
class PlayerState {
    constructor() {
        //this current state defines the present state of the player which would determine the player's life board da
        this.currentState = ["idle", "dead", "jump", "shoot", "slide", "run"];
        //the default current state of the player is idle
        this.defaultCurrentstate = "idle";
        //this defines the current state width
        this.currentStateWidth = 400;
        //this describes the current state height
        this.currentStateHeight = 100;
        //this defines the current state x position or coordinate
        this.currentStateXCoordinate = -canvas.width + 305;
        //this defines the current state y position or coordinate
        this.currentStateYCoordinate = 5;
        //create the image
        this.currentStateImage = new Image();
        //set the current image directory
        this.currentStateImage.src = "playerLogo.png";


        //create the draw function
        this.draw = () => {
            //draw the player's logo
            ctx.drawImage(this.currentStateImage, this.currentStateXCoordinate, this.currentStateYCoordinate, this.currentStateWidth, this.currentStateHeight);
        }

        //create the update function
        this.update = () => {
            this.draw();
        }
    }
}
playerLogo = new PlayerState();
//create a global variable called score

//create a variable to store the random songs that would be played while the game is been played
var songArray = [
    "song1.mp4",
    "song2.mp4",
    "song3.mp4",
    "song4.mp4",
    "song5.mp4",
    "song6.mp4",
    "song7.mp4",
    "song8.mp4",
    "song9.mp4",
    "song10.mp4",
    "song11.mp4",
    "song12.pm4",
    "song13.mp4"
];

//initialize the variable to store the background song
var backgroundSong;

//then play the song in the animation loop 
//also add the test condition for the song in the animation loop
//create a function that would give a random song when it is called

function randomSong(songArray) {
    return songArray[Math.floor(Math.random() * songArray.length)];
}




//event listeners to make game responsive for all screen 
addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

addEventListener("load", () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        document.body.style.fontFamily="corbel";
        swal.fire({
            title:"Welcome To Terminator Salvation....",
            text:"Made By Adedoyin Emmanuel... Try To Save Your Planet From The Aliens!!",
            footer: "Powered By EmmSoft Games EG" + "<sup>TM</sup>",
            showCancelButton: true,
            showCloseButton: true

        }).then((willProceed)=>{
            if(willProceed){
                swal.fire({
                title:"Start Playing..",
                text:"Thanks For Playing My Game...",
                footer:"Powered By EmmSoft Games EG" + "<sup>TM</sup>",
                showCloseButton:true,
                timer:5000,
                showCancelButton:true
               });
                
            }else{
                swal.fire({
                title:"Start Playing..",
                text:"Thanks For Playing My Game...",
                footer:"Powered By EmmSoft Games EG" + "<sup>TM</sup>",
                showCloseButton:true,
                showCancelButton:true,
                timer:5000
            });
               
            }
        })
        init();
    })
    //create the object ie the player which is a tank :)'

//create the audio files for the game
//create the bird sound object
var birdSound = {
    volume: 1.0,
    flying: "birdCry.wav",
    dead: "birdDeath.flac"
};


var birdSoundFlying = new Audio();
birdSoundFlying.src = birdSound.flying;


//create the audio file for the bird when it is dead
var birdSoundDead = new Audio();
birdSoundDead.src = birdSound.dead;


//create the random sounds array
var randomInsectMonsterWalkSound = ["insectMonsterWalking1.wav", "insectMonsterWalking2.wav"];
var randomInsectMonsterDeadSound = ["insectMonsterDead1.wav", "insectMonsterDead2.wav"];

//create the insect monster audio file
var insectSoundWalking = new Audio();

var insectSoundDead = new Audio();



//note pain2.wav is for the monster so i didn't use it
//the .ogg is the sound file extension 


//set a audio variables to play when user does some special movement
var playerWalking = new Audio();

var playerJumping = new Audio();

var playerShooting = new Audio();

var playerSliding = new Audio();

var playerDead = new Audio();;


var monsterSoundArray = ["monster-1", "monster-2", "monster-3", "monster-4", "monster-5", "monster-6", "monster-7", "monster-8", "monster-9"];
var monsterSound = {
    volume: 1.0,
    walking: randomSound(monsterSoundArray) + ".wav",
    dead: "pain2.ogg"
};

//create the monster sound 
//create the insect monster audio file
var monsterSoundWalking = new Audio();
monsterSoundWalking.src = monsterSound.walking;

var monsterSoundDead = new Audio();
monsterSoundDead.src = monsterSound.dead;






//we use the object declatation to declare the clas for the the levels

  

function CHECK_CURRENT_LEVEL(score){
    //this function check the current level the player is and then if the score is greater than some amount, it takes you to another level
    
}



//create some utility functions
function gameObjectColliding(object1, object2) {
    return !(
        object1.x > object2.x + object2.width ||
        object1.x + object1.width < object2.x ||
        object1.y > object2.y + object2.height ||
        object1.y + object1.height < object2.y
    );
}

function randomSound(soundArray) {
    return soundArray[Math.floor(Math.random() * soundArray.length)];
}
var deadSound=new Audio();
var deadSoundArray=["pain1.ogg", "pain3.ogg", "pain4.ogg", "pain5.ogg", "pain6.ogg", "pain7.ogg", "pain8.ogg", "pain9.ogg", "pain10.ogg", "pain11.ogg", "pain12.ogg", "pain13.ogg", "pain14.ogg"];
deadSound.src=randomSound(deadSoundArray);
  

function getDistance(x1, y1, x2, y2) {
    let x = x1 - x2;
    let y = y2 - y1;

    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

function randomNumber(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getVerTicalDistance(y1, y2) {
    var verticalDistance = y2 - y1;
    return verticalDistance;
}

function randomMonsters(monsterArray) {
    return monsterArray[Math.floor(Math.random() * monsterArray.length)];
}

//create a custom function that throws a message at any time to the user anywhere in the application.

function THROW_CUSTOM_MESSAGE(title, body, timer,icon, resolve, reject){
    this.title = title;
    this.body = body;
    this.icon = icon;
    this.timer = timer;
    this.resolve = resolve;
    this.reject = reject;
    this.fontFamily = "corbel";

    document.body.style.fontFamily = this.fontFamily;

    //check if the arguments are correct and complete else returns error
    try {
        if (typeof this.title == undefined || typeof this.body == undefined || typeof this.timer == undefined || typeof this.icon == undefined) {
            throw new Error("Arguments Must Be Complete");
        }
    } catch (error) {
        console.log(error.stack);

    }

    swal.fire({
        title: this.title,
        text: this.body,
        icon: this.icon,
        timer: this.timer,
        footer: "Powered By EmmSoft Game Studios"+"<sup>TM</sup>",
        showCancelButton: true,
        showCloseButton: true

    }).then((willProceed) => {
        if (willProceed.isConfirmed) {
            this.resolve();
        } else {
            this.reject();
        }
    })


}

//note 70 is a value gotten from try by error and it is the position where the grass is from the innerHeight or the background
function isPlayerGrounded(player) {

    var groundDistance = 70;
    var groundX = innerWidth;
    groundY = innerHeight - groundDistance;
    var distance = Math.floor(getVerTicalDistance(player.y, groundY));

    switch (distance) {
        case 114:
            return true;
            break;
        case 115:
            return true;
            break;
        case 113:
            return true;
            break;
        case 123:
            return true;
            break;
        case 122:
            return true;
            break;
        case 121:
            return true;
            break;
        case 120:
            return true;
            break;
        case 118:
            return true;
            break;
        case 119:
            return true;
        case 117:
            return true;
            break;
        case 116:
            return true;
            break;
        case 115:
            return true;
            break;
        default:
            return false;
            break;
    }


}





addEventListener("keydown", (e) => {
    switch (e.keyCode) {
        case 39:
            //the player pressed the right button in the canvas;
            backgroundX -= gameSpeed;
            backgroundX2 -= gameSpeed;
            movingRight = true;
            movingLeft = false;
            break;

        case 37:
            //the player pressed the left key
            backgroundX += gameSpeed;
            backgroundX2 += gameSpeed;
            movingRight = false;
            movingLeft = true;
            break;
    }
    keyDown = true;
});
addEventListener("keyup", (e) => {
    keyUp = true;
});

//create some utility functions
function randomNumber(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
class Tank {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.radius = undefined;
        this.velocity = {
            dx: 5,
            dy: 5
        };
        this.playerImageSwap = {
            playerRight: "Freetank/wholetank/tankMoveRight.png",
            playerLeft: "Freetank/wholetank/tankMoveLeft.png"
        }
        this.image = new Image();
        this.image.src = this.playerImageSwap.playerRight;
        this.spriteWidth = 256;
        this.spriteHeight = 175;

        this.frame = {
            dx: 0,
            dy: 0
        };
        this.newPosX = () => {
            this.x = this.x + this.velocity.dx;
        }

        this.newPosY = () => {
            this.y = this.y + this.velocity.dy;
        }

        //create the draw function to draw the tank
        this.draw = () => {
            //ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.spriteWidth * this.frame.dx, this.spriteHeight * this.frame.dy, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        };

        //create the update function for object manipulation
        this.update = () => {
            this.draw();


            //if the sprite sheet image frame.x is four ie the player have moved to the fourth frame then
            //reduce the frame back to zero to create tyre movement animation


            //there is no need to increase the frame.y since the sprite sheet has only one column 


        };
        //add a condition to check the player's keyboard buttons
        //if the user presses a button in the game area
        /*   addEventListener("keydown", (e) => {
              //38 is up
              //40 is down
              //39 is right
              //37 is left

              //create a switch statement to give different code for different key pressed
              switch (e.keyCode) {
                  case 38:
                      break;
                  case 40:
                      break;
                  case 39:
                      //if the player moves right
                      this.image.src = this.playerImageSwap.playerRight;
                      this.frame.dx++;
                      if (this.frame.dx == 4) {
                          this.frame.dx = 0;
                      }
                      this.x += this.velocity.dx;
                      backgroundX -= gameSpeed;
                      backgroundX2 -= gameSpeed;
                      break;
                      //if the player moves left
                  case 37:
                      this.image.src = this.playerImageSwap.playerLeft;
                      this.frame.dx++;
                      if (this.frame.dx == 4) {
                          this.frame.dx = 0;
                      }
                      backgroundX += gameSpeed;
                      backgroundX2 += gameSpeed;
                      this.x -= this.velocity.dx;
                      break;

              }
          }) */
    }
}


//create a class for the player
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 120;
        this.height = 150;
        this.png = ".png";
        this.life = 100;
        this.dropTimer = 0;
        this.velocity = {
            dx: 0,
            dy: 0
        };
        this.maxHeight = 400;
        this.gravity = 10;
        this.friction = 0.9;
        this.frame = {
            x: 0,
            y: 0
        };
        this.rotatedFrame = {
            x: 0,
            y: 0
        };
        this.dead = false;

        this.move = {
            right: false,
            left: false,
            up: false,
            down: false
        };
        this.stateWidth = {
            dead: undefined,
            attack: 120.7,
            run: 120.7,
            slide: 120.7,
            idle: 120.7,
            jump: 120.7
        }
        this.stateHeight = {
            dead: undefined,
            attack: 120,
            run: 120,
            slide: 120,
            idle: 120,
            jump: 120
        }
        this.state = {
            attack: "robotRunShoot",
            die: "robotDead",
            jump: "robotJump",
            idle: "robotIdle",
            run: "robotRun",
            slide: "robotSlide"
        };
        this.direction = "right";
        //set the states for the sprite to change when the user changes the direction
        this.defaultDirection = "right";
        //the state rotated means that the player is facing left since this is a 2d game by default the user is facing right and is positioned at the middle of the screen
        //the rotated state would contain sprite sheets that would be animated when the user is facing left 
        this.rotatedState = {
            attack: "rotatedRobotRunShoot",
            die: "rotatedDead",
            jump: "rotatedRobotJump",
            idle: "rotatedRobotIdle",
            run: "rotatedRobotRun",
            slide: "rotatedRobotSlide"
        };
        this.rotatedIndex = ["attack", "die", "jump", "idle", "run", "slide"];
        //this means the player is on the ground by default
        this.grounded = true;
        //this means that the first frame of animation that would be animated when the screen loads
        //and that is the idle state
        this.frameNumber = 3;
        //this keeps track of the player state in an array just as the object and it is later used in the manipulation of the character 

        this.index = ["attack", "die", "jump", "idle", "run", "slide"];
        //a random distance of the player on the ground
        this.groundedDistance = innerHeight - 70;
        //120 is a random guessed value by the programmer  emmanuel :)
        this.groundPosY = this.groundedDistance - 100;

        //the sprite sheet width is set to the idle state width which is same for other animation state except the dead state
        this.spriteWidth = this.stateWidth.idle;
        //the sprite sheet height is set to the idle state height which is same for other animation state except the dead state
        this.spriteHeight = this.stateHeight.idle;
        this.image = new Image();
        this.jumpRate = gameSpeed * 5;
        this.radius = 30;
        this.shooting = false;
        this.maxFrame = 10;
        this.minFrame = 0;
        this.dead = false;

        this.randomPlayerDeadSound = ["pain1.ogg", "pain3.ogg", "pain4.ogg", "pain5.ogg", "pain6.ogg", "pain7.ogg", "pain8.ogg", "pain9.ogg", "pain10.ogg", "pain11.ogg", "pain12.ogg", "pain13.ogg", "pain14.ogg"];
        this.playerSound = {
            volume: 1.0,
            walking: "playerWalking.flac",
            jumping: "playerJump.wav",
            shooting: "playerShoot.wav",
            dead: undefined,
            sliding: "playerWalking.flac"
        };
        this.GLOBAL_SPEED = 2;

        playerWalking.src = this.playerSound.walking;
        playerJumping.src = this.playerSound.jumping;
        playerShooting.src = this.playerSound.shooting;
        playerSliding.src = this.playerSound.sliding;
        playerDead.src = this.playerSound.dead
            //create an object for the player's life bar 


        //create the player's draw method

        //create the draw function
        //debugging
        try {
            this.draw = () => {
                // the default direction is right so the player would always face right by default
                if (this.defaultDirection = "right") {
                    this.move.right = true;
                }

                //if the player wants to move left then change the animation state and the sprite sheet characters
                if (this.move.left) {
                    //since the player is moving left then the player cannot move right :)
                    this.move.right = false;

                    //change the sprite sheet to suite the animation state
                    this.image.src = this.rotatedState[this.rotatedIndex[this.frameNumber]] + this.png.toString();
                }
                //if the player wants to move right then change the animation frame to move right and the sprite characters
                if (this.move.right) {
                    //since the player is moving right then the player cannot move left thus this.move.left is set to false
                    this.move.left = false;
                    //change the sprite sheet to suite the animation frame according to the users keyboard controls
                    this.image.src = this.state[this.index[this.frameNumber]] + this.png.toString();;
                }

                ctx.drawImage(this.image, this.frame.x * this.spriteWidth, this.frame.y * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);


            };
        } catch (error) {
            throw new Error("something occurred while drawing the sprites...");
        }

        this.newPos = () => {
            this.y = this.y + this.velocity.dy;

        }
        this.reposition = () => {
            this.y += this.gravity;
            if (this.y > 300) {
                this.y += this.gravity;
            }
            if (this.y >= this.groundPosY) {
                this.y = this.groundPosY;
            }
        }

        this.jump = () => {
            this.grounded = false;
            this.velocity.dy = -this.jumpRate;
        }

        this.update = () => {
            this.draw();
            this.frame.x++;
            if (this.frame.x == this.maxFrame) {
                this.frame.x = this.minFrame;
            }
            if (this.dead) {
                playerDead.play();
            }

            this.x = this.x + this.velocity.dx;
            this.newPos();
            if (this.move.up == true) {
                this.reposition();
            }
            if (this.shooting) {
                playerShooting.play();
            }

            //keyboard controls to control the character
            //don't mind me i kinda love fast things so the velocity of the player is quite fast
            addEventListener("keydown", (e) => {
                switch (e.keyCode) {

                    case 38:
                        //player moves up
                        this.frameNumber = 2;
                        this.move.up = true;
                        this.jump();
                        break;
                    case 40:

                        //player moves down

                        this.move.down = true;
                        this.frameNumber = 5;
                        //if the player is moving to the right direction then the player's velocity would be positive else it would be negative
                        //set a condition if the player is moving to the right and the player wants to slide then the velocity would be positive
                        if (this.move.right) {
                            this.velocity.dx = Math.floor(gameSpeed * this.GLOBAL_SPEED);
                        }
                        //else if the player is moving to the left and wants to slide then the velocity of the player would be negative 
                        if (this.move.left) {
                            //set the horizontal velocity to negative
                            this.velocity.dx = Math.floor(-gameSpeed * this.GLOBAL_SPEED);
                        }
                        movingRight = true;
                        movingLeft = false;
                        playerWalking.play();
                        break;
                    case 39:
                        //player moves right
                        this.move.right = true;
                        this.move.left = false;
                        this.move.down = false;
                        this.frameNumber = 4;
                        this.velocity.dx = Math.floor(gameSpeed * this.GLOBAL_SPEED);
                        shootingValue = 73;
                        this.direction = "right";
                        playerWalking.play();

                        break;
                    case 37:
                        //player moves left
                        this.image.src = this.rotatedState.idle + this.png;
                        this.move.left = true;
                        this.move.right = false;
                        this.frameNumber = 4;
                        this.velocity.dx = -Math.floor(gameSpeed * this.GLOBAL_SPEED);
                        shootingValue = -5;
                        this.direction = "left";
                        playerWalking.play();
                        break;
                    case 32:
                        return;

                }
            })


            addEventListener("keyup", () => {
                this.frameNumber = 3;
                this.velocity.dx = 0;
                this.velocity.dy = 0;
                this.grounded = true;
                if (this.move.up) {
                    playerJumping.play();
                }
                //when the user releases the key then reset shooting to false
                this.shooting = false;
            })



        }


    }
}


canvas.width = innerWidth;
canvas.height = innerHeight;
//lets create a class for some enemy
class Enemy {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.reposition={
            x:70,
            y:30
        };
        this.frame = {
            x: 0,
            y: 0
        };
        this.velocity = {
            dx: gameSpeed*1.2,
            dy: gameSpeed*1.2
        };

        this.image = new Image();
        this.spriteWidth = 1214;
        this.spriteHeight = 787;
        this.state = {
            walking: "monsterWalking2",
            defeated: "monsterDead2"
        };
        this.defeatedWidth = 1632;
        this.defeatedHeight = 847;
        this.index = ["walking", "defeated"];
        this.frameNumber = 0;
        this.direction = "right";
        this.png = ".png";
        this.dead = false;
        this.maxFrame = 21;
        this.minFrame = 0;
        this.harmful = true;
        this.randomWalkingSound = randomSound(randomInsectMonsterWalkSound);
        this.randomDeadSound = randomSound(randomInsectMonsterDeadSound);
        insectSoundWalking.src = this.randomWalkingSound;
        insectSoundDead.src = this.randomDeadSound;
        //create the draw function
        this.draw = () => {
            //save the current state of the canvas
            ctx.save();
            this.image.src = this.state[this.index[this.frameNumber]] + this.png;
            this.maxFrame = 21;
            this.minFrame = 0;
            this.spriteWidth = 1214;
            this.spriteHeight = 787;
            this.harmful = true;


            
           
            ctx.drawImage(this.image, this.frame.x * this.spriteWidth, this.frame.y * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
            if (this.dead) {
                this.frameNumber = 1;
                this.spriteWidth = this.defeatedWidth;
                this.spriteHeight = this.defeatedHeight;
                this.maxFrame = 26;
                this.minFrame = 0;
                this.harmful = false;
                insectSoundDead.play();
            }
     
            //restore the current state of the canvas
        };

        //create the update function
        this.update = () => {
            this.draw();
            this.frame.x++;
            this.x += -this.velocity.dx;
            if (this.frame.x == this.maxFrame) {
                this.frame.x = this.minFrame;
            }
            
           
        };

    }
}


//create a class for the player bullet
class Bullet {
    constructor() {
        this.move = {
            right: player.move.right,
            left: player.move.left
        };

        this.value = shootingValue;

        this.posChange = {
            x: this.value,
            y: 75
        };
        this.player = {
            x: player.x + this.posChange.x,
            y: player.y + this.posChange.y
        };

        this.x = this.player.x;
        this.y = this.player.y;
        this.width = 40;
        this.height = 10;
        this.png = ".png";
        this.image = new Image();
        //get the player's moving status and store it in an object to use to manipulate the bullet according to the user direction


        this.velocity = {
            dx:gameSpeed*randomNumber(5,3),
            dy:gameSpeed*randomNumber(5,3)
        };
        //this defines the state of the bullet it would be right of the player is facing right and would be left if the player is facing left
        this.state = {
            right: "bullet",
            left: "rotatedBullet"
        };
        this.index = ["right", "left"];
        //this.frameNumber would be 0 by default because the player would be facing the right direction and his gun would also be facing the same direction
        this.frame = {
            left: 1,
            right: 0
        };

        //create the draw function
        this.draw = () => {
            if (this.move.left) {

                this.image.src = this.state[this.index[this.frame.left]] + this.png;
            }

            if (this.move.right) {
                this.image.src = this.state[this.index[this.frame.right]] + this.png;
            }
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

        };

        //create the update function
        this.update = () => {
            if (this.move.left) {

                this.x += -this.velocity.dx;

            }

            if (this.move.right) {

                this.x += this.velocity.dx;
            }

            this.draw();
        }
    }
}


//create a class for the explosion
class Explosion {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        //create the frame object since this is a sprite sheet
        this.frame = {
            //both frame properties are set to 0 by default because that's the beginning of the sprite animation
            x: 0,
            y: 0
        };
        this.png = ".png"
        this.image = new Image();
        this.image.src = " explosion" + this.png;
        //create a velocity object for the explosion
        this.velocity = {
            dx: 5,
            dy: 5
        };


        //create the sprite width and sprite height properties
        this.spriteWidth = 595.3333333333333;
        this.spriteHeight = 512;


        //create the draw method
        this.draw = () => {
            //draw the sprite sheet
            ctx.drawImage(this.image, this.frame.x * this.spriteWidth, this.frame.y * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        };
        //create the update method for the animation
        this.update = () => {
            this.draw();
            this.frame.x++;
            if (this.frame.x == 3) {
                this.frame.x = 0;
                this.frame.y++;
                if (this.frame.y == 3 && this.frame.x == 2) {
                    this.frame.x = 0;
                    this.frame.y = 0;
                }
                if (this.frame.y == 3) {
                    this.frame.y = 0;
                }
            }
        }


    }
}

class Bird {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velocity = {
            dx: 10,
            dy: 5
        };
        this.angle = randomNumber(0.5, 0.1);


        this.frame = {
            x: 0,
            y: 0
        };
        this.spriteWidth = 200.333;
        this.spriteHeight = 205.333;

        this.image = new Image();
        this.image.src = "bird.png";
        this.dead = false;

        //create the draw function
        this.draw = () => {
            ctx.drawImage(this.image, this.frame.x * this.spriteWidth, this.frame.y * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);

        };

        //create the update function
        this.update = () => {
            this.angle++;
            //this.y += Math.sin(this.angle);
            // this.x += 5 + Math.cos(this.angle);
            this.draw();
            //if the bird is dead then play the bird dead sound else the bird is alive then play the alive sound which is the normal bird scream 🤣
            if (this.dead) {
                birdSoundDead.play();
                birdSoundFlying.pause();
            } else {
                birdSoundFlying.play();
            }

            //increase the birds frame
            this.frame.x++;
            //if the frame is up to the max frame then move to the next frame
            if (this.frame.x == 9 && this.frame.y == 0) {
                this.frame.x == 0
            }
            if (this.frame.x == 8) {
                //reset the frame.x to zero to continue the frame count
                this.frame.x = 0;
                this.frame.y++;
                if (this.frame.y == 3) {
                    this.frame.y = 0;
                }
                //if the frame.y is up to come certain amount then reset the value 

            }
            this.x += this.velocity.dx + Math.cos(this.angle * Math.PI);
        }

    }
}


//create a class for the grass monster
class GrassMonster {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.png = ".png";

        this.frame = {
            x: 0,
            y: 0
        };
        this.velocity = {
            dx: 5,
            dy: 5,

        };
        this.spriteWidth = 946;
        this.spriteHeight = 821;
        this.state = {
            walk: "grassMonsterWalking",
            dead: "grassMonsterDead"
        };
        this.maxFrame = {
            x: 13,
            y: 0
        };

        this.index = ["walk", "dead"];
        this.frameNumber = 0;
        this.image = new Image();
        //create the draw function
        this.draw = () => {
            this.image.src = this.state[this.index[this.frameNumber]] + this.png;
            ctx.drawImage(this.image, this.frame.x * this.spriteWidth, this.frame.y * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }

        //create the update function
        this.update = () => {
            this.draw();
            this.x += -this.velocity.dx;
            this.frame.x++;
            if (this.frame.x == this.maxFrame.x) {
                this.frame.x = 0;
            }

        }
    }
}
//create a class for the house;
class House {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.angle = 0.1;
        this.velocity = {
            dx: 5,
            dx: 5
        };
        this.png = ".png";
        this.image = new Image();
        this.frame = {
            x: 1,
            y: 0,
        };

        //create the draw function
        this.draw = () => {

            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

        };
        //create the update function
        this.update = () => {
            this.draw();
            this.x += this.velocity.dx;
        }
    }
}
//create a class for the grass

//create a class for the planes

//create a class for the zombies

class Zombies {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.angle = 0.1;
        this.velocity = {
            dx: 5,
            dx: 5
        };
        this.png = ".png";
        this.image = new Image();
        this.frame = {
            x: 1,
            y: 0,
        };
        //create the draw function
        this.draw = () => {

        };
        //create the update function
        this.update = () => {
            this.draw();
            this.x += this.velocity.dx;
        }
    }
}

var maxFrame = 11;
var minFrame = 0;

//create a class for the monsters
class Monsters {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.direction = "left";
        this.velocity = {
            dx: 5*1.2,
            dy: 5*1.2
        };

        this.monsterArray = [
            "monster1",
            "monster2",
            "monster3",
            "monster4"
        ];
        this.harmful = true;
        this.dead = false;
        this.monsterImage = randomMonsters(this.monsterArray);

        this.png = ".png";
        this.image = new Image();
        this.image.src = this.monsterImage + this.png;
        this.index = ["walk", "run", "attack", "dead"];
        this.frameIndex = 0;

        this.frame = {
            x: minFrame,
            y: 0
        };
        this.maxFrame = maxFrame;
        this.minFrame = minFrame;
        this.spriteWidth = 720;
        this.spriteHeight = 490;
        this.attackDistance = 300;
        this.attacking = true;

        //create the draw function
        this.draw = () => {
            ctx.drawImage(this.image, this.frame.x * this.spriteWidth, this.frame.y * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        };

        //create the attack method




        //  console.log(getDistance(this.x, this.y, player.x, player.y));


        //create the update function
        this.update = () => {
            this.draw();
            this.distance = getDistance(this.x, this.y, player.x, player.y);
            //if the enemy has passed the player
            // console.log(this.distance);
            //if the enemy is dead then it is no longer harmful and also play the monster dead sound else play the monster screech sound
            if (this.dead) {
                this.harmful = false;
                this.velocity.dx = 0;
                this.velocity.dy = 0;
                monsterSoundDead.play();
            }
            this.frame.x++;
            if (this.frame.x == this.maxFrame) {
                this.frame.x = this.minFrame;
            }
            this.x += this.velocity.dx;



        }
    }
}
class Plane {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.angle = 0.1;
        this.velocity = {
            dx: 5,
            dx: 5
        };
        this.png = ".png";
        this.image = new Image();
        this.frame = {
            x: 1,
            y: 0,
        };
        this.spriteWidth = 443;

        this.spriteHeight = 302;

        this.state = {
            plane: "plane",
            plane: "plane"
        };
        this.stateIndex = ["plane", "plane"];

        //create the draw function
        this.draw = () => {
            this.image.src = this.state.plane + this.png;
            ctx.drawImage(this.image, this.frame.x * this.spriteWidth, this.frame.y * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
            this.frame.x++;
            if (this.frame.x = 2) {
                this.frame.x = 1;
            }
        };
        //create the update function
        this.update = () => {
            this.draw();
            this.x += this.velocity.dx;
        }
    }
}

//create a class for the powerup
class PowerUP {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        //set the type of powerup to an empty string
        this.type = "";
        this.width = 100;
        this.height = 100;
        this.audio = new Audio();
        //describes that the powerup is not active by default
        this.active = false;
        //defines that the powerup is not taken by the player by default
        this.taken = false;
        this.audio.src = "powerUp.wav";
        this.powerUpType = {
            AI: false,
            Boost: false,
            Upgrade: false,
            ScoreIncrement: false,
            Replenish: false,
        };

        this.velocity = {
            dx: 5,
            dy: 5
        };
        //create the frame object
        this.frame = {
            x: 0,
            y: 0
        };

        this.powerUpImages = ["bronzeMedal.png", "silverMedal.png", "goldMedal.png"];
        this.randomImage = (images) => { return images[Math.floor(Math.random() * images.length)] };

        this.image = new Image();
        //create an array to store the random powerups type
        this.state = [
            "AI",
            "Boost",
            "Upgrade",
            "ScoreIncrement",
            "Replenish"
        ];
        //create a function to give random state to the powerups 
        this.randomState = () => { return this.state[Math.floor(Math.random() * this.state.length)] };

        this.randomPowerUp = this.randomState();
        this.spriteWidth = 276;
        this.spriteHeight = 254;
        this.frame = {
            x: 0,
            y: 0
        };

        switch (this.randomPowerUp) {
            case "AI":
                this.type = "AI";
                this.powerUpType.AI = true;
                break;

            case "Boost":
                this.type = "Boost";
                this.powerUpType.Boost = true;
                // BOOST_POWERUP();

                break;

            case "Upgrade":
                this.type = "Upgrade";
                this.powerUpType.Upgrade = true;
                // UPGRADE_POWERUP();

                break;

            case "ScoreIncrement":
                this.type = "ScoreIncrement";
                this.powerUpType.ScoreIncrement = true;
                // SCORE_INCREMENT_POWERUP();

                break;

            case "Replenish":
                this.type = "Replenish";
                this.powerUpType.Replenish = true;
                //     REPLENISH_POWERUP();
                break;



            default:
                console.error("Typeof PowerUp Isn't Defined");
                throw new Error("Type Of PowerUp Isn't Defined");

        }
        this.image.src = this.randomImage(this.powerUpImages);
        //create the draw method
        this.draw = () => {
            ctx.drawImage(this.image, this.frame.x * this.spriteWidth, this.frame.y * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        };


        //create the update method
        this.update = () => {

            //if the powerup has been taken by the player then the powerup is not more active
            if (this.taken) {
                this.active = true;
            }
            this.frame.x++;
            if (this.frame.x == 30) {
                this.frame.x = 0;
            }

            this.draw();
            this.x += this.velocity.dx
        }
    }
}



function playPowerUpSound() {
    powerUps.forEach(powerUp => { powerUp.audio.play(); });
}

//create the hover board class for the player to use during the game 
class HoverBoard {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 80;
        this.velocity = {
            dx: 5,
            dy: 5
        };
        this.gravity = 4;
        this.image = new Image();
        this.image.src = "hoverBoard2.png";
        this.groundPosY = innerHeight - 100;
        this.reposition = () => {
            this.y += this.gravity;
            if (this.y > 300) {
                this.y += this.gravity;
            }
            if (this.y >= this.groundPosY) {
                this.y = this.groundPosY;
            }
        }

        //create the draw function
        this.draw = () => {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

        };

        //create the update function
        this.update = () => {
            this.draw();
            //   this.y += -this.velocity.dy;
        }

    }
}


//create a class for the text particles to shoe messages to the user
class Msg {
    constructor(x, y, text,color,speed) {
        this.x = x;
        this.y = y;
        //set the opacity to 1 then gradually reduce it to 0 to fade the text away
        this.opacity =1;
        //describes the color of the text 
        this.color = color;
        //describes the text itself
        this.text = text;
        this.speed=speed;
        //describes the size of the text ie font size and it has to be written with px
        this.velocity = {
            dx: 2,
            dy: this.speed
        };



        //create the draw method
        this.draw = () => {
            //save the game current state
            ctx.save();
            ctx.globalAlpha=this.opacity;
            //define the color for the text
            ctx.fillStyle = this.color;
            //define the font for the text
            ctx.font = "25px Comic Sans MS";
            ctx.textAlign="center";

            //add shadow effect
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 20;
            ctx.fillText(this.text, this.x, this.y);
            //ctx.strokeText(this.text, this.x, this.y);
            ctx.restore();
            //restore the game back to its former state
        };


        //create the update method to manipulate the text
        this.update = () => {
            this.draw();
            //animate the text
             this.y -= this.velocity.dy;
            // this.opacity -= 0.01;


        }
    }
}

//create a class for the second bird
class Raven {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velocity = {
            dx: 5,
            dy: 5
        };

        this.png = ".png";
        this.image = new Image();
        this.image.src = "raven.png";
        this.spriteWidth = 343;
        this.spriteHeight = 300.66666;



        this.frame = {
            x: 0,
            y: 0
        };

        //create the draw function
        this.draw = () => {
            //   ctx.drawImage(this.image, this.frame.x * this.spriteWidth, this.frame.y * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        };


        //create the update function
        this.update = () => {
            this.draw();
            this.x += this.velocity.dx;

            this.frame.x++;
            //if the sprite is in its last animation
            if (this.frame.x == 3) {
                //reset the horizontal frame to 0
                this.frame.x = 0;
                //if the sprite vertical frame is in the last animation then reset the frame to 0
                this.frame.y++;
                if (this.frame.y == 3) {
                    this.frame.y = 0;
                }
            }
        }

    }
}
var monsters;
var bg;

function init() {
    var x = canvas.width / 2 - 300;
    var y = canvas.height / 2 +50;

    // var width = 220;
    // var height = 150;
    //tiles = [];
    //  tank = new Tank(x, y, width, height);
    enemies = [];
    player = new Player(x + 20, y);
    bullets = [];
    planes = [];
    birds = [];
    grassMonsters = [];
    ravens = [];
    monsters = [];
    explosions = [];
    var lX = canvas.Width / 2;
    var lY = canvas.height / 2;
    hoverBoard = new HoverBoard(canvas.width - 200, canvas.height - 10);
    powerUps = [];



    bg = new Background("bg" + bgLevel + ".png", backgroundSpeed, 1357);

}

function spawnEnemies() {
    let eWidth = 200;
    let eX = canvas.width;
    let eY = canvas.height / 2 + 260;

    let eHeight = 120;
    for (let i = 0; i < 1; i++) {
        enemies.push(new Enemy(eX, eY, eWidth, eHeight));
    }
}

function spawnMonsters() {
    let eWidth = 150;
    let eX = -canvas.width;
    let eY = canvas.height / 2 + 250;

    let eHeight = 120;
    for (let i = 0; i < 1; i++) {
        monsters.push(new Monsters(eX, eY, eWidth, eHeight));
    }
}

//create a function that would handle the player life
function spawnLifeBar() {
    for (let i = 0; i < 1; i++) {
        lifeBar.push(new LifeBar(-canvas.width + 300, 70, 300, 20, "blue"));
    }
}

//create a function to spawn the powerUps
function spawnPowerUps() {
    for (let i = 0; i < 1; i++) {
        let x = -canvas.width;
        let y = randomNumber(canvas.height - 350, 10);
        powerUps.push(new PowerUP(x, y));
    }
}

function spawnGrassMonster() {
    let eWidth = 200;
    let eX = canvas.width;
    let eY = canvas.height / 2 + 160;

    let eHeight = 120;
    for (let i = 0; i < 1; i++) {
        grassMonsters.push(new GrassMonster(eX, eY, eWidth, eHeight));
    }
}

function spawnExplosion(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    for (let i = 0; i < 1; i++) {
        explosions.push(new Explosion(this.x, this.y, this.width, this.height));
    }

}

function THROW_MSG(x,y,text,color,speed) {

    this.x = x;
    this.y = y;
    this.text=text;
    this.color=color;
    this.speed=speed;
//console.log(msgs);
    for (let i = 0; i < 1; i++) {
     

        msgs.push(new Msg(this.x,this.y,this.text,this.color,this.speed));
    }
}

function spawnBirds() {
    for (let i = 0; i < 1; i++) {
        let x = -canvas.width;
        let y = randomNumber(canvas.height - 350, 10);
        let width = randomNumber(200, 150);
        let height = randomNumber(120, 100);
        birds.push(new Bird(x, y, width, height));
    }
}

function spawnRavens() {
    for (let i = 0; i < 1; i++) {
        let x = -canvas.width;
        let y = randomNumber(canvas.height - 300, 300);
        let width = randomNumber(170, 110);
        let height = randomNumber(90, 70);
        ravens.push(new Raven(x, y, width, height));
    }
}

function spawnPlanes() {
    let pWidth = 120;
    let pX = -canvas.width;
    let pY = randomNumber(canvas.height - 350, 10);

    let pHeight = 60;
    for (let i = 0; i < 1; i++) {
        planes.push(new Plane(pX, pY, pWidth, pHeight));
    }
}

//create a new variable and store a video element in it
backgroundSong = document.createElement("video");
backgroundSong.src = randomSong(songArray);


//draw the player logo

//create a class for the background 
class Background {
    constructor(img, gameSpeed, backgroundWidth) {

        this.img = img;
        this.image = new Image();
        this.image.src = this.img;
        this.gameSpeed = gameSpeed;
        this.speedMod = randomNumber(2.5, 1.5);
        this.speed = this.speedMod * this.gameSpeed;
        this.backgroundWidth = backgroundWidth;
        this.x = 0;
        this.x2 = this.backgroundWidth;
        this.y = 0;
        //innerheight and innerwidth are the same as window.innerHeight window.innerWidth
        this.width = innerWidth;
        this.height = innerHeight;

        this.draw = () => {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
        }

        //create the update function
        this.update = () => {
            this.draw();

            //condition for the parallax effect if the player wanna move forward
            if (this.x < -this.backgroundWidth) {
                this.x = this.backgroundWidth + this.x2 / this.speed;
            } else {
                // this.x -= this.speed;
            }
            ///test the condition for the second image
            if (this.x2 < -this.backgroundWidth) {
                this.x2 = this.backgroundWidth + this.x / this.speed;
            } else {
                //  this.x2 -= this.speed;
            }

            //the condition for the parallax effect if the player wanna move backward
            if (this.x > this.backgroundWidth) {
                this.x = -this.backgroundWidth + this.x2 / this.speed;
            } else {
                // this.x += this.speed;
            }
            ///test the condition for the second image
            if (this.x2 > this.backgroundWidth) {
                this.x2 = -this.backgroundWidth + this.x / this.speed;
            } else {
                // this.x2 += this.speed;
            }

            if (movingRight) {
                this.x -= this.gameSpeed;
                this.x2 -= this.gameSpeed;

            }
            if (movingLeft) {
                this.x += this.gameSpeed;
                this.x2 += this.gameSpeed;
            }

        }
    }
}

//create a class for the background grass
class BackgroundGrass{
      constructor() {
        this.image = new Image();
        this.image.src = "grassBackground.png";
        this.gameSpeed = gameSpeed;
        this.speedMod = randomNumber(2.5, 1.5);
        this.speed = this.speedMod * this.gameSpeed;
        this.backgroundWidth =4171;
        this.x = 0;
        this.x2 = this.backgroundWidth;
        this.y = innerHeight-70;
        //innerheight and innerwidth are the same as window.innerHeight window.innerWidth
        this.width = innerWidth-70;
        this.height = innerHeight-480;

        this.draw = () => {
            ctx.drawImage(this.image, this.x, this.y, innerWidth, this.height);
            ctx.drawImage(this.image, this.x2, this.y, innerWidth, this.height);
        }

        //create the update function
        this.update = () => {
            this.draw();

            //condition for the parallax effect if the player wanna move forward
            if (this.x < -this.backgroundWidth) {
                this.x = this.backgroundWidth + this.x2 / this.speed;
            } else {
                // this.x -= this.speed;
            }
            ///test the condition for the second image
            if (this.x2 < -this.backgroundWidth) {
                this.x2 = this.backgroundWidth + this.x / this.speed;
            } else {
                //  this.x2 -= this.speed;
            }

            //the condition for the parallax effect if the player wanna move backward
            if (this.x > this.backgroundWidth) {
                this.x = -this.backgroundWidth + this.x2 / this.speed;
            } else {
                // this.x += this.speed;
            }
            ///test the condition for the second image
            if (this.x2 > this.backgroundWidth) {
                this.x2 = -this.backgroundWidth + this.x / this.speed;
            } else {
                // this.x2 += this.speed;
            }

            if (movingRight) {
                this.x -= this.gameSpeed;
                this.x2 -= this.gameSpeed;

            }
            if (movingLeft) {
                this.x += this.gameSpeed;
                this.x2 += this.gameSpeed;
            }

        }
    }
}
//show the player an intro to the game when they start the game
THROW_MSG(canvas.width/2,canvas.height/2,"Welcome To The Alien World Try Your Best To Survive","blue",4);
var grassFloor=new BackgroundGrass();
var PLAYER_STATS_INFO;
var PLAYER_STATS_SHOOTING_ACCURACY;
var PLAYER_STATS_TELEPORT;
var numberOfTeleports=0;
var teleport=false;
var teleported=false;

function CHECK_PLAYER_STATE(){
    requestAnimationFrame(CHECK_PLAYER_STATE);
    //changeHighScore();
    if(!playingGame){
       GAME_GUI_SONG.play();
    }else{
     GAME_GUI_SONG.pause();
    }
}






function animate() {
    animateId = requestAnimationFrame(animate);
    
    worldSpeed++;

    playingGame = true;


ENEMY_STATS_INFO=new PlayerStatsInfo("Shots On Target: "+enemyKilled,"lime",120);
PLAYER_STATS_INFO=new PlayerStatsInfo("Player-State: "+playerLifeState,"lime",150);
PLAYER_STATS_SHOOTING_ACCURACY=new PlayerStatsInfo("Shooting-Accuracy: "+Math.floor((enemyKilled/400)*100)+"%","blue",180);
PLAYER_STATS_TELEPORT=new PlayerStatsInfo("Teleports: "+numberOfTeleports,"lime",210);
//set a condition to check if the player is out of the game area

if(player.x+player.width<0){

//reposition the player to walk foward
   player.x=innerWidth-player.width;
}

if(player.x+player.width>canvas.width){

//reposition the player to walk foward
    player.x=0;
}

if(player.y<0){
    player.y+=canvas.height+player.height;
  
}
      if(score>=10&&teleported==false){
       numberOfTeleports=1;
     
    }
    if(teleported==true){
         teleported=false;
    }
    //check the current score and calls a function depending on the level the user is playing
    try {

        if (playingLevelOne&&score>=20) { 
                gameSpeed=7;
                bgLevel=2;
                playingLevelTwo=true;
                playingLevelOne=false;
                THROW_MSG(canvas.width/2,canvas.height/2,"Level One Up...","blue",2);
                init();

        }
        if (playingLevelTwo&&score>=40) { 
                gameSpeed=8;
                bgLevel=3;
                playingLevelTwo=false;
                playingLevelThree=true;
                THROW_MSG(canvas.width/2,canvas.height/2,"Level Two Up...","blue",2);
                init();

        }
        if (playingLevelThree&&score>=60) {
                gameSpeed=10;
                bgLevel=4;
                playingLevelThree=false;
                playingLevelFour=true; 
                THROW_MSG(canvas.width/2,canvas.height/2,"Level Three Up...","blue",2);
                init();
        }
        if (playingLevelFour&&score>=80) { 
                gameSpeed=12;
                bgLevel=5;
                playingLevelFour=false;
                playingLevelFive=true;
                THROW_MSG(canvas.width/2,canvas.height/2,"Level Four Up...","blue",2);
                init();
        }
        if (playingLevelFive&&score>=100) {
                gameSpeed=13;
                bgLevel=6;
                playingLevelFive=false;
                playingLevelSix=true;
                THROW_MSG(canvas.width/2,canvas.height/2,"Level Five Up...","blue",2);
                init();
        }
        if (playingLevelSix&&score>=120) {
                gameSpeed=14;
                bgLevel=7;
                playingLevelSix=false;
                playingLevelSeven=true;
                THROW_MSG(canvas.width/2,canvas.height/2,"Level Six Up...","blue",2);
                init();
        }
        if (playingLevelSeven&&score>=140) {
                gameSpeed=15;
                bgLevel=8;
                playingLevelSeven=false;
                playingLevelEight=true;
                THROW_MSG(canvas.width/2,canvas.height/2,"Level Seven Up...","blue",2);
                init();
        }
        if (playingLevelEight&&score>=160) {
                gameSpeed=15.5;
                bgLevel=9;
                playingLevelEight=false;
                playingLevelNine=true;
                THROW_MSG(canvas.width/2,canvas.height/2,"Level Eight Up...","blue",2);
                init();
        }
        if (playingLevelNine&&score>=180) {
                gameSpeed=15.6;
                bgLevel=10;
                playingLevelNine=false;
                playingLevelTen=true;
                THROW_MSG(canvas.width/2,canvas.height/2,"Level Nine Up...","blue",2);
                init();
        }
        if (playingLevelTen&&score>=200) {
                gameSpeed=15.7;
                bgLevel=11;
                playingLevelTen=false;
                playingLevelEleven=true;
                THROW_MSG(canvas.width/2,canvas.height/2,"Level Ten Up...","blue",2);
                init();
        }
        if (playingLevelEleven&&score>=220) {
                gameSpeed=16;
                bgLevel=12;
                playingLevelEleven=false;
                playingLevelTwelve=true;
                THROW_MSG(canvas.width/2,canvas.height/2,"Level Eleven Up...","blue",2);
                init();
        }
        if (playingLevelTwelve&&score>=240) {
                gameSpeed=20;
                bgLevel=12;
                playingLevelEleven=false;
                playingLevelTwelve=true;
                THROW_MSG(canvas.width/2,canvas.height/2,"Level Twelve Up Endless Mode....","blue",2);
                init();
        }

    } catch (error) {
        console.error("An error occurred during game processing..");
        console.error(error.stack);
    }



  randomSpeed5++;
  randomSpeed4++;
  randomSpeed3++;
  randomSpeed++;
  randomSpeed2++;


 randomSpawnNumber1=randomNumber(6000,4000);
 randomNumber2=randomNumber(8000,7000);

 randomNumber3=randomNumber(3000,2000);
 randomNumber4=randomNumber(8000,6000);

 randomNumber5=randomNumber(10000,8000);

//play the gui background song
//GAME_GUI_BACKGROUND_SONG_PLAY();


    //if the game is being played then play the background song
    if (playing==true) {
        backgroundSong.play();
        //reduce the background sound so it plays softly
        backgroundSong.volume = 0.5;
        //if the current song have finished playing then play another random song while playing the game
        if(backgroundSong.ended){
            //choose any random song from the song array and play the song
            backgroundSong.src=randomSong(songArray);
         //   console.log("current song have finished playing");
        }
       
    }

  
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    bg.update();
    scoreBox.innerHTML="SCORE: "+ score;

   // grassFloor.update();

    //animate the grass floor
   
    ctx.drawImage(grass, grassBackgroundX, innerHeight - 70, innerWidth, innerHeight - 480);

    player.update();
    playerStats.update();


    hoverBoard.update();

    playerCollideHoverBoard = false;
    if (gameObjectColliding(player, hoverBoard)) {
        //reposition the player to fit the middle of the hover board
        player.y = hoverBoard.y - 100;
        //if the player collides with the hover board and the player pressed the up key, take the player up else if the player pressed the down key take the player down
        //  player.move.down ? hoverBoard.y += hoverBoard.velocity.dy : hoverBoard.y + hoverBoard.velocity.dy;

        hoverBoard.y -= hoverBoard.velocity.dy;

        playerCollideHoverBoard = true;

    }




    if (hoverBoard.y + hoverBoard.height > canvas.height || hoverBoard.y - hoverBoard.height - player.height < 0) {
        hoverBoard.y += hoverBoard.velocity.dx;
    }

    if (!playerCollideHoverBoard) {
        hoverBoard.reposition();
    }
    if (!playerCollideHoverBoard && player.move.up == false) {
        player.reposition();
    }
    //animate the enemy
    monsters.forEach((monster, monsterIndex) => {
            monster.update();

            //remove the monsters from the screen if the monster is out from the screen
            if (monster.x + monster.width > canvas.width + 110) {
                monsters.splice(monsterIndex, 1);
            }


         
        if(gameObjectColliding(monster,player)){
            playerHarmed=true;
            lifeBar.width--;
           
        }else{
            playerHarmed=false;
        }
            //  console.log(getDistance(player.x, player.y, monster.x, monster.y))
            if (gameObjectColliding(player, monster) && player.frameNumber == 5) {
                monster.velocity.dx = -monster.velocity.dx * 2;

                setTimeout(() => {
                    monster.velocity.dx = 5;
                }, 100);
                
            }

           

        })

        //animate the enemy
    enemies.forEach((enemy, enemyIndex) => {

    
        //draw and update the enemy
        enemyLifeBar.x=enemy.x+enemy.reposition.x;
        enemyLifeBar.y=enemy.y-enemy.reposition.y;
        enemy.update();
         //update the enemy life
        enemyLifeBar.update();
        //remove the enemy from the screen if the enemy has gone away from the screen 
        if (enemy.x + enemy.width < 0) {
            enemies.splice(enemyIndex, 1);
        }


         if(gameObjectColliding(enemy,player)){
            playerHarmed=true;
        }else{
            playerHarmed=false;
        }
        //create a kick like scene if the player slides and kick the enemies
        if (gameObjectColliding(player, enemy) && player.frameNumber == 5) {
            //create a physics reaction to show the enemy moved backword
            enemy.velocity.dx = -enemy.velocity.dx * 2;


            //after some time, the velocity should be positive 
            setTimeout(() => {
                enemy.velocity.dx = 5;
            }, 100);
        }


    });
//animate the player stats here
    ENEMY_STATS_INFO.update();
    PLAYER_STATS_INFO.update();
    PLAYER_STATS_SHOOTING_ACCURACY.update();
    PLAYER_STATS_TELEPORT.update();

    //the end game condition lies here
            if(playerHarmed){
                deadSound.play();
                //playerDead.play();
               lifeBar.width--;
               //135 is the life bar width divided by 2
               if(lifeBar.width<135){
                playerLifeState="Injured..";
                lifeBar.color="red";
               }
               //if the player is dead
               if(lifeBar.width<=0){
                
                THROW_MSG(canvas.width/2,canvas.height/2,"Game Over You Couldn't Kill A Damn Alien !!!","red",3);
                //loop through all the game object and remove all the objects on the screen
                monsters.forEach((monster,monsterIndex)=>{
                    //remove the current monster from the screen 
                    monsters.splice(monsterIndex,1);
                });

                birds.forEach((bird,birdIndex)=>{
                    //remove the current bird from the screen 
                    birds.splice(birdIndex,1);

                });

                planes.forEach((plane,planeIndex)=>{
                    //remove the plane from the screen if there is any at that moment 
                    planes.splice(planeIndex,1);
                });


                enemies.forEach((enemy,enemyIndex)=>{
                    //remove the current enemy from the screen if there is any at the moment 
                    enemies.splice(enemyIndex,1);

                });


                cancelAnimationFrame(animateId);
                document.body.style.fontFamily="corbel";
                scoreBox.style.display="none";
                //check if the player have broken his own highscore and update the latest highscore to the database
                changeHighScore();
                setTimeout(()=>{
                        
                swal.fire({

                title: "Game Over",
                text:"YOU ARE DEAD, YOU WERE KILLED BY THE ALIEN...",
                icon: "info",
                timer: 20000,
                showCloseButton: true,
                showCancelButton:true,
                footer: "Powered By EmmSoft Games EG" + "<sup>TM</sup>"

                }).then((willProceed)=>{
                    if(willProceed){
                        //dispay a message to show the user's score...
                        swal.fire({
                            title:score,
                            text:"You Score Is .... "+score,
                            timer:10000,
                            showCloseButton:true,
                            showCancelButton:true,
                            footer:"Powered By EmmSoft Games EG" + "<sup>TM</sup>"
                        }).then((willProceed)=>{
                            if(willProceed){
                                //if the user clicks the confirm button then refresh the page for the user to start a new game
                                location.reload();
                            }else{
                                //if the user clicks the cancel button or the close button the reload the page also
                                location.reload();
                            }
                        })
                    }
                })

                },1000)
               }
            
    }
    //animate the powerups

    powerUps.forEach((powerUp, powerUpIndex) => {
        powerUp.update();

        if (gameObjectColliding(player, powerUp)) {

            playPowerUpSound();
            //remove the powerUp from the game area
            //remove the powerup starting form the current index and remove only one powerup from the game area

            powerUp.taken = true;
            powerUp.velocity.dx=0;
            setTimeout(() => {
                powerUp.taken = false;
                setTimeout(() => { powerUps.splice(powerUpIndex, 1) }, 0);

            },0);

        }



        if (powerUp.powerUpType.AI && powerUp.taken) {
          
          //feature would be added in next upgrade

        }
        if (powerUp.powerUpType.Boost && powerUp.taken) {
       
            //this powerup speeds up the player's movement by a certain amount and then slows it down after some time
            //gives the player a random global speed from 5 to 10
            player.GLOBAL_SPEED = randomNumber(3, 2);

            bullets.forEach(bullet=>{
                bullet.velocity.dx=BULLET_POWERUP_SPEED;
            });
           // THROW_MSG(canvas.width/2,canvas.height/2,"BOOST...","white",7);

            setTimeout(() => {
                //reset the player's global speed after some period of time which is after 10 seconds that's 10000 milliseconds 
                player.GLOBAL_SPEED = 2;

                bullets.forEach(bullet=>{
                    bullet.velocity.dx=gameSpeed*randomNumber(5,3);


                });
             //   THROW_CUSTOM_MESSAGE(canvas.width/2,canvas.height/2,"POWERUP DEACTIVATED!","red",7);
            }, 5000);

        }
        if (powerUp.powerUpType.Upgrade && powerUp.taken) {
        
                     //this type of powerup increase the player's life and also adds to the player score but in a lesser value
            if (lifeBar.width < 100) {
                lifeBar.color="blue";
                lifeBar.width=270;
                playerLifeState="Active..";
                
            }
            var upgradeValue = randomNumber(20, 10);

            score += upgradeValue;

           // THROW_MSG(canvas.width/2,canvas.height/2,"UPGRADE...","white",7);
        }
        if (powerUp.powerUpType.Replenish && powerUp.taken) {
            //this type of powerup adds to the score, upgrade the player and also boost the player
            //add a condition to check if the player's life is less than 100 if so, then set it to 100 hence adding to the player H{}P
            if (lifeBar.width < 175) {
                lifeBar.width = 270;
                lifeBar.color="blue";
                playerLifeState="Active..";
            }
            //set the player global speed to be random value from 10 to 5
            player.GLOBAL_SPEED = randomNumber(3, 3);
           // THROW_MSG(canvas.width/2,canvas.height/2,"REPLENISH...","white",7);
            setTimeout(() => {
                //after 10 seconds which is 10000 milliseconds , reset the player's global speed back to 4
                player.GLOBAL_SPEED = 2;

               // THROW_CUSTOM_MESSAGE(canvas.width/2,canvas.height/2,"POWERUP DEACTIVATED!","red",7);

            }, 5000);
          
            //add to the player's score
            var scoreIncrementor = randomNumber(0.1, 0.1);
            score += Math.floor(scoreIncrementor);

          
           // console.log(score);
        }
        if (powerUp.powerUpType.ScoreIncrement && powerUp.taken) {
    
            //this type of powerup increments the player's score by a random value
            
            //add to the player's score
            var scoreIncrementor = randomNumber(0.2, 0.2);
            score += Math.floor(scoreIncrementor);
        }
    });
    //update the player's logo
    playerLogo.update();

    //update the msg
    msgs.forEach((msg,msgIndex)=>{
        msg.update();
    //add a condition to check if the message has gone out of the screen
    if(msg.y<0){
        //if the message is gone then remove it from the message arra
        msgs.splice(msgIndex,1);

    }

    })
    //update the player's life
    lifeBar.update();
   
    //animate the bullet
    bullets.forEach((bullet, bulletIndex) => {

        bullet.update();
    });

    //animate the birds
    birds.forEach((bird, birdIndex) => {


        bird.update();
    });

    //animate the explosions
    explosions.forEach((explosion, explosionIndex) => {
        explosion.update();
    });
    //animate the planes
    planes.forEach((plane, planeIndex) => {
        plane.update();
    });

     //animate the ravens
    ravens.forEach((raven, ravenIndex) => {
        raven.update();
    });

    //animate the grass monsters
    grassMonsters.forEach((grassMonster, grassMonsterIndex) => {
        grassMonster.update();
    })


    //collision detection keyCode
    //if the bullet hits the enemy
    bullets.forEach((bullet, bulletIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
            if (gameObjectColliding(bullet, enemy)) {
               
                //create an explosion effect
                shot=true;

                spawnExplosion(enemy.x, enemy.y);
                setTimeout(() => {
                    setTimeout(() => {
                        //remove the explosion effect after 200 milliseconds
                        explosions.forEach((explosion, explosionIndex) => {
                            explosions.splice(explosionIndex, 1);
                        });
                    }, 300);
                    //remove the bullets away from the game

                    bullets.splice(bulletIndex, 1);

                    //remove from the enemy life 
                    if(player.shooting&&enemy.dead==false){
                        enemyLifeBar.width-=25;
                         
                        
                    }
                    
                    //if the enemy life is less than a certain value then the lfe should change to red
                    if(enemyLifeBar.width<40){
                        enemyLifeBar.color="red";
                    }
                    if(enemyLifeBar.width==0){
                    enemyLifeBar.width=0;
                    enemy.dead = true;
                    enemyKilled++;
                    enemy.velocity.dx = 0;
                    setTimeout(() => {
                        enemyLifeBar.x=undefined;
                        enemyLifeBar.y=undefined;
                        
                        //set the x and y coordinate of the life bar to undefined to remove them from the screen when the player is also removed from the screen
                       

                    }, 2000);
                    if(enemy.dead){
                        enemies.splice(enemyIndex, 1);

                        THROW_MSG(enemy.x,enemy.y,"+5","white",15);
                        score+=5;
                    }


                    }
           
                }, 0)
            }
        });


        planes.forEach((plane, planeIndex) => {
            if (gameObjectColliding(bullet, plane)) {
                //create an explosion effect
                spawnExplosion(plane.x, plane.y);
                setTimeout(() => {
                    setTimeout(() => {
                        //remove the explosion effect after 200 milliseconds
                        explosions.forEach((explosion, explosionIndex) => {
                            explosions.splice(explosionIndex, 1);
                        });
                    }, 400);
                    //remove the bullets away from the game
                    bullets.splice(bulletIndex, 1);
                    //remove the plane that was destroyed
                    planes.splice(planeIndex, 1);
                    score+=5;
                    THROW_MSG(plane.x,plane.y,"+5","white",10);
                }, 0)
            }
        });


        //set a collision detection for the birds
        birds.forEach((bird, birdIndex) => {
        
            if (gameObjectColliding(bullet, bird)) {
               
                //create an explosion effect
                spawnExplosion(bird.x, bird.y);

                setTimeout(() => {
                    setTimeout(() => {
                        //remove the explosion effect after 200 milliseconds
                        explosions.forEach((explosion, explosionIndex) => {
                            explosions.splice(explosionIndex, 1);
                        });
                    }, 400);
                    //remove the bullets away from the game

                    bullets.splice(bulletIndex, 1);
                    //remove the bird that was shot from the game
                    
                    birdSoundDead.play();
                    
                    //if the bird is dead
                     bird.dead = true;
                  
                    birdSoundFlying.pause();
                }, 0);
            }

            if (bird.x + bird.width > canvas.width) {
                birds.splice(birdIndex, 1);
                birdSoundFlying.pause();
            }

            if(bird.dead){
                //if the bird is dead then remove it from the screen
                birds.splice(birdIndex, 1);
                //then increment the user score
                score+=5;
                //throw a new message to the user that he has successfuly killed the bird
                THROW_MSG(bird.x,bird.y,1,"+5","white",15);
            }
        });

        //set a collision detection for the monsters
        monsters.forEach((monster, monsterIndex) => {


            if (gameObjectColliding(bullet, monster)) {
             
                //create an explosion effect
                spawnExplosion(monster.x, monster.y);
                setTimeout(() => {
                    setTimeout(() => {
                        //remove the explosion effect after 200 milliseconds
                        explosions.forEach((explosion, explosionIndex) => {
                            explosions.splice(explosionIndex, 1);
                        });
                    }, 300);
                    //remove the bullets away from the game

                    monsters.splice(monsterIndex, 1);

                    bullets.splice(bulletIndex, 1)
                    
                    //remove the monster that was shot away from the game
                    monster.dead = true;
                      //increment the player score 
                    score+=5;
                    enemyKilled++;
                         //throw a new message to the player that the monster is dead
                     THROW_MSG(monster.x,monster.y,"+5","white",15);
                   
                 
                   
                              


                    
                }, 0)
            }
        })
    });






}

  
//this can be added to the the player constructor to make code more refactored but it would slow the animation frame which i don't want
addEventListener("keydown", e => {
  
    switch (e.keyCode) {
        case 32:
            //if the player is moving either right or left , the frame number should be 0 to switch to attack frame or mode
            if (player.move.right || player.move.left) {
                player.frameNumber = 0;
            }
            spawnBullets();
            player.shooting = true;

            break;
        case 84:
            //clear the screen and reinitialize every game object
            //if the player have more than 0 teleporting power then teleport them 
            if(numberOfTeleports>0){
              init();
              //reposition the player away from the current enemy
              player.x=innerWidth-player.width;
              numberOfTeleports-=1; 
              teleported=true;
            }
         
            break;
        default:
        //do nothing if the player presses any other key 
            break;
    }
});
//add new bullets into the bullet array
function spawnBullets() {
    for (let i = 0; i < 1; i++) {
        bullets.push(new Bullet());
    }
}

//set the value of the random spawn time of the enemies and other game object to a controlled random so the player wouldn't be able to predict where the enemy is coming from
setInterval(()=>{

 randomSpawnNumber1=randomNumber(6000,4000);
 randomNumber2=randomNumber(12000,9000);

 randomNumber3=randomNumber(3000,2000);
 randomNumber4=randomNumber(35000,30000);

 randomNumber5=randomNumber(30000,25000);
 //clear the console for any error
 console.clear();
},1000);

CHECK_PLAYER_STATE();



//developed by Adedoyin Emmanuel 
//powered by Emmysoft Games EG games
//for more games check me out on github @ Adedoyin-Emmanuel