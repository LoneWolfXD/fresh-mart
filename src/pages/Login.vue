<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../stores/auth'

const username = ref('')
const password = ref('')
const error = ref('')
const auth = useAuth()
const router = useRouter()
const route = useRoute()

// preset creds
const PRESET_USER = 'demo@freshmart.com'
const PRESET_PASS = 'fresh123'

function submit() {
  if (username.value === PRESET_USER && password.value === PRESET_PASS) {
    auth.login()
    // go back where user attempted to go
    const redirect = route.query.redirect || '/'
    router.replace(String(redirect))
  } else {
    error.value = 'Invalid credentials'
  }
}
</script>

<template>
  <div class="card pad" style="max-width:420px;margin:3rem auto;">
    <h2 class="h2">Login</h2>
    <p class="muted">Use <b>demo@freshmart.com</b> / <b>fresh123</b></p>
    <form @submit.prevent="submit" class="col gap">
      <input v-model="username" placeholder="Email" class="text-inp" />
      <input v-model="password" type="password" placeholder="Password" class="text-inp" />
      <button class="btn">Sign in</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>
