
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './chart';

type SkillChartType = 'bar' | 'radar' | 'pie';

interface SkillChartProps {
  data: Array<{ name: string; value: number; color?: string }>;
  type?: SkillChartType;
  height?: number;
  className?: string;
}

export function SkillChart({ 
  data, 
  type = 'bar', 
  height = 300, 
  className 
}: SkillChartProps) {
  const chartConfig = {
    primary: { theme: { light: '#4f46e5', dark: '#4f46e5' } },
    secondary: { theme: { light: '#06b6d4', dark: '#06b6d4' } },
    muted: { theme: { light: '#9ca3af', dark: '#9ca3af' } },
  };

  const COLORS = ['#4f46e5', '#06b6d4', '#8b5cf6', '#10b981', '#f97316', '#f43f5e'];

  const renderChart = () => {
    switch (type) {
      case 'radar':
        return (
          <RadarChart outerRadius={90} width={500} height={height} data={data}>
            <PolarGrid strokeOpacity={0.2} />
            <PolarAngleAxis dataKey="name" tick={{ fill: '#e2e8f0', fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#e2e8f0' }} />
            <Radar
              name="Skills"
              dataKey="value"
              stroke="#4f46e5"
              fill="#4f46e5"
              fillOpacity={0.6}
            />
            <Legend />
          </RadarChart>
        );

      case 'pie':
        return (
          <PieChart width={500} height={height}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        );

      case 'bar':
      default:
        return (
          <BarChart
            width={500}
            height={height}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
            <XAxis dataKey="name" tick={{ fill: '#e2e8f0' }} />
            <YAxis tick={{ fill: '#e2e8f0' }} />
            <ChartTooltip />
            <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
    }
  };

  return (
    <ChartContainer className={className} config={chartConfig}>
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </ChartContainer>
  );
}
