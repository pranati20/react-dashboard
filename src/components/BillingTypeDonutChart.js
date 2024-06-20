import React from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';

const BillingTypeDonutChart = ({ data }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <ResponsiveContainer width="70%" height={210}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default BillingTypeDonutChart;
