const calculateBmi = (a: number, b: number) => {
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

console.log(calculateBmi(180, 74))
