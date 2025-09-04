import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useCart = defineStore('cart', () => {
  // load from localStorage (optional)
  const saved = JSON.parse(localStorage.getItem('cart_lines') || '[]')
  const lines = ref(saved)

  function add(item, qty = 1) {
    const found = lines.value.find(l => l.id === item.id)
    if (found) {
      found.qty += qty
    } else {
      // keep useful fields for UI rows (image, title, price, stock)
      const { id, title, price, image, stock } = item
      lines.value.push({ id, title, price, image, stock, qty })
    }
  }

  function update(id, qty) {
    const l = lines.value.find(x => x.id === id)
    if (!l) return
    if (qty <= 0) remove(id)
    else l.qty = qty
  }

  function remove(id) {
    lines.value = lines.value.filter(l => l.id !== id)
  }

  function clear() {
    lines.value = []
  }

  const count = computed(() => lines.value.reduce((n, l) => n + l.qty, 0))
  const total = computed(() => lines.value.reduce((s, l) => s + l.price * l.qty, 0))

  // persist (optional)
  watch(lines, v => localStorage.setItem('cart_lines', JSON.stringify(v)), { deep: true })

  return { lines, add, update, remove, clear, count, total }
})
