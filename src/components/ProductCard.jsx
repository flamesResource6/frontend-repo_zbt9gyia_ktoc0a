import { motion } from 'framer-motion'

function ProductCard({ product, onAdd }) {
  return (
    <motion.div
      initial={{ y: 24, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      className="group relative rounded-2xl border border-black/5 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img src={product.image || `https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop`} alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
          <span className="rounded-full bg-gray-900/5 px-3 py-1 text-sm font-semibold">${product.price.toFixed(2)}</span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-gray-600">{product.description || 'Premium NFC-enabled product crafted for performance and durability.'}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className={`text-xs font-medium ${product.in_stock ? 'text-emerald-600' : 'text-rose-600'}`}>{product.in_stock ? 'In stock' : 'Out of stock'}</span>
          <button onClick={() => onAdd(product)} disabled={!product.in_stock}
            className="rounded-full bg-black text-white px-4 py-2 text-sm font-semibold disabled:opacity-40">
            Add to cart
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard
