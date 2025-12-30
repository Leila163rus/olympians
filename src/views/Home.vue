<template>
  <div>

    <Banner/>

    <section class="carousel">
      <h2 class="title">ГОРЯЧИЕ НОВИНКИ</h2>
      <swiper
      ref="mobileSwiper"
      :modules="[Navigation]"
      :slides-per-view="1"
      class="mySwiper mobile-swiper"
      @swiper="onMobileSwiper"
      >
        <swiper-slide v-for="book in mobileBooks" :key="book.id">
          <div class="card mobile-card">
            <img class="img-fluid" :src="book.img" :alt="book.title">
            <h5 class="card-title">{{ book.title }}</h5>
            <p class="card-category">{{ book.category }}</p>
            <div class="d-flex flex-row align-items-center justify-content-center mt-auto">
              <span class="price">{{ book.price }} р.</span>
              <button class="card-btn" @click="cart.addToCart(book)">
                КУПИТЬ
              </button>
            </div>
          </div>
        </swiper-slide>

        <template #container-end>
          <div class="carousel-controls">
            <span class="carousel-control-prev" @click="mobileSwiperApi?.slidePrev()">
              <svg width="29" height="100" viewBox="0 0 29 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M26.2888 99.998C25.5564 99.9662 24.8876 99.5203 24.5373 98.8516L0.23892 50.9554C-0.0795386 50.3503 -0.0795386 49.6497 0.23892 49.0446L24.5373 1.14845C24.8876 0.479685 25.5245 0.0656889 26.2888 0.00199724C27.0213 -0.0298486 27.7219 0.320456 28.1359 0.957373C28.5499 1.56244 28.5817 2.35859 28.2314 3.02735L4.44257 50L28.2633 96.9726C28.6136 97.6414 28.5499 98.4376 28.1677 99.0426C27.7219 99.6796 27.0213 100.03 26.2888 99.998Z" fill="black"/>
              </svg>
            </span>
            <span class="carousel-control-next"  @click="mobileSwiperApi?.slideNext()">
              <svg width="29" height="100" viewBox="0 0 29 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.20457 0.00199118C2.93702 0.0338362 3.60579 0.479683 3.95609 1.14844L28.2545 49.0446C28.5729 49.6497 28.5729 50.3503 28.2545 50.9554L3.9561 98.8516C3.60579 99.5203 2.96887 99.9343 2.20457 99.998C1.47212 100.03 0.771511 99.6795 0.357515 99.0426C-0.056481 98.4376 -0.0883279 97.6414 0.261977 96.9726L24.0508 50L0.230127 3.02735C-0.120177 2.35859 -0.0564847 1.56244 0.325666 0.957367C0.771508 0.32045 1.47211 -0.0298539 2.20457 0.00199118Z" fill="black"/>
              </svg>
            </span>
          </div>
        </template>
      </swiper>

      <swiper
      ref="desktopSwiper"
      :modules="[Navigation, Pagination]"
      :pagination="{ el: '.swiper-pagination-custom', clickable: true }"
      :slides-per-view="1"
      @swiper="onDesktopSwiper"
      class="mySwiper"
      >
        <swiper-slide v-for="(group, i) in desktopBooks" :key="i">
          <div class="row justify-content-between mx-0">
            <div class="card col-4" v-for="book in group" :key="book.id">
              <img class="img-fluid" :src="book.img" :alt="book.title">
              <h5 class="card-title">{{ book.title }}</h5>
              <p class="card-category">{{ book.category }}</p>
              <div class="d-flex flex-row align-items-center justify-content-center mt-auto">
                <span class="price">{{ book.price }} р.</span>
                <button class="card-btn" @click="cart.addToCart(book)">
                  КУПИТЬ
                </button>
              </div>
            </div>
          </div>
        </swiper-slide>

        <template #container-end>
          <div class="carousel-controls">
            <span class="carousel-control-prev" @click="desktopSwiperApi?.slidePrev()">
              <svg width="15" height="50" viewBox="0 0 15 50" fill="#000000" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.1444 49.999C12.7782 49.9831 12.4438 49.7602 12.2686 49.4258L0.119427 25.4777C-0.0398027 25.1752 -0.0398027 24.8248 0.119427 24.5223L12.2686 0.574224C12.4438 0.239843 12.7622 0.0328445 13.1444 0.000998618C13.5106 -0.0149243 13.8609 0.160228 14.0679 0.478687C14.2749 0.781222 14.2908 1.1793 14.1157 1.51368L2.22125 25L14.1316 48.4863C14.3068 48.8207 14.2749 49.2188 14.0838 49.5213C13.8609 49.8398 13.5106 50.0149 13.1444 49.999Z" fill="black"/>
              </svg>
            </span>
            <div class="swiper-pagination-custom"></div>
            <span class="carousel-control-next"  @click="desktopSwiperApi?.slideNext()">
              <svg width="15" height="50" viewBox="0 0 15 50" fill="#000000" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.10228 0.000995588C1.46851 0.0169181 1.80289 0.239841 1.97805 0.574222L14.1272 24.5223C14.2865 24.8248 14.2865 25.1752 14.1272 25.4777L1.97805 49.4258C1.8029 49.7602 1.48444 49.9672 1.10229 49.999C0.73606 50.0149 0.385756 49.8398 0.178758 49.5213C-0.0282405 49.2188 -0.0441639 48.8207 0.130988 48.4863L12.0254 25L0.115064 1.51368C-0.0600887 1.17929 -0.0282424 0.781219 0.162833 0.478683C0.385754 0.160225 0.736057 -0.0149269 1.10228 0.000995588Z" fill="black"/>
              </svg>
            </span>
          </div>
        </template>
      </swiper>

    </section>

    <section class="about">
      <div class="d-flex flex-row align-items-center text-center">
        <div>
          <picture>
            <source media="(max-width: 768px)" srcset="/kaboompics_A_young_woman_in_a_woolly_sweater_holds_books_1_mob.png" type="image/png">
            <img
            src="/kaboompics_A_young_woman_in_a_woolly_sweater_holds_books_1.png" alt="Женщина с книгой"
            >
          </picture>
        </div>
        <div class="text d-flex flex-column align-items-center justify-content-center">
          <h3>О НАС</h3>
          <p>Книжное наследие от мыслителей Древней Греции и до людей современности. Это не просто магазин, а настоящий клуб любителей книги, который объединяет в своем культурном пространстве людей самых разных интересов.
          </p>
        </div>
      </div>
      <div class="d-flex flex-row align-items-center text-center">
        <div class="text d-flex flex-column align-items-center justify-content-center">
          <h3>Гармония</h3>
          <p>Наш проект «Гармония» объединяет читателей и авторов в реальности и в интернете. Каждую неделю проводятся встречи онлайн и вживую. Из наших регулярных рубрик вы узнаете много нового о книгах и писателях.
          </p>
        </div>
        <div>
          <picture>
            <source media="(max-width: 768px)" srcset="/photo-1554537173-c4daede7794b_1_mob.png" type="image/png">
            <img
            src="/photo-1554537173-c4daede7794b_1.png" alt="Бюст"
            >
          </picture>
        </div>
      </div>
    </section>

    <section class="mailing text-center">
      <div>
        <h4 class="title mb-3 mb-lg-0">ХОТИТЕ ЗНАТЬ О КНИГАХ ВСЁ?</h4>
        <p class="text">Подпишитесь на нашу новостную рассылку</p>
        <form class="form-inline justify-content-center" @submit.prevent="submitForm">
          <div class="position-relative">
            <input
            v-model="email"
            type="text"
            class="form-inline__input"
            placeholder=""
            />
            <div v-if="error" class="error-message">
              {{ error }}
            </div>
            <div v-if="successMessage" class="success-message">
              {{ successMessage }}
            </div>
          </div>
          <button class="form-inline__btn ms-2" type="submit">ОТПРАВИТЬ</button>
        </form>
      </div>
    </section>

    <Footer />

  </div>
