<script setup>
const props = defineProps({ modelValue: Number, min: Number, max: Number })
const emit = defineEmits(['update:modelValue'])


function inc() {
const next = Math.min(props.max ?? 99, props.modelValue + 1)
emit('update:modelValue', next)
}
function dec() {
const next = Math.max(props.min ?? 1, props.modelValue - 1)
emit('update:modelValue', next)
}
</script>


<template>
<div class="qty">
<button class="btn" @click.prevent="dec">−</button>
<input class="qty-inp" type="number" :value="modelValue"
@input="emit('update:modelValue', Number($event.target.value))"
@keyup.enter.prevent
>
<button class="btn" @click.prevent="inc">+</button>
</div>
</template>