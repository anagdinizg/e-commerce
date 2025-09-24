<template>
  <div class="top-bar">
    <div class="top-bar-content">
      <span class="promo-text">Liquidação de beleza • Entrega expressa grátis</span>

      <button class="promo-btn" @click="navigateToProducts">Compre Agora</button>
    </div>
  </div>
</template>

<script>
import { scrollToProductsSection } from '../utils/scrollToSection'

export default {
  name: 'TopBar',

  methods: {
    navigateToProducts() {
      scrollToProductsSection()
    },
  },
}
</script>

<style scoped>
.top-bar {
  background: #000000;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.top-bar-content {
  display: flex;
  align-items: center;
  padding: 20px;
  gap: 16px;
}

.promo-text {
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 300;
  letter-spacing: 0.5px;
}

.promo-btn {
  color: #e91e63;
  font-size: 0.8rem;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 0.2s ease;
}

.promo-btn:hover {
  color: #ffffff;
}
</style>
