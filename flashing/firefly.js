class Firefly {
    constructor() {
        // physical
        this.position = createVector(random(width), random(height));
        while (this.position.dist(createVector(width / 2, height / 2)) < 120 ||
            this.position.dist(createVector(width / 2, height / 2)) > width / 2 - 5) {
            this.position = createVector(random(width), random(height));
        }

        // flashing
        this.interval = random(10, 80); // how long between flashes, in frames
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
        // // angle (constant)
        // let counterImpact = 4;
        // if (this.phase < this.interval / 2) {
        //     // flash later
        //     this.phase -= counterImpact;
        // } else if (this.phase > this.interval / 2) {
        //     // flash earlier
        //     this.phase += counterImpact;
        // }

        // angle (proportional)
        // let counterImpact = 0.1;
        // if (this.phase < this.interval / 2) {
        //     // flash later
        //     this.phase += (0 - this.phase) * counterImpact * 2;
        // } else if (this.phase > this.interval / 2) {
        //     // flash earlier
        //     this.phase +=
        //         (this.interval - this.phase) * counterImpact * 2;
        // }

        // angle (sin)
        let counterImpact = 0.02;
        this.phase -= counterImpact * this.interval * sin(this.phase / this.interval * 2 * Math.PI);

        // angle (proportional) (de-sync)
        // this.phase += counterImpact * (this.interval / 2 - this.phase) * 2;

        // angle (sin) (de-sync)
        // this.phase += counterImpact * this.interval * sin(this.phase / this.interval * 2 * Math.PI);

        // TODO: Expand/Shrink interval around current time, so for the next flash we are actualy sooner or later. If we have a timer that counts up and we set the interval to be longer, it will take longer for the next flash. But if we have a countdown timer, setting the interval to be long wont take effect until the next cycle. Want the middle of these.

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
        // let intervalCouplingConstant = 0.2;
        // if (this.phase < this.interval / 2) {
        //     // when we need to be flash later, we lengthen the interval proportional to how far away the counter is from the zero, normalized to 1 by dividing by 2
        //     this.interval +=
        //         intervalCouplingConstant * ((this.phase / this.interval) * 2);
        // } else if (this.phase > this.interval / 2) {
        //     // when we need to flash earlier, we shorten the interval
        //     this.interval -=
        //         intervalCouplingConstant * (2 - (this.phase / this.interval) * 2);
        // }

        // interval (sin)
        let intervalCouplingConstant = 0.02;
        this.interval += intervalCouplingConstant * this.interval * sin(this.phase / this.interval * 2 * Math.PI);

        // this.interval *= 1 - angularVelocityImpact * sin(this.flashAngle*TWO_PI);
        // this.interval -= 0.1*sin(this.flashAngle*TWO_PI);
    }

    // TODO: find the differential equation version of this, see if it yields any insights.
    // TODO: combine phase and interval change value into a single value.

    // TODO: try same interval, but try to equally distribute amoung phases rather then sync

    // EXPERIMENT: Bringing together two already synchronized swarms, can you determin what they will converge to? Start with two fireflies, can you tell what they will converge to?

    // NOTE: all combos of constant and proportional work, but both as proportional seems to converge the fastest

    // NOTE: Verrrry slowly, the frequency of the entire swarm decreases, but only when the coupling is localized. the phase also fails to converge. Potentially due to a ring with the signal travling around the ring, which always tells a firefly to first flash earlier, then later, which may not exaclt reverse, maybe the "flash earlier" signal is a bit stronger since it came first and effected the parameters of the firefly. Hvae to be very careful constructing the delta function.
    //          May onyl require a propogating signal through the swarm. The boundry conditions are special, may need to assume a ring rather then line.
    // NOTE:
}
