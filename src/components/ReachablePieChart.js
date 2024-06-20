import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F'];

const ReachablePieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/reachable_counts.json')
      .then(response => response.json())
      .then(data => {
        const chartData = Object.keys(data).map((key, index) => ({
          name: key === "true" ? "Reachable" : key === "false" ? "Non-Reachable" : key,
          value: data[key]
        }));
        setData(chartData);
      });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={170}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={60}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend align='left' verticalAlign='center' height={10} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ReachablePieChart;
