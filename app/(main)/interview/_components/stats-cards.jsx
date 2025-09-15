import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, Trophy } from 'lucide-react'
import React from 'react'

const StatsCards = ({ assessments }) => {
  const getAverageScore = () => {
    if (!assessments?.length) return 0
    const total = assessments.reduce(
      (sum, assessment) => sum + assessment.quizScore,
      0
    )
    return (total / assessments.length).toFixed(1)
  }

  const getLatestAssessment = () => {
    if (!assessments?.length) return null
    return assessments[0]
  }

  const getTotalQuestions = () => {
    if (!assessments?.length) return 0
    return assessments.reduce(
      (sum, assessment) => sum + assessment.questions.length,
      0
    )
  }

  return (
    <div className='grid gap-4 md:grid-cols-3'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0'>
          <CardTitle className='text-md font-medium'>Average Score</CardTitle>
          <Trophy className='h-6 w-6 text-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-3xl font-bold'>{getAverageScore()}%</div>
          <p className='text-xs text-foreground'>Across all assessments</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0'>
          <CardTitle className='text-md font-medium'>Questions Practiced</CardTitle>
          <Brain className='h-6 w-6 text-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-3xl font-bold'>{getTotalQuestions()}</div>
          <p className='text-xs text-foreground'>Total questions</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0'>
          <CardTitle className='text-md font-medium'>Latest Score</CardTitle>
          <Trophy className='h-6 w-6 text-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-3xl font-bold'>{getLatestAssessment()?.quizScore.toFixed(1) || 0}%</div>
          <p className='text-xs text-foreground'>Most recent quiz</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default StatsCards
