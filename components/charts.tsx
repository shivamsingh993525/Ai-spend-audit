'use client'

import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer
} from 'recharts'

interface Props {
  spend: number
  savings: number
}

export default function Charts({
  spend,
  savings
}: Props) {

  const data = [

    {
      name: 'Current Spend',
      value: spend,
    },

    {
      name: 'Potential Savings',
      value: savings,
    },

  ]

  return (

    <div className="bg-black text-white rounded-3xl p-8 mt-8">

      <h3 className="text-3xl font-bold mb-6">
        Spend Analytics
      </h3>

      <div className="w-full h-[400px]">

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              outerRadius={140}
              label
            >

              <Cell fill="#2563eb" />
              <Cell fill="#16a34a" />

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  )
}