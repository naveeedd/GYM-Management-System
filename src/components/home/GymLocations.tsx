import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

const locations = [
  {
    id: 1,
    name: 'FlexFit Downtown',
    address: '123 Main Street, Downtown',
    phone: '(123) 456-7890',
    hours: 'Open 24/7',
    image: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 2,
    name: 'FlexFit Westside',
    address: '456 West Avenue, Westside',
    phone: '(123) 456-7891',
    hours: 'Mon-Sun: 5am - 11pm',
    image: 'https://images.pexels.com/photos/1112392/pexels-photo-1112392.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 3,
    name: 'FlexFit Northgate',
    address: '789 North Blvd, Northgate',
    phone: '(123) 456-7892',
    hours: 'Mon-Sun: 6am - 10pm',
    image: 'https://images.pexels.com/photos/916730/pexels-photo-916730.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

const GymLocations: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Find A Gym Near You</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          With multiple locations across the city, there's always a FlexFit gym nearby.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {locations.map((location) => (
          <div key={location.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 overflow-hidden">
              <img 
                src={location.image} 
                alt={location.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{location.name}</h3>
              
              <div className="flex items-start mt-4">
                <MapPin className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{location.address}</span>
              </div>
              
              <div className="flex items-center mt-3">
                <Phone className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{location.phone}</span>
              </div>
              
              <div className="flex items-center mt-3">
                <Clock className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{location.hours}</span>
              </div>
              
              <a 
                href="#" 
                className="block text-center mt-6 py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200"
              >
                Get Directions
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">Can't find a location near you?</p>
        <a href="#" className="text-red-600 hover:text-red-800 font-medium">
          Contact us to request a new location →
        </a>
      </div>
    </div>
  );
};

export default GymLocations;