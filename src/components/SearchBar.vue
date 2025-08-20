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
<form class="search" @submit.prevent="go">
<input v-focus v-model="q" placeholder="Search" @keyup.enter.exact.prevent="go" />
<button class="btn">Search</button>
</form>
</template>