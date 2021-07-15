const { Router } = require ('express');
const { check } = require ( 'express-validator');

const { esRoleValido, emailExiste, existerUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const { usuariosGet,
         usuariosPut,
         usuariosPost,
         usuariosDelete,
         usuariosPatch } = require('../controllers/usuarios');



const router = Router();

router.get('/', usuariosGet );

router.put('/:id',[
  check('id', 'No es un Id válido').isMongoId(),
  check( 'id').custom( existerUsuarioPorId),
  check('rol').custom( esRoleValido ),
  validarCampos
], usuariosPut );

router.post('/',[ 
  check('password', 'El password es boligatorio y ha de ser de mas de 6 caracteres').isLength({ min: 6 }),
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('email').custom( emailExiste ), 
  check('rol').custom( esRoleValido ),
  validarCampos 
], usuariosPost);

router.delete('/:id', [
  check('id', 'No es un Id válido').isMongoId(),
  check( 'id').custom( existerUsuarioPorId ),
  validarCampos
], usuariosDelete);


router.patch('/', usuariosPatch);

module.exports = router;
