const calculateBmi = (height: number, weight: number) => {
  const index = weight / ((height / 100) ** 2);

  if (index<16) return "Underweight (Severe thinness)";
  else if (index<17) return "Underweight (Moderate thinness)";
  else if (index<18.5) return "Underweight (Mild thinness)";
  else if (index<25) return "Normal range";
  else if (index<30) return "Overweight (Pre-obese)";
  else if (index<35) return "Obese (Class I)";
  else if (index<40) return "Obese (Class II)";
  else return "Obese (Class III)";
};

const parseWeightHeight = (args: string[]): { height: number; weight: number } => {
  if (args.length !==4) throw new Error('Not enough arguments. Usage: npm run calculateBmi <height in cm> <weight in kg>');

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error('Invalid arguments. Height and weight must be numbers.');
  }

  return { height, weight };
};

try {
  const { height, weight } = parseWeightHeight(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error) {
    if (error instanceof Error)   console.error(error.message);
    else console.log(error);
}

export default calculateBmi;
