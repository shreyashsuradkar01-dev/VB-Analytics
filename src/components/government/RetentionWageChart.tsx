"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useLanguage } from "@/components/language-context";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function RetentionWageChart() {
  const { language } = useLanguage();

  const isMarathi = language === "mr";

  const data = {
    labels: isMarathi
      ? ["प्रारंभ", "३ महिने", "६ महिने", "९ महिने", "१२ महिने"]
      : ["Joining", "3 Months", "6 Months", "9 Months", "12 Months"],

    datasets: [
      {
        label: isMarathi
          ? "रोजगार टिकाव दर (%)"
          : "Retention Rate (%)",

        data: [100, 82.4, 68.0, 56.4, 49.0],

        borderColor: "#047857",
        backgroundColor: "rgba(4, 120, 87, 0.05)",

        borderWidth: 2.2,
        pointRadius: 3.5,
        pointHoverRadius: 5,

        fill: true,
        tension: 0.3,

        yAxisID: "y",
      },

      {
        label: isMarathi
          ? "सरासरी वेतन (₹ LPA)"
          : "Avg Salary (₹ LPA)",

        data: [3.4, 3.5, 3.8, 3.95, 4.1],

        borderColor: "#b45309",
        backgroundColor: "transparent",

        borderWidth: 2.2,
        borderDash: [5, 4],

        pointRadius: 3,
        pointHoverRadius: 5,

        tension: 0.3,

        yAxisID: "y1",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    interaction: {
      mode: "index" as const,
      intersect: false,
    },

    plugins: {
      legend: {
        position: "top" as const,

        labels: {
          boxWidth: 12,
          padding: 12,

          font: {
            size: 10,
          },
        },
      },

      tooltip: {
        backgroundColor: "#0f172a",

        titleFont: {
          size: 11,
        },

        bodyFont: {
          size: 11,
        },

        padding: 8,
      },
    },

    scales: {
      x: {
        grid: {
          color: "#f1f5f9",
        },

        ticks: {
          font: {
            size: 10,
          },

          color: "#64748b",
        },
      },

      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,

        title: {
          display: true,

          text: isMarathi
            ? "रोजगार टिकाव %"
            : "Retention %",

          font: {
            size: 10,
          },
        },

        min: 30,
        max: 100,

        grid: {
          color: "#f1f5f9",
        },

        ticks: {
          font: {
            size: 10,
          },

          color: "#64748b",
        },
      },

      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,

        title: {
          display: true,

          text: isMarathi
            ? "CTC (₹ LPA)"
            : "CTC (₹ LPA)",

          font: {
            size: 10,
          },
        },

        min: 2.5,
        max: 5.0,

        grid: {
          drawOnChartArea: false,
        },

        ticks: {
          font: {
            size: 10,
          },

          color: "#64748b",
        },
      },
    },
  };

  return (
    <div className="relative h-[300px] w-full">
      <Line data={data} options={options} />
    </div>
  );
}