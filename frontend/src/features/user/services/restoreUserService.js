// Servicio que llama al endpoint de reactivación de usuario del backend.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Envía una petición PATCH para reactivar (dar de alta) a un usuario dado de baja.
// Solo admins pueden usar este endpoint.
export const restoreUserService = async (userId) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}/users/${userId}/restore`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al restaurar el usuario.');
    }

    return await response.json();
};
