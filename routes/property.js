import  express  from "express";
import { PropertyCount, PropertyForHomePage, deleteProperty, getAllProperty, getOneProperty, newProperty, searchProperty, updateProperty } from "../controller/PropertyController.js"



const router = express.Router() 

 

router.post("/add",newProperty)
router.put("/update/:id",updateProperty)
router.delete("/delete/:id",deleteProperty)
router.get("/all",getAllProperty)
router.get("/one/:id",getOneProperty)
router.get("/propertyesCount",PropertyCount)
router.get("/homepage",PropertyForHomePage) 
router.get("/search",searchProperty) 


export default router;