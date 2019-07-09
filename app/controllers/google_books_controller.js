/* 
 * Google Books Controller
 * */
const axios = require('axios');
let books_api = require('../helpers/query_helper.js');
module.exports = {
   index: (req, res) => {
	let view_params = {
		view_path: "google_books/index",
		searched_books: books_api.searched_books,
		logged_in: global.session.is_logged_in(), 
		search_title: books_api.search_title,
		show_next_page: books_api.current_page < Math.floor(books_api.total_results / books_api.max_results) && books_api.total_results > books_api.max_results,
		show_prev_page: books_api.current_page > 0,
		total_results: books_api.total_results,
		past_title_searches: module.exports.past_title_searches.slice(-5),
		past_author_searches: module.exports.past_author_searches.slice(-5)
	}
	   console.log("SEARCH TITLE", books_api.search_title)
	res.render('layout', view_params); 
 },
  next_search_page: (req, res) =>{
	books_api.current_page += 1;
	console.log(books_api.current_page)
	books_api.query(res, books_api.current_url, books_api.search_title);
  },
  prev_search_page: (req, res) => {
	books_api.current_page -= 1;
	books_api.current_page = books_api.current_page < 0 ? 0 : books_api.current_page
	books_api.query(res, books_api.current_url, books_api.search_title);
  },
  search: (req, res) => {
	data = req.query
	regex_test = /[A-z0-9']/g
	title =  (data.book_title || "") 
	author = (data.book_author || "") 
        
	query = ""
	query_params = []
	query_params.push(books_api.validate_query(title, "title"))
	query_params.push(books_api.validate_query(author, "author"))

	if(title && !module.exports.past_title_searches.includes(title) ){ module.exports.past_title_searches.push( title ); } 
	if(author && !module.exports.past_author_searches.includes(author)){ module.exports.past_author_searches.push( author); }
        query = query_params.filter(String).join("&")
	query = query.length > 0 ? `${query}&maxResults=${books_api.max_results}` : query
	search_url = `https://www.googleapis.com/books/v1/volumes?q=${query}`
	books_api.query(res, search_url, "Search Results")
  },
  user_action: (req, res) => {
	action_id = req.params.id 
	bookshelf = req.query.bookshelf
	check_logged_in(res, action_id, bookshelf)
  },
  add_to_bookshelf: (req, res) => {
	action_id = req.params.id 
	book = req.query.book
	books_api.add_to_bookshelf(res, book, action_id) 

  },
  remove_from_bookshelf: (req, res) => {
	action_id = req.params.id 
	book = req.query.book
	bookshelf = req.query.bookshelf
	books_api.remove_from_bookshelf(res, book, action_id, bookshelf)
  },
  past_title_searches: [],
  past_author_searches: []
 }//end module


function check_logged_in(res, user_action, query_name){
	console.log("LOGIN CHECK",global.session.is_logged_in(), global.session.get_token() == "")
	if(global.session.is_logged_in()){
		books_api.query(res, books_api.get_user_book_type(user_action), query_name) 
	}
	else{
	   books_api.reset_page()
	   res.redirect("/"); 
	}
}
