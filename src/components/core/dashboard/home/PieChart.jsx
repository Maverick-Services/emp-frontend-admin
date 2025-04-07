import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
    { name: "In Progress", value: 5 },
    { name: "Pending Tasks", value: 9 },
    { name: "Tasks Completed", value: 40 },
];

const COLORS = [
    "#EFF4FB",
    "#6AD2FF",
    "#4318FF",
];

const CustomPieChart = () => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    fill="#8884d"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CustomPieChart;
