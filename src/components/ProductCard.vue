<template>
    <div class="product-card" @click="goToProduct">
        <div class="product-image-container">
            <v-img :src="product.image" :alt="product.name" height="280" cover class="product-image">
                <template #placeholder>
                    <div class="image-placeholder">
                        <div class="placeholder-icon">
                            <v-icon size="32" color="grey-lighten-2">mdi-image</v-icon>
                        </div>
                    </div>
                </template>
            </v-img>

            <div class="category-badge">
                {{ getCategoryName(product.category) }}
            </div>
        </div>

        <div class="product-content">
            <h3 class="product-name">{{ product.name }}</h3>
            <div class="product-price">{{ product.price }}</div>
        </div>

        <div class="product-actions">
            <button class="add-to-cart-btn" @click.stop="addToCart" :disabled="isAdding">
                <span v-if="isAdding" class="loading-text">Adicionando...</span>
                <span v-else>Adicionar</span>
            </button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'

export default {
    name: 'ProductCard',
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const router = useRouter()
        const cartStore = useCartStore()

        const isAdding = ref(false)

        const getCategoryName = (category) => {
            const names = {
                maquiagem: 'Maquiagem',
                skincare: 'Skincare',
                perfume: 'Perfume'
            }
            return names[category] || category
        }

        const goToProduct = () => {
            router.push(`/produto/${props.product.id}`)
        }

        const addToCart = async () => {
            isAdding.value = true

            await new Promise(resolve => setTimeout(resolve, 400))

            cartStore.addToCart(props.product)

            isAdding.value = false
        }

        return {
            isAdding,
            getCategoryName,
            goToProduct,
            addToCart
        }
    }
}
</script>

<style scoped>
.product-card {
    cursor: pointer;
    transition: all 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    border: 1px solid #f5f5f5;
}

.product-card:hover {
    border-color: #e91e63;
    transform: translateY(-2px);
}

.product-image-container {
    position: relative;
    overflow: hidden;
}

.product-image {
    transition: transform 0.3s ease;
}

.product-card:hover .product-image {
    transform: scale(1.02);
}

.image-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background: #fafafa;
}

.category-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 4px 8px;
    font-size: 0.75rem;
    font-weight: 400;
    letter-spacing: 0.5px;
    text-transform: uppercase;
}

.product-content {
    padding: 20px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.product-name {
    font-size: 1rem;
    font-weight: 300;
    color: #000000;
    margin: 0 0 8px 0;
    line-height: 1.4;
    letter-spacing: 0.02em;
}

.product-price {
    font-size: 1.1rem;
    font-weight: 400;
    color: #e91e63;
    margin-top: auto;
}

.product-actions {
    padding: 0 20px 20px;
}

.add-to-cart-btn {
    width: 100%;
    padding: 12px;
    border: 1px solid #000000;
    background: transparent;
    color: #000000;
    font-size: 0.9rem;
    font-weight: 400;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s ease;
}

.add-to-cart-btn:hover:not(:disabled) {
    background: #000000;
    color: #ffffff;
}

.add-to-cart-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.loading-text {
    color: #666666;
}

@media (max-width: 600px) {
    .product-content {
        padding: 16px;
    }

    .product-actions {
        padding: 0 16px 16px;
    }

    .product-name {
        font-size: 0.95rem;
    }

    .product-price {
        font-size: 1rem;
    }

    .add-to-cart-btn {
        padding: 10px;
        font-size: 0.85rem;
    }
}
</style>