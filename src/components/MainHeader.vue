<template>
    <header class="main-header">
        <div class="header-container">
            <div class="logo" @click="$router.push('/')" role="button" tabindex="0">
                <span class="logo-glam">GLAM</span>
                <span class="logo-beauty">BEAUTY</span>
            </div>

            <div class="search-container desktop-search">
                <div class="search-wrapper">
                    <input v-model="searchQuery" type="text" placeholder="Buscar produtos..." class="search-input"
                        @input="handleSearch" @keydown.enter="handleSearchEnter" />
                    <div class="search-icon">
                        <v-icon size="20" color="grey-darken-1">mdi-magnify</v-icon>
                    </div>
                </div>
            </div>

            <div class="header-actions desktop-actions">
                <nav class="nav-menu">
                    <button class="nav-link" @click="$router.push('/')" :class="{ active: $route.name === 'home' }">
                        Home
                    </button>
                    <button class="nav-link" @click="scrollToProducts">Produtos</button>
                    <button class="nav-link" @click="$router.push('/about')"
                        :class="{ active: $route.name === 'about' }">
                        Sobre
                    </button>
                </nav>

                <button class="cart-btn" @click="cartStore.toggleDrawer()"
                    :class="{ 'has-items': cartStore.totalItems > 0 }">
                    <v-icon size="22">mdi-shopping-outline</v-icon>
                    <span v-if="cartStore.totalItems > 0" class="cart-badge">{{ cartStore.totalItems }}</span>
                </button>
            </div>

            <div class="mobile-actions">
                <button class="search-toggle" @click="toggleMobileSearch" :class="{ active: showMobileSearch }">
                    <v-icon size="22">mdi-magnify</v-icon>
                </button>

                <button class="cart-btn" @click="cartStore.toggleDrawer()"
                    :class="{ 'has-items': cartStore.totalItems > 0 }">
                    <v-icon size="22">mdi-shopping-outline</v-icon>
                    <span v-if="cartStore.totalItems > 0" class="cart-badge">{{ cartStore.totalItems }}</span>
                </button>

                <button class="menu-toggle" @click="toggleMobileMenu" :class="{ active: showMobileMenu }">
                    <div class="hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>
            </div>
        </div>

        <div class="mobile-search" :class="{ active: showMobileSearch }">
            <div class="search-wrapper">
                <input ref="mobileSearchInput" v-model="searchQuery" type="text" placeholder="Buscar produtos..."
                    class="search-input" @input="handleSearch" @keydown.enter="handleSearchEnter" />
                <div class="search-icon">
                    <v-icon size="20" color="grey-darken-1">mdi-magnify</v-icon>
                </div>
            </div>
        </div>

        <nav class="mobile-menu" :class="{ active: showMobileMenu }">
            <button class="mobile-nav-link" @click="navigateTo('/')" :class="{ active: $route.name === 'home' }">
                <v-icon size="20">mdi-home-outline</v-icon>
                <span>Home</span>
            </button>
            <button class="mobile-nav-link">
                <v-icon size="20">mdi-tag-outline</v-icon>
                <span>Produtos</span>
            </button>
            <button class="mobile-nav-link" @click="navigateTo('/about')" :class="{ active: $route.name === 'about' }">
                <v-icon size="20">mdi-information-outline</v-icon>
                <span>Sobre</span>
            </button>
        </nav>

        <div class="mobile-overlay" :class="{ active: showMobileMenu || showMobileSearch }"
            @click="closeAllMobileMenus"></div>
    </header>
</template>

<script>
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '../stores/cart'
import { useProductsStore } from '../stores/products'

export default {
    name: 'MainHeader',
    setup() {
        const cartStore = useCartStore()
        const productsStore = useProductsStore()
        const searchQuery = ref('')
        const showMobileMenu = ref(false)
        const showMobileSearch = ref(false)
        const mobileSearchInput = ref(null)

        const handleSearch = (e) => {
            const query = e.target.value
            productsStore.setSearchQuery(query || '')
        }

        const handleSearchEnter = () => {
            if (searchQuery.value.trim()) {
                closeAllMobileMenus()
            }
        }

        const toggleMobileMenu = () => {
            showMobileMenu.value = !showMobileMenu.value
            if (showMobileMenu.value) {
                showMobileSearch.value = false
            }
        }

        const toggleMobileSearch = async () => {
            showMobileSearch.value = !showMobileSearch.value
            if (showMobileSearch.value) {
                showMobileMenu.value = false
                await nextTick()
                mobileSearchInput.value?.focus()
            }
        }

        const closeAllMobileMenus = () => {
            showMobileMenu.value = false
            showMobileSearch.value = false
        }

        const navigateTo = (path) => {
            closeAllMobileMenus()
            setTimeout(() => {
                window.$router?.push(path) || (window.location.href = path)
            }, 150)
        }

        const handleResize = () => {
            if (window.innerWidth > 768) {
                closeAllMobileMenus()
            }
        }

        const handleKeydown = (e) => {
            if (e.key === 'Escape') {
                closeAllMobileMenus()
            }
        }

        onMounted(() => {
            window.addEventListener('resize', handleResize)
            document.addEventListener('keydown', handleKeydown)
        })

        onUnmounted(() => {
            window.removeEventListener('resize', handleResize)
            document.removeEventListener('keydown', handleKeydown)
        })

        return {
            cartStore,
            searchQuery,
            showMobileMenu,
            showMobileSearch,
            mobileSearchInput,
            handleSearch,
            handleSearchEnter,
            toggleMobileMenu,
            toggleMobileSearch,
            closeAllMobileMenus,
            navigateTo,
        }
    },
}
</script>

