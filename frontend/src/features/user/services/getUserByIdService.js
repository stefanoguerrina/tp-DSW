// Servicio que llama al endpoint de obtención de un usuario por ID.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Obtiene los datos públicos de un usuario por su ID numérico.
// Requiere token JWT (del propio usuario o de un admin) en localStorage.
export const getUserByIdService = async (userId) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
    });

    if (!response.ok) {
        if (response.status === 404) return null;
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al obtener el usuario.');
    }

    return await response.json();
};
