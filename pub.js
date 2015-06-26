#!/usr/bin/env node

var sys = require("sys");
var request = require('request');
var stdin = process.openStdin();

console.log('Ready');
prompt();

stdin.addListener("data", function(d) {
    var msg =  d.toString().substring(0, d.length-1);
    if (msg === "") return prompt();
    var req = {url:'http://localhost:8081/pub', method:'POST', json: {key:'pubscript', msg: msg}};
    request(req,function(err,result){
        if (err){
            console.log('err:' + JSON.stringify(err));
        } else {
            console.log("published: [" + msg + "]");
        }
    });
    prompt();
});


function prompt() {
    process.stdout.write('>');
}
