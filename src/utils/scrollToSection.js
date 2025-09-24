export function scrollToProductsSection() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section')

    if (!productsSection) return

    const header = document.querySelector('.main-header')

    const topBar = document.querySelector('.top-bar')

    const headerHeight = header?.offsetHeight || 0

    const topBarHeight = topBar?.offsetHeight || 0

    const totalHeaderHeight = headerHeight + topBarHeight

    const rect = productsSection.getBoundingClientRect()

    const offsetPosition = window.scrollY + rect.top - totalHeaderHeight - 20

    window.scrollTo({
      top: offsetPosition,

      behavior: 'smooth',
    })
  }

  if (window.location.pathname === '/') {
    scrollToProducts()
  } else {
    sessionStorage.setItem('scrollToProducts', 'true')

    window.location.href = '/'
  }
}

window.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('scrollToProducts') === 'true') {
    sessionStorage.removeItem('scrollToProducts')

    setTimeout(() => {
      const productsSection = document.getElementById('products-section')

      if (productsSection) {
        const header = document.querySelector('.main-header')

        const topBar = document.querySelector('.top-bar')

        const headerHeight = header?.offsetHeight || 0

        const topBarHeight = topBar?.offsetHeight || 0

        const totalHeaderHeight = headerHeight + topBarHeight

        const rect = productsSection.getBoundingClientRect()

        const offsetPosition = window.scrollY + rect.top - totalHeaderHeight - 20

        window.scrollTo({
          top: offsetPosition,

          behavior: 'smooth',
        })
      }
    }, 50)
  }
})
