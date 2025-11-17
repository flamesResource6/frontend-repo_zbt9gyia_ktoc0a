import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Products({ onAdd }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API}/products`)
        const data = await res.json()
        setProducts(data)
      } catch (e) {
        // fallback demo items
        setProducts([
          { id: '1', title: 'NFC Card – Matte Black', description: 'Premium NFC business card with seamless tap.', price: 24.9 },
          { id: '2', title: 'NFC Tag – Adhesive', description: 'Ultra-thin NFC tag ideal for packaging and spaces.', price: 4.9 },
          { id: '3', title: 'Key Tag – Aluminum', description: 'Durable NFC key tag with anodized finish.', price: 12.0 }
        ])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section id="products" className="py-16 bg-gradient-to-b from-white to-rose-50/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Shop</h2>
            <p className="mt-2 text-gray-600">Curated NFC products for modern brands</p>
          </div>
        </div>

        {loading ? (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({length:6}).map((_,i)=> (
              <div key={i} className="h-80 rounded-2xl bg-white/70 border border-gray-200 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(p => (
              <ProductCard key={p.id || p._id} product={p} onAdd={onAdd} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
