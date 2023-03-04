interface Training { 
  periodLength: number,
  trainingDays: number,
  success: Boolean,
  rating: number,
  ratingDescription: string
  target: number,
  average: number }

const calculateExercises = (daily: number[], target:number) :Training=> {
  let yours : Training
  let periodLength = daily.length
  let trainingDays = daily.filter(e => e >0).length
  let average = daily.reduce((a, b)=>(a + b))/periodLength
  let success = average >= target

  let rating=1
  let ratingDescription = 'I know you can do better'
  
  if (success) {
    rating= 3
    ratingDescription = 'nice job done!'
  }
  if (target-average < 1) {
    rating=2
    ratingDescription = 'not too bad but could be better'
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
