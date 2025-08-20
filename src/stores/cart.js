import { defineStore } from 'pinia'
import { computed, ref } from 'vue'


export const useCart = defineStore('cart', () => {
const lines = ref([])


function add(item, qty = 1) {
const found = lines.value.find(l => l.id === item.id)
if (found) found.qty += qty
else lines.value.push({ ...item, qty })
}
function remove(id) {
lines.value = lines.value.filter(l => l.id !== id)
}
function clear() { lines.value = [] }


const count = computed(() => lines.value.reduce((n, l) => n + l.qty, 0))
const total = computed(() => lines.value.reduce((s, l) => s + l.price * l.qty, 0))


return { lines, add, remove, clear, count, total }
})