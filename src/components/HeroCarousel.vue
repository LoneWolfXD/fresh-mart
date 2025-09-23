<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const modules = [Autoplay, Pagination, Navigation]

const slides = [
  {
    id: 1,
    title: "Fresh Groceries Delivered",
    subtitle: "Get farm-fresh produce delivered to your doorstep",
    image: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
    cta: "Shop Now",
    gradient: "from-green-600 to-emerald-700"
  },
  {
    id: 2,
    title: "Organic & Natural",
    subtitle: "100% organic fruits and vegetables for healthy living",
    image: "https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
    cta: "Explore",
    gradient: "from-orange-500 to-red-600"
  },
  {
    id: 3,
    title: "Fast Delivery",
    subtitle: "Same-day delivery available in your area",
    image: "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
    cta: "Order Now",
    gradient: "from-blue-600 to-purple-700"
  }
]
</script>

<template>
  <div class="hero-carousel">
    <Swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="0"
      :autoplay="{
        delay: 4000,
        disableOnInteraction: false,
      }"
      :pagination="{
        clickable: true,
        dynamicBullets: true,
      }"
      :navigation="true"
      :loop="true"
      class="hero-swiper"
    >
      <SwiperSlide v-for="slide in slides" :key="slide.id" class="hero-slide">
        <div class="slide-content">
          <div class="slide-image">
            <img :src="slide.image" :alt="slide.title" class="slide-img" />
            <div :class="['slide-overlay', `bg-gradient-to-r ${slide.gradient}`]"></div>
          </div>
          
          <div class="slide-text">
            <h2 class="slide-title">{{ slide.title }}</h2>
            <p class="slide-subtitle">{{ slide.subtitle }}</p>
            <button class="slide-cta">{{ slide.cta }}</button>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>