// Authentication page component managing login and register forms.
import { useAuth } from "../hooks/useAuth"
import LandingPage from "../components/landing/LandingPage.jsx";
import LoginForm from "../components/LoginForm.jsx";
import RegisterForm from "../components/RegisterForm.jsx";
import AuthGateModal from "../components/AuthGateModal.jsx";


const AuthPage = ({ onLoginSuccess }) => {
    // Custom hook to manage authentication state (which form to show, submit handlers).
    const {
        showLoginForm,
        showRegisterForm,
        showAuthGate,
        handleShowLoginForm,
        handleHideLoginForm,
        handleLoginSessionSubmit,
        handleRegisterForm,
        handleHideRegisterForm,
        handleRegisterSubmit,
        handleSwitchToRegister,
        handleSwitchToLogin,
        handleShowAuthGate,
        handleHideAuthGate,
        handleAuthGateLogin,
        handleAuthGateRegister
    } = useAuth({ onLoginSuccess });

    return (
        <div className="App">

            <LandingPage
                onLoginClick={handleShowLoginForm}
                onRegisterClick={handleRegisterForm}
                onRequireAuth={handleShowAuthGate}
            />

            {showAuthGate && (
                <AuthGateModal
                    onClose={handleHideAuthGate}
                    onLoginClick={handleAuthGateLogin}
                    onRegisterClick={handleAuthGateRegister}
                />
            )}
            {showLoginForm && (
                <LoginForm
                    onClose={handleHideLoginForm}
                    onLoginSession={handleLoginSessionSubmit}
                    onSwitchToRegister={handleSwitchToRegister}
                />
            )}
            {showRegisterForm && (
                <RegisterForm
                    onClose={handleHideRegisterForm}
                    onRegisterSubmit={handleRegisterSubmit}
                    onSwitchToLogin={handleSwitchToLogin}
                />
            )}
        </div>
    )
}
export default AuthPage;
