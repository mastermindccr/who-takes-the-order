const { randomInt } = require('crypto');
const app = require('express');
const fs = require('fs');
const path = require('path')
const router = app.Router();

var characters = [];
for(let i = 48;i<=57;i++){
    characters.push(String.fromCharCode(i));
}
for(let i = 65;i<=90;i++){
    characters.push(String.fromCharCode(i));
}
for(let i = 97;i<=122;i++){
    characters.push(String.fromCharCode(i));
}

function randChar(){
    return characters[randomInt(1000000)%characters.length];
}

function generateToken(){
    let tmp = "";
    for(let i = 0;i<30;i++){
        tmp += randChar();
    }
    return tmp;
}

router.get('/', (req, res) => {
    let written = false;
    var obj = require('../password.json');
    for (i of obj.passwords){
        if(req.query.password==i){
            written = true;
            let token = generateToken();
            const file = require('../password.json');
            file.token = token;
            fs.writeFile(path.join(__dirname, '../password.json'), JSON.stringify(file), (err) => {
                if(err) console.error(err);
            })
            res.json(token);
            break;
        }
    }
    if(!written) res.status(401).end('incorrect password!');
})

module.exports = router;