const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const fetchuser = require("./midlleware/fetchuser");


const JWT_SECRET = "thisIsJWTwebToken";

const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/myDB");


const userSchema = new mongoose.Schema({
   username :{
       type : String,
       unique :true,
    },
   password : String,
});

const User = mongoose.model("User",userSchema);


const notesSchema = new mongoose.Schema({
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    title : String,
    content : String
});

const Note = mongoose.model("Note",notesSchema);



// user endpoints

        //creating user endpoint

        app.post("/api/auth/createuser", async (req,res)=>{

            let success = false;

            try {

                 
            let user = await User.findOne({username : req.body.username});
            if(user){
                success = false;
                res.status(400).json({success : success,error : "Sorry a user with this email already exists"});
            }
            else{
                let newUser = new User({
                    username : req.body.username,
                    password : req.body.password
                });
                
                let newOne = await newUser.save();            // two ways of saving data in a database
                
                let data = {
                    user :{
                        id : newOne.id
                    }
                }
                success = true;
                let authtoken = jwt.sign(data,JWT_SECRET);

                res.json({ success : success, authtoken : authtoken});

            }

        } 
        catch (error) {
            console.error(error.message);
           return res.status(500).send("Internal Server Error");    
        }

        });


        //login endpoint

        app.post("/api/auth/login", async (req,res)=>{
            let success = false;
            try {

                let user = await User.findOne({username : req.body.username});

                if(!user){
                    success = false;
                   return res.status(400).json({ success : success, error : "Please enter valid credentials"});
                }
                else{
                    if(user.password !== req.body.password){
                        success = false;
                         return res.status(400).json({success : success,error : "Please enter valid credentials"});
                    }
                    else{
                        const data = {
                            user: {
                              id: user.id
                            }
                          }
                          success = true;
                          const authtoken = jwt.sign(data, JWT_SECRET);
                          res.json({success : success,authtoken : authtoken});
                    }
                }

                
            } catch (error) {
                console.error(error.message);
                return res.status(500).send("Internal Server Error");    
            }
        });


        // endpoint for getting the user details which require login "in this we will fetch user's data except password"

        app.post("/api/auth/getuser", fetchuser , async (req,res)=>{

            try {
            
            let userId = req.user.id;      // this line user is different from the user below this line, this line's user came from the fetchuser middleware
            let user = await User.findById(userId).select("-password");
            res.send(user);

            } 
            catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error");
            }

        });

// user endpoints


//notes end point 

// This endpoint is regarding fetching all notes of the user, which is extracted from the authtoken by jwt verify
  app.get("/api/notes/fetchallnotes", fetchuser ,async (req,res)=>{        // this requires log in or auth token

    try {
        const notes = await Note.find({userID : req.user.id});
        res.json(notes);
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

  });

  // This endpoint will add note
  app.post("/api/notes/addnote", fetchuser , async (req,res)=>{             // this requires log in or auth token

    try {
        
        let newNote = new Note({
            userID : req.user.id,
            title : req.body.title,
            content : req.body.content
        });
        let createdNote = await newNote.save();

        let updatedNotesArray = await Note.find({userID : req.user.id});
        
        res.json(updatedNotesArray);
        
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

  });

  // this endpoint will delete particular note
  app.delete("/api/notes/deletenote/:id", fetchuser , async (req,res)=>{

    try {
        
        let note = await Note.findById(req.params.id);         // here id is not the usual one , it is just the param which is used /deletenote/:id"  here
        if (!note) { 
            return res.status(404).send("Not Found");
         }
        if(note.userID.toString() !== req.user.id){
            return res.status(404).send("Not Found");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        
        let updatedNotesArray = await Note.find({userID : req.user.id});
        
        res.json(updatedNotesArray);

    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
  });

  app.put("/api/notes/editnote/:id", fetchuser , async (req,res)=>{

    try {
        let userId = req.params.id;
        let note = await Note.findById(userId);

        if(!note){
            return res.status(404).send("Not Found");
        }
        
        if(req.user.id !== note.userID.toString()){
            return res.status(404).send("Not Found");
        }

        else{
            note = await Note.findByIdAndUpdate(userId,{title : req.body.title,content : req.body.content});
            let updatedArray = await Note.findById(userId);
            res.json(updatedArray);
        }

    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

  });


app.listen(5000,()=>{
    console.log("server is running on port 5000");
});