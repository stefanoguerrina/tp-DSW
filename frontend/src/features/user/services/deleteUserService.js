// Service responsible for calling the delete user endpoint on the backend.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Sends a DELETE request for a user by their ID.
// Returns the deleted user data on success, or throws an error with a descriptive message.
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
        throw new Error(errorData.message || 'Failed to delete user.');
    }

    return await response.json();
};
