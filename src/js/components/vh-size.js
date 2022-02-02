export const vhSize = () => {
  let vh = window.innerHeight * 0.01;
  let isPortrait = vh * 100 > window.innerWidth

  document.documentElement.style.setProperty('--vh', `${vh}px`);
  document.documentElement.style.setProperty('--fsvh', `${vh}px`);

  window.addEventListener('resize', () => {
    vh = window.innerHeight * 0.01;
    const isPortraitNew  = vh * 100 > window.innerWidth

    document.documentElement.style.setProperty('--vh', `${vh}px`);

    if(isPortraitNew !== isPortrait){
      document.documentElement.style.setProperty('--fsvh', `${vh}px`);
      isPortrait = isPortraitNew
    }
  });
};
