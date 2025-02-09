import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PieChartComponent = ({ data }) => {
    const chartData = data.map((item, index) => ({
        name: item.status,
        value: item.count,
        color: COLORS[index % COLORS.length],
    }));

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-lg font-bold text-white mb-2">Task Status Distribution</h2>
            <PieChart width={400} height={400}>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    dataKey="value"
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};

export default PieChartComponent;
