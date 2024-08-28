const UserSerice = require('../services/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const getUsers = async (req, res) => {
    try {
        const users = await UserSerice.getUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body; 
    try {
        const user = await UserSerice.getUserByEmail(email);

        if (!user) {
            return res.status(404).json({
                message: 'Usuario no encontrado.'
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta.' });
        }

        const token = jwt.sign({ id: user.userId, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ token:token, email:user.email });

    } catch (err) { 
        console.error(err);
        res.status(500).json({
            message: err.message
        });
    }
};


const getUserById = async (req, res) => {
    const id = req.user;
    try {
        
        const user = await UserSerice.getUserById(Number(id));
        
        console.log(user);

        if (!user) res.status(404).json({
            message: 'Usuario no encontrado.'
        });

        res.status(200).json(user);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

const updateUser = async (req, res) => {
    const id = req.user;
    const {username} = req.body; 
    try {

        const result = await UserSerice.updateUser(id, username);
        
        if (result.error) {
            return res.status(400).json({
                message: result.message
            });
        }
        return res.status(200).json(result.data);
        

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

const createUser = async (req, res) => {
    try {
        const result = await UserSerice.createUser(req.body);
        
        if (result.error) {
            return res.status(400).json({
                message: result.message
            });
        }
        return res.status(200).json(result.data);
        
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    getUsers,
    createUser,
    getUserById,
    login, 
    updateUser
};