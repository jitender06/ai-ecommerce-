import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const chatai = () => {
  const { onSent, recentPrompt, showResult, loading, resultdata, setInput, input } = useContext(Context);

  // Predefined packing and dress occasion suggestions
  const suggestionCards = [
    { text: "What should I pack for a beach vacation?", icon: assets.compass_icon },
    { text: "What dress fits a formal dinner?", icon: assets.bulb_icon },
    { text: "Packing tips for a business trip", icon: assets.message_icon },
    { text: "Dress suggestions for a casual party", icon: assets.code_icon },
  ];

  // Handle clicking a suggestion card
  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    onSent(suggestion); // Trigger API call with the suggestion
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, {user?.name || "User"}.</span>
              </p>
              <p>How can I assist you with packing or dressing today?</p>
            </div>
            <div className="cards">
              {suggestionCards.map((card, index) => (
                <div
                  key={index}
                  className="card cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  onClick={() => handleSuggestionClick(card.text)}
                >
                  <p className="text-gray-700 dark:text-gray-300">{card.text}</p>
                  <img src={card.icon} alt="" className="w-6 h-6" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultdata }}></p>
              )}
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here (e.g., 'Packing for a wedding')"
            />
            <div>
              <img src={assets.gallery_icon} alt="Gallery" />
              <img src={assets.mic_icon} alt="Mic" />
              <img onClick={() => onSent()} src={assets.send_icon} alt="Send" className="cursor-pointer" />
            </div>
          </div>
          <p className="bottom-info text-gray-500 dark:text-gray-400 text-sm">
            Powered by Gemini API. Suggestions are AI-generated and may vary.
          </p>
        </div>
      </div>
    </div>
  );
};

export default chatai;