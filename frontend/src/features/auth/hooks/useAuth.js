// Hook personalizado que gestiona el estado de autenticación y la lógica de navegación
// entre el formulario de login y el de registro.
import { useState } from "react";

export const useAuth = ({ onLoginSuccess }) => {

    // Controla la visibilidad del formulario de login.
    const [showLoginForm, setShowLoginForm] = useState(false);
    // Controla la visibilidad del formulario de registro.
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    // Indica si el último registro fue exitoso (para mostrar feedback al usuario).
    const [registerSucces, setRegisterSucces] = useState(false);

    const handleShowLoginForm = () => setShowLoginForm(true);
    const handleHideLoginForm = () => setShowLoginForm(false);

    // Procesa la respuesta del backend tras un login exitoso.
    // Guarda el token en localStorage y avisa al componente padre (App.jsx).
    const handleLoginSessionSubmit = (backendResponse) => {
        localStorage.setItem('token', backendResponse.token);
        onLoginSuccess(backendResponse.isAdmin === true);
        return true;
    };

    const handleRegisterForm = () => setShowRegisterForm(true);

    const handleHideRegisterForm = () => {
        setRegisterSucces(false);
        setShowRegisterForm(false);
    };

    // Tras un registro exitoso, oculta el form de registro y muestra el de login.
    const handleRegisterSubmit = () => {
        handleHideRegisterForm();
        setRegisterSucces(true);
        handleShowLoginForm();
    };

    return {
        showLoginForm,
        showRegisterForm,
        registerSucces,
        handleShowLoginForm,
        handleHideLoginForm,
        handleLoginSessionSubmit,
        handleRegisterForm,
        handleHideRegisterForm,
        handleRegisterSubmit
    };
};
