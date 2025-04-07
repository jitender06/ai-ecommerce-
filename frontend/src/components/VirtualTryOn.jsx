import { useState, useEffect } from 'react';

export default function VirtualTryOn() {
  // State to track which products are being worn
  const [wornItems, setWornItems] = useState({
    shirt: null,
    pants: null,
    shoes: null
  });
  
  // Sample product data
  const products = {
    shirts: [
      { id: 's1', name: 'Blue T-Shirt', color: '#3b82f6', secondaryColor: '#2563eb', image: '/api/placeholder/100/100' },
      { id: 's2', name: 'Red T-Shirt', color: '#ef4444', secondaryColor: '#dc2626', image: '/api/placeholder/100/100' },
      { id: 's3', name: 'Green T-Shirt', color: '#10b981', secondaryColor: '#059669', image: '/api/placeholder/100/100' }
    ],
    pants: [
      { id: 'p1', name: 'Black Jeans', color: '#1f2937', secondaryColor: '#111827', image: '/api/placeholder/100/100' },
      { id: 'p2', name: 'Blue Jeans', color: '#1e40af', secondaryColor: '#1e3a8a', image: '/api/placeholder/100/100' }
    ],
    shoes: [
      { id: 'sh1', name: 'White Sneakers', color: '#f9fafb', secondaryColor: '#f3f4f6', image: '/api/placeholder/100/100' },
      { id: 'sh2', name: 'Black Boots', color: '#111827', secondaryColor: '#030712', image: '/api/placeholder/100/100' }
    ]
  };

  // Handler to select a product
  const handleProductSelect = (category, product) => {
    setWornItems(prev => ({
      ...prev,
      [category]: product
    }));
  };
  
  // Add slight animation to make avatar appear more lifelike
  const [breatheState, setBreatheState] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBreatheState(prev => (prev + 1) % 100);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  const breatheOffset = Math.sin(breatheState / 16) * 2;

  return (
    <div className="flex flex-col md:flex-row w-full gap-6 p-4">
      {/* Avatar display area */}
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">Virtual Try-On</h2>
        <div className="relative w-72 h-96 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg shadow-lg overflow-hidden">
          {/* SVG Avatar */}
          <svg 
            viewBox="0 0 200 300" 
            width="100%" 
            height="100%" 
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0"
          >
            {/* Background shadow for depth */}
            <ellipse cx="100" cy="280" rx="40" ry="10" fill="rgba(0,0,0,0.1)" />
            
            {/* Legs */}
            <g transform="translate(0,2)">
              {/* Left leg */}
              <path 
                d={`M85,165 Q85,240 80,280 Q83,282 87,282 Q92,240 95,165 Z`} 
                fill={wornItems.pants ? wornItems.pants.color : '#d1d5db'} 
                stroke="#374151" 
                strokeWidth="0.5"
              />
              
              {/* Right leg */}
              <path 
                d={`M115,165 Q115,240 120,280 Q117,282 113,282 Q108,240 105,165 Z`} 
                fill={wornItems.pants ? wornItems.pants.color : '#d1d5db'} 
                stroke="#374151" 
                strokeWidth="0.5"
              />
              
              {/* Pants details */}
              {wornItems.pants && (
                <>
                  <path 
                    d="M85,165 Q90,164 95,165 L95,190 Q90,191 85,190 Z" 
                    fill={wornItems.pants.secondaryColor} 
                    opacity="0.6" 
                  />
                  <path 
                    d="M115,165 Q110,164 105,165 L105,190 Q110,191 115,190 Z" 
                    fill={wornItems.pants.secondaryColor} 
                    opacity="0.6" 
                  />
                </>
              )}
              
              {/* Shoes */}
              <path 
                d={`M75,280 Q77,282 87,282 L80,290 Q70,290 70,285 Z`} 
                fill={wornItems.shoes ? wornItems.shoes.color : '#9ca3af'} 
                stroke="#374151" 
                strokeWidth="0.5"
              />
              <path 
                d={`M125,280 Q123,282 113,282 L120,290 Q130,290 130,285 Z`} 
                fill={wornItems.shoes ? wornItems.shoes.color : '#9ca3af'} 
                stroke="#374151" 
                strokeWidth="0.5"
              />
              
              {/* Shoe details */}
              {wornItems.shoes && (
                <>
                  <path 
                    d="M78,285 L84,285" 
                    stroke={wornItems.shoes.secondaryColor} 
                    strokeWidth="1.5" 
                  />
                  <path 
                    d="M122,285 L116,285" 
                    stroke={wornItems.shoes.secondaryColor} 
                    strokeWidth="1.5" 
                  />
                </>
              )}
            </g>
            
            {/* Torso/Shirt - with breathing animation */}
            <g transform={`translate(0,${breatheOffset})`}>
              {/* Base torso */}
              <path 
                d={`M85,90 Q100,85 115,90 L115,165 Q100,170 85,165 Z`} 
                fill={wornItems.shirt ? wornItems.shirt.color : '#e5e7eb'} 
                stroke="#374151" 
                strokeWidth="0.5"
              />
              
              {/* Shirt collar */}
              <path 
                d="M92,90 L100,95 L108,90" 
                fill="none" 
                stroke={wornItems.shirt ? wornItems.shirt.secondaryColor : '#9ca3af'} 
                strokeWidth="1.5"
              />
              
              {/* Shirt details */}
              {wornItems.shirt && (
                <>
                  <path 
                    d="M95,105 L105,105" 
                    stroke={wornItems.shirt.secondaryColor} 
                    strokeWidth="1" 
                  />
                  <path 
                    d="M90,120 L110,120" 
                    stroke={wornItems.shirt.secondaryColor} 
                    strokeWidth="0.8" 
                  />
                </>
              )}
              
              {/* Arms */}
              <path 
                d={`M85,90 Q75,100 70,140 Q72,142 75,142 Q80,110 85,105 Z`} 
                fill={wornItems.shirt ? wornItems.shirt.color : '#e5e7eb'} 
                stroke="#374151" 
                strokeWidth="0.5"
              />
              <path 
                d={`M115,90 Q125,100 130,140 Q128,142 125,142 Q120,110 115,105 Z`} 
                fill={wornItems.shirt ? wornItems.shirt.color : '#e5e7eb'} 
                stroke="#374151" 
                strokeWidth="0.5"
              />
              
              {/* Hands */}
              <circle cx="72.5" cy="142" r="3.5" fill="#f3d9c3" stroke="#d4a076" strokeWidth="0.5" />
              <circle cx="127.5" cy="142" r="3.5" fill="#f3d9c3" stroke="#d4a076" strokeWidth="0.5" />
            </g>
            
            {/* Head */}
            <g transform={`translate(0,${breatheOffset/2})`}>
              {/* Neck */}
              <path 
                d="M95,70 Q100,75 105,70 L105,85 Q100,90 95,85 Z" 
                fill="#f3d9c3" 
                stroke="#d4a076" 
                strokeWidth="0.5"
              />
              
              {/* Face */}
              <circle cx="100" cy="50" r="20" fill="#f5ddc4" stroke="#d4a076" strokeWidth="0.5" />
              
              {/* Eyes */}
              <ellipse cx="92" cy="45" rx="2.5" ry="1.5" fill="#374151" />
              <ellipse cx="108" cy="45" rx="2.5" ry="1.5" fill="#374151" />
              
              {/* Eyebrows */}
              <path d="M88,41 Q92,39 96,41" fill="none" stroke="#5c4a38" strokeWidth="1" />
              <path d="M112,41 Q108,39 104,41" fill="none" stroke="#5c4a38" strokeWidth="1" />
              
              {/* Mouth */}
              <path 
                d="M97,58 Q100,60 103,58" 
                fill="none" 
                stroke="#9c5a52" 
                strokeWidth="1" 
                strokeLinecap="round"
              />
              
              {/* Hair */}
              <path 
                d="M80,45 Q75,30 85,25 Q95,20 100,20 Q105,20 115,25 Q125,30 120,45" 
                fill="#5c4a38" 
                stroke="#403325" 
                strokeWidth="0.5"
              />
              <path 
                d="M80,45 Q85,42 84,50" 
                fill="#5c4a38" 
                stroke="#403325" 
                strokeWidth="0.5"
              />
              <path 
                d="M120,45 Q115,42 116,50" 
                fill="#5c4a38" 
                stroke="#403325" 
                strokeWidth="0.5"
              />
            </g>
          </svg>
        </div>
        
        <div className="mt-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-bold">Currently Wearing:</h3>
          <ul className="text-sm">
            <li><span className="font-medium">Shirt:</span> {wornItems.shirt ? wornItems.shirt.name : 'None'}</li>
            <li><span className="font-medium">Pants:</span> {wornItems.pants ? wornItems.pants.name : 'None'}</li>
            <li><span className="font-medium">Shoes:</span> {wornItems.shoes ? wornItems.shoes.name : 'None'}</li>
          </ul>
        </div>
      </div>
      
      {/* Product selection area */}
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-bold mb-4">Products</h2>
        
        {/* Shirts section */}
        <div className="mb-6">
          <h3 className="font-bold mb-2">Shirts</h3>
          <div className="flex flex-wrap gap-4">
            {products.shirts.map(shirt => (
              <div 
                key={shirt.id}
                className={`w-24 h-24 rounded-lg cursor-pointer hover:scale-105 transition-transform shadow-md ${wornItems.shirt?.id === shirt.id ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => handleProductSelect('shirt', shirt)}
              >
                <div className="w-full h-full rounded-lg flex items-center justify-center" style={{backgroundColor: shirt.color}}>
                  <span className="text-xs text-white font-bold text-center px-1">{shirt.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Pants section */}
        <div className="mb-6">
          <h3 className="font-bold mb-2">Pants</h3>
          <div className="flex flex-wrap gap-4">
            {products.pants.map(pant => (
              <div 
                key={pant.id}
                className={`w-24 h-24 rounded-lg cursor-pointer hover:scale-105 transition-transform shadow-md ${wornItems.pants?.id === pant.id ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => handleProductSelect('pants', pant)}
              >
                <div className="w-full h-full rounded-lg flex items-center justify-center" style={{backgroundColor: pant.color}}>
                  <span className="text-xs text-white font-bold text-center px-1">{pant.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Shoes section */}
        <div>
          <h3 className="font-bold mb-2">Shoes</h3>
          <div className="flex flex-wrap gap-4">
            {products.shoes.map(shoe => (
              <div 
                key={shoe.id}
                className={`w-24 h-24 rounded-lg cursor-pointer hover:scale-105 transition-transform shadow-md ${wornItems.shoes?.id === shoe.id ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => handleProductSelect('shoes', shoe)}
              >
                <div className="w-full h-full rounded-lg flex items-center justify-center" style={{backgroundColor: shoe.color}}>
                  <span className="text-xs font-bold text-center px-1" style={{color: shoe.color === '#f9fafb' ? '#111827' : 'white'}}>{shoe.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Reset button */}
        <button 
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-colors"
          onClick={() => setWornItems({ shirt: null, pants: null, shoes: null })}
        >
          Reset All Items
        </button>
      </div>
    </div>
  );
}