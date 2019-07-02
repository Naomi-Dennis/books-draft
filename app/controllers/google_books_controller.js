/* 
 * Google Books Controller
 * */

module.exports = {
   index: (req, res) => {
      res.render('layout', {view_path: 'google_books/index', is_logged_in: is_logged_in() });
 },
 index_logic: (req, res, next) =>{
	 next(); 
 },
 create_user: (req, res) => {
	//access_token = req.params
	 console.log("CREATE USER REQUEST", req);
	 console.log("CREATE USER RESPONSE", res);
	//global.session = access_token
	res.redirect("/")
   },

  query_book: (req, res) => {
	res.redirect("/")
  }
 }//end module

function is_logged_in(){
 return (global.session != "NOT SET" && global.session != {} && global.session != "")
}

