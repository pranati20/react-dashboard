import React from 'react';
import { RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const PhoneNetworkRadialBarChart = ({ data }) => {
  // Sort data from more to less
  const sortedData = [...data].sort((a, b) => a.value - b.value);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB', '#FFCE56', '#AAFF00'];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadialBarChart
        cx="50%"
        cy="50%"
        innerRadius="20%"
        outerRadius="110%"
        barSize={20}
        data={sortedData}
        startAngle={180}
        endAngle={0}
      >
        <RadialBar
          minAngle={15}
          label={{ position: 'insideStart', fill: 'black' }}
          background
          clockWise
          dataKey="value"
        >
          {sortedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </RadialBar>
        <Tooltip />
        <Legend />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default PhoneNetworkRadialBarChart;
