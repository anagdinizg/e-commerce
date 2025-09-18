<template>
    <div>
        <section class="hero-section">
            <v-container fluid class="pa-0">
                <v-row no-gutters class="fill-height">
                    <!-- Conteúdo de texto à esquerda -->
                    <v-col cols="12" md="6" class="hero-content-col">
                        <div class="hero-content">
                            <h1 class="hero-title">
                                GLAM <span class="text-primary">BEAUTY</span>
                            </h1>
                            <p class="hero-subtitle">
                                A beleza do futuro chegou
                            </p>
                            <p class="hero-description">
                                Nossa próxima coleção traz todas as últimas tendências, de
                                produtos de edição limitada a cosméticos de grife.
                            </p>
                            <v-btn color="primary" size="large" class="mt-6 hero-cta-btn" elevation="8" rounded="pill"
                                @click="scrollToProducts">
                                Descobrir Produtos
                                <v-icon class="ml-2">mdi-arrow-down</v-icon>
                            </v-btn>
                        </div>
                    </v-col>

                    <v-col cols="12" md="6" class="hero-image-col">
                        <div class="hero-image-container">
                            <v-img
                                src="https://images.pexels.com/photos/8243685/pexels-photo-8243685.jpeg?_gl=1*cnaoqz*_ga*NDAyNzMwNDAzLjE3NTgwNDMzMTU.*_ga_8JE65Q40S6*czE3NTgxNDUwNjYkbzYkZzEkdDE3NTgxNDY3NTckajU5JGwwJGgw"
                                height="100%" cover class="hero-image" :style="{ objectPosition: 'center center' }">
                            </v-img>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </section>

        <section id="products-section" class="products-section" ref="productsSection">
            <v-container class="py-16">
                <v-row class="mb-12">
                    <v-col cols="12" class="text-center">
                        <h2 class="section-title">Nossos Produtos</h2>
                        <p class="section-description">Descubra nossa seleção exclusiva de produtos de beleza</p>
                    </v-col>
                </v-row>

                <v-row class="mb-8">
                    <v-col cols="12">
                        <div class="controls-container">
                            <div class="filter-container">
                                <v-chip-group v-model="activeTab" color="primary"
                                    selected-class="text-primary font-weight-bold" mandatory class="filter-chips">
                                    <v-chip value="todos" variant="flat" class="filter-chip">
                                        Todos
                                    </v-chip>
                                    <v-chip value="maquiagem" variant="flat" class="filter-chip">
                                        Maquiagem
                                    </v-chip>
                                    <v-chip value="skincare" variant="flat" class="filter-chip">
                                        Skincare
                                    </v-chip>
                                    <v-chip value="perfume" variant="flat" class="filter-chip">
                                        Perfume
                                    </v-chip>
                                </v-chip-group>
                            </div>

                            <div class="sort-container">
                                <v-select v-model="sortBy" :items="sortItems" label="Ordenar" variant="solo-filled"
                                    density="compact" color="primary" hide-details class="sort-select"
                                    @update:model-value="productsStore.setSortBy($event)" />
                            </div>
                        </div>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col v-if="productsStore.filteredProducts.length === 0" cols="12">
                        <div class="empty-state">
                            <div class="empty-icon">
                                <v-icon size="64" color="grey-lighten-3">mdi-package-variant</v-icon>
                            </div>
                            <h3 class="empty-title">Nenhum produto encontrado</h3>
                            <p class="empty-description">Tente ajustar os filtros ou busca</p>
                        </div>
                    </v-col>

                    <v-col v-for="product in productsStore.filteredProducts" :key="product.id" cols="12" sm="6" md="4"
                        lg="3">
                        <ProductCard :product="product" />
                    </v-col>
                </v-row>
            </v-container>
        </section>
    </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useProductsStore } from '../stores/products'
import ProductCard from '../components/ProductCard.vue'

export default {
    name: 'HomeView',
    components: {
        ProductCard
    },
    setup() {
        const productsStore = useProductsStore()
        const productsSection = ref(null)

        const activeTab = ref('todos')
        const sortBy = ref(productsStore.sortBy)

        const sortItems = [
            { title: 'Nome A-Z', value: 'name' },
            { title: 'Menor Preço', value: 'price-asc' },
            { title: 'Maior Preço', value: 'price-desc' },
            { title: 'Mais Populares', value: 'popular' }
        ]

        watch(activeTab, (newTab) => {
            const categoryMap = {
                'todos': '',
                'maquiagem': 'maquiagem',
                'skincare': 'skincare',
                'perfume': 'perfume'
            }
            productsStore.setSelectedCategory(categoryMap[newTab])
        })

        const scrollToProducts = () => {
            if (productsSection.value) {
                const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0
                const topBarHeight = document.querySelector('.top-bar')?.offsetHeight || 0
                const totalHeaderHeight = headerHeight + topBarHeight

                const elementPosition = productsSection.value.offsetTop
                const offsetPosition = elementPosition - totalHeaderHeight - 20

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                })
            }
        }

        return {
            productsStore,
            productsSection,
            activeTab,
            sortBy,
            sortItems,
            scrollToProducts
        }
    }
}
</script>

<style scoped>
.hero-section {
    position: relative;
    min-height: 30vh;
    background: black;
}

