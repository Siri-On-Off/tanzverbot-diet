
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
  { name: "Neuburger lockerer Sahnepudding", caloriesPerServing: 297, servings: 1 },
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

export function calcDateOnDiet(
  currentWeightKg: number,
  targetWeightKg: number,
  heightM: number,
  ageY: number,
  sex: Sex,
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
let dailyCaloriesBasicMetabolicRate = 0;
  if (sex == Sex.Male) {
    dailyCaloriesBasicMetabolicRate = Math.ceil(
      // Harris-Benedict-Formula (Male)
      66.47 + 13.7 * currentWeightKg + 5.003 * heightM * METERS_TO_CM_FACTOR - 6.75 * ageY,
    );
  } else {
dailyCaloriesBasicMetabolicRate = Math.ceil(
    // Harris-Benedict-Formula (Female)
      655.1 + 9.563 * currentWeightKg + 1.85 * heightM * METERS_TO_CM_FACTOR - 4.676 * ageY,
  );
}
  const dailyExcessCalories =
dailyCaloriesOnDiet - dailyCaloriesBasicMetabolicRate;
  if (dailyExcessCalories <= 0) {
    throw new Error("This diet is not sufficient for you to gain weight.");
  }
  const estimatedDays = Math.ceil((CALORIES_PER_KG_FAT * weightGainKg) / dailyExcessCalories);
  
  return estimatedDays;
}
