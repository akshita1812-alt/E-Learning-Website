let express = require("express");
let app = express();
const path = require("path");
const PORT = process.env.PORT || 4000;
let bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const nodemailer  = require("nodemailer");

let cloudinary = require("cloudinary");
let upload = require("express-fileupload");
const fileupload = require("express-fileupload");
const {urlencoded} = require("express");

const Chartist = require('chartist');
const moment = require('moment');

var DomParser = require('dom-parser');
var parser = new DomParser();

cloudinary.config({
    cloud_name:"dtwxr77me",
    api_key:"628717527647344",
    api_secret:"4PVTEtDRsmu5aGFZIdoMMgHwmjg"
});

let mongoose = require("mongoose");
let hbs = require("hbs");
let {userModel,videoModel,contentModel,languageModel, blogModel} = require("./models/userModel");

// mongoose.connect("mongodb://127.0.0.1:27017/aks");
// mongoose.connection.once("open",()=>{
//     console.log("mongo db is connected");
// })
// mongoose.connection.on("error",(err)=>{
//     console.log(""+err);
// })
const { MongoClient, ServerApiVersion } = require('mongodb');
const { title } = require("process");
const uri = "mongodb+srv://asharma:Akshita_123@cluster0.yywdrbh.mongodb.net/Project?retryWrites=true&w=majority";
mongoose .connect( uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
 }) .then(() => console.log("MongoDB connected")) .catch((err) => res.status(404).json({ errors }));
app.use(fileupload({
       useTempFiles:true
    }));

app.set("views-engine", "hbs");
app.use(express.urlencoded({extended:true}));
app.use(express.text());
app.use(express.json());
app.use(express.static(__dirname+ '/public'));
app.use(express.static(__dirname));
app.get("/",(req,res)=>{
    res.render("./home.hbs");
})
app.get("/login",(req,res)=>{
    res.render("./main.hbs");
})
app.get("/signUp",(req,res)=>{
    res.render("./signUp.hbs")
})
app.get("/signIn",(req,res)=>{
    res.render("./signIn.hbs")
})
app.get("/tutorial",(req,res)=>{
    res.render("./tutorial.hbs")
})
app.get("/contact",(req,res)=>{
    res.render("./contact.hbs")
})
app.get("/home",(req,res)=>{
    res.render("./home.hbs")
})
app.get("/main",(req,res)=>{
    res.render("./main.hbs")
})
//// OTP //////
app.get("/verify",(req,res)=>{
    res.render("./otp.hbs")
})
//// forgot password /////
app.get("/password",async(req,res)=>{
    res.render("./forgotpsw.hbs",{id:req.params.id})
})
//// EMAIL FOR RESET PASSWORD ////////
app.get("/reset",async(req,res)=>{

    res.render("./resetpas.hbs");
})
// dashboard api //

app.get("/dashboard",async(req,res)=>{
  let total = await videoModel.find().count();
//   console.log(total);
let totalUsers = await userModel.find().count();
// console.log(totalUsers);
let javaScript=await videoModel.find({language:"javascript"}).count();
let html=await videoModel.find({language:"html"}).count();
let react=await videoModel.find({language:"reactjs"}).count();
let node=await videoModel.find({language:"nodejs"}).count();
let mongodb=await videoModel.find({language:"mongodb"}).count();

    let array=new Array(javaScript,html,react,node,mongodb)
    // console.log(array)
    userModel.aggregate([
        { $group: {
            _id: { $month: "$createdAt" },
            count: { $sum: 1 }
          }
        }
      ]).exec(function(err, result) {
        if (err) throw err;
    
        // Format the data for the chart
        const labels = [];
        const series = [[]];
        result.forEach(function(doc) {
          labels.push(moment().month(doc._id-1).format('MMMM'));
          series[0].push(doc.count);
        });
        // console.log(labels);
        // console.log(series);
        res.render("./dashboard.hbs",{data:array,month:labels,num:series,total:total,totalUsers:totalUsers})
    });
});
// DASBOARD VIDEO PAGE //
app.get("/dashvideo",async(req,res)=>{
    let l = await languageModel.find();
    // console.log(l)
    res.render("./dashboardvideo.hbs",{l:l})
})
// DASBOARD CONTENT PAGE //
app.get("/dashcontent",(req,res)=>{
    res.render("./dashboardcontent.hbs")
})
// USER LIST //
app.get('/userlist' ,async(req , res)=> {
    const users = await userModel.find({});
    res.render("./users.hbs", { users: users });
})
// UPDATE USER FROM LIST //
app.get('/userlist/edit/:id', async (req, res) => {
    const user = await userModel.findById(req.params.id);
    res.render("./edit-user.hbs", { user: user });
  });
