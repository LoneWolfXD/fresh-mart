<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'


const q = ref('')
const router = useRouter()


function go() {
router.replace({ path: '/', query: q.value ? { q: q.value } : {} })
}
</script>


<template>
<form class="search-form" @submit.prevent="go">
<div class="search-input-wrapper">
<input 
  v-focus 
  v-model="q" 
  placeholder="Search for products..." 
  class="search-input"
  @keyup.enter.exact.prevent="go" 
/>
<button type="submit" class="search-btn">
  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
  </svg>
</button>
</div>
</form>
</template>