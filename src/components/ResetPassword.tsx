import React, { useState } from 'react';

import {
  Brain,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';

import {
  motion,
  AnimatePresence,
} from 'motion/react';


// --------------------------------------------------
// RESET PASSWORD PROPS
// --------------------------------------------------

interface ResetPasswordProps {
  resetToken: string;

  onBackToLogin: () => void;
}


// --------------------------------------------------
// RESET PASSWORD COMPONENT
// --------------------------------------------------

export default function ResetPassword({
  resetToken,
  onBackToLogin,
}: ResetPasswordProps) {

  // --------------------------------------------------
  // FIELD STATES
  // --------------------------------------------------

  const [password, setPassword] =
    useState('');

  const [confirmPassword, setConfirmPassword] =
    useState('');


  // --------------------------------------------------
  // PASSWORD VISIBILITY
  // --------------------------------------------------

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);


  // --------------------------------------------------
  // UI STATES
  // --------------------------------------------------

  const [error, setError] =
    useState<string | null>(null);

  const [isLoading, setIsLoading] =
    useState(false);

  const [isSuccess, setIsSuccess] =
    useState(false);


  // --------------------------------------------------
  // API BASE URL
  // --------------------------------------------------

  const apiBaseUrl =
    import.meta.env.VITE_API_URL;


  // --------------------------------------------------
  // HANDLE RESET PASSWORD
  // --------------------------------------------------

  const handleResetPassword = async () => {

    // ------------------------------------------
    // VALIDATION
    // ------------------------------------------

    if (!resetToken) {

      setError(
        'This password reset link is invalid or incomplete.'
      );

      return;

    }


    if (!password) {

      setError(
        'Please enter your new password.'
      );

      return;

    }


    if (password.length < 8) {

      setError(
        'Password must contain at least 8 characters.'
      );

      return;

    }


    if (!confirmPassword) {

      setError(
        'Please confirm your new password.'
      );

      return;

    }


    if (password !== confirmPassword) {

      setError(
        'Passwords do not match.'
      );

      return;

    }


    // ------------------------------------------
    // API REQUEST
    // ------------------------------------------

    try {

      setIsLoading(true);
      setError(null);


      const response =
        await fetch(
          `${apiBaseUrl}/reset-password`,
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body: JSON.stringify({

              resetToken,

              password,

              confirmPassword,

            }),

          }
        );


      const data =
        await response.json();


      // ------------------------------------------
      // API ERROR
      // ------------------------------------------

      if (
        !response.ok ||
        !data.success
      ) {

        throw new Error(
          data.message ||
          'Unable to reset your password. Please try again.'
        );

      }


      // ------------------------------------------
      // SUCCESS
      // ------------------------------------------

      setIsSuccess(true);

      setPassword('');
      setConfirmPassword('');


    } catch (err: any) {

      console.error(
        'Password reset error:',
        err
      );

      setError(
        err?.message ||
        'Unable to connect to the password reset service.'
      );


    } finally {

      setIsLoading(false);

    }

  };


  // --------------------------------------------------
  // FORM SUBMIT
  // --------------------------------------------------

  const handleSubmit = (
    e: React.FormEvent
  ) => {

    e.preventDefault();


    if (
      isLoading ||
      isSuccess
    ) {

      return;

    }


    setError(null);

    handleResetPassword();

  };


  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (

    <div
      className="w-full min-h-[85vh] flex items-center justify-center px-4 py-16 sm:py-24 bg-slate-50 relative overflow-hidden"
      id="reset-password-root"
    >

      {/* ------------------------------------------------ */}
      {/* DECORATIVE AMBIENT BACKGROUND */}
      {/* ------------------------------------------------ */}

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />


      <div className="w-full max-w-md relative z-10">


        {/* ------------------------------------------------ */}
        {/* BREADCRUMB STRIP */}
        {/* ------------------------------------------------ */}

        <div className="flex items-center justify-between mb-6">

          <nav className="flex items-center space-x-2 text-[10px] sm:text-xs font-mono tracking-wider text-slate-600 bg-white border border-slate-200 rounded-full py-1.5 px-4 shadow-sm">

            <button
              type="button"
              onClick={onBackToLogin}
              className="hover:text-blue-600 hover:underline transition-colors cursor-pointer"
            >
              PORTAL SIGN IN
            </button>

            <span className="text-slate-300">
              /
            </span>

            <span className="text-indigo-600 font-extrabold">

              PASSWORD RESET

            </span>

          </nav>


          <button
            type="button"
            onClick={onBackToLogin}
            className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-slate-500 hover:text-slate-900 transition-all cursor-pointer group"
          >

            <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />

            <span>
              BACK
            </span>

          </button>

        </div>


        {/* ------------------------------------------------ */}
        {/* SUCCESS SCREEN */}
        {/* ------------------------------------------------ */}

        <AnimatePresence>

          {isSuccess && (

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
              }}
              className="absolute inset-0 bg-white/95 rounded-3xl border border-slate-100 p-8 flex flex-col items-center justify-center text-center z-50 shadow-2xl"
            >

              <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mb-4">

                <CheckCircle2 className="h-8 w-8 text-emerald-600 animate-bounce" />

              </div>


              <h3 className="text-xl font-sans font-extrabold text-slate-900">

                Password Reset Successful

              </h3>


              <p className="text-slate-500 text-xs sm:text-sm font-sans mt-2 max-w-xs leading-relaxed">

                Your Exefun account password has
                been updated successfully. You can
                now sign in using your new password.

              </p>


              <button
                type="button"
                onClick={onBackToLogin}
                className="mt-6 inline-flex items-center justify-center space-x-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-500/10 active:scale-95 cursor-pointer"
              >

                <span>
                  Return to Portal Sign In
                </span>

                <ArrowRight className="h-4 w-4" />

              </button>


              <div className="flex items-center space-x-2 mt-5 text-indigo-600 text-[10px] font-mono">

                <Sparkles className="h-3.5 w-3.5" />

                <span>
                  YOUR ACCOUNT IS SECURE
                </span>

              </div>

            </motion.div>

          )}

        </AnimatePresence>


        {/* ------------------------------------------------ */}
        {/* RESET CARD */}
        {/* ------------------------------------------------ */}

        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">


          {/* ------------------------------------------------ */}
          {/* HEADER */}
          {/* ------------------------------------------------ */}

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

                Create New Password

              </h2>


              <p className="text-slate-500 text-xs sm:text-sm font-sans mt-1">

                Choose a new password to secure your
                Exefun account.

              </p>

            </div>

          </div>


          {/* ------------------------------------------------ */}
          {/* ERROR */}
          {/* ------------------------------------------------ */}

          {error && (

            <motion.div
              initial={{
                opacity: 0,
                y: -8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mb-4 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-2.5 text-left text-xs text-red-600"
            >

              <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />

              <span className="font-sans leading-relaxed">

                {error}

              </span>

            </motion.div>

          )}


          {/* ------------------------------------------------ */}
          {/* FORM */}
          {/* ------------------------------------------------ */}

          <form
            onSubmit={handleSubmit}
            className="space-y-4 text-left"
          >


            {/* ------------------------------------------------ */}
            {/* NEW PASSWORD */}
            {/* ------------------------------------------------ */}

            <div className="space-y-1.5">

              <label className="text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">

                New Password

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

                    setPassword(
                      e.target.value
                    );

                    setError(null);

                  }}
                  placeholder="••••••••"
                  disabled={isLoading}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl py-2.5 pl-10 pr-10 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white transition-all font-sans disabled:opacity-60"
                />


                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  disabled={isLoading}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-800 transition-colors cursor-pointer disabled:cursor-not-allowed"
                >

                  {showPassword

                    ? (
                      <EyeOff className="h-4 w-4 text-slate-400" />
                    )

                    : (
                      <Eye className="h-4 w-4 text-slate-400" />
                    )}

                </button>

              </div>


              <p className="text-[9px] text-slate-400">

                Minimum 8 characters

              </p>

            </div>


            {/* ------------------------------------------------ */}
            {/* CONFIRM PASSWORD */}
            {/* ------------------------------------------------ */}

            <div className="space-y-1.5">

              <label className="text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">

                Confirm New Password

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

                    setError(null);

                  }}
                  placeholder="••••••••"
                  disabled={isLoading}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl py-2.5 pl-10 pr-10 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white transition-all font-sans disabled:opacity-60"
                />


                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  disabled={isLoading}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-800 transition-colors cursor-pointer disabled:cursor-not-allowed"
                >

                  {showConfirmPassword

                    ? (
                      <EyeOff className="h-4 w-4 text-slate-400" />
                    )

                    : (
                      <Eye className="h-4 w-4 text-slate-400" />
                    )}

                </button>

              </div>

            </div>


            {/* ------------------------------------------------ */}
            {/* SECURITY NOTE */}
            {/* ------------------------------------------------ */}

            <div className="text-[10px] text-slate-400 leading-normal font-sans py-1">

              Your password must contain at least
              8 characters. For your security, this
              reset link expires after 30 minutes.

            </div>


            {/* ------------------------------------------------ */}
            {/* SUBMIT */}
            {/* ------------------------------------------------ */}

            <button
              type="submit"
              disabled={
                isLoading ||
                isSuccess
              }
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
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.72 5.824 4.07 7.938l2.65-2.647z"
                    />

                  </svg>

                  <span>
                    Updating Password...
                  </span>

                </>

              ) : (

                <>

                  <span>
                    Reset My Password
                  </span>

                  <ArrowRight className="h-4 w-4" />

                </>

              )}

            </button>

          </form>


          {/* ------------------------------------------------ */}
          {/* BACK TO LOGIN */}
          {/* ------------------------------------------------ */}

          <div className="text-center pt-5 text-xs font-sans text-slate-500">

            Remember your password?{' '}

            <button
              type="button"
              onClick={onBackToLogin}
              className="text-blue-600 hover:text-blue-700 font-bold underline transition-colors cursor-pointer bg-transparent border-none p-0"
            >

              Authenticate here

            </button>

          </div>


        </div>

      </div>

    </div>

  );

}