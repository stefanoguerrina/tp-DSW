// Servicio de login — llama al endpoint de autenticación del backend.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Envía las credenciales al backend y devuelve el JWT en caso de éxito.
// Si hay errores de validación (422), los lanza como string con los mensajes específicos.
// Si las credenciales son incorrectas (401), lanza el mensaje del backend.
export const loginService = async (form) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: form.email,
            password: form.password
        })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        // Si el backend devolvió errores de campo específicos, los unimos en un string.
        if (errorData.errores && Array.isArray(errorData.errores)) {
            const mensajes = errorData.errores.map((e) => e.mensaje).join(' ');
            throw new Error(mensajes);
        }

        throw new Error(errorData.message || 'Credenciales inválidas.');
    }

    return await response.json();
};
