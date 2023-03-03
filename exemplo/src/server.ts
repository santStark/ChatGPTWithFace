var express = require('express');
var cookieParser = require("cookie-parser");
var sessions = require('express-session');
var cors = require('cors');
var router = express.Router();
var path = require('path');

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: 'Sua chave aqui',
});

const openai = new OpenAIApi(configuration);

var app = express();

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "fgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/", router);
app.use(express.static(path.join(__dirname, '../cliente')))

router.get('/', async (req: any, res: any) => {
    res.redirect('index.html');
})



//----------------------------------------------------------//
//---------------------------API ---------------------------//
//----------------------------------------------------------//

router.post('/minharesposta', async (req: any, res: any) => {


    try {
        
        if (configuration.apiKey === 'Sua chave aqui') res.send({ msg: "Tudo certo estou te ouvindo, porém não posso consultar no chatgpt sem a configuração de sua chave" });
        else {

            const maxTokens = 100;
            const temperature = 0;
            const n = 1;

            let m = await openai.createCompletion({
                model: 'text-davinci-003',
                prompt: req.body.msg,
                max_tokens: maxTokens,
                temperature: temperature,
                n: n
            });

            res.send({ msg: m.data.choices[0].text });
        }

    } catch (error) {

        console.log(error);
        res.send({ msg: "Deu erro" });

    }

});


app.listen(3000);
console.log('Running a GraphQL API server at http://localhost:3000/');
