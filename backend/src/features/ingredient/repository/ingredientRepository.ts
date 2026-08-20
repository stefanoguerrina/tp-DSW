// Acceso a datos de la feature ingredient: única capa que habla con Prisma.
// No contiene lógica de negocio — eso es responsabilidad de ingredientService.
// Un ingrediente puede tener varias categorías (N:M vía ingredientcategoryingredient),
// así que crear/actualizar un ingrediente implica también escribir esa tabla intermedia.
import prisma from '../../../core/prismaClient.js';
import type { Prisma } from '@prisma/client';
import type { CreateIngredientData, UpdateIngredientData } from '../models/ingredientModel.js';

// Include reutilizable: trae, para cada ingrediente, sus categorías ya "aplanadas"
// (no el array crudo de filas de la tabla intermedia).
const withCategories = {
  ingredientcategoryingredient: {
    include: { ingredientcategory: true },
  },
} as const;

export const ingredientRepository = {

  // Devuelve todos los ingredientes junto con sus categorías.
  findAll: () =>
    prisma.ingredient.findMany({
      include: withCategories,
      orderBy: { name: 'asc' },
    }),

  // Busca un ingrediente por ID, incluyendo sus categorías.
  findById: (id: number) =>
    prisma.ingredient.findUnique({
      where: { id },
      include: withCategories,
    }),

  // Busca un ingrediente por nombre en toda la tabla, sin importar la categoría
  // (usado para verificar duplicados; el nombre es único globalmente).
  // excludeId se usa en el update, para no chocar contra el propio registro que se está editando.
  findByName: (name: string, excludeId?: number) =>
    prisma.ingredient.findFirst({
      where: {
        name: name.trim(),
        ...(excludeId !== undefined ? { id: { not: excludeId } } : {}),
      },
    }),

  // Crea un nuevo ingrediente junto con sus vínculos a categorías, en una sola operación
  // (nested create de Prisma: crea las filas de ingredientcategoryingredient al mismo tiempo).
  create: (data: CreateIngredientData) =>
    prisma.ingredient.create({
      data: {
        name: data.name,
        description: data.description ?? null,
        unitOfMeasure: data.unitOfMeasure ?? null,
        imagePath: data.imagePath ?? null,
        ingredientcategoryingredient: {
          create: data.categoryIds.map((idIngredientCategory) => ({ idIngredientCategory })),
        },
      },
      include: withCategories,
    }),

  // Actualiza los campos escalares de un ingrediente y, si se pasa categoryIds,
  // reemplaza por completo el set de categorías (borra los vínculos viejos y crea los nuevos).
  // Todo en una transacción para que no quede a mitad de camino si algo falla.
  update: (id: number, data: UpdateIngredientData) =>
    prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const { categoryIds, ...scalarData } = data;

      if (categoryIds !== undefined) {
        await tx.ingredientcategoryingredient.deleteMany({ where: { idIngredient: id } });
        await tx.ingredientcategoryingredient.createMany({
          data: categoryIds.map((idIngredientCategory) => ({ idIngredientCategory, idIngredient: id })),
        });
      }

      return tx.ingredient.update({
        where: { id },
        data: scalarData,
        include: withCategories,
      });
    }),

  // Elimina un ingrediente. Falla si tiene filas relacionadas (inventory, recipeingredient, nutritionalvalue).
  // Los vínculos de ingredientcategoryingredient sí se borran en cascada (onDelete: Cascade en el schema).
  delete: (id: number) =>
    prisma.ingredient.delete({ where: { id } }),

  // Verifica que TODAS las categorías pasadas existan (para validar la FK antes de crear/actualizar).
  categoriesExist: async (categoryIds: number[]): Promise<boolean> => {
    if (categoryIds.length === 0) return false;
    const count = await prisma.ingredientcategory.count({ where: { id: { in: categoryIds } } });
    return count === new Set(categoryIds).size;
  },

};
