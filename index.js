const express = require('express')
const app = express();
const cors = require('cors')
const pwd = require('./router/pwd.js');
const person = require('./router/person');
require('dotenv').config();

app.use(cors({origin: '*'}))
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/pwd', pwd);
app.use('/person', person);

app.use(function (req, res){
    res.status(404).end('404 Page Not Found');
});

app.listen(process.env.PORT | 5000, ()=>{
    console.log('app is ready!')
})