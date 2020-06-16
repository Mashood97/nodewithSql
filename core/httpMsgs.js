var settings = require('../settings');


exports.show500 = function (req, resp, err) {
    if (settings.httpMsgsFormat === 'json') {
        resp.writeHead(500, 'Internal Error Occured', { 'Content-Type': 'application/json' });
        resp.write(JSON.stringify({ data: "Error occured:" + err }));
    } else {
        //show error in html.
    }

    resp.end();

}


exports.sendJson = function (req, resp, data) {

    resp.writeHead(200, { 'Content-Type': 'application/json' });
    if (data) {
        resp.write(JSON.stringify(data));
    }
    resp.end();
}


exports.show405 = function (req, resp) {
    if (settings.httpMsgsFormat === 'json') {
        resp.writeHead(405, 'Method not supported', { 'Content-Type': 'application/json' });
        resp.write(JSON.stringify({ data: 'method not supported' }));
    }
    else {
        //show html error
    }
    resp.end();
}


exports.show404 = function (req, resp) {
    if (settings.httpMsgsFormat === 'json') {
        resp.writeHead(404, 'Method not Found', { 'Content-Type': 'application/json' });
        resp.write(JSON.stringify({ data: 'method not Found' }));
    }
    else {
        //show html error
    }
    resp.end();
}


exports.show413 = function (req, resp) {
    if (settings.httpMsgsFormat === 'json') {
        resp.writeHead(413, 'Request Entity too large', { 'Content-Type': 'application/json' });
        resp.write(JSON.stringify({ data: 'Request Entity too large' }));
    }
    else {
        //show html error
    }
    resp.end();
}

exports.send200 = function (req, resp) {
    if (settings.httpMsgsFormat === 'json') {
        resp.writeHead(200, { 'Content-Type': 'application/json' });
        resp.write(JSON.stringify({data: 'Success' }));
    }
    else {
        //show html error
    }
    resp.end();
}


exports.showHome = function (req, resp) {
    if (settings.httpMsgsFormat === 'json') {
        resp.writeHead(200, { 'Content-Type': 'application/json' });
        resp.write(JSON.stringify([
            {
                url: '/employeeList',
                operation: 'GET',
                description: 'To get list of all employees'
            },
            {
                url: '/employee/<empno>',
                operation: 'GET',
                description: 'To get a specific employees with his emp no'
            },

        ]));
    }
    else {
        //show html error
    }
    resp.end();
}