// // DELETE USER FROM LIST //
app.get('/userlist/delete/:id', async (req, res) => {
    const user =await userModel.findByIdAndRemove(req.params.id);
    res.render("./delete-user.hbs", { user: user });
  });
app.get("/courses",(req,res)=>{
    res.render("./courses.hbs")
})
app.get("/addvideo",async (req,res)=>{
        res.render("./addvideo.hbs")
})
app.get("/addcontent", async(req,res)=>{
    res.render("./addContent.hbs");
})

app.get("/Javascriptvideo",async(req,res)=>{
    let result= await videoModel.find({language:"javascript"});
            res.render("./javascript.hbs",{data4: result})
    })
app.get("/Reactvideo",async(req,res)=>{
    let result= await videoModel.find({language:"reactjs"});
        res.render("./reactjs.hbs",{data4: result})
        })
app.get("/Phpvideo",async(req,res)=>{
    let result= await videoModel.find({language:"php"});
     res.render("./php.hbs",{data4: result})
     })
app.get("/Pythonvideo",async(req,res)=>{
let result= await videoModel.find({language:"python"});
       res.render("./python.hbs",{data4: result})
      })
app.get("/Htmlvideo",async(req,res)=>{
    let result= await videoModel.find({language:"html"});
   res.render("./html.hbs",{data4: result})
     })
app.get("/Cssvideo",async(req,res)=>{
    let result= await videoModel.find({language:"css"});
      res.render("./css.hbs",{data4: result})
         })
app.get("/Mongodbvideo",async(req,res)=>{
    let result= await videoModel.find({language:"mongodb"});
     res.render("./mongodb.hbs",{data4: result})
              })
app.get("/Nodevideo",async(req,res)=>{
     let result= await videoModel.find({language:"nodejs"});
     res.render("./node.hbs",{data4: result})
        })
app.get("/Javascriptcontent", async(req,res)=>{
    let t = await contentModel.find();
    // let result = await postModel.find();
    // let ob = {
    //     t:t,
    //     content:result
    // }
    // console.log(result);
    res.render("./Javascriptcontent.hbs",{data5: t})
});

app.get("/admin",async(req,res)=>{
    res.render("./adminLogin.hbs")
})
//upadte
app.get("/update/:id",async(req,res)=>{
    res.render("update.hbs",{id:req.params.id});
})
//////ADD BLOG////
app.get("/addblog",async(req,res)=>{
    res.render("./addblog.hbs");
})

/////// BLOG. /////
app.get("/blog",async(req,res)=>{
    let result = await blogModel.find();
    res.render("./blog.hbs",{data6 : result});
})


