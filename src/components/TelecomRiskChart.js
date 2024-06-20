import React from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

const TelecomRiskChart = ({ data }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const pieData = data.reduce((acc, row) => {
    const existing = acc.find(d => d.name === row.city);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: row.city, value: 1 });
    }
    return acc;
  }, []);

  return (
    <PieChart width={200} height={400}>
      <Pie
        data={pieData}
        cx={200}
        cy={200}
        labelLine={false}
        label={({ name, value }) => `${name}: ${value}`}
        outerRadius={80}
        fill="#8884d8"
      >
        {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default TelecomRiskChart;
