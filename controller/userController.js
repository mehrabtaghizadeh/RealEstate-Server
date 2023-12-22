import User from "../models/User.js";

export const getAlluser = async (req,res) => {

    try {
         const getusers = await User.find()
        res.status(201).json(getusers);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}

export const oneUser = async (req,res) => {
  const id = req.params.id
  try {
    const user = await User.findById(id).populate('property')
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
}
// const session = await mongoose.startSession()
// session.startTransaction() 
// await newPro.save({session})
// const user = await User.findById(req.body.userId)
// user.property.push(newPro)
// await user.save({session})
// await session.commitTransaction(); 