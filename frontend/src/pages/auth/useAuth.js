import { useState } from "react";
import {users} from "../../data/users.js"
import { findUserByCredentials } from "./auth.model";

export const useAuth = ({ onLoginSuccess }) => {

    /*useState thats allow to show and hide the loginForm*/ 
    const [showLoginForm, setShowLoginForm] = useState(false);

    const[registerSucces, setRegisterSucces] = useState(false);

    /*useState thats allow to show and hide te register form*/
    const [showRegisterForm, setShowRegisterForm] = useState(false)

    /*handle thats change the state of the form to true in order to show it*/ 
    const handleShowLoginForm = () => {
        setShowLoginForm(true)
    }

    /*handle thats change the state of the form to false in order to hide it, used as a prop later*/ 
    const handleHideLoginForm = () => {
        setShowLoginForm(false) 
    }

    /* handle thats check if the data from the form correspond to an user and change the state of setIsLogged to true */


    const handleLoginSessionSubmit = (respuestaBackend) => {
                    localStorage.setItem('token', respuestaBackend.token);

                    onLoginSuccess();
                    return true; 
        };
    

    /*handle thats change the state of the form to true in order to show it*/ 
    const handleRegisterForm = () => {
      setShowRegisterForm(true)
    }

    /*handle thats change the state of the form to true in order to hide it*/ 
    const handleHideRegisterForm = () => {
        setRegisterSucces(false);
        setShowRegisterForm(false)
    }


    /*funciona por que es simulacion, debera cambiarse con un use state de user y un spred para que se hagan correctos los cambios */
    const handleRegisterSubmit = (BackendResponse) => {
        handleHideRegisterForm();
        setRegisterSucces(true);
        handleShowLoginForm();
    }

    return{

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