<template>
  <v-navigation-drawer v-model="cartStore.isDrawerOpen" location="right" temporary width="400" class="cart-drawer">
    <div class="cart-header">
      <h2 class="cart-title">Carrinho</h2>

      <button class="close-btn" @click="cartStore.closeDrawer()">
        <v-icon size="20">mdi-close</v-icon>
      </button>
    </div>

    <div v-if="cartStore.cartItems.length === 0" class="empty-cart">
      <div class="empty-icon">
        <v-icon size="48" color="grey-lighten-2">mdi-cart-outline</v-icon>
      </div>

      <p class="empty-text">Seu carrinho está vazio</p>
    </div>

    <div v-else class="cart-content">
      <div class="cart-items">
        <div v-for="item in cartStore.cartItems" :key="item.id" class="cart-item">
          <div class="item-image">
            <img :src="item.image" :alt="item.name" />
          </div>

          <div class="item-details">
            <h4 class="item-name">{{ item.name }}</h4>

            <p class="item-price">{{ formatCurrency(item.price) }}</p>

            <div class="quantity-controls">
              <button class="qty-btn" @click="decreaseQuantity(item)" :disabled="item.quantity <= 1">
                <v-icon size="16">mdi-minus</v-icon>
              </button>

              <span class="quantity">{{ item.quantity }}</span>

              <button class="qty-btn" @click="increaseQuantity(item)">
                <v-icon size="16">mdi-plus</v-icon>
              </button>
            </div>
          </div>

          <div class="item-actions">
            <button class="remove-btn" @click="removeItem(item)">
              <v-icon size="18">mdi-delete-outline</v-icon>
            </button>
          </div>
        </div>
      </div>

      <div class="cart-footer">
        <div class="total-section">
          <div class="total-label">Total</div>

          <div class="total-price">{{ formatCurrency(cartStore.totalPrice) }}</div>
        </div>

        <div class="cart-actions">
          <button class="checkout-btn" @click="goToCheckout">Finalizar Compra</button>

          <button class="clear-btn" @click="clearCart">Limpar Carrinho</button>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { formatCurrency } from '../utils/currency'

export default {
  name: 'CartDrawer',

  setup() {
    const router = useRouter()
    const cartStore = useCartStore()

    const increaseQuantity = (item) => {
      cartStore.updateQuantity(item.id, item.quantity + 1)
    }

    const decreaseQuantity = (item) => {
      cartStore.updateQuantity(item.id, item.quantity - 1)
    }

    const removeItem = (item) => {
      cartStore.removeFromCart(item.id)
    }

    const clearCart = () => {
      cartStore.clearCart()
    }

    const goToCheckout = () => {
      cartStore.closeDrawer()
      router.push('/checkout')
    }

    return {
      cartStore,
      formatCurrency,
      increaseQuantity,
      decreaseQuantity,
      removeItem,
      clearCart,
      goToCheckout,
    }
  },
}
</script>

<style scoped>
.cart-drawer :deep(.v-navigation-drawer__content) {
  background: #ffffff;
  display: flex;
  flex-direction: column;
}

.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.cart-title {
  font-size: 1.4rem;
  font-weight: 300;
  color: #000000;
  margin: 0;
  letter-spacing: 0.02em;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: #666666;
  transition: color 0.2s ease;
}

.close-btn:hover {
  color: #000000;
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 40px 24px;
}

.empty-icon {
  margin-bottom: 16px;
}

.empty-text {
  color: #999999;
  font-size: 1rem;
  font-weight: 300;
  text-align: center;
}

.cart-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
}

.cart-item {
  display: flex;
  gap: 16px;
  padding: 20px 0;
  border-bottom: 1px solid #f5f5f5;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  overflow: hidden;
  background: #f8f8f8;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.item-name {
  font-size: 0.95rem;
  font-weight: 400;
  color: #000000;
  margin: 0 0 4px 0;
  line-height: 1.3;
}

.item-price {
  color: #e91e63;
  font-size: 0.9rem;
  font-weight: 400;
  margin: 0 0 12px 0;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.qty-btn {
  width: 28px;
  height: 28px;
  border: 1px solid #e0e0e0;
  background: #ffffff;
  color: #666666;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qty-btn:hover:not(:disabled) {
  border-color: #000000;
  color: #000000;
}

.qty-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.quantity {
  font-size: 0.9rem;
  font-weight: 400;
  color: #000000;
  min-width: 20px;
  text-align: center;
}

.item-actions {
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  padding-top: 4px;
}

.remove-btn {
  background: none;
  border: none;
  color: #999999;
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s ease;
}

.remove-btn:hover {
  color: #ff4444;
}

.cart-footer {
  padding: 24px;
  border-top: 1px solid #f0f0f0;
  background: #fafafa;
}

.total-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.total-label {
  font-size: 1.1rem;
  font-weight: 400;
  color: #000000;
}

.total-price {
  font-size: 1.3rem;
  font-weight: 400;
  color: #e91e63;
}

.cart-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.checkout-btn {
  width: 100%;
  padding: 14px;
  border: 2px solid #000000;
  background: #000000;
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 400;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;
}

.checkout-btn:hover {
  background: #ffffff;
  color: #000000;
}

.clear-btn {
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  background: #ffffff;
  color: #666666;
  font-size: 0.9rem;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-btn:hover {
  border-color: #ff4444;
  color: #ff4444;
}

@media (max-width: 480px) {
  .cart-drawer {
    width: 100vw !important;
  }

  .cart-header,
  .cart-items,
  .cart-footer {
    padding-left: 16px;
    padding-right: 16px;
  }

  .item-image {
    width: 50px;
    height: 50px;
  }

  .item-name {
    font-size: 0.9rem;
  }
}
</style>
