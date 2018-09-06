var express= require('express');
var bodyParser= require('body-parser');
var controller= require('./controller.js');



var app= express();
app.use(bodyParser.json());
controller(app);

app.listen(3001, function(){
  console.log('working');
});
