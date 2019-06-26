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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

