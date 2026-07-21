import { useLoginForm } from "./useLoginForm";

const LoginForm = ({ onClose, onLoginSession }) => {
    const {
        form,
        errorOfEmptyFields,
        errorOfData,
        handleInputChange,
        handleSubmit
    } = useLoginForm({ onClose, onLoginSession });

    return (
        <div className="formLogin-overlay">
            <form className="loginform" onSubmit={handleSubmit}>
                
                <button
                    type="button"
                    className="closeButton"
                    onClick={onClose}
                >
                    ✕
                </button>

                <div className="loginForm__label">
                    <input
                        className="formLoginNameInput"
                        type="text"
                        id="userNameLogIn"
                        name="userNameLogIn"
                        placeholder="nombre de usuario"
                        value={form.userName}
                        onChange={(event) => handleInputChange(event, "userName")}
                    />
                </div>

                <div className="loginForm__label">
                    <input
                        className="formLoginPasswordInput"
                        placeholder="contraseña"
                        type="password"
                        id="passwordLogIn"
                        name="passwordLogIn"
                        value={form.password}
                        onChange={(event) => handleInputChange(event, "password")}
                    />
                </div>

                <div className="loginForm-action">
                    <button type="submit">Iniciar sesión</button>
                </div>

                {errorOfEmptyFields && (
                    <p className="ErrorText">
                        Debes completar todos los campos!
                    </p>
                )}

                {errorOfData && (
                    <p className="ErrorText">
                        Usuario o contraseña incorrecta
                    </p>
                )}
            </form>
        </div>
    );
};

export default LoginForm;