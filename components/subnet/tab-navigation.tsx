"use client"

import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LineChart, BarChart3, Activity, FileText, BarChart, Gauge } from "lucide-react"

interface TabNavigationProps {
  subnetId?: string
}

export function TabNavigation({ subnetId = "0" }: TabNavigationProps) {
  const pathname = usePathname()
  const router = useRouter()

  const getTabPath = (tabName: string) => `/subnets/${subnetId}/${tabName}`

  const tabs = [
    {
      name: "Metagraph",
      path: getTabPath("metagraph"),
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      name: "Hyperparams",
      path: getTabPath("hyperparams"),
      icon: <Activity className="h-4 w-4" />,
    },
    {
      name: "Registration",
      path: getTabPath("registration"),
      icon: <FileText className="h-4 w-4" />,
    },
    {
      name: "Distribution",
      path: getTabPath("distribution"),
      icon: <BarChart className="h-4 w-4" />,
    },
  ]

  const secondaryTabs = [
    {
      name: "Miner Weights",
      path: getTabPath("miners"),
      icon: <Gauge className="h-4 w-4" />,
    },
  ]

  return (
    <div className="flex flex-wrap gap-1 border-b border-border p-2">
      {tabs.map((tab) => (
        <Button
          key={tab.path}
          variant={pathname === tab.path ? "default" : "ghost"}
          size="sm"
          className={cn("gap-1.5", pathname === tab.path ? "bg-primary text-primary-foreground" : "")}
          onClick={() => router.push(tab.path)}
        >
          {tab.icon}
          {tab.name}
        </Button>
      ))}

      <div className="mx-1 h-6 w-px bg-border" />

      {secondaryTabs.map((tab) => (
        <Button
          key={tab.path}
          variant={pathname === tab.path ? "default" : "ghost"}
          size="sm"
          className={cn("gap-1.5", pathname === tab.path ? "bg-primary text-primary-foreground" : "")}
          onClick={() => router.push(tab.path)}
        >
          {tab.icon}
          {tab.name}
        </Button>
      ))}
    </div>
  )
}
