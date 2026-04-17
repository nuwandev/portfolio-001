// --- Dynamic Tech Icon Track & Circles ---
document.addEventListener("DOMContentLoaded", function () {
  // Tech icons
  const techIcons = [
    { src: "assets/imgs/icons/typescript.svg", alt: "TypeScript" },
    { src: "assets/imgs/icons/javascript.svg", alt: "JavaScript" },
    { src: "assets/imgs/icons/java.svg", alt: "Java" },
    { src: "assets/imgs/icons/spring.svg", alt: "Spring" },
    { src: "assets/imgs/icons/nodejs.svg", alt: "Node.js" },
    { src: "assets/imgs/icons/express.svg", alt: "Express.js" },
    { src: "assets/imgs/icons/react.svg", alt: "React" },
    { src: "assets/imgs/icons/nextjs.svg", alt: "Next.js" },
    { src: "assets/imgs/icons/tailwind.svg", alt: "Tailwind CSS" },
    { src: "assets/imgs/icons/mongodb.svg", alt: "MongoDB" },
    { src: "assets/imgs/icons/mysql.svg", alt: "MySQL" },
    { src: "assets/imgs/icons/postgresql.svg", alt: "PostgreSQL" },
    { src: "assets/imgs/icons/git.svg", alt: "Git" },
    { src: "assets/imgs/icons/github.svg", alt: "GitHub" },
    { src: "assets/imgs/icons/postman.svg", alt: "Postman" },
    { src: "assets/imgs/icons/figma.svg", alt: "Figma" },
    { src: "assets/imgs/icons/html5.svg", alt: "HTML5" },
    { src: "assets/imgs/icons/css3.svg", alt: "CSS3" },
  ];
  const techTrack = document.getElementById("techTrack");
  if (techTrack) {
    techTrack.innerHTML = "";
    for (let i = 0; i < 2; i++) {
      // duplicate for infinite scroll effect
      const techsDiv = document.createElement("div");
      techsDiv.className = "techs";
      techIcons.forEach((icon) => {
        const img = document.createElement("img");
        img.className = "icon";
        img.src = icon.src;
        img.alt = icon.alt;
        techsDiv.appendChild(img);
      });
      techTrack.appendChild(techsDiv);
    }
  }

  // GSAP slider effect
  const slider = document.querySelector(".slider");
  const icons = techTrack ? techTrack.querySelectorAll(".icon") : [];
  if (slider && icons.length) {
    const MAX_SCALE = 1.6;
    const PROXIMITY = 150;
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
  }

  // Dynamic Circles
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

  // Name tag hover effect
  const container = document.querySelector(".hero .content > div");
  const tag = document.querySelector(".name-tag__text");
  if (container && tag) {
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
  }
});
