<script setup>
import { useCart } from '../stores/cart'
import { useRouter } from 'vue-router'
const cart = useCart()
const router = useRouter()
</script>

<template>
  <section>
    <div class="cart-header">
      <h2 class="cart-title">Shopping Cart</h2>
      <p class="cart-count">{{ cart.count }} {{ cart.count === 1 ? 'item' : 'items' }}</p>
    </div>

    <div v-if="cart.lines.length === 0" class="empty-cart">
      <div class="empty-cart-icon">🛒</div>
      <h3 class="empty-cart-title">Your cart is empty</h3>
      <p class="empty-cart-text">Looks like you haven't added any items to your cart yet.</p>
      <button class="empty-cart-btn" @click="router.push('/')">
        Start Shopping
      </button>
    </div>

    <div v-else class="cart-layout">
      <div class="cart-items">
        <div v-for="l in cart.lines" :key="l.id" class="cart-item-card">
          <div class="item-image">
            <img :src="l.image" :alt="l.title" class="item-img" />
          </div>
          
          <div class="item-details">
            <h3 class="item-title">{{ l.title }}</h3>
            <p class="item-price">₹{{ l.price.toFixed(2) }} each</p>
            
            <div class="item-controls">
              <div class="quantity-controls">
                <button 
                  class="qty-btn qty-decrease" 
                  @click="cart.update(l.id, l.qty - 1)" 
                  :disabled="l.qty <= 1"
                >
                  −
                </button>
                <span class="qty-display">{{ l.qty }}</span>
                <button 
                  class="qty-btn qty-increase" 
                  @click="cart.update(l.id, l.qty + 1)"
                >
                  +
                </button>
              </div>
              
              <button class="remove-btn" @click="cart.remove(l.id)">
                Remove
              </button>
            </div>
          </div>
          
          <div class="item-total">
            <p class="total-price">₹{{ (l.price * l.qty).toFixed(2) }}</p>
          </div>
        </div>
      </div>

      <div class="cart-summary">
        <div class="summary-card">
          <h3 class="summary-title">Order Summary</h3>
          
          <div class="summary-row">
            <span>Subtotal ({{ cart.count }} items)</span>
            <span>₹{{ cart.total.toFixed(2) }}</span>
          </div>
          
          <div class="summary-row">
            <span>Delivery Fee</span>
            <span class="free-delivery">Free</span>
          </div>
          
          <hr class="summary-divider" />
          
          <div class="summary-total">
            <span>Total</span>
            <span class="total-amount">₹{{ cart.total.toFixed(2) }}</span>
          </div>
          
          <div class="summary-actions">
            <button class="clear-cart-btn" @click="cart.clear()">
              Clear Cart
            </button>
            <button class="checkout-btn" @click="router.push('/checkout')">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>
