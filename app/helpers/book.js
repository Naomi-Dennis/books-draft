/**
 *
 * Book Class
 * @module book
 * */
class Book{
	/** 
	 * Parse volumeInfo into the following attributes:
	 * 	- Title
	 * 	- Subtitle
	 * 	- Authors 
	 * 	- Publisher
	 * 	- Publisher Date
	 * 	- Description
	 * 	- Image (Book Cover) 
	 * 	- Info Link (Link that leads to book profile on Google) 
	 *
	 * 	@param (JSON) {items: volumeInfo: { ... } }
	 * */
	constructor(item){
		this.id = item.id
		this.title = item.volumeInfo.title
		this.subtitle = item.volumeInfo.subtitle || ""
		this.authors = item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "No Authors Found"
		this.publisher = item.volumeInfo.publisher || "No Publisher Found"
		this.publisherDate = item.volumeInfo.publishedDate ? item.volumeInfo.publishedDate.split("-")[0] : "No Published Date Found"
		this.description = item.searchInfo ? item.searchInfo.textSnippet : item.volumeInfo.description
		this.image = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.smallThumbnail || volumeInfo.imageLinks.thumbnail || "https://via.placeholder.com/800.png?text=Book%20Cover%20Not%20Found" : "https://via.placeholder.com/800.png?text=Book%20Cover%20Not%20Found" 
		this.info_link = item.volumeInfo.infoLink
	}
}
/** 
 * Export the book class to a module
 * 
 * */
module.exports = Book
