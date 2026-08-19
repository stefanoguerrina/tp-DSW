// Servicio que llama al endpoint de cambio de contraseña del usuario.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Envía un PATCH para cambiar la contraseña del usuario.
// Requiere la contraseña actual para verificar la identidad del usuario.
// Requiere token JWT (del propio usuario o de un admin) en localStorage.
export const changePasswordService = async (userId, currentPassword, newPassword) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}/users/${userId}/password`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ currentPassword, newPassword })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al cambiar la contraseña.');
    }

    return await response.json();
};
