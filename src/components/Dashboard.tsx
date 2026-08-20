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
  MessageSquare,
  Clock,
  RefreshCw,
  XCircle,
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

interface SupportTicket {
  id: number;
  ticketId: string;
  fullName: string;
  email: string;
  category: string;
  affiliation: string | null;
  message: string;
  mstatus: number;
  createdAt: string;
}

interface QuestionnaireQuestion {
  id: number;
  a1: number;
  a2: string;
  a3: string;
  a4: string;
  a5: string;
}

interface QuestionnaireAnswer {
  taskId: number;
  responseValue: number;
  scoredValue: number;
  dimension: string;
}

const emptyProfile: ProfileForm = {
  age: '',
  dob: '',
  yearsOfEducation: '',
  gender: '',
  educationLevel: '',
  backgroundInformation: '',
};

/*
 * --------------------------------------------------
 * QUESTIONNAIRE SCALE
 * --------------------------------------------------
 */

const likertScale: {
  value: number;
  label: string;
}[] = [
  {
    value: 1,
    label: 'Never',
  },
  {
    value: 2,
    label: 'Rarely',
  },
  {
    value: 3,
    label: 'Sometimes',
  },
  {
    value: 4,
    label: 'Often',
  },
  {
    value: 5,
    label: 'Always',
  },
];

