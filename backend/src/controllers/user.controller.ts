// Controller handling user operations (finding/searching users).
import { Request, Response } from 'express';
import { User } from '../models/user.model.js';

// Returns a list of all users without sensitive fields (passwords).
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