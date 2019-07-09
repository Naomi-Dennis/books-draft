/**
 * Session Helper
 * ---------------------------
 * Handles the authentication token for the authorized user
 *
 * @module session_helper
 * */
module.exports = {
	get_token: () => {
		return token 
	},

	set_token: (new_token) => {
		token = new_token
	},

	reset: () => {
	   token = "NOT SET"
	},
	is_logged_in: () =>{
		return !(["", "NOT SET", undefined].includes(token))
	}
}
let token = ""
