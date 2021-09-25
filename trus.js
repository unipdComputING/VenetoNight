class Trus{

  constructor(idps, p1, p2){
    this.idps = idps;
    this.x01 = p1.x.slice();
    this.x02 = p2.x.slice();
    this.x1 = p1.x.slice();
    this.x2 = p2.x.slice();
    this.l0 = this.length (this.x1, this.x2);
    this.l00 = this.l0;
    this.f1 = [0, 0];
    this.f2 = [0, 0];
    this.stiff = 0.5;
    this.stiff = this.stiff;
    this.t = 5;
    this.broken = false;
  }

  length (x1, x2){
    return Math.sqrt(Math.pow(x2[0] - x1[0], 2) + Math.pow(x2[1] - x1[1], 2));
  }

  unit(x1, x2){
    let n = [0, 0];
    let l = this.length (x1, x2);
    n[0] = (x2[0] - x1[0]) / l;
    n[1] = (x2[1] - x1[1]) / l;
    return n;
  }

  scale(vec, val){
    vec[0] = vec[0] * val;
    vec[1] = vec[1] * val;
    return vec;
  }

  globalAngle(){
    let dX    = this.x2[0] - this.x1[0];
    let dY    = this.x2[1] - this.x1[1];
    let L     = Math.sqrt(dY*dY + dX*dX);
    let alpha = 0.0;
    let TOLL = 0.01;
    if (abs(dX) > TOLL){
      alpha = Math.atan(dY / dX);
    }
    return alpha;
  }

  stiffness(){
    //if (abs(this.l00 - this.l0) / this.l00 > 0.1){
    //  this.stiff = this.stiff * 2;
    //}
    let k = this.stiff;
    let Kl = [[k, 0, -k, 0],[0, 0, 0, 0],[-k, 0, k, 0],[0, 0, 0, 0]];
    let alpha = this.globalAngle();
    let c = Math.cos(alpha);
    let s = Math.sin(alpha);
    let R = [[ c , -s , 0.0, 0.0],
             [ s ,  c , 0.0, 0.0],
             [0.0, 0.0,  c , -s ],
             [0.0, 0.0,  s ,  c ]];
    let RK = [[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]];
    let K = [[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]];
    for(let i = 0; i < 4; i++){
      for(let j = 0; j < 4; j++){
        for(let h = 0; h < 4; h++){
          RK[i][j] = RK[i][j] + R[i][h] * Kl[h][j];
        }

      }
    }

    for(let i = 0; i < 4; i++){
      for(let j = 0; j < 4; j++){
        for(let h = 0; h < 4; h++){
          K[i][j] = K[i][j] + RK[i][h] * R[j][h];
        }

      }
    }
    return K;
  }

  update(p1, p2){
    //this.x01[0] = this.x1[0];
    //this.x01[1] = this.x1[1];
    //this.x02[0] = this.x2[0];
    //this.x02[1] = this.x2[1];

    let f = [0, 0, 0, 0];

    if (this.l00 == 0){
      console.log('l00 = 0');
      this.broken = true;
      return
    } else if(abs((this.l0 - this.l00) / this.l00) > 0.5){
      console.log(abs((this.l0 - this.l00) / this.l00));
      this.broken = true;
      return
    }
    this.x1[0] = p1.x[0];
    this.x1[1] = p1.x[1];
    this.x2[0] = p2.x[0];
    this.x2[1] = p2.x[1];
    let u = [this.x1[0] - this.x01[0], this.x1[1] - this.x01[1], this.x2[0] - this.x02[0], this.x2[1] - this.x02[1]];
    let K = this.stiffness();
    let l = this.length (this.x1, this.x2);
    //let f = [0, 0, 0, 0];
    for(let i = 0; i < 4; i++){
      for(let j = 0; j < 4; j++){
        f[i] = f[i] + K[i][j] * u[j];
      }
    }
    this.f1 = [-f[0], -f[1]];
    this.f2 = [-f[2], -f[3]];

    this.l0 = l;
  }


  draw(){
    push();
    strokeWeight(2);
    line(this.x1[0], this.x1[1], this.x2[0], this.x2[1]);
    pop();
  }

}