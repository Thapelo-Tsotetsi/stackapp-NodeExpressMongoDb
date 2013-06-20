
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