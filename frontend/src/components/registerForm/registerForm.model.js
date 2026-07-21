export const formInitialState = {
    userName: "",
    formalName: "",
    surName: "",
    password: "",
    email:"",
    telephone:""
}


export const checkEmptyFields = (form) => {

    const hayCamposVacios = Object.values(form).some(value => value === "");
    return !hayCamposVacios; 
};
