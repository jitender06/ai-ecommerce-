import { LoadingButton } from "@mui/lab";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/authSlice";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lottie from "lottie-react";
import { ecommerceOutlookAnimation, welcome } from "../assets"; // Reusing from Login
import {
  Stack,
  Typography,
  TextField,
  FormHelperText,
  Stepper,
  Step,
  StepLabel,
  Button,
  Dialog,
  DialogContent,
} from "@mui/material";
import Header from "../components/Header/Header";

const steps = ["Basic Details", "Address", "Confirmation"];

function Register() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      gender: "other",
      address: { city: "", state: "", postalCode: "", country: "" },
    },
  });

  const [activeStep, setActiveStep] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [is480, setIs480] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => setIs480(window.innerWidth <= 480);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = (data) => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      setOpenDialog(true);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const onSubmit = async (data) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      setOpenDialog(false);
      toast.success("Registration successful! Welcome to FashionFusion.", {
        position: "top-right",
        autoClose: 3000,
        onClose: () => navigate("/login"),
      });
    } catch (err) {
      setOpenDialog(false);
      toast.error(err.message || "Registration failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <motion.div variants={fieldVariants} whileHover="hover">
              <TextField
                fullWidth
                placeholder="Name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Name cannot exceed 50 characters",
                  },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
                className="rounded-lg bg-gray-50 dark:bg-gray-700"
                InputProps={{ className: "text-gray-900 dark:text-white" }}
              />
            </motion.div>
            <motion.div variants={fieldVariants} whileHover="hover">
              <TextField
                fullWidth
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                    message: "Enter a valid email address",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                className="rounded-lg bg-gray-50 dark:bg-gray-700"
                InputProps={{ className: "text-gray-900 dark:text-white" }}
              />
            </motion.div>
            <motion.div variants={fieldVariants} whileHover="hover">
              <TextField
                type="password"
                fullWidth
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+={}\[\]:;"'<>,.?/\\~-]{6,}$/,
                    message:
                      "Password must contain at least one letter and one number",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                className="rounded-lg bg-gray-50 dark:bg-gray-700"
                InputProps={{ className: "text-gray-900 dark:text-white" }}
              />
            </motion.div>
            <motion.div variants={fieldVariants} whileHover="hover">
              <TextField
                select
                fullWidth
                label="Gender"
                {...register("gender", { required: "Gender is required" })}
                SelectProps={{ native: true }}
                defaultValue="other"
                error={!!errors.gender}
                helperText={errors.gender?.message}
                className="rounded-lg bg-gray-50 dark:bg-gray-700"
                InputProps={{ className: "text-gray-900 dark:text-white" }}
                InputLabelProps={{ className: "text-gray-900 dark:text-white" }}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </TextField>
            </motion.div>
          </>
        );
      case 1:
        return (
          <>
            <motion.div variants={fieldVariants} whileHover="hover">
              <TextField
                fullWidth
                placeholder="City"
                {...register("address.city", { required: "City is required" })}
                error={!!errors.address?.city}
                helperText={errors.address?.city?.message}
                className="rounded-lg bg-gray-50 dark:bg-gray-700"
                InputProps={{ className: "text-gray-900 dark:text-white" }}
              />
            </motion.div>
            <motion.div variants={fieldVariants} whileHover="hover">
              <TextField
                fullWidth
                placeholder="State"
                {...register("address.state", {
                  required: "State is required",
                })}
                error={!!errors.address?.state}
                helperText={errors.address?.state?.message}
                className="rounded-lg bg-gray-50 dark:bg-gray-700"
                InputProps={{ className: "text-gray-900 dark:text-white" }}
              />
            </motion.div>
            <motion.div variants={fieldVariants} whileHover="hover">
              <TextField
                fullWidth
                placeholder="Postal Code"
                {...register("address.postalCode", {
                  required: "Postal Code is required",
                  pattern: {
                    value: /^[0-9]{5,6}$/,
                    message: "Enter a valid postal code (5-6 digits)",
                  },
                })}
                error={!!errors.address?.postalCode}
                helperText={errors.address?.postalCode?.message}
                className="rounded-lg bg-gray-50 dark:bg-gray-700"
                InputProps={{ className: "text-gray-900 dark:text-white" }}
              />
            </motion.div>
            <motion.div variants={fieldVariants} whileHover="hover">
              <TextField
                fullWidth
                placeholder="Country"
                {...register("address.country", {
                  required: "Country is required",
                })}
                error={!!errors.address?.country}
                helperText={errors.address?.country?.message}
                className="rounded-lg bg-gray-50 dark:bg-gray-700"
                InputProps={{ className: "text-gray-900 dark:text-white" }}
              />
            </motion.div>
          </>
        );
      case 2:
        return (
          <Typography className="text-gray-600 dark:text-gray-300 text-center">
            Please click "Register" to complete your registration.
          </Typography>
        );
      default:
        return null;
    }
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

  const dialogVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, type: "spring", stiffness: 120 },
    },
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Animation */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.2) 2px, transparent 2px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* Main Container */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className={`w-full ${
            is480 ? "max-w-[90vw]" : "max-w-2xl"
          } bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 z-10`}
        >
          {/* Header */}
          <div className="flex items-center justify-center mb-6">
            <Lottie
              animationData={ecommerceOutlookAnimation}
              className="w-20 h-20"
            />
            <Typography
              variant="h4"
              className="text-gray-900 dark:text-white font-extrabold ml-2"
            >
              FashionFusion
            </Typography>
          </div>
          <Typography className="text-gray-600 dark:text-gray-300 text-center mb-6">
            Create your account and start shopping!
          </Typography>

          {/* Stepper */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 6 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </motion.div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(handleNext)}
            noValidate
            className="space-y-6"
          >
            <Stack spacing={3}>{getStepContent(activeStep)}</Stack>

            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              mt={4}
            >
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  disabled={activeStep === 0 || status === "loading"}
                  onClick={handleBack}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Back
                </Button>
              </motion.div>
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <LoadingButton
                  variant="contained"
                  type="submit"
                  loading={status === "loading"}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-full shadow-md"
                >
                  {activeStep === steps.length - 1 ? "Register" : "Next"}
                </LoadingButton>
              </motion.div>
            </Stack>

            {error && activeStep !== steps.length - 1 && (
              <FormHelperText className="text-red-600 dark:text-red-400 mt-2 text-center">
                {error}
              </FormHelperText>
            )}
          </form>
        </motion.div>

        {/* Confirmation Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <motion.div
            variants={dialogVariants}
            initial="initial"
            animate="animate"
          >
            <DialogContent
              sx={{
                textAlign: "center",
                py: 6,
                bgcolor: "white",
                dark: { bgcolor: "gray-800" },
              }}
            >
              <Lottie animationData={welcome} />
              <Typography
                variant="h6"
                className="text-gray-900 dark:text-white mt-4"
              >
                Registration Successful!
              </Typography>
              <Typography className="text-gray-600 dark:text-gray-300 mt-2">
                Welcome to FashionFusion. Confirm to proceed to login.
              </Typography>
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <LoadingButton
                  variant="contained"
                  onClick={handleSubmit(onSubmit)}
                  loading={status === "loading"}
                  className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full"
                >
                  Confirm
                </LoadingButton>
              </motion.div>
            </DialogContent>
          </motion.div>
        </Dialog>

        <ToastContainer />
      </div>
    </>
  );
}

export default Register;
