// Tipos e interfaces de dominio para la feature Role (rol).
// Esta capa no tiene lógica: solo describe la forma de los datos.

// ID del rol administrador en la tabla `role` (coincide con user/models/userModel.ts).
export const ADMIN_ROLE_ID = 1;

// Datos necesarios para crear un nuevo rol.
export interface CreateRoleData {
  name: string;
  description?: string | null;
}

// Campos que se pueden modificar de un rol existente.
export interface UpdateRoleData {
  name?: string;
  description?: string | null;
}
