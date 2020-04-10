let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'), //created model loading here
    bodyParser = require('body-parser'),
    userModel = require('./app/models/user'),
    beneficiaryModel = require('./app/models/beneficiary'),
    beneficiaryRoutes = require('./app/routes/beneficiary-routes'),
    registerRoutes = require('./app/routes/register-routes');


// mongoose instance connection url connection
//mongoose.set('useNewUrlParser', true);
mongoose.connect('mongodb+srv://root:root@exterminators-hvc8c.mongodb.net/test?retryWrites=true&w=majority',
{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
});
mongoose.Promise = global.Promise;


//Adding body parser for handling request and response objects.
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//Enabling CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// const initApp = require('./app/app');
// initApp(app);
beneficiaryRoutes(app);
registerRoutes(app);

app.listen(port);
console.log('Exterminator app API server started on: ' + port);