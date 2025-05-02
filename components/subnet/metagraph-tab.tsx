"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Copy, Hexagon, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetagraphTabProps {
  subnetId?: string
}

const data = [
  {
    pos: 1,
    type: "O",
    neuronType: "validator", // validator, miner, immune
    uid: 163,
    stakeWeight: "357,282.18",
    vtrust: 0.7695,
    trust: 0,
    consensus: 0,
    incentive: 0,
    dividends: 0.33,
    emission: 48.84673,
    updated: 165,
    axon: "185.199.44.166:8091",
    hotkey: "5FFApa...",
    hotkeyFull: "5FFApaKDJRNUvLpA2kGhPuMXAGbVmfkGGT6DFYzZtpqjVnYP",
    coldkey: "5GZSAg...",
    coldkeyFull: "5GZSAgMGgYFpKKLJNUvLpA2kGhPuMXAGbVmfkGGT6DFYzZtpqjVnYP",
    rootStake: "1,915,399",
    rootWeight: "344,772",
    alphaStake: "12,510",
    rootRatio: 96.5,
    alphaRatio: 3.5,
    dailyAlpha: "978.93",
  },
  {
    pos: 2,
    type: "O",
    neuronType: "miner",
    uid: 96,
    stakeWeight: "222,742.29",
    vtrust: 0.6451,
    trust: 0.10799,
    consensus: 0.000006,
    incentive: 0.000008,
    dividends: 0.1746,
    emission: 25.85695,
    updated: 298,
    axon: "45.137.194.105:8091",
    hotkey: "5GTAcD...",
    hotkeyFull: "5GTAcDJRNUvLpA2kGhPuMXAGbVmfkGGT6DFYzZtpqjVnYP",
    coldkey: "5DLT3M...",
    coldkeyFull: "5DLT3MJRNUvLpA2kGhPuMXAGbVmfkGGT6DFYzZtpqjVnYP",
    rootStake: "1,096,842",
    rootWeight: "197,432",
    alphaStake: "25,311",
    rootRatio: 88.64,
    alphaRatio: 11.36,
    dailyAlpha: "517.12",
  },
  {
    pos: 3,
    type: "O",
    neuronType: "validator",
    uid: 236,
    stakeWeight: "209,593.39",
    vtrust: 0.3973,
    trust: 0.51537,
    consensus: 0.000029,
    incentive: 0.000034,
    dividends: 0.1053,
    emission: 15.63941,
    updated: 196,
    axon: "5.161.60.151:8091",
    hotkey: "5F4tQy...",
    hotkeyFull: "5F4tQyJRNUvLpA2kGhPuMXAGbVmfkGGT6DFYzZtpqjVnYP",
    coldkey: "5H1Bpw...",
    coldkeyFull: "5H1BpwJRNUvLpA2kGhPuMXAGbVmfkGGT6DFYzZtpqjVnYP",
    rootStake: "1,029,098",
    rootWeight: "185,238",
    alphaStake: "24,356",
    rootRatio: 88.38,
    alphaRatio: 11.62,
    dailyAlpha: "312.79",
  },
  {
    pos: 4,
    type: "O",
    neuronType: "miner",
    uid: 22,
    stakeWeight: "128,200.15",
    vtrust: 0.7689,
    trust: 0.78387,
    consensus: 0.000047,
    incentive: 0.0006,
    dividends: 0.1122,
    emission: 16.69137,
    updated: 152,
    axon: "192.150.253.122:8091",
    hotkey: "5F2CaU...",
    hotkeyFull: "5F2CaUJRNUvLpA2kGhPuMXAGbVmfkGGT6DFYzZtpqjVnYP",
    coldkey: "5CMEwR...",
    coldkeyFull: "5CMEwRJRNUvLpA2kGhPuMXAGbVmfkGGT6DFYzZtpqjVnYP",
    rootStake: "214,064",
    rootWeight: "38,532",
    alphaStake: "89,669",
    rootRatio: 30.06,
    alphaRatio: 69.94,
    dailyAlpha: "333.83",
  },
  {
    pos: 5,
    type: "O",
    neuronType: "miner",
    uid: 230,
    stakeWeight: "98,947.75",
    vtrust: 0.7695,
    trust: 0,
    consensus: 0,
    incentive: 0,
    dividends: 0.0892,
    emission: 13.20596,
    updated: 5,
    axon: "0.0.0.0",
    hotkey: "5CavRL...",
    hotkeyFull: "5CavRLJRNUvLpA2kGhPuMXAGbVmfkGGT6DFYzZtpqjVnYP",
    coldkey: "5E1Aqc...",
    coldkeyFull: "5E1AqcJRNUvLpA2kGhPuMXAGbVmfkGGT6DFYzZtpqjVnYP",
    rootStake: "531,317",
    rootWeight: "95,637",
    alphaStake: "3,311",
    rootRatio: 96.65,
    alphaRatio: 3.35,
    dailyAlpha: "264.12",
  },
  {
    pos: 6,
    type: "O",
    neuronType: "validator",
    uid: 248,
    stakeWeight: "87,706.53",
    vtrust: 0.706,
    trust: 0,
    consensus: 0,
    incentive: 0,
    dividends: 0.0749,
    emission: 11.08596,
    updated: 87,
    axon: "0.0.0.0",
    hotkey: "5GtNjW...",
    hotkeyFull: "5GtNjWJRNUvLpA2kGhPuMXAGbVmfkGGT6DFYzZtpqjVnYP",
    coldkey: "5DyMUJ...",
    coldkeyFull: "5DyMUJJRNUvLpA2kGhPuMXAGbVmfkGGT6DFYzZtpqjVnYP",
    rootStake: "476,159",
    rootWeight: "85,709",
    alphaStake: "1,998",
    rootRatio: 97.72,
    alphaRatio: 2.28,
    dailyAlpha: "221.72",
  },
  {
    pos: 7,
    type: "O",
    neuronType: "validator",
    uid: 5,
    stakeWeight: "78,642.35",
    vtrust: 0.7117,
    trust: 0.82744,
    consensus: 0.000044,
    incentive: 0.0006,
    dividends: 0.0657,
    emission: 9.81101,
    updated: 88,
    axon: "34.130.167.11:8091",
    hotkey: "5HJH1t...",
    hotkeyFull: "5HJH1tJRNUvLpA2kGhPuMXAGbVmfkGGT6DFYzZtpqjVnYP",
    coldkey: "5E19Yv...",
    coldkeyFull: "5E19YvJRNUvLpA2kGhPuMXAGbVmfkGGT6DFYzZtpqjVnYP",
    rootStake: "407,949",
    rootWeight: "73,431",
    alphaStake: "5,212",
    rootRatio: 93.37,
    alphaRatio: 6.63,
    dailyAlpha: "196.22",
  },
  {
    pos: 8,
    type: "O",
    neuronType: "validator",
    uid: 159,
    stakeWeight: "29,247",
    vtrust: 0.7068,
    trust: 0,
    consensus: 0,
    incentive: 0,
    dividends: 0.0244,
    emission: 3.61529,
    updated: 0,
    axon: "0.0.0.0",
    hotkey: "5EWQT8...",
    hotkeyFull: "5EWQT8JRNUvLpA2kGhPuMXAGbVmfkGGT6DFYzZtpqjVnYP",
    coldkey: "5F93cE...",
    coldkeyFull: "5F93cEJRNUvLpA2kGhPuMXAGbVmfkGGT6DFYzZtpqjVnYP",
    rootStake: "129,506",
    rootWeight: "23,327",
    alphaStake: "5,920",
    rootRatio: 79.76,
    alphaRatio: 20.24,
    dailyAlpha: "72.31",
  },
]

