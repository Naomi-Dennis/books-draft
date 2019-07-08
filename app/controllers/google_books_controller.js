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
		show_next_page: books_api.total_results > books_api.max_results,
		show_prev_page: books_api.current_page > 0,
		total_results: books_api.total_results
	}
	res.render('layout', view_params); 
 },
  next_search_page: (req, res) =>{
	books_api.current_page += 1; 
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
        query = query_params.filter(String).join("&")
	query = query.length > 0 ? `${query}&maxResults=${books_api.max_results}` : query
	search_url = `https://www.googleapis.com/books/v1/volumes?q=${query}`
	books_api.query(res, search_url, "Search Results")
  },
  user_ebooks: (req, res) => {
	books_api.query(res, books_api.get_user_book_type(7), "Your E-Books") 
  },
  favorites: (req, res) => {
	books_api.query(res, books_api.get_user_book_type(0), "Your Favorite Books") 
  },
  reading_now: (req, res) => {
	books_api.query(res, books_api.get_user_book_type(3), "Here's What Your Reading Now") 
  },
  reading_list: (req, res) => {
	books_api.query(res, books_api.get_user_book_type(2), "Your Reading List") 
  },
  have_read: (req, res) => {
	books_api.query(res, books_api.get_user_book_type(4), "Books You've Read") 
  },
  recently_viewed: (req, res) => {
	books_api.query(res, books_api.get_user_book_type(6), "Recently Viewed Books") 
  },
  purchased: (req, res) => {
	books_api.query(res, books_api.get_user_book_type(1), "Purchased Books") 
  },
  signout: (req, res) => {
	global.session.reset()
	books_api.searched_books = []
	res.redirect("/")
  },
  signin: (req, res) => {
		url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${global.config.client_id}&response_type=code&scope=${global.config.scope}&redirect_uri=${global.config.redirect_uri}`;
		res.redirect(url)
  }
 }//end module


