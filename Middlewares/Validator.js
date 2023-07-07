import { body } from "express-validator";
const createEmailChain = () => body("email").isEmail();
