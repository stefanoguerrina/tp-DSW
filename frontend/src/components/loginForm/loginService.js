// Service responsible for calling the login endpoint on the backend.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Sends login credentials to the backend and returns the JWT token on success.
// Throws an error if credentials are invalid or the request fails.
export const loginService = async (form) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // The backend login endpoint expects { email, password }
        body: JSON.stringify({
            email: form.email,
            password: form.password
        })
    });

    if (!response.ok) {
        throw new Error('Invalid credentials.');
    }

    return await response.json();
};