var images = [];
let imageCount = 10;
while (imageCount--) {
    images.push("assets/img/splash-bgs/bg-pic-" + (imageCount + 1) + ".webp")
};
images = shuffle(images);
console.log(images);


const DISPLAY_TIME = 6000;
const FADE_TIME = 3000;
const MOVE_TIME = DISPLAY_TIME + FADE_TIME;

let currentIndex = 0;

let current = document.querySelector(".current");
let next = document.querySelector(".next");

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function randomTransform() {

    return {
        x1: rand(-8, 8),
        y1: rand(-8, 8),

        x2: rand(-8, 8),
        y2: rand(-8, 8),

        scale1: rand(1, 1.1),
        scale2: rand(1.1, 1.2),

        rotate1: rand(-1, 1),
        rotate2: rand(-1, 1)
    };

}
function animateImage(img) {

    img.getAnimations().forEach(a => a.cancel());

    const t = randomTransform();

    img.animate([
        {
            transform:
                `translate(${t.x1}%, ${t.y1}%)
                 rotate(${t.rotate1}deg)`
        },
        {
            transform:
                `translate(${t.x2}%, ${t.y2}%)
                 rotate(${t.rotate2}deg)`
        }
    ], {
        duration: MOVE_TIME,
        easing: "linear",
        fill: "forwards"
    });

}
function nextImage() {

    currentIndex = (currentIndex + 1) % images.length;

    next.src = images[currentIndex];
    animateImage(next);

    requestAnimationFrame(() => {
        next.classList.add("current");
        current.classList.remove("current");
    });

    setTimeout(() => {

        // swap the references only
        [current, next] = [next, current];

    }, FADE_TIME);

}

function start() {
    document.documentElement.style.background = "transparent";
    document.body.style.background = "transparent";

    current.src = images[0];
    current.classList.add("current");

    animateImage(current);

    setInterval(nextImage, DISPLAY_TIME);

}

function shuffle(array) {
    // Create a shallow copy if you don't want to mutate the original array
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        // Pick a random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));

        // Swap elements shuffled[i] and shuffled[j]
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

start();