/**
 * Routes & Configuration File 
 *
 * */


/*
 * Basic initialization
 * */
let express = require('express');
let app = express();
let session = require('express-session');
const bodyParser = require('body-parser');



/*
 * Configure template engine 
 * */
app.set('view engine', 'ejs'); 
app.set('views', './app/views'); 



/*
 * Configuration Middleware 
 * */
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.urlencoded())



/*
 * Initialize Controllers
 * */
let google_books_controller = require('./app/controllers/google_books_controller.js');
let session_controller = require('./app/controllers/session_controller.js'); 



/*
 * List Routes
 */

/* Authentication Routes */
app.get('/', google_books_controller.index); 
app.get('/auth', session_controller.process_code); 
app.get("/signout", session_controller.signout);
app.get("/signin", session_controller.signin);




/* Search Routes */
app.get('/user_action/:id', google_books_controller.user_action);
app.get("/add_to_bookshelf/:id", google_books_controller.add_to_bookshelf);
app.get("/remove_from_bookshelf/:id", google_books_controller.remove_from_bookshelf);
app.get("/query_book", google_books_controller.search);




/* Pagination Routes */
app.get("/next_search_page", google_books_controller.next_search_page);
app.get("/prev_search_page", google_books_controller.prev_search_page);


/* Global Configuration */
global.config = require("./config.js"); 
global.config.set_to_production_mode();
global.session =  require('./app/helpers/session_helper.js'); 








/*
 * Run Application
 * */

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