</template>

<script setup>
import { ref, computed} from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { useCartStore } from '../stores/cart'

import booksData from '../data/books'
import Banner from "../components/Banner.vue";
import Footer from "../components/Footer.vue";

const books = ref(booksData)
const cart = useCartStore()

let mobileSwiperApi = ref(null)
let desktopSwiperApi = ref(null)

const onMobileSwiper = (swiper) => {
  mobileSwiperApi.value = swiper
}

const onDesktopSwiper = (swiper) => {
  desktopSwiperApi.value = swiper
}

const mobileBooks = computed(() => books.value)

const desktopBooks = computed(() => {
  const res = []
  for (let i = 0; i < books.value.length; i += 3) {
    res.push(books.value.slice(i, i + 3))
  }
  return res
})

const email = ref('')
const error = ref('')
const successMessage = ref('')

function validateEmail(str) {
  return /\S+@\S+\.\S+/.test(str.trim())
}

function submitForm() {
  error.value = ''
  successMessage.value = ''

  const value = email.value.trim()
  if (!value) {
    error.value = 'Пожалуйста, введите email'
    return
  }

  if (!validateEmail(value)) {
    error.value = 'Некорректный email адрес'
    return
  }

  successMessage.value = 'Спасибо за подписку!'

  // Очистка формы через 5 секунд
  setTimeout(() => {
    email.value = ''
    successMessage.value = ''
  }, 5000)
}
</script>

<style>
@import '../assets/styles/style.css';
</style>