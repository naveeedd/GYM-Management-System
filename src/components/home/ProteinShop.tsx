import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Whey Protein Isolate',
    description: 'High-quality protein with minimal fat and carbs.',
    price: 49.99,
    image: 'https://images.pexels.com/photos/4397838/pexels-photo-4397838.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'protein'
  },
  {
    id: 2,
    name: 'Creatine Monohydrate',
    description: 'Supports muscle strength and power during workouts.',
    price: 29.99,
    image: 'https://images.pexels.com/photos/3838722/pexels-photo-3838722.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'supplement'
  },
  {
    id: 3,
    name: 'Pre-Workout Formula',
    description: 'Boosts energy and focus for intense training sessions.',
    price: 39.99,
    image: 'https://images.pexels.com/photos/5946081/pexels-photo-5946081.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'supplement'
  },
  {
    id: 4,
    name: 'Plant-Based Protein',
    description: 'Complete plant protein blend for vegetarians and vegans.',
    price: 54.99,
    image: 'https://images.pexels.com/photos/868113/pexels-photo-868113.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'protein'
  }
];

const ProteinShop: React.FC = () => {
  const [category, setCategory] = useState<string>('all');
  
  const filteredProducts = category === 'all' 
    ? products 
    : products.filter(product => product.category === category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Protein & Supplements Shop</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Premium quality supplements to maximize your workout results.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            onClick={() => setCategory('all')}
            className={`px-4 py-2 text-sm font-medium rounded-l-md ${
              category === 'all'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-200`}
          >
            All Products
          </button>
          <button
            onClick={() => setCategory('protein')}
            className={`px-4 py-2 text-sm font-medium ${
              category === 'protein'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border-t border-b border-gray-200`}
          >
            Protein
          </button>
          <button
            onClick={() => setCategory('supplement')}
            className={`px-4 py-2 text-sm font-medium rounded-r-md ${
              category === 'supplement'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-200`}
          >
            Supplements
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
              <p className="text-gray-600 text-sm mt-1 h-10">{product.description}</p>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-red-600 font-bold">${product.price}</span>
                <button className="text-white bg-red-600 hover:bg-red-700 rounded-full p-2 transition-colors duration-200">
                  <ShoppingCart className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a 
          href="/login" 
          className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200"
        >
          View All Products
        </a>
      </div>
    </div>
  );
};

export default ProteinShop;