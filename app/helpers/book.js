class Book{
	constructor(item){
		this.id = item.id
		this.title = item.volumeInfo.title
		this.subtitle = item.volumeInfo.subtitle || ""
		this.authors = item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "No Authors Found"
		this.publisher = item.volumeInfo.publisher || "No Publisher Found"
		this.publisherDate = item.volumeInfo.publishedDate ? item.volumeInfo.publishedDate.split("-")[0] : "No Published Date Found"
		this.description = item.searchInfo ? item.searchInfo.textSnippet : item.volumeInfo.description
		this.image = item.volumeInfo.imageLinks.smallThumbnail || volumeInfo.imageLinks.thumbnail || "https://via.placeholder.com/600.png?text=Cover"
	}
}

module.exports = Book
