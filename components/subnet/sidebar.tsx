"use client"

import { FaTelegramPlane, FaDiscord,FaGithub,FaTwitter } from "react-icons/fa"; // Đảm bảo bạn đã cài react-icons


import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"
import Link from "next/link";

// Sample subnet data
const subnetsData = {
  "0": { name: "Root", regDate: "12 Jan 2023" },
  "1": { name: "Apex", regDate: "15 Feb 2023" },
  "2": { name: "omron", regDate: "20 Mar 2023" },
  "3": { name: "templar", regDate: "05 Apr 2023" },
  "4": { name: "Targon", regDate: "18 May 2023" },
  "5": { name: "OpenKaito", regDate: "22 Jun 2023" },
  "30": { name: "Bettensor", regDate: "24 Jun 2024" },
  "42": { name: "SWE - Rizzo", regDate: "10 May 2024" },
}

interface SidebarProps {
  subnetId?: string
}

export function Sidebar({ subnetId = "0" }: SidebarProps) {
  const [subnetInfo, setSubnetInfo] = useState({ name: "Modentensor", regDate: "24 Jun 2024" })

  useEffect(() => {
    if (subnetId && subnetsData[subnetId as keyof typeof subnetsData]) {
      setSubnetInfo(subnetsData[subnetId as keyof typeof subnetsData])
    }
  }, [subnetId])

  return (
    <div className="flex h-full w-[340px] flex-col overflow-auto border-r border-border">
      <div className="flex items-center gap-3 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
          <span className="text-xl font-bold">{subnetInfo.name.charAt(0)}</span>
        </div>
        <div>
          <h2 className="text-lg font-semibold">{subnetInfo.name}</h2>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>Netuid: {subnetId}</span>
            <span>/</span>
            <span>Reg: {subnetInfo.regDate}</span>
          </div>
        </div>
      </div>

      <p className="px-4 pb-4 text-sm">Global sports prediction on Modentensor.</p>

      <div className="flex gap-3 px-4">
        <button className="rounded-full p-1 hover:bg-secondary">
          <Link href={process.env.REACT_APP_GITHUB_URL||"/"} target="_blank" rel="noopener noreferrer">
            <FaGithub className="h-5 w-5" />
          </Link>
        </button>
        <button className="rounded-full p-1 hover:bg-secondary">
          <Link href={process.env.REACT_APP_TWITTER_URL||"/"} target="_blank" rel="noopener noreferrer">
            <FaTwitter className="h-5 w-5" />
          </Link>
        </button>
        <button className="rounded-full p-1 hover:bg-secondary">
          <Link href={process.env.REACT_APP_DISCORD_URL||"/"} target="_blank" rel="noopener noreferrer">
            <FaDiscord className="h-5 w-5" />
          </Link>
        </button>
        <button className="rounded-full p-1 hover:bg-secondary">
          <Link href={process.env.REACT_APP_TELEGRAM_URL||"/"} target="_blank" rel="noopener noreferrer">
            <FaTelegramPlane className="h-5 w-5" />
          </Link>
        </button>
      </div>


      <Card className="mx-4 mt-4 overflow-hidden border bg-card p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Price</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-2xl font-medium positive">0.007369</span>
          <span className="rounded bg-destructive/10 px-1 text-xs negative">-0.15%</span>
        </div>
        <div className="text-sm text-muted-foreground">$1.562958</div>
      </Card>

      <div className="mt-4 px-4">
        <h3 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Financial Data</h3>

        <div className="grid grid-cols-2 gap-2">
          <Card className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Market Cap / 24H</span>
            </div>
            <div className="mt-1 flex items-center gap-1">
              <span className="text-lg font-medium">$962.76K</span>
              <span className="text-xs positive">↑ 1.79%</span>
            </div>
          </Card>

          <Card className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Volume / 24H</span>
            </div>
            <div className="mt-1 flex items-center gap-1">
              <span className="text-lg font-medium">$60.21K</span>
              <span className="text-xs positive">↑ 1796.62%</span>
            </div>
          </Card>
        </div>

        <div className="mt-2 grid grid-cols-3 gap-2">
          <Card className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">FDV</span>
            </div>
            <div className="mt-1">
              <span className="text-base font-medium">$32.82M</span>
            </div>
          </Card>

          <Card className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Volume/MC</span>
            </div>
            <div className="mt-1">
              <span className="text-base font-medium">6.25%</span>
            </div>
          </Card>

          <Card className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Max Supply</span>
            </div>
            <div className="mt-1">
              <span className="text-base font-medium">21.00M</span>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-4 px-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Circulating Supply</span>
          <span className="text-xs">
            1,615.99K <span className="negative">-2.93%</span>
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Alpha in Pool</span>
          <span className="text-xs">
            1,349.60K <span className="text-muted-foreground">$546.41K</span>
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">MOD in Pool</span>
          <span className="text-xs">
            2.58K <span className="text-muted-foreground">$546.41K</span>
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs">MOD in Pool</span>
          <span className="text-xs">Alpha in Pool</span>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <span className="text-xs">0.73%</span>
          <span className="text-xs">99.27%</span>
        </div>

        <Progress
          value={0.73}
          className="mt-1"
          indicatorClassName="bg-destructive"
        />
        
      </div>

      <div className="mt-4 px-4">
        <h3 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Trading Data</h3>

        <div className="flex items-center justify-between">
          <span className="text-xs">Buys</span>
          <span className="text-xs">Sells</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">44</span>
          <span className="text-sm font-medium">58</span>
        </div>

        <div className="mt-1 flex h-2 w-full overflow-hidden rounded-full">
          <div className="h-full w-[43%] bg-primary"></div>
          <div className="h-full w-[57%] bg-destructive"></div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs">Buy Volume</span>
          <span className="text-xs">Sell Volume</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">14732</span>
          <span className="text-sm font-medium">13596</span>
        </div>

        <div className="mt-1 flex h-2 w-full overflow-hidden rounded-full">
          <div className="h-full w-[52%] bg-primary"></div>
          <div className="h-full w-[48%] bg-destructive"></div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs">Buyers</span>
          <span className="text-xs">Sellers</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">11</span>
          <span className="text-sm font-medium">15</span>
        </div>

        <div className="mt-1 flex h-2 w-full overflow-hidden rounded-full">
          <div className="h-full w-[42%] bg-primary"></div>
          <div className="h-full w-[58%] bg-destructive"></div>
        </div>
      </div>

      <div className="mt-4 px-4">
        <h3 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Subnet Data</h3>

        <div className="grid grid-cols-2 gap-2">
          <Card className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Emissions</span>
            </div>
            <div className="mt-1">
              <span className="text-lg font-medium">0.46%</span>
            </div>
          </Card>

          <Card className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Emissions / Day</span>
            </div>
            <div className="mt-1">
              <span className="text-lg font-medium positive">+33.06</span>
            </div>
          </Card>
        </div>

        <div className="mt-2 grid grid-cols-3 gap-2">
          <Card className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Owner / Day</span>
            </div>
            <div className="mt-1">
              <span className="text-base font-medium positive">+5.96</span>
            </div>
          </Card>

          <Card className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Miner / Day</span>
            </div>
            <div className="mt-1">
              <span className="text-base font-medium positive">+13.96</span>
            </div>
          </Card>

          <Card className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Validator / Day</span>
            </div>
            <div className="mt-1">
              <span className="text-base font-medium positive">+13.96</span>
            </div>
          </Card>
        </div>

        <div className="mt-2 grid grid-cols-3 gap-2">
          <Card className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Reg Cost</span>
            </div>
            <div className="mt-1">
              <span className="text-base font-medium positive">+0.00</span>
            </div>
          </Card>

          <Card className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Recycled / Day</span>
            </div>
            <div className="mt-1">
              <span className="text-base font-medium positive">+0.03</span>
            </div>
          </Card>

          <Card className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">UIDs</span>
            </div>
            <div className="mt-1">
              <span className="text-base font-medium">
                256<span className="text-xs text-muted-foreground">/256</span>
              </span>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-auto p-4">
        <Separator className="mb-4" />
        <div className="text-xs text-muted-foreground">© 2025 ModenHub & comet</div>
      </div>
    </div>
  )
}
