// Service responsible for calling the users search endpoint on the backend.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetches the list of all registered users from the backend.
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
        if (response.status === 404) {
            return [];
        }
        throw new Error('Failed to fetch users from server.');
    }

    return await response.json();
};
