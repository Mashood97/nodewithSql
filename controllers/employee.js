var db = require('../core/db');
var httpMsgs = require('../core/httpMsgs');
var util = require('util');
exports.getListofEmployee = function (req, resp) {
    db.executeSql('Select * from Employee', function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {
            httpMsgs.sendJson(req, resp, data);
        }

    });
};

exports.getEmployeeById = function (req, resp, empId) {
    db.executeSql('Select * from Employee Where Empno=' + empId, function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {
            httpMsgs.sendJson(req, resp, data);
        }

    });
};


exports.addAEmployee = function (req, resp, reqBody) {
    try {
        if (!reqBody) throw new Error('Input not valid');
        var data = JSON.parse(reqBody);
        if (data) {
            var sqlQuery = 'Insert into Employee (EmployeeName,Sal,Deptno) values ';
            sqlQuery += util.format("('%s', %d, %d)", data.EmployeeName, data.Sal, data.Deptno);
            db.executeSql(sqlQuery, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, resp, err);
                }
                else {
                    httpMsgs.send200(req, resp);
                }

            });

        } else {
            throw new Error('Input not valid');
        }
    }
    catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};



exports.updateAEmployee = function (req, resp, reqBody) {
    try {
        if (!reqBody) throw new Error('Input not valid');
        var data = JSON.parse(reqBody);
        if (data) {
            if (!data.Empno) throw new Error('Please Provide Employee No');

            var sqlQuery = 'Update Employee SET';
            var isDataProvided = false;

            if (data.EmployeeName) {
                console.log(data.EmployeeName);
                sqlQuery += " EmployeeName = '" + data.EmployeeName + "'" + ",";
                isDataProvided = true;
            }
            else if (data.Sal) {
                sqlQuery += ' Sal = ' + data.Sal + ',';
                isDataProvided = true; 
            }
            else if (data.Deptno) {
                sqlQuery += ' Deptno = ' + data.Deptno + ',';
                isDataProvided = true;
            }
            sqlQuery = sqlQuery.slice(0, -1); //remove last comma
            console.log(sqlQuery + 'SQL QUERY')
            sqlQuery += " Where Empno = " + data.Empno;
            console.log(sqlQuery + 'SQL QUERY')

            db.executeSql(sqlQuery, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, resp, err);
                }
                else {
                    httpMsgs.send200(req, resp);
                }

            });
        } else {
            throw new Error('Input not valid');

        }
    }
    catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};


exports.deleteEmployee = function (req, resp, reqBody) {
    try {
        if (!reqBody) throw new Error('Input not valid');
        var data = JSON.parse(reqBody);
        if (data) {
            if (!data.Empno) throw new Error('Employee no not provided');

            var sqlQuery = 'Delete from Employee ';
            sqlQuery += 'Where Empno = ' + data.Empno;

            db.executeSql(sqlQuery, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, resp, err);
                }
                else {
                    httpMsgs.send200(req, resp);
                }

            });
        } else {
            throw new Error('Input not valid');
        }
    }
    catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};