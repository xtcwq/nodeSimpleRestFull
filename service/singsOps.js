
var monk = require('monk');
const cookieParser = require('cookie-parser');
var db = monk('localhost:27017/albumSeven');

db.then(() => {
    console.log('Connected correctly to server')
  })
var sings = db.get('sings');

//all sings json
exports.list =  function(callback) {	
	  sings.find({}).then((rst) => {
		callback(rst);	
	}).then(() => db.close());   
};

//get maxId
exports.getMax=function(res){
	sings.findOne({}, {sort: {id: -1}}).then((res)=>{
		res.json(res);
	}).then(() => db.close());
}

//add 
exports.add = async function(sing, res) {
	await sings.findOne({}, {sort: {id: -1}}).then((obj)=>{	
		sing.id=(parseInt(obj.id)+1)+"";
		sings.insert(sing).then((sing) => {
		 res.json(sing);
	   }).then(() => db.close());
	});
};

//delete
exports.del = function(id, res) {
	sings.remove({"id":id}).then((obj)=>{
		res.json(obj);
	}).then(() => db.close());
};

//update
exports.update = function(sing, res) {
	sings.update({"id":sing.id}, sing).then((obj)=>{
		res.json(obj);
	   }).then(() => db.close());
};
