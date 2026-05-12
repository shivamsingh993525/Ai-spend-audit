export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">

        <div className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm mb-6">
          AI Cost Optimization Platform
        </div>

        <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
          Stop Overpaying <br />
          for AI Tools
        </h1>

        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
          Audit your ChatGPT, Claude, Cursor, and Copilot spending instantly.
          Discover hidden savings opportunities in minutes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="bg-white text-black px-8 py-4 rounded-2xl font-semibold text-lg hover:scale-105 transition">
            Start Free Audit
          </button>

          <button className="border border-white/20 px-8 py-4 rounded-2xl text-lg hover:bg-white/10 transition">
            View Demo
          </button>
        </div>

      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 pb-24">

        <div className="grid md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="text-4xl mb-4">💰</div>

            <h3 className="text-2xl font-bold mb-3">
              Cost Savings
            </h3>

            <p className="text-gray-300">
              Identify unnecessary AI subscriptions and reduce monthly spending.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="text-4xl mb-4">⚡</div>

            <h3 className="text-2xl font-bold mb-3">
              Instant Audit
            </h3>

            <p className="text-gray-300">
              Get AI-powered optimization recommendations within seconds.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="text-4xl mb-4">📊</div>

            <h3 className="text-2xl font-bold mb-3">
              Smart Insights
            </h3>

            <p className="text-gray-300">
              Compare plans, alternatives, and annual savings opportunities.
            </p>
          </div>

        </div>

      </section>

    </main>
  )
}