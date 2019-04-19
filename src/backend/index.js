const express = require('express');
const app = express();

var fs = require('fs');
var data = fs.readFileSync('Data.json');
var words = JSON.parse(data);

app.get('/get', (req, res) =>{
  res.json(words);
  });
  
  
app.post('/post/:data',(req,res)=>{
  var data = req.params.data;
  fs.writeFile('Data.json', data, finished); 
  function finished(err){
    console.log("all set.");
  } 
  res.send(data);
  });
  
const port = process.env.port || 3001
app.listen(port, () => console.log(`Listening on port ${port}`));
