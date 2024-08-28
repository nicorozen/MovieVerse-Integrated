const { User } = require("../db/db");
const bcrypt = require('bcryptjs');

const getUsers = async () => await User.findAll();
const getUserById = async (id) => await User.findByPk(id);
const getUserByEmail = async (email) => await User.findOne({ where: { email: email } });

const createUser = async (user) => {
    try {
      let isUserRegistered = await getUserByEmail(user.email);
      if(isUserRegistered){
        return { error: true, message: 'El mail ingresado ya pertence a una cuenta.' };
      }
      else{
        user.password = bcrypt.hashSync(user.password,process.env.SALT);
        await User.create(user);
        return {succes: true, data: user};
    }
    } catch (err) {
      throw new Error("Error al crear el usuario.");
    }
  }

  const updateUser = async (id, username) => {
    try {
      const user = await getUserById(id);

      if(!user){
        return { error: true, message: 'No se encontró el usuario.' };
      }
      else{
        user.username = username.toString();;
        await user.save();

        return {succes: true, data: user};
    }
    } catch (err) {
      throw new Error("Error al actualizar el usuario." + err);
    }
  }


module.exports = {
    getUsers,
    getUserById,
    createUser,
    getUserByEmail, 
    updateUser
};