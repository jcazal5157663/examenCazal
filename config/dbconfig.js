// import sqlite module
var sqlite3 = require('sqlite3').verbose();

//Database configuration

// Load or create database file 
var db = new sqlite3.Database('./db/examen.db');

// Init tables don't exist 
init = function () {
    db.run("CREATE TABLE if not exists ciudad (" +
        "idCiudad INTEGER PRIMARY KEY AUTOINCREMENT," +
        "descripcionCiudad TEXT," +
        "pais INT" +
        ")");
    db.run("CREATE TABLE if not exists pais (" +
        "idPais INTEGER PRIMARY KEY AUTOINCREMENT," +
        "descripcionPais TEXT" +
        ")");
    db.run("CREATE TABLE if not exists token (" +
        "idToken INTEGER PRIMARY KEY AUTOINCREMENT," +
        "accessToken TEXT," +
        "expires INT," +
        "clientId TEXT," +
        "user TEXT" +
        ")");
};

//export functions
module.exports = {
    init: init,
    db: db
};

