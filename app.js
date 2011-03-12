var Connect = require('connect'),
    quip = require('quip'),
    dispatch = require('dispatch');

var geo = require('geo');

var server = Connect.createServer(
    quip(),
    dispatch({
        '/': function(req, res, next){
            res.text('hello world!');
        },
        '/geo': function(req, res, next){
            res.json({hello: 'world'});
        }
    })
);

server.listen(8080);