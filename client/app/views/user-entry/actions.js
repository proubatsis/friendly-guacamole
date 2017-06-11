export const USER_ENTRY_UPDATE_EMAIL = "user entry update email";
export const USER_ENTRY_UPDATE_USERNAME = "user entry update username";
export const USER_ENTRY_UPDATE_PASSWORD = "user entry update password";

export const updateEmail = email => ({
    type: USER_ENTRY_UPDATE_EMAIL,
    email: email
});

export const updateUsername = username => ({
    type: USER_ENTRY_UPDATE_USERNAME,
    username: username
});

export const updatePassword = password => ({
    type: USER_ENTRY_UPDATE_PASSWORD,
    password: password
});
