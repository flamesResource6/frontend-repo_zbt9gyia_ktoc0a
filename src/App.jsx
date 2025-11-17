import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import CartDrawer from './components/CartDrawer'
import Footer from './components/Footer'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [items, setItems] = useState([])

  const addToCart = (p) => {
    setItems((prev) => {
      const existsIdx = prev.findIndex(x => (x.id || x._id) === (p.id || p._id))
      if (existsIdx > -1) {
        const copy = [...prev]
        copy[existsIdx] = { ...copy[existsIdx], qty: copy[existsIdx].qty + 1 }
        return copy
      }
      return [...prev, { id: p.id || p._id, title: p.title, price: p.price, qty: 1 }]
    })
  }

  const removeFromCart = (idx) => {
    setItems((prev) => prev.filter((_, i) => i !== idx))
  }

  const checkout = async () => {
    const payload = {
      items: items.map(it => ({ product_id: it.id, title: it.title, price: it.price, quantity: it.qty })),
      subtotal: items.reduce((s,it) => s + it.price * it.qty, 0),
      shipping: items.reduce((s,it) => s + it.price * it.qty, 0) > 50 ? 0 : 4.9,
      total: 0,
      customer_name: 'Guest',
      customer_email: 'guest@example.com',
      customer_address: 'N/A'
    }
    payload.total = payload.subtotal + payload.shipping
    try {
      const res = await fetch(`${API}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (res.ok) {
        alert('Order placed! ' + (data.id || ''))
        setItems([])
        setCartOpen(false)
      } else {
        alert('Checkout failed: ' + (data.detail || 'Unknown error'))
      }
    } catch (e) {
      alert('Checkout failed: ' + e.message)
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white to-rose-50/50 text-gray-900">
      <Navbar onCartClick={() => setCartOpen(true)} cartCount={items.length} />
      <main>
        <Hero />
        <Products onAdd={addToCart} />

        <section id="about" className="py-20">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">
            <div className="rounded-2xl bg-white/70 border p-6">
              <h3 className="text-2xl font-bold">What is TagHub?</h3>
              <p className="mt-2 text-gray-700">A modern platform for NFC-enabled products: cards, tags, and accessories that connect physical and digital experiences.</p>
              <ul className="mt-4 list-disc pl-5 text-gray-700 space-y-1">
                <li>Premium materials and finishes</li>
                <li>Fast tap experience, no apps required</li>
                <li>Custom branding and bulk orders</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-rose-50 to-white border p-6">
              <h3 className="text-2xl font-bold">Why choose us</h3>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-xl bg-white p-4 border">EU-based fulfillment</div>
                <div className="rounded-xl bg-white p-4 border">Sustainable materials</div>
                <div className="rounded-xl bg-white p-4 border">Fast shipping</div>
                <div className="rounded-xl bg-white p-4 border">24/7 support</div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-16 bg-white/70 border-t">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold">Let’s build your NFC experience</h3>
              <p className="mt-2 text-gray-700">Reach out for custom branding, bulk orders, or partnership inquiries.</p>
            </div>
            <form onSubmit={(e)=>e.preventDefault()} className="bg-white rounded-xl border p-4 grid grid-cols-1 gap-3">
              <input placeholder="Name" className="border rounded-md px-3 py-2" />
              <input placeholder="Email" type="email" className="border rounded-md px-3 py-2" />
              <textarea placeholder="Message" rows="4" className="border rounded-md px-3 py-2" />
              <button className="rounded-md bg-gray-900 text-white px-4 py-2 w-fit">Send</button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={()=>setCartOpen(false)} items={items} onRemove={removeFromCart} onCheckout={checkout} />
    </div>
  )
}

export default App
