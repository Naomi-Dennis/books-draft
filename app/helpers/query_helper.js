const axios = require('axios');
module.exports = {
	searched_books: [],
	search_title: "Books Found",
	current_page: 0,
	max_results: 40,
	total_results: 0,
	current_url: "", 
	query: (res, url, query_name) => {
	   status = "false" 
	   query = `${url}&startIndex=${module.exports.current_page}`
	   console.log(query)
	   axios.get(query)
	   .then( (response) => {
		module.exports.searched_books = response.data.items || [];
		module.exports.search_title = query_name
		module.exports.total_results = Number( response.data.totalItems )
		module.exports.current_url = url
		res.redirect("/")
	   }).catch((error) => { 
		console.log(`*******${query_name} error encountered***********\n${error.message}\nRefreshing Page...`)
		module.exports.searched_books = []
		res.redirect("/")
	   });
	},
	get_user_book_type: (mode) => {
		return `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${mode}/volumes?access_token=${global.session.get_token()}&key=${global.config.api_key}&maxResults=${module.exports.max_results}`
	},
	validate_query: ( metric, key ) => {
		  return metric.length > 0 ? `in${key}:${metric.replace(/ /g, '-')}` : ""
	}


}
