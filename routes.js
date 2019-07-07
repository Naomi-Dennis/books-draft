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
global.config.set_to_test_mode();
global.session =  "NOT SET"
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
let google_books_controller = require('./app/controllers/google_books_controller');
let session_controller = require('./app/controllers/session_controller.js'); 

/*
 * List Routes
 */
app.get('/', google_books_controller.index); 
app.get('/auth', session_controller.process_code); 
app.get("/query_book", google_books_controller.query_book);
app.use(bodyParser.urlencoded({ extended: true }));











/*
 * Run Application
 * */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

