const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');

// ✅ Create User
router.post('/add', async (req, res) => {
  try {
    const { name, email } = req.body

    if (!name || !email === "") {

      return res.status(400).json({ message: 'Name and email are required' });

    }
    const newUser = new User({ name, email });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  }

  catch (err) {
    res.status(500).json({ error: err.message });
  }
})


// // ✅ Get All Users
// router.get('/all', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

router.get('/all', async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  }
  catch (err) {
    res.status(500).json({ error: err.message });


  }
})

// ✅ Get User by ID





// POST /api/users/get-by-id



router.post('/getbyid', async (req,res)=>{
  try {
    const user= await User.findById(req.body.id)
  if(!user)
    return res.status(404).json({message: 'User not found'});
   
   
      res.json(user);


  
  }
  catch (err){
    res.status(500).json({error: err.message})
  }

})






// ✅ Update User by ID
router.put('/:id', async (req,res)=>{
try{
const {name,email}=  await User.findByIdAndUpdate(req.params.id, req.body, {new: true});

if(!name || !email === ""){
  return res.status(400).json({message: 'Name and email are required'});
}
  else{
    res.json({message: 'User updated successfully', user: {name, email}});  
  }
}
catch (err){
  res.status(500).json({error: err.message})
}

})

// ✅ Delete User by ID
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
