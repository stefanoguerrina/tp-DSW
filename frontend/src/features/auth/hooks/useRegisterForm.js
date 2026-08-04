// Custom hook managing register form state, validation, and backend submission.
import { useState } from "react";
import { formInitialState } from "../models/registerModel";
import { checkEmptyFields } from "../models/registerModel";
import { registerService } from "../services/registerService";

export const useRegisterForm = ({ onClose, onRegisterSubmit }) => {

    const [form, setForm] = useState(formInitialState);
    const [errorOfEmptyFields, setErrorOfEmptyFields] = useState(false);
    const [errorOfRegister, setErrorOfRegister] = useState("");

    const handleInputChange = (event, attr) => {
        setErrorOfEmptyFields(false);
        setErrorOfRegister("");
        setForm((prevForm) => ({
            ...prevForm,
            [attr]: event.target.value
        }));
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
            // Show the backend's error message if available (e.g. "Username or email is already taken.")
            setErrorOfRegister(error.message || "Registration failed. Please try again.");
        }
    };

    return {
        form,
        errorOfEmptyFields,
        errorOfRegister,
        handleInputChange,
        handleSubmit
    };
};
