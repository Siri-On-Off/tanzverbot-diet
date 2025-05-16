export enum Sex {
  Male = "m",
  Female = "f",
}

interface FoodItem {
  name: string;
  caloriesPerServing: number;
  servings: number;
}

const foodItems: FoodItem[] = [
  { name: "Kellogg's Tresor", caloriesPerServing: 137, servings: 4 },
  { name: "Weihenstephan Haltbare Milch", caloriesPerServing: 64, servings: 8 },
  { name: "Mühle Frikadellen", caloriesPerServing: 271, servings: 4 },
  { name: "Volvic Tee", caloriesPerServing: 40, servings: 12 },
  {
    name: "Neuburger lockerer Sahnepudding",
    caloriesPerServing: 297,
    servings: 1,
  },
  { name: "Lagnese Viennetta", caloriesPerServing: 125, servings: 6 },
  { name: "Schöller 10ForTwo", caloriesPerServing: 482, servings: 2 },
  { name: "Ristorante Pizza Salame", caloriesPerServing: 835, servings: 2 },
  { name: "Schweppes Ginger Ale", caloriesPerServing: 37, servings: 25 },
  { name: "Mini Babybel", caloriesPerServing: 59, servings: 20 },
];

const foodNames = foodItems.map((item) => item.name);
const foodCalories = foodItems.map((item) => item.caloriesPerServing);
const foodServings = foodItems.map((item) => item.servings);

const MIN_AGE_FOR_DIET = 16;
const MIN_HEIGHT_M_FOR_DIET = 1.5;
const CALORIES_PER_KG_FAT = 9000;
const METERS_TO_CM_FACTOR = 100;

const harrisBenedictCoefficients = {
  [Sex.Male]: {
    base: 66.47,
    weightFactor: 13.7,
    heightFactor: 5.003,
    ageFactor: 6.75,
  },
  [Sex.Female]: {
    base: 655.1,
    weightFactor: 9.563,
    heightFactor: 1.85,
    ageFactor: 4.676,
  },
};

export function calcDateOnDiet(
  currentWeightKg: number,
  targetWeightKg: number,
  heightM: number,
  ageY: number,
  sex: Sex
): number {
  const weightGainKg = targetWeightKg - currentWeightKg;

  if (weightGainKg < 0) {
    throw new Error(`This diet is for gaining weight, not loosing it!`);
  }

  if (ageY < MIN_AGE_FOR_DIET || heightM < MIN_HEIGHT_M_FOR_DIET) {
    throw new Error(`You do not qualify for this kind of diet.`);
  }

  let dailyCaloriesOnDiet = 0;
  for (const index in foodNames) {
    const calories = foodCalories[index] || 0;
    const servings = foodServings[index] || 0;
    dailyCaloriesOnDiet += calories * servings;
  }

  const coefficients = harrisBenedictCoefficients[sex];

  const dailyCaloriesBasicMetabolicRate = calculateBMR(
    currentWeightKg,
    heightM,
    ageY,
    sex
  );

  const dailyExcessCalories =
    dailyCaloriesOnDiet - dailyCaloriesBasicMetabolicRate;

  if (dailyExcessCalories <= 0) {
    throw new Error("This diet is not sufficient for you to gain weight.");
  }

  const estimatedDays = Math.ceil(
    (CALORIES_PER_KG_FAT * weightGainKg) / dailyExcessCalories
  );

  return estimatedDays;
}

function calculateBMR(
  currentWeightKg: number,
  heightM: number,
  ageY: number,
  sex: Sex
): number {
  const coefficients = harrisBenedictCoefficients[sex];

  const bmr =
    coefficients.base +
    coefficients.weightFactor * currentWeightKg +
    coefficients.heightFactor * (heightM * METERS_TO_CM_FACTOR) -
    coefficients.ageFactor * ageY;

  return Math.ceil(bmr);
}
