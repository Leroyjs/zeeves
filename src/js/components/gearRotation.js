export const gearRotation = () => {
  const fsGear = document.querySelector(".card-screen__gear");

  window.addEventListener("scroll", () => {
    fsGear.style.transform = `rotate(${window.pageYOffset / 100}deg)`;
  });
};
