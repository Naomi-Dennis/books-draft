/*
 * Routes & Configuration File 
 *
 * */


/*
 * Basic initialization
 * */
let express = require('express');
let app = express();

/*
 * Configure template engine 
 * */
app.set('view engine', 'ejs'); 
app.set('views', './app/views'); 

global.session = "NOT SET"

/*
 * Initialize Controllers
 * */
let google_books_controller = require('./app/controllers/google_books_controller');
let session_controller = require('./app/controllers/session_controller.js'); 

/*
 * List Routes
 */
app.use('/', google_books_controller.index_logic); 
app.get('/', google_books_controller.index); 
app.get('/auth', session_controller.process_code); 
app.post("/query_book", google_books_controller.query_book);












/*
 * Run Application
 * */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

