import jwt from "jsonwebtoken";

const SECRET = "agente007";

export const generateToken = (payload) => {
  const token = jwt.sign({ user: payload }, SECRET, { expiresIn: "5d" });
  return token;
};

export const validateToken = (token) => {
  return jwt.verify(token, SECRET);
};
