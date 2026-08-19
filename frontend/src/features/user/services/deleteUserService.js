// Servicio que llama al endpoint de baja lógica de usuario del backend.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Envía una petición DELETE para dar de baja (lógicamente) a un usuario por su ID.
// El backend setea deletedAt en lugar de borrar el registro.
// Requiere token JWT de administrador en localStorage.
export const deleteUserService = async (userId) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al eliminar el usuario.');
    }

    return await response.json();
};
