import mongoose from "mongoose";
import Property from "../models/Property.js";
import User from "../models/User.js";

export const newProperty = async (req, res) => {
  const {title,description,phone,images,location,contract,userId,category,bedroom,area,rent,perMonth,price} = req.body;
  const newPro = await Property.create({
    title,
    description,
    phone,
    location,
    category,
    bedroom,
    area,
    contract,
    rent,
    perMonth,
    price,
    userId,
    images,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newPro.save({ session });
    const user = await User.findById(req.body.userId);
    user.property.push(newPro);
    await user.save({ session });
    await session.commitTransaction();
    res.status(201).json(newPro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProperty = async (req, res) => {
  const id = req.params.id;
  try {
    const update = await Property.findByIdAndUpdate(id,{$set: req.body},{new:true});
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({ message: "error in update property" });
  }
};
 
export const deleteProperty = async (req, res) => {
  const id = req.params.id;
  try {
    let deleteP = await Property.findByIdAndRemove(id).populate('userId');
     await deleteP.userId.property.pull(deleteP)
     await deleteP.userId.save()
    res.status(200).json({ message: "delete is successfuly",deleteP});
  } catch (error) {
    res.status(500).json({ message: "error in deleate property" });
  }
};

export const getAllProperty = async (req, res) => {
  const page = parseInt(req.query.page);
  try {
    const allProperty = await Property.find({})
      .skip(page * 5)
      .limit(5)
      .sort({ createdAt: -1 });
    res.status(200).json(allProperty);
  } catch (error) {
    res.status(500).json({ message: "error in get all property" });
  }
};

export const getOneProperty = async (req, res) => {
  const id = req.params.id;
  try {
    const oneProperty = await Property.findById(id);
    res.status(200).json(oneProperty);
  } catch (error) {
    res.status(500).json({ message: "error in get property" });
  }
};

export const PropertyForHomePage = async (req, res) => {
  try {
    const limitProperty = await Property.find({})
      .limit(8)
      .sort({ createdAt: -1 });
    res.status(200).json(limitProperty);
  } catch (error) {
    res.status(500).json({ message: "error in get property for home page" });
  }
};

export const PropertyCount = async (req, res) => {
  try {
    const count = await Property.countDocuments();
    res.status(200).json(count);
  } catch (error) {
    res.status(500).json({ message: "error in get property for home page" });
  }
};

export const searchProperty = async (req, res) => {
  const title = RegExp(req.query.title, "i");
  const location = RegExp(req.query.location, "i");
  const category = RegExp(req.query.category, "i");

  try {
    const search = await Property.find({ title, category, location }).sort({
      createdAt: -1,
    });
    res.status(200).json(search);
  } catch (error) {
    res.status(404).json({ message: "not found" });
  }
};
