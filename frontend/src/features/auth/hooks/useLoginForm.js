import { useState } from "react";
import { formInitialState, validateForm } from "../models/loginModel";
import { loginService } from "../services/loginService"

export const useLoginForm = ({ onClose, onLoginSession }) => {
    
    const [form, setForm] = useState(formInitialState);
    const [errorOfData, setErrorOfData] = useState(false);
    const [errorOfEmptyFields, setErrorOfEmptyFields] = useState(false);

    const handleInputChange = (event, attr) => {
        setErrorOfEmptyFields(false);
        setErrorOfData(false);

        setForm((prevForm) => ({
            ...prevForm,
            [attr]: event.target.value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm(form)) {
            setErrorOfEmptyFields(true);
            return;
        }

        try {
            const BackendResponse = await loginService(form);
            onLoginSession(BackendResponse);
            setForm(formInitialState);
            onClose();

        } catch (error) {

            setErrorOfData(error.message || 'Email o contraseña incorrecta');
        }
    };
    
    return {
        form,
        errorOfEmptyFields,
        errorOfData,
        handleInputChange,
        handleSubmit
    };
};
