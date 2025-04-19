import { useState, useEffect } from "react";
import Header from "./Header/Header";

export default function AdvancedVirtualTryOn() {
  // State for gender selection
  const [gender, setGender] = useState("male");

  // State to track which products are being worn
  const [wornItems, setWornItems] = useState({
    shirt: null,
    pants: null,
    shoes: null,
  });

  // State for custom colors
  const [customColors, setCustomColors] = useState({
    shirt: "#3b82f6",
    pants: "#1f2937",
    shoes: "#f9fafb",
  });

  // Sample product data
  const products = {
    shirts: [
      {
        id: "s1",
        name: "T-Shirt",
        color: "#3b82f6",
        secondaryColor: "#2563eb",
        image: "/api/placeholder/100/100",
      },
      {
        id: "s2",
        name: "Polo",
        color: "#ef4444",
        secondaryColor: "#dc2626",
        image: "/api/placeholder/100/100",
      },
      {
        id: "s3",
        name: "Dress Shirt",
        color: "#10b981",
        secondaryColor: "#059669",
        image: "/api/placeholder/100/100",
      },
    ],
    pants: [
      {
        id: "p1",
        name: "Jeans",
        color: "#1f2937",
        secondaryColor: "#111827",
        image: "/api/placeholder/100/100",
      },
      {
        id: "p2",
        name: "Chinos",
        color: "#1e40af",
        secondaryColor: "#1e3a8a",
        image: "/api/placeholder/100/100",
      },
    ],
    shoes: [
      {
        id: "sh1",
        name: "Sneakers",
        color: "#f9fafb",
        secondaryColor: "#f3f4f6",
        image: "/api/placeholder/100/100",
      },
      {
        id: "sh2",
        name: "Boots",
        color: "#111827",
        secondaryColor: "#030712",
        image: "/api/placeholder/100/100",
      },
    ],
  };

  // Handler to select a product
  const handleProductSelect = (category, product) => {
    setWornItems((prev) => ({
      ...prev,
      [category]: product,
    }));

    // Update custom color when product is selected
    setCustomColors((prev) => ({
      ...prev,
      [category]: product.color,
    }));
  };

  // Handle color change for a category
  const handleColorChange = (category, color) => {
    setCustomColors((prev) => ({
      ...prev,
      [category]: color,
    }));

    // If no product is selected for this category, create a custom one
    if (!wornItems[category]) {
      const newProduct = {
        id: `custom-${category}`,
        name: `Custom ${category}`,
        color: color,
        secondaryColor: adjustColor(color, -20), // Darker version for details
        isCustom: true,
      };

      setWornItems((prev) => ({
        ...prev,
        [category]: newProduct,
      }));
    } else {
      // Update the existing product's color
      setWornItems((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          color: color,
          secondaryColor: adjustColor(color, -20),
          isCustom: true,
        },
      }));
    }
  };

  // Helper function to adjust color brightness
  const adjustColor = (hex, percent) => {
    // Convert hex to RGB
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    // Adjust brightness
    r = Math.max(0, Math.min(255, r + percent));
    g = Math.max(0, Math.min(255, g + percent));
    b = Math.max(0, Math.min(255, b + percent));

    // Convert back to hex
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  // Add slight animation to make avatar appear more lifelike
  const [breatheState, setBreatheState] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBreatheState((prev) => (prev + 1) % 100);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const breatheOffset = Math.sin(breatheState / 16) * 2;

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row w-full gap-6 p-4">
        {/* Avatar display area */}
        <div className="w-full md:w-1/2 flex flex-col items-center mt-40">
          <h2 className="text-xl font-bold mb-4">Virtual Try-On</h2>

          {/* Gender selection */}
          <div className="flex gap-4 mb-4">
            <button
              className={`px-4 py-2 rounded-lg ${
                gender === "male" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setGender("male")}
            >
              Male
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                gender === "female" ? "bg-pink-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setGender("female")}
            >
              Female
            </button>
          </div>

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
              <ellipse
                cx="100"
                cy="280"
                rx="40"
                ry="10"
                fill="rgba(0,0,0,0.1)"
              />

              {/* Legs */}
              <g transform="translate(0,2)">
                {/* Left leg */}
                <path
                  d={`M${gender === "female" ? "87" : "85"},165 
                   Q${gender === "female" ? "87" : "85"},240 
                   ${gender === "female" ? "82" : "80"},280 
                   Q${gender === "female" ? "85" : "83"},282 
                   ${gender === "female" ? "89" : "87"},282 
                   Q${gender === "female" ? "94" : "92"},240 
                   ${gender === "female" ? "97" : "95"},165 Z`}
                  fill={wornItems.pants ? customColors.pants : "#d1d5db"}
                  stroke="#374151"
                  strokeWidth="0.5"
                />

                {/* Right leg */}
                <path
                  d={`M${gender === "female" ? "113" : "115"},165 
                   Q${gender === "female" ? "113" : "115"},240 
                   ${gender === "female" ? "118" : "120"},280 
                   Q${gender === "female" ? "115" : "117"},282 
                   ${gender === "female" ? "111" : "113"},282 
                   Q${gender === "female" ? "106" : "108"},240 
                   ${gender === "female" ? "103" : "105"},165 Z`}
                  fill={wornItems.pants ? customColors.pants : "#d1d5db"}
                  stroke="#374151"
                  strokeWidth="0.5"
                />

                {/* Pants details */}
                {wornItems.pants && (
                  <>
                    <path
                      d={`M${gender === "female" ? "87" : "85"},165 
                       Q${gender === "female" ? "92" : "90"},164 
                       ${gender === "female" ? "97" : "95"},165 
                       L${gender === "female" ? "97" : "95"},190 
                       Q${gender === "female" ? "92" : "90"},191 
                       ${gender === "female" ? "87" : "85"},190 Z`}
                      fill={wornItems.pants.secondaryColor}
                      opacity="0.6"
                    />
                    <path
                      d={`M${gender === "female" ? "113" : "115"},165 
                       Q${gender === "female" ? "108" : "110"},164 
                       ${gender === "female" ? "103" : "105"},165 
                       L${gender === "female" ? "103" : "105"},190 
                       Q${gender === "female" ? "108" : "110"},191 
                       ${gender === "female" ? "113" : "115"},190 Z`}
                      fill={wornItems.pants.secondaryColor}
                      opacity="0.6"
                    />
                  </>
                )}

                {/* Shoes */}
                <path
                  d={`M${gender === "female" ? "77" : "75"},280 
                   Q${gender === "female" ? "79" : "77"},282 
                   ${gender === "female" ? "89" : "87"},282 
                   L${gender === "female" ? "82" : "80"},290 
                   Q${gender === "female" ? "72" : "70"},290 
                   ${gender === "female" ? "72" : "70"},285 Z`}
                  fill={wornItems.shoes ? customColors.shoes : "#9ca3af"}
                  stroke="#374151"
                  strokeWidth="0.5"
                />
                <path
                  d={`M${gender === "female" ? "123" : "125"},280 
                   Q${gender === "female" ? "121" : "123"},282 
                   ${gender === "female" ? "111" : "113"},282 
                   L${gender === "female" ? "118" : "120"},290 
                   Q${gender === "female" ? "128" : "130"},290 
                   ${gender === "female" ? "128" : "130"},285 Z`}
                  fill={wornItems.shoes ? customColors.shoes : "#9ca3af"}
                  stroke="#374151"
                  strokeWidth="0.5"
                />

                {/* Shoe details */}
                {wornItems.shoes && (
                  <>
                    <path
                      d={`M${gender === "female" ? "80" : "78"},285 L${
                        gender === "female" ? "86" : "84"
                      },285`}
                      stroke={wornItems.shoes.secondaryColor}
                      strokeWidth="1.5"
                    />
                    <path
                      d={`M${gender === "female" ? "120" : "122"},285 L${
                        gender === "female" ? "114" : "116"
                      },285`}
                      stroke={wornItems.shoes.secondaryColor}
                      strokeWidth="1.5"
                    />
                  </>
                )}
              </g>

              {/* Torso/Shirt - with breathing animation */}
              <g transform={`translate(0,${breatheOffset})`}>
                {/* Base torso - different for male/female */}
                <path
                  d={
                    gender === "female"
                      ? `M87,90 Q100,85 113,90 L113,165 Q100,170 87,165 Z`
                      : `M85,90 Q100,85 115,90 L115,165 Q100,170 85,165 Z`
                  }
                  fill={wornItems.shirt ? customColors.shirt : "#e5e7eb"}
                  stroke="#374151"
                  strokeWidth="0.5"
                />

                {/* Shirt collar */}
                <path
                  d={
                    gender === "female"
                      ? "M93,90 L100,95 L107,90"
                      : "M92,90 L100,95 L108,90"
                  }
                  fill="none"
                  stroke={
                    wornItems.shirt ? wornItems.shirt.secondaryColor : "#9ca3af"
                  }
                  strokeWidth="1.5"
                />

                {/* Shirt details */}
                {wornItems.shirt && (
                  <>
                    <path
                      d={
                        gender === "female"
                          ? "M95,105 L105,105"
                          : "M95,105 L105,105"
                      }
                      stroke={wornItems.shirt.secondaryColor}
                      strokeWidth="1"
                    />
                    <path
                      d={
                        gender === "female"
                          ? "M92,120 L108,120"
                          : "M90,120 L110,120"
                      }
                      stroke={wornItems.shirt.secondaryColor}
                      strokeWidth="0.8"
                    />
                  </>
                )}

                {/* Female chest shape for female avatar */}
                {gender === "female" && (
                  <path
                    d="M93,105 Q100,110 107,105"
                    fill="none"
                    stroke={
                      wornItems.shirt
                        ? wornItems.shirt.secondaryColor
                        : "#9ca3af"
                    }
                    strokeWidth="0.8"
                  />
                )}

                {/* Arms */}
                <path
                  d={
                    gender === "female"
                      ? `M87,90 Q77,100 72,140 Q74,142 77,142 Q82,110 87,105 Z`
                      : `M85,90 Q75,100 70,140 Q72,142 75,142 Q80,110 85,105 Z`
                  }
                  fill={wornItems.shirt ? customColors.shirt : "#e5e7eb"}
                  stroke="#374151"
                  strokeWidth="0.5"
                />
                <path
                  d={
                    gender === "female"
                      ? `M113,90 Q123,100 128,140 Q126,142 123,142 Q118,110 113,105 Z`
                      : `M115,90 Q125,100 130,140 Q128,142 125,142 Q120,110 115,105 Z`
                  }
                  fill={wornItems.shirt ? customColors.shirt : "#e5e7eb"}
                  stroke="#374151"
                  strokeWidth="0.5"
                />

                {/* Hands */}
                <circle
                  cx={gender === "female" ? "74.5" : "72.5"}
                  cy="142"
                  r="3.5"
                  fill="#f3d9c3"
                  stroke="#d4a076"
                  strokeWidth="0.5"
                />
                <circle
                  cx={gender === "female" ? "125.5" : "127.5"}
                  cy="142"
                  r="3.5"
                  fill="#f3d9c3"
                  stroke="#d4a076"
                  strokeWidth="0.5"
                />
              </g>

              {/* Head */}
              <g transform={`translate(0,${breatheOffset / 2})`}>
                {/* Neck */}
                <path
                  d={
                    gender === "female"
                      ? "M96,70 Q100,75 104,70 L104,85 Q100,90 96,85 Z"
                      : "M95,70 Q100,75 105,70 L105,85 Q100,90 95,85 Z"
                  }
                  fill="#f3d9c3"
                  stroke="#d4a076"
                  strokeWidth="0.5"
                />

                {/* Face - slightly different shapes for male/female */}
                <circle
                  cx="100"
                  cy="50"
                  r={gender === "female" ? "19" : "20"}
                  fill="#f5ddc4"
                  stroke="#d4a076"
                  strokeWidth="0.5"
                />

                {/* Eyes */}
                <ellipse cx="92" cy="45" rx="2.5" ry="1.5" fill="#374151" />
                <ellipse cx="108" cy="45" rx="2.5" ry="1.5" fill="#374151" />

                {/* Eyebrows */}
                <path
                  d={
                    gender === "female"
                      ? "M88,40 Q92,38 96,40"
                      : "M88,41 Q92,39 96,41"
                  }
                  fill="none"
                  stroke="#5c4a38"
                  strokeWidth="1"
                />
                <path
                  d={
                    gender === "female"
                      ? "M112,40 Q108,38 104,40"
                      : "M112,41 Q108,39 104,41"
                  }
                  fill="none"
                  stroke="#5c4a38"
                  strokeWidth="1"
                />

                {/* Mouth - different styles for male/female */}
                <path
                  d={
                    gender === "female"
                      ? "M97,58 Q100,60 103,58"
                      : "M96,58 Q100,59 104,58"
                  }
                  fill="none"
                  stroke={gender === "female" ? "#c56b5d" : "#9c5a52"}
                  strokeWidth={gender === "female" ? "1.2" : "1"}
                  strokeLinecap="round"
                />

                {/* Hair - different for male/female */}
                {gender === "female" ? (
                  // Female longer hair
                  <>
                    <path
                      d="M81,50 Q75,30 85,25 Q95,20 100,20 Q105,20 115,25 Q125,30 119,50"
                      fill="#5c4a38"
                      stroke="#403325"
                      strokeWidth="0.5"
                    />
                    <path
                      d="M81,50 Q80,60 85,70 Q90,75 85,80"
                      fill="#5c4a38"
                      stroke="#403325"
                      strokeWidth="0.5"
                    />
                    <path
                      d="M119,50 Q120,60 115,70 Q110,75 115,80"
                      fill="#5c4a38"
                      stroke="#403325"
                      strokeWidth="0.5"
                    />
                  </>
                ) : (
                  // Male shorter hair
                  <>
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
                  </>
                )}
              </g>
            </svg>
          </div>

          <div className="mt-4 p-4 bg-white rounded-lg shadow">
            <h3 className="font-bold">Currently Wearing:</h3>
            <ul className="text-sm">
              <li>
                <span className="font-medium">Shirt:</span>{" "}
                {wornItems.shirt ? wornItems.shirt.name : "None"}
                {wornItems.shirt?.isCustom && " (Custom Color)"}
              </li>
              <li>
                <span className="font-medium">Pants:</span>{" "}
                {wornItems.pants ? wornItems.pants.name : "None"}
                {wornItems.pants?.isCustom && " (Custom Color)"}
              </li>
              <li>
                <span className="font-medium">Shoes:</span>{" "}
                {wornItems.shoes ? wornItems.shoes.name : "None"}
                {wornItems.shoes?.isCustom && " (Custom Color)"}
              </li>
            </ul>
          </div>
        </div>

        {/* Product selection area */}
        <div className="w-full md:w-1/2 mt-40">
          <h2 className="text-xl font-bold mb-4">Product Selection</h2>

          {/* Shirts section */}
          <div className="mb-6 p-4 bg-white rounded-lg shadow">
            <h3 className="font-bold mb-2">Shirts</h3>

            {/* Color selection */}
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Custom Color:
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={customColors.shirt}
                  onChange={(e) => handleColorChange("shirt", e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer"
                />
                <span className="text-sm">{customColors.shirt}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-2">
              {products.shirts.map((shirt) => (
                <div
                  key={shirt.id}
                  className={`w-24 h-24 rounded-lg cursor-pointer hover:scale-105 transition-transform shadow-md ${
                    wornItems.shirt?.id === shirt.id &&
                    !wornItems.shirt?.isCustom
                      ? "ring-2 ring-blue-500"
                      : ""
                  }`}
                  onClick={() => handleProductSelect("shirt", shirt)}
                >
                  <div
                    className="w-full h-full rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: shirt.color }}
                  >
                    <span className="text-xs text-white font-bold text-center px-1">
                      {shirt.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pants section */}
          <div className="mb-6 p-4 bg-white rounded-lg shadow">
            <h3 className="font-bold mb-2">Pants</h3>

            {/* Color selection */}
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Custom Color:
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={customColors.pants}
                  onChange={(e) => handleColorChange("pants", e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer"
                />
                <span className="text-sm">{customColors.pants}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-2">
              {products.pants.map((pant) => (
                <div
                  key={pant.id}
                  className={`w-24 h-24 rounded-lg cursor-pointer hover:scale-105 transition-transform shadow-md ${
                    wornItems.pants?.id === pant.id &&
                    !wornItems.pants?.isCustom
                      ? "ring-2 ring-blue-500"
                      : ""
                  }`}
                  onClick={() => handleProductSelect("pants", pant)}
                >
                  <div
                    className="w-full h-full rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: pant.color }}
                  >
                    <span className="text-xs text-white font-bold text-center px-1">
                      {pant.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shoes section */}
          <div className="mb-6 p-4 bg-white rounded-lg shadow">
            <h3 className="font-bold mb-2">Shoes</h3>

            {/* Color selection */}
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Custom Color:
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={customColors.shoes}
                  onChange={(e) => handleColorChange("shoes", e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer"
                />
                <span className="text-sm">{customColors.shoes}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-2">
              {products.shoes.map((shoe) => (
                <div
                  key={shoe.id}
                  className={`w-24 h-24 rounded-lg cursor-pointer hover:scale-105 transition-transform shadow-md ${
                    wornItems.shoes?.id === shoe.id &&
                    !wornItems.shoes?.isCustom
                      ? "ring-2 ring-blue-500"
                      : ""
                  }`}
                  onClick={() => handleProductSelect("shoes", shoe)}
                >
                  <div
                    className="w-full h-full rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: shoe.color }}
                  >
                    <span
                      className="text-xs font-bold text-center px-1"
                      style={{
                        color: shoe.color === "#f9fafb" ? "#111827" : "white",
                      }}
                    >
                      {shoe.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reset button */}
          <button
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-colors"
            onClick={() =>
              setWornItems({ shirt: null, pants: null, shoes: null })
            }
          >
            Reset All Items
          </button>
        </div>
      </div>
    </>
  );
}
