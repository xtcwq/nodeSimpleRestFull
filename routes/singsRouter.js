var sings=require("../service/singsOps")


// set with callback function
//all sings json
exports.list =  function(req, res) {  
    sings.list(function(rst){
        res.render('sing', {"data":rst})
    });    
    
};


//get maxId
exports.getMax=  function(req,res){
	sings.getMax(res);
}

// set with async
//add 
exports.add =  function(req, res) {
	 sings.add(req.body, res).then(()=>console.log( 'element added'));
};

//delete
exports.del = function(req, res) {
	sings.del(req.params.id, res);
};

//update
exports.update = function(req, res) {
	sings.update(req.body,res);
};