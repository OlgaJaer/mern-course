const { Router } = require("express");
const bcrypt = require('bcryptjs')
const { check, validationResult} = require("express-validator")
const router = Router();
const User = require('../models/User')

// /api/auth/register
router.post("/register", 
[
    check('email', 'Некорректный емайл').isEmail(),
    check('password', "Минимальная длина пароля не менее 6 символов").isLength({min: 6})
],
async (req, res) => {
try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: "Некорруктные данные при регистрации"
        })
    }

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
