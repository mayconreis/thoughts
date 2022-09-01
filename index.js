const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const conn = require('./db/conn')

// Models
const Thought = require('./models/Thought')
const User = require('./models/User')

// Import Routes
const thoughtsRoutes = require('./routes/thoughtsRoutes')
const authRoutes = require('./routes/authRoutes')

// Import Controller
const ThoughtController = require('./controllers/ThoughtController')

// template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')


// receive response from body
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// session middleware
app.use(
    session({
        name: 'session',
        secret: 'nosso_secret',
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(), 'sessions')
        }),
        cookie: {
            secure: false,
            maxAge: 3600000,
            expires: new Date(Date.now() + 3600000),
            httpOnly: true
        }
    })
)

// flash messages
app.use(flash())

// public path
app.use(express.static('public'))

// set session response
app.use((req, res, next) => {
    
    if(req.session.userId) {
        res.locals.session = req.session
    }

    next()
})

// Routes
app.use('/thoughts', thoughtsRoutes)
app.use('/', authRoutes)

app.get('/', ThoughtController.showThoughts)

conn.sync({
    force: false
})
.then(() => {
    app.listen(process.env.PORT || 3000, () => console.log(`App rodando na porta ${process.env.PORT}!`))
})
.catch((err) => {
    console.log(err)
})