// const parallaxElements = document.querySelectorAll(".parallax");

// let xValue = 0;
// let yValue = 0;
// let zValue = 0;

// window.addEventListener("mousemove", (e) => {
//   const windowWidth = window.innerWidth;
//   const windowHeight = window.innerHeight;
  
//   xValue = e.clientX - windowWidth / 2;
//   yValue = e.clientY - windowHeight / 2;

//   const zValue = (e.clientX / windowWidth - 0.5) * 2;

//   let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
//   let zValue = (e.clientX - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

//   parallaxElements.forEach(element => {
//     const speedX = parseFloat(element.dataset.speedx);
//     const speedY = parseFloat(element.dataset.speedy);
//     const speedZ = parseFloat(element.dataset.speedz);

//     const transformX = `${-xValue * speedX / windowWidth * 100}px`;
//     const transformY = `${yValue * speedY / windowHeight * 100}px`;
//     const transformZ = ``;
//     element.style.transform = `translate(${transformX}, ${transformY}) translateZ(${zValue * speedZ}px)`;
//   });
// });



const parallaxElements = document.querySelectorAll(".parallax");

let xValue = 0;
let yValue = 0;
let zValue = 0;

function updateParallax(e) {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  if (timeline.isActive()) return;

  xValue = e.clientX - windowWidth / 2;
  yValue = e.clientY - windowHeight / 2;

  parallaxElements.forEach(element => {
    const speedX = parseFloat(element.dataset.speedx);
    const speedY = parseFloat(element.dataset.speedy);
    const speedZ = 0.75; // Adjust this value to control the z-index increment

    const transformX = `${-xValue * speedX / windowWidth * 100}px`;
    const transformY = `${yValue * speedY / windowHeight * 100}px`;

    const distanceX = Math.abs(e.clientX - element.getBoundingClientRect().left - element.offsetWidth / 2);
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






