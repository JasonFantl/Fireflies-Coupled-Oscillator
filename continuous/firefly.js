
var K = 3.0;
var L = 1.0;

class Firefly {
    constructor() {
        // physical
        this.position = createVector(random(width), random(height));
        while (this.position.dist(createVector(width / 2, height / 2)) < 120 ||
            this.position.dist(createVector(width / 2, height / 2)) > width / 2 - 5) {
            this.position = createVector(random(width), random(height));
        }

        // flashing
        this.theta = random(TWO_PI);
        this.frequency = random(4, 6);
        // this.frequency = 4;

        // display
        this.flashLength = Math.PI / 8;
    }

    update(dt) {

        // // -----------------
        // // sync both
        // // -----------------
        // let avg_deltas = 0;
        // for (let firefly of fireflies) {
        //     avg_deltas += sin(firefly.theta - this.theta);
        // }
        // avg_deltas /= numFireflies;
        // let d_theta = this.frequency + K * avg_deltas;
        // let d_frequency = L * avg_deltas;

        // -----------------
        // de-sync phase, sync frequency
        // -----------------
        // frequency, using proportional equation
        let avg_deltas = 0;
        for (let firefly of fireflies) {
            if (firefly == this) {
                continue;
            }
            avg_deltas += ((((firefly.theta - this.theta) % TWO_PI) + TWO_PI) % TWO_PI - PI) / PI;
        }
        avg_deltas /= numFireflies;
        let d_theta = this.frequency + K * avg_deltas;
        let d_frequency = L * avg_deltas;



        // update
        this.theta += d_theta * dt;
        this.frequency += d_frequency * dt;

        if (this.theta >= TWO_PI) {
            this.theta -= TWO_PI;
        }
        if (this.theta <= -TWO_PI) {
            this.theta += TWO_PI;
        }

        // position
        this.position.add(p5.Vector.random2D());
    }

    display() {
        noStroke();
        if (abs(this.theta % TWO_PI) < this.flashLength || abs(this.theta % TWO_PI) > TWO_PI - this.flashLength) {
            fill(255, 255, 0);
        } else {
            fill(100);
        }
        circle(this.position.x, this.position.y, 10);
    }
}
