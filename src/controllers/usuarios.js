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
        let msj= ""
        if(usuario.EDAD<3 && usuario.EDAD>1){
          msj="PACIENTE CONSULTA PREVENTIVA PARA CRED Y ANEMIA"
        }
        if(usuario.EDAD<1){
          msj="PACIENTE MENOR A UN AÑO DE EDAD ACERCA A SU CITA PARA CONTROL DE VACUNA"
        }
        if(usuario.EDAD>60 && usuario.EDAD<98){
          msj="PACIENTE CONSULTA PREVENTIVA CONTRA DIABETES, HIPERTENSION "
        }
        if((usuario.EDAD>20 && usuario.EDAD<65) && usuario.SEXO=='0'){
          msj="PACIENTE CONTROL DE PAPANICOLAO"
        }
        if(usuario.EDAD>49 && usuario.EDAD<50 && usuario.SEXO==false){
          msj="PACIENTE CORRESPONDE CONTROL DE MAMOGRAFIA"
        }
        return res.status(201).json({
          success: true,
          extraInfo: usuario,
          title: 'Perteneces a nuestra institucion Bienvenido a IPRESS ESSALUD CLINCIA INMACULADA',
          icon: 'info',
          msg: msj
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