function isEmailValid(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

function isPasswordStrong(psw) {
  const regex =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  return regex.test(psw)
}
function generateOTP() {
    let digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }
let otp = generateOTP();



// const storage = multer.diskStorage({
//     destination: './uploads/photos',
//     filename:(req,file,cb)=>{
//        return cb(null, `${file.fieldname} + '-' + ${Date.now()} + ${path.extname(file.originalname)}`);
//     }
// })
// const upload = multer({
//     storage:storage,
//     limits:{fieldSize:200000}
// })

// app.post("/register",async(req,res)=>{
    
    // if(req.body.fname == "" ||req.body.lname == "" || req.body.email == "" || req.body.psw == "" || req.body.cpsw == ""){
    //     res.render("./signUp.hbs",{data: "Please fill all the fields"});
    // }
    // else{
    //     let find = await userModel.findOne({email: req.body.email})
    //     if(find){
    //        res.render("./signUp.hbs",{data: "User already registered"})
    //     }
    //     else{
    //         if(req.body.psw != req.body.cpsw){
    //             res.render("./signUp.hbs",{data: "Password does not match"})
    //          }else
    //          {
    //         let data1 = await userModel.create(req.body);
    //         console.log(req.body);
    //         if(data1){
    //             res.render("./signUp.hbs",{data: "data registered"})
    //         }
    //         else{
    //         res.render("./signUp.hbs",{data: "data is not registered"})
    //         }
    //     }
    //     }
    // }
   
// });
//register api
app.post("/upload",async(req,res)=>
{
    // try{
    let path = req.files.image;
    let a = await cloudinary.uploader.upload(path.tempFilePath)
    // console.log(a)
    let s = a.url;
    let {fname,lname,email,psw,cpsw,image} = req.body
    let salt = bcrypt.genSaltSync(10);
    let hashPass = bcrypt.hashSync(psw,salt);
    
if(req.body.fname == "" ||req.body.lname == "" || req.body.email == "" || req.body.psw == "" || req.body.cpsw == "" ||req.body.image == ""){
        res.render("./signUp.hbs",{data: "Please fill all the fields"});
    }
    else if (!isEmailValid(email)) {
        res.render("./signUp.hbs",{data: "Invalid email address"});
    } 
    else if (!isPasswordStrong(psw)) {
        res.render("./signUp.hbs",{data: "Password is too weak. Password must have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number."});
    } 
    else{
        let find = await userModel.findOne({email: req.body.email})
        if(find){
           res.render("./signUp.hbs",{data: "User already registered"})
        }
        else{
               
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: 'asharma15_be19@thapar.edu',
                        pass: 'pyoporvmcnyaiack',
                    },
                });
                let mailOptions = {
                    from: 'asharma15_be19@gmail.com',
                    to: 'akshita17.sharma@gmail.com',
                    subject: "OTP Verification",
                    text: `Your OTP for email verification is ${otp}`,
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                      console.log(error);
                    } else {
                     console.log("Email sent: ");
                    res.render("./otp.hbs", {data: "Otp sent"} )
                    }
                  });
            let obj={
                fname:fname,
                lname:lname,
                email:email,
                psw:hashPass,
                cpsw:hashPass,
                image:a.url

            }
            let data = await userModel.create(obj);
            // console.log(obj);
            if(data){
                res.render("./signUp.hbs",{data: "data registered"})
            }
            else{
            res.render("./signUp.hbs",{data: "data is not registered"})
            }
        }
    }
    // console.log(req.file);
    
});
//login api
app.post("/login", async(req,res)=>{
    let { email, psw } = req.body
    let result = await userModel.findOne({ email: email })
    let comp = await bcrypt.compare(psw, result.psw)
    console.log(comp)
    if (comp) {
        // res.send(`${result.name} is login...`)
        res.render("./main.hbs", { data1:result });
    } else {
        res.render("./signIn.hbs", { data1: "data is not matched.." })
    }
});
 ////// RESET ///////
app.post("/reset", async(req,res)=>{
    let p = await userModel.findOne({email:req.body.email})
    if(p){
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'asharma15_be19@thapar.edu',
            pass: 'pyoporvmcnyaiack',
        },
    });
    let mailOptions = {
        from: 'asharma15_be19@gmail.com',
        to: p.email,
        subject: "Reset Password ", 
        html: "<p>Hi," + p.fname + "Here is the link to reset the password.</p><a href='/password' > Reset Password </a> "
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
         console.log("Email sent: ");
         res.render("resetpas.hbs",{data: "Email sEnt"})
        }
      });
    }
    else{
        res.render("resetpas.hbs",{data: "Wrong Email"})
    }
})
// add video 

