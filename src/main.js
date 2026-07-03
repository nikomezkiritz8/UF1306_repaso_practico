import './style.scss'

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const hero = document.querySelector('.hero')
const heroVideo = document.querySelector('.hero__video')
const heroContent = document.querySelector('.hero__content')
const revealItems = document.querySelectorAll('.section-block h2, .card, .carousel, .accordion-item')

if (hero && !prefersReducedMotion) {
  hero.addEventListener('pointermove', (event) => {
    const heroRect = hero.getBoundingClientRect()
    const x = ((event.clientX - heroRect.left) / heroRect.width) * 100
    const y = ((event.clientY - heroRect.top) / heroRect.height) * 100
    const horizontalMove = (x - 50) / 50
    const verticalMove = (y - 50) / 50

    hero.style.setProperty('--hero-glow-x', `${x}%`)
    hero.style.setProperty('--hero-glow-y', `${y}%`)
    heroVideo?.style.setProperty('transform', `scale(1.06) translate(${horizontalMove * -10}px, ${verticalMove * -8}px)`)
    heroContent?.style.setProperty('transform', `translate(${horizontalMove * 8}px, ${verticalMove * 6}px)`)
  })

  hero.addEventListener('pointerleave', () => {
    hero.style.removeProperty('--hero-glow-x')
    hero.style.removeProperty('--hero-glow-y')
    heroVideo?.style.removeProperty('transform')
    heroContent?.style.removeProperty('transform')
  })
}

revealItems.forEach((item, index) => {
  item.classList.add('reveal-on-scroll')
  item.style.setProperty('--reveal-delay', `${Math.min(index * 70, 280)}ms`)
})

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  }, {
    rootMargin: '0px 0px -70px',
    threshold: .16,
  })

  revealItems.forEach((item) => revealObserver.observe(item))
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'))
}
