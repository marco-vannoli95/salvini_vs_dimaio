let bg;
var fire = false;
var aliens = []
var missiles = []
var missiles_old = []
var score = 0
var hit;
var vite = 3;
var number_aliens = 15
var cnv;
var left = false;
var right = false;


function setup() {
  // The background image must be the same size as the parameters
  // into the createCanvas() method. In this program, the size of
  // the image is 720x400 pixels.
  createCanvas(window.innerWidth-10, window.innerHeight-100);
  resizeCanvas(window.innerWidth-10, window.innerHeight-100)
  nacelle1 = new Nacelle();
  for (let i = 0; i < number_aliens; i++) {
    aliens.push(new Alien());
  }
  preload()
}
function preload(){
    image_nacelle = loadImage('image/salvini.png')
    image_alien = loadImage('image/maio.png')
    image_missilie = loadImage('image/salvini_premier.png')
    bg = loadImage('image/senato.jpg');
}
function draw() {
  background(bg); 
  nacelle1.display();
  for (let missile of missiles) {
    missile.move();
    missile.display();
    missile.y -= 1;
    for(let alien of aliens) {
      var index = aliens.indexOf(alien);
        if(alien.hits(missile)){
            console.log(alien)
            aliens.splice(index, 1);
            score += 1
            number_aliens -= 1
            break;
        }
    }
 }

  for (let alien of aliens) {
    alien.move();
    alien.display();
    alien.y += 0.5;
    var index = aliens.indexOf(alien);
    if(alien.y >= window.innerHeight-100){
      aliens.splice(index, 1);
      score += 1
      number_aliens -= 1
      vite -= 1
    }
  }
  if(nacelle1.x <= 0)
     nacelle1.x = 0
  if(nacelle1.x >= window.innerWidth -60)
     nacelle1.x = window.innerWidth - 60
  keyPressed() 
  document.getElementById("score").innerHTML="Score : "+score;
  document.getElementById("vite").innerHTML="Vite : "+vite;

  if( vite == 0){
    noLoop();
  if (confirm("No si va alle elezioni. Di maio vince!")) {
    location.reload();
  }else{
    location.reload();
  }
  }else{
    if(number_aliens == 0){
      noLoop();
      if (confirm("Si va alle elezioni.Salvini ha vinto!")) {
        location.reload();
      }else{
        location.reload();
      }
    }
  }

  if( score == number_aliens){
    noLoop();
  if (confirm("Si va alle elezioni.Salvini ha vinto!")) {
    location.reload();
  }else{
    location.reload();
  }
  }
  if(left){
    nacelle1.x -= 5
  }
  if(right){
    nacelle1.x += 5
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
      nacelle1.x -= 5
    }
    if(keyCode === RIGHT_ARROW){
      nacelle1.x += 5
    }
    if(keyCode === 32){
      nacelle1.fire()
    }

}

class Nacelle {
constructor() {
    this.x = 20;
    this.y =  window.innerHeight-160;
    this.diameter = 70
    this.number_missilies = 1
}

display() {
    image(image_nacelle,this.x, this.y, this.diameter, this.diameter);
} 

    fire(){
        missiles.push(new Missiles());
    }
}

class Missiles {
    constructor() {
      this.x = nacelle1.x + 10
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



class Alien {
    constructor() {
      this.x = random(0,window.innerWidth -60);
      this.y = random(0,250);
      this.diameter = 40
      this.speed = 0.1;
    }
  
    move() {
      this.x += random(-this.speed, this.speed);
      this.y += random(-this.speed, this.speed);
    }
  
    display() {
      image(image_alien,this.x, this.y, this.diameter, this.diameter);
    }

    hits(missile){
       return collideRectRect(this.x,this.y,this.diameter,this.diameter,missile.x,missile.y,missile.diameter,missile.diameter);
    }
  }


