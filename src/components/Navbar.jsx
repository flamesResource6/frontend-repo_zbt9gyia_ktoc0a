import { ShoppingCart, Menu } from "lucide-react"

function Navbar({ cartCount, onCartClick }) {
  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-black/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded bg-gradient-to-br from-rose-500 to-amber-500 shadow-inner" />
          <span className="text-xl font-black tracking-tight">TagHub</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-700">
          <a href="#shop" className="hover:text-gray-900 transition-colors">Shop</a>
          <a href="#about" className="hover:text-gray-900 transition-colors">About</a>
          <a href="#support" className="hover:text-gray-900 transition-colors">Support</a>
        </nav>
        <div className="flex items-center gap-2">
          <button aria-label="Open menu" className="md:hidden p-2 rounded-lg hover:bg-black/5">
            <Menu className="h-5 w-5" />
          </button>
          <button onClick={onCartClick} className="relative inline-flex items-center gap-2 rounded-full bg-black text-white px-4 py-2 text-sm font-semibold shadow-lg shadow-black/10 hover:shadow-black/20 transition-all">
            <ShoppingCart className="h-4 w-4" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-white/10 px-1 text-xs font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
