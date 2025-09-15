'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

const PerformanceChart = ({ assessments }) => {
  const [chartData, setChartData] = useState([])

  console.log('Assessments received:', assessments);

  useEffect(() => {
    if (assessments && assessments.length > 0) {
      console.log('Processing assessments:', assessments);
      const formattedData = assessments.map(assessment => ({
        date: format(new Date(assessment.createdAt), 'MMM dd'),
        score: assessment.quizScore
      }))
      console.log('Formatted chart data:', formattedData);
      setChartData(formattedData)
    }
  }, [assessments])
  return (
    <Card className='bg-dark'>
      <CardHeader>
        <CardTitle className='gradient-title text-3xl md:text-4xl'>
          Performance Chart
        </CardTitle>
        <CardDescription className='text-foreground'>
          Your quiz scores over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='h-[300px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray='3 3' stroke='#374151' opacity={0.6} />
              <XAxis dataKey='date' stroke='#9ca3af' />
              <YAxis domain={[0, 100]} stroke='#9ca3af' />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className='bg-background border rounded-lg p-2 shadow-md'>
                        <p className='text-sm font-medium'>
                          Score: {payload[0].value}%
                        </p>
                        <p className='text-xs text-muted-foreground'>
                          Date: {label}
                        </p>
                      </div>
                    )
                  }
                  return null;
                }}
              />
              <Line
                type='monotone'
                dataKey='score'
                stroke='#ffffff'
                strokeWidth={3}
                dot={{ fill: '#ffffff', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#ffffff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default PerformanceChart
