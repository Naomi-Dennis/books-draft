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
		return token != ("NOT SET" && "" && false && undefined);   
	}
}

let token = ""
