require('dotenv').config()
const express = require('express'),
    session = require('express-session'),
    massive = require('massive'),
    app = express(),
    PORT = 4000,
    authCtrl = require('./controllers/authController'),
    treasureCtrl = require('./controllers/treasureController'),
    auth = require('./middleware/authMiddleware')

const {SESSION_SECRET, CONNECTION_STRING} = process.env

//Top-level Middleware
app.use(express.json())
app.use(session({
    resave: true,
    saveUninitialized: false, 
    secret: SESSION_SECRET
}))

//Endpoints
app.post('/auth/register', authCtrl.register) 
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)

app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure)

app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.getUserTreasure)
app.post('/api/treasure/user', auth.usersOnly, treasureCtrl.addUserTreasure)
app.get('/api/treasure/all', auth.usersOnly, auth.adminsOnly, treasureCtrl.getAllTreasure)


//Database and Server Port Connection
massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false},
}).then((dbInstance) => {
    app.set('db', dbInstance)
    console.log('DB CONNECTED')
    app.listen(PORT, () => console.log(`server listening on ${PORT}`))
})

    