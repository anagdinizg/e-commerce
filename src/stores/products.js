import { defineStore } from 'pinia'

import lipstick1 from '@/assets/images/lipstick-1.jpg'
import lipstick2 from '@/assets/images/lipstick-2.jpg'
import lipstick3 from '@/assets/images/lipstick-3.jpg'
import lipstick4 from '@/assets/images/lipstick-4.jpg'

import eyeshadow1 from '@/assets/images/eyeshadow-1.jpg'
import eyeshadow2 from '@/assets/images/eyeshadow-2.jpg'
import eyeshadow3 from '@/assets/images/eyeshadow-3.jpg'
import eyeshadow4 from '@/assets/images/eyeshadow-4.jpg'

import moisturizer1 from '@/assets/images/moisturizer-1.jpg'
import serum1 from '@/assets/images/serum-1.jpg'
import serum2 from '@/assets/images/serum-2.jpg'

import parfum1 from '@/assets/images/parfum-1.jpg'
import parfum2 from '@/assets/images/parfum-2.jpg'
import parfum4 from '@/assets/images/parfum-4.avif'

import eyemask1 from '@/assets/images/eyemask-1.jpg'
import eyemask2 from '@/assets/images/eyemask-2.jpg'

import base1 from '@/assets/images/base-1.jpg'
import eyeliner1 from '@/assets/images/eyeliner-1.jpg'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [
      {
        id: 1,
        name: 'Batom Rose Matte',
        price: 39.9,
        category: 'maquiagem',
        image: lipstick4,
        images: [lipstick2, lipstick3, lipstick1],
        description:
          'Batom cremoso com acabamento matte, longa duração e cor intensa. Fórmula enriquecida com vitamina E para hidratação.',
      },
      {
        id: 2,
        name: 'Paleta de Sombras Nude',
        price: 79.9,
        category: 'maquiagem',
        image: eyeshadow1,
        images: [eyeshadow2, eyeshadow3],
        description:
          'Paleta com 12 tons nude e marrons, textura sedosa e alta pigmentação. Perfeita para looks do dia ao noite.',
      },
      {
        id: 3,
        name: 'Creme Hidratante Facial',
        price: 59.9,
        category: 'skincare',
        image: moisturizer1,
        images: [moisturizer1, serum1],
        description:
          'Creme hidratante com ácido hialurônico e colágeno. Hidratação profunda por 24 horas, ideal para todos os tipos de pele.',
      },
      {
        id: 4,
        name: 'Sérum Vitamina C',
        price: 89.9,
        category: 'skincare',
        image: serum1,
        images: [serum2, serum1],
        description:
          'Sérum antioxidante com 20% de vitamina C. Combate sinais do envelhecimento e proporciona luminosidade natural.',
      },
      {
        id: 5,
        name: 'Perfume Masculino Marcante',
        price: 129.9,
        category: 'perfume',
        image: parfum4,
        images: [parfum2, parfum1],
        description:
          'Fragrância floral sofisticada com notas de jasmim, rosa e vanilla. Duração de até 8 horas.',
      },
      {
        id: 6,
        name: 'Máscara para Cílios Volume',
        price: 45.9,
        category: 'maquiagem',
        image: eyemask2,
        images: [eyeshadow2, eyeshadow4],
        description:
          "Máscara volumizadora à prova d'água. Fórmula com fibras que alonga e define os cílios sem ressecar.",
      },
      {
        id: 7,
        name: 'Corretivo em bastão',
        price: 35.9,
        category: 'maquiagem',
        image: base1,
        images: [eyeshadow1, eyemask2],
        description:
          "Máscara volumizadora à prova d'água. Fórmula com fibras que alonga e define os cílios sem ressecar.",
      },
      {
        id: 8,
        name: 'Delineador líquido',
        price: 35.9,
        category: 'maquiagem',
        image: eyeliner1,
        images: [eyeshadow1, eyemask1],
        description:
          "Máscara volumizadora à prova d'água. Fórmula com fibras que alonga e define os cílios sem ressecar.",
      },
    ],
    categories: ['maquiagem', 'skincare', 'perfume'],
    searchQuery: '',
    selectedCategory: '',
    sortBy: 'name',
  }),

  getters: {
    filteredProducts: (state) => {
      let filtered = state.products

      if (state.searchQuery) {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(state.searchQuery.toLowerCase()),
        )
      }

      if (state.selectedCategory) {
        filtered = filtered.filter((product) => product.category === state.selectedCategory)
      }

      filtered = filtered.sort((a, b) => {
        switch (state.sortBy) {
          case 'price-asc':
            return a.price - b.price
          case 'price-desc':
            return b.price - a.price
          case 'name':
          default:
            return a.name.localeCompare(b.name)
        }
      })

      return filtered
    },

    getProductById: (state) => {
      return (id) => state.products.find((product) => product.id === parseInt(id))
    },
  },

  actions: {
    setSearchQuery(query) {
      this.searchQuery = query
    },

    setSelectedCategory(category) {
      this.selectedCategory = category
    },

    setSortBy(sortBy) {
      this.sortBy = sortBy
    },
  },
})
