
import React, { useState } from 'react';
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
  Sector,
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './chart';
import { motion, AnimatePresence } from 'framer-motion';

type SkillChartType = 'bar' | 'radar' | 'pie';

interface SkillChartProps {
  data: Array<{ name: string; value: number; color?: string }>;
  type?: SkillChartType;
  height?: number;
  className?: string;
  interactive?: boolean;
}

export function SkillChart({ 
  data, 
  type = 'bar', 
  height = 300, 
  className,
  interactive = true
}: SkillChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [chartType, setChartType] = useState<SkillChartType>(type);
  
  const chartConfig = {
    primary: { theme: { light: '#4f46e5', dark: '#4f46e5' } },
    secondary: { theme: { light: '#06b6d4', dark: '#06b6d4' } },
    muted: { theme: { light: '#9ca3af', dark: '#9ca3af' } },
  };

  const COLORS = ['#4f46e5', '#06b6d4', '#8b5cf6', '#10b981', '#f97316', '#f43f5e'];

  const handlePieEnter = (_, index: number) => {
    setActiveIndex(index);
  };

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    
    return (
      <g>
        <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill="#e2e8f0" fontSize={14}>
          {payload.name}
        </text>
        <text x={cx} y={cy + 10} dy={8} textAnchor="middle" fill="#e2e8f0" fontSize={12}>
          {`${value} (${(percent * 100).toFixed(0)}%)`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 8}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          opacity={0.8}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 10}
          outerRadius={outerRadius + 12}
          fill={fill}
          opacity={0.6}
        />
      </g>
    );
  };

  const renderChart = () => {
    switch (chartType) {
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
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={interactive ? 60 : 0}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={interactive ? handlePieEnter : undefined}
              labelLine={!interactive}
              label={!interactive ? ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%` : undefined}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color || COLORS[index % COLORS.length]} 
                  className="transition-all duration-300" 
                />
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
            <Bar 
              dataKey="value" 
              radius={[4, 4, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={entry.color || COLORS[index % COLORS.length]}
                  className="transition-all duration-300 hover:opacity-80"
                />
              ))}
            </Bar>
          </BarChart>
        );
    }
  };

  return (
    <div className={`${className} space-y-4`}>
      {interactive && (
        <div className="flex justify-center gap-3 mb-2">
          {(['bar', 'radar', 'pie'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setChartType(type)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                chartType === type 
                  ? 'bg-accent text-white shadow-md' 
                  : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={chartType}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <ChartContainer className={className} config={chartConfig}>
            <ResponsiveContainer width="100%" height={height}>
              {renderChart()}
            </ResponsiveContainer>
          </ChartContainer>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
