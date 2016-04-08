const getUsers = (state) => state.users;
const getLoggedUserId = (state) => state.auth;
const getLoggedUser = (state) => getUsers(state)[getLoggedUserId(state)];
