let mongoose = require("mongoose");
let Schema = mongoose.Schema;


// let ts = Date.now();
// let date_ob = new Date(ts);
// let date = date_ob.getDate();
// let month = date_ob.getMonth() + 1;
// let year = date_ob.getF(ullYear();
let t = new Date().toLocaleDateString()

let userSchema = new Schema({
    createdAt: { 
        type: Date, 
        default: Date.now
     },
    updatedAt: { 
        type: Date, 
        default: Date.now
     },
    fname:String,
    lname:String,
    email:String,
    psw:String,
    cpsw:String,
    image:String

}
 
)


let videoSchema = new Schema({
    language:String,
    url:String,
    title:String,

})

let contentSchema = new Schema({
    title:String,
    subtitle:String,
    content: String
})
let languageSchema = new Schema({
    language: String
})
let blogSchema = new Schema({
    createdAt: { 
        type: String, 
        default: t
     },
    comment: String
})

  
//   PostSchema.plugin(mongoosePaginate)
// let postModel = mongoose.model("post",PostSchema);
contentSchema.index({title: 'text', subtitle: 'text' , content: 'text'});
let languageModel = mongoose.model("lang",languageSchema);
let contentModel = mongoose.model("content",contentSchema);
let videoModel = mongoose.model("video",videoSchema,"video");
let userModel = mongoose.model("users",userSchema);
let blogModel = mongoose.model("blogs",blogSchema);
module.exports = {userModel,videoModel,contentModel,languageModel,blogModel};