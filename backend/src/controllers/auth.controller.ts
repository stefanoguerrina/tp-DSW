// Controller handling user registration and login logic.
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../database.js';
import { User } from '../models/user.model.js';

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
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const [result] = await pool.execute(
      'INSERT INTO user (username, password, name, lastName, email, phone) VALUES (?, ?, ?, ?, ?, ?)',
      [username, hashedPassword, name, lastName, email, phone ?? null]
    ) as any[];

    const newUserId: number = result.insertId;

    const [rows] = await pool.execute('SELECT * FROM user WHERE id = ?', [newUserId]) as any[];
    const user = new User(rows[0]);

    res.status(201).json(user.toPublic());
  } catch (error: any) {
    // MySQL duplicate entry error code
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ message: 'Username or email is already taken.' });
      return;
    }
    console.error('[register] Unexpected error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Logs in an existing user. Expects: email, password in req.body.
// Returns 200 + { token } on success, or 401 on bad credentials.
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Missing required fields: email, password.' });
    return;
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    res.status(500).json({ message: 'Server configuration error: JWT_SECRET is not set.' });
    return;
  }

  try {
    const [rows] = await pool.execute('SELECT * FROM user WHERE email = ?', [email]) as any[];

    if (!rows || rows.length === 0) {
      res.status(401).json({ message: 'Invalid credentials.' });
      return;
    }

    const user = new User(rows[0]);
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ message: 'Invalid credentials.' });
      return;
    }

    // Sign a token with a non-sensitive payload; expires in 8 hours.
    const token = jwt.sign(
      { id: user.id, username: user.username },
      secret,
      { expiresIn: '8h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error('[login] Unexpected error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
