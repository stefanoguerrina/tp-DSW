// Componente del formulario de registro de nuevo usuario.
import { useRegisterForm } from "../hooks/useRegisterForm";

const RegisterForm = ({ onClose, onRegisterSubmit }) => {
    const {
        form,
        isLoading,
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
                            placeholder="Nombre de usuario"
                            value={form.userName}
                            onChange={(event) => handleInputChange(event, "userName")}
                        />
                    </div>

                    <div className="registerForm__label">
                        <input
                            className="registerFormInput"
                            type="text"
                            placeholder="Nombre"
                            value={form.formalName}
                            onChange={(event) => handleInputChange(event, "formalName")}
                        />
                    </div>

                    <div className="registerForm__label">
                        <input
                            className="registerFormInput"
                            type="text"
                            placeholder="Apellido"
                            value={form.surName}
                            onChange={(event) => handleInputChange(event, "surName")}
                        />
                    </div>

                    <div className="registerForm__label">
                        <input
                            className="registerFormInput"
                            type="password"
                            placeholder="Contraseña"
                            value={form.password}
                            onChange={(event) => handleInputChange(event, "password")}
                        />
                    </div>

                    <div className="registerForm__label">
                        <input
                            className="registerFormInput"
                            type="text"
                            placeholder="Teléfono (opcional)"
                            value={form.telephone}
                            onChange={(event) => handleInputChange(event, "telephone")}
                        />
                    </div>

                    <div className="registerForm__label">
                        <label className="registerFormInputLabel">Fecha de nacimiento (opcional)</label>
                        <input
                            className="registerFormInput"
                            type="date"
                            value={form.birthDate}
                            onChange={(event) => handleInputChange(event, "birthDate")}
                            id="registerBirthDate"
                        />
                    </div>

                    {errorOfEmptyFields && (
                        <p className="ErrorText">Por favor, completá todos los campos requeridos.</p>
                    )}

                    {errorOfRegister && (
                        <p className="ErrorText">{errorOfRegister}</p>
                    )}

                    <div className='registerForm-action'>
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Registrando...' : 'Registrarse'}
                        </button>
                    </div>
                </>
            </form>
        </div>
    );
};

export default RegisterForm;
