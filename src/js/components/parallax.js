export const initParallax = () => {
  const parallaxBlock = document.querySelector('.parallax')

  window.addEventListener('scroll', () => {
    parallaxBlock.style.transform = `translateY(${window.pageYOffset / 3.5}px)`
  })
}