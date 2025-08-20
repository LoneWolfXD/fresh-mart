<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProducts } from '../composables/useProducts'
import { useCart } from '../stores/cart'
import ProductCard from '../components/ProductCard.vue'


const { products, loading, error } = useProducts()
const route = useRoute()
const cart = useCart()


const q = computed(() => route.query.q || '')
const filtered = computed(() => {
return products.value.filter(p => p.title.toLowerCase().includes(q.value.toLowerCase()))
})
</script>


<template>
<section>
<h2 class="h2">Products</h2>
<p v-if="loading">Loading…</p>
<p v-else-if="error" class="error">{{ error }}</p>


<div class="grid">
<ProductCard v-for="p in filtered" :key="p.id" v-bind="p" @add="cart.add">
<template #badge>
<span class="badge" v-if="p.stock < 7">Fast‑moving</span>
</template>
</ProductCard>
</div>
</section>
</template>