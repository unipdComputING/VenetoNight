class Particle{

  constructor(x){
    this.x = x;
    this.v = [0.0, 0.0];
    this.a = [0.0, 0.0];
    this.f = [0.0, 0.0];
    this.d = 10;
    this.color = [100, 100, 100];
    this.damping = 0.1;
    this.vmax = 1.5;
    this.fix = [false, false];
  }

  dist(p){
    return sqrt((p.x[0] - this.x[0]) * (p.x[0] - this.x[0]) + (p.x[1] - this.x[1]) * (p.x[1] - this.x[1]) );
  }

  addLoad(f){
    this.f[0] = this.f[0] + f[0];
    this.f[1] = this.f[1] + f[1];
  }

  magnitude(vec){
    return sqrt(vec[0] * vec[0] + vec[1] * vec[1]);
  }

  update(){
    if (!this.fix[0]){
      this.a[0] = this.f[0] - this.damping * this.v[0];
      this.v[0] = this.v[0] + this.a[0];
      if (this.magnitude(this.v) > this.vmax){
       let scale = this.vmax / this.magnitude(this.v);
       this.v[0] = scale * this.v[0];
      }
      this.x[0] = this.x[0] + this.v[0];
    }
    if (!this.fix[1]){
      this.a[1] = this.f[1] - this.damping * this.v[1];
      this.v[1] = this.v[0] + this.a[1];
      if (this.magnitude(this.v) > this.vmax){
       let scale = this.vmax / this.magnitude(this.v);
       this.v[1] = scale * this.v[1];
      }
      this.x[1] = this.x[1] + this.v[1];
    }
    this.f = [0.0, 0.0];
    //console.log(['a: ', this.a[0], this.a[1], 'v: ', this.v[0], this.v[1]])
  }

  draw(){
    push();
    strokeWeight(2);
    if((this.fix[0])||(this.fix[1])){
      fill([255, 0, 100]);
    }else{
      fill(this.color);
    }
    
    ellipse(this.x[0], this.x[1], this.d, this.d);
    pop();
  }

}