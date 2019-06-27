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
	 console.log("REQUEST", req);
	 console.log("RESPONSE", res); 
	access_token = req.query.access_token
	global.session = access_token
	res.redirect("/")
   }
 }//end module

function is_logged_in(){
 return (global.session != "NOT SET")
}
