const { response } = require('express');
const bcryptjs = require( 'bcryptjs' );
const Usuario = require('../models/usuario');

const usuariosGet = async (req, res = response) => {

  const { limite = 5, desde = 0 } = req.query;
  const query = {estatus: true}

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments( query ),
    Usuario.find( query )
    .skip( Number( desde ) )
    .limit(Number( limite ))
  ]);

  res.json({
    total,
    usuarios
  });
}

const usuariosPut = async (req, res = response) => {

  const { id } = req.params;
  const { _id,password, google, ...resto} = req.body;

  //Encriptar la contraeña
  if( password ) {
  const salt = bcryptjs.genSaltSync();
  resto.password = bcryptjs.hashSync( password, salt );

  }

  const usuario = await Usuario.findByIdAndUpdate( id, resto);

  res.json({usuario});
}

const usuariosPost = async (req, res = response) => {


  const { name, email, password, rol } = req.body;
  const usuario = new Usuario( { name, email, password, rol } );

  //Encriptar la contraeña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync( password, salt );

  //guardar en BD
  await usuario.save();

  res.json({
    usuario
  });
}

const usuariosDelete = async (req, res = response) => {

  const { id } = req.params;

  //fisicamente lo borramos
  const usuario = await Usuario.findByIdAndUpdate( id, { estatus: false });

  res.json({
    msg: `El usuario ${ id } ha sido eliminado`,
    usuario
  });
}

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: 'patch API - controlador'
  });
}

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch

}