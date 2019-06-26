/*
 * Session Controller
 * */
module.exports = {
   is_logged_in: (session_token) => {
	session_token.hasOwnProperty("token") 
   }
}

