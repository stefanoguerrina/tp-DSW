// Represents a row from the `user` table in the database.

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
}
