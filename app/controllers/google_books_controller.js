/* 
 * Google Books Controller
 * */
const axios = require('axios'); 
module.exports = {
   index: (req, res) => {
	let view_params = {
		view_path: "google_books/index",
		searched_books: searched_books,
		logged_in: is_logged_in(),
		search_title: search_title,
		show_next_page: total_results > max_results,
		show_prev_page: current_page > 0,
		total_results: total_results
	}
	res.render('layout', view_params); 
 },
  next_search_page: (req, res) =>{
	current_page += 1; 
	book_query(res, current_url, search_title);
  },
  prev_search_page: (req, res) => {
	current_page -= 1;
	current_page = current_page < 0 ? 0 : current_page
	book_query(res, current_url, search_title);
  },
  search: (req, res) => {
	data = req.query
	regex_test = /[A-z0-9']/g
	title =  (data.book_title || "") 
	author = (data.book_author || "") 

	query = ""
	query_params = []
	query_params.push(validate_query(title, "title"))
	query_params.push(validate_query(author, "author"))
        query = query_params.filter(String).join("&")
	query = query.length > 0 ? `${query}&maxResults=${max_results}` : query
	search_url = `https://www.googleapis.com/books/v1/volumes?q=${query}`
	book_query(res, search_url, "Search Results")
  },
  user_ebooks: (req, res) => {
	book_query(res, get_user_book_type(7), "Your E-Books") 
  },
  favorites: (req, res) => {
	book_query(res, get_user_book_type(0), "Your Favorite Books") 
  },
  reading_now: (req, res) => {
	book_query(res, get_user_book_type(3), "Here's What Your Reading Now") 
  },
  reading_list: (req, res) => {
	book_query(res, get_user_book_type(2), "Your Reading List") 
  },
  have_read: (req, res) => {
	book_query(res, get_user_book_type(4), "Books You've Read") 
  },
  recently_viewed: (req, res) => {
	book_query(res, get_user_book_type(6), "Recently Viewed Books") 
  },
  purchased: (req, res) => {
	book_query(res, get_user_book_type(1), "Purchased Books") 
  },
  signout: (req, res) => {
	global.session = "NOT SET"
	searched_books = []
	res.redirect("/")
  },
  signin: (req, res) => {
		url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${options.client_id}&response_type=code&scope=${options.scope}&redirect_uri=${options.redirect_uri}`;
		res.redirect(url)
  }
 }//end module


let test_domain = "http://localhost:3000/auth"
let heroku_domain = "https://stark-wave-13030.herokuapp.com/auth" 

let current_domain = test_domain
let searched_books = []
let search_title = "Books Found"
let current_page = 0;
let max_results = 40
let total_results = 0; 
let options = {
	client_secret: "7h0r3G1m-JITodmlYl2Fj5YV",
	client_id: "73107975855-dapdgln79j62ovmt1kf2ootsv5rb9mhf.apps.googleusercontent.com",
	scope: "https://www.googleapis.com/auth/books",
	redirect_uri: current_domain,
	options: "AIzaSyBJNEhU1p_I5a2Mlcm91DF6GiGUycd-oeI"
}


function get_user_book_type(mode){
	return `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${mode}/volumes?access_token=${global.session}&key=${options.api_key}&maxResults=${max_results}`
}

function validate_query( metric, key ){
  return metric.length > 0 ? `in${key}:${metric.replace(/ /g, '-')}` : ""
}

function is_logged_in(){
 return (global.session != "NOT SET" && global.session != {} && global.session != "")
}
function book_query(res, url, query_name){
   query = `${url}&startIndex=${current_page}`
	console.log(query)
   axios.get(query)
   .then( (response) => {
	searched_books = response.data.items || [];
	search_title = query_name
	total_results = Number( response.data.totalItems )
	current_url = url
	res.redirect("/")
   }).catch((error) => { 
 	console.log(`*******${query_name} error encountered***********\n${error.message}\nRefreshing Page...`)
	searched_books = []
	res.redirect("/")
   });
   return url 
}
