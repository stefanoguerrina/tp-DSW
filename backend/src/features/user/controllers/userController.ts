// Controller de usuario — maneja las rutas GET, PATCH y DELETE de /api/users.
// Delega toda la lógica de negocio al userService; solo se encarga de leer la request
// y armar la response HTTP correcta.
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as userService from '../services/userService.js';

// Devuelve la lista de todos los usuarios activos sin sus contraseñas.
// GET /api/users
export const searchUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    if (!users || users.length === 0) {
      res.status(404).json({ message: 'No se encontraron usuarios.' });
      return;
    }
    res.status(200).json(users);
  } catch (error) {
    console.error('[searchUsers] Error inesperado:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Realiza la baja lógica de un usuario por ID (setea deletedAt, no borra el registro).
// Recibe el ID como parámetro en la URL.
// Devuelve 200 con los datos del usuario dado de baja, 404 si no existe, 400 si el ID es inválido.
// DELETE /api/users/:id
export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = Number(req.params.id);

    if (isNaN(userId) || userId <= 0) {
      res.status(400).json({ message: 'El ID de usuario no es válido.' });
      return;
    }

    const deletedUser = await userService.softDeleteUser(userId);
    if (!deletedUser) {
      res.status(404).json({ message: 'Usuario no encontrado.' });
      return;
    }

    res.status(200).json(deletedUser);
  } catch (error) {
    console.error('[deleteUserById] Error inesperado:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Actualiza los datos editables de un usuario (name, lastName, phone, avatarUrl).
// Solo el propio usuario o un admin puede realizar esta acción (controlado por verifyOwnerOrAdmin).
// Devuelve 200 con los datos actualizados, 404 si no existe, 422 si los datos son inválidos.
// PATCH /api/users/:id
export const updateUserById = async (req: Request, res: Response): Promise<void> => {
  // Los errores de validación ya fueron chequeados por el middleware, pero como
  // buena práctica siempre se verifica en el controller también.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: 'Error de validación.',
      errors: errors.array(),
    });
    return;
  }

  try {
    const userId = Number(req.params.id);
    const { name, lastName, phone, avatarUrl } = req.body;

    const updated = await userService.updateUser(userId, { name, lastName, phone, avatarUrl });
    if (!updated) {
      res.status(404).json({ message: 'Usuario no encontrado.' });
      return;
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error('[updateUserById] Error inesperado:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Cambia la contraseña de un usuario, verificando primero la contraseña actual.
// Solo el propio usuario o un admin puede realizar esta acción (controlado por verifyOwnerOrAdmin).
// Body: { currentPassword, newPassword }
// PATCH /api/users/:id/password
export const changeUserPassword = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: 'Error de validación.',
      errors: errors.array().map((e) => ({ campo: e.type === 'field' ? (e as any).path : 'general', mensaje: e.msg })),
    });
    return;
  }

  try {
    const userId = Number(req.params.id);
    const { currentPassword, newPassword } = req.body;

    const result = await userService.changePassword(userId, currentPassword, newPassword);

    if (!result.ok) {
      if (result.reason === 'not_found') {
        res.status(404).json({ message: 'Usuario no encontrado.' });
        return;
      }
      // La contraseña actual no coincide con la almacenada.
      res.status(401).json({ message: 'La contraseña actual ingresada es incorrecta.' });
      return;
    }

    res.status(200).json({ message: 'Contraseña actualizada correctamente.' });
  } catch (error) {
    console.error('[changeUserPassword] Error inesperado:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};
