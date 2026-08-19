// Acceso a datos de la feature user: única capa que habla con Prisma para el CRUD de usuarios.
// No contiene lógica de negocio — eso es responsabilidad de userService.
import prisma from '../../../core/prismaClient.js';
import type { CreateUserData, UpdateUserData } from '../models/userModel.js';

export const userRepository = {

  // Devuelve todos los usuarios activos (sin baja lógica).
  findAll: () =>
    prisma.user.findMany({ where: { deletedAt: null } }),

  // Busca un usuario activo por ID.
  findById: (id: number) =>
    prisma.user.findFirst({ where: { id, deletedAt: null } }),

  // Crea un nuevo usuario con los datos ya validados y la contraseña hasheada.
  create: (data: CreateUserData) =>
    prisma.user.create({
      data: {
        username: data.username,
        password: data.password,
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone ?? null,
      },
    }),

  // Realiza la baja lógica: setea deletedAt con la fecha actual.
  softDelete: (id: number) =>
    prisma.user.update({ where: { id }, data: { deletedAt: new Date() } }),

  // Actualiza los campos editables del perfil de un usuario.
  update: (id: number, data: UpdateUserData) =>
    prisma.user.update({ where: { id }, data }),

  // Actualiza únicamente la contraseña (recibe el hash, no el texto plano).
  updatePassword: (id: number, hashedPassword: string) =>
    prisma.user.update({ where: { id }, data: { password: hashedPassword } }),

};
