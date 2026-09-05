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

// El teléfono es opcional (así lo valida el backend: express-validator con
// `optional({ checkFalsy: true })` en authValidationMiddleware.ts), por eso queda
// afuera de este chequeo.
const requiredFields = ["userName", "formalName", "surName", "password", "email"];

export const checkEmptyFields = (form) => {
    return requiredFields.some((field) => form[field] === "");
};
