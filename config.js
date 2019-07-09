/*
 *
 * Configuration Module
 * ------------------------------
 * holds the data that would go into a .env file. 
 * 
 * PLEASE DO NOT PUT INTO .ENV FILE! 
 * Until official release, this is the easiest way to share the local files.
 * 
 * All keys will be reset before official release.
 *
 * */

module.exports = {
	client_secret: "7h0r3G1m-JITodmlYl2Fj5YV",
	client_id: "73107975855-dapdgln79j62ovmt1kf2ootsv5rb9mhf.apps.googleusercontent.com",
	scope: "https://www.googleapis.com/auth/books",
	redirect_uri: "NOT SET",
	api_key: "AIzaSyBJNEhU1p_I5a2Mlcm91DF6GiGUycd",
	/*
	 * set_to_test_mode
	 * -------------------------
	 *  sets the redirect_uri to http://localhost:3000
	 *
	 * */
	set_to_test_mode: () => {
		module.exports.redirect_uri = "http://localhost:3000/auth"
	},
	/*
	 * set_to_production_mode
	 * -----------------------------
	 *  sets the redirect_uri to the heroku url. Specifically: https://stark-wave-13030.herokuapp.com/auth
	 *
	 * */
	set_to_production_mode: () => {
		module.exports.redirect_uri = "https://stark-wave-13030.herokuapp.com/auth"
	}

}


