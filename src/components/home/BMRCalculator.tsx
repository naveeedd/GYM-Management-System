import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

const BMRCalculator: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [activityLevel, setActivityLevel] = useState<string>('1.2');
  const [bmr, setBmr] = useState<number | null>(null);
  const [tdee, setTdee] = useState<number | null>(null);

  const calculateBMR = () => {
    if (!age || !weight || !height) return;

    const ageNum = parseInt(age);
    const weightNum = parseInt(weight);
    const heightNum = parseInt(height);
    const activityNum = parseFloat(activityLevel);

    let calculatedBMR;

    if (gender === 'male') {
      calculatedBMR = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      calculatedBMR = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }

    setBmr(Math.round(calculatedBMR));
    setTdee(Math.round(calculatedBMR * activityNum));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">BMR Calculator</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) to help plan your diet.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-4xl mx-auto">
        <div className="md:flex">
          <div className="bg-red-600 text-white p-6 md:w-1/3 flex items-center justify-center">
            <div className="text-center">
              <Calculator className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Personalized Results</h3>
              <p className="text-sm opacity-90">
                Your BMR represents the minimum caloric intake needed to sustain your body at rest. TDEE includes your daily activities.
              </p>
            </div>
          </div>

          <div className="p-6 md:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <div className="flex">
                  <button
                    type="button"
                    className={`flex-1 py-2 px-4 rounded-l-md ${
                      gender === 'male' 
                        ? 'bg-red-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    } transition-colors duration-200`}
                    onClick={() => setGender('male')}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    className={`flex-1 py-2 px-4 rounded-r-md ${
                      gender === 'female' 
                        ? 'bg-red-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    } transition-colors duration-200`}
                    onClick={() => setGender('female')}
                  >
                    Female
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                  Age (years)
                </label>
                <input
                  id="age"
                  type="number"
                  min="15"
                  max="100"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="e.g., 30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  id="weight"
                  type="number"
                  min="30"
                  max="250"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="e.g., 70"
                />
              </div>

              <div>
                <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                  Height (cm)
                </label>
                <input
                  id="height"
                  type="number"
                  min="100"
                  max="250"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="e.g., 175"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="activity" className="block text-sm font-medium text-gray-700 mb-1">
                Activity Level
              </label>
              <select
                id="activity"
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="1.2">Sedentary (little or no exercise)</option>
                <option value="1.375">Lightly active (light exercise 1-3 days/week)</option>
                <option value="1.55">Moderately active (moderate exercise 3-5 days/week)</option>
                <option value="1.725">Very active (hard exercise 6-7 days/week)</option>
                <option value="1.9">Extra active (very hard exercise, physical job or training twice a day)</option>
              </select>
            </div>

            <button
              onClick={calculateBMR}
              className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors duration-200"
            >
              Calculate
            </button>

            {bmr !== null && tdee !== null && (
              <div className="mt-6 p-4 bg-gray-50 rounded-md">
                <h4 className="font-semibold text-lg text-gray-900 mb-2">Your Results:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Basal Metabolic Rate (BMR):</p>
                    <p className="text-2xl font-bold text-red-600">{bmr} calories/day</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Daily Energy Expenditure (TDEE):</p>
                    <p className="text-2xl font-bold text-red-600">{tdee} calories/day</p>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">For weight loss:</span> Consume {Math.round(tdee * 0.8)} calories/day
                  </p>
                  <p>
                    <span className="font-medium">For weight gain:</span> Consume {Math.round(tdee * 1.15)} calories/day
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMRCalculator;