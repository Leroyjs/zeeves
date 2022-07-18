import TOTAL_CARDS from "../../../config-cards";

const initPie = () => {
  renderTooltip();
  const isTable = window.matchMedia("screen and (max-width: 768px)").matches;
  let isMobile = window.matchMedia("screen and (max-width: 420px)").matches;
  let radiusCircle = isTable ? 90 : 120;
  let isLeft = false;
  let isWishlist = false;
  let currentColor = "#F1E7FF";

  fetch("https://zeeves.io/site-api/wishlist/count")
    .then((res) => res.json())
    .then((res) => {
      const count = res["Count"];
      renderTooltip(count);
    })
    .catch((err) => {
      console.log(err);
    });

  function renderPie(countInner = 0) {
    const minValue = TOTAL_CARDS * 0.02;
    let count = countInner < minValue ? minValue : countInner;
    if (countInner === 0) count = 0;

    const pieTooltipEl = document.querySelector(".diagram-tooltip-js");
    const ctxEl = document.querySelector(".pie-canvas-js");
    const ctx = ctxEl.getContext("2d");
    const leftCards = TOTAL_CARDS - count;
    ctx.canvas.height = radiusCircle * 2;
    ctx.canvas.width = radiusCircle * 2;
    const results = [
      { label: "left", total: leftCards, shade: "#F1E7FF" },
      { label: "wishlist", total: count, shade: "#FFF1E5" },
    ];

    let currentAngle = 0;

    const circleLeft = new Path2D();
    const circleWishlist = new Path2D();

    const handleMouse = debounce((event) => {
      isLeft = ctx.isPointInPath(circleLeft, event.offsetX, event.offsetY);
      isWishlist = ctx.isPointInPath(
        circleWishlist,
        event.offsetX,
        event.offsetY
      );
      setTooltip();
    }, 28);

    ctxEl.addEventListener("mousemove", handleMouse);

    for (const sector of results) {
      let circle = sector.label === "left" ? circleLeft : circleWishlist;
      //calculating the angle the slice (portion) will take in the chart
      let portionAngle = (sector.total / TOTAL_CARDS) * 2 * Math.PI;
      //drawing an arc and a line to the center to differentiate the slice from the rest
      ctx.beginPath();

      circle.arc(
        radiusCircle,
        radiusCircle,
        radiusCircle,
        currentAngle,
        currentAngle + portionAngle
      );

      currentAngle += portionAngle;
      circle.lineTo(radiusCircle, radiusCircle);
      //filling the slices with the corresponding label's color

      ctx.fillStyle = sector.shade;
      // ctx.shadowColor = sector.shade;
      // ctx.shadowBlur = 15;
      ctx.fill(circle);
    }

    function setTooltip() {
      const isScip = !isLeft && !isWishlist;
      if (isScip) return;
      currentColor = isLeft ? "#F1E7FF" : "#FFF1E5";
      pieTooltipEl.innerHTML = isLeft
        ? `${leftCards} cards left`
        : `${countInner} cards in the wishlist`;
      pieTooltipEl.style.backgroundColor = currentColor;
    }

    pieTooltipEl.innerHTML = isLeft
      ? `${leftCars} cards left`
      : `${countInner} cards in the wishlist`;
  }

  function renderTooltip(count) {
    renderPie(count);
    const pieWrapperEl = document.querySelector(".pie-wrapper-js");
    const pieDiagramEl = document.querySelector(".diagram");
    const formTitleEl = document.querySelector(".form-title-js");
    const cardsTitleMainEl = document.querySelector(".cards-title-main-js");
    const cardsTitleSecondEl = document.querySelector(".cards-title-second-js");

    if (count >= TOTAL_CARDS) {
      cardsTitleMainEl.remove();
      pieDiagramEl.remove();
      cardsTitleSecondEl.removeAttribute("style");
      formTitleEl.innerHTML = "Plan for the future";
      return;
    }

    const pieTooltip = pieWrapperEl.querySelector(".diagram__tooltip");

    let radiusCircle = isTable ? 90 : 120;

    function handleHover(event) {
      if (isMobile) return;
      renderTooltip(event.layerX, event.layerY);
    }

    const renderTooltip = debounce((x, y) => {
      if (x < 2 || y < 2) return;
      const angle = getAngle(radiusCircle, radiusCircle, x, y);
      const isMirrorX = x <= radiusCircle;
      const isMirrorY = y <= radiusCircle;

      const posX = radiusCircle + Math.cos(angle) * radiusCircle;
      const posY = radiusCircle + Math.sin(angle) * radiusCircle;

      pieTooltip.setAttribute(
        "style",
        `
    top: ${posY}px;
    left: ${posX}px;
    background-color: ${currentColor};
    transform: translate(${isMirrorX ? "calc(-100% - 4px)" : "4px"}, ${
          isMirrorY ? "calc(-100% - 4px)" : "4px"
        });
    `
      );
    }, 3);

    const handleResize = debounce((e) => {
      const clientWidth = document.body.clientWidth;
      if (clientWidth <= 768) {
        radiusCircle = 90;
      } else {
        radiusCircle = 120;
      }
      isMobile = clientWidth <= 420;

      pieTooltip.setAttribute("style", `background-color: ${currentColor};`);
      if (isMobile) {
        pieTooltip.removeAttribute("style");
      } else {
        pieTooltip.setAttribute("style", `background-color: ${currentColor};`);
      }
    }, 36);

    pieWrapperEl.addEventListener("mousemove", handleHover);
    window.addEventListener("resize", handleResize);
  }
};

function debounce(f, ms) {
  let isCooldown = false;

  return function () {
    if (isCooldown) return;

    f.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => (isCooldown = false), ms);
  };
}

function getAngle(cx, cy, ex, ey) {
  const dy = ey - cy;
  const dx = ex - cx;
  return Math.atan2(dy, dx);
}

export default initPie;
