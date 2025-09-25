export const APP_URL = "http://localhost:5000";
export const endpoints = {
    auth: {
        loginUser: `${APP_URL}api/auth/login`,
    },
    jobs: {
        createJob: `${APP_URL}/api/jobs/create`,
        fetchAllJobs: `${APP_URL}/api/jobs/alljobs`
    },
}