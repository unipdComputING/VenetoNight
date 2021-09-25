let DXgrid = 50;
let DYgrid = 50;
let TOLLSNAP = 20;
let particles = [];
let truss = [];
let idclick
let x0 = [];
let idps = [];
let loadtest = [0.0, 0.1];
let dvloadtest = [0.0, 0.02];
let doloadtest = [0.2, 0.0];
let i;
let start;

function setup(){
  let cnv = createCanvas(1200, 600); 
  cnv.parent('canvasDiv');
  //cnv.position(50, 100);
  start = false
  idclick = -1;
  i = 1;
  let totXgrid = int(width / DXgrid);
  let totYgrid = int(height / DYgrid);
  let p = new Particle([Math.max(1.0, int(random(0.25 * totXgrid))) * DXgrid, DYgrid * (int(0.5 * totYgrid) + int(random(0.5 * totYgrid)))]);
  //let p = new Particle([random(0.25 * width), 0.5 * height + random(0.5 * height)]);
  p.fix = [true, true];
  particles.push(p);
  p = new Particle([Math.min(totXgrid - 1, (int(0.75 * totXgrid) + int(random(0.25 * totXgrid)))) * DXgrid, DYgrid * (int(0.5 * totYgrid) + int(random(0.5 * totYgrid)))]);
  //p = new Particle([0.75 * width + random(0.25 * width),  0.5 * height + random(0.5 * height)]);
  p.fix = [false, true];
  particles.push(p);
}

function draw(){
  background(50, 150, 255);
  makeGrid(DXgrid, DYgrid);

  for(let el of truss){
    el.update(particles[el.idps[0]], particles[el.idps[1]]);
    if (el.broken == false){
      particles[el.idps[0]].addLoad(el.f1);
      particles[el.idps[1]].addLoad(el.f2);
      el.draw();
    }else{
      
      let idel = truss.indexOf(el);
      truss.splice(idel, 1);
    }
  }

  if (start){
    //console.log('ok')
    let dim = particles.length;
    //loadtest[0] = loadtest[0] / dim;
    //loadtest[1] = loadtest[1] / dim;
    for (let i = 0; i< dim; i++){
      if((!particles[i].fix[0]) && (!particles[i].fix[1])){
        particles[i].addLoad(loadtest);
      }
    }
  }

  for(let p of particles){
    p.update();
    p.draw();
  }


  if (idclick == 0){
    push();
    strokeWeight(1);
    line(x0[0], x0[1], mouseX, mouseY);
    pop();
  }
}

function mouseClicked(){
  p = new Particle([mouseX, mouseY]);
  let id = -1;
  [id, particles] = findNewPart(p, particles);
  //particles.push(p);
  //let id = particles.length -1;
  idclick += 1;
  if (idclick == 0){
    x0[0] = mouseX;
    x0[1] = mouseY;
    idps.push(id);
  }
  if (idclick == 1){ 
    idclick = -1;
    idps.push(id);
    let trus = new Trus(idps, particles[idps[0]], particles[idps[1]]);
    truss.push(trus);
    idps = [];
  }
}

function findNewPart(newp, particles){
  let snap = 0.5 * newp.d + TOLLSNAP;
  let id = particles.length -1;
  if (id < 0){
    id = 0;
    particles.push(newp);
    return [id, particles];
  }
  let cont = 0;
  for(let p of particles){
    let d = newp.dist(p);
    //console.log(d);
    if (d < snap){
      id = cont;
      break
    }
    cont += 1;
  }
  if(cont > id){
    id += 1;
    particles.push(newp);
  }
  return [id, particles];
}

function keyPressed() {
  console.log(keyCode);
  if (keyCode === 83) { // 's'
    start = true;
  } else if (keyCode === 69) { // 'e'
    noLoop();
  } else if (keyCode == 27){ //esc
    idclick = -1;
    idps = [];
  } else if (keyCode == 78){ // 'n'

  }  else if (keyCode == 38){ // 'up arrow'
    loadtest[0] = loadtest[0] - dvloadtest[0];
    loadtest[1] = loadtest[1] - dvloadtest[1];
  }  else if (keyCode == 40){ // 'down arrow'
    loadtest[0] = loadtest[0] + dvloadtest[0];
    loadtest[1] = loadtest[1] + dvloadtest[1];
  } else if (keyCode == 37){ // 'left arrow'
    loadtest[0] = loadtest[0] - doloadtest[0];
    loadtest[1] = loadtest[1] - doloadtest[1];
  } else if (keyCode == 39){ // 'right arrow'
    loadtest[0] = loadtest[0] + doloadtest[0];
    loadtest[1] = loadtest[1] + doloadtest[1];
  }
}

function makeGrid(dx, dy){
  let x = 0;
  let y = 0;
  let dim = int(width / dx);
  push();
  strokeWeight(0.5);
  stroke(192, 192, 192);
  for (let i = 0; i < dim; i++){
    line(x, 0, x, height);
    x += dx;
  }
  for (let i = 0; i < dim; i++){
    line(0, y, width, y);
    y += dy;
  }
  pop();
}