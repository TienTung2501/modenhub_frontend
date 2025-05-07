'use client';
import { Header } from "@/components/subnet/header"
import { Card } from "@/components/ui/card"
import Link from "next/link"

const subnets = [
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

export default function SubnetsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="mb-6 text-2xl font-bold">Subnets</h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {subnets.map((subnet) => (
           <Link key={subnet.id} href={`/subnets/${subnet.id}/metagraph`}>
              <Card className="flex h-24 cursor-pointer flex-col justify-center p-4 transition-colors hover:bg-muted/50">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium">{subnet.id}:</span>
                  <span className="text-lg">{subnet.name}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
