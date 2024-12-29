import express from "express";
import jwt from "jsonwebtoken";
import cookieparser from "cookie-parser";
import cors from "cors";
import { PORT, SECRET_JWT_KEY } from "./config.js";
import { UserRepository } from "./user-repository.js";

const app = express();

app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("holaaaaaa");

  const token = req.cookies.acces_token;

  if (!token) {
    res.send("index");
  }

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY);
    res.send("/protected", { data });
  } catch (error) {
    res.send("index");
  }
});

//POST REGISTER

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  try {
    const id = await UserRepository.create({ username, password });
    res.send({ username, password, id });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//POST LOGIN

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  try {
    const user = await UserRepository.login({ username, password });
    const token = jwt.sign(
      { id: user._id, username: user.username },
      SECRET_JWT_KEY,
      { expiresIn: "1h" }
    );
    res
      .cookie("acces_token", token, {
        httpOnly: true,
        secure: true,
        // sameSite: "strict", || desactivar en produccion
        // maxAge: 1000 * 60 * 60, || desactivar en produccion
      })
      .send({ user, token, password });
  } catch (error) {
    res.status(401).send(error.message);
  }
});

//GET PROTECTED

app.get("/protected", async (req, res) => {
  const token = req.cookies.acces_token;

  if (!token) {
    return res.status(403).send("Acceso no autorizado");
  }

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY);
    res.send(`Ruta protegida. Bienvenido, ${data.username}.`);
  } catch (error) {
    res.status(401).send("Token inválido o expirado.");
  }
});

//POST LOGOUT

app.post("/logout", (req, res) => {
  res.json({ user: "Usuario desconectado" });
});

app.listen(PORT, () => {
  console.log(`server levantado en el puerto ${PORT}`);
});
