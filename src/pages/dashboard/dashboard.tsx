import React from "react";
import { PieChart, Pie, Cell, Bar, ComposedChart, BarChart, } from "recharts";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import HeatmapChart from "./heatmap";

const data = [
    { name: "Hoàn thành", value: 400 },
    { name: "Chưa hoàn thành", value: 300 },
];
const data1 = [
    { month: "Tháng 1", lineA: 4000, lineB: 2400 },
    { month: "Tháng 2", lineA: 3000, lineB: 1398 },
    { month: "Tháng 3", lineA: 2000, lineB: 9800 },
    { month: "Tháng 4", lineA: 2780, lineB: 3908 },
    { month: "Tháng 5", lineA: 1890, lineB: 4800 },
    { month: "Tháng 6", lineA: 2390, lineB: 3800 },
    { month: "Tháng 7", lineA: 3490, lineB: 4300 },
    { month: "Tháng 8", lineA: 3200, lineB: 4000 },
    { month: "Tháng 9", lineA: 2780, lineB: 3500 },
    { month: "Tháng 10", lineA: 4500, lineB: 4200 },
    { month: "Tháng 11", lineA: 3000, lineB: 2500 },
    { month: "Tháng 12", lineA: 3800, lineB: 2800 },
];

const data2 = [
    { month: "Tháng 1", newUsers: 4000, revenue: 3200 },
    { month: "Tháng 2", newUsers: 3000, revenue: 4500 },
    { month: "Tháng 3", newUsers: 2000, revenue: 5000 },
    { month: "Tháng 4", newUsers: 2780, revenue: 3500 },
    { month: "Tháng 5", newUsers: 1890, revenue: 4000 },
    { month: "Tháng 6", newUsers: 2390, revenue: 4200 },
    { month: "Tháng 7", newUsers: 3490, revenue: 4800 },
    { month: "Tháng 8", newUsers: 3200, revenue: 4600 },
    { month: "Tháng 9", newUsers: 2780, revenue: 4400 },
    { month: "Tháng 10", newUsers: 4500, revenue: 5000 },
    { month: "Tháng 11", newUsers: 3000, revenue: 3600 },
    { month: "Tháng 12", newUsers: 3800, revenue: 4700 },
];

const data4 = [
    { hour: "0h", users: 150 },
    { hour: "1h", users: 120 },
    { hour: "2h", users: 80 },
    { hour: "3h", users: 60 },
    { hour: "4h", users: 50 },
    { hour: "5h", users: 40 },
    { hour: "6h", users: 70 },
    { hour: "7h", users: 150 },
    { hour: "8h", users: 300 },
    { hour: "9h", users: 500 },
    { hour: "10h", users: 700 },
    { hour: "11h", users: 800 },
    { hour: "12h", users: 900 },
    { hour: "13h", users: 750 },
    { hour: "14h", users: 600 },
    { hour: "15h", users: 650 },
    { hour: "16h", users: 700 },
    { hour: "17h", users: 750 },
    { hour: "18h", users: 900 },
    { hour: "19h", users: 1000 },
    { hour: "20h", users: 1100 },
    { hour: "21h", users: 1300 },
    { hour: "22h", users: 1200 },
    { hour: "23h", users: 1000 },
];

const COLORS = ["#0088FE", "#00C49F",];

const DashboardPage: React.FC = () => {
    return (
        <div className="bg-white">
            <div className="w-full mx-auto bg-gray-50 p-4 rounded-2xl gap-5 flex">
                <label className="w-[50%]">
                    <div className="w-full bg-white p-4 rounded-2xl shadow-md ">
                        <h2 className="text-xl font-semibold text-center mb-4">Biểu đồ tiến trình hoàn thành khóa học</h2>
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={data}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="40%"
                                    fill="#8884d8"
                                >
                                    {data.map((_, index) => (
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
                            <LineChart data={data1} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                                data={data2}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />

                                {/* stacked bars */}
                                <Bar dataKey="newUsers" stackId="a" name="Kích hoạt vip" fill="#8884d8" />
                                <Bar dataKey="revenue" stackId="a" name="Người dùng" fill="#ffa726" />
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
