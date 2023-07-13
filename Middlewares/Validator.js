  import { body, validationResult } from "express-validator";

const Check_Error = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

export const Login_Check = [
  body("email").exists().isEmail(),
  body("password").exists().isLength({ min: 6 }),
  Check_Error,
];

export const Teacher_Signup = [Check_Error];
export const Student_Signup = [Check_Error];
