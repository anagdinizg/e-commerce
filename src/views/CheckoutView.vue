<template>
  <div class="checkout-page">
    <div class="checkout-container">
      <div v-if="cartStore.cartItems.length === 0" class="empty-checkout">
        <div class="empty-content">
          <div class="empty-icon">
            <v-icon size="64" color="grey-lighten-2">mdi-cart-outline</v-icon>
          </div>

          <h2 class="empty-title">Carrinho vazio</h2>

          <p class="empty-description">Adicione produtos ao carrinho para finalizar a compra</p>

          <button class="continue-shopping-btn" @click="$router.push('/')">
            Continuar Comprando
          </button>
        </div>
      </div>

      <div v-else class="checkout-content">
        <div class="checkout-grid">
          <div class="form-section">
            <CheckoutForm @success="handleCheckoutSuccess" />
          </div>

          <div class="summary-section">
            <div class="order-summary">
              <h2 class="summary-title">Resumo do Pedido</h2>

              <div class="order-items">
                <div v-for="item in cartStore.cartItems" :key="item.id" class="order-item">
                  <div class="item-image">
                    <img :src="item.image" :alt="item.name" />
                  </div>

                  <div class="item-info">
                    <h4 class="item-name">{{ item.name }}</h4>

                    <div class="item-details">
                      <span class="quantity">{{ item.quantity }}x</span>

                      <span class="unit-price">{{ formatCurrency(item.price) }}</span>
                    </div>
                  </div>

                  <div class="item-total">
                    {{ formatCurrency(item.price * item.quantity) }}
                  </div>
                </div>
              </div>

              <div class="order-total">
                <div class="total-row">
                  <span class="total-label">Total</span>

                  <span class="total-value">{{ formatCurrency(cartStore.totalPrice) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showSuccessDialog" class="success-modal-overlay" @click="goToHome">
      <div class="success-modal" @click.stop>
        <div class="success-content">
          <div class="success-icon">
            <v-icon size="48" color="success">mdi-check-circle-outline</v-icon>
          </div>

          <h3 class="success-title">Pedido Realizado!</h3>

          <p class="success-description">Seu pedido foi processado com sucesso.</p>

          <p class="order-number">
            Número do pedido: <strong>#{{ orderNumber }}</strong>
          </p>

          <button class="success-btn" @click="goToHome">Continuar Comprando</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { formatCurrency } from '../utils/currency'
import CheckoutForm from '../components/CheckoutForm.vue'

export default {
  name: 'CheckoutView',

  components: {
    CheckoutForm,
  },

  setup() {
    const router = useRouter()
    const cartStore = useCartStore()
    const showSuccessDialog = ref(false)
    const orderNumber = ref('')

    const handleCheckoutSuccess = () => {
      orderNumber.value = Math.random().toString(36).substr(2, 9).toUpperCase()
      cartStore.clearCart()
      showSuccessDialog.value = true
    }

    const goToHome = () => {
      showSuccessDialog.value = false
      router.push('/')
    }

    return {
      cartStore,
      showSuccessDialog,
      orderNumber,
      formatCurrency,
      handleCheckoutSuccess,
      goToHome,
    }
  },
}
</script>

<style scoped>
.checkout-page {
  min-height: 100vh;
  background: #ffffff;
  padding: 40px 0;
}

.checkout-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.empty-checkout {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.empty-content {
  text-align: center;
  max-width: 400px;
}

.empty-icon {
  margin-bottom: 24px;
}

.empty-title {
  font-size: 1.8rem;
  font-weight: 300;
  color: #000000;
  margin: 0 0 12px 0;
}

.empty-description {
  color: #666666;
  font-size: 1rem;
  font-weight: 300;
  margin: 0 0 32px 0;
  line-height: 1.5;
}

.continue-shopping-btn {
  padding: 14px 28px;
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

.continue-shopping-btn:hover {
  background: #ffffff;
  color: #000000;
}

.checkout-content {
  width: 100%;
}

.checkout-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 60px;
  align-items: start;
}

.summary-section {
  position: sticky;
  top: 40px;
}

.order-summary {
  border: 1px solid #f0f0f0;
  background: #fafafa;
}

.summary-title {
  font-size: 1.4rem;
  font-weight: 300;
  color: #000000;
  margin: 0;
  padding: 30px 30px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.order-items {
  padding: 20px 30px;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #f5f5f5;
}

.order-item:last-child {
  border-bottom: none;
}

.item-image {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  overflow: hidden;
  background: #f8f8f8;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info {
  flex: 1;
}

.item-name {
  font-size: 0.9rem;
  font-weight: 400;
  color: #000000;
  margin: 0 0 6px 0;
  line-height: 1.3;
}

.item-details {
  display: flex;
  gap: 12px;
  font-size: 0.85rem;
  color: #666666;
}

.item-total {
  font-size: 0.9rem;
  font-weight: 400;
  color: #e91e63;
}

.order-total {
  padding: 20px 30px;
  border-top: 1px solid #f0f0f0;
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-label {
  font-size: 1.1rem;
  font-weight: 400;
  color: #000000;
}

.total-value {
  font-size: 1.4rem;
  font-weight: 400;
  color: #e91e63;
}

.success-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.success-modal {
  background: #ffffff;
  border: 1px solid #f0f0f0;
  max-width: 400px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
}

.success-content {
  padding: 40px;
  text-align: center;
}

.success-icon {
  margin-bottom: 20px;
}

.success-title {
  font-size: 1.5rem;
  font-weight: 400;
  color: #000000;
  margin: 0 0 12px 0;
}

.success-description {
  color: #666666;
  font-size: 1rem;
  font-weight: 300;
  margin: 0 0 16px 0;
  line-height: 1.5;
}

.order-number {
  color: #000000;
  font-size: 0.95rem;
  font-weight: 300;
  margin: 0 0 32px 0;
}

.order-number strong {
  font-weight: 400;
}

.success-btn {
  padding: 14px 28px;
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

.success-btn:hover {
  background: #ffffff;
  color: #000000;
}

@media (max-width: 1024px) {
  .checkout-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .summary-section {
    position: static;
    order: -1;
  }
}

@media (max-width: 768px) {
  .checkout-page {
    padding: 20px 0;
  }

  .checkout-container {
    padding: 0 16px;
  }

  .checkout-grid {
    gap: 30px;
  }

  .order-summary {
    border: none;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
    background: #ffffff;
  }

  .summary-title,
  .order-items,
  .order-total {
    padding-left: 20px;

    padding-right: 20px;
  }

  .success-modal {
    margin: 20px;
  }

  .success-content {
    padding: 30px 20px;
  }
}
</style>
