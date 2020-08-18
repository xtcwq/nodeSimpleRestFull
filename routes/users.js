
/*
 * login
 */

var userMODEL=require('../model/UserModel');

exports.login = function(req,res){

  var User = req.body;  
  if(User.UserName && User.Password) {
    userMODEL.findByKeyValue({"UserName":User.UserName}, function(err,result) {
      if( result.length <= 0 ) {
        console.log("not exits")
        res.end("not exits " + User.UserName);
        }
      else{
        if(User.Password != result[0].Password){
          res.end("password error " + User.UserName);
        }
        else{
          req.session.user = result[0];  
          res.render("/sings");  
        }
      }
    });
  }
  else{
    console.log("not exits")
    res.render("login.html");
  }

}

