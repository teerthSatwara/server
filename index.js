require('dotenv').config()
const express = require("express");

const app = express()
const mongoose = require("mongoose")
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const catRouter = require("./routes/categories")
const multer = require("multer");
const path =require("path")

app.use(express.json());
app.use("/images", express.static(path.join(__dirname,"/images")))

mongoose.connect(process.env.MONGO_URL, ()=>{

    console.log("connected to a db a server");
   

});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });

app.use("/api/auth/", authRouter);
app.use("/api/user/", userRouter);
app.use("/api/posts/", postRouter);
app.use("/api/cat/", catRouter);

// app.use(express.static(path.join(__dirname, "/client/build")));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
// });


app.listen(5000, ()=>{
    console.log("connected to port 5000.")
});
