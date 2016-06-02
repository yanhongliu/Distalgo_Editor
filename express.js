var express = require('express'),
    app = express(),
    path = require("path"),
    fs = require("fs"),
    bodyParser = require('body-parser'),
    child_process=require('child_process'),
    pid=-1;

app.use(bodyParser.json());
app.use(express.static('distalgo'));
app.use(express.static('ace_editor'));
app.use(express.static('controller'));


app.get('/', function(req, res){
  res.sendFile(path.join(__dirname+'/main.html'));
});

app.get('/killprocess', function(req, res){
    var exec = child_process.exec;
    var cmd = 'python process.py '+pid;
    exec(cmd,function(err,stdrr,stdout){
                                res.send(stdrr);
                    });
    
});

app.post('/write', function(req, res){
  if(pid!=-1){
      res.send(JSON.stringify({'out':'Please stopping the last distalgo algorithm!'}));
      return;
  }
  var data=req.body['code'],
      exec = child_process.exec,
      cmd = 'python -m da distalgo/orig.da';
  fs.writeFile('distalgo/orig.da',data,function(error){
     if(error){
         res.json({'content':error});
     }else{
         console.log('exec');
         pro=exec(cmd,function(err,stdrr,stdout){
                                console.log(stdout);
                                pid=-1;
                                res.send(JSON.stringify({'out':stdout}));
                    });
         pid=pro.pid;
     } 
  });
});

app.listen(3000,function(){
    console.log('running '+3000);
});
