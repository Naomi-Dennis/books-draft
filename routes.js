/*
 * Routes & Configuration File 
 *
 * */


/*
 * Basic initialization
 * */
let express = require('express');
let app = express();
const bodyParser = require('body-parser');
global.config = require("./config.js"); 
global.config.set_to_production_mode();
global.session =  require('./app/helpers/session_helper.js'); 
/*
 * Configure template engine 
 * */
app.set('view engine', 'ejs'); 
app.set('views', './app/views'); 

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
app.get('/', google_books_controller.index); 
app.get('/auth', session_controller.process_code); 
app.get("/query_book", google_books_controller.search);
app.get("/signout", session_controller.signout);
app.get("/signin", session_controller.signin);
app.get("/next_search_page", google_books_controller.next_search_page);
app.get("/prev_search_page", google_books_controller.prev_search_page);
app.get('/user_action/:id', google_books_controller.user_action);
app.use(bodyParser.urlencoded({ extended: true }));











/*
 * Run Application
 * */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

