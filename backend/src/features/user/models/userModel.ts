// Represents the User model and handles database queries for the `user` table.
import pool from '../../../database.js';

// Role ID that represents an administrator in the `role` table.
export const ADMIN_ROLE_ID = 1;

export interface CreateUserData {
  username: string;
  password: string;
  name: string;
  lastName: string;
  email: string;
  phone?: string | null;
}

export class User {
  id: number;
  username: string;
  password: string;
  name: string;
  lastName: string;
  email: string;
  phone: string | null;
  avatarUrl: string | null;

  constructor(row: {
    id: number;
    username: string;
    password: string;
    name: string;
    lastName: string;
    email: string;
    phone: string | null;
    avatarUrl: string | null;
  }) {
    this.id = row.id;
    this.username = row.username;
    this.password = row.password;
    this.name = row.name;
    this.lastName = row.lastName;
    this.email = row.email;
    this.phone = row.phone;
    this.avatarUrl = row.avatarUrl;
  }

  // Returns a safe version of the user without the password field.
  toPublic() {
    const { password, ...publicData } = this;
    return publicData;
  }

  // Inserts a new user record into the database and returns the created User instance.
  static async create(data: CreateUserData): Promise<User> {
    const [result] = await pool.execute(
      'INSERT INTO user (username, password, name, lastName, email, phone) VALUES (?, ?, ?, ?, ?, ?)',
      [data.username, data.password, data.name, data.lastName, data.email, data.phone ?? null]
    ) as any[];

    const newUserId: number = result.insertId;
    const user = await User.findById(newUserId);
    if (!user) {
      throw new Error('Failed to retrieve newly created user.');
    }
    return user;
  }

  // Finds a user by ID and returns a User instance or null if not found.
  static async findById(id: number): Promise<User | null> {
    const [rows] = await pool.execute('SELECT * FROM user WHERE id = ?', [id]) as any[];
    if (!rows || rows.length === 0) {
      return null;
    }
    return new User(rows[0]);
  }

  // Finds a user by email and returns a User instance or null if not found.
  static async findByEmail(email: string): Promise<User | null> {
    const [rows] = await pool.execute('SELECT * FROM user WHERE email = ?', [email.trim()]) as any[];
    if (!rows || rows.length === 0) {
      return null;
    }
    return new User(rows[0]);
  }

  // Finds a user by username and returns a User instance or null if not found.
  static async findByUsername(username: string): Promise<User | null> {
    const [rows] = await pool.execute('SELECT * FROM user WHERE username = ?', [username.trim()]) as any[];
    if (!rows || rows.length === 0) {
      return null;
    }
    return new User(rows[0]);
  }

  // Finds a user by email or username and returns a User instance or null if not found.
  static async findByEmailOrUsername(identifier: string): Promise<User | null> {
    const cleanIdentifier = identifier.trim();
    const [rows] = await pool.execute(
      'SELECT * FROM user WHERE email = ? OR username = ?',
      [cleanIdentifier, cleanIdentifier]
    ) as any[];
    if (!rows || rows.length === 0) {
      return null;
    }
    return new User(rows[0]);
  }

  // Finds all Users or null if there are none.
  static async findAll(): Promise<Array<User> | null> {
    const [rows] = await pool.execute('SELECT * FROM user') as any[];
    if (!rows || rows.length === 0) {
      return null;
    }

    return rows.map((row: any) => new User(row));
  }

  // Returns the array of RoleIds assigned to the user in the `userrole` table.
  // Returns an empty array if the user has no roles assigned.
  static async getUserRoleIds(userId: number): Promise<number[]> {
    const [rows] = await pool.execute(
      'SELECT RoleId FROM userrole WHERE UserId = ?',
      [userId]
    ) as any[];
    if (!rows || rows.length === 0) return [];
    return rows.map((row: any) => row.RoleId);
  }

  // Deletes a user by ID and returns the deleted user.
  static async deleteById(id: number): Promise<User | null> {
    const user = await User.findById(id);
    if (!user) {
      return null;
    }
    await pool.execute('DELETE FROM user WHERE id = ?', [id]) as any[];
    return user;
  }

}
