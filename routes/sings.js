/*
 *  monk to mongodb
 * 
 */
var monk = require('monk');
var db = monk('localhost:27017/album7');
var sings = db.get('sings');

//all sings json
exports.list = function(req, res) {	
	sings.find({}).then((res) => {
		res.json(res);
	}).then(() => db.close());   
};

//get maxId
exports.getMax=function(req,res){
	sings.findOne({}, {sort: {id: -1}}).then((sing)=>{
		res.json(sing);
	}).then(() => db.close());;
}

//add 
exports.add = function(req, res) {
	sings.findOne({}, {sort: {id: -1}}).then((obj)=>{
		var sing=req.body;
		sing.id=(parseInt(obj.id)+1)+"";
		sings.insert(sing).then((res) => {
		 res.json(res);
	   }).then(() => db.close());
	});
};

//delete
exports.del = function(req, res) {
	var id=req.params.id;
	sings.remove({"id":id}).then((obj)=>{
		res.json(obj);
	}).then(() => db.close());
};

//update
exports.update = function(req, res) {
	var book=req.body;
	sings.update({"id":sing.id}, sing).then((obj)=>{
		res.json(obj);
	   }).then(() => db.close());
};
