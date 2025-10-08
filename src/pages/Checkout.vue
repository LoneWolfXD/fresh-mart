<script setup>
import { ref, inject } from 'vue'
import { useCart } from '../stores/cart'
import { useRouter } from 'vue-router'

const cart = useCart()
const router = useRouter()
const toast = inject('toast')

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  paymentMethod: 'cod'
})

function place() {
  toast.success('Order placed successfully! Thank you for shopping with us.')
  cart.clear()
  setTimeout(() => {
    router.replace('/')
  }, 1500)
}
</script>

<template>
  <section class="checkout-section">
    <div class="checkout-container">
      <!-- Page Header -->
      <div class="checkout-header">
        <h1 class="checkout-title">Checkout</h1>
        <p class="checkout-subtitle">Complete your order</p>
      </div>

      <!-- Main Checkout Layout -->
      <div class="checkout-layout">
        <!-- Left Column - Forms -->
        <div class="checkout-forms">
          <!-- Delivery Information -->
          <div class="form-section">
            <h2 class="form-section-title">
              <span class="section-number">1</span>
              Delivery Information
            </h2>
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">First Name</label>
                <input 
                  v-model="formData.firstName"
                  type="text" 
                  class="form-input" 
                  placeholder="Enter first name"
                  required
                />
              </div>
              <div class="form-group">
                <label class="form-label">Last Name</label>
                <input 
                  v-model="formData.lastName"
                  type="text" 
                  class="form-input" 
                  placeholder="Enter last name"
                  required
                />
              </div>
              <div class="form-group">
                <label class="form-label">Email</label>
                <input 
                  v-model="formData.email"
                  type="email" 
                  class="form-input" 
                  placeholder="Enter email address"
                  required
                />
              </div>
              <div class="form-group">
                <label class="form-label">Phone Number</label>
                <input 
                  v-model="formData.phone"
                  type="tel" 
                  class="form-input" 
                  placeholder="Enter phone number"
                  required
                />
              </div>
              <div class="form-group form-group-full">
                <label class="form-label">Address</label>
                <textarea 
                  v-model="formData.address"
                  class="form-textarea" 
                  placeholder="Enter complete address"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">City</label>
                <input 
                  v-model="formData.city"
                  type="text" 
                  class="form-input" 
                  placeholder="Enter city"
                  required
                />
              </div>
              <div class="form-group">
                <label class="form-label">State</label>
                <input 
                  v-model="formData.state"
                  type="text" 
                  class="form-input" 
                  placeholder="Enter state"
                  required
                />
              </div>
              <div class="form-group">
                <label class="form-label">PIN Code</label>
                <input 
                  v-model="formData.pincode"
                  type="text" 
                  class="form-input" 
                  placeholder="Enter PIN code"
                  required
                />
              </div>
            </div>
          </div>

          <!-- Payment Method -->
          <div class="form-section">
            <h2 class="form-section-title">
              <span class="section-number">2</span>
              Payment Method
            </h2>
            <div class="payment-options">
              <label class="payment-option">
                <input 
                  v-model="formData.paymentMethod"
                  type="radio" 
                  value="cod" 
                  class="payment-radio"
                />
                <div class="payment-content">
                  <div class="payment-icon">💵</div>
                  <div class="payment-details">
                    <span class="payment-title">Cash on Delivery</span>
                    <span class="payment-subtitle">Pay when you receive</span>
                  </div>
                </div>
              </label>
              
              <label class="payment-option">
                <input 
                  v-model="formData.paymentMethod"
                  type="radio" 
                  value="online" 
                  class="payment-radio"
                />
                <div class="payment-content">
                  <div class="payment-icon">💳</div>
                  <div class="payment-details">
                    <span class="payment-title">Online Payment</span>
                    <span class="payment-subtitle">UPI, Cards, Net Banking</span>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Right Column - Order Summary -->
        <div class="order-summary-container">
          <div class="order-summary">
            <h2 class="summary-title">Order Summary</h2>
            
            <!-- Order Items -->
            <div class="order-items">
              <div v-for="item in cart.lines" :key="item.id" class="order-item">
                <img :src="item.image" :alt="item.title" class="order-item-image" />
                <div class="order-item-details">
                  <h3 class="order-item-title">{{ item.title }}</h3>
                  <p class="order-item-qty">Qty: {{ item.qty }}</p>
                </div>
                <div class="order-item-price">
                  ₹{{ (item.price * item.qty).toFixed(2) }}
                </div>
              </div>
            </div>

            <!-- Price Breakdown -->
            <div class="price-breakdown">
              <div class="price-row">
                <span>Subtotal ({{ cart.count }} items)</span>
                <span>₹{{ cart.total.toFixed(2) }}</span>
              </div>
              <div class="price-row">
                <span>Delivery Fee</span>
                <span class="free-text">Free</span>
              </div>
              <div class="price-row">
                <span>Taxes & Fees</span>
                <span>₹0.00</span>
              </div>
              <hr class="price-divider" />
              <div class="price-row total-row">
                <span>Total Amount</span>
                <span class="total-amount">₹{{ cart.total.toFixed(2) }}</span>
              </div>
            </div>

            <!-- Place Order Button (Desktop) -->
            <button 
              class="place-order-btn desktop-btn" 
              :disabled="cart.lines.length === 0" 
              @click.prevent="place"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>

      <!-- Sticky Bottom CTA (Mobile) -->
      <div class="mobile-checkout-cta">
        <div class="mobile-total">
          <span class="mobile-total-label">Total</span>
          <span class="mobile-total-amount">₹{{ cart.total.toFixed(2) }}</span>
        </div>
        <button 
          class="place-order-btn mobile-btn" 
          :disabled="cart.lines.length === 0" 
          @click.prevent="place"
        >
          Place Order
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.checkout-section {
  min-height: 100vh;
  padding: 2rem 0;
}

