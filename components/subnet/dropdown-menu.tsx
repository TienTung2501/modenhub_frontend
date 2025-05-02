"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SubnetItem {
  id: number
  name: string
}

interface DropdownProps {
  title: string
  items?: any[]
  type?: "subnets" | "blockchain" | "validators" | "analytics"
}

export function HeaderDropdown({ title, items = [], type = "subnets" }: DropdownProps) {
  const [open, setOpen] = useState(false)

  // Sample subnet data
  const subnets: SubnetItem[] = [
    { id: 0, name: "Root" },
    // { id: 1, name: "Apex" },
    // { id: 2, name: "omron" },
    // { id: 3, name: "templar" },
    // { id: 4, name: "Targon" },
    // { id: 5, name: "OpenKaito" },
    // { id: 6, name: "Infinite Games" },
    // { id: 7, name: "SubVortex" },
    // { id: 8, name: "Proprietary Trading Network" },
    // { id: 9, name: "Pretrain" },
    // { id: 10, name: "Sturdy" },
    // { id: 11, name: "Dispy" },
    // { id: 12, name: "Compute Horde" },
    // { id: 13, name: "Data Universe" },
    // { id: 14, name: "Vector Store" },
    // { id: 15, name: "de_val" },
    // { id: 16, name: "BitAds" },
    // { id: 17, name: "404—GEN" },
    // { id: 18, name: "Zeus" },
    // { id: 19, name: "Nineteen.ai" },
    // { id: 20, name: "BitAgent - Rizzo" },
    // { id: 30, name: "Bettensor" },
    // { id: 31, name: "NASChain" },
    // { id: 32, name: "ItsAI" },
    // { id: 33, name: "ReadyAI" },
    // { id: 34, name: "BitMind" },
    // { id: 35, name: "LogicNet" },
    // { id: 36, name: "web-agents" },
    // { id: 37, name: "Fishering" },
    // { id: 38, name: "Distributed Training" },
    // { id: 42, name: "SWE - Rizzo" },
    // { id: 46, name: "Neural3D" },
    // { id: 47, name: "Condensed.ai" },
    // { id: 48, name: "NextPlace" },
    // { id: 49, name: "polaris" },
    // { id: 50, name: "Synth" },
  ]

  // Blockchain menu items
  const blockchainItems = [
    { name: "Blocks", path: "/blockchain/blocks" },
    { name: "Transfers", path: "/blockchain/transfers" },
    { name: "Delegation", path: "/blockchain/delegation" },
    { name: "Accounts", path: "/blockchain/accounts" },
    { name: "Extrinsics", path: "/blockchain/extrinsics" },
    { name: "Events", path: "/blockchain/events" },
  ]

  // Validators menu items
  const validatorsItems = [
    { name: "All Validators", path: "/validators" },
    { name: "Delegation/Staking", path: "/validators/staking" },
  ]

  // Analytics menu items
  const analyticsItems = [
    { name: "Overview", path: "/analytics" },
    { name: "Exchanges", path: "/analytics/exchanges" },
  ]

  const getItems = () => {
    switch (type) {
      case "subnets":
        return subnets
      case "blockchain":
        return blockchainItems
      case "validators":
        return validatorsItems
      case "analytics":
        return analyticsItems
      default:
        return []
    }
  }

  const renderItems = () => {
    const currentItems = getItems()
  
    if (type === "subnets") {
      const subnetItems = currentItems as SubnetItem[] // ép kiểu an toàn
  
      return (
        <div className="grid grid-cols-5 gap-1 p-2">
          {subnetItems.map((subnet) => (
            <DropdownMenuItem key={subnet.id} asChild className="flex items-center gap-2 rounded-md p-2">
               <Link key={subnet.id} href={`/subnets/${subnet.id}`}>
                <span className="text-muted-foreground">{subnet.id}:</span> {subnet.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </div>
      )
    }
  
    const menuItems = currentItems as { name: string; path: string }[]
  
    return (
      <DropdownMenuGroup>
        {menuItems.map((item, index) => (
          <DropdownMenuItem key={index} asChild>
            <Link href={item.path}>{item.name}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuGroup>
    )
  }
  

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 gap-1">
          {title} <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={type === "subnets" ? "w-[800px]" : "w-56"}>
        {renderItems()}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
