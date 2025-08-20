<script setup>
import { useCart } from '../stores/cart'
import { useRouter } from 'vue-router'
const cart = useCart()
const router = useRouter()
</script>

<template>
  <section>
    <h2 class="h2">Your Cart</h2>
    <div class="card pad" v-if="cart.lines.length === 0">
      <p>Your cart is empty.</p>
      <button class="btn" @click="router.push('/')">Browse products</button>
    </div>

    <div v-else class="card pad">
      <ul class="col gap">
        <li v-for="l in cart.lines" :key="l.id" class="row spread mid">
          <div>{{ l.title }} × {{ l.qty }}</div>
          <div><strong v-currency> {{ l.price * l.qty }} </strong></div>
          <button class="link" @click.prevent="cart.remove(l.id)">remove</button>
        </li>
      </ul>
      <hr style="border-color:#e5e7eb22;margin:1rem 0;">
      <p class="row spread mid">
        <span>Total</span>
        <strong class="h2" v-currency> {{ cart.total }} </strong>
      </p>
      <div class="row gap">
        <button class="btn outline" @click="cart.clear()">Clear</button>
        <button class="btn" @click="router.push('/checkout')">Proceed to Checkout</button>
      </div>
    </div>
  </section>
</template>
