/*
 * Session Controller
 *
 * */
const axios = require('axios'); 
module.exports = {
   process_code: (req, res) => {
      access_code = req.query.code
      console.log("Access Code", access_code)
      
      axios.post("https://www.googleapis.com/oauth2/v4/token", {
	client_id: options.client_id,
	client_secret: options.client_secret,
	redirect_uri: heroku_domain,
	code: access_code,
	grant_type: "authorization_code"
      }).then( module.exports.get_authorization_code ).catch( module.exports.display_error );

      res.redirect("/")
   },
   get_authorization_code: (res) => {
	access_token = res.data.access_token
	global.session = access_token
	console.log(global.session)
   },
   display_error: (error) => {
	console.log(error)
   }
}

let test_domain = "http://localhost:3000/auth"
let heroku_domain = "https://stark-wave-13030.herokuapp.com/auth" 
let options = {
	client_secret: "7h0r3G1m-JITodmlYl2Fj5YV",
	client_id: "73107975855-dapdgln79j62ovmt1kf2ootsv5rb9mhf.apps.googleusercontent.com",
	scope: "email",
	redirect_uri: test_domain
}

