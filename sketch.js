let fireflies = [];
let numFireflies = 80;


function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < numFireflies; i++) {
    fireflies[i] = new Firefly();
  }
}

function draw() {
  background(255);

  if (keyIsPressed) {
    for (let i = 0; i < 20; i++) {
      for (let firefly of fireflies) {
        firefly.update();
      }
    }
  }
  // fireflies
  for (let firefly of fireflies) {
    firefly.update();
    firefly.display();
  }

  // analysis

  drawPhases();
  drawBuckets();


}

function drawPhases() {
  // angle
  let xAverage = 0;
  let yAverage = 0;

  push();
  translate(width / 2, height / 2);
  noFill();
  stroke(0);
  strokeWeight(0.5);
  // circle(0, 0, height / 2);
  line(0, -100, 0, 100);
  line(-100, 0, 100, 0);

  for (let firefly of fireflies) {
    let r = firefly.flashInterval;
    let t = TWO_PI * firefly.flashCounter / firefly.flashInterval - PI / 2;
    let x = cos(t) * r;
    let y = sin(t) * r;
    xAverage += x;
    yAverage += y;
    fill(200, 100, 100);
    noStroke();
    circle(x, y, 6);

    fill(0, 0, 0, 0);
    stroke(0);
    strokeWeight(0.02);
    circle(0, 0, r * 2);
  }

  xAverage /= numFireflies;
  yAverage /= numFireflies;
  fill(100, 100, 200);
  noStroke();
  circle(xAverage, yAverage, 10);
  pop();
}

function drawBuckets() {
  // intervals

  let intervalBuckets = {};
  let bucketSize = 1;
  for (let firefly of fireflies) {
    let key = int(firefly.flashInterval / bucketSize);
    intervalBuckets[key] = intervalBuckets[key] ? intervalBuckets[key] + 1 : 1;
  }

  let rectWidth = 2;

  // axis lines
  stroke(100);
  fill(10);
  for (let interval = 0; interval <= 200; interval += 40) {
    let x = interval * rectWidth;
    let y = height - 30;

    strokeWeight(1);
    line(x, y, x, y + 10);
    strokeWeight(0);
    text(interval, x, y);
  }

  // buckets
  fill(100);
  noStroke();
  for (let interval in intervalBuckets) {
    let rectHeight = intervalBuckets[interval] * 10;
    let x = interval * rectWidth;
    let y = height - rectHeight;

    rect(x, y, rectWidth, rectHeight);
  }
}