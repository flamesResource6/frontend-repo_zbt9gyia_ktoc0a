import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative h-[88vh] w-full overflow-hidden" id="home">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode" />
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-gray-800 shadow-sm ring-1 ring-black/5 backdrop-blur">
              Modern NFC + QR Solutions
            </span>
            <h1 className="mt-4 text-4xl sm:text-6xl font-black tracking-tight text-gray-900">
              Make your brand tappable.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-700 leading-relaxed">
              Premium NFC tags and smart QR products that connect people to your content with a tap or scan. Beautiful design, enterprise-grade performance.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#shop" className="inline-flex items-center justify-center rounded-full bg-black text-white px-5 py-3 text-sm font-semibold shadow-lg shadow-black/10 hover:shadow-black/20 transition-all">
                Shop products
              </a>
              <a href="#how" className="inline-flex items-center justify-center rounded-full bg-white text-gray-900 px-5 py-3 text-sm font-semibold shadow ring-1 ring-black/10 hover:ring-black/20">
                How it works
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}

export default Hero
