<script setup>
import { provide, ref, computed } from 'vue'
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import { useCart } from './stores/cart'
import { useAuth } from './stores/auth'
import SearchBar from './components/SearchBar.vue'
import { IconSun, IconMoon, IconShoppingCart, IconLogout, IconLogin } from '@tabler/icons-vue'

provide('currency', '₹')
const theme = ref('dark')
provide('theme', theme)

const cart = useCart()
const auth = useAuth()
const router = useRouter()
const route = useRoute()

const countBadge = computed(() => (cart.count > 99 ? '99+' : String(cart.count)))
function toggleTheme() { theme.value = theme.value === 'light' ? 'dark' : 'light' }
function goCart() { router.push('/cart') }
function doAuth() {
  if (auth.isLoggedIn) { auth.logout(); router.replace('/') }
  else router.push({ path: '/login', query: { redirect: route.fullPath } })
}
</script>

<template>
  <div :class="['app', theme]">
    <header class="topbar glass">
      <RouterLink to="/" class="brand">FreshMart</RouterLink>

      <SearchBar class="grow" />

      <nav class="menu">
        <button class="icon-btn badge-wrap" @click="goCart" title="Cart">
          <IconShoppingCart size="20" />
          <span v-if="cart.count" class="badge-count">{{ countBadge }}</span>
        </button>

        <button class="icon-btn" @click="toggleTheme" title="Toggle theme">
          <IconSun v-if="theme==='light'" size="18" />
          <IconMoon v-else size="18" />
        </button>

        <button class="btn" @click="doAuth">
          <IconLogout v-if="auth.isLoggedIn" size="18" />
          <IconLogin v-else size="18" />
          <span style="margin-left:.35rem">{{ auth.isLoggedIn ? 'Logout' : 'Login' }}</span>
        </button>
      </nav>
    </header>

    <main class="container">
      <RouterView />
    </main>
    <footer class="footer">© FreshMart</footer>
  </div>
</template>
