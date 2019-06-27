let assert = require('assert')
let google_books_controller = require("../app/controllers/google_books_controller.js") 
describe("Google Book Controller.js", () => {
	describe("actions", () =>{
		it("has an index action", () => { 
		  assert.notEqual( google_books_controller["index"], undefined)  
		}); 

		it("has an index_logic middleware function", () => {
		   assert.notEqual(google_books_controller["index_logic"], undefined) 
		});

		it("has a create_user middleware function", () => {
		   assert.notEqual(google_books_controller["create_user"], undefined)
		});
	});
});

