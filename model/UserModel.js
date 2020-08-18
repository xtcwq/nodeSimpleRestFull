
// Or use  mongoose connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/albumSeven', {useNewUrlParser: true});
var MODEL = mongoose.Schema({    
    UserName: String,
    Password: String, 
    Name: String,
    meta:{
        createdAt:{
            type:Date,
            default:Date.now()
        },
        updatedAt:{
            type:Date,
            default:Date.now()
        }
    }
}, {collection: "User"});

MODEL.statics = {
    findByKeyValue : function( KeyValue, cb ) {
        return this.find(KeyValue).exec( cb );
    }
};
MODEL.pre("save",function(next) {
    if(this.isNew){
        this.meta.createdAt = this.meta.updatedAt = Date.now();
    }
    else{
        this.meta.updatedAt = Date.now();
    }
    next();
});

module.exports = mongoose.model('UserMODEL', MODEL);