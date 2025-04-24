import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const UserPlans: React.FC = () => {
  // Mock data - replace with actual data from your backend
  const plans = [
    {
      name: 'Basic',
      price: '$29.99',
      period: 'per month',
      features: [
        'Access to gym equipment',
        'Basic workout plans',
        'Standard locker access',
        'Limited group classes',
        'No personal trainer',
        'No nutrition plan'
      ],
      current: false
    },
    {
      name: 'Premium',
      price: '$49.99',
      period: 'per month',
      features: [
        'Access to all equipment',
        'Custom workout plans',
        'Premium locker access',
        'Unlimited group classes',
        'Personal trainer (2 sessions)',
        'Basic nutrition plan'
      ],
      current: true
    },
    {
      name: 'Elite',
      price: '$79.99',
      period: 'per month',
      features: [
        'Access to all equipment',
        'Custom workout plans',
        'Premium locker access',
        'Unlimited group classes',
        'Personal trainer (4 sessions)',
        'Custom nutrition plan'
      ],
      current: false
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Membership Plans</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div 
            key={index}
            className={`bg-white rounded-lg shadow-lg p-6 ${
              plan.current ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
              <div className="text-3xl font-bold text-blue-600">{plan.price}</div>
              <div className="text-gray-500">{plan.period}</div>
              {plan.current && (
                <div className="mt-2">
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Current Plan
                  </span>
                </div>
              )}
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start">
                  {feature.startsWith('No') ? (
                    <XCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  )}
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            {!plan.current && (
              <button
                className={`w-full py-2 px-4 rounded-lg font-semibold ${
                  plan.name === 'Elite'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                } transition duration-300`}
              >
                {plan.name === 'Elite' ? 'Upgrade Now' : 'Switch Plan'}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Plan Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Premium Features</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>24/7 Gym Access</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Personal Training Sessions</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Nutrition Consultation</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Additional Perks</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Free Towel Service</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Locker Access</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Group Classes</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPlans;
