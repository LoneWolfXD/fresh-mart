<script setup>
import { inject } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuth } from '../stores/auth'

const props = defineProps({ id:Number, title:String, price:Number, image:String, stock:Number })
const emit = defineEmits(['add'])
const currency = inject('currency', '₹')
const auth = useAuth()
const router = useRouter()
const toast = inject('toast')

function add() {
  if (!auth.isLoggedIn) {
    router.push({ path: '/login', query: { redirect: `/products/${props.id}` } })
    return
  }
  emit('add', { id: props.id, title: props.title, price: props.price, image: props.image })
  toast.success('Product added to cart!')
}
</script>

<template>
  <div class="card">
    <slot name="badge" />
    <img :src="image" :alt="title" class="cover" />
    <div class="pad">
      <h3 class="title">{{ title }}</h3>
      <p class="muted">In stock: {{ stock }}</p>
      <p class="price">{{ currency }}{{ price.toFixed(2) }}</p>
      <div class="row">
        <RouterLink class="btn outline" :to="`/products/${id}`">Details</RouterLink>
        <button class="btn" @click.stop="add">Add</button>
      </div>
    </div>
  </div>
</template>
