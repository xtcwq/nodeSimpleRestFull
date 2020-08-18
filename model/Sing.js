// Or use  mongoose to create the connection

var Schema = require('mongoose').Schema;
var MODEL = Schema({
    Type: String,
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
}, {collection: "Sing"});


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