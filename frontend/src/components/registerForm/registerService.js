export const registerService = async (form) => {

    const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form) 
    });


    if (!response.ok) {
        throw new Error('Error al registrar el usuario');
    }

    return await response.json();
};