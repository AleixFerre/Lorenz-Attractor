// Code by Aleix Ferre
// The Lorentz Attractor
// https://en.wikipedia.org/wiki/Lorenz_system

// p5 Sketch: https://editor.p5js.org/thecatalahd/sketches/zXC_WD0S3

// Based on the code by TheCodingTrain
// See more: https://www.youtube.com/watch?v=f0lkz2gSsIk

let a = 10;
let b = 28;
let c = 8 / 3;

let dt = 0.01;
let x = 1.0;
let y = 1.0;
let z = 1.0;

let noiseEnable = false;
let xoff = 0.0;
let yoff = 10000.0;
let zoff = 90000.0;

let points = [];

let hueEnable = false;
let h = 0;

let noiseCheckbox;
let hueCheckbox;

let easycam;

function setup() {

    pixelDensity(1);

    createCanvas(windowWidth, 600, WEBGL);

    createDiv("<h1>LORENZ ATTRACTOR</h1>");
    createDiv("Double click the canvas to save the frame!");

    noiseCheckbox = createCheckbox("Noise");
    noiseCheckbox.input(noiseChanged);

    hueCheckbox = createCheckbox("Hue");
    hueCheckbox.input(hueChanged);

    setAttributes('antialias', true);
    colorMode(HSB, 100);
}

function draw() {
    background(0);

    orbitControl();

    // translate(width / 2, height / 2);

    let dx = (a * (y - x)) * dt;
    let dy = (x * (b - z) - y) * dt;
    let dz = (x * y - c * z) * dt;

    x = x + dx;
    y = y + dy;
    z = z + dz;

    let p = new p5.Vector(x, y, z);
    if (p.x) {
        points.push(p);
    }

    scale(5);

    if (hueEnable) {
        h += 0.1;
        if (h > 100) {
            h = 0;
        }
    }

    noFill();

    beginShape();
    for (let p of points) {

        stroke(h, 100, 100);
        if (noiseEnable) {
            vertex(p.x + noise(xoff), p.y + noise(yoff), p.z + noise(zoff));
        } else {
            vertex(p.x, p.y, p.z);
        }
        xoff++;
        yoff++;
        zoff++;
    }
    endShape();
}

function windowResized() {
    resizeCanvas(windowWidth, 600);
}

function hueChanged() {
    hueEnable = !hueEnable;
    points = [];
    x = 1.0;
    y = 1.0;
    z = 1.0;

    h = 0;
}

function noiseChanged() {
    noiseEnable = !noiseEnable;
    points = [];
    x = 1.0;
    y = 1.0;
    z = 1.0;

    xoff = 0.0;
}

function doubleClicked() {
    saveCanvas("lorenz", "png");
}