const initPie = () => {
  const pieWrapperEl = document.querySelector(".pie-wrapper-js");
  const pieTooltip = pieWrapperEl.querySelector(".diagram__tooltip");
  const pieCircleOneEl = document.querySelector(".pie__circle_one");
  const pieCircleTwoEl = document.querySelector(".pie__circle_two");
  let currentColor = "#F1E7FF";

  function handleHover(event) {
    renderTooltip(event.layerX, event.layerY);
  }

  const renderTooltip = debounce((x, y) => {
    if (x < 2 || y < 2) return;
    const angle = getAngle(120, 120, x, y);
    const isMirrorX = x <= 120;
    const isMirrorY = y <= 120;

    const posX = 120 + Math.cos(angle) * 120;
    const posY = 120 + Math.sin(angle) * 120;

    pieTooltip.setAttribute("style", `
    top: ${posY}px;
    left: ${posX}px;
    background-color: ${currentColor};
    transform: translate(${isMirrorX ? "calc(-100% - 4px)" : "4px"}, ${isMirrorY ? "calc(-100% - 4px)" : "4px"});
    `);
  }, 3);

  pieWrapperEl.addEventListener("mousemove", (e) => handleHover(e));
  pieCircleOneEl.addEventListener("mouseover", () => {
    currentColor = "#F1E7FF";
  });
  pieCircleTwoEl.addEventListener("mouseover", () => {
    currentColor = "#FFF1E5";
  });
};

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

// long map(long x, long in_min, long in_max, long out_min, long out_max)
// {
//   return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
// }


export default initPie;
