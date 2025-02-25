
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/authSlice';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Stack,
  Typography,
  TextField,
  // LoadingButton,
  FormHelperText,
  Stepper,
  Step,
  StepLabel,
  Button,
  Dialog,
  DialogContent,
} from '@mui/material';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lottie from 'lottie-react';
// import successAnimation from '../assets/successAnimation.json'; // Adjust path to your Lottie file

const steps = ['Basic Details', 'Address', 'Confirmation'];

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
      name: '',
      email: '',
      password: '',
      gender: 'other',
      address: { city: '', state: '', postalCode: '', country: '' },
    },
  });

  const [activeStep, setActiveStep] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const is480 = window.innerWidth <= 480;

  const handleNext = (data) => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      setOpenDialog(true); // Open confirmation dialog on last step
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(registerUser(data)).unwrap();
      setOpenDialog(false);
      toast.success('Registration successful! Welcome to Mern Shop.', {
        position: 'top-right',
        autoClose: 3000,
        onClose: () => navigate('/login'), // Redirect to home after toast closes
      });
      navigate('/login')
    } catch (err) {
      setOpenDialog(false); // Close dialog on error too
      toast.error(err.message || 'Registration failed. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <motion.div whileHover={{ y: -5 }}>
              <TextField
                fullWidth
                placeholder="Name"
                {...register('name', {
                  required: 'Name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' },
                  maxLength: { value: 50, message: 'Name cannot exceed 50 characters' },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </motion.div>
            <motion.div whileHover={{ y: -5 }}>
              <TextField
                fullWidth
                placeholder="Email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                    message: 'Enter a valid email address',
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </motion.div>
            <motion.div whileHover={{ y: -5 }}>
              <TextField
                type="password"
                fullWidth
                placeholder="Password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+={}\[\]:;"'<>,.?/\\~-]{6,}$/,
                    message: 'Password must contain at least one letter and one number',
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </motion.div>
            <motion.div whileHover={{ y: -5 }}>
              <TextField
                select
                fullWidth
                label="Gender"
                {...register('gender', { required: 'Gender is required' })}
                SelectProps={{ native: true }}
                defaultValue="other"
                error={!!errors.gender}
                helperText={errors.gender?.message}
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
            <motion.div whileHover={{ y: -5 }}>
              <TextField
                fullWidth
                placeholder="City"
                {...register('address.city', { required: 'City is required' })}
                error={!!errors.address?.city}
                helperText={errors.address?.city?.message}
              />
            </motion.div>
            <motion.div whileHover={{ y: -5 }}>
              <TextField
                fullWidth
                placeholder="State"
                {...register('address.state', { required: 'State is required' })}
                error={!!errors.address?.state}
                helperText={errors.address?.state?.message}
              />
            </motion.div>
            <motion.div whileHover={{ y: -5 }}>
              <TextField
                fullWidth
                placeholder="Postal Code"
                {...register('address.postalCode', {
                  required: 'Postal Code is required',
                  pattern: {
                    value: /^[0-9]{5,6}$/,
                    message: 'Enter a valid postal code (5-6 digits)',
                  },
                })}
                error={!!errors.address?.postalCode}
                helperText={errors.address?.postalCode?.message}
              />
            </motion.div>
            <motion.div whileHover={{ y: -5 }}>
              <TextField
                fullWidth
                placeholder="Country"
                {...register('address.country', { required: 'Country is required' })}
                error={!!errors.address?.country}
                helperText={errors.address?.country?.message}
              />
            </motion.div>
          </>
        );
      case 2:
        return (
          <Typography align="center">
            Please click "Register" to complete your registration.
          </Typography>
        );
      default:
        return null;
    }
  };

  return (
    <Stack
      width={'100vw'}
      height={'100vh'}
      justifyContent={'center'}
      alignItems={'center'}
      sx={{ overflowY: 'hidden', bgcolor: '#f5f5f5' }}
    >
      <Stack
        width={is480 ? '90vw' : '40rem'}
        p={is480 ? 2 : 4}
        bgcolor={'white'}
        borderRadius={2}
        boxShadow={3}
      >
        <Typography
          variant="h2"
          sx={{ wordBreak: 'break-word', mb: 2 }}
          fontWeight={600}
          align="center"
        >
          Mern Shop
        </Typography>
        <Typography align="center" color={'GrayText'} variant="body2" mb={4}>
          - Shop Anything
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={handleSubmit(handleNext)} noValidate>
          <Stack spacing={3}>{getStepContent(activeStep)}</Stack>

          <Stack direction="row" spacing={2} justifyContent="space-between" mt={4}>
            <Button
              disabled={activeStep === 0 || status === 'loading'}
              onClick={handleBack}
            >
              Back
            </Button>
            <motion.div whileHover={{ scale: 1.020 }} whileTap={{ scale: 1 }}>
              <LoadingButton
                variant="contained"
                type="submit"
                loading={status === 'loading'}
              >
                {activeStep === steps.length - 1 ? 'Register' : 'Next'}
              </LoadingButton>
            </motion.div>
          </Stack>

          {error && activeStep !== steps.length - 1 && (
            <FormHelperText sx={{ mt: 2 }} error>
              {error}
            </FormHelperText>
          )}
        </form>
      </Stack>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent sx={{ textAlign: 'center', py: 4 }}>
          {/* <Lottie animationData={successAnimation} style={{ width: 200, height: 200, margin: '0 auto' }} /> */}
          <Typography variant="h6" mt={2}>
            You have been registered successfully!
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Welcome to Mern Shop. You can now log in to start shopping.
          </Typography>
          <motion.div whileHover={{ scale: 1.020 }} whileTap={{ scale: 1 }}>
            <LoadingButton
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              loading={status === 'loading'}
              sx={{ mt: 2 }}
            >
              Confirm
            </LoadingButton>
          </motion.div>
        </DialogContent>
      </Dialog>

      <ToastContainer />
    </Stack>
  );
}

export default Register;