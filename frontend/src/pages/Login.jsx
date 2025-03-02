import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { ecommerceOutlookAnimation } from "../assets";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { TextField, Typography } from "@mui/material";
import Header from "../components/Header/Header";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { status, error, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  // Responsive check using useEffect for dynamic updates
  const [is480, setIs480] = useState(window.innerWidth <= 480);
  const [is900, setIs900] = useState(window.innerWidth <= 900);
  useEffect(() => {
    const handleResize = () => {
      setIs480(window.innerWidth <= 480);
      setIs900(window.innerWidth <= 900);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log(user?.role, ">>DFsdfd")

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then((data) => {
        if (data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/products");
        }
      })
      .catch((err) => {
        console.log("Login failed:", err);
      });
  };
  
  // Animation Variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.8 } },
  };

  const fieldVariants = {
    hover: { y: -5, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex">
        {/* Left Animation Panel */}
        {!is900 && (
          <div className="flex-1 bg-black flex items-center justify-center">
            <Lottie
              animationData={ecommerceOutlookAnimation}
              className="max-w-[80%] max-h-[80%]"
            />
          </div>
        )}

        {/* Right Login Form */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="flex-1 flex items-center justify-center p-4"
        >
          <div
            className={`w-full ${
              is480 ? "max-w-[95vw]" : "max-w-md"
            } bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8`}
          >
            {/* Header */}
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-10 w-10 text-blue-600 dark:text-blue-400 mr-2" />
              <Typography
                variant="h4"
                className="text-gray-900 dark:text-white font-extrabold"
              >
                FashionFusion
              </Typography>
            </div>
            <Typography className="text-gray-600 dark:text-gray-300 text-center mb-8">
              - Shop Anything
            </Typography>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <motion.div variants={fieldVariants} whileHover="hover">
                <TextField
                  fullWidth
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  error={!!error && error.includes("email")}
                  helperText={error && error.includes("email") ? error : ""}
                  className="rounded-lg bg-gray-50 dark:bg-gray-700"
                  InputProps={{
                    className: "text-gray-900 dark:text-white",
                  }}
                />
              </motion.div>

              <motion.div variants={fieldVariants} whileHover="hover">
                <TextField
                  fullWidth
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outlined"
                  error={!!error && error.includes("password")}
                  helperText={error && error.includes("password") ? error : ""}
                  className="rounded-lg bg-gray-50 dark:bg-gray-700"
                  InputProps={{
                    className: "text-gray-900 dark:text-white",
                  }}
                />
              </motion.div>

              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <LoadingButton
                  fullWidth
                  loading={status === "loading"}
                  type="submit"
                  variant="contained"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-full shadow-md"
                >
                  Login
                </LoadingButton>
              </motion.div>

              {/* Links */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
                <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 1.05 }}>
                  <Link
                    to="/register"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Don’t have an account?{" "}
                    <span className="font-semibold">Register</span>
                  </Link>
                </motion.div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default Login;
