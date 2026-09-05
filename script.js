const trigger = document.querySelector('.nav-dropdown-trigger');
const menu = document.querySelector('.dropdown-menu');

trigger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open')
    trigger.setAttribute('aria-expanded', isOpen)
});

document.addEventListener('click', (e) => {
    if (!e.target.closets('.nav-dropdown')) {
        menu.classList.remove('open')
        trigger.setAttribute('aria-expanded', 'false')
    }
})


const canvas = document.getElementById("grid");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

const RADIUS = 100;
const baseColor = [59, 97, 6];
const glowColor = [140, 220, 40];
const baseAlpha = 0.17;
const glowAlpha = 0.35;

let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", function(event) {
    //mouse position updates
    mouseX = event.clientX;
    mouseY = event.clientY;
})

// Linear Interpolation
function lerp(start, end, t) {
    return start + (end - start) * t;
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < canvas.width / 40; i++ ){
        for (let j = 0; j < canvas.height / 10; j++)
        {
            let x = i * 40;
            let y = j * 10;

            let dx = x - mouseX;
            let dy = y - mouseY;
            let distance = Math.sqrt(dx * dx + dy * dy);

            let t = 1 - distance / RADIUS;
            t = Math.max(0, Math.min(1, t));

            let r = lerp(baseColor[0], glowColor[0], t);
            let g = lerp(baseColor[1], glowColor[1], t);
            let b = lerp(baseColor[2], glowColor[2], t);
            let a = lerp(baseAlpha, glowAlpha, t);

            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + 10);
            ctx.stroke();
        }
    }

    for (let i = 0; i < canvas.height / 40; i++){
        for (let j = 0; j < canvas.width / 10; j ++)
        {
            let x = j * 10;
            let y = i * 40;

            let dx = x - mouseX;
            let dy = y - mouseY;
            let distance = Math.sqrt(dx * dx + dy * dy);

            let t = 1 - distance / RADIUS;
            t = Math.max(0, Math.min(1, t));

            let r = lerp(baseColor[0], glowColor[0], t);
            let g = lerp(baseColor[1], glowColor[1], t);
            let b = lerp(baseColor[2], glowColor[2], t);
            let a = lerp(baseAlpha, glowAlpha, t);
            
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + 10, y);
            ctx.stroke();
        }
    }

    requestAnimationFrame(draw);
}

draw();