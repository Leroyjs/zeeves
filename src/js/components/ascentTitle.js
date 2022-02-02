const initAscentTitle = () => {
  const ascentSections = document.querySelectorAll(".observed-js");
  const observer = new IntersectionObserver(onEntry, { threshold: [0.75] });

  ascentSections.forEach((ascentSection) => {
    observer.observe(ascentSection);
  });

  function onEntry(entry) {
    entry.forEach((change) => {
      if (change.isIntersecting) {
        change.target.classList.add("show");
      }
    });
  }
};

export default initAscentTitle;
