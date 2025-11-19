export enum ViewState {
  HOME = 'HOME',
  MEAL_PLANNER = 'MEAL_PLANNER',
  COACHING = 'COACHING',
  BLOG = 'BLOG'
}

export interface UserProfile {
  age: number;
  gender: string;
  weight: number; // kg
  height: number; // cm
  goal: string; // e.g., 'weight loss', 'muscle gain'
  dietaryRestrictions: string; // e.g., 'vegan', 'gluten-free'
  activityLevel: string;
}

export interface MacroNutrients {
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
}

export interface Meal {
  name: string;
  description: string;
  macros: MacroNutrients;
}

export interface DayPlan {
  day: string;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snack: Meal;
}

export interface MealPlanResponse {
  planName: string;
  summary: string;
  dailyPlans: DayPlan[];
  shoppingList: string[];
}

export interface Coach {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  rate: number;
  imageUrl: string;
  availableSlots: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  author: string;
  date: string;
  tags: string[];
}