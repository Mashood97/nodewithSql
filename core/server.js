var http = require('http');

var emp = require('../controllers/employee');
var settings = require('../settings');
var httpMsgs = require('./httpMsgs');
http.createServer(function (req, resp) {
    switch (req.method) {
        case 'GET':
            if (req.url === '/') {
                httpMsgs.showHome(req, resp);
            }
            else if (req.url === '/employeeList') {
                emp.getListofEmployee(req, resp);
            }
            else {
                var empNoPattern = '[0-9]+';
                var pattern = RegExp('/employees/' + empNoPattern);
                if (pattern.test(req.url)) {
                    pattern = new RegExp(empNoPattern);
                    var empNo = pattern.exec(req.url);
                    emp.getEmployeeById(req, resp, empNo);
                }
                else {
                    httpMsgs.show404(req, resp);
                }
            }
            break;
        case 'POST':
            if (req.url === '/Postemployees') {
                var reqBody = '';
                req.on('data', function (data) {
                    reqBody += data;
                    if (reqBody.length > 1e7) //10mb data
                    {
                        httpMsgs.show413(req, resp);
                    }
                });
                req.on("end", function () {
                    emp.addAEmployee(req, resp, reqBody);
                });

            }
            else {
                httpMsgs.show404(req, resp);
            }
            break;
        case 'PUT':
            if (req.url === '/Updateemployees') {
                var reqBody = '';
                req.on('data', function (data) {
                    reqBody += data;
                    console.log(reqBody);
                    if (reqBody.length > 5e7) //10mb data
                    {
                        httpMsgs.show413(req, resp);
                    }
                });
                req.on("end", function () {
                    emp.updateAEmployee(req, resp, reqBody);
                });

            }
            else {
                httpMsgs.show404(req, resp);
            }
            break;
        case 'DELETE':
            if (req.url === '/Deleteemployees') {
                var reqBody = '';
                req.on('data', function (data) {
                    reqBody += data;
                    if (reqBody.length > 1e7) //10mb data
                    {
                        httpMsgs.show413(req, resp);
                    }
                });
                req.on("end", function () {
                    emp.deleteEmployee(req, resp, reqBody);
                });

            }
            else {
                httpMsgs.show404(req, resp);
            }
            break;
        default:
            httpMsgs.show405(req, resp);
            break;
    }
}).listen(settings.webPort, function () {
    console.log('Started Listeneing at:' + settings.webPort);
});