<script setup>
import { useCart } from '../stores/cart'
import { useRouter } from 'vue-router'
const cart = useCart()
const router = useRouter()

function place() {
  cart.clear()
  router.replace('/')
  alert('Order placed!') 
}
</script>

<template>
  <section>
    <h2 class="h2">Checkout</h2>
    <div class="card pad">
      <p>Review total and place your order.</p>
      <p class="total">Payable: <strong v-currency> {{ cart.total }} </strong></p>
      <button class="btn" :disabled="cart.lines.length===0" @click.prevent="place">Place order</button>
    </div>
  </section>
</template>
