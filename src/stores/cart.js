import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref(JSON.parse(localStorage.getItem('cart')) || [])

  watch(
    items,
    (newItems) => {
      localStorage.setItem('cart', JSON.stringify(newItems))
    },
    { deep: true }
  )

  const addToCart = (book) => {
    const existing = items.value.find(i => i.id === book.id)

    if (existing) {
      existing.qty++
    } else {
      items.value.push({ ...book, qty: 1 })
    }
  }

  const removeFromCart = (id) => {
    items.value = items.value.filter(i => i.id !== id)
  }

  const increase = (id) => {
    const item = items.value.find(i => i.id === id)
    if (item) item.qty++
  }

  const decrease = (id) => {
    const item = items.value.find(i => i.id === id)
    if (item && item.qty > 1) item.qty--
  }

  const clear = () => {
    items.value = []
    localStorage.removeItem('cart')
  }

  const totalCount = computed(() =>
    items.value.reduce((sum, i) => sum + i.qty, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, i) => sum + i.qty * i.price, 0)
  )

  return {
    items,
    addToCart,
    removeFromCart,
    increase,
    decrease,
    clear,
    totalCount,
    totalPrice
  }
})