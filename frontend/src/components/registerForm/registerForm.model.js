export const formInitialState = {
    userName: "",
    formalName: "",
    surName: "",
    password: "",
    email: "",
    telephone: ""
}


export const checkEmptyFields = (form) => {
    return Object.values(form).some(value => value === "");
};
