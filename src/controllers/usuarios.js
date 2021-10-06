const Usuario = require("../models/usuario");

async function usuariosPost(req, res) {
  // condicion
  const { body } = req;
  

  try {
    const { NRO_DOCUMENTO, NOMBRES_TRA, AP_PATERNO, AP_MATERNO, TELEFONO } = body;

    const usuario = await Usuario.findOne({
      where: { NRO_DOCUMENTO },
    });

    if (usuario) {
      // Actualizar los datos del usuario
      const resp = await Usuario.update(
        {
          NRO_DOCUMENTO, NOMBRES_TRA, AP_PATERNO, AP_MATERNO, TELEFONO
        },
        {
          where: { NRO_DOCUMENTO },
        }
      );

      if (resp[0]) {
        return res.status(201).json({
          success: true,
          extraInfo: usuario,
          title: 'Usuario actualizado',
          icon: 'info',
          msg: `El usuario con DNI, ${ usuario.NRO_DOCUMENTO }, se ha actualizado.`
        });
      } else {
        return res.status(201).json({
          success: false,
          title: 'Error al actualizar',
          icon: 'error',
          // extraInfo: usuario,
          msg: `Error al actualizar usuario!`
        });
      }

      
      // const usuario = new Usuario(body);
      // // Guardar usuario
      // await usuario.save();
      
    } else {
      return res.status(201).json({
        success: false,
        title: 'Usuario no encontrado',
        icon: 'warning',
        // extraInfo: usuario,
        msg: `El usuario con DNI, ${ NRO_DOCUMENTO }, no existe.`
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      title: 'Error !',
      icon: 'error',
      // extraInfo: usuario,
      msg: `Comuniquese con el administrador.`
    });
  }
}

module.exports = {
  usuariosPost
}