import React from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';

const TelecomRiskPieChart = ({ data }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const pieData = data.reduce((acc, row) => {
    const existing = acc.find(d => d.name === row.telecomRisk);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: row.telecomRisk, value: 1 });
    }
    return acc;
  }, []);

  return (
    <ResponsiveContainer width="80%" height={200}>
      <PieChart margin={{ left: 140, right: 30, top: 20, bottom: 20 }}>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => `${name}: ${value}`}
          outerRadius={70}
          fill="#8884d8"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TelecomRiskPieChart;
