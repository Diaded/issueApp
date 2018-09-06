var bodyParser= require('body-parser');
var mongoose= require('mongoose');


var urlencodedParser = bodyParser.urlencoded({ extended: false });

mongoose.connect('mongodb://diade:diade@ds217360.mlab.com:17360/twitterclone');

var issueSchema=  mongoose.Schema({
  issue:String,
  password:String,
  comments: Array
});
var issue= mongoose.model('issue',issueSchema);

module.exports= function(app){

app.get('/api', function(req, res){

    issue.find({}, function(err, data){
       res.json({array: data});
    });

});

app.post('/addIssue', urlencodedParser, function(req, res){
    issue({issue:req.body.issue, password:req.body.password, comments:[]}).save(function(){
      issue.find({}, function(err, data){
        res.json({array: data});
      });
    });
});


app.delete('/delIssue', urlencodedParser, function(req, res){
      issue.find({_id:req.body.id}, function(err, data){
        if(data[0].password===req.body.password){
          issue.find({_id:req.body.id}).remove(function(){
                issue.find({}, function(err, data1){
                    res.json({array: data1});
                });
          });
        }else{
          res.json({array: 'not working'});
        }
      });
});



app.post('/addComment', urlencodedParser, function(req, res){
  var id= Math.floor(Math.random() * (100000000 - 1) + 1);
  console.log(id);
  issue.find({_id: req.body.id}, function(err, data){
    data[0].comments.push({comment: req.body.comment, password:req.body.password, id:id});
    issue.update({_id: req.body.id}, data[0], {upsert: true}, function(){
        issue.find({}, function(err, data1){
          res.json({array: data1});
        });
    });
  });
});



app.delete('/delComment', urlencodedParser, function(req, res){
  console.log(req.body);
  issue.find({_id: req.body.id}, function(err, data){
    var comments=[];
    console.log(data[0]);
    for(var i=0; i<data[0].comments.length;i++){
      if(data[0].comments[i].id!==req.body.comId && data[0].comments[i].password!==req.body.password){
        comments.push(data[0].comments[i]);
      }
    }
    data[0].comments=comments;
    console.log(data[0].comments);
    issue.update({_id:req.body.id}, data[0], {upsert:true}, function(){
        issue.find({}, function(err, data1){
            res.json({array: data1});
        });
    });

  });


});



}
