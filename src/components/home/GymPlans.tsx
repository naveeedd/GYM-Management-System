import React from 'react';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    id: 1,
    name: 'Basic',
    price: 29.99,
    period: 'month',
    description: 'Perfect for beginners starting their fitness journey',
    features: [
      { name: 'Gym access (6 AM - 10 PM)', included: true },
      { name: 'Basic fitness equipment', included: true },
      { name: 'Locker room access', included: true },
      { name: 'Personal trainer session', included: false },
      { name: 'Access to fitness classes', included: false },
      { name: 'Nutrition consultation', included: false },
    ],
    popular: false,
    cta: 'Get Started'
  },
  {
    id: 2,
    name: 'Premium',
    price: 49.99,
    period: 'month',
    description: 'Our most popular plan for dedicated fitness enthusiasts',
    features: [
      { name: 'Gym access 24/7', included: true },
      { name: 'Full access to equipment', included: true },
      { name: 'Locker room access', included: true },
      { name: '2 Personal trainer sessions', included: true },
      { name: 'Access to fitness classes', included: true },
      { name: 'Nutrition consultation', included: false },
    ],
    popular: true,
    cta: 'Get Premium'
  },
  {
    id: 3,
    name: 'Elite',
    price: 79.99,
    period: 'month',
    description: 'Ultimate fitness experience with premium perks',
    features: [
      { name: 'Gym access 24/7', included: true },
      { name: 'Full access to equipment', included: true },
      { name: 'Locker room access with towel service', included: true },
      { name: '4 Personal trainer sessions', included: true },
      { name: 'Unlimited fitness classes', included: true },
      { name: 'Monthly nutrition consultation', included: true },
    ],
    popular: false,
    cta: 'Go Elite'
  }
];

const GymPlans: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Membership Plans</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Choose the perfect membership plan that fits your fitness goals and budget.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={`relative rounded-lg overflow-hidden border ${
              plan.popular ? 'border-red-500' : 'border-gray-200'
            } shadow-lg transition-transform duration-300 hover:transform hover:-translate-y-2`}
          >
            {plan.popular && (
              <div className="absolute top-0 inset-x-0 text-center bg-red-500 text-white text-sm py-1 font-medium">
                Most Popular
              </div>
            )}
            
            <div className={`p-6 ${plan.popular ? 'pt-10' : ''}`}>
              <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              <p className="text-gray-600 mt-2 h-12">{plan.description}</p>
              
              <div className="mt-4 flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                <span className="text-gray-600 ml-1">/{plan.period}</span>
              </div>
              
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    ) : (
                      <X className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                    )}
                    <span className={feature.included ? 'text-gray-800' : 'text-gray-500'}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                <Link
                  to="/register"
                  className={`block w-full py-3 px-6 text-center rounded-md font-medium transition-colors duration-200 ${
                    plan.popular
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">Looking for corporate or family plans?</p>
        <a href="#" className="text-red-600 hover:text-red-800 font-medium">
          Contact us for special rates →
        </a>
      </div>
    </div>
  );
};

export default GymPlans;