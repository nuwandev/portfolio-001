// --- Dynamic Circles ---
document.addEventListener("DOMContentLoaded", function () {
  const NUM_CIRCLES = 20;
  const circlesContainer = document.getElementById("circles-container");
  const circles = [];
  if (circlesContainer) {
    for (let i = 0; i < NUM_CIRCLES; i++) {
      const circle = document.createElement("div");
      circle.className = "circle";
      circle.x = 0;
      circle.y = 0;
      circle.style.backgroundColor = "rgba(36, 36, 36, 0.5)";
      circlesContainer.appendChild(circle);
      circles.push(circle);
    }
  }
  const coords = { x: 0, y: 0 };
  globalThis.addEventListener("mousemove", function (e) {
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
});

const container = document.querySelector(".hero .content > div");
const tag = document.querySelector(".name-tag__text");

container.addEventListener("mousemove", (e) => {
  const rect = container.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;

  tag.style.transform = `
    rotate(${x * 10}deg)
    translate(${x * 6}px, ${y * 6}px)
    scale(1.04)
  `;
});

container.addEventListener("mouseleave", () => {
  tag.style.transform = "rotate(0deg) translate(0,0) scale(1)";
});
