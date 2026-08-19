// Servicio que llama al endpoint de listado de usuarios del backend.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Obtiene la lista de todos los usuarios activos del servidor.
// Requiere token JWT de administrador en localStorage.
export const searchUsersService = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/users`, {
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
