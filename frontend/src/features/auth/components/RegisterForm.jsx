// Modal del formulario de registro de nuevo usuario.
import { useState } from "react";
import { useRegisterForm } from "../hooks/useRegisterForm";
import "../styles/_auth-modal.scss";

const RegisterForm = ({ onClose, onRegisterSubmit, onSwitchToLogin }) => {
    const {
        form,
        errorOfEmptyFields,
        errorOfRegister,
        handleInputChange,
        handleSubmit
    } = useRegisterForm({ onClose, onRegisterSubmit });

    // Estado puramente visual: si la contraseña se muestra en texto plano o no.
    const [showPassword, setShowPassword] = useState(false);
    const handleToggleShowPassword = () => setShowPassword((prev) => !prev);

    return (
        <div className="AuthModal-overlay" onClick={onClose}>
            <div
                className="AuthModal-card"
                role="dialog"
                aria-modal="true"
                aria-labelledby="register-modal-title"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    className="AuthModal-closeButton"
                    aria-label="Cerrar"
                    onClick={onClose}
                >
                    <span className="material-symbols-outlined">close</span>
                </button>

                <div className="AuthModal-header">
                    <div className="AuthModal-icon">
                        <span className="material-symbols-outlined">restaurant_menu</span>
                    </div>
                    <h2 className="AuthModal-title" id="register-modal-title">Sumate a la cocina</h2>
                    <p className="AuthModal-subtitle">Unite gratis a Chefcito para descubrir más recetas.</p>
                </div>

                <form className="AuthModal-form" onSubmit={handleSubmit}>
                    <div className="AuthModal-row">
                        <div className="AuthModal-field">
                            <input
                                className="AuthModal-input"
                                type="text"
                                placeholder="Nombre"
                                value={form.formalName}
                                onChange={(event) => handleInputChange(event, "formalName")}
                            />
                        </div>
                        <div className="AuthModal-field">
                            <input
                                className="AuthModal-input"
                                type="text"
                                placeholder="Apellido"
                                value={form.surName}
                                onChange={(event) => handleInputChange(event, "surName")}
                            />
                        </div>
                    </div>

                    <input
                        className="AuthModal-input"
                        type="text"
                        placeholder="Nombre de usuario"
                        value={form.userName}
                        onChange={(event) => handleInputChange(event, "userName")}
                    />

                    <input
                        className="AuthModal-input"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(event) => handleInputChange(event, "email")}
                    />

                    <div>
                        <div className="AuthModal-passwordWrapper">
                            <input
                                className="AuthModal-input"
                                type={showPassword ? "text" : "password"}
                                placeholder="Creá una contraseña"
                                value={form.password}
                                onChange={(event) => handleInputChange(event, "password")}
                            />
                            <button
                                type="button"
                                className="AuthModal-toggleVisibility"
                                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                onClick={handleToggleShowPassword}
                            >
                                <span className="material-symbols-outlined">
                                    {showPassword ? "visibility_off" : "visibility"}
                                </span>
                            </button>
                        </div>
                        <p className="AuthModal-hint">Usá al menos 6 caracteres.</p>
                    </div>

                    <input
                        className="AuthModal-input"
                        type="text"
                        placeholder="Teléfono (opcional)"
                        value={form.telephone}
                        onChange={(event) => handleInputChange(event, "telephone")}
                    />

                    {errorOfEmptyFields && (
                        <p className="AuthModal-error">Por favor, completá todos los campos requeridos.</p>
                    )}

                    {errorOfRegister && (
                        <p className="AuthModal-error">{errorOfRegister}</p>
                    )}

                    <button type="submit" className="AuthModal-submit">Crear cuenta</button>
                </form>

                <div className="AuthModal-footer">
                    <p>
                        ¿Ya tenés una cuenta?{' '}
                        <button type="button" className="AuthModal-switchButton" onClick={onSwitchToLogin}>
                            Iniciar sesión
                        </button>
                    </p>
                    <p className="AuthModal-legal">
                        Al continuar, aceptás las <a href="#">Condiciones del servicio</a> de Chefcito y confirmás
                        que leíste nuestra <a href="#">Política de privacidad</a>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
