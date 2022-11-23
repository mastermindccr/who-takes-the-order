const express = require('express')
const app = express();
const path = require('path');
const pwd = require('./router/pwd.js');
const person = require('./router/person');

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/pwd', pwd);
app.use('/person', person);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(function (req, res){
    res.status(404).end('404 Page Not Found');
});

app.listen(process.env.PORT | 5000, ()=>{
    console.log('app is ready!')
})