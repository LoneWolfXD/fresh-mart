import { onMounted, ref } from 'vue'

export function useProducts() {
  const products = ref([])
  const loading = ref(true)
  const error = ref()

  onMounted(async () => {
    try {
      // 1) Real groceries with real photos
      const r = await fetch('https://dummyjson.com/products/category/groceries?limit=24')
      if (!r.ok) throw new Error('DummyJSON not available')
      const j = await r.json()
      products.value = j.products.map(p => ({
        id: p.id,
        title: p.title,
        price: p.price,
        image: p.thumbnail || (p.images?.[0] ?? ''),
        desc: p.description,
        stock: p.stock ?? 10
      }))
    } catch {
      try {
        // 2) Fallback: FakeStore (has images, price, rating.count)
        const r2 = await fetch('https://fakestoreapi.com/products?limit=24')
        const arr = await r2.json()
        products.value = arr.map(p => ({
          id: p.id,
          title: p.title,
          price: p.price,
          image: p.image,
          desc: p.description,
          stock: p.rating?.count ?? 12
        }))
// oxlint-disable-next-line no-unused-vars
      } catch (e) {
        error.value = 'Failed to fetch products'
      }
    } finally {
      loading.value = false
    }
  })

  return { products, loading, error }
}
