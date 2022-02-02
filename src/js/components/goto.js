const initGoto = () => {
  const firstSection = document.querySelector(".first-section");
  const footerEl = document.querySelector(".footer");
  const gotoEl = document.querySelector(".goto");

  const observerFirstSection = new IntersectionObserver(onEntryFirstSection, {
    threshold: [1],
    rootMargin: "140px"
  });

  const observerFooter = new IntersectionObserver(onEntryFooter, {
    threshold: [0.01]
  });

  observerFirstSection.observe(firstSection);
  observerFooter.observe(footerEl);

  function onEntryFirstSection(entry) {
    entry.forEach((change) => {
      if (!change.isIntersecting) {
        gotoEl.classList.add("show");
      } else {
        gotoEl.classList.remove("show");
      }
    });
  }

  function onEntryFooter(entry) {
    entry.forEach((change) => {
      if (change.isIntersecting) {
        gotoEl.classList.remove("show");
      } else {
        gotoEl.classList.add("show");
      }
    });
  }
};

export default initGoto;
