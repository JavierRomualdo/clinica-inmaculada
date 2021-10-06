const express = require("express");
const { check, param } = require("express-validator");

const {
  validarCampos,
} = require("../middlewares");

const {
  usuariosPost,
} = require("../controllers/usuarios");

const router = express.Router();

router.post(
  "/",
  [
    check("NRO_DOCUMENTO", "El dni es obligatorio").not().isEmpty(),
    check("NOMBRES_TRA", "Los nombres debe de ser más de 3 letras").isLength({
      min: 3,
    }),
    check("AP_PATERNO", "Apellido paterno debe de ser más de 3 letras").isLength({
      min: 3,
    }),
    check("AP_MATERNO", "Apellido materno debe de ser más de 3 letras").isLength({
      min: 3,
    }),
    check("TELEFONO", "El telefono debe de ser más de 6 letras").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  usuariosPost
);


module.exports = router;
