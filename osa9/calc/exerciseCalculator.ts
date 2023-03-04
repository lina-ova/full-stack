interface TrainValues {
  target: number;
  exercises: number[];
}
interface Training { 
  periodLength: number,
  trainingDays: number,
  success: Boolean,
  rating: number,
  ratingDescription: string
  target: number,
  average: number }

const Arguments = (args: string[]): TrainValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (!isNaN(Number(args[2])) && args.slice(3).every(e => !isNaN(Number(e)))) {
    return {
      target: Number(args[2]),
      exercises: args.slice(3).map(a => Number(a))
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateExercises = (daily: number[], target:number) :Training=> {
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

try {
  const { target, exercises } = Arguments(process.argv);
  console.log(calculateExercises(exercises, target))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
