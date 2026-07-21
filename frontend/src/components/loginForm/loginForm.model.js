// Initial state and validation for the login form.
export const formInitialState = {
    email: "",
    password: ""
};

// Returns true only when both fields are non-empty.
export const validateForm = (form) => {
    return form.email !== "" && form.password !== "";
};