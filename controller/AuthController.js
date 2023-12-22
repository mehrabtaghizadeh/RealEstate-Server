import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const register = async (req,res) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
     
    try {
        const newUser = await User.create({
            username,
            email,
            password:passwordHash
        })
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id , username: user.username }, process.env.JWT);
    res.cookie('token',token , {
      httpOnly:true
    }).json({success:true,token,user})
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const profile = async (req,res) => {
 const {token} = req.cookies
  try { 
      const data = jwt.verify(token,process.env.JWT)
      res.status(200).json(data)
  } catch (error) {
    res.status(404).json({message:"user not found"})
  }
}