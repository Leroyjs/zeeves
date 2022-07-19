export const gearRotation = () => {
  const fsGear = document.querySelector(".card-screen__gear");
  const lsGear = document.querySelector(".bank-card-bg-bottom");

  window.addEventListener("scroll", () => {
    fsGear.style.transform = `rotate(${window.pageYOffset / 100}deg)`;
    lsGear.style.transform = `rotate(${-window.pageYOffset / 50}deg)`;
  });
};
