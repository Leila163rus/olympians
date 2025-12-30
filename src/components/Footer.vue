<template>
  <footer class="footer">
    <nav class="d-flex flex-row align-items-center justify-content-between">
      <router-link to="/">
        <picture>
          <source
          media="(max-width: 768px)"
          srcset="/Olympians_Books_mob.svg"
          type="image/svg+xml"
          >
          <img
          src="/Olympians_Books.svg"
          alt="Olympians Books"
          >
        </picture>
      </router-link>
      <a href="">+30922040281</a>
      <router-link to="/">Главная</router-link>
      <router-link to="/catalog">Каталог</router-link>
      <router-link to="/basket">Корзина</router-link>
    </nav>
  </footer>
</template>
<style>
.footer {
  background-color: #1596C1;
  color: white;
}

.footer nav {
  padding: 15px 70px;
}

.footer a {
  text-decoration: none;
  color: white;
  font-size: 1.5rem;
}

.footer a:active,
.footer a:hover {
  text-decoration: none;
  color: white;
}

@media (max-width: 768px) {
  .footer nav {
    padding: 30px 34px;
  }

  .footer a {
    font-size: 1.125rem;
  }
}
</style>