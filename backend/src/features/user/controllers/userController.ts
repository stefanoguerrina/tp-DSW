// Controller handling user operations (listing and deleting users).
import { Request, Response } from 'express';
import { User } from '../models/userModel.js';

// Returns a list of all users without sensitive fields (passwords).
// GET /api/users
export const searchUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.findAll();
    if (!users || users.length === 0) {
      res.status(404).json({ message: 'No users found.' });
      return;
    }
    res.status(200).json(users.map((user) => user.toPublic()));
  } catch (error) {
    console.error('[searchUsers] Unexpected error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Deletes a user by ID. Receives id as URL param.
// Returns 200 + deleted user (no password), 404 if not found, 400 if ID is invalid.
// DELETE /api/users/:id
export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = Number(id);

    if (isNaN(userId) || userId <= 0) {
      res.status(400).json({ message: 'Invalid user ID.' });
      return;
    }

    const deletedUser = await User.deleteById(userId);
    if (!deletedUser) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    res.status(200).json(deletedUser.toPublic());
  } catch (error: any) {
    console.error('[deleteUserById] Unexpected error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
