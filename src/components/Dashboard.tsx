import React, { useEffect, useState } from 'react';
import {
  Brain,
  LogOut,
  UserRound,
  CalendarDays,
  GraduationCap,
  Users,
  BookOpen,
  HeartPulse,
  CheckCircle2,
  AlertCircle,
  Save,
  Loader2,
} from 'lucide-react';

import { ActiveTab } from '../types';

interface DashboardUser {
  name: string;
  email: string;
  avatarColor: string;
  avatarTag: string;
  focusArea: string;
}

interface DashboardProps {
  user: DashboardUser;
  setActiveTab: (
    tab: ActiveTab,
    mode?: 'login' | 'register'
  ) => void;
  onLogout: () => void;
}

interface UserProfile {
  age: number | null;
  dob: string | null;
  yearsOfEducation: number | null;
  gender: string | null;
  educationLevel: string | null;
  backgroundInformation: string | null;
  profileCompleted: boolean;
}

interface ProfileForm {
  age: string;
  dob: string;
  yearsOfEducation: string;
  gender: string;
  educationLevel: string;
  backgroundInformation: string;
}

const emptyProfile: ProfileForm = {
  age: '',
  dob: '',
  yearsOfEducation: '',
  gender: '',
  educationLevel: '',
  backgroundInformation: '',
};

