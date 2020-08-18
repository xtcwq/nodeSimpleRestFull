
var singService=function(){
	var monk = require('monk');
	var db = monk('localhost:27017/album7');
	
	function Dao(){
		this.getAllSings=function(){
			return db.get('sings');
		}
	}
	
}

module.exports = singService;