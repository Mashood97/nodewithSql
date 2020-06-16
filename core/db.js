var sqlDb = require('mssql');
var sqlDbSettings = require('../settings');

exports.executeSql = function (sql, callback) {
    var conn = new sqlDb.ConnectionPool(sqlDbSettings.dbConfig);
    conn.connect()
        .then(function () {
            var req = new sqlDb.Request(conn);
            req.query(sql).then(function (recordSet) {
                callback(recordSet['recordsets']);
            }).catch(function (err) {
                console.log(err);
                callback(null, err);
            });
        })
        .catch(function (err) {
            console.log(err);
            callback(null, err);
        });
};


