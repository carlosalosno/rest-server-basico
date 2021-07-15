const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async( rol = '' )=> {

  const existeRol = await Role.findOne({ rol });
  if( !existeRol ){
    throw new Error(`El rol ${ rol } no existe`)
  }
}

 // Verificar si el correo existe
const emailExiste = async (email = ' ') => {
   
    const existEmail = await Usuario.findOne( { email } );
    if ( existEmail ){
      throw new Error(`El email  ${ email } ya existe`)
    }
}

const existerUsuarioPorId = async ( id ) => {
   
  const existeUsuario = await Usuario.findById(id);
  if ( !existeUsuario ){
    throw new Error(`El id  ${ id } no existe`)
  }
}

module.exports = {
  esRoleValido,
  emailExiste,
  existerUsuarioPorId
}
