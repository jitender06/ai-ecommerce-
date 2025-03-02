import React, { useContext } from "react";
import { GeminiContext } from "../context/GeminiContext";
import {
  Typography,
  Stack,
  Card,
  IconButton,
  TextField,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import {
  Compass,
  Lightbulb,
  MessageSquare,
  Code,
  Briefcase,
  PartyPopper,
  Plane,
  Sun,
  Shirt,
  Umbrella,
  Send,
  User,
  Sparkles,
} from "lucide-react";
import Header from "./Header/Header";

function PackingAssistant() {
  const {
    input,
    setInput,
    recentPrompt,
    showResult,
    loading,
    resultData,
    onSent,
  } = useContext(GeminiContext);

  const suggestionCards = [
    { text: "Pack for a beach vacation", icon: <Compass size={20} /> },
    { text: "Dress for a formal dinner", icon: <Lightbulb size={20} /> },
    { text: "Business trip packing tips", icon: <MessageSquare size={20} /> },
    { text: "Casual party dress ideas", icon: <Code size={20} /> },
    {
      text: "What to pack for a weekend getaway",
      icon: <Briefcase size={20} />,
    },
    { text: "Dress for a wedding", icon: <PartyPopper size={20} /> },
    { text: "Packing for a flight", icon: <Plane size={20} /> },
    { text: "Summer vacation essentials", icon: <Sun size={20} /> },
    { text: "Casual office attire", icon: <Shirt size={20} /> },
    { text: "Rainy day packing tips", icon: <Umbrella size={20} /> },
  ];

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    onSent(suggestion); // Triggers API call with loading state
  };
  console.log(loading, "::>>SDsd");
  return (
    <>
    <Header/>
      <div>
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={loading}
          // onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
      <div className="pt-28 min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex flex-col items-center p-6">
        {/* Heading at Top */}
        <Typography
          variant="h4"
          className="text-gray-900 dark:text-white font-extrabold mb-8 text-center"
        >
          <div className="flex items-center">
            <Sparkles className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
              FashionFusion Packing Assistant
            </span>
          </div>
        </Typography>
        <div className="w-full max-w-6xl flex flex-col sm:flex-row gap-6 mt-10">
          {/* Main Content Area */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="min-h-[600px] flex flex-col justify-between">
              <div>
                {showResult ? (
                  <div className="result">
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={2}
                      className="mb-4"
                    >
                      <User
                        size={24}
                        className="text-gray-600 dark:text-gray-300"
                      />
                      <Typography className="text-gray-900 dark:text-white">
                        {recentPrompt}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="flex-start" spacing={2}>
                      <Sparkles
                        size={24}
                        className="text-blue-500 dark:text-blue-300"
                      />
                      {loading ? (
                        <div className="loader flex flex-col gap-2">
                          <div className="w-64 h-2 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
                          <div className="w-48 h-2 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
                          <div className="w-56 h-2 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
                        </div>
                      ) : (
                        <Typography
                          className="text-gray-700 dark:text-gray-300 text-sm"
                          dangerouslySetInnerHTML={{ __html: resultData }}
                        />
                      )}
                    </Stack>
                  </div>
                ) : (
                  <Typography className="text-gray-900 dark:text-white font-semibold text-center">
                    Ask me about packing or dressing for any occasion!
                  </Typography>
                )}
              </div>
              <Stack direction="row" spacing={2} alignItems="center" mt={4}>
                <TextField
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="e.g., 'Packing for a wedding'"
                  fullWidth
                  variant="outlined"
                  className="bg-gray-50 dark:bg-gray-700 rounded-full"
                  InputProps={{
                    className: "text-gray-900 dark:text-white",
                    sx: { borderRadius: "9999px" },
                  }}
                />
                <IconButton
                  onClick={() => onSent()}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                  disabled={!input || loading}
                >
                  <Send size={20} />
                </IconButton>
              </Stack>
            </div>
            <Typography className="text-gray-500 dark:text-gray-400 text-xs text-center mt-4">
              Powered by FashionFusion
            </Typography>
          </div>

          {/* Bigger Right Sidebar with Suggestions */}
          <div className="w-full sm:w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sticky top-6 h-fit">
            <Typography className="text-gray-900 dark:text-white font-semibold mb-4 text-center">
              Suggestions
            </Typography>
            <Stack direction="column" spacing={2}>
              {suggestionCards.map((card, index) => (
                <Card
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md p-3 flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => handleSuggestionClick(card.text)}
                >
                  {card.icon}
                  <Typography className="text-gray-700 dark:text-gray-300 text-sm">
                    {card.text}
                  </Typography>
                </Card>
              ))}
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
}

export default PackingAssistant;
