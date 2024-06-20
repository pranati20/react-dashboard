import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

const TopSocialSitesColumnChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} layout="vertical" margin={{ left: 15, right: 40, top: 20, bottom: 20 }}>
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" />
        <Tooltip />
        <Bar dataKey="count" fill="#cc693f">
          <LabelList dataKey="count" position="right" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TopSocialSitesColumnChart;
