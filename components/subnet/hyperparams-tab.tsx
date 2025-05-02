"use client"

import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"

interface HyperparamsTabProps {
  subnetId?: string
}

const hyperparamsData = [
  { name: "ID", value: "30" },
  { name: "Activity Cutoff", value: "5,000" },
  { name: "Adjustment Alpha", value: "1" },
  { name: "Adjustment Interval", value: "360" },
  { name: "Bonds Moving Average", value: "900,000" },
  { name: "Difficulty", value: "0" },
  { name: "Immunity Period", value: "21,000" },
  { name: "Kappa", value: "42,598" },
  { name: "Max Burn", value: "100,000,000,000" },
  { name: "Max Difficulty", value: "1" },
  { name: "Max Registrations Per Block", value: "1" },
  { name: "Max Validators", value: "64" },
  { name: "Min Allowed Weights", value: "1" },
  { name: "Max Weights Limit", value: "65,535" },
  { name: "Min Burn", value: "500,000" },
  { name: "Min Difficulty", value: "0.00000000000054210109" },
  { name: "Registration Allowed", value: true },
  { name: "Rho", value: "10" },
  { name: "Serving Rate Limit", value: "50" },
  { name: "Target Registrations Per Interval", value: "1" },
  { name: "Tempo", value: "360" },
  { name: "Weights Rate Limit", value: "180" },
  { name: "Weights Version", value: "2.038" },
  { name: "Commit Reveal Weights Enabled", value: true },
  { name: "Commit Reveal Epochs", value: "15" },
]

export function HyperparamsTab({ subnetId = "30" }: HyperparamsTabProps) {
  return (
    <div className="p-4">
      <h2 className="mb-2 text-xl font-semibold">Subnet Hyperparameters</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        In addition to miners and validator code, each subnet has a set of parameters (often referred to as hyper
        parameters) that define how it will interact with the Bittensor network.
      </p>

      <Card className="overflow-hidden border border-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="p-3 text-left text-sm font-medium">Name</th>
              <th className="p-3 text-right text-sm font-medium">Value</th>
            </tr>
          </thead>
          <tbody>
            {hyperparamsData.map((param, index) => (
              <tr key={index} className="border-b border-border last:border-0">
                <td className="p-3 text-sm">{param.name}</td>
                <td className="p-3 text-right text-sm">
                  {typeof param.value === "boolean" ? <Check className="ml-auto h-5 w-5 text-primary" /> : param.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
