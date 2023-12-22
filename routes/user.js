import  express  from "express";
import { profile } from "../controller/AuthController.js";
import { getAlluser, oneUser } from "../controller/userController.js";
const router = express.Router()
 


router.get("/profile",profile)
router.get("/allusers",getAlluser)
router.get("/oneUser/:id",oneUser)

export default router;