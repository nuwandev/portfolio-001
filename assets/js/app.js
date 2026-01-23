// GSAP Magnetic Slider Effect for macOS Dock-like smoothness
// Assumes GSAP is loaded via CDN in index.html

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const icons = document.querySelectorAll(".icon");
  if (!slider || !icons.length) return;

  const MAX_SCALE = 1.6;
  const PROXIMITY = 150; // px

  slider.addEventListener("mousemove", (e) => {
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
