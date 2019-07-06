/*
 * Session Controller
 *
 * */
const axios = require('axios'); 
module.exports = {
   process_code: (req, res) => {
      access_code = req.query.code
      axios.post("https://www.googleapis.com/oauth2/v4/token", {
	client_id: options.client_id,
	client_secret: options.client_secret,
	redirect_uri: current_domain,
	code: access_code,
	grant_type: "authorization_code"
      }).then( (data) => {
      	module.exports.get_authorization_code(data); 
	res.redirect("/")
      }).catch( module.exports.display_error );
   },
   get_authorization_code: (res) => {
	access_token = res.data.access_token
	global.session = access_token
   },
   display_error: (error) => {
	console.log(`*******Authentication error encountered***********\n${error.message}\nRefreshing Page...`)
   }
}

let test_domain = "http://localhost:3000/auth"
let heroku_domain = "https://stark-wave-13030.herokuapp.com/auth" 
let current_domain = heroku_domain
let options = {
	client_secret: "7h0r3G1m-JITodmlYl2Fj5YV",
	client_id: "73107975855-dapdgln79j62ovmt1kf2ootsv5rb9mhf.apps.googleusercontent.com",
	scope: "email",
	redirect_uri: current_domain

}

