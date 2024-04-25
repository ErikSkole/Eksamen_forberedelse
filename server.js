const express = require('express')
const session = require('express-session')
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

const app = express()

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }))
app.use(session( {
    secret: 'secretKey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60
    }
}))

app.set("view engine", "ejs")

app.get('/', (req, res) => {
    res.render('index')
})

app.route('/login')
    .get((req, res) => {
        if (req.session.logedIn !== true)
        res.render('login')
    })
    .post(async (req, res) => {
        const bruker = await prisma.elev.findUnique({
            where: {
                epost: req.body.epost
            }
        })
        if (bruker && bcrypt.compare(req.body.passord, bruker.passord)) {
            req.session.logedIn = true
            res.redirect('/')
        } else {
            res.render('login', { epost: req.body.epost, passord: req.body.passord, error: 'Feil brukernavn eller passord'})
        }
    })

app.get('/loggut', (req, res, next) => {
    console.log('Logget ut')
    req.session.destroy()
    res.send('Du er logget ut')
    setTimeout(next, 2000)
    res.redirect('/login')
})

app.use((req, res, next) => {
    if (req.session.logedIn === true) {
        next()
    } else {
        res.redirect('/login')
    }
})

    
const elever = require('./routes/elever')
app.use('/elever', elever)

const laerere = require('./routes/laerere')
app.use('/laerere', laerere)

const ny = require('./routes/ny')
const { set } = require('firebase/database')
app.use('/ny', ny)

app.listen(3000)