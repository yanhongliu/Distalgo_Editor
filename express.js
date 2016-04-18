var express = require('express');
var app = express();
var path    = require("path");
var fs = require("fs");
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('distalgo'));
app.use(express.static('ace_editor'));
app.use(express.static('controller'));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname+'/main.html'));
});
app.get('/killprocess', function(req, res){
    var exec = require('child_process').exec;
    var cmd = 'python process.py';
    exec(cmd,function(err,stdrr,stdout){
                                res.send(stdrr);
                    });
    
});
app.post('/write', function(req, res){
  var data=req.body['code'];
  var exec = require('child_process').exec;
  var cmd = 'python -m da distalgo/orig.da';
         
  fs.writeFile('distalgo/orig.da',data,function(error){
     if(error){
         res.json({'content':error});
     }else{
         var exec = require('child_process').exec;
         var cmd = 'python -m da distalgo/orig.da';
         console.log('exec');
         exec(cmd,function(err,stdrr,stdout){
                                console.log(stdout);
                                res.send(JSON.stringify({'out':stdout}));
                    });
     } 
  });
});
app.listen(3000);
console.log('running'+3000);