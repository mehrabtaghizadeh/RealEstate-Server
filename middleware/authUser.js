import jwt from "jsonwebtoken"

export const authUser = async (req,res,next) => {
      const {token} = req.cookies
      try { 
          const data = jwt.verify(token,process.env.JWT)
          if(data.username) {
            next()
          }else{
           res.status(500).json({message:"you are not authorized to access this"})
          }
      } catch (error) {
        res.status(404).json({message:"you are not authorized to access this"})
      }
}