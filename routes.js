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


/*
 * Initialize Controllers
 * */
let google_books_controller = require('./app/controllers/google_books')

/*
 * List Routes
 */ 
app.get('/', google_books_controller.index); 













/*
 * Run Application
 * */
app.listen(3000)

