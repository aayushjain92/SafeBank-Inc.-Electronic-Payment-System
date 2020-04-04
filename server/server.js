let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'), //created model loading here
    bodyParser = require('body-parser');


// mongoose instance connection url connection
// mongoose.set('useNewUrlParser', true);
mongoose.connect('mongodb+srv://root:root@exterminators-hvc8c.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });

mongoose.Promise = global.Promise;


//Adding body parser for handling request and response objects.
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//Enabling CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    req.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    if (req.method === 'OPTIONS') {
        req.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
const initApp = require('./app/app');
initApp(app);

app.listen(port);
console.log('Exterminator app API server started on: ' + port);