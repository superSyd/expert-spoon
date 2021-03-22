const multer = require('multer');
var express = require('express');
var cors = require('cors');
require('dotenv').config()

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000  }
  });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single("upfile"), (req,res,next)=>{
  const file = req.file;

  if(file){
    
    return res.json({
      name: file.originalname,
      type: file.mimetype,
      size: file.size
    })
    


  } else {
    const error = new Error("Please upload a file")
     error.httpStatusCode = 400;
    return next(error)
  }
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
