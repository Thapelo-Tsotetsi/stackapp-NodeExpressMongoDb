
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , post = require('./routes/index');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/posts', post.findAll);
app.get('/posts/:id', post.findById);

app.post('/posts', post.addPost);
app.put('/posts:id', post.updatePost);
//app.delete('/posts/id', post.deleteWine);

//app.get('/posts', function(req, res){
//	res.send([{data:'data1'}, {data:'data2'}]);
//});

//app.get('/posts/:id', function(req, res){
//	res.send({id:req.params.id, data: "The Post", title: "title" });
//});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
