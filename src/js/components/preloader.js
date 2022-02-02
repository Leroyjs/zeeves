export const preloader = () => {
  const preloader = document.querySelector('.preloader');
  const preloaderCount = preloader.querySelector('.preloader__counter');

  const minTimeout = 800;
  const maxTimeout = 5000;

  let stepTimeout = maxTimeout / 100;

  let percent = 0;

  let preloaderIsDone = false;

  if (window.pageLoaded) {
    preloaderDone();

  } else {
    window.addEventListener('load', () => {
      preloaderDone();
    });
  }

  setTimeout(() => {
    if (!preloaderIsDone) {
      preloaderDone();
    }
  }, maxTimeout);

  function preloaderDone() {
    stepTimeout = minTimeout / (100 - percent)

    setTimeout(() => {
      preloaderIsDone = true;
    }, minTimeout);
  }

  (function drawPercentage(){
    setTimeout(() => {
      preloaderCount.innerText = percent++

      if(percent <= 100) {
        drawPercentage()
      }else{
        const body = document.body;
        body.classList.add('loaded');
        body.classList.remove('no-scroll');
      }
    }, stepTimeout);
  })()
};
