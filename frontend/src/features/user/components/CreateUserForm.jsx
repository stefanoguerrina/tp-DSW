// Formulario de alta de usuario, visible solo para administradores en el panel de admin.
// Permite crear usuarios regulares o admins (con el checkbox makeAdmin).
import { useCreateUserForm } from '../hooks/useCreateUserForm.js';

const CreateUserForm = ({ onUserCreated, onCancel }) => {
    const { form, isLoading, error, success, handleInputChange, handleSubmit } =
        useCreateUserForm({ onUserCreated });

    return (
        <div className="admin-panel__create-form">
            <h3 className="admin-panel__create-form-title">Nuevo Usuario</h3>

            <form onSubmit={handleSubmit} noValidate>
                <div className="admin-panel__form-grid">
                    <div className="admin-panel__form-group">
                        <label htmlFor="createUsername">Usuario *</label>
                        <input
                            id="createUsername"
                            className="admin-panel__input"
                            type="text"
                            placeholder="nombre_usuario"
                            value={form.username}
                            onChange={(e) => handleInputChange(e, 'username')}
                        />
                    </div>

                    <div className="admin-panel__form-group">
                        <label htmlFor="createPassword">Contraseña *</label>
                        <input
                            id="createPassword"
                            className="admin-panel__input"
                            type="password"
                            placeholder="Mínimo 6 caracteres"
                            value={form.password}
                            onChange={(e) => handleInputChange(e, 'password')}
                        />
                    </div>

                    <div className="admin-panel__form-group">
                        <label htmlFor="createName">Nombre *</label>
                        <input
                            id="createName"
                            className="admin-panel__input"
                            type="text"
                            placeholder="Nombre"
                            value={form.name}
                            onChange={(e) => handleInputChange(e, 'name')}
                        />
                    </div>

                    <div className="admin-panel__form-group">
                        <label htmlFor="createLastName">Apellido *</label>
                        <input
                            id="createLastName"
                            className="admin-panel__input"
                            type="text"
                            placeholder="Apellido"
                            value={form.lastName}
                            onChange={(e) => handleInputChange(e, 'lastName')}
                        />
                    </div>

                    <div className="admin-panel__form-group">
                        <label htmlFor="createEmail">Email *</label>
                        <input
                            id="createEmail"
                            className="admin-panel__input"
                            type="email"
                            placeholder="usuario@ejemplo.com"
                            value={form.email}
                            onChange={(e) => handleInputChange(e, 'email')}
                        />
                    </div>

                    <div className="admin-panel__form-group">
                        <label htmlFor="createPhone">Teléfono (opcional)</label>
                        <input
                            id="createPhone"
                            className="admin-panel__input"
                            type="text"
                            placeholder="Ej: +54 9 11 1234-5678"
                            value={form.phone}
                            onChange={(e) => handleInputChange(e, 'phone')}
                        />
                    </div>

                    <div className="admin-panel__form-group">
                        <label htmlFor="createBirthDate">Fecha de nacimiento (opcional)</label>
                        <input
                            id="createBirthDate"
                            className="admin-panel__input"
                            type="date"
                            value={form.birthDate}
                            onChange={(e) => handleInputChange(e, 'birthDate')}
                        />
                    </div>
                </div>

                {/* Checkbox de rol admin — debajo de la grilla para darle énfasis visual */}
                <div className="admin-panel__form-group admin-panel__form-group--checkbox">
                    <label className="admin-panel__checkbox-label" htmlFor="createMakeAdmin">
                        <input
                            id="createMakeAdmin"
                            type="checkbox"
                            checked={form.makeAdmin}
                            onChange={(e) => handleInputChange(e, 'makeAdmin')}
                        />
                        <span>Darle rol de administrador</span>
                    </label>
                </div>

                {error && (
                    <div className="admin-panel__alert admin-panel__alert--error">⚠ {error}</div>
                )}

                {success && (
                    <div className="admin-panel__alert admin-panel__alert--success">✓ {success}</div>
                )}

                <div className="admin-panel__form-actions">
                    <button
                        type="submit"
                        className="admin-panel__btn admin-panel__btn--create"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creando...' : 'Crear usuario'}
                    </button>
                    <button
                        type="button"
                        className="admin-panel__btn admin-panel__btn--cancel"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        Cancelar
                    </button>
                </div>

                <p className="admin-panel__form-hint">* Campos requeridos</p>
            </form>
        </div>
    );
};

export default CreateUserForm;
