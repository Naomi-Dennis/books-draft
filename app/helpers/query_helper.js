let Book = require("./book.js")
const axios = require('axios');
module.exports = {
	searched_books: [],
	search_title: "Books Found",
	current_page: 0,
	max_results: 40,
	total_results: 0,
	current_url: "", 
	reset_page: () => {
		module.exports.searched_books = []
		module.exports.current_page = 0
	},
	query: (res, url, query_name, return_searched_books=false) => {
	   query = `${url}&startIndex=${module.exports.current_page}`
	   console.log(query)
	   axios.get(query)
	   .then( (response) => {
		if(!return_searched_books){ 
			module.exports.searched_books = []
			(response.data.items) ? module.exports.process_searched_books( response.data.items) : ""
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
	process_searched_books: (items ) => {
		
		if( items || items.length > 0){
			items.forEach((item_element) => { 
				module.exports.searched_books.push( new Book(item_element) );
			});
		}
	}, 
	set_user_data: () => {
		favorites_url = module.exports.get_user_book_type(0) 
		reading_list_url = module.exports.get_user_book_type(2)
		user.favorites = module.exports.query( undefined, favorites_url, "set user favorites data",true);
		user.reading_list = module.exports.query(undefined, reading_list_url, "set user reading list data", true);
	},
	get_user_book_type: (mode) => {
		return `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${mode}/volumes?access_token=${global.session.get_token()}&key=${global.config.api_key}&maxResults=${module.exports.max_results}`
	},
	validate_query: ( metric, key ) => {
		  return metric.length > 0 ? `in${key}:${metric.replace(/ /g, '-')}` : ""
	}
}

let user = {
	favorites: [],
	reading_list: [],
	reset: () => {
		this.favorits = []
		this.reading_list = []
	},
	add_to_favorites: (volume_id) => {
		this.favorites.push( volume_id )
	},
	add_to_reading_list: (volume_id) => {
		this.reading_list.push( volume_id) 
	},
	in_favorites: (volume_id) => {
		this.favorites.includes(volume_id)
	},
	in_reading_list: (volume_id) => {
		this.favorites.includes(volume_id)
	},
	set_favorites: (items) => {
		this.favorites = items.map(items=>items.id  );
	},
	set_reading_list: (items) => {
		this.reading_list = items.map(items => items.id); 
	}
}
