import { useMemo } from 'react'
import { X } from 'lucide-react'

function CartDrawer({ open, items, onClose, onCheckout, onRemove }) {
  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
    const shipping = subtotal > 0 ? 5 : 0
    const total = subtotal + shipping
    return { subtotal, shipping, total }
  }, [items])

  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <aside className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-xl transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Your cart</h3>
          <button onClick={onClose} className="p-2 rounded hover:bg-black/5"><X className="h-5 w-5" /></button>
        </div>
        <div className="p-4 grid gap-4 max-h-[calc(100vh-220px)] overflow-auto">
          {items.length === 0 ? (
            <p className="text-sm text-gray-600">Your cart is empty.</p>
          ) : items.map(item => (
            <div key={item.id} className="flex items-center gap-3">
              <img src={item.image} alt={item.title} className="h-16 w-16 rounded-lg object-cover" />
              <div className="flex-1">
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-600">Qty {item.qty}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${(item.price * item.qty).toFixed(2)}</p>
                <button onClick={() => onRemove(item.id)} className="text-xs text-rose-600">Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t grid gap-2">
          <div className="flex justify-between text-sm"><span>Subtotal</span><span>${totals.subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between text-sm"><span>Shipping</span><span>${totals.shipping.toFixed(2)}</span></div>
          <div className="flex justify-between font-semibold text-base"><span>Total</span><span>${totals.total.toFixed(2)}</span></div>
          <button onClick={onCheckout} disabled={items.length===0}
            className="mt-2 rounded-full bg-black text-white px-4 py-3 text-sm font-semibold disabled:opacity-40">Checkout</button>
        </div>
      </aside>
    </div>
  )
}

export default CartDrawer
