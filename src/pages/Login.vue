<script setup>
import { ref, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../stores/auth'

const username = ref('')
const password = ref('')
const error = ref('')
const auth = useAuth()
const router = useRouter()
const route = useRoute()
const toast = inject('toast')

const PRESET_USER = 'freshmart'
const PRESET_PASS = 'fresh123'

function submit() {
  if (username.value === PRESET_USER && password.value === PRESET_PASS) {
    auth.login()
    toast.success('Login successful! Welcome back.')
    const redirect = route.query.redirect || '/'
    router.replace(String(redirect))
  } else {
    error.value = 'Invalid credentials'
    toast.error('Login failed. Please check your credentials.')
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-illustration">
      <div class="login-graphic">
        <div class="floating-icon">🛒</div>
        <div class="floating-icon delay-1">🥕</div>
        <div class="floating-icon delay-2">🍎</div>
        <div class="floating-icon delay-3">🥬</div>
      </div>
    </div>
    
    <div class="login-form-container">
      <div class="login-header">
        <h1 class="login-title">Welcome Back</h1>
        <p class="login-subtitle">Sign in to your FreshMart account</p>
      </div>
      
      <div class="demo-credentials">
        <p class="demo-text">Demo Credentials:</p>
        <div class="demo-info">
          <span class="demo-label">Username:</span> <code>freshmart</code>
        </div>
        <div class="demo-info">
          <span class="demo-label">Password:</span> <code>fresh123</code>
        </div>
      </div>
      
      <form @submit.prevent="submit" class="login-form">
        <div class="form-group">
          <label class="form-label">Username</label>
          <input 
            v-model="username" 
            placeholder="Enter your username" 
            class="form-input"
            required
          />
        </div>
        
        <div class="form-group">
          <label class="form-label">Password</label>
          <input 
            v-model="password" 
            type="password" 
            placeholder="Enter your password" 
            class="form-input"
            required
          />
        </div>
        
        <button type="submit" class="login-btn">
          Sign In
        </button>
        
        <p v-if="error" class="error-message">{{ error }}</p>
      </form>
    </div>
  </div>
</template>
