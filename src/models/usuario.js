const { DataTypes } = require("sequelize");
const dbMysql = require("../database/config");

// class Usuario extends Model{};
// Usuario.init
const Usuario = dbMysql.define("usuario", {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  AP_PATERNO: {
    type: DataTypes.STRING,
  },
  AP_MATERNO: {
    type: DataTypes.STRING,
  },
  NOMBRES_TRA: {
    type: DataTypes.STRING,
  },
  NRO_DOCUMENTO: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  EDAD: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  TELEFONO: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  CAS: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Usuario;
