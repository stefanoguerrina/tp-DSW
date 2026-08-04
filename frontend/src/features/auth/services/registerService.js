// Service responsible for calling the register endpoint on the backend.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Sends user registration data to the backend and returns the created user on success.
// Maps frontend form field names to the names the backend API expects.
export const registerService = async (form) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: form.userName,
            name: form.formalName,
            lastName: form.surName,
            email: form.email,
            password: form.password,
            phone: form.telephone || null
        })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error registering user.');
    }

    return await response.json();
};
