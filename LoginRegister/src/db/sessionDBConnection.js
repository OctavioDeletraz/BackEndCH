const session = require('express-session')
const MongoStore = require('connect-mongo')
const advancedOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true
}
const sessionDBConnection = session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@ecommercecoderhousesant.6p5agbc.mongodb.net/sessions?retryWrites=true&w=majority`,
        mongoOptions: advancedOptions
    }),
    secret: 'algo',
    resave: false,
    saveUninitialized: false
})
module.exports = sessionDBConnection