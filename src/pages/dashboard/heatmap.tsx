import React, { useEffect, useRef } from 'react';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';

// Đăng ký các thành phần Chart.js + Matrix
Chart.register(...registerables, MatrixController, MatrixElement);

interface DataPoint {
  x: number; // ngày (0-6)
  y: number; // giờ (0-23)
  v: number; // giá trị hoạt động
}
const token = localStorage.getItem('token');

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const generateRandomData = (): DataPoint[] => {
  const data: DataPoint[] = [];
  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      // Tạo dữ liệu giả lập, bạn thay bằng dữ liệu thực tế
      const value = Math.floor(Math.random() * 100);
      data.push({ x: day, y: hour, v: value });
    }
  }
  return data;
};

const HeatmapChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    fetch('http://localhost:5000/analytics/heatmap-submission', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then((_dataPoints) => {
        const dataPoints = _dataPoints;

        const data: ChartData<'matrix'> = {
          datasets: [
            {
              label: 'User Activity Heatmap',
              data: dataPoints,
              backgroundColor: (ctx) => {
                const value = ctx.dataset.data[ctx.dataIndex] as DataPoint;
                const alpha = value.v / 100;
                return `rgba(0, 123, 255, ${alpha})`;
              },
              width: (ctx) => {
                const chartArea = ctx.chart.chartArea;
                if (!chartArea) return 0; // kiểm tra chartArea tồn tại
                return (chartArea.right - chartArea.left) / 7 - 2;
              },
              height: (ctx) => {
                const chartArea = ctx.chart.chartArea;
                if (!chartArea) return 0; // kiểm tra chartArea tồn tại
                return (chartArea.bottom - chartArea.top) / 24 - 2;
              },
              borderWidth: 1,
              borderColor: 'white',
            },
          ],
        };

        const options: ChartOptions<'matrix'> = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'linear',
              position: 'top',
              min: 0,
              max: 6,
              ticks: {
                stepSize: 1,
                callback: (val) => days[val as number] ?? '',
              },
              grid: {
                display: false,
              },
            },
            y: {
              type: 'linear',
              reverse: true,
              min: 0,
              max: 23,
              ticks: {
                stepSize: 1,
                callback: (val) => `${val}:00`,
              },
              grid: {
                display: false,
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                title: (ctx) => {
                  const d = ctx[0].raw as DataPoint;
                  return `${days[d.x]}, ${d.y}:00`;
                },
                label: (ctx) => {
                  const d = ctx.raw as DataPoint;
                  return `Hoạt động: ${d.v}`;
                },
              },
            },
            legend: {
              display: false,
            },
          },
        };

        // Hủy chart cũ nếu tồn tại
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        // Tạo chart mới
        chartInstance.current = new Chart(chartRef.current!, {
          type: 'matrix',
          data,
          options,
        });

        // Cleanup khi component unmount
        return () => {
          chartInstance.current?.destroy();
        };
      });


  }, []);

  return (
    <div style={{ width: '100%', height: 500 }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default HeatmapChart;
