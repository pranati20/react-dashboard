import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const IdentityConfidencePieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/identity_confidence_counts.json')
      .then(response => response.json())
      .then(data => {
        const chartData = Object.keys(data).map((key, index) => ({
          name: key,
          value: data[key]
        }));
        setData(chartData);
      });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="center" align="left" height={20} layout="vertical" />
        </PieChart>
    </ResponsiveContainer>
  );
};

export default IdentityConfidencePieChart;
