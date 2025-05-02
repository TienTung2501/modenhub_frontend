/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Chart from "react-apexcharts";
import { useMemo } from "react";
import { ApexOptions } from "apexcharts";

// CSS cho phần loading spinner
const spinnerContainer = css`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const shortenIP = (ip: string): string => {
  const ipParts = ip.split(".");
  return `${ipParts[0]}.${ipParts[1]}.${ipParts[2]}.xxx`; // Rút gọn IP
};

interface MinerIPDistributionChartProps {
  minerIPs: {
    data: { ipAddress: string; minersCount: number }[];
  };
  viewMode: "linear" | "treemap"; // Thêm viewMode để chuyển đổi giữa linear và treemap
}

export const MinerIPDistributionChart = ({
  minerIPs,
  viewMode,
}: MinerIPDistributionChartProps) => {
    const { data } = minerIPs

    const sortedData = useMemo(() => {
      return [...data].sort((a, b) => b.minersCount - a.minersCount)
    }, [data])
  
    const series = useMemo(() => {
      if (viewMode === "linear") {
        return [
          {
            name: "Miners Count",
            data: sortedData.map(({ ipAddress, minersCount }) => ({
              x: shortenIP(ipAddress),
              y: minersCount,
            })),
          },
        ]
      } else {
        return [
          {
            data: sortedData.map(({ ipAddress, minersCount }) => ({
              x: shortenIP(ipAddress),
              y: minersCount,
            })),
          },
        ]
      }
    }, [viewMode, sortedData])

  // Nếu chế độ là "linear", sử dụng biểu đồ cột (bar)
  // Nếu chế độ là "treemap", sử dụng biểu đồ treemap
  // Tạo các tùy chọn cho biểu đồ
  const chartOptions: ApexOptions = useMemo(() => {
    if (viewMode === "linear") {
        return {
          chart: {
            type: "bar",
            background: "bg-background",
            toolbar: { show: false },
            animations: { enabled: false },
          },
          plotOptions: {
            bar: {
              horizontal: true, // 👉 quan trọng: dùng cột nằm ngang
              barHeight: "100%", // mỗi hàng 1 cột
              distributed: true,
            },
          },
          colors: ["#14dec2"],
          grid: {
            show: false,
          },
          tooltip: {
            theme: "dark",
            followCursor: true,
            x: { show: false },
            y: {
              formatter: (value: number) => `${value} miners`,
            },
          },
          xaxis: {
            labels: {
              style: { colors: "hsl(var(--foreground))" },
            },
            axisBorder: { show: false },
            axisTicks: { show: false },
          },
          yaxis: {
            categories: sortedData.map((d) => shortenIP(d.ipAddress)),
            labels: {
              style: { colors: "hsl(var(--foreground))", fontSize: "10px" },
            },
          },
          dataLabels: { enabled: false },
          legend: { show: false },
        };
      }

    // Treemap
    return {
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
            show: true,
        },
      tooltip: {
        theme: "dark",
        intersect: false,
        followCursor: true,
        x: { show: false }, // 👈 Tắt đường gạch dọc khi hover
        y: {
          formatter: (value: number) => `${value} miners`,
        },
      },
      xaxis: {
        crosshairs: {
          show: false, // ✅ Tắt đường dọc khi hover
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
            padding: 4, // thử thêm thuộc tính này (không được đảm bảo hoạt động)
            distributed: true,
            enableShades: false,
            borderRadius: 0, // Đảm bảo các ô không có góc bo
        },
      },
      dataLabels: { enabled: false },
      stroke: {
        show: true,
        width: 1,
        colors: [ "hsla(var(--foreground))"], // 👈 Nhạt hơn màu gốc
      },
    };
  }, [viewMode]);
  

  return <Chart height={560} series={series} type={viewMode === "linear" ? "bar" : "treemap"} options={chartOptions} />
}
