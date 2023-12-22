import  express  from "express";
import { login, profile, register } from "../controller/AuthController.js";
import { getAlluser, oneUser } from "../controller/userController.js";
const router = express.Router()
 

router.post("/register",register)
router.post("/login",login)
router.get("/allusers",getAlluser)
router.get("/oneUser/:id",oneUser)

export default router;