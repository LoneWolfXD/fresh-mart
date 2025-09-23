<script setup>
import { provide, ref, computed } from 'vue'
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import { useCart } from './stores/cart'
import { useAuth } from './stores/auth'
import SearchBar from './components/SearchBar.vue'
import { IconSun, IconMoon, IconShoppingCart, IconLogout, IconLogin, IconMenu2, IconX } from '@tabler/icons-vue'

provide('currency', '₹')
const theme = ref('dark')
provide('theme', theme)

const cart = useCart()
const auth = useAuth()
const router = useRouter()
const route = useRoute()
const mobileMenuOpen = ref(false)

const countBadge = computed(() => (cart.count > 99 ? '99+' : String(cart.count)))
function toggleTheme() { theme.value = theme.value === 'light' ? 'dark' : 'light' }
function goCart() { router.push('/cart') }
function doAuth() {
  if (auth.isLoggedIn) { auth.logout(); router.replace('/') }
  else router.push({ path: '/login', query: { redirect: route.fullPath } })
}
function toggleMobileMenu() { mobileMenuOpen.value = !mobileMenuOpen.value }
</script>

<template>
  <div :class="['app', theme]">
    <header class="topbar">
      <div class="topbar-container">
        <RouterLink to="/" class="brand">
          <div class="brand-icon">🛒</div>
          <span class="brand-text">FreshMart</span>
        </RouterLink>

        <SearchBar class="search-desktop" />

        <nav class="menu-desktop">
          <button class="cart-btn" @click="goCart" title="Cart">
            <IconShoppingCart size="20" />
            <span v-if="cart.count" class="cart-badge">{{ countBadge }}</span>
          </button>

          <button class="theme-btn" @click="toggleTheme" title="Toggle theme">
            <IconSun v-if="theme==='light'" size="18" />
            <IconMoon v-else size="18" />
          </button>

          <button class="auth-btn" @click="doAuth">
            <IconLogout v-if="auth.isLoggedIn" size="18" />
            <IconLogin v-else size="18" />
            <span class="auth-text">{{ auth.isLoggedIn ? 'Logout' : 'Login' }}</span>
          </button>
        </nav>

        <!-- Mobile menu button -->
        <button class="mobile-menu-btn" @click="toggleMobileMenu">
          <IconMenu2 v-if="!mobileMenuOpen" size="24" />
          <IconX v-else size="24" />
        </button>
      </div>

      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="mobile-menu">
        <SearchBar class="mobile-search" />
        <div class="mobile-actions">
          <button class="mobile-cart-btn" @click="goCart; toggleMobileMenu()">
            <IconShoppingCart size="20" />
            <span>Cart</span>
            <span v-if="cart.count" class="mobile-cart-badge">{{ countBadge }}</span>
          </button>
          <button class="mobile-theme-btn" @click="toggleTheme">
            <IconSun v-if="theme==='light'" size="18" />
            <IconMoon v-else size="18" />
            <span>{{ theme === 'light' ? 'Dark' : 'Light' }} Mode</span>
          </button>
          <button class="mobile-auth-btn" @click="doAuth; toggleMobileMenu()">
            <IconLogout v-if="auth.isLoggedIn" size="18" />
            <IconLogin v-else size="18" />
            <span>{{ auth.isLoggedIn ? 'Logout' : 'Login' }}</span>
          </button>
        </div>
      </div>
    </header>

    <main class="container">
      <RouterView />
    </main>
    <footer class="footer">
      <div class="footer-content">
        <p>&copy; 2025 FreshMart. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>
