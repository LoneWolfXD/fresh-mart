<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProducts } from '../composables/useProducts'
import { useCart } from '../stores/cart'
import QuantityInput from '../components/QuantityInput.vue'




const { products } = useProducts()
const route = useRoute()
const cart = useCart()




const product = computed(() => products.value.find(p => p.id === Number(route.params.id)))
const qty = ref(1)
</script>




<template>
<section v-if="product">
<div class="detail">
<img :src="product.image" class="detail-cover" />
<div>
<h2 class="h2">{{ product.title }}</h2>
<p class="muted">{{ product.desc }}</p>
<p><span v-currency> {{ product.price }} </span></p>
<QuantityInput v-model="qty" :max="product.stock" />
<button class="btn" @click="cart.add(product, qty)">Add to cart</button>
</div>
</div>
</section>
<p v-else>Product not found.</p>
</template>