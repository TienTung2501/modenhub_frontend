"use client"

import type React from "react"

import { useMemo, useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"

interface MinerWeightsTabProps {
  subnetId?: string
}

// Define interfaces for the data structure
interface ValidatorData {
  uid: number
  name: string
  count: number
  hotkey: string
}

interface MinerData {
  uid: number
  hotkey: string
}

interface WeightData {
  validator_uid: number
  miner_uid: number
  weight: number
}

// Sample validators data
const validators: ValidatorData[] = [
  { uid: 0, name: "MOD-Validator.com", count: 254, hotkey: "5CXMNstedwVTVuMh2RhUe7X5qidjdQTq4sEkszAr3SYgUoVk" },
  { uid: 1, name: "5HbSc...TFZdT", count: 252, hotkey: "5HbScTFZdTVuMh2RhUe7X5qidjdQTq4sEkszAr3SYgUoVk" },
  { uid: 2, name: "Openensor Foundation", count: 236, hotkey: "5DFCodRzYdoEukajcgATPK6h5TP27LRP7zrhDerf4PWPHiTa" },
  { uid: 3, name: "mod5", count: 204, hotkey: "5F2CaUJRNUvLpA2kGhPuMXAGbVmfkGGT6DFYzZtpqjVnYP" },
  { uid: 4, name: "5Fpg3...YdA4G", count: 166, hotkey: "5Fpg3YdA4GVuMh2RhUe7X5qidjdQTq4sEkszAr3SYgUoVk" },
  { uid: 5, name: "Crucible Labs", count: 140, hotkey: "5CavRLJRNUvLpA2kGhPuMXAGbVmfkGGT6DFYzZtpqjVnYP" },
  { uid: 6, name: "Owner34", count: 135, hotkey: "5GtNjWJRNUvLpA2kGhPuMXAGbVmfkGGT6DFYzZtpqjVnYP" },
  { uid: 7, name: "5FC5p...581Gw", count: 112, hotkey: "5FC5p581GwVuMh2RhUe7X5qidjdQTq4sEkszAr3SYgUoVk" },
  { uid: 8, name: "Yuma, a DCG Company", count: 88, hotkey: "5HJH1tJRNUvLpA2kGhPuMXAGbVmfkGGT6DFYzZtpqjVnYP" },
  { uid: 9, name: "5G1Nj...anChe", count: 84, hotkey: "5G1NjanCheVuMh2RhUe7X5qidjdQTq4sEkszAr3SYgUoVk" },
  { uid: 10, name: "Rizzo (Insured)", count: 19, hotkey: "5EWQT8JRNUvLpA2kGhPuMXAGbVmfkGGT6DFYzZtpqjVnYP" },
  { uid: 11, name: "RoundTable21", count: 6, hotkey: "5F4tQyJRNUvLpA2kGhPuMXAGbVmfkGGT6DFYzZtpqjVnYP" },
]

// Generate miners data (256 miners)
const generateMiners = (): MinerData[] => {
  return Array.from({ length: 256 }, (_, i) => ({
    uid: i,
    hotkey: `5${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 6)}`,
  }))
}

// Generate weight data between validators and miners
const generateWeightData = (validators: ValidatorData[], miners: MinerData[]): WeightData[] => {
  const weights: WeightData[] = []

  validators.forEach((validator) => {
    miners.forEach((miner) => {
      // Generate random weight with some variation
     // Sinh weight từ 0.6 đến 1.0
        let weight = 0.6 + Math.random() * 0.4

        // Nếu validator là uid 8 (Yuma), giảm xác suất hoặc giá trị
        if (validator.uid === 8) {
          weight = 0.6 + Math.random() * 0.2 // weight từ 0.6 đến 0.8
        }


      weights.push({
        validator_uid: validator.uid,
        miner_uid: miner.uid,
        weight,
      })
    })
  })

  return weights
}

// Type for tooltip data
interface TooltipData {
  validator: string
  validatorCount: number
  uid: number
  weight: number
  visible: boolean
  x: number
  y: number
}

export function MinerWeightsTab({ subnetId = "30" }: MinerWeightsTabProps) {
  const miners = useMemo(() => generateMiners(), [])
  const weightData = useMemo(() => generateWeightData(validators, miners), [])

  const containerRef = useRef<HTMLDivElement>(null)
  const [tooltip, setTooltip] = useState<TooltipData>({
    validator: "",
    validatorCount: 0,
    uid: 0,
    weight: 0,
    visible: false,
    x: 0,
    y: 0,
  })

  // Create a matrix from the weight data for easier rendering
  const weightMatrix = useMemo(() => {
    const matrix: number[][] = Array(validators.length)
      .fill(0)
      .map(() => Array(miners.length).fill(0))

    weightData.forEach((item) => {
      matrix[item.validator_uid][item.miner_uid] = item.weight
    })

    return matrix
  }, [weightData])

  // Function to handle mouse movement over the heatmap
  const handleMouseMove = (
    event: React.MouseEvent<SVGRectElement>,
    validatorIndex: number,
    uid: number,
    weight: number,
  ) => {
    if (!containerRef.current) return

    const x = event.clientX
    const y = event.clientY

    setTooltip({
      validator: validators[validatorIndex].name,
      validatorCount: validators[validatorIndex].count,
      uid,
      weight,
      visible: true,
      x,
      y,
    })
  }

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }))
  }

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setTooltip((prev) => ({ ...prev, visible: false }))
    }

    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  // Calculate row height based on number of validators
  const rowHeight = 80 // Fixed height of 50px per row as requested

  return (
    <div className="p-4">
      <h2 className="mb-2 text-xl font-semibold">Subnet Weights Placed By Validators For Each Miner</h2>
      <p className="mb-4 text-sm text-muted-foreground">Each Validator's weights for each miner inside the subnet.</p>

      <div className="relative" ref={containerRef}>
        <Card className="overflow-hidden border-0 p-0">
          <div className="flex">
            {/* Validator names and counts */}
            <div
              className="flex min-w-[180px] flex-col border-r border-border bg-background"
              style={{ height: `${validators.length * rowHeight}px` }}
            >
              {validators.map((validator, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-2 text-xs"
                  style={{ height: `${rowHeight}px` }}
                >
                  <span className="truncate max-w-[120px]">{validator.name}</span>
                  <span className="text-muted-foreground">- {validator.count}</span>
                </div>
              ))}
            </div>

            {/* Heatmap */}
            <div
              className="relative w-full bg-background"
            >
              <div style={{ height: `${validators.length * rowHeight}px` }}>
              <svg width="100%" height="100%" preserveAspectRatio="none">
                {/* Background grid */}
                <g>
                  {/* Vertical grid lines every 20 miners */}
                  {Array.from({ length: miners.length / 20 + 1 }).map((_, i) => {
                    const x = `${((i * 20) / miners.length) * 100}%`
                    return (
                      <line
                        key={`v-${i}`}
                        x1={x}
                        y1="0"
                        x2={x}
                        y2="100%"
                        // stroke="black"
                        // strokeWidth={"1"}
                        // opacity={i % 5 === 0 ? "1" : "0.7"}
                      />
                    )
                  })}

                  {/* Horizontal grid lines */}
                  {validators.map((_, y) => {
                    const yPos = `${((y + 1) / validators.length) * 100}%`
                    return (
                      <line
                        key={`h-${y}`}
                        x1="0"
                        y1={yPos}
                        x2="100%"
                        y2={yPos}
                        // stroke="black"
                        // strokeWidth="1"
                        opacity="1"
                      />
                    )
                  })}
                </g>

                {/* Weight cells */}
                {weightMatrix.map((row, validatorIndex) => {
                  const rowStart = `${(validatorIndex / validators.length) * 100}%`
                  const rowHeight = `${(1 / validators.length) * 100}%`

                  return row.map((weight, minerIndex) => {
                    const colStart = `${(minerIndex / miners.length) * 100}%`
                    const colWidth = `${(1 / miners.length) * 100}%`

                    // Use the primary color with varying opacity based on weight
                    const opacity = 0.2 + weight * 0.8

                    return (
                      <rect
                        key={`${minerIndex}-${validatorIndex}`}
                        x={colStart}
                        y={rowStart}
                        width={colWidth}
                        height={rowHeight}
                        fill={`hsla(176, 68%, 40%, ${opacity})`}
                        onMouseMove={(e) => handleMouseMove(e, validatorIndex, minerIndex, weight)}
                        onMouseLeave={handleMouseLeave}
                        stroke="rgba(0,0,0,0.3)" // tăng độ đậm của viền
                        strokeWidth="0.3" // tăng độ dày của viền
                      />
                    )
                  })
                })}
              </svg>
              </div>
              {/* X-axis labels */}
              <div className="flex h-6 w-full justify-between border-t border-border px-2 text-xs">
                  {Array.from({ length: miners.length / 20 + 1 }).map((_, i) => {
                    const value = i * 20
                    return (
                      <div key={`label-${value}`} className="flex-shrink-0">
                        {value}
                      </div>
                    )
                  })}
                </div>
            </div>
          </div>
        </Card>

        {/* Tooltip */}
        {tooltip.visible && (
          <div
            className="fixed rounded bg-black/90 p-2 text-xs text-white border border-gray-700"
            style={{
              left: `${tooltip.x}px`,
              top: `${tooltip.y - 10}px`,
              transform: "translate(-50%, -100%)",
              zIndex: 50,
              pointerEvents: "none",
            }}
          >
            <div>
              validator: {tooltip.validator} - {tooltip.validatorCount}
            </div>
            <div>UID: {tooltip.uid}</div>
            <div>Weight: {tooltip.weight.toFixed(3)}</div>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">Weight: 0.0 - 1.0</span>
          <div className="flex h-4 w-32 rounded overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-[hsla(176,68%,40%,0.2)] to-[hsla(176,68%,40%,1)]"></div>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          Showing all {miners.length} miners and {validators.length} validators
        </div>
      </div>
    </div>
  )
}
