<template>
  <div>
    <Banner
    :image-src="'/pexels-saph-photography-2929887_1_(1).png'"
    :image-src-mobile="'/pexels-saph-photography-2929887_2_mobile.png'"
    image-alt="Собрание древних изданий"
    title="СОБРАНИЕ<br> ДРЕВНИХ ИЗДАНИЙ"
    />

    <div class="basket">
      <h2 class="basket__title text-center mb-5 mb-lg-5">КОРЗИНА</h2>

      <div v-if="cart.items.length === 0" class="text-center py-5">
        <div class="mb-3">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-muted">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        </div>
        <p class="fs-5 text-center mb-5">Ваша корзина пуста</p>
        <router-link to="/catalog" class="card-btn">
          Перейти в каталог
        </router-link>
      </div>

      <template v-else>
        <div class="row basket__head justify-content-between justify-content-lg-center align-items-center mb-0 mb-lg-3 d-none d-md-flex">
          <div class="col-7 col-xl-4 text-center">Название товара</div>
          <div class="col-2 text-center d-none d-xl-block">Цена за шт.</div>
          <div class="col-3 text-center d-none d-xl-block">Количество</div>
          <div class="col-2 text-center text-nowrap">Общая цена</div>
          <div class="col-2 col-xl-1"></div>
        </div>

        <div class="basket__good mb-3 mb-xl-4" v-for="item in cart.items" :key="item.id">
          <div class="row align-items-center">
            <div class="col-7 col-xl-4 d-flex flex-column flex-sm-row align-items-center align-items-md-start">
              <img :src="item.img" alt="Товар" width="90px" height="135px" class="me-3"/>
              <div class="d-flex flex-column">
                {{ item.title }}
                <div class="text-center d-flex d-xl-none mt-3 mt-md-5">
                  <button
                  @click="cart.decrease(item.id)"
                  class="text-center mx-1 mx-xl-2"
                  :disabled="item.qty <= 1"
                  >
                    <svg width="32" height="5" viewBox="0 0 32 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M29.6184 0H2.38165C1.06979 0 0 1.06979 0 2.38165C0 3.69351 1.06979 4.7633 2.38165 4.7633H29.6184C30.938 4.7633 32 3.69351 32 2.38165C32 1.06979 30.9302 0 29.6184 0Z" fill="black"/>
                    </svg>
                  </button>
                  {{ item.qty }} шт.
                  <button
                  @click="cart.increase(item.id)"
                  class="mx-1 mx-xl-2"
                  >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.38248 18.0633H13.9367V29.6175C13.9367 30.9333 15.0034 32 16.3192 32C17.635 32 18.7017 30.9333 18.7017 29.6175V18.0633H29.6175C30.9333 18.0633 32 16.9966 32 15.6808C32 14.365 30.9333 13.2983 29.6175 13.2983H18.7017V2.38248C18.7017 1.06667 17.635 0 16.3192 0C15.0034 0 13.9367 1.06667 13.9367 2.38248V13.2983H2.38248C1.06667 13.2983 0 14.365 0 15.6808C0 16.9966 1.06667 18.0633 2.38248 18.0633Z" fill="black"/>
                    </svg>
                  </button>
                </div>
                <div class="d-flex d-sm-none justify-content-center">
                  {{ (item.price * item.qty).toFixed(0) }} р.
                </div>
              </div>
            </div>
            <div class="col-4 col-lg-2 text-center d-none d-xl-block">{{ item.price }} р.</div>
            <div class="col-3 text-center d-none d-xl-block">
              <button
              @click="cart.decrease(item.id)"
              class="text-center mx-1 mx-xl-2"
              :disabled="item.qty <= 1"
              >
                <svg width="32" height="5" viewBox="0 0 32 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M29.6184 0H2.38165C1.06979 0 0 1.06979 0 2.38165C0 3.69351 1.06979 4.7633 2.38165 4.7633H29.6184C30.938 4.7633 32 3.69351 32 2.38165C32 1.06979 30.9302 0 29.6184 0Z" fill="black"/>
                </svg>
              </button>
              {{ item.qty }} шт.
              <button
              @click="cart.increase(item.id)"
              class="mx-1 mx-xl-2"
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.38248 18.0633H13.9367V29.6175C13.9367 30.9333 15.0034 32 16.3192 32C17.635 32 18.7017 30.9333 18.7017 29.6175V18.0633H29.6175C30.9333 18.0633 32 16.9966 32 15.6808C32 14.365 30.9333 13.2983 29.6175 13.2983H18.7017V2.38248C18.7017 1.06667 17.635 0 16.3192 0C15.0034 0 13.9367 1.06667 13.9367 2.38248V13.2983H2.38248C1.06667 13.2983 0 14.365 0 15.6808C0 16.9966 1.06667 18.0633 2.38248 18.0633Z" fill="black"/>
                </svg>
              </button>
            </div>
            <div class="col-2 d-none d-sm-flex text-center">
              {{ (item.price * item.qty).toFixed(0) }} р.
            </div>
            <div class="col-3 col-lg-1 reset">
              <span
              class=""
              @click="cart.removeFromCart(item.id)"
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.928354 31.0853C2.16616 32.2997 4.17467 32.2997 5.41248 31.0853L16.288 20.4043L26.5719 31.0853C27.8098 32.2997 29.8183 32.2997 31.0561 31.0853C32.2939 29.8708 32.2939 27.8934 31.0561 26.679L20.7877 15.9981L31.0716 5.31711C32.3094 4.10266 32.3094 2.12529 31.0716 0.910838C29.8338 -0.303613 27.8253 -0.303613 26.5875 0.910838L16.2958 11.5918L5.42026 0.910838C4.18246 -0.303613 2.17394 -0.303613 0.936139 0.910838C-0.301666 2.12529 -0.301666 4.10266 0.936139 5.31711L11.8117 15.9903L0.928354 26.679C-0.309451 27.8934 -0.309451 29.863 0.928354 31.0853Z" fill="black"/>
                </svg>
              </span>
            </div>
          </div>
        </div>

        <div class="total-price d-flex justify-content-between align-items-center">
          <div class="">ИТОГО К ОПЛАТЕ</div>
          <div class="">{{ cart.totalPrice }} р.</div>
        </div>

        <div class="order text-center mt-0 mt-mb-4">
          <button class="order-btn" @click="openModal">
            ОФОРМИТЬ ЗАКАЗ
          </button>
        </div>

        <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
          <div class="modal-dialog">
            <div class="modal-content">
                <button type="button" class="btn-close-custom" @click="closeModal">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.928354 31.0853C2.16616 32.2997 4.17467 32.2997 5.41248 31.0853L16.288 20.4043L26.5719 31.0853C27.8098 32.2997 29.8183 32.2997 31.0561 31.0853C32.2939 29.8708 32.2939 27.8934 31.0561 26.679L20.7877 15.9981L31.0716 5.31711C32.3094 4.10266 32.3094 2.12529 31.0716 0.910838C29.8338 -0.303613 27.8253 -0.303613 26.5875 0.910838L16.2958 11.5918L5.42026 0.910838C4.18246 -0.303613 2.17394 -0.303613 0.936139 0.910838C-0.301666 2.12529 -0.301666 4.10266 0.936139 5.31711L11.8117 15.9903L0.928354 26.679C-0.309451 27.8934 -0.309451 29.863 0.928354 31.0853Z" fill="black"/>
                  </svg>
                </button>
              <div class="modal-body text-center">
                Благодарим за покупку!<br> Ваши ценные манускрипты прибудут в ближайшее время. Возвращайтесь ещё!
              </div>
            </div>
          </div>
        </div>

      </template>
    </div>
  </div>

  <Footer />
</template>

<script setup>
import { ref } from 'vue'
import Banner from "../components/Banner.vue";
import Footer from "../components/Footer.vue";
import { useCartStore } from './../stores/cart'

const cart = useCartStore()

const showModal = ref(false)
const orderNumber = ref('')

const generateOrderNumber = () => {
  return 'ORD-' + Date.now().toString().slice(-6) + '-' + Math.floor(Math.random() * 9000 + 1000)
}

const openModal = () => {
  orderNumber.value = generateOrderNumber()
  showModal.value = true
  document.body.classList.add('modal-open')
}

const closeModal = () => {
  showModal.value = false
  document.body.classList.remove('modal-open')
  cart.clear()
}
</script>

<style>
@import '../assets/styles/basket.css';
</style>
