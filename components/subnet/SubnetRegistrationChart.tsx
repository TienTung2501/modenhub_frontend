"use client"
import { css, useTheme } from "@emotion/react";
import Chart from "../ChartWrapper.tsx";
import { useMemo } from "react";

interface SubnetRegCostHistoryItem {
  timestamp: string;
  regCost: number;
}

const spinnerContainer = css`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export type SubnetRegistrationChartProps = {
  data: SubnetRegCostHistoryItem[];
};

export const SubnetRegistrationChart = ({ data }: SubnetRegistrationChartProps) => {
  const theme = useTheme();

  // Format lại data thành { x, y }
  const formattedData = useMemo(() => {
    return data.map(({ timestamp, regCost }) => ({
      x: new Date(timestamp).toISOString(),
      y: regCost,
    }));
  }, [data]);

  const [minValue, maxValue] = useMemo(() => {
    const costs = data.map(({ regCost }) => regCost);
    return [Math.min(...costs), Math.max(...costs)];
  }, [data]);

  return (
    <Chart
      height={400}
      series={[
        {
          name: "Cost",
          type: "area", // dùng area để hiển thị gradient rõ hơn
          data: formattedData,
        },
      ]}
      options={{
        chart: {
          animations: { enabled: false },
          background: "bg-background",
          toolbar: { show: false },
          zoom: { enabled: false },
        },
        colors: ["hsl(var(--primary))"],
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            type: "vertical",
            opacityFrom: 0.6,
            opacityTo: 0.1,
            stops: [0, 90, 100],
          },
        },
        
        dataLabels: { enabled: false },
        grid: {
          show: true,
          borderColor: "#e0e0e0",
          strokeDashArray: 5,
          position: "back",
          yaxis: { lines: { show: true } },
          xaxis: { lines: { show: true } },
        },
        markers: { size: 0 },
        noData: {
          text: "No subnet registration data yet",
          align: "center",
          style: { color: "hsl(var(--primary))" },
        },
        responsive: [
          { breakpoint: 767, options: { chart: { height: 320 } } },
          { breakpoint: 599, options: { chart: { height: 270 } } },
        ],
        stroke: {
          curve: "smooth",
          width: 2,
        },
        tooltip: {
          theme: "dark",
          shared: true,
          intersect: false,
          x: {
            formatter: (val: number) => {
              const day = new Date(val);
              return day.toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "2-digit",
                hour: "numeric",
                minute: "numeric",
              });
            },
          },
          y: {
            formatter: (val: number) => `Mod ${val.toFixed(2)}`,
          },
        },
        xaxis: {
          type: "datetime",
          labels: {
            style: {
              fontSize: "11px",
              colors: "#7F7F7F",
            },
          },
        },
        yaxis: {
          decimalsInFloat: 0,
          labels: {
            style: {
              colors: "#14DEC2",
            },
          },
          title: {
            text: `Cost (MOD)`,
            style: {
              color: "#14DEC2",
            },
          },
          min: minValue,
          max: maxValue,
        },
      }}
    />
  );
};