export default function Dashboard({
  user,
  setActiveTab,
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
  // SUPPORT TICKETS
  // --------------------------------------------------

  const [supportTickets, setSupportTickets] =
    useState<SupportTicket[]>([]);

  const [isTicketsLoading, setIsTicketsLoading] =
    useState(true);

  const [ticketsError, setTicketsError] =
    useState<string | null>(null);

  const [closingTicketId, setClosingTicketId] =
    useState<string | null>(null);

  // --------------------------------------------------
  // QUESTIONNAIRE
  // --------------------------------------------------

  const [questionnaire, setQuestionnaire] =
    useState<QuestionnaireQuestion[]>([]);

  const [questionnaireAnswers, setQuestionnaireAnswers] =
    useState<Record<number, number>>({});

  const [isQuestionnaireLoading, setIsQuestionnaireLoading] =
    useState(true);

  const [isQuestionnaireSubmitting, setIsQuestionnaireSubmitting] =
    useState(false);

  const [questionnaireError, setQuestionnaireError] =
    useState<string | null>(null);

  const [questionnaireSubmitted, setQuestionnaireSubmitted] =
    useState(false);

  const [questionnaireScore, setQuestionnaireScore] =
    useState<number | null>(null);

  // --------------------------------------------------
  // REVERSE SCORING
  // --------------------------------------------------

  const isReverseItem = (
    question: QuestionnaireQuestion
  ) =>
    question.a4
      ?.toLowerCase()
      .includes('negative');

  const getScoredValue = (
    question: QuestionnaireQuestion,
    responseValue: number
  ) => {
    if (isReverseItem(question)) {
      return 6 - responseValue;
    }

    return responseValue;
  };

  // --------------------------------------------------
  // LOAD QUESTIONNAIRE
  // --------------------------------------------------

  useEffect(() => {
    const loadQuestionnaire = async () => {
      try {
        setIsQuestionnaireLoading(true);
        setQuestionnaireError(null);

        const response = await fetch(
          `${apiBaseUrl}/questiontasks`
        );

        const contentType =
          response.headers.get('content-type') || '';

        if (!contentType.includes('application/json')) {
          throw new Error(
            'The questionnaire API did not return JSON. Please check the API URL and backend route.'
          );
        }

        const data =
          await response.json();

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.message ||
            'Unable to load questionnaire.'
          );
        }

        const questions =
          Array.isArray(data.questions)
            ? data.questions
            : [];

        if (questions.length !== 65) {
          console.warn(
            `Expected 65 questionnaire items, received ${questions.length}.`
          );
        }

        setQuestionnaire(questions);
      } catch (err: any) {
        console.error(
          'Questionnaire loading error:',
          err
        );

        setQuestionnaireError(
          err?.message ||
          'Unable to load the questionnaire.'
        );
      } finally {
        setIsQuestionnaireLoading(false);
      }
    };

    loadQuestionnaire();
  }, [apiBaseUrl]);

  // --------------------------------------------------
  // QUESTIONNAIRE ANSWER
  // --------------------------------------------------

  const handleQuestionnaireAnswer = (
    questionId: number,
    value: number
  ) => {
    setQuestionnaireAnswers(previous => ({
      ...previous,
      [questionId]: value,
    }));

    setQuestionnaireError(null);
    setQuestionnaireSubmitted(false);
  };

  const answeredQuestionCount =
    questionnaire.filter(
      question =>
        questionnaireAnswers[question.id] !== undefined
    ).length;

  const questionnaireProgress =
    questionnaire.length > 0
      ? Math.round(
          (answeredQuestionCount /
            questionnaire.length) *
            100
        )
      : 0;

  // --------------------------------------------------
  // DIMENSION SCORES
  // --------------------------------------------------

  const calculateDimensionScores = () => {
    const dimensions: Record<
      string,
      {
        total: number;
        count: number;
      }
    > = {};

    questionnaire.forEach(question => {
      const response =
        questionnaireAnswers[question.id];

      if (response === undefined) {
        return;
      }

      const scoredValue =
        getScoredValue(
          question,
          response
        );

      const dimension =
        question.a5;

      if (!dimensions[dimension]) {
        dimensions[dimension] = {
          total: 0,
          count: 0,
        };
      }

      dimensions[dimension].total +=
        scoredValue;

      dimensions[dimension].count += 1;
    });

    return Object.entries(dimensions).map(
      ([dimension, data]) => ({
        dimension,
        average:
          data.count > 0
            ? data.total / data.count
            : 0,
      })
    );
  };

  // --------------------------------------------------
  // SUBMIT QUESTIONNAIRE
  // --------------------------------------------------

  const handleSubmitQuestionnaire =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      setQuestionnaireError(null);

      if (!userId) {
        setQuestionnaireError(
          'Unable to identify your account. Please sign in again.'
        );

        return;
      }

      if (
        questionnaire.length === 0
      ) {
        setQuestionnaireError(
          'The questionnaire is currently unavailable.'
        );

        return;
      }

      const unanswered =
        questionnaire.filter(
          question =>
            questionnaireAnswers[
              question.id
            ] === undefined
        );

      if (unanswered.length > 0) {
        setQuestionnaireError(
          `Please answer all questions before submitting. ${unanswered.length} question${
            unanswered.length === 1
              ? ''
              : 's'
          } remaining.`
        );

        return;
      }

      try {
        setIsQuestionnaireSubmitting(true);

        const answers:
          QuestionnaireAnswer[] =
          questionnaire.map(question => {
            const responseValue =
              questionnaireAnswers[
                question.id
              ];

            return {
              taskId: question.id,

              responseValue,

              scoredValue:
                getScoredValue(
                  question,
                  responseValue
                ),

              dimension:
                question.a5,
            };
          });

        const totalScore =
          answers.reduce(
            (total, answer) =>
              total +
              answer.scoredValue,
            0
          );

        const response =
          await fetch(
            `${apiBaseUrl}/questionnaire/submit`,
            {
              method: 'POST',

              headers: {
                'Content-Type':
                  'application/json',
              },

              body: JSON.stringify({
                userId:
                  Number(userId),

                answers,
              }),
            }
          );

        const contentType =
          response.headers.get(
            'content-type'
          ) || '';

        if (
          !contentType.includes(
            'application/json'
          )
        ) {
          throw new Error(
            'The questionnaire submission API did not return JSON. Please check the backend route.'
          );
        }

        const data =
          await response.json();

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.message ||
            'Unable to submit questionnaire.'
          );
        }

        setQuestionnaireScore(
          totalScore
        );

        setQuestionnaireSubmitted(
          true
        );

        setSuccess(
          'Your questionnaire has been submitted successfully.'
        );

        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      } catch (err: any) {
        console.error(
          'Questionnaire submission error:',
          err
        );

        setQuestionnaireError(
          err?.message ||
          'Unable to submit the questionnaire. Please try again.'
        );
      } finally {
        setIsQuestionnaireSubmitting(
          false
        );
      }
    };

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

        if (
          !response.ok ||
          !data.success
        ) {
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
              ? String(
                  profile.yearsOfEducation
                )
              : '',

          gender:
            profile.gender || '',

          educationLevel:
            profile.educationLevel || '',

          backgroundInformation:
            profile.backgroundInformation || '',
        });

        setProfileCompleted(
          Boolean(
            profile.profileCompleted
          )
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
  // LOAD SUPPORT TICKETS
  // --------------------------------------------------

  const loadSupportTickets =
    async () => {
      if (!userId) {
        setTicketsError(
          'Unable to identify your account.'
        );

        setIsTicketsLoading(false);

        return;
      }

      try {
        setIsTicketsLoading(true);
        setTicketsError(null);

        const response =
          await fetch(
            `${apiBaseUrl}/usersupport/${userId}`
          );

        const data =
          await response.json();

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.message ||
            'Unable to load your support tickets.'
          );
        }

        setSupportTickets(
          Array.isArray(data.tickets)
            ? data.tickets
            : []
        );
      } catch (err: any) {
        console.error(
          'Support ticket loading error:',
          err
        );

        setTicketsError(
          err?.message ||
          'Unable to load your support tickets.'
        );
      } finally {
        setIsTicketsLoading(false);
      }
    };

  useEffect(() => {
    loadSupportTickets();
  }, [apiBaseUrl, userId]);

  // --------------------------------------------------
  // CLOSE SUPPORT TICKET
  // --------------------------------------------------

  const handleCloseTicket = async (
    ticketId: string
  ) => {
    if (!ticketId) {
      return;
    }

    if (!userId) {
      setTicketsError(
        'Unable to identify your account. Please sign in again.'
      );

      return;
    }

    const confirmed = window.confirm(
      'Are you sure you want to close this support ticket? This will mark the ticket as resolved.'
    );

    if (!confirmed) {
      return;
    }

    try {
      setClosingTicketId(ticketId);
      setTicketsError(null);
      setSuccess(null);

      const response = await fetch(
        `${apiBaseUrl}/supportticket/${encodeURIComponent(ticketId)}/close`,
        {
          method: 'PUT',

          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },

          body: JSON.stringify({
            userId: Number(userId),
          }),
        }
      );

      const contentType =
        response.headers.get('content-type') || '';

      let data: any = null;

      if (
        contentType.includes(
          'application/json'
        )
      ) {
        data = await response.json();
      } else {
        const text =
          await response.text();

        console.error(
          'Unexpected non-JSON response when closing ticket:',
          text
        );

        throw new Error(
          `Server returned an unexpected response (${response.status}).`
        );
      }

      if (
        !response.ok ||
        !data?.success
      ) {
        throw new Error(
          data?.message ||
          'Unable to close this support ticket.'
        );
      }

      setSupportTickets(
        previousTickets =>
          previousTickets.map(
            ticket =>
              ticket.ticketId === ticketId
                ? {
                    ...ticket,
                    mstatus: 1,
                  }
                : ticket
          )
      );

      setSuccess(
        data.message ||
        `Support ticket ${ticketId} has been marked as resolved.`
      );
    } catch (err: any) {
      console.error(
        'Support ticket close error:',
        err
      );

      setTicketsError(
        err?.message ||
        'Unable to close this support ticket. Please try again.'
      );
    } finally {
      setClosingTicketId(null);
    }
  };

  // --------------------------------------------------
  // HANDLE PROFILE INPUT
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
  // VALIDATE PROFILE
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
      !Number.isInteger(
        yearsOfEducation
      ) ||
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
      setError(
        validationError
      );

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

      const response =
        await fetch(
          `${apiBaseUrl}/userprofile/${userId}`,
          {
            method: 'PUT',

            headers: {
              'Content-Type':
                'application/json',
            },

            body: JSON.stringify({
              Age:
                Number(form.age),

              DOB:
                form.dob,

              YearsOfEducation:
                Number(
                  form.yearsOfEducation
                ),

              Gender:
                form.gender,

              EducationLevel:
                form.educationLevel,

              BackgroundInformation:
                form.backgroundInformation,
            }),
          }
        );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
          'Unable to save your profile.'
        );
      }

      setProfileCompleted(
        Boolean(
          data.profileCompleted
        )
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
  // SUPPORT HELPERS
  // --------------------------------------------------

  const getCategoryLabel =
    (category: string) => {
      switch (category) {
        case 'bug':
          return 'Cognitive Module Bug';

        case 'research':
          return 'Academic Research Inquiry';

        case 'collaboration':
          return 'Institutional Collaboration';

        case 'feedback':
          return 'General Platform Feedback';

        default:
          return category;
      }
    };

  const getStatusLabel =
    (status: number) => {
      if (Number(status) === 0) {
        return 'Open';
      }

      if (Number(status) === 1) {
        return 'Resolved';
      }

      return 'In Progress';
    };

  const getStatusClasses =
    (status: number) => {
      if (Number(status) === 0) {
        return 'bg-amber-50 text-amber-700 border-amber-200';
      }

      if (Number(status) === 1) {
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      }

      return 'bg-blue-50 text-blue-700 border-blue-200';
    };

  const formatTicketDate =
    (dateValue: string) => {
      if (!dateValue) {
        return 'Unknown date';
      }

      const date =
        new Date(dateValue);

      if (
        Number.isNaN(
          date.getTime()
        )
      ) {
        return dateValue;
      }

      return date.toLocaleString(
        undefined,
        {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
        }
      );
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

          <div className="flex items-center gap-3">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white ${
                user.avatarColor ||
                'bg-blue-600'
              }`}
            >
              {user.avatarTag ||
                user.name
                  .charAt(0)
                  .toUpperCase()}
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
                value={
                  form.backgroundInformation
                }
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

          <div className="mt-8 rounded-2xl bg-slate-50 p-4">
            <p className="text-xs leading-relaxed text-slate-500">
              <span className="font-bold text-slate-700">
                Required information:
              </span>{' '}
              All six profile fields must be completed before your profile can be considered active.
            </p>
          </div>

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
        {/* EXECUTIVE FUNCTIONING QUESTIONNAIRE */}
        {/* ------------------------------------------------ */}

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

          {/* HEADER */}

          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-blue-50 p-2.5">
                <Brain className="h-5 w-5 text-blue-600" />
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Executive Functioning Questionnaire
                </h2>

                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  Please answer each statement based on how often the statement describes your typical academic experience.
                </p>
              </div>
            </div>

            {/* COMPACT SCALE */}

            <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700">
                  Five-Point Scale
                </p>

                <p className="hidden text-[9px] text-slate-500 sm:block">
                  Higher scores = stronger executive functioning
                </p>
              </div>

              <div className="mt-2 grid grid-cols-5 gap-1">
                {likertScale.map(option => (
                  <div
                    key={option.value}
                    className="rounded-md border border-blue-100 bg-white px-1.5 py-1.5 text-center"
                  >
                    <span className="text-xs font-extrabold text-blue-600">
                      {option.value}
                    </span>

                    <span className="ml-1 text-[8px] font-bold text-slate-500 sm:text-[9px]">
                      {option.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ------------------------------------------------ */}
          {/* FLOATING / STICKY QUESTION PROGRESS */}
          {/* ------------------------------------------------ */}

          {!isQuestionnaireLoading &&
            questionnaire.length > 0 && (
              <div className="sticky top-3 z-30 mt-4 mb-4">
                <div className="rounded-xl border border-slate-200 bg-white/95 px-3 py-2.5 shadow-md backdrop-blur-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="shrink-0 text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500">
                        Progress
                      </span>

                      <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-100 sm:w-48">
                        <div
                          className="h-full rounded-full bg-blue-600 transition-all duration-200"
                          style={{
                            width: `${questionnaireProgress}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-500">
                        {answeredQuestionCount}/{questionnaire.length}
                      </span>

                      <span className="rounded-md bg-blue-50 px-1.5 py-0.5 text-[10px] font-extrabold text-blue-600">
                        {questionnaireProgress}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          {/* ------------------------------------------------ */}
          {/* QUESTIONNAIRE ERROR */}
          {/* ------------------------------------------------ */}

          {questionnaireError && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />

                <p className="text-xs text-red-700">
                  {questionnaireError}
                </p>
              </div>
            </div>
          )}

          {/* ------------------------------------------------ */}
          {/* LOADING */}
          {/* ------------------------------------------------ */}

          {isQuestionnaireLoading && (
            <div className="flex flex-col items-center justify-center py-14">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />

              <p className="mt-3 text-sm font-semibold text-slate-500">
                Loading questionnaire...
              </p>
            </div>
          )}

          {/* ------------------------------------------------ */}
          {/* QUESTIONNAIRE */}
          {/* ------------------------------------------------ */}

          {!isQuestionnaireLoading &&
            questionnaire.length > 0 && (
              <form
                onSubmit={
                  handleSubmitQuestionnaire
                }
                className="mt-2"
              >

                {/* IMPORTANT:
                    No fixed height.
                    No overflow-y-auto.
                    No nested scrollbar.
                */}

                <div className="space-y-3">

                  {questionnaire.map(
                    (question, index) => {
                      const selectedValue =
                        questionnaireAnswers[
                          question.id
                        ];

                      const reverse =
                        isReverseItem(
                          question
                        );

                      return (
                        <div
                          key={question.id}
                          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 sm:px-4 sm:py-3.5"
                        >

                          {/* QUESTION */}

                          <div className="flex items-start gap-2.5">
                            <span className="mt-0.5 shrink-0 rounded-md bg-blue-50 px-1.5 py-1 font-mono text-[8px] font-bold uppercase tracking-wider text-blue-600">
                              {index + 1}
                            </span>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-[12px] font-bold leading-snug text-slate-900 sm:text-sm">
                                  {question.a2}
                                </p>

                                {reverse && (
                                  <span className="hidden shrink-0 rounded-full border border-slate-200 bg-white px-1.5 py-0.5 text-[7px] font-bold text-slate-400 sm:inline-block">
                                    Reverse
                                  </span>
                                )}
                              </div>

                              {question.a3 && (
                                <p className="mt-1 text-[9px] leading-snug text-slate-500 sm:text-[10px]">
                                  {question.a3}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* COMPACT OPTIONS */}

                          <div className="mt-3 grid grid-cols-5 gap-1 sm:gap-1.5">
                            {likertScale.map(
                              option => {
                                const isSelected =
                                  selectedValue ===
                                  option.value;

                                return (
                                  <label
                                    key={option.value}
                                    className={`cursor-pointer rounded-lg border px-1 py-1.5 text-center transition-all sm:px-2 sm:py-2 ${
                                      isSelected
                                        ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-100'
                                        : 'border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/50'
                                    }`}
                                  >
                                    <input
                                      type="radio"
                                      name={`question-${question.id}`}
                                      value={option.value}
                                      checked={
                                        isSelected
                                      }
                                      onChange={() =>
                                        handleQuestionnaireAnswer(
                                          question.id,
                                          option.value
                                        )
                                      }
                                      className="sr-only"
                                    />

                                    <div
                                      className={`mx-auto flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-extrabold sm:h-6 sm:w-6 sm:text-[10px] ${
                                        isSelected
                                          ? 'bg-blue-600 text-white'
                                          : 'bg-slate-100 text-slate-600'
                                      }`}
                                    >
                                      {option.value}
                                    </div>

                                    <p
                                      className={`mt-0.5 text-[7px] font-bold leading-tight sm:text-[9px] ${
                                        isSelected
                                          ? 'text-blue-700'
                                          : 'text-slate-500'
                                      }`}
                                    >
                                      {option.label}
                                    </p>
                                  </label>
                                );
                              }
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>

                {/* ------------------------------------------------ */}
                {/* SUBMIT */}
                {/* ------------------------------------------------ */}

                <div className="mt-5 flex flex-col gap-3 rounded-xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-extrabold text-slate-800">
                      Ready to submit?
                    </p>

                    <p className="mt-0.5 text-[10px] text-slate-500">
                      {answeredQuestionCount} of {questionnaire.length} questions answered.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={
                      isQuestionnaireSubmitting ||
                      answeredQuestionCount !==
                        questionnaire.length
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isQuestionnaireSubmitting ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Submit Questionnaire
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

          {/* ------------------------------------------------ */}
          {/* SCORE */}
          {/* ------------------------------------------------ */}

          {questionnaireSubmitted &&
            questionnaireScore !== null && (
              <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                  <div>
                    <h3 className="text-base font-extrabold text-emerald-800">
                      Questionnaire Submitted
                    </h3>

                    <p className="mt-1 text-xs text-emerald-700">
                      Your responses have been recorded successfully.
                    </p>

                    <div className="mt-3 flex items-end gap-2">
                      <span className="text-3xl font-extrabold text-emerald-700">
                        {questionnaireScore}
                      </span>

                      <span className="pb-1 text-xs font-semibold text-emerald-600">
                        / 325
                      </span>
                    </div>

                    <p className="mt-1 text-[9px] text-emerald-600">
                      Higher scores indicate stronger executive-functioning skills.
                    </p>
                  </div>
                </div>
              </div>
            )}
        </div>

        {/* ------------------------------------------------ */}
        {/* SUPPORT TICKETS */}
        {/* ------------------------------------------------ */}

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          {/* HEADER */}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-indigo-50 p-3">
                <MessageSquare className="h-5 w-5 text-indigo-600" />
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  My Support Tickets
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  View and manage support requests submitted from your account.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={loadSupportTickets}
              disabled={isTicketsLoading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                className={`h-4 w-4 ${
                  isTicketsLoading
                    ? 'animate-spin'
                    : ''
                }`}
              />

              Refresh
            </button>
          </div>

          {/* TICKETS ERROR */}

          {ticketsError && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

                <p className="text-sm text-red-700">
                  {ticketsError}
                </p>
              </div>
            </div>
          )}

          {/* TICKETS LOADING */}

          {isTicketsLoading &&
            !ticketsError && (
              <div className="mt-8 flex flex-col items-center justify-center py-10">
                <Loader2 className="h-7 w-7 animate-spin text-blue-600" />

                <p className="mt-3 text-xs font-semibold text-slate-500">
                  Loading your support tickets...
                </p>
              </div>
            )}

          {/* NO TICKETS */}

          {!isTicketsLoading &&
            !ticketsError &&
            supportTickets.length === 0 && (
              <div className="mt-8 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
                <MessageSquare className="mx-auto h-8 w-8 text-slate-300" />

                <h3 className="mt-3 text-sm font-extrabold text-slate-700">
                  No support tickets yet
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Your submitted support requests will appear here.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setActiveTab('contact')
                  }
                  className="mt-5 inline-flex items-center rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-blue-700 active:scale-95"
                >
                  Contact Support
                </button>
              </div>
            )}

          {/* TICKETS */}

          {!isTicketsLoading &&
            !ticketsError &&
            supportTickets.length > 0 && (
              <div className="mt-6 space-y-4">
                {supportTickets.map(
                  ticket => {
                    const isOpen =
                      Number(ticket.mstatus) === 0;

                    const isClosing =
                      closingTicketId ===
                      ticket.ticketId;

                    return (
                      <div
                        key={ticket.id}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all hover:border-blue-200 hover:bg-white"
                      >

                        {/* TOP */}

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono text-xs font-extrabold tracking-wider text-indigo-600">
                                {ticket.ticketId}
                              </span>

                              <span
                                className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${getStatusClasses(
                                  ticket.mstatus
                                )}`}
                              >
                                {getStatusLabel(
                                  ticket.mstatus
                                )}
                              </span>
                            </div>

                            <h3 className="mt-2 text-sm font-extrabold text-slate-900">
                              {getCategoryLabel(
                                ticket.category
                              )}
                            </h3>
                          </div>

                          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400">
                            <Clock className="h-3.5 w-3.5" />

                            {formatTicketDate(
                              ticket.createdAt
                            )}
                          </div>
                        </div>

                        {/* MESSAGE */}

                        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
                          <p className="whitespace-pre-wrap text-xs leading-relaxed text-slate-600">
                            {ticket.message}
                          </p>
                        </div>

                        {/* META */}

                        <div className="mt-4 flex flex-col gap-3 text-[10px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex flex-col gap-1">
                            <span>
                              Email: {ticket.email}
                            </span>

                            {ticket.affiliation && (
                              <span>
                                Affiliation: {ticket.affiliation}
                              </span>
                            )}
                          </div>

                          {/* CLOSE TICKET */}

                          {isOpen && (
                            <button
                              type="button"
                              onClick={() =>
                                handleCloseTicket(
                                  ticket.ticketId
                                )
                              }
                              disabled={isClosing}
                              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-[10px] font-bold text-red-600 transition-all hover:border-red-300 hover:bg-red-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {isClosing ? (
                                <>
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                  Closing Ticket...
                                </>
                              ) : (
                                <>
                                  <XCircle className="h-3.5 w-3.5" />
                                  Close Ticket
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            )}
        </div>

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