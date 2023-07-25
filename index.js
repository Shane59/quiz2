const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://aois:9EWizeEohUCkMsRu@exam.l2qrkjk.mongodb.net/Exam";
mongoose.connect(uri, { useNewUrlParser: true,  useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

//creating schema
const quizeSchema = new mongoose.Schema({
  name: String,
  sid: String,
});

const quizes = mongoose.model("quize", quizeSchema);

app.get('/', function(req, res) {
  const shinya = new quizes({
    name: "Shinya Aoi",
    sid: "300369796",
  });
  quizes.insertMany([shinya])
  .then(function() {
    console.log("successfully created db data");
  })
  .catch(function (err) {
    console.log(err)
  });
  res.sendStatus(200);
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
