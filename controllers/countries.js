var express = require('express');
var router = express.Router();
// import http status parse
var httpStatus = require('./status/httpStatus')
var database = require('../config/dbconfig');

var listAll = function (req, res) {
    var sql = "SELECT idPais As idPais ,descripcionPais As descripcionPais FROM pais";
    database.db.all(sql, function (err, rows) {
        if (err)
            httpStatus.commonError(res, err);
        else
            httpStatus.exitsSuccess(res, rows);
    });
}
var searchById = function (req, res) {
    var id = parseInt(req.params.id);
    var query = `SELECT idPais As idPais ,descripcionPais As descripcionPais FROM pais WHERE idPais = ? limit 1`;
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
    var descripcionPais = req.body.descripcionPais;
    database.db.run(`INSERT INTO pais VALUES (?,?)`, [null, descripcionPais], function (err) {
        if (err)
            httpStatus.commonError(res, err);
        else
            httpStatus.actionSuccess(res)
      });
}
var updateById = function (req, res) {
    var id = parseInt(req.params.id);
    var descripcionPais = req.body.descripcionPais;
    database.db.run(`UPDATE pais SET descripcionPais = ? WHERE idPais = ?`, [descripcionPais, id], function (err) {
        if (err)
            httpStatus.commonError(res, err);
        else
            httpStatus.actionSuccess(res)
    });
}
var deleteById = function (req, res) {
    var id = parseInt(req.params.id);
    database.db.run(`DELETE from pais WHERE idPais = ?`, [id], function (err) {
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