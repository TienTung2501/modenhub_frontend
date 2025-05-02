"use client"

import { Search } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { HeaderDropdown } from "./dropdown-menu"

export function Header() {
  return (
    <header className="flex h-12 items-center justify-between border-b border-border px-4">
      <div className="flex items-center gap-8">
        <Link href="/" className="font-semibold">
        ϻoden Hub
        </Link>

        <nav className="hidden md:flex">
          <ul className="flex items-center gap-1">
            <li>
              <HeaderDropdown title="Subnets" type="subnets" />
            </li>
            {/* <li>
              <HeaderDropdown title="Blockchain" type="blockchain" />
            </li>
            <li>
              <HeaderDropdown title="Validators" type="validators" />
            </li>
            <li>
              <HeaderDropdown title="Analytics" type="analytics" />
            </li> */}
          </ul>
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Search className="h-4 w-4" />
        </Button>
        <ThemeToggle />
        <Button variant="outline" size="sm" className="gap-1 rounded-md">
          Dashboard <span className="rounded bg-primary px-1 text-xs text-primary-foreground">NEW</span>
        </Button>
      </div>
    </header>
  )
}
