export default {
mounted(el, binding) {
const symbol = binding.value ?? '₹'
const n = Number(el.innerText)
if (!Number.isNaN(n)) el.innerText = symbol + n.toFixed(2)
},
updated(el, binding) {
const symbol = binding.value ?? '₹'
const n = Number(el.innerText)
if (!Number.isNaN(n)) el.innerText = symbol + n.toFixed(2)
}
}