/**
 * Session Controller
 * -----------------------
 *  Handle user authentication via Google API Oauth 2.0
 *
 *  @module session_controller
 * */
let books_api = require('../helpers/query_helper.js');
const axios = require('axios'); 
module.exports = {
   /**
    * process_code
    * --------------------------
    *  hadnler for authentication callback
    *
    * */
   process_code: (req, res) => {
      access_code = req.query.code
      axios.post("https://www.googleapis.com/oauth2/v4/token", {
	client_id: global.config.client_id,
	client_secret: global.config.client_secret,
	redirect_uri: global.config.redirect_uri,
	code: access_code,
	grant_type: "authorization_code"
      }).then( (data) => {
      	module.exports.get_authorization_code(data); 
	res.redirect("/")
      }).catch( module.exports.display_error );
   },
   /**
    * get_authorization_code 
    * ----------------------------------
    *  callback for Google API code function call. Saves the authorization token to the session
    *  object
    * */
   get_authorization_code: (res) => {
	access_token = res.data.access_token
	global.session.set_token(access_token) 
   },
   /**
    * Signin
    * ----------------------------------
    *  generates a new access token via Google Oauth 2.0. If the user is not signed in (via google)
    *  they are redirected. 
    *
    *  If they already signed in, it skips to process_code() 
    * */
   signin: (req, res) => {
		url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${global.config.client_id}&response_type=code&scope=${global.config.scope}&redirect_uri=${global.config.redirect_uri}`;
		res.redirect(url)
  },
  /**  
   *  signout
   *  ----------------------------------------
   *  clear the session token and redirect to the home page
   *
   * */
  signout: (req, res) => {
	global.session.reset()
	books_api.searched_books = []
	res.redirect("/")
  },
  /**
   * display_error
   * ------------------------
   * general function that logs an error and shows what section of the server call the error occured in
   * */
   display_error: (error) => {
	console.log(`*******Authentication error encountered***********\n${error.message}\nRefreshing Page...`)
   }
}

