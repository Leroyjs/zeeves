const initGoto = () => {
  const firstSection = document.querySelector(".goto-separator");
  const footerEl = document.querySelector(".footer");
  const gotoEl = document.querySelector(".goto");

  let isShowA = false;
  let isShowB = false;

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
      isShowA = change.isIntersecting;
      changeStateGoto();
    });
  }

  function onEntryFooter(entry) {
    entry.forEach((change) => {
      isShowB = change.isIntersecting;
      changeStateGoto();
    });
  }

  function changeStateGoto() {
    const state = isShowA || isShowB;
    if (state) {
      gotoEl.classList.remove("show");
    } else {
      gotoEl.classList.add("show");
    }
  }
};

export default initGoto;
