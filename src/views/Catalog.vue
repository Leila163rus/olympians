<template>
  <div>

    <Banner
    :image-src="'/pexels-saph-photography-2929887_1_(1).png'"
    :image-src-mobile="'/pexels-saph-photography-2929887_2_mobile.png'"
    image-alt="Собрание древних изданий"
    title="СОБРАНИЕ<br> ДРЕВНИХ ИЗДАНИЙ"
    />

    <section class="catalog">
      <h1 class="text-center">БИБЛИОТЕКА</h1>

      <div class="categories-filter">
        <div class="categories-list d-flex align-items-center justify-content-center">
          <button
          v-if="selectedCategory"
          @click="resetCategory"
          class="category-btn reset-btn"
          >
            Сбросить
          </button>
          <button
          v-for="category in uniqueCategories"
          :key="category"
          @click="selectCategory(category)"
          :class="{ active: selectedCategory === category }"
          class="category-btn me-5"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-6 col-md-6 col-lg-4" v-for="book in paginatedBooks" :key="book.id">
          <div class="card mb-5">
            <img :src="book.img" :alt="book.title">
            <h5 class="card-title">{{ book.title }}</h5>
            <p class="card-category">{{ book.category }}</p>
            <div class="d-flex align-items-center justify-content-center mt-auto">
              <span class="price">{{ book.price }} р.</span>
              <button class="card-btn" @click="cart.addToCart(book)">КУПИТЬ</button>
            </div>
          </div>
        </div>
      </div>

      <div class="pagination d-flex justify-content-center align-items-center">
        <span
          class="pagination-arrow"
          @click="prevPage"
        >
              <svg width="15" height="50" viewBox="0 0 15 50" fill="#000000" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.1444 49.999C12.7782 49.9831 12.4438 49.7602 12.2686 49.4258L0.119427 25.4777C-0.0398027 25.1752 -0.0398027 24.8248 0.119427 24.5223L12.2686 0.574224C12.4438 0.239843 12.7622 0.0328445 13.1444 0.000998618C13.5106 -0.0149243 13.8609 0.160228 14.0679 0.478687C14.2749 0.781222 14.2908 1.1793 14.1157 1.51368L2.22125 25L14.1316 48.4863C14.3068 48.8207 14.2749 49.2188 14.0838 49.5213C13.8609 49.8398 13.5106 50.0149 13.1444 49.999Z" fill="black"/>
              </svg>
        </span>

        <span class="pagination-info">
          {{ currentPage }} / {{ totalPages }}
        </span>

        <span class="pagination-arrow"  @click="nextPage">
              <svg width="15" height="50" viewBox="0 0 15 50" fill="#000000" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.10228 0.000995588C1.46851 0.0169181 1.80289 0.239841 1.97805 0.574222L14.1272 24.5223C14.2865 24.8248 14.2865 25.1752 14.1272 25.4777L1.97805 49.4258C1.8029 49.7602 1.48444 49.9672 1.10229 49.999C0.73606 50.0149 0.385756 49.8398 0.178758 49.5213C-0.0282405 49.2188 -0.0441639 48.8207 0.130988 48.4863L12.0254 25L0.115064 1.51368C-0.0600887 1.17929 -0.0282424 0.781219 0.162833 0.478683C0.385754 0.160225 0.736057 -0.0149269 1.10228 0.000995588Z" fill="black"/>
              </svg>
        </span>
      </div>
    </section>

    <Footer />

  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import booksData from '../data/books'
import Banner from "../components/Banner.vue"
import Footer from "../components/Footer.vue"
import { useCartStore } from './../stores/cart'

const books = ref([])
const selectedCategory = ref('')
const currentPage = ref(1)
const isMobile = ref(false)

const updateIsMobile = () => {
  isMobile.value = window.innerWidth < 769
}

onMounted(() => {
  books.value = booksData
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile)
})

const uniqueCategories = computed(() => {
  const categories = books.value.map(book => book.category)
  return [...new Set(categories)].sort()
})

const filteredBooks = computed(() => {
  if (!selectedCategory.value) return books.value
  return books.value.filter(book => book.category === selectedCategory.value)
})

const itemsPerPage = computed(() => (isMobile.value ? 4 : 9))

const totalPages = computed(() => {
  return Math.ceil(filteredBooks.value.length / itemsPerPage.value) || 1
})

const paginatedBooks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredBooks.value.slice(start, start + itemsPerPage.value)
})

const selectCategory = (category) => {
  selectedCategory.value = category
  currentPage.value = 1
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const resetCategory = () => {
  selectedCategory.value = ''
  currentPage.value = 1
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

watch([selectedCategory, isMobile], () => {
  currentPage.value = 1
})

const cart = useCartStore()
</script>

<style>
@import '../assets/styles/catalog.css';
</style>