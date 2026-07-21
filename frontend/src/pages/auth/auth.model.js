
export const findUserByCredentials = (users, form) => {
    return users.find(
        (user) => user.userName === form.userName && user.password === form.password
    );
};