"use client"

import { Card } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "1", value: 5.2 },
  { name: "2", value: 4.8 },
  { name: "3", value: 4.1 },
  { name: "4", value: 3.5 },
  { name: "5", value: 3.2 },
  { name: "6", value: 3.0 },
  { name: "7", value: 2.8 },
  { name: "8", value: 2.5 },
  { name: "9", value: 2.3 },
  { name: "10", value: 2.1 },
  { name: "11", value: 1.9 },
  { name: "12", value: 1.7 },
  { name: "13", value: 1.5 },
  { name: "14", value: 1.3 },
  { name: "15", value: 1.1 },
  { name: "16", value: 0.9 },
  { name: "17", value: 0.7 },
  { name: "18", value: 0.5 },
  { name: "19", value: 0.3 },
  { name: "20", value: 0.2 },
]

const validatorData = [
  { id: 1, name: "mod0", emission: 12.2885 },
  { id: 2, name: "RoundTable21", emission: 39.8243 },
  { id: 3, name: "Rizzo (Insured)", emission: 8.5871 },
  { id: 4, name: "5EWGTBMRnQpuoAM7LBD9mAuNyTfNaWMSmwrA5FTgn", emission: 3.9411 },
  { id: 5, name: "5H4Kc/NoaeFRuR1QVp/3ppvpFMKz7yNmSRFSqcFJNTZuT", emission: 1.9657 },
  { id: 6, name: "5GTACHJemroqBuDSUWKRDC72LkVuK7yvyKjRJKA5UdNbHG", emission: 28.7909 },
]

interface EmissionTabProps {
  subnetId?: string
}

export function EmissionTab({ subnetId = "30" }: EmissionTabProps) {
  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-semibold">Subnet Emission</h2>

      <Card className="p-4">
        <div className="mb-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary"></div>
            <span className="text-sm">are validators</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <span className="text-sm">are miners</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-amber-500"></div>
            <span className="text-sm">are immune miners</span>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" className="chart-grid" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border)",
                  borderRadius: "0.5rem",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="mt-6">
        <h3 className="mb-3 text-lg font-medium">Validators</h3>
        <div className="rounded-lg border border-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="p-3 text-left text-sm font-medium">Validator Name</th>
                <th className="p-3 text-right text-sm font-medium">Emission(ϻ)</th>
              </tr>
            </thead>
            <tbody>
              {validatorData.map((validator) => (
                <tr key={validator.id} className="border-b border-border last:border-0">
                  <td className="p-3 text-sm">{validator.name}</td>
                  <td className="p-3 text-right text-sm">{validator.emission.toFixed(4)} ϻ</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
