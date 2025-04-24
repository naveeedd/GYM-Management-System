import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Dumbbell, Plus, Trash2, Edit2, Save } from 'lucide-react';

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

interface Workout {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
  schedule: {
    days: string[];
    time: string;
  };
}

const UserWorkout: React.FC = () => {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const { data, error } = await supabase
        .from('workouts')
        .select('*')
        .eq('user_id', user?.id);

      if (error) throw error;

      setWorkouts(data || []);
    } catch (err) {
      console.error('Error fetching workouts:', err);
      setError('Failed to load workouts');
    } finally {
      setLoading(false);
    }
  };

  const addWorkout = async (workout: Omit<Workout, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('workouts')
        .insert([
          {
            ...workout,
            user_id: user?.id
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setWorkouts([...workouts, data]);
    } catch (err) {
      console.error('Error adding workout:', err);
      setError('Failed to add workout');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Dumbbell className="h-8 w-8 text-red-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">My Workouts</h1>
        <p className="text-gray-600">
          Create and manage your personalized workout routines.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {workout.name}
              </h3>
              <p className="text-gray-600 mb-4">{workout.description}</p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Exercises:</h4>
                  <ul className="space-y-2">
                    {workout.exercises.map((exercise, index) => (
                      <li
                        key={index}
                        className="text-gray-600 flex items-center justify-between"
                      >
                        <span>{exercise.name}</span>
                        <span>
                          {exercise.sets}x{exercise.reps} @ {exercise.weight}kg
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Schedule:</h4>
                  <p className="text-gray-600">
                    {workout.schedule.days.join(', ')} at {workout.schedule.time}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-2">
                <button className="p-2 text-gray-600 hover:text-red-600">
                  <Edit2 className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-red-600">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={() => {
            // Open add workout modal or form
          }}
          className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-gray-500 hover:text-red-600 hover:border-red-600 transition-colors duration-300"
        >
          <Plus className="h-12 w-12 mb-2" />
          <span className="font-medium">Add New Workout</span>
        </button>
      </div>
    </div>
  );
};

export default UserWorkout;