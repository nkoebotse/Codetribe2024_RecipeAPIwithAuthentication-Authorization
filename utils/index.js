import jwt from "jsonwebtoken";

function generateToken(id, role) {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "1H", // Token expires in 1 hour
  });
}

export default generateToken;
