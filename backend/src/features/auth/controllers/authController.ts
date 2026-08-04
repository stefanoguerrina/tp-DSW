// Controller handling user registration and login logic.
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, ADMIN_ROLE_ID } from '../../user/models/userModel.js';

const SALT_ROUNDS = 10;

// Registers a new user. Expects: username, password, name, lastName, email, phone? in req.body.
// Returns 201 + the created user (no password), or 409 if email/username already exists.
export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, password, name, lastName, email, phone } = req.body;

  if (!username || !password || !name || !lastName || !email) {
    res.status(400).json({ message: 'Missing required fields: username, password, name, lastName, email.' });
    return;
  }

  try {
    const existingUserByUsername = await User.findByUsername(username);
    if (existingUserByUsername) {
      res.status(409).json({ message: 'Username is already taken.' });
      return;
    }

    const existingUserByEmail = await User.findByEmail(email);
    if (existingUserByEmail) {
      res.status(409).json({ message: 'Email is already taken.' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
      username: username.trim(),
      password: hashedPassword,
      name: name.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : null,
    });

    res.status(201).json(user.toPublic());
  } catch (error: any) {
    // MySQL duplicate entry error code
    if (error.code === 'ER_DUP_ENTRY') {
      if (error.sqlMessage && error.sqlMessage.includes('uq_user_username')) {
        res.status(409).json({ message: 'Username is already taken.' });
        return;
      }
      if (error.sqlMessage && error.sqlMessage.includes('uq_user_email')) {
        res.status(409).json({ message: 'Email is already taken.' });
        return;
      }
      res.status(409).json({ message: 'Username or email is already taken.' });
      return;
    }
    console.error('[register] Unexpected error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Logs in an existing user. Expects: email or username, password in req.body.
// Returns 200 + { token, isAdmin } on success, or 401 on bad credentials.
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, username, password } = req.body;
  const identifier = email || username;

  if (!identifier || !password) {
    res.status(400).json({ message: 'Missing required fields: email or username, password.' });
    return;
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    res.status(500).json({ message: 'Server configuration error: JWT_SECRET is not set.' });
    return;
  }

  try {
    const user = await User.findByEmailOrUsername(identifier);

    if (!user) {
      res.status(401).json({ message: 'Invalid credentials.' });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ message: 'Invalid credentials.' });
      return;
    }

    // Check if the user has the admin role in the userrole table.
    const roleIds = await User.getUserRoleIds(user.id);
    const isAdmin = roleIds.includes(ADMIN_ROLE_ID);

    // Sign a token with a non-sensitive payload (including admin flag); expires in 8 hours.
    const token = jwt.sign(
      { id: user.id, username: user.username, isAdmin },
      secret,
      { expiresIn: '8h' }
    );

    // Return token and isAdmin so the frontend can gate admin-only sections.
    res.status(200).json({ token, isAdmin });
  } catch (error) {
    console.error('[login] Unexpected error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
