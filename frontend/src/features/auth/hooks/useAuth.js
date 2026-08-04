// Custom hook to manage authentication state and logic.
import { useState } from "react";


export const useAuth = ({ onLoginSuccess }) => {

    // useState thats allow to show and hide the loginForm 
    const [showLoginForm, setShowLoginForm] = useState(false);

    const [registerSucces, setRegisterSucces] = useState(false);

    /*useState thats allow to show and hide te register form*/
    const [showRegisterForm, setShowRegisterForm] = useState(false)

    // handle that changes the state of the form to true in order to show it 
    const handleShowLoginForm = () => {
        setShowLoginForm(true)
    }

    // handle that changes the state of the form to false in order to hide it, used as a prop later 
    const handleHideLoginForm = () => {
        setShowLoginForm(false)
    }

    // handle that checks if the data from the form correspond to an user and change the state of setIsLogged to true
    const handleLoginSessionSubmit = (backendResponse) => {
        localStorage.setItem('token', backendResponse.token);

        onLoginSuccess();
        return true;
    };


    // handle that changes the state of the form to true in order to show it 
    const handleRegisterForm = () => {
        setShowRegisterForm(true)
    }

    // handle that changes the state of the form to true in order to hide it 
    const handleHideRegisterForm = () => {
        setRegisterSucces(false);
        setShowRegisterForm(false)
    }

    // handle that processes the register form submission
    const handleRegisterSubmit = (backendResponse) => {
        handleHideRegisterForm();
        setRegisterSucces(true);
        handleShowLoginForm();
    }

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
