import React, { useState, useEffect } from 'react';
import {
  Brain, Mail, Lock, Eye, EyeOff, User, Phone,
  CheckCircle2, ArrowRight, Sparkles, AlertCircle, ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveTab } from '../types';


interface AuthProps {
  onLogin: (user: {
    name: string;
    email: string;
    avatarColor: string;
    avatarTag: string;
    focusArea: string;
  }) => void;
  setActiveTab: (tab: ActiveTab, mode?: 'login' | 'register') => void;
  initialMode?: 'login' | 'register';
}

export default function Auth({
  onLogin,
  setActiveTab,
  initialMode = 'login'
}: AuthProps) {

  const [isRegister, setIsRegister] = useState(
    initialMode === 'register'
  );

  useEffect(() => {
  const script = document.createElement('script');

  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;

  document.head.appendChild(script);

  return () => {
    document.head.removeChild(script);
  };
}, []);

  useEffect(() => {
    setIsRegister(initialMode === 'register');
  }, [initialMode]);

  // --------------------------------------------------
  // FIELD STATES
  // --------------------------------------------------

  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // --------------------------------------------------
  // PASSWORD VISIBILITY
  // --------------------------------------------------

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // --------------------------------------------------
  // UI STATES
  // --------------------------------------------------

  const [error, setError] = useState<string | null>(null);

  const [fieldErrors, setFieldErrors] = useState<{
    fullName?: boolean;
    contactNumber?: boolean;
    email?: boolean;
    password?: boolean;
    confirmPassword?: boolean;
  }>({});

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // --------------------------------------------------
  // API BASE URL
  // Uses your existing Netlify environment variable.
  // --------------------------------------------------

  const apiBaseUrl =
    import.meta.env.VITE_API_URL;

  // --------------------------------------------------
  // EMAIL VALIDATION
  // --------------------------------------------------

  const validateEmail = (emailStr: string) => {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(emailStr);
  };

  // --------------------------------------------------
  // CLEAR ERRORS
  // --------------------------------------------------

  const clearErrors = () => {
    setError(null);
    setFieldErrors({});
  };

  // --------------------------------------------------
  // HANDLE REGISTRATION
  // --------------------------------------------------

  const handleRegister = async () => {

    const errors: typeof fieldErrors = {};

    if (!fullName.trim()) {
      errors.fullName = true;
    }

    if (!/^\d{10}$/.test(contactNumber)) {
      errors.contactNumber = true;
    }

    if (!validateEmail(email.trim())) {
      errors.email = true;
    }

    if (!password) {
      errors.password = true;
    }

    if (password.length < 8) {
      errors.password = true;
    }

    if (!confirmPassword) {
      errors.confirmPassword = true;
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = true;
    }

    if (Object.keys(errors).length > 0) {

      setFieldErrors(errors);

      if (
        errors.confirmPassword &&
        password !== confirmPassword
      ) {
        setError('Passwords do not match.');
      } else if (errors.contactNumber) {
        setError('Please enter a valid 10-digit contact number.');
      } else if (errors.email) {
        setError('Please enter a valid email address.');
      } else if (errors.password) {
        setError('Password must contain at least 8 characters.');
      } else {
        setError('Please complete all required fields.');
      }

      return;
    }

    try {

      setIsLoading(true);
      setError(null);
      setFieldErrors({});

      const response = await fetch(
        `${apiBaseUrl}/registeruser`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
  FullName: fullName.trim(),
  Phone: contactNumber,
  Email: email.trim().toLowerCase(),
  Pass: password,
  ConfirmPassword: confirmPassword
})
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || 'Registration failed. Please try again.'
        );
      }

      // Save authentication token if returned.
      if (data.token) {
        localStorage.setItem(
          'exefun_token',
          data.token
        );
      }

      if (data.userId) {
        localStorage.setItem(
          'exefun_user_id',
          String(data.userId)
        );
      }

      setIsSuccess(true);

      // Give the success animation a moment to display.
      setTimeout(() => {

        onLogin({
          name: fullName.trim(),
          email: email.trim().toLowerCase(),
          avatarColor: 'bg-blue-600',
          avatarTag: fullName.trim().charAt(0).toUpperCase(),
          focusArea: 'Executive Functioning'
        });

      }, 1500);

    } catch (err: any) {

      console.error('Registration error:', err);

      setError(
        err?.message ||
        'Unable to connect to the registration service.'
      );

    } finally {
      setIsLoading(false);
    }
  };

  // --------------------------------------------------
  // HANDLE EMAIL LOGIN
  // --------------------------------------------------

  const handleLogin = async () => {

    const errors: typeof fieldErrors = {};

    if (!validateEmail(email.trim())) {
      errors.email = true;
    }

    if (!password) {
      errors.password = true;
    }

    if (Object.keys(errors).length > 0) {

      setFieldErrors(errors);

      if (errors.email) {
        setError('Please enter a valid email address.');
      } else {
        setError('Please enter your password.');
      }

      return;
    }

    try {

      setIsLoading(true);
      setError(null);
      setFieldErrors({});

      const response = await fetch(
        `${apiBaseUrl}/loginuseremail`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            Email: email.trim().toLowerCase(),
            Pass: password
          })
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || 'Login failed. Please check your credentials.'
        );
      }

      if (data.token) {
        localStorage.setItem(
          'exefun_token',
          data.token
        );
      }

      if (data.userId) {
        localStorage.setItem(
          'exefun_user_id',
          String(data.userId)
        );
      }

      setIsSuccess(true);

      // Retrieve profile information after successful authentication.
      if (data.user) {

        setTimeout(() => {

          onLogin({
            name:
              data.user.FullName ||
              data.user.fullName ||
              'Exefun User',

            email:
              data.user.Email ||
              data.user.email ||
              email.trim().toLowerCase(),

            avatarColor: 'bg-blue-600',

            avatarTag:
              (
                data.user.FullName ||
                data.user.fullName ||
                'E'
              )
                .charAt(0)
                .toUpperCase(),

            focusArea: 'Executive Functioning'
          });

        }, 1500);

      } else {

        // Fallback while server.js is finalized.
        setTimeout(() => {

          onLogin({
            name: 'Exefun User',
            email: email.trim().toLowerCase(),
            avatarColor: 'bg-blue-600',
            avatarTag: 'E',
            focusArea: 'Executive Functioning'
          });

        }, 1500);
      }

    } catch (err: any) {

      console.error('Login error:', err);

      setError(
        err?.message ||
        'Unable to connect to the login service.'
      );

    } finally {
      setIsLoading(false);
    }
  };

  // --------------------------------------------------
  // SUBMIT HANDLER
  // --------------------------------------------------

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (isLoading || isSuccess) {
      return;
    }

    clearErrors();

    if (isRegister) {
      await handleRegister();
    } else {
      await handleLogin();
    }
  };

  // --------------------------------------------------
  // GOOGLE SIGN-IN
  //
  // Actual Google verification remains server-side.
  // Server.js will be updated separately.
  // --------------------------------------------------

