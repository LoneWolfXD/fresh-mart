<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  message: String,
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error', 'info'].includes(value)
  },
  duration: {
    type: Number,
    default: 3000
  }
})

const emit = defineEmits(['close'])
const visible = ref(props.show)

watch(() => props.show, (newVal) => {
  visible.value = newVal
  if (newVal && props.duration > 0) {
    setTimeout(() => {
      visible.value = false
      emit('close')
    }, props.duration)
  }
})

const getIcon = () => {
  switch (props.type) {
    case 'success':
      return '✓'
    case 'error':
      return '✕'
    case 'info':
      return 'ⓘ'
    default:
      return '✓'
  }
}
</script>

<template>
  <Transition name="toast">
    <div v-if="visible" :class="['toast', `toast-${type}`]">
      <div class="toast-icon">{{ getIcon() }}</div>
      <p class="toast-message">{{ message }}</p>
      <button class="toast-close" @click="visible = false; emit('close')">
        ✕
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.toast {
  position: fixed;
  top: 100px;
  right: 20px;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-radius: 16px;
  background: white;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05);
  min-width: 320px;
  max-width: 400px;
  backdrop-filter: blur(10px);
}

.toast-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  flex-shrink: 0;
}

.toast-success .toast-icon {
  background: linear-gradient(135deg, #14b8a6, #a3e635);
  color: white;
}

.toast-error .toast-icon {
  background: linear-gradient(135deg, #ef4444, #f97316);
  color: white;
}

.toast-info .toast-icon {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
}

.toast-message {
  flex: 1;
  margin: 0;
  color: #0f172a;
  font-weight: 500;
  font-size: 15px;
  line-height: 1.5;
}

.toast-close {
  width: 28px;
  height: 28px;
  border: none;
  background: rgba(15, 23, 42, 0.05);
  color: #64748b;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.toast-close:hover {
  background: rgba(15, 23, 42, 0.1);
  color: #0f172a;
}

.toast-enter-active {
  animation: toast-slide-in 0.3s ease;
}

.toast-leave-active {
  animation: toast-slide-out 0.3s ease;
}

@keyframes toast-slide-in {
  from {
    transform: translateX(120%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes toast-slide-out {
  from {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
  to {
    transform: translateX(120%) scale(0.95);
    opacity: 0;
  }
}

@media (max-width: 640px) {
  .toast {
    top: 80px;
    right: 10px;
    left: 10px;
    min-width: auto;
  }
}

:global(.app:not(.light)) .toast {
  background: rgba(30, 41, 59, 0.95);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1);
}

:global(.app:not(.light)) .toast-message {
  color: #e5e7eb;
}

:global(.app:not(.light)) .toast-close {
  background: rgba(255, 255, 255, 0.1);
  color: #9ca3af;
}

:global(.app:not(.light)) .toast-close:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #e5e7eb;
}
</style>
