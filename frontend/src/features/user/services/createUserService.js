// Servicio que llama al endpoint de creación de usuario por administrador.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Envía una petición POST para crear un nuevo usuario.
// Solo un admin puede usar este endpoint.
// Si makeAdmin=true, el backend le asigna el rol administrador al usuario creado.
export const createUserService = async (userData) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        // Si hay errores de campo específicos del backend, los une en un mensaje.
        if (errorData.errors && Array.isArray(errorData.errors)) {
            const mensajes = errorData.errors.map((e) => e.mensaje).join(' ');
            throw new Error(mensajes);
        }
        throw new Error(errorData.message || 'Error al crear el usuario.');
    }

    return await response.json();
};
