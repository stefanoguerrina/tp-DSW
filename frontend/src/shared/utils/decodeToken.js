// Utilidad para leer el payload de un JWT sin verificar su firma (eso ya lo hizo
// el backend al emitirlo). Solo se usa para leer campos no sensibles como el id
// del usuario autenticado, guardado únicamente como token en localStorage.

// Recibe: un JWT (string). Devuelve el payload decodificado o null si es inválido.
export const decodeToken = (token) => {
  try {
    const payload = token.split('.')[1];
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(json);
  } catch {
    return null;
  }
};

// Lee y decodifica el token guardado en localStorage, o null si no hay sesión iniciada.
const getCurrentTokenPayload = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  return decodeToken(token);
};

// Devuelve el id del usuario autenticado, o null si no hay sesión iniciada.
export const getCurrentUserId = () => getCurrentTokenPayload()?.id ?? null;

// Devuelve el username del usuario autenticado, o null si no hay sesión iniciada.
export const getCurrentUsername = () => getCurrentTokenPayload()?.username ?? null;
