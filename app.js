const parallaxElements = document.querySelectorAll(".parallax");

let xValue = 0;
let yValue = 0;
let zValue = 0;

function updateParallax(e) {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  if (timeline.isActive()) return;

  if (e.type === "mousemove") {
    xValue = e.clientX - windowWidth / 2;
    yValue = e.clientY - windowHeight / 2;
  } else if (e.type === "touchmove") {
    xValue = e.touches[0].clientX - windowWidth / 2;
    yValue = e.touches[0].clientY - windowHeight / 2;
  }

  parallaxElements.forEach(element => {
    const speedX = parseFloat(element.dataset.speedx);
    const speedY = parseFloat(element.dataset.speedy);
    const speedZ = 0.75; // Adjust this value to control the z-index increment

    const transformX = `${-xValue * speedX / windowWidth * 100}px`;
    const transformY = `${yValue * speedY / windowHeight * 100}px`;

    const distanceX = Math.abs(xValue - element.getBoundingClientRect().left - element.offsetWidth / 2);
    const zIncrement = distanceX * speedZ;

    element.style.transform = `translate(${transformX}, ${transformY}) translateZ(${zIncrement}px)`;
  });
}

const parallaxElementsNotBg = document.querySelectorAll(".parallax:not(.bg-img)");

window.addEventListener("mousemove", updateParallax);
window.addEventListener("mouseout", () => {
  // Reset the parallax effect when the mouse is outside the window
  parallaxElementsNotBg.forEach(element => {
    element.style.transform = "none";
  });
});

window.addEventListener("touchmove", updateParallax);
window.addEventListener("touchcancel", () => {
  // Reset the parallax effect when touch is canceled
  parallaxElementsNotBg.forEach(element => {
    element.style.transform = "none";
  });
});

// Apply staggered animation with GSAP
let timeline = gsap.timeline();

timeline.fromTo(
  parallaxElementsNotBg,
  { y: "100%" },
  {
    y: "0%",
    duration: 2,
    stagger: 0.4,
  }
);
