const app = require('express');
const fs = require('fs');
const path = require('path')
const router = app.Router();

const init = require('../init.json');
fs.writeFileSync(path.join(__dirname, '../person.json'), JSON.stringify(init), (err) => {
    if(err) console.error(err);
})

router.get('/', (req, res) => {
    var obj = require('../person.json');
    let arr = [];
    for (i in obj){
        arr.push({name: i, times: obj[i].times, penalty: obj[i].penalty});
    }
    res.json(arr);
})

router.put('/:name', (req, res) => {
    const token = require('../password.json').token;
    if(req.body.token != token){
        res.status(401).end('invalid token!');
    }
    else{
        let times = req.body.times;
        let penalty = req.body.penalty;
        const file = require('../person.json');
        file[req.params.name].times = times;
        file[req.params.name].penalty = penalty;
        fs.writeFile(path.join(__dirname, '../person.json'), JSON.stringify(file), (err) => {
            if(err) console.error(err);
        })
        res.end('complete!');
    }
})

module.exports = router;