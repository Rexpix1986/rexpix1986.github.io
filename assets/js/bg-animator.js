const image = document.querySelector(".bg-layer");

const MOVE_TIME = 12000;

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

let pose = {
    x: rand(-8, 8),
    y: rand(-8, 8),
    r: rand(-1, 1)
};

function animateImage() {

    image.getAnimations().forEach(a => a.cancel());

    const next = {
        x: rand(-8, 8),
        y: rand(-8, 8),
        r: rand(-1, 1)
    };

    image.animate([
        {
            transform: `translate(${pose.x}%, ${pose.y}%) rotate(${pose.r}deg)`
        },
        {
            transform: `translate(${next.x}%, ${next.y}%) rotate(${next.r}deg)`
        }
    ], {
        duration: MOVE_TIME,
        easing: "ease-in-out",
        fill: "forwards"
    }).finished.then(() => {
        pose = next;
        animateImage();
    });

}

image.src = "assets/img/clipsbackground.jpg";
image.onload = animateImage;