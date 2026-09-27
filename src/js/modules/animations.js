import { gsap } from "gsap";

import { Draggable } from "gsap/Draggable";
import { Flip } from "gsap/Flip";
import { MotionPathHelper } from "gsap/MotionPathHelper";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
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


gsap.registerPlugin(ScrollTrigger);
const sections = [
    document.querySelector(".hero"),
    document.querySelector(".advantages"),
    document.querySelector(".about"),
    document.querySelector(".ratings"),
    document.querySelector(".connection"),
].filter(Boolean);

let currentSection = 0;
let isScrolling = false;

function goToSection(index) {
    if (index < 0 || index >= sections.length) return;
    if (isScrolling) return;
    isScrolling = true;
    currentSection = index;
    const section = sections[index];

    gsap.to(window, {
        duration: 0.1,
        scrollTo: {
            y: section,
            autoKill: false,
        },
        ease: "power3.inOut",
        onComplete: () => {
            isScrolling = false;
        },
    });
}

window.addEventListener(
    "wheel",
    (event) => {
        if (Math.abs(event.deltaY) < 1) return;
        event.preventDefault();
        if (isScrolling) return;
        if (event.deltaY > 0) {
            goToSection(currentSection + 1);
        } else {
            goToSection(currentSection - 1);
        }
    },
    { passive: false }
);

const counters = document.querySelectorAll(".counter");
counters.forEach((counter) => {
    const target = Number(counter.dataset.number);

    gsap.fromTo(
        counter,
        { innerText: 0 },
        {
            innerText: target,
            duration: 1.5,
            ease: "power2.out",
            snap: {
                innerText: 1,
            },
            scrollTrigger: {
                trigger: ".ratings",
                start: "top center",
                toggleActions: "play none none none",
            },
            onUpdate() {
                counter.innerText = Math.floor(counter.innerText);
            },
        }
    );
});