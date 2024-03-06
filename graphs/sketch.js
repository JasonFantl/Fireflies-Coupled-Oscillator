let slider;
function setup() {
  createCanvas(150, 150);

  // slider = createSlider(0, 50, 20); slider.position(10, 10); slider.style('width', '80px');
}


function f_constant(x) {

  if (x < Math.PI) {
    return 1;
  }
  return -1;
}

function f_constant_neg(x) {

  if (x < Math.PI) {
    return -1;
  }
  return 1;
}

function f_proportional(x) {

  if (x < Math.PI) {
    return x / Math.PI;
  }
  return (x - 2 * Math.PI) / Math.PI;
}

function f_proportional_neg(x) {
  return (x - Math.PI) / Math.PI;
}

function f_sin(x) {
  return sin(x);
}

function f_sin_neg(x) {
  return -sin(x);
}

var array_of_functions = [
  f_constant,
  f_constant_neg,
  f_proportional,
  f_proportional_neg,
  f_sin,
  f_sin_neg
]

var f_i = 0;

function draw() {

  background(255);

  translate(width / 2, height / 2);
  strokeWeight(1);

  stroke(100);
  let num_radial_lines = 4;
  for (let i = 0; i < num_radial_lines + 1; i++) {
    let angle = i / num_radial_lines * 2 * Math.PI;
    let r = 70;
    line(0, 0, sin(angle) * r, cos(angle) * r);
  }

  let res = 560;
  let zero_radius = 40;

  // lines
  for (let i = 0; i < res + 1; i++) {
    let angle = (i / res * 2 * Math.PI) % (2 * Math.PI);

    let c = createVector(sin(angle) * zero_radius, cos(angle) * zero_radius);

    // let fx = f_constant(angle);
    // let fx = f_proportional(angle + Math.PI);
    // let fx = f_sin(angle + Math.PI);
    // let fx = f_constant_neg(angle);
    // let fx = f_proportional_neg((angle + Math.PI) % (Math.PI * 2));
    let fx = array_of_functions[f_i]((angle + Math.PI) % (Math.PI * 2));
    let f_radius = zero_radius + fx * 20;
    let new_f = createVector(sin(angle) * f_radius, cos(angle) * f_radius);

    // draw between the two
    strokeWeight(0.5);
    if (fx > 0) {
      stroke(100, 200, 50);
    } else {
      stroke(200, 100, 100);
    }
    line(c.x, c.y, new_f.x, new_f.y);
  }

  // zero circle
  fill(0, 0, 0, 0);
  strokeWeight(2);
  stroke(0);
  circle(0, 0, zero_radius * 2);

  circle(0, -zero_radius, 5);
  // line(0, -zero_radius - 5, 0, -zero_radius + 5);
}

function keyPressed() {
  f_i++;
}