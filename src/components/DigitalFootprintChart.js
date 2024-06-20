import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const DigitalFootprintChart = ({ data }) => {
  return (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="digitalFootprint" stroke="#82ca9d" />
    </LineChart>
  );
};

export default DigitalFootprintChart;