app.post("/addVideo",async(req,res)=>{
    // console.log(req.body)
    //  let abc = await videoModel.create(req.body);
     let {language, url, title} = req.body
   
     let d=await languageModel.find({language:language})
     console.log(d);
     let l1;
     if(d==""){
         await languageModel.create({language});
         l1 = await videoModel.create(req.body);
        }else{
         l1 = await videoModel.create(req.body);

     }
     console.log(l1)
     if(l1){
        // console.log(abc)
        // res.send("added...");
         res.redirect("/Mongodbvideo")
     }
});
// addcontent data

app.post("/addContent",async(req,res)=>{
    // console.log(req.body.content);
    // let c = req.body.content;
    // let cStringify = JSON.stringify(c);
    // console.log(cStringify);
    const {title, subtitle, content} = req.body
    const data = {
        title:title,
        subtitle:subtitle,
        content:content

    }
    // console.log(data);
     let result = await contentModel.create(data);
    //  let ck=await postModel.create({content:c});
     if(result){
        res.redirect("/Javascriptcontent")
     }
});
///// ADD BLOG ///////
app.post("/addblog",async(req,res)=>{
    let result = await blogModel.create(req.body);
    // console.log(result);
    res.redirect("/blog");
})
app.delete("/delete1",async(req,res)=>{
    let delete1= await videoModel.deleteMany({__v:"0"});
    console.log(delete1)

})
// filter data

app.get('/filter/:title',async(req,resp)=>{
    let a = req.params.title
    let result=await contentModel.find({subtitle:a})
    console.log(result)
    resp.render("Javascriptcontent.hbs",{filter_data:result})


})
// search data
app.post('/search' , async(req,res)=>{
    let result  = await contentModel.find({$text: {$search: req.body.search}})
    // console.log(result)
    res.render("Javascriptcontent.hbs",{data5:result})
})
// pagination 
app.get('/pagination' , async(req,res)=>{
    let a = req.query.page
    let limit = 2;

  let result = await contentModel.find().skip((a-1)*limit).limit(limit);
  res.render("Javascriptcontent.hbs",{data5:result});
})

///////// ADMIN ///////
app.post('/admin' , async(req,res)=>{
    let result = req.body
    if(result.email == 'akshita17.sharma@gmail.com' && result.psw === '12334'){
       res.redirect('/dashboard');
    }
})
app.post('/update' , async(req,res)=>{
   
    let path = req.files.image
    let a = await cloudinary.uploader.upload(path.tempFilePath)
    
    let s = a.url;

       let up= await userModel.updateOne({_id:req.body.id},{
            $set:{
                image:s
            }
        })
if(up){
    let result = await userModel.findOne({ _id:req.body.id })
    res.render("main.hbs",{data1:result})
}

})
///// UPDATE PASSWORD ////////
app.post("/password",async(req,res)=>{
    let salt = bcrypt.genSaltSync(10);
    let hashPass = bcrypt.hashSync(req.body.psw,salt);

    let p = await userModel.updateOne({_id:req.body.id},{
        $set:{
            psw:hashPass
        }
    })
if(p){
    
}
})
// update user from admin list
app.post('/userlist/edit/:id', async (req, res) => {
    let salt = bcrypt.genSaltSync(10);
    let hashPass = bcrypt.hashSync(req.body.psw,salt);
    const user = await userModel.findById(req.params.id);
    user.fname = req.body.fname;
    user.lname = req.body.lname;
    user.email = req.body.email;
    user.psw = hashPass;
    await user.save();
    res.redirect('/userlist');
  });
// // delete user from admin list
app.post('/userlist/delete/:id', async (req, res) => {
    await userModel.findByIdAndRemove(req.params.id);
    res.redirect('/userlist');
  });
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`);
})