:global(.app:not(.light)) .checkout-section {
  background: linear-gradient(135deg, #0b1220 0%, #0f172a 40%, #182a4a 100%);
}

.checkout-container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32 lg:pb-8;
}

.checkout-header {
  @apply text-center mb-8;
}

.checkout-title {
  @apply text-3xl font-bold text-gray-900 mb-2;
}

:global(.app:not(.light)) .checkout-title {
  @apply text-white;
}

.checkout-subtitle {
  @apply text-gray-600;
}

:global(.app:not(.light)) .checkout-subtitle {
  @apply text-gray-400;
}

.checkout-layout {
  @apply grid grid-cols-1 lg:grid-cols-3 gap-8;
}

.checkout-forms {
  @apply lg:col-span-2 space-y-6;
}

.form-section {
  background: white;
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.form-section:hover {
  border-color: rgba(20, 184, 166, 0.3);
  box-shadow: 0 15px 50px rgba(20, 184, 166, 0.15);
}

:global(.app:not(.light)) .form-section {
  background: rgba(30, 41, 59, 0.8);
  border-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

:global(.app:not(.light)) .form-section:hover {
  border-color: rgba(20, 184, 166, 0.5);
}

.form-section-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 1.5rem;
}

:global(.app:not(.light)) .form-section-title {
  color: #e5e7eb;
}

.section-number {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #14b8a6, #a3e635);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 800;
  box-shadow: 0 4px 12px rgba(20, 184, 166, 0.3);
}

.form-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-4;
}

.form-group {
  @apply space-y-2;
}

.form-group-full {
  @apply md:col-span-2;
}

.form-label {
  @apply block text-sm font-medium text-gray-700;
}

:global(.app:not(.light)) .form-label {
  @apply text-gray-300;
}

.form-input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  background: white;
  color: #0f172a;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #14b8a6;
  box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.1), 0 4px 12px rgba(20, 184, 166, 0.2);
  transform: translateY(-2px);
}

.form-input::placeholder {
  color: #9ca3af;
}

:global(.app:not(.light)) .form-input {
  background: rgba(15, 23, 42, 0.5);
  border-color: rgba(255, 255, 255, 0.15);
  color: #e5e7eb;
}

:global(.app:not(.light)) .form-input:focus {
  border-color: #a3e635;
  box-shadow: 0 0 0 4px rgba(163, 230, 53, 0.1), 0 4px 12px rgba(163, 230, 53, 0.2);
}

:global(.app:not(.light)) .form-input::placeholder {
  color: #64748b;
}

.form-textarea {
  @apply w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors resize-none bg-white text-gray-900;
}

