import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Bar, ComposedChart, BarChart, } from "recharts";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import HeatmapChart from "./heatmap";


interface CompletionStats {
    completedAll: number;
    notCompletedAll: number;
    totalUsers: number;
}


const COLORS = ["#0088FE", "#00C49F",];

const DashboardPage: React.FC = () => {

    const [pieChartData, setPieChartData] = useState<any[]>([]);
    const [chartData, setChartData] = useState([]);
    const [lineChartData, setLineChartData] = useState([]);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchStats = async () => {
            const res = await fetch('http://localhost:5000/analytics/lesson-completion', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data: CompletionStats = await res.json();
            const pieChartData = [
                { name: "Hoàn thành", value: data.completedAll, fill: '#00C49F' },
                { name: "Chưa hoàn thành", value: data.notCompletedAll, fill: '#0088FE' },
            ];
            setPieChartData(pieChartData);
        };

        fetchStats();
    }, []);

    useEffect(() => {
        fetch("http://localhost:5000/analytics/registration-completion", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(setLineChartData);
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/user/monthly-stats', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(setChartData);
    }, []);

    return (
        <div className="bg-white !h-[1120px]">
            <div className="w-full mx-auto bg-gray-50 p-4 rounded-2xl gap-5 flex">
                <label className="w-[50%]">
                    <div className="w-full bg-white p-4 rounded-2xl shadow-md ">
                        <h2 className="text-xl font-semibold text-center mb-4">Biểu đồ tiến trình hoàn thành khóa học</h2>
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="40%"
                                    fill="#8884d8"
                                >
                                    {pieChartData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </label>
                <label className="w-[50%]">
                    <div className="w-full bg-white p-4 rounded-2xl shadow-md">
                        <h2 className="text-xl font-semibold text-center mb-4">Biểu đồ tương tác người dùng</h2>
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={lineChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="lineA" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} name="Số lượt đăng ký" />
                                <Line type="monotone" dataKey="lineB" stroke="#82ca9d" strokeWidth={2} dot={{ r: 4 }} name="Hoàn thành khóa học" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                </label>
            </div>

            <div className="w-full h-[500px] mx-auto bg-gray-50 p-4 gap-5 flex">
                <label className="w-[50%]">
                    <div className="w-full bg-white p-4 rounded-2xl shadow-md ">
                        <h2 className="text-xl font-semibold text-center mb-4">Biểu đồ người dùng thường và người dùng vip</h2>
                        <ResponsiveContainer width="100%" height={500}>
                            <BarChart
                                width={800}
                                height={400}
                                data={chartData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />

                                {/* stacked bars */}
                                <Bar dataKey="newUsers" stackId="a" name="Người dùng" fill="#8884d8" />
                                <Bar dataKey="vip" stackId="a" name="Kích hoạt vip " fill="#ffa726" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </label>
                <label className="w-[50%]">
                    <div className="w-full bg-white p-4 rounded-2xl shadow-md mb-8">
                        <h2 className="text-xl font-semibold text-center mb-4">
                            Biểu đồ hoạt động của người dùng theo giờ
                        </h2>
                        <ResponsiveContainer width="100%" height={500}>
                            <HeatmapChart></HeatmapChart>
                        </ResponsiveContainer>
                    </div>

                </label>
            </div>
        </div>

    );
}
export default DashboardPage;
