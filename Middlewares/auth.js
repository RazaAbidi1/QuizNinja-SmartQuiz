import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const CreateToken = (obj, type) => {
  return Jwt.sign(
    {
      id: obj.id,
      Type: type,
    },
    process.env.PrivateKey,
    { expiresIn: "1d" }
  );
};
export const authToken = (req, res, next) => {
  console.log(req.token);
  const token = req.body.token || req.headers.token || req.Cookies.token;
  if (!token) {
    res.status(401).send("Unauthorized: No token provided");
    return;
  } else {
    Jwt.verify(token, process.env.PrivateKey, function (err, decoded) {
      if (err) {
        console.log(err, "error");
        res.status(401).send("Unauthorized: Invalid token");
        return;
      } else {
        if (decoded.id) {
          console.log(decoded.id);
          req.body.id = decoded.id;
          req.body.Type = decoded.Type;
          next();
        } else {
          res.status(401).send("Unauthorized: Invalid token");
        }
      }
    });
  }
};
