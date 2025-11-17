import { useEffect, useState, useMemo } from 'react'
import ProductCard from './ProductCard'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Shop({ onAdd }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const res = await fetch(`${API_BASE}/products`)
        const data = await res.json()
        setProducts(data)
      } catch (e) {
        setProducts([
          {
            id: 'demo-1',
            title: 'NFC Business Card',
            description: 'Tap-to-share smart card in matte black.',
            price: 24.0,
            category: 'cards',
            image: 'https://images.unsplash.com/photo-1688149013444-da644d290749?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxORkMlMjBCdXNpbmVzcyUyMENhcmR8ZW58MHwwfHx8MTc2MzM5MzUxNnww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
            in_stock: true
          },
          {
            id: 'demo-2',
            title: 'QR Smart Sticker Pack',
            description: 'Weatherproof stickers with unique codes.',
            price: 12.0,
            category: 'stickers',
            image: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1600&auto=format&fit=crop',
            in_stock: true
          },
          {
            id: 'demo-3',
            title: 'Metal NFC Tag',
            description: 'Industrial-grade tag for tough environments.',
            price: 39.0,
            category: 'tags',
            image: 'https://images.unsplash.com/photo-1558096671-bd0fb46a41e0?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxNZXRhbCUyME5GQyUyMFRhZ3xlbnwwfDB8fHwxNzYzMzkzNTE2fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
            in_stock: false
          }
        ])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchesQuery = `${p.title} ${p.description}`.toLowerCase().includes(query.toLowerCase())
      const matchesCat = category === 'all' || p.category === category
      return matchesQuery && matchesCat
    })
  }, [products, query, category])

  return (
    <section id="shop" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Shop products</h2>
            <p className="mt-2 text-gray-600">High-quality NFC and QR products designed for brand experiences.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products..."
              className="h-10 w-56 rounded-full bg-white px-4 text-sm shadow ring-1 ring-black/10 focus:outline-none focus:ring-black/20" />
            <select value={category} onChange={e => setCategory(e.target.value)}
              className="h-10 rounded-full bg-white px-4 text-sm shadow ring-1 ring-black/10 focus:outline-none">
              <option value="all">All</option>
              <option value="cards">Cards</option>
              <option value="stickers">Stickers</option>
              <option value="tags">Tags</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-80 rounded-2xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => (
              <ProductCard key={p.id || p._id} product={p} onAdd={onAdd} />)
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default Shop
