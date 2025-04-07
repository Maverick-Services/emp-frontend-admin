// const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL = "https://erp-backend-1-five.vercel.app/api";

export const authEndpoints = {
    ADMIN_LOGIN_API: BASE_URL + "/auth/login"
}

export const userEndpoints = {
    FETCH_ALL_EMPLOYEES_API: BASE_URL + "/users/getUsers",
    CREATE_USER_API: BASE_URL + "/users/createUser",
    EDIT_USER_API: BASE_URL + "/users/updateUser",
    DELETE_USER_API: BASE_URL + "/users/deleteUser",
    FETCH_COMPLETE_USER_DETAILS_API: BASE_URL + "/users/getUserById",
}

export const teamEndpoints = {
    CREATE_TEAM_API: BASE_URL + "/teams/createTeam",
    EDIT_TEAM_API: BASE_URL + "/teams/updateTeam",
    DELETE_TEAM_API: BASE_URL + "/teams/deleteTeam",
    FETCH_ALL_TEAMS_API: BASE_URL + "/teams/getTeams",
    FETCH_COMPLETE_TEAM_DETAILS_API: BASE_URL + "/teams/getTeamById",
}

export const taskEndpoints = {
    CREATE_TASK_API: BASE_URL + "/tasks/createTask",
    EDIT_TASK_API: BASE_URL + "/tasks/updateTask",
    DELETE_TASK_API: BASE_URL + "/tasks/deleteTask",
    FETCH_COMPLETE_TASK_DETAILS_API: BASE_URL + "/tasks/getTaskById",
    FETCH_TASKS_API: BASE_URL + "/tasks/",
    CREATE_STEP_API: BASE_URL + "/steps/createStep",
}

export const queryEndPoints = {
    CREATE_QUERY_API: BASE_URL + '/users/createQuery', // POST
    ADD_REPLY_API: BASE_URL + '/users/addReply', // POST
    UPDATE_QUERY_STATUS_API: BASE_URL + '/users/updateQueryStatus', // POST
    FETCH_QUERIES_BY_EMPLOYEE_API: BASE_URL + '/users/fetchQueriesByEmployee', // POST
    FETCH_QUERIES_BY_TEAM_API: BASE_URL + '/users/fetchQueriesByTeam',
    FETCH_ALL_QUERIES_API: BASE_URL + '/users/fetchAllQueries', // GET
    FETCH_COMPLETE_QUERY_DETAILS_API: BASE_URL + '/users/fetchCompleteQueryDetails', // POST
}

export const announcementEndpoints = {
    CREATE_ANNOUNCEMENT_API: BASE_URL + '/users/createAnnouncement', // POST
    DELETE_ANNOUNCEMENT_API: BASE_URL + '/users/deleteAnnouncement', // POST
    FETCH_ANNOUNCEMENTS_BY_TEAM_API: BASE_URL + '/users/fetchAnnouncementsByTeam', // POST
    FETCH_ALL_ANNOUNCEMENTS_API: BASE_URL + '/users/fetchAllAnnouncements', // GET
    FETCH_COMPLETE_ANNOUNCEMENT_DETAILS_API: BASE_URL + '/users/fetchCompleteAnnouncementDetails', // POST
}