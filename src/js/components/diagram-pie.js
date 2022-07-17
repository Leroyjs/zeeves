const initPie = () => {
  renderPie();

  fetch("https://zeeves.io/site-api/wishlist/count")
    .then(res => res.json())
    .then((res) => {
      const count = res["Count"];
      renderPie(count);
    })
    .catch(err => {
      console.log(err);
    });
};

function renderPie(count) {
  const leftCars = 10000 - count;
  const pieWrapperEl = document.querySelector(".pie-wrapper-js");

  if (count >= 10000) {
    pieWrapperEl.parentElement.remove();
    return;
  }

  const pieTooltipEl = document.querySelector(".diagram-tooltip-js");
  const pieTooltip = pieWrapperEl.querySelector(".diagram__tooltip");
  const pieCircleOneEl = document.querySelector(".pie__circle_one");
  const pieCircleTwoEl = document.querySelector(".pie__circle_two");
  let currentColor = "#F1E7FF";
  const isTable = window.matchMedia("screen and (max-width: 768px)").matches;
  let isMobile = window.matchMedia("screen and (max-width: 420px)").matches;
  let radiusCircle = isTable ? 90 : 120;

  function setTooltip() {
    const isLeft = currentColor === "#F1E7FF";
    pieTooltipEl.innerHTML = isLeft ? `${leftCars} cards left` : `${count} cards in the wishlist`;
  }

  function handleHover(event) {
    if (isMobile) return;
    renderTooltip(event.layerX, event.layerY);
  }

  function initListener() {
    pieCircleOneEl.addEventListener("click", () => {
      if (!isMobile) return;
      currentColor = "#F1E7FF";
      setTooltip();
      pieTooltip.setAttribute("style", `background-color: ${currentColor};`);
    });
    pieCircleTwoEl.addEventListener("click", () => {
      if (!isMobile) return;
      currentColor = "#FFF1E5";
      setTooltip();
      pieTooltip.setAttribute("style", `background-color: ${currentColor};`);
    });

    pieWrapperEl.addEventListener("mousemove", handleHover);
    pieCircleOneEl.addEventListener("mousemove", () => {
      if (isMobile) return;
      currentColor = "#F1E7FF";
      setTooltip();
    });
    pieCircleTwoEl.addEventListener("mousemove", () => {
      if (isMobile) return;
      currentColor = "#FFF1E5";
      setTooltip();
    });
  }

  const renderTooltip = debounce((x, y) => {
    if (x < 2 || y < 2) return;
    const angle = getAngle(radiusCircle, radiusCircle, x, y);
    const isMirrorX = x <= radiusCircle;
    const isMirrorY = y <= radiusCircle;

    const posX = radiusCircle + Math.cos(angle) * radiusCircle;
    const posY = radiusCircle + Math.sin(angle) * radiusCircle;

    pieTooltip.setAttribute("style", `
    top: ${posY}px;
    left: ${posX}px;
    background-color: ${currentColor};
    transform: translate(${isMirrorX ? "calc(-100% - 4px)" : "4px"}, ${isMirrorY ? "calc(-100% - 4px)" : "4px"});
    `);
  }, 3);

  const handleResize = debounce((e) => {
    const clientWidth = document.body.clientWidth;
    if (clientWidth <= 768) radiusCircle = 90; else radiusCircle = 120;
    isMobile = clientWidth <= 420;

    if (isMobile) {
      pieTooltip.removeAttribute("style");
    } else {
      pieTooltip.setAttribute("style", `background-color: ${currentColor};`);
    }
  }, 42);

  initListener();

  window.addEventListener("resize", handleResize);
}

function debounce(f, ms) {
  let isCooldown = false;

  return function() {
    if (isCooldown) return;

    f.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => isCooldown = false, ms);
  };
}

function mapMath(x, in_min, in_max, out_min, out_max) {
  return Math.round((x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min);
}

function getAngle(cx, cy, ex, ey) {
  const dy = ey - cy;
  const dx = ex - cx;
  return Math.atan2(dy, dx);
}


export default initPie;