.hero-content-col {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem 3rem;
    background: black;
}

.hero-image-col {
    position: relative;
    min-height: 30vh;
}

.hero-image-container {
    position: relative;
    height: 100%;
    min-height: 30vh;
    border-radius: 0 0 0 2rem;
    overflow: hidden;
}

.hero-image {
    position: relative;
    width: 100%;
    height: 100%;
}

.hero-content {
    position: relative;
    z-index: 2;
    max-width: 500px;
    text-align: left;
}

.hero-title {
    font-size: clamp(2.8rem, 6vw, 4.5rem);
    font-weight: 900;
    color: white;
    line-height: 1.1;
    margin-bottom: 1.2rem;
    text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.4);
    letter-spacing: -1px;
}

.hero-subtitle {
    font-size: 1.4rem;
    color: #f06292;
    font-weight: 600;
    margin-bottom: 1.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-description {
    font-size: 1.15rem;
    color: rgba(255, 255, 255, 0.92);
    line-height: 1.7;
    max-width: 520px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
    margin-bottom: 2rem;
}

.hero-cta-btn {
    padding: 0 2.5rem !important;
    height: 56px !important;
    font-size: 1.1rem !important;
    font-weight: 600 !important;
    text-transform: none !important;
    letter-spacing: 0.5px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.hero-cta-btn:hover {
    transform: translateY(-2px);
}

.products-section {
    background: #ffffff;
    min-height: 60vh;
}

.section-title {
    font-size: 2.5rem;
    font-weight: 300;
    color: #000000;
    margin-bottom: 0.5rem;
    letter-spacing: -0.02em;
}

.section-description {
    font-size: 1rem;
    color: #666666;
    font-weight: 300;
    max-width: 400px;
    margin: 0 auto;
}

.controls-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
    background: transparent;
    border-bottom: 1px solid #f0f0f0;
    gap: 24px;
}

.filter-container {
    flex: 1;
}

.filter-chips {
    gap: 0;
}

.filter-chip {
    height: 36px !important;
    padding: 0 16px !important;
    border-radius: 0 !important;
    font-weight: 400 !important;
    text-transform: none !important;
    letter-spacing: 0.02em;
    border: none !important;
    background: transparent !important;
    color: #999999 !important;
    transition: all 0.2s ease !important;
    border-bottom: 2px solid transparent !important;
}

.filter-chip:hover {
    color: #000000 !important;
}

.filter-chips :deep(.v-chip--selected) {
    background: transparent !important;
    color: #000000 !important;
    border-bottom: 2px solid #e91e63 !important;
    box-shadow: none;
}

.sort-container {
    min-width: 200px;
}

.sort-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.sort-label {
    font-size: 0.85rem;
    font-weight: 400;
    color: #666666;
    letter-spacing: 0.02em;
}

.sort-select-minimal {
    width: 100%;
    padding: 8px 0;
    border: none;
    border-bottom: 1px solid #e0e0e0;
    background: transparent;
    font-size: 0.9rem;
    font-weight: 400;
    color: #000000;
    cursor: pointer;
    transition: border-color 0.2s ease;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right center;
    background-size: 16px;
    padding-right: 24px;
}

.sort-select-minimal:focus {
    outline: none;
    border-bottom-color: #e91e63;
}

.sort-select-minimal:hover {
    border-bottom-color: #000000;
}

.empty-state {
    text-align: center;
    padding: 80px 24px;
    background: transparent;
    border: none;
}

.empty-icon {
    margin-bottom: 20px;
}

.empty-title {
    font-size: 1.1rem;
    font-weight: 300;
    color: #000000;
    margin-bottom: 8px;
}

.empty-description {
    color: #999999;
    font-size: 0.9rem;
    font-weight: 300;
}

@media (max-width: 960px) {
    .hero-content {
        text-align: center;
        padding: 3rem 1.5rem;
    }

    .hero-title {
        font-size: 2.8rem;
        margin-bottom: 1rem;
    }

    .hero-subtitle {
        font-size: 1.2rem;
    }

    .hero-description {
        max-width: 100%;
        font-size: 1rem;
    }

    .section-title {
        font-size: 2rem;
    }

    .controls-container {
        flex-direction: column;
        gap: 20px;
        padding: 20px;
    }

    .filter-container,
    .sort-container {
        width: 100%;
    }

    .sort-container {
        min-width: unset;
    }
}

@media (max-width: 600px) {
    .hero-title {
        font-size: 2.2rem;
    }

    .hero-subtitle {
        font-size: 1.1rem;
    }

    .hero-description {
        font-size: 0.95rem;
        line-height: 1.6;
    }

    .section-title {
        font-size: 1.8rem;
    }

    .section-description {
        font-size: 1rem;
    }

    .controls-container {
        padding: 16px;
    }

    .filter-chips {
        justify-content: center;
        flex-wrap: wrap;
    }
}

.hero-content>* {
    animation: fadeInUp 0.8s ease-out forwards;
    opacity: 0;
    transform: translateY(30px);
}

.hero-title {
    animation-delay: 0.2s;
}

.hero-subtitle {
    animation-delay: 0.4s;
}

.hero-description {
    animation-delay: 0.6s;
}

.hero-cta-btn {
    animation-delay: 0.8s;
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>