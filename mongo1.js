<script type="text/javascript">  
document.write("JavaScript is a simple language for javatpoint learners");  
</script>  























let express = require("express");
let app = express();

let mongoose = require("mongoose");
let hbs = require("hbs");
let userModel = require("./models/userModel");

mongoose.connect("mongodb://127.0.0.1:27017/aks");
mongoose.connection.once("open",()=>{
    console.log("mongo db is connected");
})
mongoose.connection.on("error",(err)=>{
    console.log(""+err);
})
app.set("views-engine", "hbs");
app.use(express.urlencoded({extended:true}));
app.use(express.text());
app.use(express.json());
app.use(express.static(__dirname+ '/public'));
app.get("/",(req,res)=>{
    res.render("./signIn.hbs");
})
app.post("/login",async(req,res)=>{
    try {
        // check if the user exists
        let user = await userModel.findOne({ email: req.body.email });
        if (user) {
          //check if password matches
          if (req.body.psw === user.psw) {
            res.render("./signIn.hbs",{data: "Loged In"})
          } else {
            res.render(".signIn.hbs/",{ data: "password doesn't match" });
          }
        } else {
          res.render({ error: "User doesn't exist" });
        }
      } catch (error) {
        res.status({ error });
      }
});
var mail = require('./config/mailer')();
mail.send();

app.listen(4000,()=>{
    console.log("server started");
})





