// Hook que gestiona el estado y la lógica del formulario de registro.
import { useState } from "react";
import { formInitialState, checkEmptyFields } from "../models/registerModel";
import { registerService } from "../services/registerService";

export const useRegisterForm = ({ onClose, onRegisterSubmit }) => {

    const [form, setForm] = useState(formInitialState);
    // true si el usuario intentó enviar el form con campos requeridos vacíos.
    const [errorOfEmptyFields, setErrorOfEmptyFields] = useState(false);
    // Mensaje de error devuelto por el backend (ej: usuario o email ya en uso).
    const [errorOfRegister, setErrorOfRegister] = useState("");

    const handleInputChange = (event, attr) => {
        setErrorOfEmptyFields(false);
        setErrorOfRegister("");
        setForm((prevForm) => ({ ...prevForm, [attr]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (checkEmptyFields(form)) {
            setErrorOfEmptyFields(true);
            return;
        }
        setErrorOfEmptyFields(false);

        try {
            const backendResponse = await registerService(form);
            onRegisterSubmit(backendResponse);
            setForm(formInitialState);
            onClose();
        } catch (error) {
            // Muestra el mensaje de error del backend si está disponible.
            setErrorOfRegister(error.message || "Error al registrarse. Intentá de nuevo.");
        }
    };

    return { form, errorOfEmptyFields, errorOfRegister, handleInputChange, handleSubmit };
};
