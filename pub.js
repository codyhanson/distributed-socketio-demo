#!/usr/bin/env node

var sys = require("sys");
var request = require('request');
var stdin = process.openStdin();

console.log('Ready');
prompt();

stdin.addListener("data", function(d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then substring() 
    var msg =  d.toString().substring(0, d.length-1);
    if (msg === "") return prompt();
    var req = {url:'http://localhost:8080/pub', method:'POST', json: {key:'pubscript', msg: msg}};
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
