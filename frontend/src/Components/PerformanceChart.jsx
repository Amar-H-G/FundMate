import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function FundPerformanceChart({ data }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (data && data.length > 0 && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Process data for chart
      const chartData = {
        labels: data
          .slice(0, 30)
          .reverse()
          .map((item) => item.date),
        datasets: [
          {
            label: "NAV",
            data: data
              .slice(0, 30)
              .reverse()
              .map((item) => parseFloat(item.nav)),
            borderColor: "#4f46e5", // indigo-600
            backgroundColor: "rgba(79, 70, 229, 0.1)",
            borderWidth: 2,
            tension: 0.1,
            fill: true,
          },
        ],
      };

      // Destroy previous chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create new chart
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              mode: "index",
              intersect: false,
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              beginAtZero: false,
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
}
