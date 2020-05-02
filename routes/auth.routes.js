const { Router } = require("express");
const bcrypt = require('bcryptjs')
const router = Router();
const User = require('../models/User')

// /api/auth/register
router.post("/register", async (req, res) => {
try {
    const { email, password} = req.body 
    const condidate = await User.findOne({email}) // email: email

    if (candidate) {
        return res.status(400).json({message: "Такой пользователь уже существует"}) 
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({email, password: hashedPassword})

    await user.save()
    res.status(201).json('Пользователь создан') 

} catch (error) {
    res.status(500).json({message: "Что-то пошло не такб попробуйте снова"})
}
});

// /api/auth/login
router.post("/login", async (req, res) => {
    try {
        
    } catch (error) {
        
    }
});

module.exports = router;
