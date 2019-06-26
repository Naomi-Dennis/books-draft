/* 
 * Google Books Controller
 * */
module.exports = {
   index: (req, res) => {
      res.render('layout', {view_path: 'google_books/index' });
 }
}
