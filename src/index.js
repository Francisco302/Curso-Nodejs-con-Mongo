const express = require ('express');
const path = require('path');
const exphbs = require('express-handlebars');// plantillas
const methodOverride = require('method-override'); // formularios
const expressSession = require('express-session'); // sessiones
const flash = require('connect-flash');
// Initializer
const app = express();
require('./database');

// Settings
app.set('port',process.env.PORT ||  3000);
app.set('views', path.join(__dirname, 'views'));
const hbs = exphbs.create({
  defaultLayout: "main",
  layoutsDir: path.join(app.get("views"), "layouts"),
  partialsDir: path.join(app.get("views"), "partials"),
  extname: ".hbs",
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

app.set('view engine', '.hbs');

//Middleware
app.use(express.urlencoded({extended: false})); // para entender datos del formulario get,post,put,overrid
app.use(methodOverride('_method')); // es necesario para validar put
app.use(expressSession({
  secret: 'mysecretapp',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

// Global Variables
app.use((req, res, next) => {
res.locals.success_msg = req.flash('success_msg');
res.locals.error_msg = req.flash('error_msg');
  next();
});

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

// Static Files
app.use(express.static(path.join(__dirname,'public')));

// Server Listening
app.listen(app.get('port'),() => {
    console.log('Server on port' , app.get('port'));
});