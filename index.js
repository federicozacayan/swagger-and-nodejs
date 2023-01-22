const express = require("express")
const swaggerUI = require("swagger-ui-express")
const YAML = require("yamljs")
const swaggerJsDocs = YAML.load('./api.yaml')
const fileUpload = require("express-fileupload")
const app = express()

app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs))
app.use(fileUpload());

app.get('/string', (req, res) => {
    res.status(200).send("this is a string")
})

app.get('/object', (req, res) => {
    res.status(200).send({
        id: 1,
        name: "Tom Cruise"
    })
})

app.get('/objects', (req, res) => {
    res.status(200).send([1, 2, 3].map(index => ({
        id: index,
        name: "Tom Cruise"
    })))
})

app.get('/objects/:param', (req, res) => {
    res.status(200).send([{
        id: req.params.param,
        name: "Tom Cruise"
    }])
})

app.post('/create', (req, res) => {
    console.log(req.body);
    res.status(200).send([req.body])
})

app.get('/queryParameter', (req, res) => {
    res.status(200).send({
        id: req.query.id,
        name: req.query.name
    })
})

app.post('/upload', (req, res) => {
    const file = req.files.file;
    let path = __dirname + "/upload/file-" + Date.now() + ".jpg"
    file.mv(path, (err) => {
        res.status(201).send({
            code: 201,
            name: "created"
        })
    })
})

app.post('/header', (req, res) => {
    const auth = req.headers.auth;
    res.status(200).send({
        code: 200,
        name: auth
    })
})

app.post('/cookie', (req, res) => {
    // res.setHeader('Set-Cookie', 'debug=1234');
    let cookies = {};
    const cookiesArray = req.headers.cookie.split(';');
    cookiesArray.forEach((cookie) => {
        const [key, value] = cookie.trim().split('=');
        cookies[key] = value;
    });
    res.status(200).send({
        code: 200,
        name: cookies['debug']
    })
})

app.listen(4000, () => console.log("UP and running at port 4000"))