import dbLocal from "db-local";
import crypto from "node:crypto";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "./config.js";

const { Schema } = new dbLocal({ path: "./db" });

const User = Schema("User", {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export class UserRepository {
  static async create({ username, password }) {
    Validation.username(username);
    Validation.password(password);

    const user = User.findOne({ username });

    if (user) throw new Error("El usuario ya existe");

    const id = crypto.randomUUID();
    const hastpassword = await bcrypt.hash(password, SALT_ROUNDS);

    User.create({ _id: id, username, password: hastpassword }).save();

    return id;
  }

  static async login({ username, password }) {
    Validation.username(username);
    Validation.password(password);

    const user = User.findOne({ username });
    if (!user) throw new Error("El usuario no existe");

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) throw new Error("Contraseña incorrecta");

    return user.username;
  }
}

class Validation {
  static username(username) {
    if (typeof username != "string") {
      throw new Error("El nombre debe ser un texto");
    }
    if (username.length < 4) {
      throw new Error("El nombre debe terner al menos 4 cracteres");
    }
  }

  static password(password) {
    if (typeof password != "string") {
      throw new Error("La contraseña debe ser un texto");
    }
    if (password.length < 6) {
      throw new Error("La contraseña debe terner al menos 6 cracteres");
    }
  }
}
