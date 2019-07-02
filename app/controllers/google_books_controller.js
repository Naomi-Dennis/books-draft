/* 
 * Google Books Controller
 * */
const axios = require('axios'); 
module.exports = {
   index: (req, res) => {
      if(!is_logged_in()){
	url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${options.client_id}&response_type=code&scope=${options.scope}&redirect_uri=${options.redirect_uri}`;
	res.redirect(url)
      }
      else{
	res.render('layout', {view_path: 'google_books/index', searched_books: module.exports.searched_books}); 
      }
 },
  query_book: (req, res) => {
	searched_books = []
	data = req.query
	title = data.book_title.replace(/ /g, '-')
	author = data.book_author.replace(/ /g, '-')
	console.log("Title", title)
	console.log("Author", author);
	search_url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&inauthor:${author}` 
	axios.get(search_url).then( (response) => {
		module.exports.searched_books = response.data.items;
			console.log(module.exports.searched_books)
		res.redirect("/")
	}
	).catch( (error) => { console.log(error);  } )
  },
searched_books: [] 
 }//end module


function is_logged_in(){
 return (global.session != "NOT SET" && global.session != {} && global.session != "")
}

let test_domain = "http://localhost:3000/auth"
let heroku_domain = "https://stark-wave-13030.herokuapp.com/auth" 
let options = {
	client_secret: "7h0r3G1m-JITodmlYl2Fj5YV",
	client_id: "73107975855-dapdgln79j62ovmt1kf2ootsv5rb9mhf.apps.googleusercontent.com",
	scope: "email",
	redirect_uri: test_domain
}

