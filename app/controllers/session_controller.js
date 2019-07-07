/*
 * Session Controller
 *
 * */
const axios = require('axios'); 
module.exports = {
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
   get_authorization_code: (res) => {
	access_token = res.data.access_token
	global.session = access_token
   },
   signin: (req, res) => {
		url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${global.config.client_id}&response_type=code&scope=${global.config.scope}&redirect_uri=${global.config.redirect_uri}`;
		res.redirect(url)
  },
   display_error: (error) => {
	console.log(`*******Authentication error encountered***********\n${error.message}\nRefreshing Page...`)
   }
}

let token = ""
