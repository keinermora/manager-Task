const User = require('../models/user.model');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: 'este email ya está en uso' });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
}

