import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import authRoutes from './routes/auth.js'
import propertyRoutes from './routes/property.js'
import userRoutes from './routes/user.js'
import cookieParser from 'cookie-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
// import multer from 'multer';

const app = express()
import dotenv from "dotenv";
import upload from './middleware/upload.js';
import cloudinary from './middleware/cloudinary.js';

dotenv.config()

mongoose.connect(process.env.DATABASE).then(()=>{
    console.log("database is connected")
}).catch(err=>console.log(err))

app.use(express.urlencoded({extended: false}));
app.use(express.json())
  
app.use(cors({credentials:true,origin:process.env.URL}))
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use("/public", express.static(__dirname + "/public"));

 
app.use(cookieParser())
app.use("/auth",authRoutes)
app.use("/propertyes",propertyRoutes)
app.use("/user",userRoutes)
app.post("/upload", upload.array("image",12), async (req, res) => {    
    try {
        let pictureFiles = req.files;
        if (!pictureFiles || pictureFiles.length === 0) {
            return res.status(400).send("No picture attached!");
        }

        let multiplePicturePromise = pictureFiles.map((picture, index) =>
            cloudinary.uploader.upload(picture.path, {
                public_id: `${Date.now()}_${index}`,
            })
        ); 

        const imageResponse = await Promise.all(multiplePicturePromise);

        const imagesUrl = imageResponse.map((image) => {
            const url = image.secure_url;
            const public_id = image.public_id
            return { url , public_id };
        });

        if (imagesUrl.length > 0) {
            return res.status(200).json(
                 imagesUrl
            );
        }
    } catch (err) {
        res.status(500).send(err.message || "Something went wrong!");
    }
});
app.delete("/delete",async(req,res)=>{
    
    const {url} = req.body
    try {
  const deleteImg =   await cloudinary.uploader.destroy(url,(result)=>{console.log(result)})
     res.status(200).json({deleteImg});       
    } catch (error) {
        res.status(500).json({"error":"error"})
    }
})

app.listen(4000 , () => {
   console.log("server is run on port : 4000")
})