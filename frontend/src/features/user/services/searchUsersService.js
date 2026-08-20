// Servicio que llama al endpoint de listado de usuarios del backend.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Obtiene la lista de usuarios del servidor.
// Si inactive=true, devuelve los usuarios dados de baja (requiere token de admin).
// Si inactive=false (por defecto), devuelve los usuarios activos (cualquier usuario autenticado).
export const searchUsersService = async ({ inactive = false } = {}) => {
    const token = localStorage.getItem('token');
    const url = inactive
        ? `${API_BASE_URL}/users?inactive=true`
        : `${API_BASE_URL}/users`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
    });

    if (!response.ok) {
        if (response.status === 404) return [];
        throw new Error('Error al obtener la lista de usuarios del servidor.');
    }

    return await response.json();
};