export default function Dashboard({
  user,
  onLogout,
}: DashboardProps) {

  const apiBaseUrl =
    import.meta.env.VITE_API_URL;

  const userId =
    localStorage.getItem('exefun_user_id');

  const [form, setForm] =
    useState<ProfileForm>(emptyProfile);

  const [profileCompleted, setProfileCompleted] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isSaving, setIsSaving] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [success, setSuccess] =
    useState<string | null>(null);

  // --------------------------------------------------
  // LOAD USER PROFILE
  // --------------------------------------------------

  useEffect(() => {

    const loadProfile = async () => {

      if (!userId) {
        setError(
          'Unable to identify your account. Please sign in again.'
        );

        setIsLoading(false);
        return;
      }

      try {

        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `${apiBaseUrl}/userprofile/${userId}`
        );

        const data =
          await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
            'Unable to load your profile.'
          );
        }

        const profile: UserProfile =
          data.profile;

        setForm({
          age:
            profile.age !== null &&
            profile.age !== undefined
              ? String(profile.age)
              : '',

          dob:
            profile.dob
              ? profile.dob.substring(0, 10)
              : '',

          yearsOfEducation:
            profile.yearsOfEducation !== null &&
            profile.yearsOfEducation !== undefined
              ? String(profile.yearsOfEducation)
              : '',

          gender:
            profile.gender || '',

          educationLevel:
            profile.educationLevel || '',

          backgroundInformation:
            profile.backgroundInformation || '',
        });

        setProfileCompleted(
          Boolean(profile.profileCompleted)
        );

      } catch (err: any) {

        console.error(
          'Profile loading error:',
          err
        );

        setError(
          err?.message ||
          'Unable to load your profile.'
        );

      } finally {

        setIsLoading(false);

      }
    };

    loadProfile();

  }, [apiBaseUrl, userId]);

  // --------------------------------------------------
  // HANDLE INPUT
  // --------------------------------------------------

  const handleChange = (
    field: keyof ProfileForm,
    value: string
  ) => {

    setForm(prev => ({
      ...prev,
      [field]: value,
    }));

    setError(null);
    setSuccess(null);
  };

  // --------------------------------------------------
  // VALIDATE FORM
  // --------------------------------------------------

  const validateForm = () => {

    const age =
      Number(form.age);

    const yearsOfEducation =
      Number(form.yearsOfEducation);

    if (!form.age) {
      return 'Please enter your age.';
    }

    if (
      !Number.isInteger(age) ||
      age <= 0 ||
      age > 120
    ) {
      return 'Please enter a valid age.';
    }

    if (!form.dob) {
      return 'Please select your date of birth.';
    }

    if (!form.yearsOfEducation) {
      return 'Please enter your years of education.';
    }

    if (
      !Number.isInteger(yearsOfEducation) ||
      yearsOfEducation < 0 ||
      yearsOfEducation > 100
    ) {
      return 'Please enter a valid number of years of education.';
    }

    if (!form.gender) {
      return 'Please select your gender.';
    }

    if (!form.educationLevel) {
      return 'Please select your education level.';
    }

    if (!form.backgroundInformation) {
      return 'Please select your background information.';
    }

    return null;
  };

  // --------------------------------------------------
  // SAVE PROFILE
  // --------------------------------------------------

  const handleSaveProfile = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setError(null);
    setSuccess(null);

    const validationError =
      validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    if (!userId) {
      setError(
        'Unable to identify your account. Please sign in again.'
      );
      return;
    }

    try {

      setIsSaving(true);

      const response = await fetch(
        `${apiBaseUrl}/userprofile/${userId}`,
        {
          method: 'PUT',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            Age: Number(form.age),
            DOB: form.dob,
            YearsOfEducation:
              Number(form.yearsOfEducation),
            Gender: form.gender,
            EducationLevel:
              form.educationLevel,
            BackgroundInformation:
              form.backgroundInformation,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
          'Unable to save your profile.'
        );
      }

      setProfileCompleted(
        Boolean(data.profileCompleted)
      );

      setSuccess(
        'Your profile has been saved successfully.'
      );

    } catch (err: any) {

      console.error(
        'Profile save error:',
        err
      );

      setError(
        err?.message ||
        'Unable to save your profile.'
      );

    } finally {

      setIsSaving(false);

    }
  };

  // --------------------------------------------------
  // LOADING SCREEN
  // --------------------------------------------------

  if (isLoading) {

    return (
      <div className="min-h-[85vh] bg-slate-50 flex items-center justify-center px-4">

        <div className="flex flex-col items-center text-center">

          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />

          <p className="mt-3 text-sm font-semibold text-slate-600">
            Loading your profile...
          </p>

        </div>

      </div>
    );
  }

  // --------------------------------------------------
  // DASHBOARD
  // --------------------------------------------------

  return (

    <div className="min-h-[85vh] bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-5xl">

        {/* ------------------------------------------------ */}
        {/* HEADER */}
        {/* ------------------------------------------------ */}

        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <div className="mb-2 flex items-center gap-2">

              <div className="rounded-lg bg-blue-600 p-2">

                <Brain className="h-5 w-5 text-white" />

              </div>

              <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600">
                Exefun Dashboard
              </span>

            </div>

            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Welcome back, {user.name}
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Complete your profile before beginning your Exefun experience.
            </p>

          </div>

          {/* User */}
          <div className="flex items-center gap-3">

            <div
              className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white ${
                user.avatarColor || 'bg-blue-600'
              }`}
            >
              {user.avatarTag ||
                user.name.charAt(0).toUpperCase()}
            </div>

            <div className="hidden sm:block">

              <p className="text-sm font-bold text-slate-900">
                {user.name}
              </p>

              <p className="text-xs text-slate-500">
                {user.email}
              </p>

            </div>

          </div>

        </div>

        {/* ------------------------------------------------ */}
        {/* PROFILE STATUS */}
        {/* ------------------------------------------------ */}

        <div
          className={`mb-6 rounded-2xl border p-5 ${
            profileCompleted
              ? 'border-emerald-200 bg-emerald-50'
              : 'border-amber-200 bg-amber-50'
          }`}
        >

          <div className="flex items-start gap-3">

            {profileCompleted ? (

              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

            ) : (

              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

            )}

            <div>

              <h2
                className={`text-sm font-extrabold ${
                  profileCompleted
                    ? 'text-emerald-800'
                    : 'text-amber-800'
                }`}
              >
                {profileCompleted
                  ? 'Profile Active'
                  : 'Profile Incomplete'}
              </h2>

              <p
                className={`mt-1 text-xs leading-relaxed ${
                  profileCompleted
                    ? 'text-emerald-700'
                    : 'text-amber-700'
                }`}
              >
                {profileCompleted
                  ? 'Your required demographic and educational information has been completed.'
                  : 'Please complete all required information below to activate your profile.'}
              </p>

            </div>

          </div>

        </div>

        {/* ------------------------------------------------ */}
        {/* ERROR */}
        {/* ------------------------------------------------ */}

        {error && (

          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4">

            <div className="flex items-start gap-3">

              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

              <p className="text-sm text-red-700">
                {error}
              </p>

            </div>

          </div>

        )}

        {/* ------------------------------------------------ */}
        {/* SUCCESS */}
        {/* ------------------------------------------------ */}

        {success && (

          <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">

            <div className="flex items-start gap-3">

              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

              <p className="text-sm text-emerald-700">
                {success}
              </p>

            </div>

          </div>

        )}

        {/* ------------------------------------------------ */}
        {/* PROFILE FORM */}
        {/* ------------------------------------------------ */}

        <form
          onSubmit={handleSaveProfile}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >

          {/* Form Header */}

          <div className="mb-8">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-blue-50 p-3">

                <UserRound className="h-5 w-5 text-blue-600" />

              </div>

              <div>

                <h2 className="text-xl font-extrabold text-slate-900">
                  Complete Your Profile
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  All fields below are required.
                </p>

              </div>

            </div>

          </div>

          {/* Fields */}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            {/* AGE */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-600">

                <UserRound className="h-4 w-4 text-slate-400" />

                Age

                <span className="text-red-500">*</span>

              </label>

              <input
                type="number"
                min="1"
                max="120"
                required
                value={form.age}
                onChange={(e) =>
                  handleChange(
                    'age',
                    e.target.value
                  )
                }
                placeholder="Enter your age"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-all focus:border-blue-500 focus:bg-white"
              />

            </div>

            {/* DOB */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-600">

                <CalendarDays className="h-4 w-4 text-slate-400" />

                Date of Birth

                <span className="text-red-500">*</span>

              </label>

              <input
                type="date"
                required
                value={form.dob}
                onChange={(e) =>
                  handleChange(
                    'dob',
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-all focus:border-blue-500 focus:bg-white"
              />

            </div>

            {/* YEARS OF EDUCATION */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-600">

                <BookOpen className="h-4 w-4 text-slate-400" />

                Years of Education

                <span className="text-red-500">*</span>

              </label>

              <input
                type="number"
                min="0"
                max="100"
                required
                value={form.yearsOfEducation}
                onChange={(e) =>
                  handleChange(
                    'yearsOfEducation',
                    e.target.value
                  )
                }
                placeholder="e.g. 16"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-all focus:border-blue-500 focus:bg-white"
              />

            </div>

            {/* GENDER */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-600">

                <Users className="h-4 w-4 text-slate-400" />

                Gender

                <span className="text-red-500">*</span>

              </label>

              <select
                required
                value={form.gender}
                onChange={(e) =>
                  handleChange(
                    'gender',
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-all focus:border-blue-500 focus:bg-white"
              >

                <option value="">
                  Select gender
                </option>

                <option value="male">
                  Male
                </option>

                <option value="female">
                  Female
                </option>

                <option value="other">
                  Other
                </option>

              </select>

            </div>

            {/* EDUCATION LEVEL */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-600">

                <GraduationCap className="h-4 w-4 text-slate-400" />

                Education Level

                <span className="text-red-500">*</span>

              </label>

              <select
                required
                value={form.educationLevel}
                onChange={(e) =>
                  handleChange(
                    'educationLevel',
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-all focus:border-blue-500 focus:bg-white"
              >

                <option value="">
                  Select education level
                </option>

                <option value="High school">
                  High school
                </option>

                <option value="Intermediate">
                  Intermediate
                </option>

                <option value="Under Graduate">
                  Under Graduate
                </option>

                <option value="Post Graduate">
                  Post Graduate
                </option>

                <option value="Doctorate">
                  Doctorate
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>

            {/* BACKGROUND */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-600">

                <HeartPulse className="h-4 w-4 text-slate-400" />

                Background Information

                <span className="text-red-500">*</span>

              </label>

              <select
                required
                value={form.backgroundInformation}
                onChange={(e) =>
                  handleChange(
                    'backgroundInformation',
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-all focus:border-blue-500 focus:bg-white"
              >

                <option value="">
                  Select background information
                </option>

                <option value="Learning Disability">
                  Learning Disability
                </option>

                <option value="ADHD/ADD">
                  ADHD/ADD
                </option>

                <option value="Anxiety">
                  Anxiety
                </option>

                <option value="Depression">
                  Depression
                </option>

                <option value="Bipolar">
                  Bipolar
                </option>

                <option value="Other">
                  Other
                </option>

                <option value="None">
                  None
                </option>

              </select>

            </div>

          </div>

          {/* Required Notice */}

          <div className="mt-8 rounded-2xl bg-slate-50 p-4">

            <p className="text-xs leading-relaxed text-slate-500">

              <span className="font-bold text-slate-700">
                Required information:
              </span>{' '}

              All six profile fields must be completed before your profile can be considered active.

            </p>

          </div>

          {/* Save */}

          <div className="mt-8 flex justify-end">

            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {isSaving ? (

                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving Profile...
                </>

              ) : (

                <>
                  <Save className="h-4 w-4" />
                  Save Profile
                </>

              )}

            </button>

          </div>

        </form>

        {/* ------------------------------------------------ */}
        {/* SIGN OUT */}
        {/* ------------------------------------------------ */}

        <div className="mt-8 flex justify-end">

          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >

            <LogOut className="h-4 w-4" />

            Sign Out

          </button>

        </div>

      </div>

    </div>
  );
}