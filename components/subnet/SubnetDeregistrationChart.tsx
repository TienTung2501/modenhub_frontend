import { useMemo } from "react";
import Chart from "react-apexcharts";

type NeuronDeregistrationData = {
  timestamp: string;
  incentive: number;
  emission: number;
};

interface StaticNeuronDeregistrationChartProps {
  data: NeuronDeregistrationData[];
}

export const StaticNeuronDeregistrationChart = ({
  data,
}: StaticNeuronDeregistrationChartProps) => {
  // Màu sắc sử dụng trực tiếp
  const successColor = "hsl(var(--primary))"; // xanh lá
  const neutralColor = "#f87171"; // đỏ nhạt

  // Chuyển đổi dữ liệu
  const series = useMemo(() => {
    return [
      {
        name: "Incentive",
        type: "area",
        data: data.map((d) => ({
          x: new Date(d.timestamp).toISOString(),
          y: d.incentive / 65535,
        })),
      },
      {
        name: "Emission (XYZ)",
        type: "area",
        data: data.map((d) => ({
          x: new Date(d.timestamp).toISOString(),
          y: d.emission / 1e6,
        })),
      },
    ];
  }, [data]);

  const timestamps = data.map((d) => d.timestamp);
  const incentives = data.map((d) => d.incentive / 65535);
  const emissions = data.map((d) => d.emission / 1e6);

  const minIncentive = Math.min(...incentives);
  const maxIncentive = Math.max(...incentives);
  const minEmission = Math.min(...emissions);
  const maxEmission = Math.max(...emissions);

  return (
    <Chart
      height={400}
      series={series}
      options={{
        chart: {
          toolbar: {
            show: false,
            autoSelected: "pan",
          },
          zoom: {
            enabled: false,
          },
        },
        colors: [successColor, neutralColor],
        labels: timestamps,
        grid: {
          show: true,
          borderColor: "#e0e0e0",
          strokeDashArray: 5,
          position: "back",
          yaxis: { lines: { show: true } },
          xaxis: { lines: { show: true } },
        },
        xaxis: {
          type: "datetime",
          labels: {
            style: { fontSize: "11px", colors: "#7F7F7F" },
          },
          axisTicks: { show: false },
          axisBorder: { show: false },
        },
        yaxis: [
          {
            title: {
              text: "Incentive",
              style: { color: successColor },
            },
            labels: {
              style: { colors: successColor },
              formatter: (val: number) => val.toFixed(4),
            },
            min: minIncentive - 0.0001,
            max: maxIncentive + 0.0001,
            axisTicks: { show: false },
            axisBorder: { show: false },
          },
          {
            opposite: true,
            title: {
              text: "Emission (XYZ)",
              style: { color: neutralColor },
            },
            labels: {
              style: { colors: neutralColor },
              formatter: (val: number) => val.toFixed(2),
            },
            min: minEmission - 0.01,
            max: maxEmission + 0.01,
            axisTicks: { show: false },
            axisBorder: { show: false },
          },
        ],
        stroke: {
          curve: "smooth",
          width: 1.5,
        },
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
        markers: {
          size: 0,
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        tooltip: {
          theme: "dark",
          shared: true,
          intersect: false,
          x: { format: "dd MMM HH:mm" },
        },
      }}
    />
  );
};
