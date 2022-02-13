let tree = [];
let max_depth = 12;

function setup() {
  createCanvas(1000, 800);
  pixelDensity(2)
  background(220);
  noStroke();
  startx =width / 2
  starty = height - 100

  for (let i = 0; i<width; i+=2) {
     for (let j = 0; j<height; j+=2) {
       fill(random(210,235), 150);
       rect(i, j, 5, 5);
     }
   }

  tree = new branch(startx, starty, 100, 20, 0);
}

function draw() {
  tree.draw();

  //flowers
  translate(startx,starty)
  noStroke()
  fill(255, 194, 245)
  
    for (let i = 0; i < 300; i++) {
      fill(random([[117,0,98],[255,194,245]]))
      push()
      rotate(random(0,TWO_PI))
      ellipse(random(-200,200),random(-500,0),10,6);
      pop()
    }
  
  
    for (let i = 0; i < 500; i++) {
      fill(random([[117,0,98],[255,194,245]]))
      push()
      // translate(startx,starty)
      // rotate(random(0,TWO_PI))
      ellipse(random(-400,400),random(-10,50),10,6);
      pop()
    }


  noLoop();
}

class branch {
  constructor(
    x,
    y,
    len = 100,
    thickness = 4,
    depth = 0,
    dir = TWO_PI * (3 / 4)
  ) {
    this.x = x;
    this.y = y;
    this.len = len;
    this.depth = depth;
    this.dir = dir;
    this.thickness = thickness;
    noiseSeed(random(0, 100));
    // print(this.depth);
  }

  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.dir);
    //branch
    stroke(47, 25, 8);
    strokeWeight(this.thickness);
    noFill();
    beginShape();
    for (let i = 0; i < this.len; i++) {
      vertex(i, noise(i * 0.05) * 5);
    }
    endShape();
    //leaves along tree
    translate(this.len - 1, noise((this.len - 1) * 0.05) * 5);
    if (random(1) < 0.8 && this.depth > 5) {
      //blossom
      stroke(255, 122, 233);
      strokeWeight(2);
      for (let i = 0; i < 20; i++) {
        line(0, 0, random(-5, 5), random(-5, 5));
      }
    }
     //flowers
    if (this.depth > max_depth) {
      noStroke();
      if (random(1) < 0.9) {
        //blossom red
        stroke(255, 194, 245);
        strokeWeight(2);
        for (let i = 0; i < 10; i++) {
          line(0, 0, random(-5, 5), random(-5, 5));
        }
        if (random(1) < 0.2) {
          //mid purp
          fill(255, 194, 245);
          noStroke();
          for (let i = 0; i < 20; i++) {
            ellipse(random(-5, 5), random(-5, 5), 1, 1);
          }
        }
      } else {
        //purp
        stroke(117, 0, 98);
        strokeWeight(2);
        for (let i = 0; i < 20; i++) {
          line(0, 0, random(-5, 5), random(-5, 5));
        }
      }
    } else {
      let ang
      if (this.depth > 0) {
        // ang = random(0.5,2)*map(this.depth, 0, 10, 0.1, 0.3);
        ang = map(this.depth, 0, 10, 0.1, 0.5);
      } else {
        ang = random(0.9,1.1)*0.3;
      }

      let new_branch;
      new_branch = new branch(
        0,
        0,
        random(0.8,1.1)*(50 - this.depth),
        this.thickness * 0.8,
        this.depth + 1,
       -1 * random(0.8,1.1)*ang
      );
      new_branch.draw();

      let new_branch2;
      new_branch2 = new branch(
        0,
        0,
        random(0.8,1.1)*(50 - this.depth),
        this.thickness * 0.8,
        this.depth + 1,
        1 * random(0.8,1.1)*ang
      );
      new_branch2.draw();
    }

    pop();
  }
}

function keyPressed() {
  if (key == "s") {
    save("blossom.png");
  }
}
