"use client"
import { useMemo } from "react";
import Chart from "../ChartWrapper.tsx";
import { css } from "@emotion/react";
import { ApexOptions } from "apexcharts";

// CSS cho phần loading spinner
const spinnerContainer = css`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

interface MinerColdkeyDistributionChartProps {
  minerColdkeys: {
    data: { coldKey: string; minersCount: number }[];
  };
  viewMode: "treemap"; // Chỉ dùng chế độ "treemap"
}

export const MinerColdkeyDistributionChart = ({  
  minerColdkeys,
  viewMode,
}: MinerColdkeyDistributionChartProps) => {
  const { data } = minerColdkeys;

  // Sắp xếp dữ liệu theo minersCount giảm dần
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => b.minersCount - a.minersCount);
  }, [data]);

  // Chuẩn bị dữ liệu series cho biểu đồ
  const series = useMemo(() => [
    {
      data: sortedData.map(({ coldKey, minersCount }) => ({
        x: coldKey,
        y: minersCount,
      })),
    },
  ], [sortedData]);

  // Cấu hình cho Treemap
  const chartOptions: ApexOptions = useMemo(() => ({
    chart: {
      background: "bg-background",
      toolbar: { show: false },
      zoom: {
        enabled: false,
        type: "xy",
        zoomedArea: {
          fill: {
            color: "#90CAF9",
            opacity: 0.4,
          },
          stroke: {
            color: "#0D47A1",
            opacity: 0.4,
            width: 1,
          },
        },
      },
    },
    grid: {
      padding: { left: 0 },
      show: false,
    },
    tooltip: {
      theme: "dark",
      intersect: false,
      followCursor: true,
      x: { show: false },
      y: {
        formatter: (value: number) => `${value} miners`,
      },
    },
    xaxis: {
      crosshairs: {
        show: false, // Tắt đường dọc khi hover
      },
    },
    plotOptions: {
      treemap: {
        colorScale: {
          ranges: [
            { from: 30, to: 100, color: "#f4b342" }, // cam sáng hơn, ít gắt hơn
            { from: 0, to: 30, color: "#14dec2" },
          ],
        },
        distributed: true,
        enableShades: false,
        borderRadius: 0, // Đảm bảo các ô không có góc bo
      },
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["hsla(var(--foreground))"], // Nhạt hơn màu gốc
    },
    dataLabels: { enabled: false },
    legend: { show: false },
  }), [viewMode]);

  // Render biểu đồ Treemap
  return <Chart height={560} series={series} type="treemap" options={chartOptions} />;
};
