'use client'
import { useState, useEffect } from 'react'
import Charts from '@/components/charts'


interface ToolEntry {
  tool: string
  plan: string
  spend: string
  seats: string
}

export default function AuditPage() {

  // =========================
  // TOOL DATA
  // =========================

  const [tools, setTools] = useState<ToolEntry[]>([
    {
      tool: '',
      plan: '',
      spend: '',
      seats: '',
    }
  ])

  const [useCase, setUseCase] = useState('')

  // =========================
  // RESULT STATES
  // =========================

  const [totalSpend, setTotalSpend] = useState(0)
  const [totalSavings, setTotalSavings] = useState(0)

  const [recommendations, setRecommendations] = useState<string[]>([])
  const [summary, setSummary] = useState('')

  // =========================
  // LEAD CAPTURE STATES
  // =========================

  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [teamSize, setTeamSize] = useState('')

  const [leadSubmitted, setLeadSubmitted] = useState(false)

  // =========================
  // LOAD FROM LOCAL STORAGE
  // =========================

  useEffect(() => {

    const savedTools = localStorage.getItem('tools')
    const savedUseCase = localStorage.getItem('useCase')

    if (savedTools) {
      setTools(JSON.parse(savedTools))
    }

    if (savedUseCase) {
      setUseCase(savedUseCase)
    }

  }, [])

  // =========================
  // ADD TOOL
  // =========================

  const addTool = () => {

    const updatedTools = [
      ...tools,
      {
        tool: '',
        plan: '',
        spend: '',
        seats: '',
      }
    ]

    setTools(updatedTools)

    localStorage.setItem(
      'tools',
      JSON.stringify(updatedTools)
    )
  }

  // =========================
  // UPDATE TOOL
  // =========================

  const updateTool = (
    index: number,
    field: keyof ToolEntry,
    value: string
  ) => {

    const updatedTools = [...tools]

    updatedTools[index][field] = value

    setTools(updatedTools)

    localStorage.setItem(
      'tools',
      JSON.stringify(updatedTools)
    )
  }

  // =========================
  // RUN AUDIT
  // =========================

  const handleAudit = () => {

    let spend = 0
    let savings = 0

    const adviceList: string[] = []

    tools.forEach((item) => {

      const monthlySpend = Number(item.spend)

      spend += monthlySpend

      let toolSavings = 0
      let advice = ''

      // =====================
      // SMART LOGIC
      // =====================

      if (
        item.plan === 'team' &&
        Number(item.seats) <= 2
      ) {

        toolSavings = monthlySpend * 0.5

        advice =
          `${item.tool}: Team plan is expensive for a very small team. Consider downgrading to Pro.`

      }

      else if (
        item.plan === 'enterprise' &&
        Number(item.seats) < 5
      ) {

        toolSavings = monthlySpend * 0.4

        advice =
          `${item.tool}: Enterprise plan may be unnecessary for your current scale.`

      }

      else if (item.tool === 'cursor') {

        toolSavings = monthlySpend * 0.2

        advice =
          'Cursor Pro is usually enough for most development teams.'

      }

      else {

        toolSavings = monthlySpend * 0.05

        advice =
          `${item.tool}: Your stack is mostly optimized with small savings opportunities.`

      }

      savings += toolSavings

      adviceList.push(advice)

    })

    setTotalSpend(spend)
    setTotalSavings(savings)

    setRecommendations(adviceList)

    // =====================
    // AI SUMMARY
    // =====================
    

    if (savings < 100) {

      setSummary(
        `Your current AI stack appears reasonably optimized. While a few minor savings opportunities exist, your spending is already efficient for your current team size and usage patterns.`
      )

    } else {

      setSummary(
        `Your company is currently spending approximately $${spend} per month on AI tools. Our audit identified potential savings of around $${savings} monthly (${savings * 12} annually). Several plans appear overprovisioned for your current usage level. Optimizing your subscriptions could significantly reduce costs while maintaining productivity.`
      )

    }
  }

{/* CHARTS */}

<Charts
  spend={totalSpend}
  savings={totalSavings}
/>
  // =========================
  // LEAD SUBMIT
  // =========================

  const handleLeadSubmit = async () => {

  try {

    const response = await fetch('/api/lead', {

      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({

        email,
        company,
        role,
        team_size: teamSize,

        total_spend: totalSpend,
        total_savings: totalSavings,

      }),

    })

    const data = await response.json()

    if (data.success) {

  // EMAIL API CALL

  await fetch('/api/email', {

    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      email
    }),

  })

  setLeadSubmitted(true)

  alert('Audit saved and email sent successfully!')

} else {

      alert('Database save failed')

      console.log(data.error)

    }

  } catch (error) {

    console.log(error)

    alert('Something went wrong')

  }

}

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-6 py-20">

      <div className="max-w-6xl mx-auto">

        {/* ========================= */}
        {/* HERO */}
        {/* ========================= */}

        <div className="text-center mb-14">

          <div className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm mb-6">
            AI Cost Optimization Platform
          </div>

          <h1 className="text-6xl font-bold mb-4">
            AI Spend Audit 🚀
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Analyze your complete AI stack and uncover hidden savings opportunities.
          </p>

        </div>

        {/* ========================= */}
        {/* TOOL CARDS */}
        {/* ========================= */}

        <div className="space-y-8">

          {tools.map((item, index) => (

            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-3xl p-8"
            >

              <h2 className="text-3xl font-bold mb-6">
                Tool #{index + 1}
              </h2>

              <div className="grid md:grid-cols-2 gap-6">

                {/* TOOL */}

                <div>

                  <label className="block mb-2 text-lg">
                    Tool
                  </label>

                  <select
                    value={item.tool}
                    onChange={(e) =>
                      updateTool(
                        index,
                        'tool',
                        e.target.value
                      )
                    }
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-black"
                  >

                    <option value="">
                      Choose Tool
                    </option>

                    <option value="chatgpt">
                      ChatGPT
                    </option>

                    <option value="claude">
                      Claude
                    </option>

                    <option value="cursor">
                      Cursor
                    </option>

                    <option value="copilot">
                      GitHub Copilot
                    </option>

                    <option value="gemini">
                      Gemini
                    </option>

                    <option value="openai-api">
                      OpenAI API
                    </option>

                    <option value="anthropic-api">
                      Anthropic API
                    </option>

                  </select>

                </div>

                {/* PLAN */}

                <div>

                  <label className="block mb-2 text-lg">
                    Plan
                  </label>

                  <select
                    value={item.plan}
                    onChange={(e) =>
                      updateTool(
                        index,
                        'plan',
                        e.target.value
                      )
                    }
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-black"
                  >

                    <option value="">
                      Choose Plan
                    </option>

                    <option value="free">
                      Free
                    </option>

                    <option value="pro">
                      Pro
                    </option>

                    <option value="team">
                      Team
                    </option>

                    <option value="business">
                      Business
                    </option>

                    <option value="enterprise">
                      Enterprise
                    </option>

                  </select>

                </div>

                {/* SPEND */}

                <div>

                  <label className="block mb-2 text-lg">
                    Monthly Spend ($)
                  </label>

                  <input
                    type="number"
                    placeholder="100"
                    value={item.spend}
                    onChange={(e) =>
                      updateTool(
                        index,
                        'spend',
                        e.target.value
                      )
                    }
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20"
                  />

                </div>

                {/* SEATS */}

                <div>

                  <label className="block mb-2 text-lg">
                    Number of Seats
                  </label>

                  <input
                    type="number"
                    placeholder="5"
                    value={item.seats}
                    onChange={(e) =>
                      updateTool(
                        index,
                        'seats',
                        e.target.value
                      )
                    }
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20"
                  />

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* ========================= */}
        {/* USE CASE */}
        {/* ========================= */}

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mt-8">

          <label className="block mb-3 text-xl">
            Primary Use Case
          </label>

          <select
            value={useCase}
            onChange={(e) => {
              setUseCase(e.target.value)

              localStorage.setItem(
                'useCase',
                e.target.value
              )
            }}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-black"
          >

            <option value="">
              Choose Use Case
            </option>

            <option value="coding">
              Coding
            </option>

            <option value="writing">
              Writing
            </option>

            <option value="research">
              Research
            </option>

            <option value="data">
              Data Analysis
            </option>

            <option value="mixed">
              Mixed
            </option>

          </select>

        </div>

        {/* ========================= */}
        {/* BUTTONS */}
        {/* ========================= */}

        <div className="flex flex-col md:flex-row gap-4 mt-8">

          <button
            onClick={addTool}
            className="flex-1 bg-white/10 border border-white/20 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition"
          >
            + Add Another Tool
          </button>

          <button
            onClick={handleAudit}
            className="flex-1 bg-white text-black py-4 rounded-2xl font-bold text-lg hover:scale-105 transition"
          >
            Run Full Audit
          </button>

        </div>

        {/* ========================= */}
        {/* RESULTS */}
        {/* ========================= */}

        {totalSpend > 0 && (

          <div className="mt-12 bg-white text-black rounded-3xl p-10">

            <h2 className="text-5xl font-bold mb-8">
              Audit Results
            </h2>

            {/* RESULT STATS */}

            <div className="grid md:grid-cols-3 gap-6 mb-10">

              <div className="bg-black text-white p-6 rounded-2xl">

                <h3 className="text-lg mb-2">
                  Total Monthly Spend
                </h3>

                <p className="text-4xl font-bold">
                  ${totalSpend}
                </p>

              </div>

              <div className="bg-green-600 text-white p-6 rounded-2xl">

                <h3 className="text-lg mb-2">
                  Monthly Savings
                </h3>

                <p className="text-4xl font-bold">
                  ${Math.round(totalSavings)}
                </p>

              </div>

              <div className="bg-blue-600 text-white p-6 rounded-2xl">

                <h3 className="text-lg mb-2">
                  Annual Savings
                </h3>

                <p className="text-4xl font-bold">
                  ${Math.round(totalSavings * 12)}
                </p>

              </div>

            </div>

            {/* HIGH SAVINGS CTA */}

            {totalSavings > 500 && (

              <div className="bg-yellow-400 text-black rounded-3xl p-8 mb-8">

                <h3 className="text-3xl font-bold mb-3">
                  Huge Savings Opportunity 🚀
                </h3>

                <p className="text-lg">
                  You could save over $
                  {Math.round(totalSavings * 12)}
                  /year.
                  Book a free Credex consultation to optimize your AI infrastructure.
                </p>

              </div>

            )}

            {/* HONEST LOW SAVINGS */}

            {totalSavings < 100 && (

              <div className="bg-green-100 text-black rounded-3xl p-8 mb-8">

                <h3 className="text-3xl font-bold mb-3">
                  Your Stack Looks Healthy ✅
                </h3>

                <p className="text-lg">
                  Your current AI subscriptions are already fairly optimized.
                </p>

              </div>

            )}

            {/* RECOMMENDATIONS */}

            <div className="bg-black text-white rounded-3xl p-8 mb-8">

              <h3 className="text-3xl font-bold mb-6">
                Recommendations
              </h3>

              <div className="space-y-4">

                {recommendations.map((item, index) => (

                  <div
                    key={index}
                    className="border border-white/10 rounded-2xl p-5"
                  >
                    {item}
                  </div>

                ))}

              </div>

            </div>

            {/* AI SUMMARY */}

            <div className="bg-blue-600 text-white rounded-3xl p-8 mb-8">

              <h3 className="text-3xl font-bold mb-4">
                AI Summary
              </h3>

              <p className="text-lg leading-relaxed text-blue-100">
                {summary}
              </p>

            </div>

            {/* LEAD CAPTURE */}

            {!leadSubmitted && (

              <div className="bg-gray-100 rounded-3xl p-8">

                <h3 className="text-3xl font-bold mb-6 text-black">
                  Save Your Audit Report
                </h3>

                <div className="grid md:grid-cols-2 gap-5">

                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className="p-4 rounded-xl border"
                  />

                  <input
                    type="text"
                    placeholder="Company Name"
                    value={company}
                    onChange={(e) =>
                      setCompany(e.target.value)
                    }
                    className="p-4 rounded-xl border"
                  />

                  <input
                    type="text"
                    placeholder="Role"
                    value={role}
                    onChange={(e) =>
                      setRole(e.target.value)
                    }
                    className="p-4 rounded-xl border"
                  />

                  <input
                    type="number"
                    placeholder="Team Size"
                    value={teamSize}
                    onChange={(e) =>
                      setTeamSize(e.target.value)
                    }
                    className="p-4 rounded-xl border"
                  />

                </div>

                <button
                  onClick={handleLeadSubmit}
                  className="w-full mt-6 bg-black text-white py-4 rounded-2xl font-bold text-lg"
                >
                  Save Audit Report
                </button>

              </div>

            )}

            {/* SUCCESS MESSAGE */}

            {leadSubmitted && (

              <div className="bg-green-600 text-white rounded-3xl p-8">

                <h3 className="text-3xl font-bold mb-3">
                  Audit Saved Successfully ✅
                </h3>

                <p className="text-lg">
                  Your audit report has been captured successfully.
                  Our team may reach out with additional optimization opportunities.
                </p>

              </div>

            )}

          </div>

        )}

      </div>

    </main>
  )
}