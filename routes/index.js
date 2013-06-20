
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.findAll = function(req, res){
	res.send([{data:'data1'}, {data:'data2'}, {data:'data3'}]);
};

exports.findById = function(req, res){
	res.send({id:req.params.id, data: "The Data", description: "description"});
}


var mongo = require('mongodb');

var Server = mongo.Server,
		Db = mongo.Db,
		BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect:true}, {safe:true});
db = new Db('postdb', server);

db.open(function(err, db){
	if(!err){
		console.log("Connected to 'postdb' database");
		db.collection('posts', {strict:true}, function(err,collection){
			if(err){
				console.log("The 'posts' collection doesn't exist. Create it with sample data");
				populateDb();
			}
		});
	}
});

exports.findById = function(req, res){
	var id = req.params.id;
	console.log('Retrieving post: ' +id);
	db.collection('posts', function(err, collection){
		collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item){
			res.send(item);
		});
	});
};

exports.findAll = function(req, res){
	db.collection('posts', function(err, collection){
		collection.find().toArray(function(err, items){
			res.send(items);
		});
	});
};

exports.addPost = function(req, res){
	var post = req.body;
	console.log('Adding wine: '+JSON.stringify(post));
	db.collection.insert(post, {safe:true}, function(err, result){
		if(err){
			res.send({'error': 'An error has occured'});
		}
		else{
			console.log('Success: '+ JSON.stringify(result[0]));
			res.send(result[0]);
		}
	});
};


exports.updatePost = function(req, res){
	var id = req.params.id;
	var post = req.body;
	console.log('Updating post: ' +id);
	console.log(JSON.stringify(post));
	db.collection('posts', function(err, collection){
		collection.update({'_id':new BSON.ObjectID(id)}, post, function(err, result){
			if(err){
				console.log('Error updating wine: ' + err);
				res.send({'error': 'An error has occured'});
			}
			else{
				console.log('' +result + 'document(s) updated');
				res.send(post);
			}
		});
	});
}




//Populate database with sample data -- Only used once
var populateDb = function(){
	var posts = [
		{
			title: "2014 Investech Internship",
			closingdate: "12/12/2013",
			location: "JHB, Sandton",
			description: "Invested invites graduate to join..."
		},
		{
			title: "2014 JP Morgan Internship",
			closingdate: "12/12/2013",
			location: "JHB, Sandton",
			description: "JP Morgan invites graduate to join..."
		}

	]

	db.collection('posts', function(err, collection){
		collection.insert(posts, {safe:true}, function(err, result){});
	})
}