var express = require('express');
var router = express.Router();
// import http status parse
var httpStatus = require('./status/httpStatus')
var database = require('../config/dbconfig');

var listAll = function (req, res) {
    var sql = "SELECT idCiudad As idCiudad ,descripcionCiudad As descripcionCiudad, pais As pais FROM ciudad";
    database.db.all(sql, function (err, rows) {
        if (err)
            httpStatus.commonError(res, err);
        else
            httpStatus.exitsSuccess(res, rows);
    });
}
var searchById = function (req, res) {
    var id = parseInt(req.params.id);
    var query = `SELECT idCiudad As idCiudad ,descripcionCiudad As descripcionCiudad, pais As pais FROM ciudad WHERE idCiudad = ? limit 1`;
    database.db.get(query, [id], (err, row) => {
        if (!row)
            row = {};
        if (err)
            httpStatus.commonError(res, err);
        else
            httpStatus.exitsSuccess(res, row);
    });
}
var create = function (req, res) {
    var descripcionCiudad = req.body.descripcionCiudad;
    var idPais = parseInt(req.body.idPais);
    database.db.run(`INSERT INTO ciudad VALUES (?,?,?)`, [null, descripcionCiudad, idPais], function (err) {
        if (err)
            httpStatus.commonError(res, err);
        else
            httpStatus.actionSuccess(res)
    });
}
var updateById = function (req, res) {
    var id = parseInt(req.params.id);
    var descripcionCiudad = req.body.descripcionCiudad;
    var idPais = parseInt(req.body.idPais);
    database.db.run(`UPDATE ciudad SET descripcionCiudad = ?, pais = ? WHERE idCiudad = ?`, [descripcionCiudad, idPais, id], function (err) {
        if (err)
            httpStatus.commonError(res, err);
        else
            httpStatus.actionSuccess(res)
    });
}
var deleteById = function (req, res) {
    var id = parseInt(req.params.id);
    database.db.run(`DELETE from ciudad WHERE idCiudad = ?`, [id], function (err) {
        if (err)
            httpStatus.commonError(res, err);
        else
            httpStatus.actionSuccess(res)
    });
}

//export functions
module.exports = {
    listAll: listAll,
    searchById: searchById,
    create: create,
    updateById: updateById,
    deleteById: deleteById
};