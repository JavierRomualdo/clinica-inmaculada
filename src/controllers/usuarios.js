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
          title: 'Paciente verificado',
          icon: 'info',
          msg: `Usted pertenece a la Clínica Inmaculada, nos estaremos comunicando para su consulta preventiva.`
        });
      } else {
        return res.status(201).json({
          success: false,
          title: 'Error al verificar',
          icon: 'error',
          // extraInfo: usuario,
          msg: `Error al actualizar usuario!`
        });
      }

      
      // const usuario = new Usuario(body);
      // // Guardar usuario
      // await usuario.save();
      
    } else {
      // Guardar usuario
      const usuario = new Usuario(body);
      await usuario.save();

      return res.status(201).json({
        success: false,
        title: 'Paciente no encontrado',
        icon: 'warning',
        // extraInfo: usuario,
        msg: `Verificaremos su afiliación.`
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