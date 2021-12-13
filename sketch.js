//Natalia Soledad Enriquez
//titulo:Animación
//Cree una obra artistica donde los objetos que utilice se mueven de acuerdo a lo que suena.
let cubeteado = []; //array
let fft;
let sound;

function preload() {
  sound = loadSound("musica/musicap52.mp3");


}
function setup() {
  createCanvas(400, 400, WEBGL);
  sound.play();
  fft = new p5.FFT();// ACTIVA FOURIER
  sound.amp(0.2);
}

function draw() {
  background(0);
  translate(-width / 2, -height / 2);
  let spectrum = fft.analyze();// Array de frecuencias
  let waveform = fft.waveform();//Array amplitud de onda

  //guardar los objetos Cubo en cubeteado
  for (let i = 0; i < 6; i++) {
    cubeteado[i] = new Cubo(
      i * 100,
      i * 100,
      spectrum[12],
      spectrum[20],
      spectrum[127],
      25,
      1,
      waveform[2] * 10000 //amplitud de onda
    );
    
    //invocar al metodo formarse en cada cubo
    cubeteado[i].formarse();
  }
  

 
}

class Cubo {
  constructor(pX, pY, col1, col2, col3, tam, vel, pZ) {
    this.tamanio = tam;
    this.posX = pX;
    this.posY = pY;
    this.posZ = pZ; //random(-width/2, width/2);
    this.velocidad = vel;
    this.color1 = col1;
    this.color2 = col2;
    this.color3 = col3;
  }
  formarse() {
    push();
    stroke(100, 100, 80);
    strokeWeight(1);
    translate(this.posX, this.posY, this.posZ);
    rotateX(millis() / 500);
    fill(this.color1, this.color2, this.color3);
    lights();
    box(this.tamanio);
    pop();
  }
}
