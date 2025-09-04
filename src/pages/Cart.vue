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
        <ul class="cart-list">
            <li v-for="l in cart.lines" :key="l.id" class="cart-item">
              <img :src="l.image" alt="" class="cart-thumb" />

              <div class="cart-info">
                <p class="cart-title">{{ l.title }}</p>
                <div class="cart-qty">
                  <button class="qty-btn" @click="cart.update(l.id, l.qty - 1)" :disabled="l.qty <= 1">−</button>
                  <span class="qty-num">{{ l.qty }}</span>
                  <button class="qty-btn" @click="cart.update(l.id, l.qty + 1)">+</button>
                </div>
              </div>

              <div class="cart-price">
                <strong v-currency>{{ l.price * l.qty }}</strong>
                <button class="link remove" @click.prevent="cart.remove(l.id)">remove</button>
              </div>
            </li>
      </ul>

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
