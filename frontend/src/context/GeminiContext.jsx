import React, { createContext, useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const GeminiContext = createContext();

const GeminiProvider = ({ children }) => {
  const [input, setInput] = useState('');
  const [recentPrompt, setRecentPrompt] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState('');

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || 'YOUR_FALLBACK_API_KEY');
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const onSent = async (prompt = input) => {
    if (!prompt) return;
    setLoading(true);
    setShowResult(false);
    setRecentPrompt(prompt);
    try {
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      setResultData(responseText.replace(/\*\*/g, '<b>').replace(/\n/g, '<br>'));
      setShowResult(true);
    } catch (error) {
      console.error('Error with Gemini API:', error);
      setResultData('Sorry, something went wrong. Please try again!');
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <GeminiContext.Provider
      value={{
        input,
        setInput,
        recentPrompt,
        showResult,
        loading,
        resultData,
        onSent,
      }}
    >
      {children}
    </GeminiContext.Provider>
  );
};

export default GeminiProvider;