import { Router } from "express";
import { authToken } from "../Middlewares/auth.js";
import { getImage, uploadImage } from "../Helper/imgtest.js";
import multer from "multer";
const upload = multer({ dest: "Images" });
// import all controllers
// import SessionController from './app/controllers/SessionController';

const ImageRoutes = new Router();

// Add ImageRoutes
ImageRoutes.get("/get/:id", upload.single("image"), getImage);
ImageRoutes.post("/add", uploadImage);

export default ImageRoutes;
