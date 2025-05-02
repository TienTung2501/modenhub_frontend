"use client"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card"
import dayjs from "dayjs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ChevronRight, Hexagon } from "lucide-react"

import { StaticNeuronDeregistrationChart } from "@/components/subnet/SubnetDeregistrationChart"
import {SubnetRegistrationChart} from "./SubnetRegistrationChart";

interface RegistrationTabProps {
  subnetId?: string
}
const registrationChartData = [
  { timestamp: "2025-04-01", regCost: 100 },
  { timestamp: "2025-04-02", regCost: 120 },
  { timestamp: "2025-04-03", regCost: 95 },
  { timestamp: "2025-04-04", regCost: 110 },
  { timestamp: "2025-04-05", regCost: 105 },
  { timestamp: "2025-04-06", regCost: 115 },
  { timestamp: "2025-04-07", regCost: 130 },
  { timestamp: "2025-04-08", regCost: 125 },
  { timestamp: "2025-04-09", regCost: 135 },
  { timestamp: "2025-04-10", regCost: 140 },
];
const deregistrationChartData = [
  { timestamp: "2025-04-01T00:00:00Z", incentive: 32767.5, emission: 200000 },
  { timestamp: "2025-04-02T00:00:00Z", incentive: 39321, emission: 300000 },
  { timestamp: "2025-04-03T00:00:00Z", incentive: 36044.25, emission: 250000 },
  { timestamp: "2025-04-04T00:00:00Z", incentive: 45874.5, emission: 350000 },
  { timestamp: "2025-04-05T00:00:00Z", incentive: 42597.75, emission: 300000 },
  { timestamp: "2025-04-06T00:00:00Z", incentive: 49151.25, emission: 400000 },
  { timestamp: "2025-04-07T00:00:00Z", incentive: 52428, emission: 450000 },
  { timestamp: "2025-04-08T00:00:00Z", incentive: 55604.75, emission: 500000 },
  { timestamp: "2025-04-09T00:00:00Z", incentive: 58981.5, emission: 550000 },
  { timestamp: "2025-04-10T00:00:00Z", incentive: 65535, emission: 600000 },
];

const registrationTableData = [
  {
    uid: 52,
    hotkey: "5C5BWEgMrFeAeXChJ94YlnGzAR5qutMBbSwVG8Pkd3zc3hDlR",
    coldkey: "5GmqJv7CYiWK8RNVrZUl8sbSDQkTBri9eV7uiErc2Dt2Hx7",
    time: "22 Apr 2025 14:13:36",
    block: "5407700",
  },
  {
    uid: 83,
    hotkey: "5DX4eiLZNjC6Q98JoyvKaUxnUdcFmhWYzCRqq6Cc4p9soSn",
    coldkey: "5FskzSWomIHEDAysRVnMupFnf7E44mUM2D3vwwpiFzRLu9",
    time: "21 Apr 2025 18:15:36",
    block: "5401710",
  },
  {
    uid: 128,
    hotkey: "5Cf5GsDMBDrDhaAdiD7mTaxpp7Y4ovaQjAFbTWTMSvpuyolz",
    coldkey: "5EZYeL3oA7Yq92NcuMnPPnwYRATOiTUvC9ydGlQU8MGRfRFN",
    time: "20 Apr 2025 11:07:24",
    block: "5399569",
  },
  {
    uid: 34,
    hotkey: "5H42SPx3yHSVwe9rKRZ4ZPYAn37cqvVgtDfScdvXZzkDzYwq",
    coldkey: "5CkmSeCX8QNN7EEqMRsePZ46LNDMGafg9Ut2HhCgUbcvE9AC",
    time: "19 Apr 2025 04:00:24",
    block: "5397434",
  },
  {
    uid: 29,
    hotkey: "5F7eGXoeHdwoCL7tRBUK8wjYhnDNxrFGpJKTe5GkAbFyBw",
    coldkey: "5CkmSeCX8QNN7EEqMRsePZ46LNDMGafg9Ut2HhCgUbcvE9AC",
    time: "18 Apr 2025 03:57:48",
    block: "5397421",
  },
  {
    uid: 4,
    hotkey: "5D2zjYMyoVbRBc3LdBon2SY2ZWiVnbIzDaCZbeCvhwTCfd9B",
    coldkey: "5CkmSeCX8QNN7EEqMRsePZ46LNDMGafg9Ut2HhCgUbcvE9AC",
    time: "17 Apr 2025 03:52:12",
    block: "5397303",
  },
  {
    uid: 24,
    hotkey: "5Gb2jni2ttfofvE9qq2wQ3eysF6swwB6HQKVxUAbpsnLdreH",
    coldkey: "5CBp6MVhXqpCT6WqMHrf7J7icv9ZwDXDUYYB3hcpqghfG3a",
    time: "16 Apr 2025 16:37:24",
    block: "5394019",
  },
]

export function RegistrationTab({ subnetId = "30" }: RegistrationTabProps) {
  return (
    <div className="p-4">
      <h2 className="mb-2 text-xl font-semibold">Subnet Registration Data</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        A chart depicting the historical cost in Mod to register a node on the subnet
      </p>

      {/* Call SubnetRegistrationChart here */}
      <div className="mb-8">
        <SubnetRegistrationChart
          data={registrationChartData} // Thay data tương ứng với dữ liệu bạn muốn truyền
        />
      </div>

      {/* Call StaticNeuronDeregistrationChart here */}
      <div className="mb-8">
        <StaticNeuronDeregistrationChart
          data={deregistrationChartData}
        />
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">Subnet Registration Table</h3>

        <div className="mb-4 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Filter table..." className="pl-9" />
          </div>

          <div className="flex items-center gap-1">
            <Button variant="default" size="sm">
              10
            </Button>
            <Button variant="outline" size="sm">
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
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="p-3 text-left text-sm font-medium">UID</th>
                <th className="p-3 text-left text-sm font-medium">Hotkey</th>
                <th className="p-3 text-left text-sm font-medium">Coldkey</th>
                <th className="p-3 text-left text-sm font-medium">Time(UTC)</th>
                <th className="p-3 text-left text-sm font-medium">Block</th>
              </tr>
            </thead>
            <tbody>
              {registrationTableData.map((row) => (
                <tr key={row.uid} className="border-b border-border last:border-0">
                  <td className="p-3 text-sm text-primary">{row.uid}</td>
                  <td className="p-3 text-sm truncate max-w-[300px]">{row.hotkey}</td>
                  <td className="p-3 text-sm truncate max-w-[300px]">{row.coldkey}</td>
                  <td className="p-3 text-sm">{row.time}</td>
                  <td className="p-3 text-sm">
                    <div className="flex items-center gap-1 text-primary">
                      <Hexagon className="h-4 w-4 text-primary" strokeWidth={1.5} />
                      {row.block}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">Showing 1 to 10 of 5,615 entries</div>

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
              541
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
