// Register form component displaying input fields and submitting to the backend.
import { useRegisterForm } from "./useRegisterForm"

const RegisterForm = ({ onClose, onRegisterSubmit }) => {
    const {
        form,
        errorOfEmptyFields,
        errorOfRegister,
        handleInputChange,
        handleSubmit
    } = useRegisterForm({ onClose, onRegisterSubmit });

    return (
        <div className="registerFormOverlay">
            <form className="registerForm" onSubmit={handleSubmit}>
                <div className="registerFormHeader">
                    <button
                        type="button"
                        className="closeButton"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                <>
                    <div className="registerForm__label">
                        <input
                            className="registerFormInput"
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={(event) => handleInputChange(event, "email")}
                        />
                    </div>

                    <div className="registerForm__label">
                        <input
                            className="registerFormInput"
                            type="text"
                            placeholder="Username"
                            value={form.userName}
                            onChange={(event) => handleInputChange(event, "userName")}
                        />
                    </div>

                    <div className="registerForm__label">
                        <input
                            className="registerFormInput"
                            type="text"
                            placeholder="First name"
                            value={form.formalName}
                            onChange={(event) => handleInputChange(event, "formalName")}
                        />
                    </div>

                    <div className="registerForm__label">
                        <input
                            className="registerFormInput"
                            type="text"
                            placeholder="Last name"
                            value={form.surName}
                            onChange={(event) => handleInputChange(event, "surName")}
                        />
                    </div>

                    <div className="registerForm__label">
                        <input
                            className="registerFormInput"
                            type="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={(event) => handleInputChange(event, "password")}
                        />
                    </div>

                    <div className="registerForm__label">
                        <input
                            className="registerFormInput"
                            type="text"
                            placeholder="Phone (optional)"
                            value={form.telephone}
                            onChange={(event) => handleInputChange(event, "telephone")}
                        />
                    </div>

                    {errorOfEmptyFields && (
                        <p className="ErrorText">Please fill in all required fields.</p>
                    )}

                    {errorOfRegister && (
                        <p className="ErrorText">{errorOfRegister}</p>
                    )}

                    <div className='registerForm-action'>
                        <button type="submit">Register</button>
                    </div>
                </>
            </form>
        </div>
    );
};

export default RegisterForm;