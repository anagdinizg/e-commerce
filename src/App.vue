<template>
  <v-app>
    <TopBar />
    <MainHeader />

    <v-main class="main-content">
      <RouterView />
    </v-main>

    <MainFooter />
    <CartDrawer />
  </v-app>
</template>

<script>
import TopBar from './components/TopBar.vue'
import MainHeader from './components/MainHeader.vue'
import MainFooter from './components/MainFooter.vue'
import CartDrawer from './components/CartDrawer.vue'
import { RouterView } from 'vue-router'

export default {
  name: 'App',
  components: {
    TopBar,
    MainHeader,
    MainFooter,
    CartDrawer,
    RouterView,
  },
}
</script>

<style>
.v-application {
  font-family: 'Inter', sans-serif !important;
}

.main-content {
  background: #ffffff;
  min-height: calc(100vh - 80px);
}
</style>
