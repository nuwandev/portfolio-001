// GSAP Magnetic Slider Effect for macOS Dock-like smoothness
// Assumes GSAP is loaded via CDN in index.html

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const icons = document.querySelectorAll(".icon");
  if (!slider || !icons.length) return;

  const MAX_SCALE = 1.6;
  const PROXIMITY = 150; // px

  let isOver = false;
  slider.addEventListener("mouseenter", () => {
    isOver = true;
  });
  slider.addEventListener("mouseleave", () => {
    isOver = false;
    icons.forEach((icon) => {
      gsap.to(icon, { scale: 1, y: 0, duration: 0.5, overwrite: "auto" });
      icon.classList.remove("active");
    });
  });
  slider.addEventListener("mousemove", (e) => {
    if (!isOver) return;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    icons.forEach((icon) => {
      const rect = icon.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(mouseX - centerX, mouseY - centerY);
      if (distance < PROXIMITY) {
        const power = (PROXIMITY - distance) / PROXIMITY;
        const scale = 1 + (MAX_SCALE - 1) * power;
        gsap.to(icon, {
          scale: scale,
          y: power * 10,
          duration: 0.3,
          overwrite: "auto",
          ease: "power2.out",
        });
        icon.classList.add("active");
      } else {
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.5,
          overwrite: "auto",
        });
        icon.classList.remove("active");
      }
    });
  });

  slider.addEventListener("mouseleave", () => {
    gsap.to(icons, {
      scale: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    });
    icons.forEach((i) => i.classList.remove("active"));
  });
});

const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = "rgba(36, 36, 36, 0.5)";
});

window.addEventListener("mousemove", function (e) {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";

    circle.style.scale = (circles.length - index) / circles.length;

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();
