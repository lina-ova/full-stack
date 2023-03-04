interface BmiValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (a: number, b: number) :string=> {
  const bmi = b/((a/100)**2)
  if (bmi <16) return "Underweight (Severe thinness)"
  if (bmi <=16.9) return "Underweight (Moderate thinness)"
  if (bmi <=18.4) return "Underweight (Mild thinness)"
  if (bmi <=24.9) return "Normal range"
  if (bmi <=29.9) return "Overweight (Pre-obese)"
  if (bmi <=34.9) return "Obese (Class I)"
  if (bmi <=39.9) return "Obese (Class II)"
  return "Obese (Class III)"
}

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}