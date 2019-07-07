let assert = require('assert'); 
let session = require('../app/helpers/session_helper.js'); 
describe("Session Helper", () => {
	describe("Variables", () => {
		it("token is a private variable", () => {
			assert.equal(session.hasOwnProperty("token"), false, "token should be private");
		}); 
	}); 

	describe("Functions", () => {
		describe("#get_token", () => {
			it(" it is defined and returns a string", () => { 
				assert.equal( session.hasOwnProperty("get_token"), true, "#get_token function not defined");
				assert.equal( typeof(session.get_token()), "string", "get_token should return a string"); 
			}); 
		});

		describe("#set_token", () => {
			it(" it is defined and sets the token", () => {
				let token = "abc123" 
				assert.equal(session.hasOwnProperty("set_token"), true, "#set_token function not defined."); 
				session.set_token(token); 
				assert.equal( session.get_token(), token, "set_token should set the token variable");
			}); 
		});

		describe("#reset", () => {
			it(" it is defined and resets the token", () => {
				assert.equal( session.hasOwnProperty("reset"), true, "#reset function not defined"); 
				session.reset();
				assert.equal( session.get_token(), "NOT SET", "#reset should reset the token to 'NOT SET'"); 
			});
		});

		describe("#is_logged_in", () => {
			it("it is defined and returns a bool", () => {
				assert.equal( session.hasOwnProperty("is_logged_in"), true, "#is_logged_in not defined"); 
				assert.equal( typeof (session.hasOwnProperty("is_logged_in")), "boolean", "#is_logged_in not defined"); 
			}); 

			it("detects if the user is logged in", () => {
				session.reset(); 
				assert.equal( session.is_logged_in(), false, "#is_logged_in should return false after token reset"); 
			});

			it("returns true if user is logged in", () => {
				session.set_token("abc123"); 
				assert.equal( session.is_logged_in(), true, "should return true if token is set"); 
			}); 
		}); 
	});

	describe("Global context", () => {
		it(" it is set to the global.session variable", () => {
			assert.equal(global.session, session, "global.session shuold be defined as the session helper"); 
		}); 
	});
});
