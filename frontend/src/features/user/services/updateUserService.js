// Servicio que llama al endpoint de actualización de datos del usuario.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Envía un PATCH con los campos editables del usuario (nombre, apellido, teléfono, avatar).
// Requiere token JWT (del propio usuario o de un admin) en localStorage.
// Solo incluye los campos que estén definidos en el objeto `data`.
export const updateUserService = async (userId, data) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al actualizar los datos del usuario.');
    }

    return await response.json();
};
