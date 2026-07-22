// Authentication page component managing login and register forms.
import { useAuth } from "./useAuth"
import LoginForm from "../../components/loginForm/index.jsx";
import RegisterForm from "../../components/registerForm/index.jsx";


const Auth = ({ onLoginSuccess }) => {
    // Custom hook to manage authentication state (which form to show, submit handlers).
    const {
        showLoginForm,
        showRegisterForm,
        handleShowLoginForm,
        handleHideLoginForm,
        handleLoginSessionSubmit,
        handleRegisterForm,
        handleHideRegisterForm,
        handleRegisterSubmit
    } = useAuth({ onLoginSuccess });

    return (
        <div className="App">

            <div className="PresentationPage">
                <h1>Bienvenido a Chefcito</h1>
                <p>La aplicación que soluciona tus recetas</p>
            </div>
            <button onClick={handleShowLoginForm}>Comenzar con Chefcito</button>
            <button onClick={handleRegisterForm}>Comenzar registro</button>

            {showLoginForm && (
                <LoginForm
                    onClose={handleHideLoginForm}
                    onLoginSession={handleLoginSessionSubmit}
                />
            )}
            {showRegisterForm && (
                <RegisterForm
                    onClose={handleHideRegisterForm}
                    onRegisterSubmit={handleRegisterSubmit}
                />
            )}
        </div>
    )
}
export default Auth;
