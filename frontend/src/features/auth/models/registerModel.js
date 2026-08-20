// Estado inicial del formulario de registro.
// telephone y birthDate son opcionales — no bloquean el envío si están vacíos.
export const formInitialState = {
    userName: "",
    formalName: "",
    surName: "",
    password: "",
    email: "",
    telephone: "",
    birthDate: ""
};

// Verifica si algún campo REQUERIDO está vacío.
// telephone y birthDate son opcionales, por eso se excluyen de la validación.
export const checkEmptyFields = (form) => {
    const requiredFields = ['userName', 'formalName', 'surName', 'password', 'email'];
    return requiredFields.some((field) => form[field].trim() === "");
};
