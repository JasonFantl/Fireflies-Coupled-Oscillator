class Firefly {
    constructor() {
        // physical
        this.position = createVector(random(width), random(height));
        while (this.position.dist(createVector(width / 2, height / 2)) < 120 ||
            this.position.dist(createVector(width / 2, height / 2)) > width / 2 - 5) {
            this.position = createVector(random(width), random(height));
        }

        // flashing
        this.interval = random(40, 80); // how long between flashes, in frames
        // this.interval = 60; // how long between flashes, in frames
        this.phase = random(0, this.interval); // increments by 1 every frame
        this.flashRadius = 5000; // in pixels

        // display
        this.flashLength = 10; // how long to show that we just flashed, in frames
    }

    update() {
        this.phase += 1;
        if (this.phase >= this.interval) {
            this.phase = 0;
            this.sendSignal();
        }

        this.position.add(p5.Vector.random2D());
    }

    display() {
        noStroke();
        if (this.phase < this.flashLength) {
            fill(255, 255, 0);
        } else {
            fill(100);
        }
        circle(this.position.x, this.position.y, 10);
        fill(0, 0, 0, 0);
        strokeWeight(0.1);
        stroke(0);
        circle(this.position.x, this.position.y, this.flashRadius * 2);
    }

    sendSignal() {
        for (let firefly of fireflies) {
            if (firefly == this) {
                continue;
            }
            if (this.position.dist(firefly.position) < this.flashRadius) {
                firefly.receiveSignal();
            }
        }
    }

    receiveSignal() {

        let phaseCouplingConstant = 0.02;
        let intervalCouplingConstant = 0.02;

        // // angle (constant)
        // let phaseCouplingConstant = 4;
        // if (this.phase < this.interval / 2) {
        //     // flash later
        //     this.phase -= phaseCouplingConstant;
        // } else if (this.phase > this.interval / 2) {
        //     // flash earlier
        //     this.phase += phaseCouplingConstant;
        // }

        // angle (proportional)
        // if (this.phase < this.interval / 2) {
        //     // flash later
        //     this.phase += (0 - this.phase) * phaseCouplingConstant * 2;
        // } else if (this.phase > this.interval / 2) {
        //     // flash earlier
        //     this.phase +=
        //         (this.interval - this.phase) * phaseCouplingConstant * 2;
        // }

        // angle (sin)
        // this.phase -= phaseCouplingConstant * this.interval * sin(this.phase / this.interval * TWO_PI);

        // angle (proportional) (de-sync)
        // this.phase += phaseCouplingConstant * (this.interval / 2 - this.phase) * 2;

        // angle (sin) (de-sync)
        // this.phase += phaseCouplingConstant * this.interval * sin(this.phase / this.interval * TWO_PI);

        // // interval (constant)
        // let intervalCouplingConstant = 0.01;
        // if (this.phase < this.interval/2) {
        // // when we need to be flash later, we lengthen the interval
        //   this.interval += intervalCouplingConstant;
        // } else if (this.phase > this.interval/2) {
        // // when we need to flash earlier, we shorten the interval
        //   this.interval -= intervalCouplingConstant;
        // }

        // // interval (proportional)
        // if (this.phase < this.interval / 2) {
        //     // when we need to be flash later, we lengthen the interval proportional to how far away the counter is from the zero, normalized to 1 by dividing by 2
        //     this.interval +=
        //         intervalCouplingConstant * ((this.phase / this.interval) * 2) * this.interval;
        // } else if (this.phase > this.interval / 2) {
        //     // when we need to flash earlier, we shorten the interval
        //     this.interval -=
        //         intervalCouplingConstant * (2 - (this.phase / this.interval) * 2) * this.interval;
        // }

        // interval (proportional) (de-sync)
        this.interval -= intervalCouplingConstant * (this.interval / 2 - this.phase) * 2 / this.interval * 40;
        this.phase += phaseCouplingConstant * (this.interval / 2 - this.phase) * 2;


        // interval (sin)
        // let intervalCouplingConstant = 0.02;
        // this.interval += intervalCouplingConstant * this.interval * sin(this.phase / this.interval * TWO_PI);

        // this.interval *= 1 - angularVelocityImpact * sin(this.flashAngle*TWO_PI);
        // this.interval -= 0.1*sin(this.flashAngle*TWO_PI);
    }
}