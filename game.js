let bg;
var fire = false;
var dimaios = []
var missiles = []
var missiles_old = []
var score = 0;
var hit;
var number_aliens = 15
var cnv;
var left = false;
var right = false;
var score_tot = 0
var level = 1;
window.onload =  localStorage.setItem('level',1)
function setup() {
  // The background image must be the same size as the parameters
  // into the createCanvas() method. In this program, the size of
  // the image is 720x400 pixels.
  createCanvas(window.innerWidth, window.innerHeight-100);
  resizeCanvas(window.innerWidth, window.innerHeight-100)
  salvini = new Salvini();
  level = localStorage.getItem('level')
  if(level == 1 ){
  for (let i = 0; i < number_aliens; i++) {
    dimaios.push(new DiMaio());
  }
  }
  if( level == 2){
    number_aliens = 20
    for (let i = 0; i < number_aliens; i++) {
      dimaios.push(new Zingaretti());
    }
  }
  if( level == 3){
    number_aliens = 30
    for (let i = 0; i < number_aliens; i++) {
      dimaios.push(new Mattarella());
    }
  }
  }
function preload(){
    image_salvini = loadImage('image/salvini.png')
    image_dimaio = loadImage('image/maio.png')
    image_missilie = loadImage('image/salvini_premier.png')
    image_zingaretti = loadImage('image/zingaretti.jpg')
    image_mattarella = loadImage('image/mattarella.png')
    bg = loadImage('image/senato.jpg');
}
function draw() {
  background(bg); 
  salvini.display();
  console.log(score)
  console.log(number_aliens)
  for (let missile of missiles) {
    missile.move();
    missile.display();
    missile.y -= 1;
    for(let dimaio of dimaios) {
      var index = dimaios.indexOf(dimaio);
      var index_miss = missiles.indexOf(missile);
        if(dimaio.hits(missile)){
            dimaios.splice(index, 1);
            missiles.splice(index_miss,1)
            score += 1
            break;
        }
    }
 }
  for (let dimaio of dimaios) {
    dimaio.move();
    dimaio.display();
    dimaio.y += 0.5;
    var index = dimaios.indexOf(dimaio);
    if(dimaio.y >= window.innerHeight-80){
      noLoop();
      if (confirm("Non si va alle elezioni. salvini ha perso!")) {
        localStorage.setItem('level', 1)
        location.reload();
      }else{
        localStorage.setItem('level', 1)
        location.reload();
      }
    }
  }
  if(salvini.x <= 0)
    salvini.x = 0
  if(salvini.x >= window.innerWidth -60)
    salvini.x = window.innerWidth - 60
  keyPressed() 

  document.getElementById("livello").innerHTML="Livello : "+level;
  document.getElementById("score").innerHTML="  Kills : "+score;
  if(level == 1){
    if( score == number_aliens){
          missiles = []
          level = 2
          localStorage.setItem('level',level)
          preload();
          setup();
     }
   }
   if(level == 2){
    if( score == number_aliens+15){
        missiles = []
        level = 3
        localStorage.setItem('level',level)
        preload();
        setup();
     }
   }
   if(level == 3){
    if( score == number_aliens+35){
        if (confirm("si va alle elezioni. Salvini ha vinto!!")) {
          localStorage.setItem('level', 1)
          location.reload();
        }else{
          localStorage.setItem('level', 1)
          location.reload();
        }
     }
   }

  if(left){
    salvini.x -= 5
  }
  if(right){
    salvini.x += 5
  }

}

function left_mouve() {
  left = true
  right = false
}
function right_mouve() {
  right = true
  left = false
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
      salvini.x -= 5
    }
    if(keyCode === RIGHT_ARROW){
      salvini.x += 5
    }
    if(keyCode === 32){
      salvini.fire()
    }

}

class Salvini {
constructor() {
    this.x = 20;
    this.y =  window.innerHeight-160;
    this.diameter = 70
    this.number_missilies = 1
}

display() {
    image(image_salvini,this.x, this.y, this.diameter, this.diameter);
} 

    fire(){
        missiles.push(new Missiles());
    }
}

class Missiles {
    constructor() {
      this.x = salvini.x + 10
      this.y = window.innerHeight-140
      this.diameter = 10
      this.speed = 1;
    }
  
    move() {
      this.x += random(-this.speed, this.speed);
      this.y += random(-this.speed, this.speed);
    }
  
    display() {
        image(image_missilie,this.x, this.y, this.diameter, this.diameter);
    }
  }



class DiMaio {
    constructor() {
      this.x = random(0,window.innerWidth -50);
      this.y = random(0,150);
      this.diameter = 40
      this.speed = 1;
    }
  
    move() {
      this.x += random(-this.speed, this.speed);
      this.y += random(-this.speed, this.speed);
    }
  
    display() {
      image(image_dimaio,this.x, this.y, this.diameter, this.diameter);
    }

    hits(missile){
       return collideRectRect(this.x,this.y,this.diameter,this.diameter,missile.x,missile.y,missile.diameter,missile.diameter);
    }
  }
  class Zingaretti {
    constructor() {
      this.x = random(0,window.innerWidth -60);
      this.y = random(0,150);
      this.diameter = 40
      this.speed = 1;
    }
  
    move() {
      this.x += random(-2, 2);
      this.y += random(-this.speed, this.speed);
    }
  
    display() {
      image(image_zingaretti,this.x, this.y, this.diameter, this.diameter);
    }

    hits(missile){
       return collideRectRect(this.x,this.y,this.diameter,this.diameter,missile.x,missile.y,missile.diameter,missile.diameter);
    }
  }
  class Mattarella {
    constructor() {
      this.x = random(0,window.innerWidth -80);
      this.y = random(0,150);
      this.diameter = 60
      this.speed = 2;
    }
  
    move() {
      this.x += random(-2, 2);
      this.y += random(-1, this.speed);
    }
  
    display() {
      image(image_mattarella,this.x, this.y, this.diameter, this.diameter);
    }

    hits(missile){
       return collideRectRect(this.x,this.y,this.diameter,this.diameter,missile.x,missile.y,missile.diameter,missile.diameter);
    }
  }


