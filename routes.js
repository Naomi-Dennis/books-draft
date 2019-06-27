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
let google_books_controller = require('./app/controllers/google_books_controller')


/*
 * List Routes
 */
app.use('/', google_books_controller.index_logic); 
app.get('/', google_books_controller.index); 
app.get('/auth', google_books_controller.create_user); 













/*
 * Run Application
 * */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

