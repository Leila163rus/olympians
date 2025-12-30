<template>
  <section class="banner position-relative w-100 overflow-hidden" v-if="!isCollapsed" :class="{ 'banner--hidden': isCollapsed }">
    <div class="banner__top d-flex justify-content-between align-items-center text-white">
      <div class="banner__logo">
        <router-link to="/">
          <picture>
            <source media="(max-width: 768px)" srcset="/Olympians_Books_mob_banner.svg" type="image/svg+xml">
            <img
            src="/Olympians_Books.svg"
            alt="Olympians Books"
            >
          </picture>
        </router-link>
      </div>
      <div class="banner__arrow" @click="toggleContent">
        <picture>
          <source media="(max-width: 768px)" srcset="/arrow_mob.svg" type="image/svg+xml">
          <img src="/arrow.svg" alt="Стрелка">
        </picture>
      </div>
      <div class="banner__basket">
        <router-link to="/basket">
          <picture>
            <source media="(max-width: 768px)" srcset="/basket_mob.svg" type="image/svg+xml">
            <img src="/basket.svg" alt="Корзина">
          </picture>
        </router-link>
        <span
        v-if="cart.totalCount"
        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        >
          {{ cart.totalCount }}
        </span>
      </div>
    </div>
    <div class="banner__main-content">
      <div class="banner__image-wrapper">
        <picture>
          <source
          media="(max-width: 768px)"
          :srcset="imageSrcMobile"
          >
          <img
          :src="imageSrc"
          :alt="imageAlt"
          class="banner__image"
          loading="eager"
          decoding="async"
          >
        </picture>
      </div>
      <div class="banner__content top-0 start-0 w-100 h-100 text-white">
        <div>
          <h1 class="title mb-5" v-html="title"></h1>
          <button class="btn">УЗНАТЬ БОЛЬШЕ</button>
        </div>
      </div>
    </div>
  </section>
  <section v-else class="banner-mini" :class="{ 'banner-mini--visible': isCollapsed }">
    <div class="banner-mini__top d-flex justify-content-between align-items-center text-white">
      <div class="banner-mini__logo">
        <picture>
          <source srcset="/Olympians_Books_mob_banner.svg" type="image/svg+xml">
          <img
          src="/Olympians_Books.svg"
          alt="Olympians Books"
          >
        </picture>
      </div>
      <div class="banner-mini__arrow" @click="toggleContent">
        <picture>
          <source media="(max-width: 768px)" srcset="/arrow_mob.svg" type="image/svg+xml">
          <img src="/arrow.svg" alt="Стрелка">
        </picture>
      </div>
      <div class="banner-mini__basket">
        <picture>
          <source media="(max-width: 768px)" srcset="/basket_mob.svg" type="image/svg+xml">
          <img src="/basket.svg" alt="Корзина">
        </picture>
        <span
        v-if="cart.totalCount"
        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        >
        {{ cart.totalCount }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from './../stores/cart'
const cart = useCartStore()

const isCollapsed = ref(false)

const toggleContent = () => {
  isCollapsed.value = !isCollapsed.value
}

const props = defineProps({
  imageSrc: { type: String, default: '/pexels-saph-photography-2929887_1.png' },
  imageSrcMobile: { type: String, default: '/pexels-saph-photography-2929887_1_mobile.png' },
  imageAlt: { type: String, default: 'Баннер' },
  title: { type: String, default: 'КНИГИ, КОТОРЫЕ<br> ВОЗНЕСУТ ВАС НА ОЛИМП' }
})
</script>

<style>
.banner {
  overflow: visible;
  transition: opacity 0.5s ease, transform 0.5s ease;
  opacity: 1;
}

.banner--hidden {
  opacity: 0;
  transform: translateY(-50px);
  pointer-events: none;
}

.banner__top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;
  padding: 18px 70px;
}

.banner__image-wrapper {
  display: block;
  width: 100%;
  height: 940px;
  z-index: 1;
}

.banner__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  background-repeat: no-repeat;
}

.banner__content {
  position: absolute;
  inset: 0;
  z-index: 2;
  padding: 120px 70px;
}

.banner__content .title {
  padding-top: 70px;
  line-height: 120px;
  letter-spacing: 7px;
  font-size: 5rem;
  padding-right: 40%;
}

.banner__content .btn {
  color: white;
  padding: 6px 50px;
  border: 3px solid white;
  font-size: 2.625rem;
}

.banner__content .btn:hover,
.banner__content .btn:active {
  color: white;
}

.banner-mini {
  height: 100px;
  background-color: #1596C1;
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.banner-mini--visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: all;
}

.banner-mini__top {
  padding: 18px 70px;
}

.banner-mini__arrow svg,
.banner-mini__basket svg {
  cursor: pointer;
}

.banner__arrow {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  pointer-events: auto;
}

.banner-mini__arrow {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  pointer-events: auto;
}

@media (max-width: 768px) {
  .banner__top {
    padding: 5px 34px;
  }

  .banner__content .btn {
    font-size: 1.5rem;
    padding: 4px 10px;
  }

  .banner__content {
    padding: 70px 30px;
  }

  .banner__content .title {
    font-size: 4rem;
    line-height: 96px;
    padding-right: 10%;
    padding-top: 20px;
  }

  .banner-mini {
    height: 50px;
  }

  .banner-mini__top {
    padding: 15px 34px;
    height: 50px;
  }

  .banner__image-wrapper {
    height: 820px;
  }
}
</style>