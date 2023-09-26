let express = require("express");
let app = express();
let multer = require("multer");
const {MulterError} = require("multer");
const path = require("path");
let hbs = require("hbs");
// let cloudinary = require("cloudniary");
// const fileupload = require("express-fileupload");
// const {urlencoded} = require("express");

// cloudinary.config({
//     cloud_name:"dtwxr77me",
//     api_key:"628717527647344",
//     api_secret:"4PVTEtDRsmu5aGFZIdoMMgHwmjg"
// });
app.use(express.urlencoded({extended:true}));
app.use(express.text());
app.use(express.json());
app.set("views-engine", "hbs");
//app.use('/uploads', express.static('uploads'));
// app.use(fileupload({
//    useTempFiles:true
// }));

const storage = multer.diskStorage({
    destination: './uploads/photos',
    filename:(req,file,cb)=>{
       return cb(null, `${file.fieldname} + '-' + ${Date.now()} + ${path.extname(file.originalname)}`);
    }
})
const upload = multer({
    storage:storage,
    limits:{fieldSize:200000}
})
app.get("/",(req,res)=>{
    res.render("./image.hbs");
})
app.post("/upload",upload.single('image'),(req,res)=>
{
    console.log(req.file);
    res.render("./image.hbs",({data:"file is uploaded" , url:`http://localhost:1234/upload/${req.file.filename}`}))
    function errHandler(err,req,res,next){
        if(err instanceof MulterError){
            res.json({
                success:0,
                message:err.message
            })
        }
    }
});

app.listen(1234,()=>{
   console.log("server started");;
})