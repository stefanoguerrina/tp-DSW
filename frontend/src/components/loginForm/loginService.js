// La raíz de tu servidor (idealmente esto se saca de una variable de entorno .env)
const API_BASE_URL = 'http://localhost:3000/api';

export const loginService = async (datosUsuario) => {

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(datosUsuario) 
    });

    if (!response.ok) {
        throw new Error('Credenciales incorrectas');
    }


    const data = await response.json();
    return data;
};