/**
 *
 * Query Helper Module 
 * ------------------------
 * Handles all the calls to the Google API
 *
 *  @module query_helper
 * */
let Book = require("./book.js")
const axios = require('axios');
module.exports = {
	searched_books: [],
	search_title: "Books Found",
	current_page: 0,
	max_results: 40,
	total_results: 0,
	current_url: "", 
	/** 
	 *  reset_page
	 * ------------------------
	 *    Clears all the books and resets the page number for pagination 
	 * */
	reset_page: () => {
		module.exports.searched_books = []
		module.exports.current_page = 0
	},
	/**
	 *  query
	 *  -----------------------
	 *  Calls a general sarch query to Google Books API. If the request is successful 
	 *  it sets the selected_books property to the book sretrieved from the api call. 
	 *
	 *  Before every call, selected_books are cleared and the page is reset. 
	 *  redirects to the home page afterwards. 
	 *  -
	 *  @param {object} - Response object 
	 *  @param {string} - a url
	 *  @param {string} - The name of the query (ex. "Favorite Books") 
	 *  @param {string} - Flag for directly returning the searched books. If this is true, the books aren't set within the module, it is just returned. 
	 * 
	 * */
	query: (res, url, query_name, return_searched_books=false) => {
	   query = `${url}&startIndex=${module.exports.current_page}`
	   console.log(query)
	   axios.get(query)
	   .then( (response) => {
		if(!return_searched_books){
			module.exports.reset_page()
			if( response.data.items ) {
				module.exports.process_searched_books( response.data.items )
			}
		}
		else{
			return response.data.items
		}
		module.exports.search_title = query_name
		module.exports.total_results = Number( response.data.totalItems )
		module.exports.current_url = url
		res.redirect("/")
	   }).catch((error) => { 
		console.log(`*******${query_name} error encountered***********\n${error.message}\nRefreshing Page...`)
		if(return_searched_books){
			module.exports.searched_books = []
			res.redirect("/")
		}
	   });
	},
	/**
	 * add_to_bookshelf
	 * --------------------------------
	 *  Adds a book, given by the volumeId, to the logged in user's bookshelf, indicated in the bookshelf_id. Redirects to the home page afterwards.
	 *
	 *  @param {object} - Response
	 *  @param {string} - volumeId 
	 *  @param {Number} - bookshelf_id 
	 * 
	 *  Note: Bookshelf id can also be a string as long as it can be cast to the number.
	 *
	 * */
	add_to_bookshelf: (res, book, book_type) => {
		url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${book_type}/addVolume?volumeId=${book}&key=${global.config.api_key}&access_token=${global.session.get_token()}`
		console.log(url); 
		axios.post(url)
		.then( (response) => {
			console.log("Adding Book to Bookshelf:" + book_type, "Sucessful"); 
			res.redirect("/");
		})
		.catch( (error) => {
			console.log("Error adding to bookshelf: " + book_type, error.message)
			res.redirect("/")
		});

	},
	/**
	 * remove_from_bookshelf
	 * --------------------------------
	 *  Removes a book, given by the volumeId, from the logged in user's bookshelf, indicated in the bookshelf_id. Redirects to the home page afterwards.
	 *
	 *
	 *  If the response is successful the page refreshes the bookshelf the book was removed from.
	 *  If the reponse fails, it redirects to the home page.
	 *
	 *  @param {object} - Response
	 *  @param {string} - volumeId 
	 *  @param {Number} - bookshelf_id 
	 * 
	 *  Note: Bookshelf id can also be a string as long as it can be cast to the number.
	 *
	 * */
	remove_from_bookshelf: (res, book, book_type, query_name) => {
		url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${book_type}/removeVolume?volumeId=${book}&key=${global.config.api_key}&access_token=${global.session.get_token()}`
		console.log(url); 
		axios.post(url)
		.then( (response) => {
			console.log("Removing Book from Bookshelf:" + book_type, "Sucessful"); 
			res.redirect(`/user_action/${book_type}?bookshelf=${query_name}`)
		})
		.catch( (error) => {
			console.log("Error removing from bookshelf: " + book_type, error.message)
			res.redirect("/")
		});

	},
	/** 
	 * process_searched_books
	 * ------------------------------------
	 *  converts book data returned from a bookshelf from Google API into Book objects. 
	 *
	 *  See Book class. 
	 *
	 *  @param {JSON} - google bookshelf
	 */
	process_searched_books: (items ) => {
		
		if( items || items.length > 0){
			items.forEach((item_element) => { 
				module.exports.searched_books.push( new Book(item_element) );
			});
		}
	}, 
	/**
	 * get_user_book_type
	 * -------------------------------------
	 *  returns a url that is formatted to retrieve a specified bookshelf, given by the mode paramter, from the Google Books API 
	 *
	 *  @param {number} - bookshelf_id
	 *
	 *  @return {string} - Google API bookshelf url
	 * */
	get_user_book_type: (mode) => {
		return `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${mode}/volumes?access_token=${global.session.get_token()}&key=${global.config.api_key}&maxResults=${module.exports.max_results}`
	},
	/**
	 * validate_query
	 * ----------------------------
	 *  returns a string formatted in GET params if the given metric is not empty. 
	 *
	 *  @param {string} - metric 
	 *  @param {string} - key
	 *
	 *  @return {string} - string
	 *  @example 
	 *	query_book.validate_query( "title", "Game Of Thrones") => "intitle:Game-Of-Thrones"
	 * */
	validate_query: ( metric, key ) => {
		  return metric.length > 0 ? `in${key}:${metric.replace(/ /g, '-')}` : ""
	}
}
