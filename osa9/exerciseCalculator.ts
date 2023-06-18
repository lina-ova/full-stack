interface Result {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}

const calculateExercises = (
    exerciseHours: number[],
    target: number
): Result => {
    const periodLength = exerciseHours.length;
    const trainingDays = exerciseHours.filter((hours) => hours > 0).length;
    const totalHours = exerciseHours.reduce((sum, hours) => sum + hours, 0);
    const average = totalHours / periodLength;
    const success = average >= target;

    let rating;
    let ratingDescription;
    if (average >= target) {
        rating = 3;
        ratingDescription = "excellent";
    } else if (average >= target * 0.5) {
        rating = 2;
        ratingDescription = "not too bad but could be better";
    } else {
        rating = 1;
        ratingDescription = "you should try harder";
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

const parseArguments = (
    args: string[]
): { exerciseHours: number[]; target: number } => {
    if (args.length < 3)
        throw new Error(
            "Not enough arguments. Usage: npm run calculateExercises <target hours> <exercise hours...>"
        );

    const target = Number(args[2]);
    const exerciseHours = args.slice(3).map(Number);

    if (isNaN(target) || exerciseHours.some(isNaN)) {
        throw new Error(
            "Invalid arguments. Target hours and exercise hours must be numbers."
        );
    }

    return { exerciseHours, target };
};

try {
    const { exerciseHours, target } = parseArguments(process.argv);
    console.log(calculateExercises(exerciseHours, target));
} catch (error) {
    if (error instanceof Error) console.error(error.message);
    else console.log(error);
}

export default calculateExercises;
