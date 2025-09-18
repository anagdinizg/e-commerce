import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    isDrawerOpen: false,
  }),

  getters: {
    totalItems: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },

    totalPrice: (state) => {
      return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
    },

    cartItems: (state) => state.items,
  },

  actions: {
    addToCart(product) {
      const existingItem = this.items.find((item) => item.id === product.id)

      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        })
      }
    },

    removeFromCart(productId) {
      const index = this.items.findIndex((item) => item.id === productId)
      if (index > -1) {
        this.items.splice(index, 1)
      }
    },

    updateQuantity(productId, quantity) {
      const item = this.items.find((item) => item.id === productId)
      if (item) {
        if (quantity <= 0) {
          this.removeFromCart(productId)
        } else {
          item.quantity = quantity
        }
      }
    },

    clearCart() {
      this.items = []
    },

    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen
    },

    openDrawer() {
      this.isDrawerOpen = true
    },

    closeDrawer() {
      this.isDrawerOpen = false
    },
  },
})