<style scoped>
.main-header {
    background: #ffffff;
    border-bottom: 1px solid #f0f0f0;
    position: sticky;
    top: 0;
    z-index: 1000;
    height: 80px;
    display: flex;
    align-items: center;
}

.header-container {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
}

.logo {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 2px;
    transition: opacity 0.2s ease;
    flex-shrink: 0;
}

.logo:hover {
    opacity: 0.8;
}

.logo-glam {
    font-size: 1.8rem;
    font-weight: 300;
    color: #000000;
    letter-spacing: 2px;
}

.logo-beauty {
    font-size: 1.8rem;
    font-weight: 600;
    color: #e91e63;
    letter-spacing: 1px;
}

.search-container {
    flex: 1;
    max-width: 480px;
    display: flex;
    justify-content: center;
}

.search-wrapper {
    position: relative;
    width: 100%;
    max-width: 400px;
}

.search-input {
    width: 100%;
    padding: 12px 16px 12px 44px;
    border: none;
    border-bottom: 1px solid #e0e0e0;
    background: transparent;
    font-size: 0.95rem;
    font-weight: 300;
    color: #000000;
    transition: border-color 0.2s ease;
}

.search-input::placeholder {
    color: #999999;
    font-weight: 300;
}

.search-input:focus {
    outline: none;
    border-bottom-color: #e91e63;
}

.search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 32px;
    flex-shrink: 0;
}

.nav-menu {
    display: flex;
    align-items: center;
    gap: 24px;
}

.nav-link {
    font-size: 0.9rem;
    font-weight: 400;
    color: #666666;
    transition: color 0.2s ease;
    padding: 8px 0;
    position: relative;
    background: none;
    border: none;
    cursor: pointer;
}

.nav-link:hover,
.nav-link.active {
    color: #000000;
}

.nav-link.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: #e91e63;
}

.cart-btn {
    position: relative;
    padding: 8px;
    color: #666666;
    transition: all 0.2s ease;
    border-radius: 50%;
    background: none;
    border: none;
    cursor: pointer;
}

.cart-btn:hover {
    color: #000000;
    background: rgba(0, 0, 0, 0.04);
}

.cart-btn.has-items {
    color: #e91e63;
}

.cart-badge {
    position: absolute;
    top: 0;
    right: 0;
    background: #e91e63;
    color: #ffffff;
    font-size: 0.7rem;
    font-weight: 600;
    padding: 2px 6px;
    border-radius: 10px;
    min-width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
}

.mobile-actions {
    display: none;
    align-items: center;
    gap: 12px;
}

.search-toggle,
.menu-toggle {
    padding: 8px;
    background: none;
    border: none;
    cursor: pointer;
    color: #666666;
    border-radius: 50%;
    transition: all 0.2s ease;
}

.search-toggle:hover,
.menu-toggle:hover {
    color: #000000;
    background: rgba(0, 0, 0, 0.04);
}

.search-toggle.active {
    color: #e91e63;
}

.hamburger {
    width: 20px;
    height: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.hamburger span {
    width: 100%;
    height: 2px;
    background: currentColor;
    transition: all 0.3s ease;
    transform-origin: center;
}

.menu-toggle.active .hamburger span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.menu-toggle.active .hamburger span:nth-child(2) {
    opacity: 0;
}

.menu-toggle.active .hamburger span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
}

.mobile-search {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #ffffff;
    border-bottom: 1px solid #f0f0f0;
    padding: 16px 24px;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.mobile-search.active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
}

.mobile-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #ffffff;
    border-bottom: 1px solid #f0f0f0;
    padding: 16px 0;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.mobile-menu.active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
}

.mobile-nav-link {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 24px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 400;
    color: #666666;
    transition: all 0.2s ease;
    text-align: left;
}

.mobile-nav-link:hover,
.mobile-nav-link.active {
    background: rgba(233, 30, 99, 0.04);
    color: #e91e63;
}

.mobile-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: -1;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.mobile-overlay.active {
    opacity: 1;
    visibility: visible;
}

@media (max-width: 1024px) {
    .header-container {
        gap: 24px;
    }

    .search-container {
        max-width: 300px;
    }

    .header-actions {
        gap: 24px;
    }
}

@media (max-width: 768px) {
    .header-container {
        gap: 16px;
        padding: 0 20px;
    }

    .desktop-search,
    .desktop-actions {
        display: none;
    }

    .mobile-actions {
        display: flex;
    }

    .logo-glam,
    .logo-beauty {
        font-size: 1.6rem;
    }
}

@media (max-width: 480px) {
    .header-container {
        padding: 0 16px;
    }

    .logo-glam,
    .logo-beauty {
        font-size: 1.4rem;
    }

    .mobile-search,
    .mobile-menu {
        padding-left: 16px;
        padding-right: 16px;
    }

    .mobile-nav-link {
        padding: 14px 16px;
        font-size: 0.9rem;
    }
}

@media (prefers-reduced-motion: reduce) {
    * {
        transition: none !important;
    }
}
</style>