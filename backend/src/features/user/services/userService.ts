// Lógica de negocio de la feature user.
// Orquesta el repositorio, aplica reglas y transforma datos para el controller.
import bcrypt from 'bcrypt';
import { userRepository } from '../repository/userRepository.js';
import { toPublic, type UpdateUserData } from '../models/userModel.js';

const SALT_ROUNDS = 10;

// Devuelve todos los usuarios activos sin su contraseña.
export async function getAllUsers() {
  const users = await userRepository.findAll();
  if (users.length === 0) return null;
  return users.map(toPublic);
}

// Realiza la baja lógica de un usuario.
// Verifica que exista antes de actualizarlo. Devuelve sus datos públicos o null si no existe.
export async function softDeleteUser(id: number) {
  const user = await userRepository.findById(id);
  if (!user) return null;
  await userRepository.softDelete(id);
  return toPublic(user);
}

// Actualiza los datos editables del perfil. Devuelve los datos públicos o null si no existe.
export async function updateUser(id: number, data: UpdateUserData) {
  const existing = await userRepository.findById(id);
  if (!existing) return null;
  const updated = await userRepository.update(id, data);
  return toPublic(updated);
}

// Cambia la contraseña de un usuario verificando primero la contraseña actual.
// Devuelve un objeto que indica el resultado: ok, not_found, o wrong_password.
export async function changePassword(
  userId: number,
  currentPassword: string,
  newPassword: string
): Promise<{ ok: true } | { ok: false; reason: 'not_found' | 'wrong_password' }> {
  const user = await userRepository.findById(userId);
  if (!user) return { ok: false, reason: 'not_found' };

  const passwordMatch = await bcrypt.compare(currentPassword, user.password);
  if (!passwordMatch) return { ok: false, reason: 'wrong_password' };

  const hashed = await bcrypt.hash(newPassword, SALT_ROUNDS);
  await userRepository.updatePassword(userId, hashed);

  return { ok: true };
}
