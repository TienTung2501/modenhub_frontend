"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LayoutGrid, BarChart2 } from "lucide-react"
import { MinerIncentiveDistributionChart } from "./MinerIncentiveDistributionChart"
import { MinerColdkeyDistributionChart } from "./MinerColdkeyDistributionChart"
import { MinerIPDistributionChart } from "./MinerIPDistributionChart"
import { Card } from "../ui/card"

interface DistributionTabProps {
  subnetId?: string
}

export function DistributionTab({ subnetId = "30" }: DistributionTabProps) {
  const [coldkeyView, setColdkeyView] = useState<"treemap">("treemap")
  const [ipView, setIpView] = useState<"treemap">("treemap")

  const minerIncentiveData = [
    { incentive: 0.3, isImmunityPeriod: false },
    { incentive: 0.35, isImmunityPeriod: true },
    { incentive: 0.32, isImmunityPeriod: false },
    { incentive: 0.38, isImmunityPeriod: true },
    { incentive: 0.4, isImmunityPeriod: false },
    { incentive: 0.42, isImmunityPeriod: true },
    { incentive: 0.5, isImmunityPeriod: false },
  ]

  const coldkeyData = [
    { coldKey: "5DWMmhuyqZwgDHdHwFJVGYnFMrWNDwAWYn", minersCount: 85 },
    { coldKey: "5FyPwRGUoAFKAEJLdoSGAMnSCJCUGCQGAyJCJCGGJCUGJ", minersCount: 42 },
    { coldKey: "5GpuGhJwHwYnYnGYDYDwSwHwYnYnGYnGwpw", minersCount: 38 },
    { coldKey: "5GNdMDwLPwLYnpYnWnGwYnGwMnGAKdwKgwdww", minersCount: 33 },
    { coldKey: "5GNdMDwLYnGYnGwYnGwMnGAKdwKgwdwwYnGw", minersCount: 28 },
    { coldKey: "5HJwmDwGwYnGwMnGAKdwKgwdwwYnGwYnGwMn", minersCount: 25 },
    { coldKey: "5KHuwHrFhwgmRJDb3A6KhjFUwjjFJq6Ebh", minersCount: 22 },
    { coldKey: "5Qfsfw6hHmjZPAzVbfvmDjVkm8jN4jyVhs5jhb6mZZF5Z", minersCount: 18 },
    { coldKey: "5HgkVZw7MNdWRsXrRdPjDb9FzG5f3gDxh7rGM23HWkpz", minersCount: 15 },
    { coldKey: "5S4kh2rBd2eqskfjsyF7tQqwd3Fn2Kje7M6nNSjmHFw8", minersCount: 15 },
    { coldKey: "5HhjGj7K3hzHfKjsw4mfPyf8Jq2U4b8vq7V9JH8BHD25", minersCount: 12 },
    { coldKey: "5Lq6Xf8ytHtVQ35X4dk4wrxUeFwkpwmDhZT59dqvNdR2", minersCount: 10 },
    { coldKey: "5J4ChgK5fV9dJ4Fvq5ZhrNznNSq6QpGq5WbwzxhXfdth", minersCount: 8},
    { coldKey: "5HtK4F7fD2h6ZHgWh9t27wfKqj4zRwa6JvQpZ77kFw5s", minersCount: 7 },
    { coldKey: "5Nf9kjZzCpxFGHgpnjqbrdmKb8T9Grq4djsDhq8ZfR29", minersCount: 6 },
    { coldKey: "5WxKsmjVJ7F5CpQe6lHfV8sXbdzHfPwtjyxj8sF6f5gx", minersCount: 5 },
    { coldKey: "5Ax5GkvjWmgpF4hdTxM6u4cRyaxseUuvHZKr82ndmJ9X", minersCount: 4 },
    { coldKey: "5Cgqrfk5FSwytP9pd2dw5fKrV6bfz8Fmhrfb9XcTwHwp", minersCount: 3 },
    { coldKey: "5X8f5Fjc7b7gg7ZsghsZm9wKyZj3Fp85m8YvQ7t5Qbw9", minersCount: 2 },
    { coldKey: "5NhGkwS9dxRJyz6NyYqs6vbAeHQrp2VzzHHqXtYB5pzx", minersCount: 1 },
    { coldKey: "5MyDdbKb8R5yNJnkQXqgwYPsktt48hqW7shd28BkjhnN", minersCount: 1 },
  ];
  

  const ipData = [
    { ipAddress: "192.168.1.1", minersCount: 85 },
    { ipAddress: "192.168.2.1", minersCount: 42 },
    { ipAddress: "192.168.3.1", minersCount: 38 },
    { ipAddress: "192.168.4.1", minersCount: 33 },
    { ipAddress: "192.168.5.1", minersCount: 28 },
    { ipAddress: "192.168.6.1", minersCount: 25 },
    { ipAddress: "192.168.7.1", minersCount: 22 },
    { ipAddress: "192.168.8.1", minersCount: 18 },
    { ipAddress: "192.168.9.1", minersCount: 15 },
    { ipAddress: "192.168.10.1", minersCount: 12 },
    { ipAddress: "192.168.11.1", minersCount: 10 },
    { ipAddress: "192.168.12.1", minersCount: 8 },
    { ipAddress: "192.168.13.1", minersCount: 7 },
    { ipAddress: "192.168.14.1", minersCount: 6 },
    { ipAddress: "192.168.15.1", minersCount: 5 },
    { ipAddress: "192.168.16.1", minersCount: 4 },
    { ipAddress: "192.168.17.1", minersCount: 3 },
    { ipAddress: "192.168.18.1", minersCount: 2 },
    { ipAddress: "192.168.19.1", minersCount: 1 },
    { ipAddress: "192.168.20.1", minersCount: 1 },
  ]

  return (
    <div className="p-4">
      <h2 className="mb-2 text-xl font-semibold">Subnet Distribution Data</h2>

      <div className="mb-8">
        <MinerIncentiveDistributionChart minerIncentiveData={minerIncentiveData} />
      </div>

      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold">Subnet Miner Coldkey Distribution</h3>
        <p className="mb-4 text-sm text-muted-foreground">Breakdown of Miners by Coldkey addresses.</p>

        <div className="mb-4 flex items-center justify-end gap-2">
          {/* <Button
            variant={coldkeyView === "treemap" ? "default" : "outline"}
            size="sm"
            onClick={() => setColdkeyView("treemap")}
          >
            <LayoutGrid className="h-4 w-4" />
            Treemap
          </Button>
          <Button
            variant={coldkeyView === "linear" ? "default" : "outline"}
            size="sm"
            onClick={() => setColdkeyView("linear")}
          >
            <BarChart2 className="h-4 w-4" />
            Bar
          </Button> */}
        </div>

        <MinerColdkeyDistributionChart
          minerColdkeys={ {data:coldkeyData}}
          viewMode={coldkeyView}
        />
         <Card className="mt-6 overflow-hidden border border-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="p-3 text-left text-sm font-medium">Miner ColdKey</th>
                <th className="p-3 text-left text-sm font-medium">Miner Count</th>
              </tr>
            </thead>
            <tbody>
              {coldkeyData.slice(0, 10).map((row, index) => (
                <tr key={index} className="border-b border-border last:border-0">
                  <td className="p-3 text-sm">{row.coldKey}</td>
                  <td className="p-3 text-left text-sm">{row.minersCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">Showing 1 to 10 of 43 entries</div>

          <div className="flex items-center gap-1">
            <Button variant="default" size="sm" className="h-8 w-8 p-0">
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              3
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              4
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">Subnet Miner IP Distribution</h3>
        <p className="mb-4 text-sm text-muted-foreground">Breakdown of Miners by IP addresses.</p>

        <div className="mb-4 flex items-center justify-end gap-2">
          {/* <Button
            variant={ipView === "treemap" ? "default" : "outline"}
            size="sm"
            onClick={() => setIpView("treemap")}
          >
            <LayoutGrid className="h-4 w-4" />
            Treemap
          </Button>
          <Button
            variant={ipView === "linear" ? "default" : "outline"}
            size="sm"
            onClick={() => setIpView("linear")}
          >
            <BarChart2 className="h-4 w-4" />
            Bar
          </Button> */}
        </div>

        <MinerIPDistributionChart
          minerIPs={{ data: ipData }}
          viewMode={ipView}
        />
         <Card className="mt-6 overflow-hidden border border-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="p-3 text-left text-sm font-medium">IP Address</th>
                <th className="p-3 text-left text-sm font-medium">Miner Count</th>
              </tr>
            </thead>
            <tbody>
              {ipData.slice(0, 10).map((row, index) => (
                <tr key={index} className="border-b border-border last:border-0">
                  <td className="p-3 text-sm">{row.ipAddress}</td>
                  <td className="p-3 text-left text-sm">{row.minersCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">Showing 1 to 10 of 43 entries</div>

          <div className="flex items-center gap-1">
            <Button variant="default" size="sm" className="h-8 w-8 p-0">
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              3
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              4
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
