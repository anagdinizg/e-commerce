<template>
    <v-container v-if="product">
        <v-btn @click="$router.go(-1)" variant="text" prepend-icon="mdi-arrow-left" class="mb-4">
            Voltar
        </v-btn>

        <v-row>
            <v-col cols="12" md="6">
                <v-carousel height="400" show-arrows="hover">
                    <v-carousel-item v-for="(image, index) in product.images" :key="index" :src="image" cover />
                </v-carousel>
            </v-col>

            <v-col cols="12" md="6">
                <h1 class="text-h4 mb-2">{{ product.name }}</h1>

                <v-chip :color="getCategoryColor(product.category)" class="mb-4" small>
                    {{ getCategoryName(product.category) }}
                </v-chip>

                <div class="text-h5 text-success mb-4">
                    {{ product.price }}
                </div>

                <p class="text-body-1 mb-6">{{ product.description }}</p>

                <v-btn color="primary" size="large" prepend-icon="mdi-cart-plus" @click="addToCart" :disabled="isAdding"
                    :loading="isAdding" class="mb-4" block>
                    Adicionar ao Carrinho
                </v-btn>

                <v-btn color="secondary" variant="outlined" size="large" prepend-icon="mdi-credit-card" @click="buyNow"
                    block>
                    Comprar Agora
                </v-btn>
            </v-col>
        </v-row>
    </v-container>

    <v-container v-else>
        <v-alert type="error" class="mb-4">
            Produto não encontrado
        </v-alert>
        <v-btn @click="$router.push('/')" color="primary">
            Voltar à loja
        </v-btn>
    </v-container>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '../stores/products'
import { useCartStore } from '../stores/cart'

export default {
    name: 'ProductView',
    setup() {
        const route = useRoute()
        const router = useRouter()
        const productsStore = useProductsStore()
        const cartStore = useCartStore()

        const isAdding = ref(false)

        const product = computed(() =>
            productsStore.getProductById(route.params.id)
        )

        const getCategoryName = (category) => {
            const names = {
                smartphones: 'Smartphones',
                laptops: 'Laptops',
                tablets: 'Tablets'
            }
            return names[category] || category
        }

        const getCategoryColor = (category) => {
            const colors = {
                smartphones: 'blue',
                laptops: 'green',
                tablets: 'purple'
            }
            return colors[category] || 'grey'
        }

        const addToCart = async () => {
            isAdding.value = true

            await new Promise(resolve => setTimeout(resolve, 500))

            cartStore.addToCart(product.value)
            cartStore.openDrawer()

            isAdding.value = false
        }

        const buyNow = () => {
            if (!cartStore.cartItems.find(item => item.id === product.value.id)) {
                cartStore.addToCart(product.value)
            }
            router.push('/checkout')
        }

        return {
            product,
            isAdding,
            getCategoryName,
            getCategoryColor,
            addToCart,
            buyNow
        }
    }
}
</script>
