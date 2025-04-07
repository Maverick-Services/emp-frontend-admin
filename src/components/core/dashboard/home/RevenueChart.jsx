import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { month: 'Jan', revenue: 4000, profit: 2400 },
    { month: 'Feb', revenue: 3000, profit: 4098 },
    { month: 'Mar', revenue: 9800, profit: 4000 },
    { month: 'Apr', revenue: 3908, profit: 5780 },
    { month: 'May', revenue: 4800, profit: 1890 },
    { month: 'Jun', revenue: 6800, profit: 9390 },
];

const RevenueChart = () => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <defs>
                    <filter id="shadow" x="-20%" y="-20%" width="150%" height="150%">
                        <feDropShadow dx="4" dy="9" stdDeviation="12" floodColor="rgb(174, 174, 232)" />
                    </filter>
                </defs>

                <XAxis dataKey="month" stroke="#A0AEC0" fontSize={12} />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3182CE"
                    strokeWidth={6}
                    dot={false}
                    activeDot={{ r: 6 }}
                    filter="url(#shadow)"
                />
                <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="#56C3FF"
                    strokeWidth={6}
                    dot={false}
                    activeDot={{ r: 6 }}
                    filter="url(#shadow)"
                />
            </LineChart>
        </ResponsiveContainer>

    );
};


export default RevenueChart;