const handleGoogleSignIn = async () => {

  setError(null);

  if (isLoading || isSuccess) {
    return;
  }

  try {

    setIsLoading(true);

    const google = (window as any).google;

    if (!google?.accounts?.id) {
      throw new Error(
        'Google authentication is not available. Please try again.'
      );
    }

    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,

      callback: async (response: any) => {

        try {

          if (!response?.credential) {
            throw new Error(
              'Google authentication did not return a credential.'
            );
          }

          const serverResponse = await fetch(
            `${apiBaseUrl}/google-login`,
            {
              method: 'POST',

              headers: {
                'Content-Type': 'application/json'
              },

              body: JSON.stringify({
                token: response.credential
              })
            }
          );

          const data =
            await serverResponse.json();

          if (
            !serverResponse.ok ||
            !data.success
          ) {
            throw new Error(
              data.message ||
              'Google login failed. Please try again.'
            );
          }

          // ------------------------------------------
          // SAVE AUTHENTICATION
          // ------------------------------------------

          if (data.token) {
            localStorage.setItem(
              'exefun_token',
              data.token
            );
          }

          if (data.userId) {
            localStorage.setItem(
              'exefun_user_id',
              String(data.userId)
            );
          }

          // ------------------------------------------
          // SUCCESS
          // ------------------------------------------

          setIsSuccess(true);

          const user = data.user;

          setTimeout(() => {

            onLogin({
              name:
                user?.name ||
                user?.FullName ||
                'Exefun User',

              email:
                user?.email ||
                user?.Email ||
                '',

              avatarColor:
                user?.avatarColor ||
                'bg-blue-600',

              avatarTag:
                user?.avatarTag ||
                (
                  user?.name ||
                  user?.FullName ||
                  'E'
                )
                  .charAt(0)
                  .toUpperCase(),

              focusArea:
                user?.focusArea ||
                'Executive Functioning'
            });

          }, 1500);

        } catch (err: any) {

          console.error(
            'Google login error:',
            err
          );

          setError(
            err?.message ||
            'Google login failed. Please try again.'
          );

        } finally {
          setIsLoading(false);
        }
      }
    });

    google.accounts.id.prompt();

  } catch (err: any) {

    console.error(
      'Google authentication initialization error:',
      err
    );

    setError(
      err?.message ||
      'Unable to start Google authentication.'
    );

    setIsLoading(false);
  }
};

  // --------------------------------------------------
  // SWITCH MODE
  // --------------------------------------------------

  const switchMode = (
    register: boolean
  ) => {

    setIsRegister(register);

    setError(null);
    setFieldErrors({});

    setPassword('');
    setConfirmPassword('');

    if (!register) {
      setFullName('');
      setContactNumber('');
    }
  };

  return (
    <div
      className="w-full min-h-[85vh] flex items-center justify-center px-4 py-16 sm:py-24 bg-slate-50 relative overflow-hidden"
      id="auth-root"
    >

      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">

        {/* Breadcrumb Strip */}
        <div className="flex items-center justify-between mb-6">

          <nav className="flex items-center space-x-2 text-[10px] sm:text-xs font-mono tracking-wider text-slate-600 bg-white border border-slate-200 rounded-full py-1.5 px-4 shadow-sm">

            <button
              onClick={() => setActiveTab('home')}
              className="hover:text-blue-600 hover:underline transition-colors cursor-pointer"
            >
              HOME
            </button>

            <span className="text-slate-300">
              /
            </span>

            <span className="text-indigo-600 font-extrabold">
              {isRegister
                ? 'REGISTRATION'
                : 'PORTAL SIGN IN'}
            </span>

          </nav>

          <button
            onClick={() => setActiveTab('home')}
            className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-slate-500 hover:text-slate-900 transition-all cursor-pointer group"
          >
            <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />

            <span>
              BACK
            </span>

          </button>

        </div>

        {/* Success Screen Overlay */}
        <AnimatePresence>

          {isSuccess && (

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              exit={{
                opacity: 0,
                scale: 0.95
              }}
              className="absolute inset-0 bg-white/95 rounded-3xl border border-slate-100 p-8 flex flex-col items-center justify-center text-center z-50 shadow-2xl"
            >

              <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mb-4">

                <CheckCircle2 className="h-8 w-8 text-emerald-600 animate-bounce" />

              </div>

              <h3 className="text-xl font-sans font-extrabold text-slate-900">
                Verification Successful
              </h3>

              <p className="text-slate-500 text-xs sm:text-sm font-sans mt-2 max-w-xs leading-relaxed">

                {isRegister
                  ? 'Your Exefun account has been created successfully! Initializing your cognitive dashboard.'
                  : 'Welcome back! Your account has been authenticated successfully.'}

              </p>

              <div className="flex items-center space-x-2 mt-6 text-indigo-600 text-xs font-mono">

                <Sparkles className="h-4 w-4 animate-spin" />

                <span>
                  REDIRECTING TO EXEFUN HOME...
                </span>

              </div>

            </motion.div>

          )}

        </AnimatePresence>

        {/* Auth Card Container */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">

          {/* Header */}
          <div className="text-center space-y-3 mb-8">

            <div className="inline-flex items-center justify-center space-x-2">

              <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 p-2.5 rounded-xl">

                <Brain className="h-5 w-5 text-white" />

              </div>

              <span className="text-xl font-sans font-extrabold tracking-tight text-slate-900">

                Exe<span className="text-blue-600">
                  fun
                </span>

              </span>

            </div>

            <div>

              <h2 className="text-xl sm:text-2xl font-sans font-extrabold text-slate-900 tracking-tight">

                {isRegister
                  ? 'Create Your Account'
                  : 'Portal Sign In'}

              </h2>

              <p className="text-slate-500 text-xs sm:text-sm font-sans mt-1">

                {isRegister
                  ? 'Register now to calibrate your Executive Functioning skills'
                  : 'Access your saved baseline metrics & training games'}

              </p>

            </div>

          </div>

          {/* Google Button */}
          <div className="space-y-4">

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-900 text-xs sm:text-sm font-bold transition-all border border-slate-200 shadow-sm cursor-pointer group active:scale-95 disabled:opacity-50"
            >

              <svg
                className="h-5 w-5 group-hover:scale-105 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
              >

                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />

                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />

                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#FBBC05"
                />

                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  fill="#EA4335"
                />

              </svg>

              <span>
                {isRegister
                  ? 'Register with Google'
                  : 'Sign in with Google'}
              </span>

            </button>

            {/* Divider */}
            <div className="relative flex py-2 items-center">

              <div className="flex-grow border-t border-slate-200" />

              <span className="flex-shrink mx-4 text-[10px] font-mono uppercase text-slate-400 tracking-widest bg-white px-2">
                or continue with email
              </span>

              <div className="flex-grow border-t border-slate-200" />

            </div>

            {/* Error */}
            {error && (

              <motion.div
                initial={{
                  opacity: 0,
                  y: -8
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-2.5 text-left text-xs text-red-600"
              >

                <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />

                <span className="font-sans leading-relaxed">
                  {error}
                </span>

              </motion.div>

            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4 text-left"
            >

              {/* Registration fields */}
              {isRegister && (

                <div className="grid grid-cols-1 gap-4">

                  {/* Full Name */}
                  <div className="space-y-1.5">

                    <label className="text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">
                      Full Name
                    </label>

                    <div className="relative">

                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                        <User className="h-4 w-4" />
                      </div>

                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => {

                          setFullName(e.target.value);

                          if (fieldErrors.fullName) {
                            setFieldErrors(prev => ({
                              ...prev,
                              fullName: false
                            }));
                          }

                          setError(null);

                        }}
                        placeholder="Aarav Sharma"
                        className={`w-full bg-slate-50 border ${
                          fieldErrors.fullName
                            ? 'border-red-500 bg-red-50/20 focus:border-red-500'
                            : 'border-slate-200 focus:border-blue-500'
                        } rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white transition-all font-sans`}
                      />

                    </div>

                  </div>

                  {/* Contact Number */}
                  <div className="space-y-1.5">

                    <label className="text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">

                      Contact Number{' '}

                      <span className="text-slate-400 font-medium">
                        (10 digits)
                      </span>

                    </label>

                    <div className="relative">

                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                        <Phone className="h-4 w-4" />
                      </div>

                      <input
                        type="tel"
                        required
                        inputMode="numeric"
                        value={contactNumber}
                        onChange={(e) => {

                          const cleaned =
                            e.target.value
                              .replace(/\D/g, '')
                              .slice(0, 10);

                          setContactNumber(cleaned);

                          if (fieldErrors.contactNumber) {
                            setFieldErrors(prev => ({
                              ...prev,
                              contactNumber: false
                            }));
                          }

                          setError(null);

                        }}
                        placeholder="9876543210"
                        className={`w-full bg-slate-50 border ${
                          fieldErrors.contactNumber
                            ? 'border-red-500 bg-red-50/20 focus:border-red-500'
                            : 'border-slate-200 focus:border-blue-500'
                        } rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white transition-all font-sans`}
                      />

                    </div>

                  </div>

                </div>

              )}

              {/* Email */}
              <div className="space-y-1.5">

                <label className="text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">
                  Email Address
                </label>

                <div className="relative">

                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="h-4 w-4" />
                  </div>

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {

                      setEmail(e.target.value);

                      if (fieldErrors.email) {
                        setFieldErrors(prev => ({
                          ...prev,
                          email: false
                        }));
                      }

                      setError(null);

                    }}
                    placeholder="myemailaddress@gmail.com"
                    className={`w-full bg-slate-50 border ${
                      fieldErrors.email
                        ? 'border-red-500 bg-red-50/20 focus:border-red-500'
                        : 'border-slate-200 focus:border-blue-500'
                    } rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white transition-all font-sans`}
                  />

                </div>

              </div>

              {/* Password Fields */}
              <div
                className={
                  isRegister
                    ? 'grid grid-cols-1 sm:grid-cols-2 gap-4'
                    : 'space-y-1.5'
                }
              >

                {/* Password */}
                <div className="space-y-1.5">

                  <label className="text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">
                    Password
                  </label>

                  <div className="relative">

                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="h-4 w-4" />
                    </div>

                    <input
                      type={
                        showPassword
                          ? 'text'
                          : 'password'
                      }
                      required
                      value={password}
                      onChange={(e) => {

                        setPassword(e.target.value);

                        if (fieldErrors.password) {
                          setFieldErrors(prev => ({
                            ...prev,
                            password: false
                          }));
                        }

                        setError(null);

                      }}
                      placeholder="••••••••"
                      className={`w-full bg-slate-50 border ${
                        fieldErrors.password
                          ? 'border-red-500 bg-red-50/20 focus:border-red-500'
                          : 'border-slate-200 focus:border-blue-500'
                      } rounded-xl py-2.5 pl-10 pr-10 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white transition-all font-sans`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                    >

                      {showPassword
                        ? <EyeOff className="h-4 w-4 text-slate-400" />
                        : <Eye className="h-4 w-4 text-slate-400" />}

                    </button>

                  </div>

                  {/* Password requirement */}
                  {isRegister && (
                    <p className="text-[9px] text-slate-400">
                      Minimum 8 characters
                    </p>
                  )}

                </div>

                {/* Confirm Password */}
                {isRegister && (

                  <div className="space-y-1.5">

                    <label className="text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">
                      Confirm Password
                    </label>

                    <div className="relative">

                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                        <Lock className="h-4 w-4" />
                      </div>

                      <input
                        type={
                          showConfirmPassword
                            ? 'text'
                            : 'password'
                        }
                        required
                        value={confirmPassword}
                        onChange={(e) => {

                          setConfirmPassword(
                            e.target.value
                          );

                          if (fieldErrors.confirmPassword) {
                            setFieldErrors(prev => ({
                              ...prev,
                              confirmPassword: false
                            }));
                          }

                          setError(null);

                        }}
                        placeholder="••••••••"
                        className={`w-full bg-slate-50 border ${
                          fieldErrors.confirmPassword
                            ? 'border-red-500 bg-red-50/20 focus:border-red-500'
                            : 'border-slate-200 focus:border-blue-500'
                        } rounded-xl py-2.5 pl-10 pr-10 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white transition-all font-sans`}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            !showConfirmPassword
                          )
                        }
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                      >

                        {showConfirmPassword
                          ? <EyeOff className="h-4 w-4 text-slate-400" />
                          : <Eye className="h-4 w-4 text-slate-400" />}

                      </button>

                    </div>

                  </div>

                )}

              </div>

              {/* Research Disclosure */}
              <div className="text-[10px] text-slate-400 leading-normal font-sans py-1">

                By processing your academic credentials, you acknowledge that all visual test metrics will be collected for evaluation of peer cognitive baselines under complete academic anonymity.

              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading || isSuccess}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer shadow-md shadow-blue-500/10 flex items-center justify-center space-x-2 active:scale-98 disabled:opacity-50"
              >

                {isLoading ? (

                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >

                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />

                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />

                    </svg>

                    <span>
                      Verifying Credentials...
                    </span>

                  </>

                ) : (

                  <>
                    <span>
                      {isRegister
                        ? 'Generate Your Account'
                        : 'Authenticate Portal Access'}
                    </span>

                    <ArrowRight className="h-4 w-4" />

                  </>

                )}

              </button>

            </form>

            {/* Mode Switch */}
            <div className="text-center pt-4 text-xs font-sans text-slate-500">

              {isRegister ? (

                <span>

                  Already registered?{' '}

                  <button
                    type="button"
                    onClick={() =>
                      switchMode(false)
                    }
                    className="text-blue-600 hover:text-blue-700 font-bold underline transition-colors cursor-pointer bg-transparent border-none p-0"
                  >
                    Authenticate here
                  </button>

                </span>

              ) : (

                <span>

                  Need an academic study account?{' '}

                  <button
                    type="button"
                    onClick={() =>
                      switchMode(true)
                    }
                    className="text-blue-600 hover:text-blue-700 font-bold underline transition-colors cursor-pointer bg-transparent border-none p-0"
                  >
                    Register here
                  </button>

                </span>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}