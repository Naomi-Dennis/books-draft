let assert = require("assert"); 
let config = require("../config.js"); 
require("../routes.js"); 
describe("Configuration Module", () => {
	describe("Variables", () => {
		it(" it has a variable called client_secret that's a string", () => {
			has_property_and_is_not_null_string("client_secret")
		}); 

		it(" it has a variable called client_id that's a string", () => {
			has_property_and_is_not_null_string("client_id")
		});

		it(" it has a variable called scope that's a string", () => {
			has_property_and_is_not_null_string("scope")
		});

		it(" it has a variable called scope that's equal to the Google Books API", () => {
			assert.equal(config.scope, "https://www.googleapis.com/auth/books", "scope variable in config module not set to Google API book scope"); 
		});

		it(" it has a vairable called redirect_uri that's a string", () => {
			has_property_and_is_not_null_string("redirect_uri")
		}); 
	});

	describe("Functions", () => {
		describe("#set_to_test_mode", () => {
			it(" it changes redirect_uri to localhost", () => {
				config.set_to_test_mode(); 
				assert.equal( config.redirect_uri.match(/localhost/g).length == 1, true )
			});
		});

		describe("#set_to_production_mode", () => {
			it(" it changes redirect_uri to the heroku domain", () => {
				config.set_to_production_mode(); 
				assert.equal( config.redirect_uri.match(/https:\/\/.*herokuapp\.com/g).length == 1, true )
			});

		});
	});

});

describe("Config module in global object", () => {
	it(" the global object has config property" ,() => {
	   assert.equal(global.hasOwnProperty("config"), true, "global object doesn't have config property" )
	});

	it(" the global object config property is set to config object", () => {
		assert.equal( global.config == config, true, "global object config property isn't a config object"); 
	});
});

function has_property_and_is_not_null_string(property){
	assert.equal( config.hasOwnProperty(property), true, `${property} not found in config module`);
	assert.equal( typeof(config[property]), "string", `${property} not a string`);
	assert.equal(config[property].length > 0, true, `${property} should not be an empty`)
}
