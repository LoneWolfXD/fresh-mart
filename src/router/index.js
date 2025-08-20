import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import ProductDetail from '../pages/ProductDetail.vue'
import Cart from '../pages/Cart.vue'
import Checkout from '../pages/Checkout.vue'
import Login from '../pages/Login.vue'
import NotFound from '../pages/NotFound.vue'
import { useAuth } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },                           // allow viewing products
    { path: '/login', component: Login },                     // public
    { path: '/products/:id', component: ProductDetail, props: true, meta: { requiresAuth: true } },
    { path: '/cart', component: Cart, meta: { requiresAuth: true } },
    { path: '/checkout', component: Checkout, meta: { requiresAuth: true } },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
  ]
})

// require login before protected pages or cart actions
router.beforeEach((to) => {
  const auth = useAuth()
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }
})

export default router
