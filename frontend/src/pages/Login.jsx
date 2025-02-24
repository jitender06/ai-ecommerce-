import { useState } from 'react';
import axios from 'axios';
import {
  Stack,
  Typography,
  TextField,
  // LoadingButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react'
// import { Link, useNavigate } from 'react-router-dom'
import { ecommerceOutlookAnimation, shoppingBagAnimation} from '../assets'
import { LoadingButton } from '@mui/lab';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle, pending, success, error
  const [error, setError] = useState('');

  const is480 = window.innerWidth <= 480; // Simple responsive check (you might use MUI's useMediaQuery instead)
  const is900 = window.innerWidth <= 900;

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus('pending');
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      setStatus('success');
      console.log('Logged in:', response.data.user);

      // Redirect or update app state here (e.g., using React Router or Context)
      // Example: window.location.href = '/products';
    } catch (err) {
      setStatus('error');
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Stack
      width={'100vw'}
      height={'100vh'}
      flexDirection={'row'}
      sx={{ overflowY: 'hidden' }}
    >
      {!is900 && (
        <Stack
          bgcolor={'black'}
          flex={1}
          justifyContent={'center'}
        >
          {/* Uncomment and import Lottie if you have the animation */}
          <Lottie animationData={ecommerceOutlookAnimation} />
        </Stack>
      )}

      <Stack
        flex={1}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Stack
          flexDirection={'row'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Stack rowGap={'.4rem'}>
            <Typography
              variant="h2"
              sx={{ wordBreak: 'break-word' }}
              fontWeight={600}
            >
              Mern Shop
            </Typography>
            <Typography
              alignSelf={'flex-end'}
              color={'GrayText'}
              variant="body2"
            >
              - Shop Anything
            </Typography>
          </Stack>
        </Stack>

        <Stack
          mt={4}
          spacing={2}
          width={is480 ? '95vw' : '28rem'}
          component={'form'}
          noValidate
          onSubmit={handleLogin}
        >
          <motion.div whileHover={{ y: -5 }}>
            <TextField
              fullWidth
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error && error.includes('email')}
              helperText={error && error.includes('email') ? error : ''}
            />
          </motion.div>

          <motion.div whileHover={{ y: -5 }}>
            <TextField
              type="password"
              fullWidth
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!error && error.includes('password')}
              helperText={error && error.includes('password') ? error : ''}
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.020 }} whileTap={{ scale: 1 }}>
            <LoadingButton
              fullWidth
              sx={{ height: '2.5rem' }}
              loading={status === 'pending'}
              type="submit"
              variant="contained"
            >
              Login
            </LoadingButton>
          </motion.div>

          {/* Uncomment and configure these links with React Router if needed */}
          {/* <Stack
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            flexWrap={'wrap-reverse'}
          >
            <MotionConfig whileHover={{ x: 2 }} whileTap={{ scale: 1.050 }}>
              <motion.div>
                <Typography
                  mr={'1.5rem'}
                  sx={{ textDecoration: 'none', color: 'text.primary' }}
                  component={Link}
                  to={'/forgot-password'}
                >
                  Forgot password
                </Typography>
              </motion.div>
              <motion.div>
                <Typography
                  sx={{ textDecoration: 'none', color: 'text.primary' }}
                  component={Link}
                  to={'/signup'}
                >
                  Don’t have an account?{' '}
                  <span style={{ color: theme.palette.primary.dark }}>
                    Register
                  </span>
                </Typography>
              </motion.div>
            </MotionConfig>
          </Stack> */}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Login;