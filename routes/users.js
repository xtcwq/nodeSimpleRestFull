
/*
 * login
 */

exports.login = function(req,res){
  var User = req.body;  
  if(User.UserName && User.Password) {
    userMODEL.findByKeyValue({"UserName":User.UserName}, function(err,result) {
      if( result.length <= 0 ) {
        }
      else{
        if(User.Password != result[0].Password){
        }
        else{
          req.session.user = result[0];
        }
      }
    });
  }
  else{
    //to do
  }
}