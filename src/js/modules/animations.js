import { gsap } from "gsap";

import { Draggable } from "gsap/Draggable";
import { Flip } from "gsap/Flip";
import { MotionPathHelper } from "gsap/MotionPathHelper";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(Draggable, Flip, MotionPathHelper, MotionPathPlugin, ScrollTrigger, ScrollSmoother, SplitText);


const scene = document.querySelector('.parallax');
const layers = document.querySelectorAll('.parallax-layer');
const moveX = 80;
const moveY = 50;

layers.forEach((layer) => {
    gsap.set(layer, {
        scale: 1.3,
    });
});

scene.addEventListener('mousemove', (e) => {
    const rect = scene.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    layers.forEach((layer) => {
        const speed = Number(layer.dataset.speed);

        gsap.to(layer, {
            x: x * moveX * speed,
            y: y * moveY * speed,
            duration: 0.7,
            ease: 'power3.out',
            overwrite: true,
        });
    });
});

scene.addEventListener('mouseleave', () => {
    layers.forEach((layer) => {
        gsap.to(layer, {
            x: 0,
            y: 0,
            duration: 1,
            ease: 'power3.out',
        });
    });
});