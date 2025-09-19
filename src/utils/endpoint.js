// src/config/apiEndpoints.js

export const APP_URL = "http://localhost:5000/"; // 🌐 Base API URL

export const endpoints = {
  auth: {
    registerUser: `${APP_URL}api/auth/register`,
    loginUser: `${APP_URL}api/auth/login`,
    verifyOtp: `${APP_URL}api/auth/verify-otp`,
    resendOtp: `${APP_URL}api/auth/resend-otp`,
    completeProfile: `${APP_URL}api/auth/complete-profile`,
  },
  onboarding: {
    jobSeeker: (stepNumber) => `${APP_URL}api/onboarding/step${stepNumber}`,
    jobSeekerProfile: `${APP_URL}api/onboarding/getProfile`,
    recruiter: `${APP_URL}api/recruiter/register`,
    searchAndJoin: `${APP_URL}api/recruiter/joincompany`,
  },
  jobs: {
    createJob: `${APP_URL}api/jobs/create`,
    fetchAllJobs: `${APP_URL}api/jobs/`,
  },
  company: {
    createCompany: `${APP_URL}api/company/create`,
    fetchAllCompanies: `${APP_URL}api/company/fetchAllCompanies`, // fixed typo
    fetchRecruiterCompanies: `${APP_URL}api/company/fetchRecruiterCompanies`,
  },
};
