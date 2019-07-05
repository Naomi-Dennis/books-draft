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
	let view_params = {
		view_path: "google_books/index",
		searched_books: module.exports.searched_books
	}
	console.log( "selected books", module.exports.searched_books.length )	
	res.render('layout', view_params); 
      }
 },
  query_book: (req, res) => {
	searched_books = []
	data = req.query
	regex_test = /[A-z0-9']/g
	title =  (data.book_title || "") 
	author = (data.book_author || "") 

	console.log("Title", title)
	console.log("Author", author);	

	query = ""
	query_params = []
	query_params.push(validate_query(title, "title"))
	query_params.push(validate_query(author, "author"))
        query = query_params.filter(String).join("&")
	query = query.length > 0 ? `${query}&maxResults=40` : query
	console.log("Query", query)
		search_url = `https://www.googleapis.com/books/v1/volumes?q=${query}`
		console.log(search_url)
		axios.get(search_url)
		.then( (response) => {
				module.exports.searched_books = response.data.items || [];
				console.log( "selected books", module.exports.searched_books.length )
				res.redirect("/")
		}).catch((error) => { 
			console.log("Error", error.message)
			res.redirect("/")
		})
  },
searched_books: [] 
 }//end module

function validate_query( metric, key ){
  return metric.length > 0 ? `in${key}:${metric.replace(/ /g, '-')}` : ""
}

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

