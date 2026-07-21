import {useRegisterForm} from "./useRegisterForm"

const RegisterForm = ({onClose, onRegisterSubmit}) => {
    const{
        form,
        errorOfEmptyFields,
        registerSucces,
        handleInputChange,
        handleSubmit
    } = useRegisterForm({onClose, onRegisterSubmit});

 return(
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

            {registerSucces ? (
                <div className="successContainer" >
                    <h3 style={{ color: "green" }}>¡Registro exitoso!</h3>
                    <p>Redirigiendo al login...</p>
                </div>
            ) : (

                <>
                    <div className="registerForm__label">
                        <input  
                          className="registerFormInput"
                          type="email" 
                          placeholder="email del usuario"
                          value={form.email}
                          onChange={(event) => handleInputChange(event, "email")} 
                        />
                    </div>

                    <div className="registerForm__label">
                        <input  
                          className="registerFormInput"
                          type="text" 
                          placeholder="nombre de usuario"
                          value={form.userName}
                          onChange={(event) => handleInputChange(event, "userName")} 
                        />
                    </div>

                    <div className="registerForm__label">
                        <input  
                          className="registerFormInput"
                          type="text" 
                          placeholder="Nombre formal del usuario"
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
                          placeholder="Teléfono"
                          value={form.telephone}
                          onChange={(event) => handleInputChange(event, "telephone")} 
                        />
                    </div>


                    {errorOfEmptyFields && (
                        <p>Debes completar todos los campos pequeñin!</p>
                    )}


                    <div className='registerForm-action'>
                        <button type="submit">Registrarse</button>
                    </div>
                </>
            )}
        </form>
      </div>
  )
}

export default RegisterForm;