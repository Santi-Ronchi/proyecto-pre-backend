const {conexionMongoDB,disconnectMongoDB} = require('../daos/mongodb');
const userSchema = require('../schemas/users');

class User {
    async createUsuario(usuario) {
        try {
          await conexionMongoDB();
          const data = await userSchema.create({
            nombre: usuario.nombre,
            email: usuario.email,
            password: usuario.password,
            direccion: usuario.direccion,
            edad: usuario.edad,
            telefono: usuario.telefono,
            foto: usuario.foto
          });
          disconnectMongoDB();
          return data;
        } catch (error) {
          throw Error(error.message);
        }
    }

    async buscarUsuario(email) {
        try {
          await conexionMongoDB()
          const data = await userSchema.find({email:email})
        disconnectMongoDB();
        return data[0];
      } catch (error) {
        throw Error(error.message);
      }
    }

}

module.exports = User;