:global(.app:not(.light)) .form-textarea {
  @apply bg-gray-700 border-gray-600 text-white placeholder-gray-400;
}

.payment-options {
  @apply space-y-3;
}

.payment-option {
  @apply block cursor-pointer;
}

.payment-radio {
  @apply sr-only;
}

.payment-content {
  @apply flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg transition-all;
}

:global(.app:not(.light)) .payment-content {
  @apply border-gray-600;
}

.payment-option:has(.payment-radio:checked) .payment-content {
  border-color: #14b8a6;
  background: linear-gradient(135deg, rgba(20, 184, 166, 0.08), rgba(163, 230, 53, 0.08));
  box-shadow: 0 4px 12px rgba(20, 184, 166, 0.2);
}

:global(.app:not(.light)) .payment-option:has(.payment-radio:checked) .payment-content {
  background: linear-gradient(135deg, rgba(20, 184, 166, 0.15), rgba(163, 230, 53, 0.15));
  border-color: #a3e635;
}

.payment-icon {
  @apply text-2xl;
}

.payment-details {
  @apply flex flex-col;
}

.payment-title {
  @apply font-semibold text-gray-900;
}

:global(.app:not(.light)) .payment-title {
  @apply text-white;
}

.payment-subtitle {
  @apply text-sm text-gray-600;
}

:global(.app:not(.light)) .payment-subtitle {
  @apply text-gray-400;
}

.order-summary-container {
  @apply lg:col-span-1;
}

.order-summary {
  @apply bg-white rounded-2xl p-6 shadow-sm border border-gray-200 sticky top-24;
}

:global(.app:not(.light)) .order-summary {
  @apply bg-gray-800 border-gray-700;
}

.summary-title {
  @apply text-xl font-bold text-gray-900 mb-6;
}

:global(.app:not(.light)) .summary-title {
  @apply text-white;
}

.order-items {
  @apply space-y-4 mb-6;
}

.order-item {
  @apply flex items-center gap-3;
}

.order-item-image {
  @apply w-12 h-12 rounded-lg object-cover bg-gray-100;
}

.order-item-details {
  @apply flex-1;
}

.order-item-title {
  @apply font-medium text-gray-900 text-sm line-clamp-1;
}

:global(.app:not(.light)) .order-item-title {
  @apply text-white;
}

.order-item-qty {
  @apply text-xs text-gray-600;
}

:global(.app:not(.light)) .order-item-qty {
  @apply text-gray-400;
}

.order-item-price {
  @apply font-semibold text-gray-900;
}

:global(.app:not(.light)) .order-item-price {
  @apply text-white;
}

.price-breakdown {
  @apply space-y-3;
}

.price-row {
  @apply flex justify-between items-center text-gray-700;
}

:global(.app:not(.light)) .price-row {
  @apply text-gray-300;
}

.free-text {
  @apply text-green-600 font-medium;
}

.price-divider {
  @apply border-gray-200 my-4;
}

:global(.app:not(.light)) .price-divider {
  @apply border-gray-600;
}

.total-row {
  @apply text-lg font-bold text-gray-900;
}

:global(.app:not(.light)) .total-row {
  @apply text-white;
}

.total-amount {
  @apply text-red-600;
}

.place-order-btn {
  width: 100%;
  padding: 1.25rem;
  background: linear-gradient(135deg, #14b8a6, #a3e635);
  color: white;
  font-weight: 800;
  font-size: 1.125rem;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(20, 184, 166, 0.3);
}

.place-order-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(20, 184, 166, 0.4);
}

.place-order-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.desktop-btn {
  @apply mt-6;
}

.mobile-checkout-cta {
  @apply fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex items-center justify-between lg:hidden z-50;
}

:global(.app:not(.light)) .mobile-checkout-cta {
  @apply bg-gray-800 border-gray-700;
}

.mobile-total {
  @apply flex flex-col;
}

.mobile-total-label {
  @apply text-sm text-gray-600;
}

:global(.app:not(.light)) .mobile-total-label {
  @apply text-gray-400;
}

.mobile-total-amount {
  @apply text-lg font-bold text-red-600;
}

.mobile-btn {
  @apply flex-1 ml-4 py-3;
}
</style>
