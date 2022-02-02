const initHeader = () => {
  const headerEl = document.querySelector("#main-header");
  const firstSectionEl = document.querySelector(".first-section");

  const handleChangeColor = (isIntersecting) => {
    if (isIntersecting) {
      headerEl.classList.remove("header_white");
    } else {
      headerEl.classList.add("header_white");
    }
  };

  const intersectionCallback = (entries) => {
    handleChangeColor(entries[0].isIntersecting);
  };

  const observer = new IntersectionObserver(intersectionCallback, {
    threshold: 1
  });

  observer.observe(firstSectionEl);
};

export default initHeader;
