export const formInitialState = {
    userName: "",
    password: ""
};

export const validateForm = (form) => {
    return form.userName !== "" && form.password !== "";
};