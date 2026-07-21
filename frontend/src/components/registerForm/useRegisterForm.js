import { useState } from "react";
import {formInitialState} from "./registerForm.model";
import {checkEmptyFields} from "./registerForm.model";
import { registerService } from "./registerService";

export const useRegisterForm = ({onClose, onRegisterSubmit}) => {

  const [form, setForm] = useState(formInitialState);
  const [errorOfEmptyFields, setErrorOfEmptyFields] = useState(false)



   const handleInputChange = (event, attr) => {
        setErrorOfEmptyFields(false);
        setForm((prevForm) => (
            {
                ...prevForm,
                [attr]: event.target.value
            }))
    }

    const handleSubmit = async (event) => {
          event.preventDefault();

            if (!checkEmptyFields(form)) {
                setErrorOfEmptyFields(true); 
                return;          
            }
            setErrorOfEmptyFields(false);

            try {

            const BackendResponse = await registerService(form);

              onRegisterSubmit(BackendResponse); 
        
            setForm(formInitialState);

            onClose();

        } catch (error) {
    
            console.error("Falló el registro en el backend");
        }
          
      };

    return{
        form,
        errorOfEmptyFields,
        handleInputChange,
        handleSubmit
    }
}