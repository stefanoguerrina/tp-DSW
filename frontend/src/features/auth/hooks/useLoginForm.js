// Hook que gestiona el estado y la lógica del formulario de inicio de sesión.
import { useState } from "react";
import { formInitialState, validateForm } from "../models/loginModel";
import { loginService } from "../services/loginService";

export const useLoginForm = ({ onClose, onLoginSession }) => {

    const [form, setForm] = useState(formInitialState);
    // true si el usuario intentó enviar el form con campos vacíos.
    const [errorOfEmptyFields, setErrorOfEmptyFields] = useState(false);
    // Mensaje de error devuelto por el backend (ej: credenciales inválidas).
    const [errorOfData, setErrorOfData] = useState(false);

    const handleInputChange = (event, attr) => {
        setErrorOfEmptyFields(false);
        setErrorOfData(false);
        setForm((prevForm) => ({ ...prevForm, [attr]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm(form)) {
            setErrorOfEmptyFields(true);
            return;
        }

        try {
            const backendResponse = await loginService(form);
            onLoginSession(backendResponse);
            setForm(formInitialState);
            onClose();
        } catch (error) {
            setErrorOfData(error.message || 'Email o contraseña incorrectos.');
        }
    };

    return { form, errorOfEmptyFields, errorOfData, handleInputChange, handleSubmit };
};
