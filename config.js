module.exports = {
	client_secret: "7h0r3G1m-JITodmlYl2Fj5YV",
	client_id: "73107975855-dapdgln79j62ovmt1kf2ootsv5rb9mhf.apps.googleusercontent.com",
	scope: "https://www.googleapis.com/auth/books",
	redirect_uri: "NOT SET",
	set_to_test_mode: () => {
		module.exports.redirect_uri = "http://localhost:3000/auth"
	},
	set_to_production_mode: () => {
		module.exports.redirect_uri = "https://stark-wave-13030.herokuapp.com/auth"
	}

}


