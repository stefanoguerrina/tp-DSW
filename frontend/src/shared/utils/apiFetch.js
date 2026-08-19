// Utilidad compartida para hacer fetch al backend con el token JWT incluido automáticamente.
// Centraliza la lógica de autenticación y manejo de errores HTTP para todos los servicios.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Realiza un fetch autenticado al backend.
// Recibe:
//   - endpoint: la ruta relativa a la base de la API (ej: '/users/5').
//   - options: opciones de fetch (method, body, etc.). El Content-Type y el token se agregan automáticamente.
// Lanza un error con el mensaje del backend si la respuesta no es ok.
export const apiFetch = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.headers || {})
        }
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error del servidor (${response.status}).`);
    }

    return await response.json();
};