export function MetagraphTab({ subnetId = "30" }: MetagraphTabProps) {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(null), 2000)
  }

  const renderTypeIcon = (type: string, neuronType: string) => {
    if (neuronType === "validator") {
      return (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
          <Hexagon className="h-5 w-5 text-primary" strokeWidth={1.5} />
        </div>
      )
    } else if (neuronType === "miner") {
      return (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/10">
          <ArrowUpRight className="h-5 w-5 text-cyan-500" strokeWidth={1.5} />
        </div>
      )
    } else if (neuronType === "immune") {
      return (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/10">
          <ArrowDownRight className="h-5 w-5 text-amber-500" strokeWidth={1.5} />
        </div>
      )
    }
  }

  const renderRatioBar = (rootRatio: number, alphaRatio: number) => {
    return (
      <div className="flex flex-col w-full">
        <div className="flex justify-between text-xs mb-1">
          <span>Root: {rootRatio.toFixed(2)}%</span>
          <span>Alpha: {alphaRatio.toFixed(2)}%</span>
        </div>
        <div className="mt-1 flex h-1.5 w-full overflow-hidden rounded-full bg-muted">
          {/* Phần màu xanh (Root Ratio) */}
          <div
            className="h-full bg-primary"
            style={{ width: `${rootRatio}%`, zIndex: 2 }}
          />
          {/* Phần màu đỏ (Alpha Ratio) */}
          <div
            className="h-full bg-red-400"
            style={{ width: `${alphaRatio}%`, zIndex: 1 }}
          />
        </div>
      </div>
    );
  };
  

  return (
    <div className="p-4">
      <h2 className="mb-2 text-xl font-semibold">Subnet Metagraph</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        The Subnet metagraph is a chart that displays a detailed readout of the neurons (validators & miners) on a
        subnet.
      </p>

      <div className="mb-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
            <Hexagon className="h-5 w-5 text-primary" strokeWidth={1.5} />
          </div>
          <span className="text-sm">are validators</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/10">
            <ArrowUpRight className="h-5 w-5 text-cyan-500" strokeWidth={1.5} />
          </div>
          <span className="text-sm">are miners</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/10">
            <ArrowDownRight className="h-5 w-5 text-amber-500" strokeWidth={1.5} />
          </div>
          <span className="text-sm">are immune miners</span>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Filter table..." className="pl-9" />
        </div>

        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm">
            10
          </Button>
          <Button variant="default" size="sm">
            25
          </Button>
          <Button variant="outline" size="sm">
            50
          </Button>
          <Button variant="outline" size="sm">
            100
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden border border-border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="p-3 text-left text-sm font-medium">POS</th>
                <th className="p-3 text-left text-sm font-medium">Type</th>
                <th className="p-3 text-left text-sm font-medium">UID</th>
                <th className="p-3 text-left text-sm font-medium">Stake Weight (ϻ)</th>
                <th className="p-3 text-left text-sm font-medium">VTrust</th>
                <th className="p-3 text-left text-sm font-medium">Trust</th>
                <th className="p-3 text-left text-sm font-medium">Consensus</th>
                <th className="p-3 text-left text-sm font-medium">Incentive</th>
                <th className="p-3 text-left text-sm font-medium">Dividends</th>
                <th className="p-3 text-left text-sm font-medium">Emission(ϻ)</th>
                <th className="p-3 text-left text-sm font-medium">Updated</th>
                <th className="p-3 text-left text-sm font-medium">Axon</th>
                <th className="p-3 text-left text-sm font-medium">Hotkey</th>
                <th className="p-3 text-left text-sm font-medium">Coldkey</th>
                <th className="p-3 text-left text-sm font-medium">Root Stake</th>
                <th className="p-3 text-left text-sm font-medium">Root Weight</th>
                <th className="p-3 text-left text-sm font-medium">Alpha Stake</th>
                <th className="p-3 text-left text-sm font-medium">Ratio</th>
                <th className="p-3 text-left text-sm font-medium">Daily Alpha</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.pos} className="border-b border-border last:border-0">
                  <td className="p-3 text-sm">{row.pos}</td>
                  <td className="p-3 text-sm">{renderTypeIcon(row.type, row.neuronType)}</td>
                  <td className="p-3 text-sm text-primary">{row.uid}</td>
                  <td className="p-3 text-sm text-amber-500">{row.stakeWeight}</td>
                  <td className="p-3 text-sm">{row.vtrust}</td>
                  <td className="p-3 text-sm">{row.trust}</td>
                  <td className="p-3 text-sm">{row.consensus}</td>
                  <td className="p-3 text-sm">{row.incentive}</td>
                  <td className="p-3 text-sm">{row.dividends}</td>
                  <td className="p-3 text-sm text-primary">{row.emission}</td>
                  <td className="p-3 text-sm">{row.updated}</td>
                  <td className="p-3 text-sm">{row.axon}</td>
                  <td className="p-3 text-sm">
                    <div className="flex items-center gap-1 text-yellow-500">
                      {row.hotkey}
                      <button
                        onClick={() => copyToClipboard(row.hotkeyFull, `hotkey-${row.uid}`)}
                        className="rounded p-0.5 hover:bg-muted"
                      >
                        <Copy
                          className={cn(
                            "h-3.5 w-3.5",
                            copied === `hotkey-${row.uid}` ? "text-green-500" : "text-muted-foreground",
                          )}
                        />
                      </button>
                    </div>
                  </td>
                  <td className="p-3 text-sm">
                    <div className="flex items-center gap-1">
                      {row.coldkey}
                      <button
                        onClick={() => copyToClipboard(row.coldkeyFull, `coldkey-${row.uid}`)}
                        className="rounded p-0.5 hover:bg-muted"
                      >
                        <Copy
                          className={cn(
                            "h-3.5 w-3.5",
                            copied === `coldkey-${row.uid}` ? "text-green-500" : "text-muted-foreground",
                          )}
                        />
                      </button>
                    </div>
                  </td>
                  <td className="p-3 text-sm">{row.rootStake}</td>
                  <td className="p-3 text-sm">{row.rootWeight}</td>
                  <td className="p-3 text-sm">{row.alphaStake}</td>
                  <td className="p-3 text-sm min-w-[150px]">{renderRatioBar(row.rootRatio, row.alphaRatio)}</td>
                  <td className="p-3 text-sm">{row.dailyAlpha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">Showing 1 to 25 of 256 entries</div>

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
          <span className="px-1">...</span>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            11
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
