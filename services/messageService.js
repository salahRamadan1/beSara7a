const messageModel = require("../model/messageModel");
const userModel = require("../model/userModel");
const AppError = require("../utils/AppErrors");
const { createTryAndCatch } = require("../utils/catchErrors");
module.exports.addMessage =createTryAndCatch( async (req, res) => {
  const { message, userId } = req.body;
  const user = await userModel.findById(userId).populate("name");
  if (user) {
    await messageModel.insertMany({ message, userId });
    res.status(200).json({ message: "success" });
  } else {
  res.status(200).json({message:"user not found"})
  }
})
module.exports.getMessage = createTryAndCatch(async (req, res) => {
  const mes = await messageModel.find({ userId:req.id},{ message: 1, _id: 1, view: 1 });
  if (mes.length > 0) {
    res.status(200).json({ message: "success", mes });
  } else {
    res.status(200).json( {message:'not found message'}) 
  }
})
module.exports.getInfo = createTryAndCatch(async (req, res) => {
  const { _id } = req.headers;
  const user = await userModel.findById({ _id }, { name: 1, _id: 0 });
  if(user){
    res.json({user})
  }else{

    res.status(200).json( {message:'not found user'}) 
     
  }
})
module.exports.viewMessage =createTryAndCatch( async (req, res) => {
  const { _id } = req.headers;
  const mes = await messageModel
    .find({ userId: _id, view: true })
    .populate("userId");

  if (mes.length > 0) {
    res.json({ message: "success", mes });
  } else {
     next(new AppError(`can't find  document`, 404));
  }
})
module.exports.updateView =createTryAndCatch( async (req, res) => {
  const { view, _id } = req.body;
  const mes = await messageModel.findByIdAndUpdate(
    { userId: req.id, _id },
    { view } , {new:true}
  );
  res.json({ message: "success" });
})