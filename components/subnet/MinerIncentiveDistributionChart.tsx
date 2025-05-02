"use client"

import { useMemo } from "react"
import Chart from "react-apexcharts"

interface IncentiveData {
  incentive: number
  isImmunityPeriod: boolean
  timestamp?: number // Thêm timestamp để hiển thị đúng trục X
}

interface MinerIncentiveDistributionChartProps {
  minerIncentiveData: IncentiveData[]
}

export const MinerIncentiveDistributionChart = ({ minerIncentiveData }: MinerIncentiveDistributionChartProps) => {
  // Chuyển đổi dữ liệu thành dạng series
  const series = useMemo(() => {
    // Đảm bảo mỗi mốc chỉ có một điểm duy nhất
    const dataPoints = minerIncentiveData.map((item, index) => ({
      x: index + 1, // Sử dụng chỉ số thay vì timestamp
      y: item.incentive,
      isImmune: item.isImmunityPeriod,
    }))

    // Tách thành hai series dựa trên thuộc tính isImmune
    return [
      {
        name: "Active Key",
        data: dataPoints.filter((point) => !point.isImmune),
      },
      {
        name: "Immune Key",
        data: dataPoints.filter((point) => point.isImmune),
      },
    ]
  }, [minerIncentiveData])

  // Tính toán giá trị min, max và lowestActiveKey
  const [minValue, maxValue, lowestActiveKey] = useMemo(() => {
    const activeKeys = minerIncentiveData.filter(({ isImmunityPeriod }) => !isImmunityPeriod)

    const minIncentive = Math.min(...minerIncentiveData.map((item) => item.incentive))
    const maxIncentive = Math.max(...minerIncentiveData.map((item) => item.incentive))

    // Tìm giá trị nhỏ nhất trong các active keys
    const lowestActiveKeyValue = activeKeys.length > 0 ? Math.min(...activeKeys.map((item) => item.incentive)) : 0

    return [minIncentive, maxIncentive, lowestActiveKeyValue]
  }, [minerIncentiveData])

  return (
    <Chart
      height={560}
      series={series}
      type="scatter"
      options={{
        chart: {
          animations: {
            enabled: false,
          },
          background: "bg-background", // Nền đen như trong ảnh
          toolbar: {
            show: false,
          },
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
          events: {
            mouseMove: (event, chartContext, config) => {
              // Kích hoạt tooltip khi di chuyển chuột
            },
          },
        },
        colors: ["#14dec2", "#FF9900"], // Màu xanh cho active, cam cho immune
        dataLabels: {
          enabled: false, // Tắt data labels để giống với ảnh gốc
        },
        grid: {
          show: false,
        },
        tooltip: {
          theme: "dark",
          shared: true,
          intersect: false,
          followCursor: true,
          x: {
            show: true,
          },
          custom: ({ seriesIndex, dataPointIndex, w }) => {
            // Nếu không có dataPointIndex hợp lệ, tìm điểm gần nhất
            if (dataPointIndex === -1 || seriesIndex === -1) {
              const mouseX = w.globals.clientX
              const chartWidth = w.globals.chartWidth
              const totalPoints = 256

              // Tính toán chỉ số gần nhất dựa trên vị trí chuột
              const nearestIndex = Math.round((mouseX / chartWidth) * totalPoints)

              // Tìm điểm dữ liệu tương ứng
              let foundPoint = null
              let isImmune = false

              for (let i = 0; i < w.globals.initialSeries.length; i++) {
                const series = w.globals.initialSeries[i].data
                const point = series.find((p: { x: number }) => p.x === nearestIndex)

                if (point) {
                  foundPoint = point
                  isImmune = i === 1 // series[1] là Immune Key
                  break
                }
              }

              if (foundPoint) {
                const incentiveValue = foundPoint.y.toFixed(5)
                const index = foundPoint.x

                return `<div style="padding: 10px; background: #1e1e1e; color: white; border-radius: 5px;">
                  <div style="margin-bottom: 5px;">UID: ${index + 155}</div>
                  <div style="margin-bottom: 5px;">Incentive: ${incentiveValue}</div>
                  <div style="margin-bottom: 5px;">Rank: ${index}/${totalPoints}</div>
                  <div style="margin-bottom: 5px;">Host: miner-${index}</div>
                  <div style="margin-bottom: 5px;">History: BOUMR9HTG2...</div>
                  <div style="margin-bottom: 5px;">Cookie: BOZbwXVH...</div>
                  <div style="color: ${isImmune ? "#FF9900" : "#14dec2"};">${isImmune ? "Immune" : "Non-Immune"}</div>
                </div>`
              }

              return ""
            }

            // Xử lý bình thường khi hover vào điểm
            const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex]
            const incentiveValue = data.y.toFixed(5)
            const isImmune = seriesIndex === 1
            const index = data.x

            return `<div style="padding: 10px; background: #1e1e1e; color: white; border-radius: 5px;">
              <div style="margin-bottom: 5px;">UID: ${index + 155}</div>
              <div style="margin-bottom: 5px;">Incentive: ${incentiveValue}</div>
              <div style="margin-bottom: 5px;">Rank: ${index}/${w.globals.initialSeries[0].data.length + w.globals.initialSeries[1].data.length}</div>
              <div style="margin-bottom: 5px;">Host: miner-${index}</div>
              <div style="margin-bottom: 5px;">History: BOUMR9HTG2...</div>
              <div style="margin-bottom: 5px;">Cookie: BOZbwXVH...</div>
              <div style="color: ${isImmune ? "#FF9900" : "#14dec2"};">${isImmune ? "Immune" : "Non-Immune"}</div>
            </div>`
          },
        },
        responsive: [
          {
            breakpoint: 767,
            options: {
              chart: {
                height: 320,
              },
            },
          },
          {
            breakpoint: 599,
            options: {
              chart: {
                height: 270,
              },
            },
          },
        ],
        markers: {
          size: 3, // Kích thước nhỏ hơn
          shape: "rect", // Hình chữ nhật như trong ảnh
          strokeWidth: 1, // Thêm viền
          strokeColors: ["#0a7a6d", "#805000"], // Màu viền tối hơn so với màu fill
          hover: {
            size: 5,
          },
        },
        stroke: {
          curve: "smooth",
          width: 1.5,
        },
        annotations: {
          yaxis: [
            {
              y: lowestActiveKey,
              borderColor: "#14dec2",
              borderWidth: 1,
              strokeDashArray: 5,
              label: {
                text: `Minimum Non Immune Incentive\n${lowestActiveKey.toFixed(5)}`,
                position: "right",
                style: {
                  color: "#14dec2",
                  background: "#000000",
                  padding: {
                    left: 10,
                    right: 10,
                    top: 5,
                    bottom: 5,
                  },
                },
              },
            },
          ],
        },
        yaxis: {
          decimalsInFloat: 5,
          labels: {
            style: {
              colors: "#cccccc",
            },
            formatter: (val) => {
              return val.toFixed(4) // Hiển thị 4 chữ số thập phân như trong ảnh
            },
          },
          title: {
            text: "Incentive",
            style: {
              color: "#cccccc",
            },
          },
          min: minValue * 0.95, // Thêm khoảng trống dưới giá trị nhỏ nhất
          max: maxValue * 1.05, // Thêm khoảng trống trên giá trị lớn nhất
        },
        xaxis: {
          type: "numeric",
          min: 0,
          max: 256,
          tickAmount: 16, // Chia trục X thành 16 khoảng
          labels: {
            style: {
              colors: "#7F7F7F",
            },
          },
          crosshairs: {
            show: true,
            position: "back",
            stroke: {
              color: "#b6b6b6",
              width: 1,
              dashArray: 5,  // Thêm hiệu ứng đứt quãng cho crosshair
            },
            fill: {
              type: "solid",
              color: "#B1B9C4",
              gradient: {
                colorFrom: "#D8E3F0",
                colorTo: "#BED1E6",
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
            dropShadow: {
              enabled: false,
            },
            opacity: 0.5,
          },
          title: {
            text: "Miner Index",
            style: {
              color: "#cccccc",
            },
          },
        },
        
      }}
    />
  )
}
