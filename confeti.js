const canvas = document.getElementById('confeti');
const ctx = canvas.getContext('2d');

let W = window.innerWidth;
let H = window.innerHeight;
canvas.width = W;
canvas.height = H;

const confetiCount = 120;
const confeti = [];
const particlesCount = 80;
const particles = [];

// Generar confeti azul y dorado
for(let i=0;i<confetiCount;i++){
  confeti.push({
    x: Math.random()*W,
    y: Math.random()*H - H,
    r: Math.random()*6 + 4,
    d: Math.random()*confetiCount,
    color: Math.random() > 0.5 ? '#ffd700' : '#0077b6',
    tilt: Math.random()*10 - 10,
    tiltAngleIncrement: Math.random()*0.07 + 0.05,
    tiltAngle: 0
  });
}

// Partículas de brillo (tipo gala)
for(let i=0;i<particlesCount;i++){
  particles.push({
    x: Math.random()*W,
    y: Math.random()*H,
    r: Math.random()*2+1,
    alpha: Math.random()*0.5 + 0.3,
    dx: (Math.random()-0.5)*0.5,
    dy: (Math.random()-0.5)*0.5,
    color: Math.random() > 0.5 ? '#ffd700' : '#0077b6'
  });
}

function draw(){
  ctx.clearRect(0,0,W,H);
  // Confeti
  confeti.forEach(c=>{
    ctx.beginPath();
    ctx.lineWidth = c.r/2;
    ctx.strokeStyle = c.color;
    ctx.moveTo(c.x + c.tilt + c.r/4, c.y);
    ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r/4);
    ctx.stroke();

    c.tiltAngle += c.tiltAngleIncrement;
    c.y += (Math.cos(c.tiltAngle)+1+c.r/2)/2;
    c.x += Math.sin(c.tiltAngle);

    if(c.y>H){
      c.x = Math.random()*W;
      c.y=-10;
      c.tilt = Math.random()*10 -10;
    }
  });

  // Partículas
  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = `rgba(${p.color === '#ffd700' ? '255,215,0' : '0,119,182'},${p.alpha})`;
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if(p.x<0 || p.x>W) p.dx*=-1;
    if(p.y<0 || p.y>H) p.dy*=-1;
  });
}

window.addEventListener('resize',()=>{
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
});

function animate(){
  requestAnimationFrame(animate);
  draw();
}
animate();
