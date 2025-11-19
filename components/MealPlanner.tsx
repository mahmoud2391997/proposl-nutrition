import React, { useState } from 'react';
import { UserProfile, MealPlanResponse, DayPlan, Meal } from '../types';
import { generateMealPlan } from '../services/geminiService';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Loader2, CheckCircle, ShoppingCart, ChefHat } from 'lucide-react';

const initialProfile: UserProfile = {
  age: 30,
  gender: 'Female',
  weight: 70,
  height: 165,
  goal: 'Lose Weight',
  dietaryRestrictions: 'None',
  activityLevel: 'Moderate'
};

const COLORS = ['#10b981', '#3b82f6', '#f59e0b']; // Tailwind Emerald, Blue, Amber

const MealPlanner: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<MealPlanResponse | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateMealPlan(profile);
      setPlan(result);
    } catch (error) {
      console.error("Error generating plan:", error);
      alert("Could not generate plan. Please check your API key or try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'weight' || name === 'height' ? Number(value) : value
    }));
  };

  // Helper to calculate daily totals for charts
  const getDailyMacros = (day: DayPlan) => {
    const meals = [day.breakfast, day.lunch, day.dinner, day.snack];
    return [
      { name: 'Protein', value: meals.reduce((acc, m) => acc + (m.macros?.protein || 0), 0) },
      { name: 'Carbs', value: meals.reduce((acc, m) => acc + (m.macros?.carbs || 0), 0) },
      { name: 'Fats', value: meals.reduce((acc, m) => acc + (m.macros?.fats || 0), 0) },
    ];
  };

  const renderMealCard = (title: string, meal: Meal) => (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-emerald-700">{title}</h4>
        <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600 font-mono">
          {meal.macros.calories} kcal
        </span>
      </div>
      <p className="font-medium text-slate-800 mb-1">{meal.name}</p>
      <p className="text-sm text-slate-500 mb-3">{meal.description}</p>
      <div className="flex gap-2 text-xs text-slate-500">
        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded">P: {meal.macros.protein}g</span>
        <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded">C: {meal.macros.carbs}g</span>
        <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded">F: {meal.macros.fats}g</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">AI Smart Meal Planner</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Tell us about yourself, and our Gemini-powered engine will craft a perfectly balanced meal plan just for you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-lg h-fit sticky top-6 border-t-4 border-emerald-500">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-emerald-600" />
            Your Profile
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
                <input type="number" name="age" value={profile.age} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                <select name="gender" value={profile.gender} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Weight (kg)</label>
                <input type="number" name="weight" value={profile.weight} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Height (cm)</label>
                <input type="number" name="height" value={profile.height} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Goal</label>
              <select name="goal" value={profile.goal} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
                <option value="Lose Weight">Lose Weight</option>
                <option value="Maintain Weight">Maintain Weight</option>
                <option value="Gain Muscle">Gain Muscle</option>
                <option value="Boost Energy">Boost Energy</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Activity Level</label>
              <select name="activityLevel" value={profile.activityLevel} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
                <option value="Sedentary">Sedentary</option>
                <option value="Lightly Active">Lightly Active</option>
                <option value="Moderately Active">Moderately Active</option>
                <option value="Very Active">Very Active</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Dietary Restrictions</label>
              <input type="text" name="dietaryRestrictions" value={profile.dietaryRestrictions} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="e.g. Vegan, Gluten Free" />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
                loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" /> Generating Plan...
                </span>
              ) : 'Generate Plan'}
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-8 space-y-8">
          {!plan && !loading && (
            <div className="bg-white p-12 rounded-2xl border-2 border-dashed border-slate-200 text-center flex flex-col items-center justify-center h-full min-h-[400px]">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                <ChefHat className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Ready to Eat Better?</h3>
              <p className="text-slate-500">Fill out your profile on the left to generate a custom 3-day nutrition plan.</p>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center h-[400px] space-y-4">
              <Loader2 className="w-16 h-16 text-emerald-500 animate-spin" />
              <p className="text-slate-600 text-lg animate-pulse">AI is crafting your menu...</p>
            </div>
          )}

          {plan && !loading && (
            <div className="animate-fade-in space-y-8">
              
              {/* Plan Header */}
              <div className="bg-emerald-900 text-white p-6 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-bold mb-2">{plan.planName}</h2>
                <p className="text-emerald-100 leading-relaxed">{plan.summary}</p>
              </div>

              {/* Shopping List */}
              <div className="bg-white p-6 rounded-2xl shadow border border-slate-100">
                 <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-emerald-600" />
                  Shopping List
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                   {plan.shoppingList.map((item, i) => (
                     <div key={i} className="flex items-center gap-2 text-slate-600 bg-slate-50 p-2 rounded">
                       <CheckCircle className="w-4 h-4 text-emerald-400" />
                       <span className="text-sm">{item}</span>
                     </div>
                   ))}
                 </div>
              </div>

              {/* Daily Breakdown */}
              {plan.dailyPlans.map((day, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex items-center justify-between">
                     <h3 className="text-xl font-bold text-slate-800">{day.day}</h3>
                     <span className="text-sm font-medium text-slate-500">~{day.breakfast.macros.calories + day.lunch.macros.calories + day.dinner.macros.calories + day.snack.macros.calories} kcal</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-1 space-y-4">
                      {renderMealCard("Breakfast", day.breakfast)}
                      {renderMealCard("Lunch", day.lunch)}
                    </div>
                    <div className="md:col-span-1 space-y-4">
                      {renderMealCard("Dinner", day.dinner)}
                      {renderMealCard("Snack", day.snack)}
                    </div>
                  </div>

                  {/* Daily Chart */}
                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm h-64">
                     <p className="text-sm font-semibold text-center mb-2 text-slate-600">Daily Macro Breakdown</p>
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={getDailyMacros(day)}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {getDailyMacros(day).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `${value}g`} />
                          <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                     </ResponsiveContainer>
                  </div>
                  
                  {index !== plan.dailyPlans.length - 1 && <hr className="border-slate-200 my-8" />}
                </div>
              ))}

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;